// Supabase Edge Function « generate-pack »
// Génère le contenu d'un cours (plan, explications, fiches, questions) avec l'API Claude.
// Réservée aux administrateurs. Secret requis : ANTHROPIC_API_KEY (Edge Functions → Secrets).

const MODEL = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-5-5";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const STYLE = `Tu prépares une application de révision pour des étudiants de Master MIAGE (en français).
Public : une étudiante qui « ne comprend rien au cours » et révise sur iPhone, parfois en avion.
Règles de fond :
- Reste fidèle au cours fourni : n'invente pas de notions, de chiffres ou de listes. Si le cours contient une erreur manifeste, signale-la dans une note.
- Les listes du cours (« 3 typologies », « les 4C »…) doivent être recopiées complètes et dans l'ordre du cours.
- Les QCM du professeur fournis (captures ou texte) doivent être repris mot pour mot, avec leur numéro dans "source".`;

const HTML_RULES = `HTML autorisé : h3, p, ul, ol, li, b, i, code, pre, table/tr/th/td, et des div avec ces classes :
"lead" (sur un <p>, intro), "def" (définition), "formula" (formule ou liste à retenir), "trap" (piège fréquent),
"ex" (exemple), "key" (astuce mémo), "note-block" (remarque), "dict" (contenant des <div><span>terme</span><p>explication</p></div>),
"tablewrap" (autour d'un tableau). Pas de style inline, pas de script.`;

const OUTLINE_TOOL = {
  name: "save_outline",
  description: "Enregistre le plan du cours, découpé en chapitres de révision.",
  input_schema: {
    type: "object",
    properties: {
      chapters: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "Titre court du chapitre" },
            sub: { type: "string", description: "Sous-titre : les notions couvertes" },
            focus: { type: "string", description: "Ce que ce chapitre doit couvrir précisément (parties du cours, listes, QCM du prof concernés)" },
          },
          required: ["title", "sub", "focus"],
        },
      },
    },
    required: ["chapters"],
  },
};

const CONTENT_TOOL = {
  name: "save_content",
  description: "Enregistre les deux textes de cours d'un chapitre.",
  input_schema: {
    type: "object",
    properties: {
      simple: { type: "string", description: "Explication simple en HTML" },
      html: { type: "string", description: "Fiche détaillée en HTML" },
    },
    required: ["simple", "html"],
  },
};

const QUESTIONS_TOOL = {
  name: "save_questions",
  description: "Enregistre les questions de révision d'un chapitre.",
  input_schema: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["qcm", "list", "open"] },
            q: { type: "string" },
            options: { type: "array", items: { type: "string" } },
            answer: { description: "qcm : index de la bonne option (0 = première). open : réponse attendue (texte)." },
            explanation: { type: "string" },
            notes: { type: "array", items: { type: "string" }, description: "qcm : une explication par option, même ordre" },
            items: { type: "array", items: { type: "string" }, description: "list : toutes les réponses acceptées" },
            need: { type: "integer", description: "list : nombre d'éléments à citer" },
            tip: { type: "string", description: "astuce pour retenir" },
            source: { type: "string", description: "Uniquement pour une question du prof : ex. « QCM 2 · Q5 »" },
          },
          required: ["type", "q"],
        },
      },
    },
    required: ["questions"],
  },
};

type Src = { type: "text" | "pdf" | "image"; name: string; text?: string; data?: string; media_type?: string };

function sourceBlocks(sources: Src[]) {
  const blocks: any[] = [];
  for (const s of sources) {
    if (s.type === "text") blocks.push({ type: "text", text: `### Fichier : ${s.name}\n\n${s.text ?? ""}` });
    else if (s.type === "pdf") blocks.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: s.data }, title: s.name });
    else if (s.type === "image") blocks.push({ type: "image", source: { type: "base64", media_type: s.media_type ?? "image/png", data: s.data } });
  }
  if (blocks.length) blocks[blocks.length - 1].cache_control = { type: "ephemeral" };
  return blocks;
}

async function callClaude(system: string, content: any[], tool: any, maxTokens: number) {
  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) throw new Error("Secret ANTHROPIC_API_KEY manquant dans Supabase (Edge Functions → Secrets).");
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL, max_tokens: maxTokens, system, tools: [tool],
      tool_choice: { type: "tool", name: tool.name },
      messages: [{ role: "user", content }],
    }),
  });
  const out = await r.json();
  if (!r.ok) throw new Error(out?.error?.message ?? `Erreur API Claude (${r.status})`);
  const use = (out.content ?? []).find((b: any) => b.type === "tool_use");
  if (!use) throw new Error("Réponse inattendue de l'IA.");
  if (out.stop_reason === "max_tokens") throw new Error("Réponse trop longue : demande moins de questions ou découpe ce chapitre.");
  return use.input;
}

async function isAdmin(req: Request) {
  const url = Deno.env.get("SUPABASE_URL");
  const apikey = req.headers.get("apikey") ?? Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const auth = req.headers.get("authorization") ?? "";
  const r = await fetch(`${url}/rest/v1/rpc/is_admin`, { method: "POST", headers: { apikey, authorization: auth, "content-type": "application/json" }, body: "{}" });
  return r.ok && (await r.json()) === true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    if (!(await isAdmin(req))) return json({ error: "Réservé à l'administratrice : reconnecte-toi avec ton compte admin." }, 403);
    const body = await req.json();
    const sources: Src[] = body.sources ?? [];
    if (!sources.length) return json({ error: "Aucun fichier de cours reçu." }, 400);
    const subject = body.subject?.name ?? "la matière";
    const style = body.style ?? "mix";
    const styleTxt = style === "list"
      ? "Le contrôle demande surtout de CITER des éléments (« Citez 3 types de… ») : privilégie les questions de type list, plus quelques open."
      : style === "qcm" ? "Le contrôle est un QCM : privilégie des questions qcm à 4 options, avec des pièges plausibles."
      : "Mélange des qcm, des list (« Citez… ») et quelques open.";

    if (body.mode === "outline") {
      const system = `${STYLE}\nTâche : lire tout le cours de « ${subject} » et proposer un découpage en 3 à 10 chapitres de révision équilibrés, dans l'ordre du cours.${body.notes ? `\nConsignes de l'administratrice : ${body.notes}` : ""}`;
      const out = await callClaude(system, [...sourceBlocks(sources), { type: "text", text: "Propose le plan des chapitres." }], OUTLINE_TOOL, 4000);
      return json({ chapters: out.chapters ?? [] });
    }

    if (body.mode === "content" || body.mode === "questions") {
      const ch = body.chapter ?? {};
      const n = Math.max(5, Math.min(40, Number(body.count) || 15));
      const all = (body.outline ?? []).map((c: any, i: number) => `${i + 1}. ${c.title}`).join("\n");
      const head = `${STYLE}
${styleTxt}
Plan complet du cours :
${all}

Chapitre traité : « ${ch.title} » (${ch.sub}). Contenu à couvrir : ${ch.focus}${body.notes ? `\nConsignes de l'administratrice : ${body.notes}` : ""}`;
      if (body.mode === "content") {
        const system = `${head}
Tâche : rédiger les deux textes de ce chapitre uniquement.
1. "simple" : explication pour débutante, en partant de zéro, avec des exemples concrets et des analogies du quotidien, et une astuce mémo (acronyme, phrase) pour chaque liste à retenir. Commence par <p class="lead">.
2. "html" : fiche détaillée de révision, complète et fidèle au cours (définitions, listes complètes, formules, pièges).
${HTML_RULES}`;
        const out = await callClaude(system, [...sourceBlocks(sources), { type: "text", text: `Rédige les textes du chapitre « ${ch.title} ».` }], CONTENT_TOOL, 10000);
        return json(out);
      }
      const system = `${head}
Tâche : écrire environ ${n} questions de révision sur ce chapitre uniquement, et y ajouter mot pour mot les questions des QCM du prof qui portent sur ce chapitre (avec "source").
- qcm : 4 options, "answer" = index de la bonne (0 = première), "explanation" claire, "notes" = pourquoi chaque option est juste ou fausse (même ordre).
- list : "q" commence par « Citez… », "items" = toutes les réponses du cours, "need" = nombre demandé, "tip" = astuce mémo.
- open : "answer" = réponse attendue (texte), "tip".
Vérifie chaque bonne réponse avec le cours.`;
      const out = await callClaude(system, [...sourceBlocks(sources), { type: "text", text: `Écris les questions du chapitre « ${ch.title} ».` }], QUESTIONS_TOOL, 10000);
      return json(out);
    }
    return json({ error: "Mode inconnu." }, 400);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
