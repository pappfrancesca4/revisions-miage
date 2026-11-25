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
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

// ---------- stockage (sur le téléphone) ----------
const KEY = 'revisions-miage-v1';
const lsGet = k => { try { return JSON.parse(localStorage.getItem(k)); } catch(e) { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} };
// État de l'appareil (matière choisie, mode invité, dernier utilisateur, caches)
let device = Object.assign({ subject:'proba', guest:false, user:null, exams:[], packs:[] }, lsGet(KEY + ':device') || {});
const saveDevice = () => lsSet(KEY + ':device', device);
// Progression : une par utilisateur (ou « invité »)
let store = { stats:{}, pending:{} };
function loadStore() {
  const uid = device.user ? device.user.id : 'guest';
  let s = lsGet(KEY + ':' + uid);
  if (!s) { const old = lsGet(KEY); s = old && old.stats ? { stats: old.stats, pending: Object.assign({}, old.stats) } : null; } // reprise de l'ancienne version
  store = Object.assign({ stats:{}, pending:{} }, s || {});
  store.subject = device.subject;
}
const save = () => { lsSet(KEY + ':' + (device.user ? device.user.id : 'guest'), { stats: store.stats, pending: store.pending }); device.subject = store.subject; saveDevice(); };
loadStore();

const subj = () => SUBJECTS.find(s => s.id === store.subject) || SUBJECTS[0];
const qsOf = (sid) => QUESTIONS.filter(q => q.s === sid);
const chapterOf = (q) => SUBJECTS.find(s => s.id === q.s).chapters.find(c => c.id === q.c);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const isMastered = id => { const s = store.stats[id]; return s && s.last === true; };
const isWrong = id => { const s = store.stats[id]; return s && s.last === false; };
const fmtErr = e => { const m = (e && (e.message || e.error_description)) || String(e); return /Invalid login/i.test(m) ? 'E-mail ou mot de passe incorrect.' : /already registered|already exists/i.test(m) ? 'Un compte existe déjà avec cet e-mail : connecte-toi.' : /Password should/i.test(m) ? 'Mot de passe trop court (6 caractères minimum).' : /Email not confirmed/i.test(m) ? 'Confirme ton e-mail (regarde ta boîte de réception), puis connecte-toi.' : /Failed to fetch|NetworkError|network/i.test(m) ? 'Pas de connexion internet.' : m; };

// ---------- navigation ----------
let view = { name:'home' }, history = [];
function go(v, push = true) { if (push) history.push(view); view = v; render(); window.scrollTo(0, 0); }
function back() { view = history.pop() || { name:'home' }; render(); }

function setTop(title, showBack) {
  $('#title').textContent = title;
  $('#back').hidden = !showBack;
}
function paintSubject() {
  const S = subj();
  ['proba','ng','comm'].forEach(k => document.body.classList.toggle('s-' + k, S.id === k));
  if (S.color) { document.body.style.setProperty('--accent', S.color); document.body.style.setProperty('--accent-soft', 'color-mix(in srgb, ' + S.color + ' 16%, var(--surface))'); }
  else { document.body.style.removeProperty('--accent'); document.body.style.removeProperty('--accent-soft'); }
}
function render() {
  if (store.subject !== subj().id) store.subject = subj().id;
  paintSubject();
  const subjViews = ['subject','courses','chapter','quizsetup','quiz','result','errors'];
  const chip = $('#subjchip');
  chip.hidden = !subjViews.includes(view.name);
  chip.querySelector('span').textContent = subj().short;
  const tabFor = { home:'home', subject:'home', courses:'courses', chapter:'courses', quizsetup:'quizsetup', quiz:'quizsetup', result:'quizsetup', errors:'errors', account:'account', admin:'account' };
  $('.tabs').hidden = view.name === 'auth';
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.v === tabFor[view.name]));
  const m = $('#main'); m.innerHTML = '';
  ({ auth:vAuth, home:vHome, subject:vSubject, courses:vCourses, chapter:vChapter, quizsetup:vSetup, quiz:vQuiz, result:vResult, errors:vErrors, account:vAccount, admin:vAdmin })[view.name](m);
}

// ---------- Accueil : choix de la matière + examens à venir ----------
const DAY = 86400000;
function daysUntil(d) { const t = new Date(); t.setHours(0,0,0,0); return Math.round((new Date(d + 'T00:00:00') - t) / DAY); }
function whenLabel(n) { return n === 0 ? 'Aujourd\'hui' : n === 1 ? 'Demain' : 'Dans ' + n + ' jours'; }
function frDate(d) { try { return new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' }); } catch(e) { return d; } }
function subjectProgress(S) { const qs = qsOf(S.id); const done = qs.filter(q => isMastered(q.id)).length; return { done, total: qs.length, pct: qs.length ? Math.round(100 * done / qs.length) : 0 }; }
function chooseSubject(id) { store.subject = id; save(); history = []; go({ name:'subject' }, false); }
function vHome(m) {
  setTop('Révisions', false);
  const hello = el('h2', null, device.user && device.user.name ? 'Bonjour ' + device.user.name : 'Bonjour');
  m.append(hello);
  // Examens à venir
  const ex = (device.exams || []).filter(e => daysUntil(e.exam_date) >= 0).sort((a, b) => a.exam_date.localeCompare(b.exam_date));
  const eh = el('h3', 'sect', 'Examens à venir'); m.append(eh);
  if (!ex.length) m.append(el('p', 'sub', Cloud.enabled() ? 'Aucun examen prévu pour l\'instant.' : 'Les examens à venir s\'afficheront ici une fois les comptes activés.'));
  else {
    const st = el('div', 'stack');
    ex.forEach(e => {
      const S = SUBJECTS.find(s => s.id === e.subject); const n = daysUntil(e.exam_date);
      const b = el('button', 'row exam' + (n <= 3 ? ' soon' : ''));
      b.innerHTML = '<div class="when"><b></b><span></span></div><div class="t"><b></b><span></span></div><div class="chev">›</div>';
      b.querySelector('.when b').textContent = n === 0 ? 'J' : n === 1 ? 'J-1' : 'J-' + n;
      b.querySelector('.when span').textContent = whenLabel(n);
      b.querySelector('.t b').textContent = e.title + (S ? ' · ' + S.short : '');
      b.querySelector('.t span').textContent = frDate(e.exam_date) + (e.details ? ' — ' + e.details : '');
      b.onclick = () => { if (S) chooseSubject(S.id); };
      st.append(b);
    });
    m.append(st);
  }
  // Matières
  m.append(el('h3', 'sect', 'Choisis ta matière'));
  const g = el('div', 'subjects');
  SUBJECTS.forEach(S => {
    const p = subjectProgress(S);
    const b = el('button', 'subj s-' + S.id);
    if (S.color) b.style.setProperty('--accent', S.color);
    b.innerHTML = '<span class="code"></span><b></b><span class="meta"></span><div class="bar dk"><i></i></div>';
    b.querySelector('.code').textContent = S.code || S.short;
    b.querySelector('b').textContent = S.name;
    b.querySelector('.meta').textContent = S.chapters.length + ' chapitres · ' + p.total + ' questions · ' + p.pct + ' %';
    b.querySelector('.bar i').style.width = p.pct + '%';
    b.onclick = () => chooseSubject(S.id);
    g.append(b);
  });
  m.append(g);
  const inst = el('div', 'card install'); inst.style.marginTop = '22px';
  inst.innerHTML = '<b>Réviser hors ligne</b><p style="margin:6px 0 0">Installe l\'app <b>avec internet</b> : Safari → Partager → <b>Sur l\'écran d\'accueil</b>. Ouvre-la une fois, puis elle marche en mode avion. Ta progression se synchronise dès que tu retrouves du réseau.</p>';
  m.append(inst);
}
function vSubject(m) {
  const S = subj(), qs = qsOf(S.id);
  setTop(S.name, true);
  const done = qs.filter(q => isMastered(q.id)).length;
  const pct = qs.length ? Math.round(100 * done / qs.length) : 0;
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
    prof ? tile('star', 'Questions du prof', prof + ' questions expliquées', () => startQuiz({ prof:'only' }, 'Questions du prof')) : tile('quiz', 'Tout réviser', qs.length + ' questions', () => startQuiz({}, 'Toutes les questions')),
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
  ok ? s.ok++ : s.ko++; s.last = ok; s.t = Date.now(); store.stats[q.id] = s; store.pending[q.id] = 1; save(); syncSoon();
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
    qsOf(store.subject).forEach(q => { if (store.stats[q.id]) { store.stats[q.id] = { ok:0, ko:0, last:null, t:Date.now() }; store.pending[q.id] = 1; } }); save(); syncSoon(); render();
  };
  m.append(reset);
}

// ---------- Synchronisation ----------
let syncTimer = null, syncing = false;
function syncSoon() { clearTimeout(syncTimer); syncTimer = setTimeout(sync, 1500); }
async function sync() {
  if (syncing || !device.user || !Cloud.enabled() || !Cloud.online()) return;
  const ids = Object.keys(store.pending); if (!ids.length) return;
  syncing = true;
  const rows = ids.filter(id => store.stats[id]).map(id => { const s = store.stats[id]; return { qid:id, ok:s.ok || 0, ko:s.ko || 0, last:s.last == null ? null : s.last, updated_at:new Date(s.t || Date.now()).toISOString() }; });
  const done = await Cloud.pushProgress(device.user.id, rows);
  if (done) { ids.forEach(id => delete store.pending[id]); save(); }
  syncing = false;
}
async function pull() {
  if (!device.user || !Cloud.enabled() || !Cloud.online()) return;
  const rows = await Cloud.pullProgress(device.user.id); if (!rows) return;
  rows.forEach(r => { const t = Date.parse(r.updated_at) || 0, l = store.stats[r.qid]; if (!l || (l.t || 0) < t) { store.stats[r.qid] = { ok:r.ok, ko:r.ko, last:r.last, t }; delete store.pending[r.qid]; } });
  save(); sync();
}
async function refreshShared() {
  if (!Cloud.enabled() || !Cloud.online()) return;
  const [ex, pk] = await Promise.all([Cloud.exams(), Cloud.packs(false)]);
  let changed = false;
  if (ex) { device.exams = ex; changed = true; }
  if (pk && JSON.stringify(pk.map(p => [p.id, p.created_at])) !== JSON.stringify((device.packs || []).map(p => [p.id, p.created_at]))) { device.packs = pk; saveDevice(); location.reload(); return; }
  if (changed) { saveDevice(); if (['home','admin'].includes(view.name)) render(); }
}
async function setUserFromSession(s) {
  if (!s) return;
  const p = await Cloud.profile(s.user.id);
  const name = p.name || (s.user.user_metadata && s.user.user_metadata.display_name) || s.user.email.split('@')[0];
  const changedUser = !device.user || device.user.id !== s.user.id;
  device.user = { id:s.user.id, email:s.user.email, name, admin:p.admin }; device.guest = false; saveDevice();
  if (changedUser) loadStore();
  await pull();
}

// ---------- Compte ----------
function vAuth(m) {
  setTop('Révisions', false);
  const mode = view.mode || 'login';
  const c = el('div', 'card stack authcard');
  c.append(el('h2', null, mode === 'login' ? 'Connexion' : 'Créer un compte'));
  c.append(el('p', 'sub', 'Ton compte garde ta progression et la synchronise entre ton téléphone et ton ordinateur.'));
  const f = el('form', 'stack');
  const field = (id, label, type, ac) => { const w = el('div'); const l = el('label', 'lbl', label); l.htmlFor = id; const i = el('input', 'inp'); i.id = id; i.type = type; i.autocomplete = ac; i.required = true; w.append(l, i); f.append(w); return i; };
  const name = mode === 'signup' ? field('su-name', 'Prénom', 'text', 'given-name') : null;
  const email = field(mode + '-email', 'E-mail', 'email', 'email');
  const pass = field(mode + '-pass', 'Mot de passe (6 caractères minimum)', 'password', mode === 'login' ? 'current-password' : 'new-password');
  const msg = el('p', 'formmsg'); msg.hidden = true;
  const sub = el('button', 'btn', mode === 'login' ? 'Se connecter' : 'Créer mon compte'); sub.type = 'submit';
  f.append(msg, sub);
  f.onsubmit = async (ev) => {
    ev.preventDefault(); msg.hidden = true; sub.disabled = true; sub.textContent = 'Un instant…';
    try {
      if (mode === 'signup') {
        const d = await Cloud.signUp(email.value.trim(), pass.value, name.value.trim());
        if (!d.session) { msg.className = 'formmsg good'; msg.textContent = 'Compte créé. Ouvre l\'e-mail de confirmation reçu, puis reviens te connecter.'; msg.hidden = false; sub.disabled = false; sub.textContent = 'Créer mon compte'; view.mode = 'login'; return; }
        await setUserFromSession(d.session);
      } else { const d = await Cloud.signIn(email.value.trim(), pass.value); await setUserFromSession(d.session); }
      history = []; go({ name:'home' }, false); refreshShared();
    } catch (e) { msg.className = 'formmsg bad'; msg.textContent = fmtErr(e); msg.hidden = false; sub.disabled = false; sub.textContent = mode === 'login' ? 'Se connecter' : 'Créer mon compte'; }
  };
  c.append(f);
  const sw = el('button', 'link', mode === 'login' ? 'Pas encore de compte ? Créer un compte' : 'Déjà un compte ? Se connecter');
  sw.onclick = () => { view.mode = mode === 'login' ? 'signup' : 'login'; render(); };
  c.append(sw);
  m.append(c);
  const g = el('button', 'btn ghost', 'Continuer sans compte'); g.style.marginTop = '12px';
  g.onclick = () => { device.guest = true; saveDevice(); history = []; go({ name:'home' }, false); };
  m.append(g);
  m.append(el('p', 'sub center', 'Sans compte, ta progression reste seulement sur cet appareil.'));
}
function vAccount(m) {
  setTop('Mon compte', false);
  const c = el('div', 'card stack');
  if (device.user) {
    c.append(el('h2', null, device.user.name));
    c.append(el('p', 'sub', device.user.email + (device.user.admin ? ' · administratrice' : '')));
    const pend = Object.keys(store.pending).length;
    c.append(el('p', 'sub', !Cloud.online() ? 'Hors ligne : ta progression sera envoyée au retour du réseau.' : pend ? pend + ' réponse(s) en attente d\'envoi…' : 'Progression synchronisée.'));
    if (device.user.admin) { const a = el('button', 'btn', 'Espace admin'); a.onclick = () => go({ name:'admin', tab:'exams' }); c.append(a); }
    const o = el('button', 'btn ghost', 'Se déconnecter');
    o.onclick = async () => { await sync(); await Cloud.signOut(); device.user = null; device.guest = false; saveDevice(); loadStore(); history = []; go({ name: Cloud.enabled() ? 'auth' : 'home' }, false); };
    c.append(o);
  } else {
    c.append(el('h2', null, 'Mode invité'));
    c.append(el('p', 'sub', 'Ta progression est enregistrée sur cet appareil uniquement.'));
    if (Cloud.enabled()) { const b = el('button', 'btn', 'Se connecter ou créer un compte'); b.onclick = () => go({ name:'auth', mode:'login' }, false); c.append(b); }
    else c.append(el('p', 'sub', 'Les comptes ne sont pas encore activés dans cette version.'));
  }
  m.append(c);
  m.append(el('h3', 'sect', 'Ma progression'));
  const st = el('div', 'stack');
  SUBJECTS.forEach(S => { const p = subjectProgress(S); const r = el('button', 'row'); r.innerHTML = '<div class="n"></div><div class="t"><b></b><span></span><div class="bar dk"><i></i></div></div><div class="chev">›</div>'; if (S.color) r.style.setProperty('--accent', S.color); r.classList.add('s-' + S.id); r.querySelector('.n').textContent = p.pct + '%'; r.querySelector('b').textContent = S.name; r.querySelector('span').textContent = p.done + ' / ' + p.total + ' questions réussies'; r.querySelector('.bar i').style.width = p.pct + '%'; r.onclick = () => chooseSubject(S.id); st.append(r); });
  m.append(st);
}

// ---------- Admin ----------
function vAdmin(m) {
  setTop('Espace admin', true);
  if (!device.user || !device.user.admin) { m.append(el('div', 'empty', 'Réservé à l\'administratrice.')); return; }
  if (!Cloud.online()) m.append(el('p', 'formmsg bad', 'Hors ligne : l\'espace admin a besoin d\'internet.'));
  const tabs = el('div', 'ctabs');
  [['exams', 'Examens'], ['content', 'Contenu'], ['members', 'Membres']].forEach(([k, t]) => { const b = el('button', view.tab === k ? 'on' : '', t); b.onclick = () => { view.tab = k; render(); }; tabs.append(b); });
  m.append(tabs);
  ({ exams:adminExams, content:adminContent, members:adminMembers })[view.tab || 'exams'](m);
}
function msgBox() { const p = el('p', 'formmsg'); p.hidden = true; p.show = (t, good) => { p.textContent = t; p.className = 'formmsg ' + (good ? 'good' : 'bad'); p.hidden = false; }; return p; }
function adminExams(m) {
  const f = el('form', 'card stack');
  f.append(el('b', null, 'Ajouter un examen'));
  const sel = el('select', 'inp'); sel.id = 'ex-subject'; SUBJECTS.forEach(S => { const o = el('option', null, S.name); o.value = S.id; if (S.id === store.subject) o.selected = true; sel.append(o); });
  const title = el('input', 'inp'); title.id = 'ex-title'; title.placeholder = 'Ex. : 2ᵉ contrôle, partiel…'; title.required = true;
  const date = el('input', 'inp'); date.id = 'ex-date'; date.type = 'date'; date.required = true;
  const det = el('input', 'inp'); det.id = 'ex-details'; det.placeholder = 'Détails (chapitres, salle, durée…) — facultatif';
  [['Matière', sel], ['Intitulé', title], ['Date', date], ['Détails', det]].forEach(([l, i]) => { const w = el('div'); const lab = el('label', 'lbl', l); lab.htmlFor = i.id; w.append(lab, i); f.append(w); });
  const msg = msgBox(); const b = el('button', 'btn', 'Ajouter'); b.type = 'submit'; f.append(msg, b);
  f.onsubmit = async ev => { ev.preventDefault(); b.disabled = true; try { await Cloud.addExam({ subject:sel.value, title:title.value.trim(), exam_date:date.value, details:det.value.trim() || null }); await refreshShared(); render(); } catch (e) { msg.show(fmtErr(e)); b.disabled = false; } };
  m.append(f);
  m.append(el('h3', 'sect', 'Examens enregistrés'));
  const list = (device.exams || []).slice().sort((a, b) => a.exam_date.localeCompare(b.exam_date));
  if (!list.length) m.append(el('p', 'sub', 'Aucun examen.'));
  const st = el('div', 'stack');
  list.forEach(e => { const d = el('div', 'card arow'); const S = SUBJECTS.find(s => s.id === e.subject); const t = el('div', 't'); t.append(el('b', null, e.title + (S ? ' · ' + S.short : ''))); t.append(el('span', 'sub', frDate(e.exam_date) + (daysUntil(e.exam_date) < 0 ? ' (passé)' : ''))); const x = el('button', 'btn ghost small', 'Supprimer'); let armed = false; x.onclick = async () => { if (!armed) { armed = true; x.textContent = 'Confirmer'; return; } try { await Cloud.delExam(e.id); await refreshShared(); render(); } catch (er) { x.textContent = 'Erreur'; } }; d.append(t, x); st.append(d); });
  m.append(st);
}
async function adminContent(m) {
  const how = el('div', 'card stack');
  how.innerHTML = '<b>Ajouter un cours</b><ol class="steps"><li>Envoie tes fichiers de cours (Word, PDF, photos) et tes QCM à Claude dans ta conversation de révision.</li><li>Claude te renvoie un fichier <b>pack .json</b> avec les résumés, les explications et les questions.</li><li>Importe ce fichier ici : le contenu apparaît dans l\'app de toute la classe, même hors ligne une fois chargé.</li></ol>';
  m.append(how);
  const f = el('div', 'card stack');
  const lab = el('label', 'lbl', 'Fichier pack (.json)'); const inp = el('input', 'inp'); inp.type = 'file'; inp.accept = '.json,application/json'; inp.id = 'pack-file'; lab.htmlFor = 'pack-file';
  const prev = el('div'); const msg = msgBox(); const pub = el('button', 'btn', 'Publier pour la classe'); pub.disabled = true;
  let pack = null;
  inp.onchange = async () => {
    msg.hidden = true; prev.innerHTML = ''; pub.disabled = true; pack = null;
    const file = inp.files[0]; if (!file) return;
    try { pack = JSON.parse(await file.text()); } catch (e) { msg.show('Ce fichier n\'est pas un JSON valide.'); return; }
    const v = Packs.validate(pack);
    if (!v.ok) { msg.show('Pack refusé : ' + v.errors.join(' · ')); pack = null; return; }
    const s = v.summary; prev.append(el('p', 'formmsg good', s.subject + ' : ' + s.chapters + ' chapitres, ' + s.questions + ' questions (' + s.counts.qcm + ' QCM, ' + s.counts.list + ' « Citez », ' + s.counts.open + ' ouvertes).'));
    pub.disabled = false;
  };
  pub.onclick = async () => { if (!pack) return; pub.disabled = true; pub.textContent = 'Publication…'; try { await Cloud.addPack({ subject:pack.subject.id, title:pack.title || pack.subject.name, content:pack, active:true }); msg.show('Publié. L\'app va se recharger.', true); setTimeout(refreshShared, 600); } catch (e) { msg.show(fmtErr(e)); pub.disabled = false; pub.textContent = 'Publier pour la classe'; } };
  f.append(lab, inp, prev, msg, pub);
  m.append(f);
  m.append(el('h3', 'sect', 'Packs publiés'));
  const holder = el('div', 'stack'); holder.append(el('p', 'sub', 'Chargement…')); m.append(holder);
  const all = await Cloud.packs(true);
  holder.innerHTML = '';
  if (!all) { holder.append(el('p', 'sub', 'Impossible de charger la liste (connexion ?).')); return; }
  if (!all.length) holder.append(el('p', 'sub', 'Aucun pack publié. Les matières de base (Proba, Angular, Comm) sont intégrées à l\'app.'));
  all.forEach(p => {
    const d = el('div', 'card arow'); const t = el('div', 't'); t.append(el('b', null, p.title || p.subject)); const c = p.content || {}; t.append(el('span', 'sub', (c.chapters || []).length + ' chapitres · ' + (c.questions || []).length + ' questions · ' + (p.active ? 'visible' : 'masqué')));
    const tg = el('button', 'btn ghost small', p.active ? 'Masquer' : 'Afficher'); tg.onclick = async () => { await Cloud.setPackActive(p.id, !p.active); refreshShared(); render(); };
    const x = el('button', 'btn ghost small', 'Supprimer'); let armed = false; x.onclick = async () => { if (!armed) { armed = true; x.textContent = 'Confirmer'; return; } await Cloud.delPack(p.id); refreshShared(); render(); };
    const btns = el('div', 'btnrow'); btns.append(tg, x); d.append(t, btns); holder.append(d);
  });
}
async function adminMembers(m) {
  const holder = el('div', 'stack'); holder.append(el('p', 'sub', 'Chargement…')); m.append(holder);
  const data = await Cloud.members(); holder.innerHTML = '';
  if (!data) { holder.append(el('p', 'sub', 'Impossible de charger les membres (connexion ?).')); return; }
  holder.append(el('p', 'sub', data.profiles.length + ' membre(s) inscrit(s).'));
  data.profiles.forEach(pf => {
    const mine = data.progress.filter(r => r.user_id === pf.id); const okN = mine.filter(r => r.last === true).length;
    const last = mine.reduce((a, r) => r.updated_at > a ? r.updated_at : a, '');
    const d = el('div', 'card arow'); const t = el('div', 't'); t.append(el('b', null, pf.display_name || 'Sans nom')); t.append(el('span', 'sub', okN + ' questions réussies · ' + mine.length + ' tentées' + (last ? ' · actif le ' + new Date(last).toLocaleDateString('fr-FR') : '')));
    d.append(t); holder.append(d);
  });
}

// ---------- démarrage ----------
$('#back').onclick = back;
$('#subjchip').onclick = () => { history = []; go({ name:'home' }, false); };
document.querySelectorAll('.tabs button').forEach(b => { b.querySelector('i').outerHTML = ICON[b.dataset.icon]; b.onclick = () => { history = []; go({ name:b.dataset.v }, false); }; });
(device.packs || []).forEach(p => { try { Packs.apply(p); } catch(e) {} });
view = { name: (Cloud.enabled() && !device.user && !device.guest) ? 'auth' : 'home' };
render();
(async () => {
  if (!Cloud.enabled()) return;
  const s = await Cloud.session();
  if (s) { await setUserFromSession(s); if (view.name === 'auth') { history = []; view = { name:'home' }; } render(); }
  refreshShared();
})();
window.addEventListener('online', () => { sync(); refreshShared(); });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sync(); });
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !/claude/.test(location.hostname)) {
  try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch(e) {}
}
})();
