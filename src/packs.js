// Packs de contenu : matières, chapitres et questions ajoutés depuis l'espace admin (format JSON « revisions-pack-1 »).
window.Packs = (function(){
  function hash(s) { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36); }
  function clean(html) {
    if (!html) return '';
    try {
      const doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
      doc.querySelectorAll('script,iframe,object,embed,style,link,meta,form').forEach(n => n.remove());
      doc.querySelectorAll('*').forEach(n => [...n.attributes].forEach(a => {
        if (/^on/i.test(a.name) || (/^(href|src|xlink:href)$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) n.removeAttribute(a.name);
      }));
      return doc.body.firstChild.innerHTML;
    } catch (e) { return ''; }
  }
  // Vérifie un pack ; renvoie { ok, errors[], summary }
  function validate(p) {
    const errors = [];
    if (!p || typeof p !== 'object') return { ok: false, errors: ['Le fichier n\'est pas un pack valide (JSON attendu).'] };
    if (p.format !== 'revisions-pack-1') errors.push('Format inconnu : il faut "format": "revisions-pack-1".');
    if (!p.subject || !p.subject.id || !p.subject.name) errors.push('La matière (subject.id et subject.name) est obligatoire.');
    const chapters = Array.isArray(p.chapters) ? p.chapters : [];
    const questions = Array.isArray(p.questions) ? p.questions : [];
    if (!chapters.length) errors.push('Aucun chapitre.');
    const ids = new Set(chapters.map(c => c && c.id));
    chapters.forEach((c, i) => { if (!c || !c.id || !c.title) errors.push('Chapitre ' + (i + 1) + ' : id et title obligatoires.'); });
    questions.forEach((q, i) => {
      const n = 'Question ' + (i + 1);
      if (!q || !q.q) return errors.push(n + ' : texte manquant.');
      if (!ids.has(q.chapter)) errors.push(n + ' : chapitre « ' + q.chapter + ' » inconnu.');
      if (q.type === 'qcm') { if (!Array.isArray(q.options) || q.options.length < 2 || !(q.answer >= 0 && q.answer < q.options.length)) errors.push(n + ' : options/answer invalides.'); }
      else if (q.type === 'list') { if (!Array.isArray(q.items) || !q.items.length || !(q.need >= 1)) errors.push(n + ' : items/need invalides.'); }
      else if (q.type === 'open') { if (!q.answer) errors.push(n + ' : réponse manquante.'); }
      else errors.push(n + ' : type « ' + q.type + ' » inconnu (qcm, list ou open).');
    });
    const counts = { qcm: 0, list: 0, open: 0 }; questions.forEach(q => { if (q && counts[q.type] !== undefined) counts[q.type]++; });
    return { ok: !errors.length, errors: errors.slice(0, 12), summary: { subject: p.subject ? p.subject.name : '?', chapters: chapters.length, questions: questions.length, counts } };
  }
  // Ajoute un pack aux données de l'app
  function apply(row) {
    const p = row.content || row;
    const v = validate(p); if (!v.ok) return false;
    const pid = 'k' + (row.id != null ? row.id : hash(JSON.stringify(p).slice(0, 2000)));
    const sid = String(p.subject.id).replace(/[^a-z0-9_-]/gi, '').toLowerCase() || pid;
    let S = SUBJECTS.find(s => s.id === sid);
    if (!S) {
      S = { id: sid, name: p.subject.name, short: p.subject.short || p.subject.name.slice(0, 10), code: p.subject.code || '', color: p.subject.color || '#6d4fd8', chapters: [], fromPack: true };
      SUBJECTS.push(S);
    }
    const map = {};
    p.chapters.forEach(c => {
      const cid = pid + '-' + c.id; map[c.id] = cid;
      S.chapters.push({ id: cid, title: c.title, sub: c.sub || '', html: clean(c.html || c.simple || ''), pack: pid });
      if (c.simple) SIMPLE[cid] = clean(c.simple);
    });
    (p.questions || []).forEach(q => {
      const base = { s: sid, c: map[q.chapter], q: q.q, e: q.explanation || q.tip || '', prof: !!q.source, src: q.source || null, order: 100000 + QUESTIONS.length };
      if (q.type === 'qcm') QUESTIONS.push(Object.assign(base, { id: pid + ':' + hash(q.q), o: q.options, a: q.answer, notes: Array.isArray(q.notes) ? q.notes : null }));
      else if (q.type === 'list') QUESTIONS.push(Object.assign(base, { id: pid + ':L' + hash(q.q), t: 'list', o: q.items, need: Math.min(q.need, q.items.length) }));
      else QUESTIONS.push(Object.assign(base, { id: pid + ':O' + hash(q.q), t: 'open', o: [q.answer] }));
      if (q.source) QUESTIONS[QUESTIONS.length - 1].id = pid + ':P' + hash(q.source + q.q);
    });
    return true;
  }
  return { validate, apply, clean };
})();
