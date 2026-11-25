// Couche « en ligne » : comptes, progression synchronisée, examens, packs de contenu (Supabase).
// Tout échoue proprement hors ligne : l'app continue avec les données enregistrées sur le téléphone.
window.Cloud = (function(){
  const cfg = window.SUPA || {};
  const enabled = !!(cfg.url && cfg.key && window.supabase && !/claude|claudeusercontent/.test(location.hostname));
  let sb = null, lastError = null;
  if (enabled) {
    try { sb = window.supabase.createClient(cfg.url, cfg.key, { auth: { persistSession: true, autoRefreshToken: true, storageKey: 'revisions-auth' } }); }
    catch (e) { sb = null; }
  }
  const ok = () => !!sb;
  const online = () => navigator.onLine !== false;
  const wrap = async (fn) => { try { return await fn(); } catch (e) { return { error: e }; } };

  async function session() {
    if (!ok()) return null;
    const r = await wrap(() => sb.auth.getSession());
    return (r && r.data && r.data.session) || null;
  }
  async function signUp(email, password, name) {
    const r = await sb.auth.signUp({ email, password, options: { data: { display_name: name } } });
    if (r.error) throw r.error;
    return r.data;
  }
  async function signIn(email, password) {
    const r = await sb.auth.signInWithPassword({ email, password });
    if (r.error) throw r.error;
    return r.data;
  }
  async function signOut() { if (ok()) await wrap(() => sb.auth.signOut()); }

  async function profile(uid) {
    const r = await wrap(() => sb.from('profiles').select('id, display_name').eq('id', uid).maybeSingle());
    const a = await wrap(() => sb.rpc('is_admin'));
    return { name: r.data ? r.data.display_name : null, admin: !!(a && a.data === true), error: r.error };
  }
  async function pullProgress(uid) {
    const r = await wrap(() => sb.from('progress').select('qid, ok, ko, last, updated_at').eq('user_id', uid));
    if (r.error) return null;
    return r.data || [];
  }
  async function pushProgress(uid, rows) {
    if (!rows.length) return true;
    const r = await wrap(() => sb.from('progress').upsert(rows.map(x => Object.assign({ user_id: uid }, x)), { onConflict: 'user_id,qid' }));
    return !r.error;
  }
  async function exams() {
    const r = await wrap(() => sb.from('exams').select('*').order('exam_date', { ascending: true }));
    lastError = r.error ? (r.error.message || String(r.error)) : null;
    return r.error ? null : r.data;
  }
  async function addExam(e) { const r = await sb.from('exams').insert(e); if (r.error) throw r.error; }
  async function delExam(id) { const r = await sb.from('exams').delete().eq('id', id); if (r.error) throw r.error; }
  async function packs(all) {
    let q = sb.from('packs').select('id, subject, title, content, active, created_at').order('id');
    if (!all) q = q.eq('active', true);
    const r = await wrap(() => q);
    lastError = r.error ? (r.error.message || String(r.error)) : null;
    return r.error ? null : r.data;
  }
  async function addPack(p) { const r = await sb.from('packs').insert(p); if (r.error) throw r.error; }
  async function setPackActive(id, active) { const r = await sb.from('packs').update({ active }).eq('id', id); if (r.error) throw r.error; }
  async function delPack(id) { const r = await sb.from('packs').delete().eq('id', id); if (r.error) throw r.error; }
  async function members() {
    const p = await wrap(() => sb.from('profiles').select('id, display_name, created_at'));
    const g = await wrap(() => sb.from('progress').select('user_id, qid, last, updated_at'));
    lastError = (p.error || g.error) ? ((p.error || g.error).message || String(p.error || g.error)) : null;
    if (p.error || g.error) return null;
    return { profiles: p.data || [], progress: g.data || [] };
  }
  function onAuth(cb) { if (ok()) sb.auth.onAuthStateChange((ev, s) => cb(ev, s)); }
  return { lastError: () => lastError, enabled: ok, online, session, signUp, signIn, signOut, profile, pullProgress, pushProgress, exams, addExam, delExam, packs, addPack, setPackActive, delPack, members, onAuth };
})();
