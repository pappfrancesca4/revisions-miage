(function(){
'use strict';
const $ = s => document.querySelector(s);
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const ICON = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
  quiz:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  err:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  shuffle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

// ---------- stockage (sur le téléphone) ----------
const KEY = 'revisions-miage-v1';
let store = { stats:{}, subject:'proba' };
try { const raw = localStorage.getItem(KEY); if (raw) store = Object.assign(store, JSON.parse(raw)); } catch(e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch(e) {} };

const subj = () => SUBJECTS.find(s => s.id === store.subject);
const qsOf = (sid) => QUESTIONS.filter(q => q.s === sid);
const chapterOf = (q) => SUBJECTS.find(s => s.id === q.s).chapters.find(c => c.id === q.c);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const isMastered = id => { const s = store.stats[id]; return s && s.last === true; };
const isWrong = id => { const s = store.stats[id]; return s && s.last === false; };

// ---------- navigation ----------
let view = { name:'home' }, history = [];
function go(v, push = true) { if (push) history.push(view); view = v; render(); window.scrollTo(0, 0); }
function back() { view = history.pop() || { name:'home' }; render(); }

function setTop(title, showBack) {
  $('#title').textContent = title;
  $('#back').hidden = !showBack;
}
function render() {
  document.body.classList.toggle('s-ng', store.subject === 'ng'); document.body.classList.toggle('s-comm', store.subject === 'comm');
  document.querySelectorAll('.seg button').forEach(b => b.classList.toggle('on', b.dataset.s === store.subject));
  const tabFor = { home:'home', courses:'courses', chapter:'courses', quizsetup:'quizsetup', quiz:'quizsetup', result:'quizsetup', errors:'errors' };
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.v === tabFor[view.name]));
  const m = $('#main'); m.innerHTML = '';
  ({ home:vHome, courses:vCourses, chapter:vChapter, quizsetup:vSetup, quiz:vQuiz, result:vResult, errors:vErrors })[view.name](m);
}

// ---------- Accueil ----------
function vHome(m) {
  const S = subj(), qs = qsOf(S.id);
  setTop('Révisions', false);
  const done = qs.filter(q => isMastered(q.id)).length;
  const pct = Math.round(100 * done / qs.length);
  const hero = el('div', 'card hero');
  hero.innerHTML = '<div class="k"></div><div class="big"></div><div class="lab"></div><div class="bar"><i></i></div>';
  hero.querySelector('.k').textContent = S.code + ' · ' + S.name;
  hero.querySelector('.big').textContent = pct + ' %';
  hero.querySelector('.lab').textContent = done + ' questions réussies sur ' + qs.length;
  hero.querySelector('.bar i').style.width = pct + '%';
  m.append(hero);

  const prof = qs.filter(q => q.prof).length, wrong = qs.filter(q => isWrong(q.id)).length;
  const g = el('div', 'grid2'); g.style.marginTop = '12px';
  const tile = (ic, t, s, fn) => { const b = el('button', 'tile'); b.innerHTML = '<div class="ic">' + ICON[ic] + '</div><b></b><span></span>'; b.querySelector('b').textContent = t; b.querySelector('span').textContent = s; b.onclick = fn; return b; };
  g.append(
    tile('book', 'Comprendre le cours', S.chapters.length + ' chapitres expliqués', () => go({ name:'courses' })),
    tile('star', 'Questions du prof', prof + ' questions expliquées', () => startQuiz({ prof:'only' }, 'Questions du prof')),
    tile('shuffle', 'Mélange rapide', '10 questions au hasard', () => startQuiz({ n:10, chapter:defChap() }, 'Mélange rapide')),
    tile('clock', S.id === 'comm' ? 'Contrôle blanc' : 'Examen blanc', S.id === 'comm' ? '20 cartes « Citez… » du 2ᵉ contrôle' : '20 questions, correction à la fin', () => startQuiz({ n:20, exam:true, chapter:defChap() }, S.id === 'comm' ? 'Contrôle blanc' : 'Examen blanc')),
  );
  m.append(g);
  const r = el('button', 'row'); r.style.marginTop = '12px';
  r.innerHTML = '<div class="n">' + wrong + '</div><div class="t"><b>Mes erreurs</b><span></span></div><div class="chev">›</div>';
  r.querySelector('span').textContent = wrong ? 'Retravaille les questions ratées' : 'Aucune erreur pour l\'instant';
  r.onclick = () => go({ name:'errors' });
  m.append(r);

  const h = el('h2', null, 'Par chapitre'); h.style.marginTop = '22px'; m.append(h);
  const st = el('div', 'stack');
  S.chapters.forEach((c, i) => {
    const cq = qs.filter(q => q.c === c.id), ok = cq.filter(q => isMastered(q.id)).length;
    const b = el('button', 'row');
    b.innerHTML = '<div class="n">' + (i + 1) + '</div><div class="t"><b></b><span></span><div class="bar dk"><i></i></div></div><div class="chev">›</div>';
    b.querySelector('b').textContent = c.title;
    b.querySelector('span').textContent = ok + ' / ' + cq.length + ' réussies';
    b.querySelector('.bar i').style.width = (cq.length ? 100 * ok / cq.length : 0) + '%';
    b.querySelector('.bar').style.marginTop = '6px';
    b.onclick = () => go({ name:'chapter', id:c.id, tab:'simple' });
    st.append(b);
  });
  m.append(st);

  const inst = el('div', 'card install'); inst.style.marginTop = '22px';
  inst.innerHTML = '<b>Pour l\'avion</b><p style="margin:6px 0 0">Ta progression est enregistrée sur ce téléphone. Installe l\'app <b>avant</b> de partir (avec internet) :</p><ol><li>Ouvre le lien dans <b>Safari</b>.</li><li>Bouton Partager → <b>Sur l\'écran d\'accueil</b>.</li><li>Ouvre l\'app une fois depuis l\'icône, puis passe en mode avion pour vérifier.</li></ol>';
  m.append(inst);
}

// ---------- Cours ----------
function vCourses(m) {
  const S = subj(); setTop('Cours', false);
  m.append(el('h2', null, S.name));
  m.append(el('p', 'sub', 'Chaque chapitre a une explication simple (pour comprendre) et une fiche détaillée (pour réviser).'));
  const st = el('div', 'stack');
  S.chapters.forEach((c, i) => {
    const b = el('button', 'row');
    b.innerHTML = '<div class="n">' + (i + 1) + '</div><div class="t"><b></b><span></span></div><div class="chev">›</div>';
    b.querySelector('b').textContent = c.title; b.querySelector('span').textContent = c.sub;
    b.onclick = () => go({ name:'chapter', id:c.id, tab:'simple' });
    st.append(b);
  });
  m.append(st);
}
function vChapter(m) {
  const S = subj(); const c = S.chapters.find(x => x.id === view.id) || S.chapters[0];
  const idx = S.chapters.indexOf(c);
  setTop('Chapitre ' + (idx + 1), true);
  m.append(el('h2', null, c.title));
  m.append(el('p', 'sub', c.sub));
  const tabs = el('div', 'ctabs');
  [['simple', 'Explication simple'], ['fiche', 'Fiche détaillée']].forEach(([k, t]) => {
    const b = el('button', view.tab === k ? 'on' : '', t);
    b.onclick = () => { view.tab = k; render(); window.scrollTo(0, 0); };
    tabs.append(b);
  });
  m.append(tabs);
  const body = el('div', 'course');
  body.innerHTML = view.tab === 'simple' ? (SIMPLE[c.id] || c.html) : c.html;
  m.append(body);
  if (view.find) { // surligner le passage lié à une question
    const needle = view.find.toLowerCase();
    const hit = [...body.querySelectorAll('h3,p,li,.def,.trap,.formula,.dict>div')].find(n => n.textContent.toLowerCase().includes(needle));
    if (hit) setTimeout(() => { hit.scrollIntoView({ block:'center' }); hit.classList.add('hl'); }, 60);
    view.find = null;
  }
  const n = qsOf(S.id).filter(q => q.c === c.id).length;
  const btn = el('button', 'btn', 'S\'entraîner sur ce chapitre (' + n + ' questions)'); btn.style.marginTop = '20px';
  btn.onclick = () => startQuiz({ chapter:c.id }, c.title);
  m.append(btn);
  const nav = el('div', 'qnav');
  if (idx > 0) { const p = el('button', 'btn ghost', '‹ Précédent'); p.onclick = () => go({ name:'chapter', id:S.chapters[idx - 1].id, tab:view.tab }, false); nav.append(p); }
  if (idx < S.chapters.length - 1) { const nx = el('button', 'btn ghost', 'Suivant ›'); nx.onclick = () => go({ name:'chapter', id:S.chapters[idx + 1].id, tab:view.tab }, false); nav.append(nx); }
  m.append(nav);
}

// ---------- Réglages du quiz ----------
let setup = { chapter:'all', src:'all', n:20 };
function vSetup(m) {
  const S = subj(); setTop('S\'entraîner', false);
  m.append(el('h2', null, 'Composer un quiz'));
  m.append(el('p', 'sub', 'Chaque réponse est expliquée tout de suite, avec un lien vers le cours.'));
  const card = el('div', 'card stack');
  const group = (label, items, key) => {
    const w = el('div'); w.append(el('label', 'lbl', label));
    const ch = el('div', 'chips');
    items.forEach(([v, t]) => { const b = el('button', 'chip' + (setup[key] === v ? ' on' : ''), t); b.onclick = () => { setup[key] = v; render(); }; ch.append(b); });
    w.append(ch); return w;
  };
  if (!S.chapters.some(c => c.id === setup.chapter) && !(setup.chapter === 'ctrl2' && S.id === 'comm')) setup.chapter = S.id === 'comm' ? 'ctrl2' : 'all';
  card.append(group('Chapitre', [['all', 'Tous']].concat(S.id === 'comm' ? [['ctrl2', '2ᵉ contrôle (1 à 7)']] : []).concat(S.chapters.map((c, i) => [c.id, (i + 1) + '. ' + c.title])), 'chapter'));
  card.append(group('Questions', [['all', 'Toutes'], ['only', 'QCM du prof'], ['new', 'Nouvelles']], 'src'));
  card.append(group('Nombre', [[10, '10'], [20, '20'], [40, '40'], [9999, 'Toutes']], 'n'));
  const pool = filterPool({ chapter:setup.chapter, prof:setup.src });
  const b = el('button', 'btn', 'Commencer (' + Math.min(pool.length, setup.n) + ' questions)');
  b.disabled = !pool.length;
  b.onclick = () => startQuiz({ chapter:setup.chapter, prof:setup.src, n:setup.n }, 'Entraînement');
  card.append(b);
  m.append(card);
}
function defChap() { return store.subject === 'comm' ? 'ctrl2' : 'all'; }
const isGood = it => it.q.t ? it.ok === true : it.pick === it.q.a;
const isDone = it => it.q.t ? it.ok !== undefined : it.pick !== null;
const norm = t => (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9%]+/g, ' ');
const STOP = new Set('les des une pour avec dans votre vous son sur par que qui est aux ses leur leurs plus etre faire tout tous entre comme sans'.split(' '));
function keysOf(item) {
  const head = norm(item.split(/[(:→]/)[0]);
  let w = head.split(' ').filter(x => x.length >= 4 && !STOP.has(x));
  if (!w.length) w = head.split(' ').filter(x => x.length >= 2 && !STOP.has(x));
  return w.map(x => x.slice(0, 5));
}
function autoMatch(items, typed) {
  const t = ' ' + norm(typed) + ' ';
  return items.map(it => { const k = keysOf(it); return k.length > 0 && k.some(x => t.includes(x)); });
}
function filterPool(o) {
  let p = qsOf(store.subject);
  if (o.chapter === 'ctrl2') p = p.filter(q => q.c !== 'c8');
  else if (o.chapter && o.chapter !== 'all') p = p.filter(q => q.c === o.chapter);
  if (o.prof === 'only') p = p.filter(q => q.prof);
  if (o.prof === 'new') p = p.filter(q => !q.prof);
  if (o.ids) p = p.filter(q => o.ids.includes(q.id));
  return p;
}

// ---------- Quiz ----------
let quiz = null;
function startQuiz(o, title) {
  let pool = filterPool(o);
  if (!pool.length) return;
  // Questions jamais réussies d'abord, puis le reste
  pool = shuffle(pool).sort((a, b) => (isMastered(a.id) ? 1 : 0) - (isMastered(b.id) ? 1 : 0));
  if (o.prof === 'only' && !o.n) pool = pool.slice().sort((a, b) => a.order - b.order);
  pool = pool.slice(0, o.n || pool.length);
  quiz = { title, exam:!!o.exam, items:pool.map(q => ({ q, order: (q.prof || q.t) ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i)), pick:null })), i:0 };
  go({ name:'quiz' });
}
function record(q, ok) { if (typeof ok !== 'boolean') return;
  const s = store.stats[q.id] || { ok:0, ko:0 };
  ok ? s.ok++ : s.ko++; s.last = ok; store.stats[q.id] = s; save();
}
function vQuiz(m) {
  if (quiz.items[quiz.i].q.t) return vCard(m);
  const it = quiz.items[quiz.i], q = it.q, answered = it.pick !== null, reveal = answered && !quiz.exam;
  setTop(quiz.title, true);
  const pr = el('div', 'prog'); const pi = el('i'); pi.style.width = (100 * quiz.i / quiz.items.length) + '%'; pr.append(pi); m.append(pr);
  const head = el('div', 'qhead');
  if (q.prof) head.append(el('span', 'pill prof', q.src)); else head.append(el('span', 'pill', chapterOf(q).title));
  head.append(el('span', 'count', (quiz.i + 1) + ' / ' + quiz.items.length));
  m.append(head);
  m.append(el('div', 'qtext', q.q));
  const opts = el('div', 'opts');
  it.order.forEach((oi, k) => {
    const b = el('button', 'opt');
    const L = el('span', 'L', 'abcde'[k]); const T = el('span', 'T', q.o[oi]);
    b.append(L, T);
    if (reveal) {
      b.disabled = true;
      if (oi === q.a) b.classList.add('ok'); else if (oi === it.pick) b.classList.add('ko'); else b.classList.add('dim');
      if (q.notes && q.notes[oi]) T.append(el('span', 'note', q.notes[oi]));
    } else if (answered) { b.disabled = true; if (oi === it.pick) b.style.borderColor = 'var(--accent)'; }
    else b.onclick = () => { it.pick = oi; record(q, oi === q.a); render(); };
    opts.append(b);
  });
  m.append(opts);
  if (reveal) {
    const good = it.pick === q.a;
    const v = el('div', 'verdict ' + (good ? 'good' : 'bad'));
    v.append(el('h4', null, good ? 'Bonne réponse' : 'Pas tout à fait'));
    if (!good) v.append(el('p', null, 'La bonne réponse est : « ' + q.o[q.a] + ' »'));
    v.append(el('p', null, q.e));
    const l = el('button', 'link', 'Revoir ce point dans le cours ›');
    l.onclick = () => go({ name:'chapter', id:q.c, tab:'simple', find:q.k || null });
    v.append(l);
    m.append(v);
  }
  const nav = el('div', 'qnav');
  if (quiz.i > 0) { const p = el('button', 'btn ghost', '‹'); p.style.flex = '0 0 64px'; p.onclick = () => { quiz.i--; render(); }; nav.append(p); }
  quizNav(m, nav, answered);
}
function quizNav(m, nav, answered) {
  const last = quiz.i === quiz.items.length - 1;
  const nx = el('button', 'btn', last ? 'Voir mon score' : 'Question suivante');
  nx.disabled = !answered;
  nx.onclick = () => { if (last) { history = history.filter(h => h.name !== 'quiz'); go({ name:'result' }, false); } else { quiz.i++; render(); window.scrollTo(0, 0); } };
  nav.append(nx); m.append(nav);
}
// Cartes « Citez… » et questions ouvertes
function vCard(m) {
  const it = quiz.items[quiz.i], q = it.q;
  setTop(quiz.title, true);
  const pr = el('div', 'prog'); const pi = el('i'); pi.style.width = (100 * quiz.i / quiz.items.length) + '%'; pr.append(pi); m.append(pr);
  const head = el('div', 'qhead');
  head.append(el('span', q.prof ? 'pill prof' : 'pill', q.prof ? q.src : chapterOf(q).title));
  head.append(el('span', 'count', (quiz.i + 1) + ' / ' + quiz.items.length));
  m.append(head);
  m.append(el('div', 'qtext', q.q));
  if (q.t === 'list') m.append(el('p', 'sub', q.need >= q.o.length ? 'Il faut tout citer (' + q.need + ').' : 'Il faut en citer ' + q.need + ' (sur ' + q.o.length + ' possibles).'));
  const ta = el('textarea', 'answer'); ta.id = 'answer-' + quiz.i; ta.rows = 4;
  ta.placeholder = 'Écris ta réponse ici (facultatif), ou réponds dans ta tête / sur papier.';
  ta.value = it.typed || ''; ta.oninput = () => { it.typed = ta.value; };
  if (it.revealed) ta.disabled = true;
  m.append(ta);
  const nav = el('div', 'qnav');
  if (!it.revealed) {
    const b = el('button', 'btn', 'Voir la réponse');
    b.onclick = () => { it.revealed = true; if (q.t === 'list') it.checks = autoMatch(q.o, it.typed); render(); };
    m.append(b);
    if (quiz.i > 0) { const p = el('button', 'btn ghost', '‹ Précédente'); p.onclick = () => { quiz.i--; render(); }; nav.append(p); m.append(nav); }
    return;
  }
  const box = el('div', 'card stack'); box.style.marginTop = '14px';
  if (q.t === 'list') {
    box.append(el('b', null, 'Coche ce que tu avais trouvé :'));
    q.o.forEach((txt, k) => {
      const lab = el('label', 'check' + (it.checks[k] ? ' on' : ''));
      const cb = el('input'); cb.type = 'checkbox'; cb.id = 'chk-' + quiz.i + '-' + k; cb.checked = !!it.checks[k];
      cb.onchange = () => { it.checks[k] = cb.checked; if (it.ok !== undefined) { it.ok = undefined; } render(); };
      lab.append(cb, el('span', null, txt)); box.append(lab);
    });
    const got = it.checks.filter(Boolean).length;
    const score = el('div', 'tally ' + (got >= q.need ? 'good' : 'bad'), got + ' / ' + q.need + (got >= q.need ? ' : réussi' : ' : il en manque ' + (q.need - got)));
    box.append(score);
    if (it.typed && it.typed.trim()) box.append(el('p', 'sub', 'J\'ai pré-coché ce qui ressemble à ta réponse. Corrige si besoin.'));
    if (it.ok === undefined) { it.ok = got >= q.need; record(q, it.ok); }
  } else {
    box.append(el('b', null, 'Réponse attendue :'));
    box.append(el('p', null, q.o[0]));
    const row = el('div', 'qnav'); row.style.marginTop = '4px';
    const y = el('button', 'btn' + (it.ok === true ? '' : ' ghost'), 'Je savais'), n = el('button', 'btn' + (it.ok === false ? '' : ' ghost'), 'Je ne savais pas');
    y.onclick = () => { it.ok = true; record(q, true); render(); }; n.onclick = () => { it.ok = false; record(q, false); render(); };
    row.append(y, n); box.append(row);
  }
  m.append(box);
  if (q.e) { const t = el('div', 'verdict good tipbox'); t.append(el('h4', null, 'Pour retenir')); t.append(el('p', null, q.e)); const l = el('button', 'link', 'Revoir dans le cours ›'); l.onclick = () => go({ name:'chapter', id:q.c, tab:'fiche' }); t.append(l); m.append(t); }
  if (quiz.i > 0) { const p = el('button', 'btn ghost', '‹'); p.style.flex = '0 0 64px'; p.onclick = () => { quiz.i--; render(); }; nav.append(p); }
  quizNav(m, nav, it.ok !== undefined);
}
function vResult(m) {
  setTop('Résultat', true);
  const tot = quiz.items.length, ok = quiz.items.filter(isGood).length;
  const c = el('div', 'card'); c.style.textAlign = 'center';
  c.append(el('div', 'score', ok + ' / ' + tot));
  const pct = Math.round(100 * ok / tot);
  c.append(el('p', 'sub', pct >= 80 ? 'Très bien, tu maîtrises.' : pct >= 50 ? 'Pas mal. Revois les explications ci-dessous.' : 'Relis l\'explication simple des chapitres concernés, puis réessaie.'));
  const again = el('button', 'btn', 'Refaire seulement mes erreurs');
  const wrongIds = quiz.items.filter(x => !isGood(x)).map(x => x.q.id);
  again.disabled = !wrongIds.length;
  again.onclick = () => startQuiz({ ids:wrongIds }, 'Mes erreurs');
  c.append(again); m.append(c);
  const h = el('h2', null, 'Correction'); h.style.marginTop = '20px'; m.append(h);
  const st = el('div', 'stack');
  quiz.items.forEach((x, i) => {
    const good = isGood(x);
    const d = el('div', 'card');
    d.append(el('span', 'pill', (good ? '✓ ' : '✗ ') + 'Question ' + (i + 1)));
    d.append(el('p', null, x.q.q)); d.lastChild.style.fontWeight = '600';
    if (x.q.t) { d.append(answerBlock(x.q)); }
    else {
    if (!good) { const p = el('p', null, 'Ta réponse : ' + x.q.o[x.pick]); p.style.color = 'var(--ko)'; d.append(p); }
    const r = el('p', null, 'Bonne réponse : ' + x.q.o[x.q.a]); r.style.color = 'var(--ok)'; r.style.fontWeight = '600'; d.append(r);
    }
    d.append(el('p', null, x.q.e));
    if (!x.q.t && x.q.notes && !good && x.q.notes[x.pick]) d.append(el('p', 'sub', 'Pourquoi ton choix est faux : ' + x.q.notes[x.pick]));
    const l = el('button', 'link', 'Revoir dans le cours ›'); l.onclick = () => go({ name:'chapter', id:x.q.c, tab:'simple' }); d.append(l);
    st.append(d);
  });
  m.append(st);
}

function answerBlock(q) {
  if (q.t === 'open') { const p = el('p', null, '→ ' + q.o[0]); p.style.color = 'var(--ok)'; return p; }
  const ul = el('ul', 'anslist'); q.o.forEach(t => ul.append(el('li', null, t)));
  const w = el('div'); w.append(el('span', 'sub', 'À citer : ' + q.need + (q.need < q.o.length ? ' parmi ' + q.o.length : ''))); w.append(ul); return w;
}
// ---------- Erreurs ----------
function vErrors(m) {
  setTop('Mes erreurs', false);
  const wrong = qsOf(store.subject).filter(q => isWrong(q.id));
  m.append(el('h2', null, 'Questions à retravailler'));
  if (!wrong.length) { m.append(el('div', 'empty', 'Aucune erreur enregistrée. Lance un quiz : les questions ratées apparaîtront ici jusqu\'à ce que tu les réussisses.')); return; }
  const b = el('button', 'btn', 'Refaire ces ' + wrong.length + ' questions'); b.onclick = () => startQuiz({ ids:wrong.map(q => q.id) }, 'Mes erreurs');
  m.append(b);
  const st = el('div', 'stack'); st.style.marginTop = '14px';
  wrong.forEach(q => {
    const d = el('div', 'card');
    d.append(el('span', q.prof ? 'pill prof' : 'pill', q.prof ? q.src : chapterOf(q).title));
    const p = el('p', null, q.q); p.style.fontWeight = '600'; d.append(p);
    if (q.t) d.append(answerBlock(q)); else { const r = el('p', null, '→ ' + q.o[q.a]); r.style.color = 'var(--ok)'; d.append(r); }
    d.append(el('p', 'sub', q.e));
    st.append(d);
  });
  m.append(st);
  const reset = el('button', 'btn ghost', 'Remettre ma progression à zéro (' + subj().short + ')'); reset.style.marginTop = '20px';
  let armed = false;
  reset.onclick = () => {
    if (!armed) { armed = true; reset.textContent = 'Appuie encore pour confirmer'; return; }
    qsOf(store.subject).forEach(q => delete store.stats[q.id]); save(); render();
  };
  m.append(reset);
}

// ---------- démarrage ----------
$('#back').onclick = back;
document.querySelectorAll('.seg button').forEach(b => b.onclick = () => { store.subject = b.dataset.s; save(); history = []; view = { name: view.name === 'chapter' ? 'courses' : (['quiz','result'].includes(view.name) ? 'home' : view.name) }; render(); });
document.querySelectorAll('.tabs button').forEach(b => { b.querySelector('i').outerHTML = ICON[b.dataset.icon]; b.onclick = () => { history = []; go({ name:b.dataset.v }, false); }; });
render();
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !/claude/.test(location.hostname)) {
  try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch(e) {}
}
})();
