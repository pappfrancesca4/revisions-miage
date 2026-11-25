-- À exécuter dans Supabase → SQL Editor → Run (corrige « Impossible de charger… »)
-- Donne à l'app le droit d'utiliser les tables ; la sécurité reste assurée par les règles RLS.
grant usage on schema public to anon, authenticated;
grant select on public.exams, public.packs to anon;
grant select, insert, update, delete on public.exams, public.packs to authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.admins to authenticated;
grant select, insert, update on public.progress to authenticated;
grant usage, select on all sequences in schema public to authenticated;
notify pgrst, 'reload schema';
