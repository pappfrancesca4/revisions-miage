-- ============================================================
-- Révisions MIAGE : à coller UNE fois dans Supabase → SQL Editor → Run
-- Crée : profils, admins, progression, examens, packs de contenu + règles de sécurité (RLS)
-- ============================================================

-- 1. Profils (créés automatiquement à l'inscription)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- 2. Administrateurs (liste gérée uniquement depuis Supabase)
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Progression de chaque élève
create table if not exists public.progress (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  qid text not null,
  ok integer not null default 0,
  ko integer not null default 0,
  last boolean,
  updated_at timestamptz not null default now(),
  primary key (user_id, qid)
);

-- 4. Examens à venir
create table if not exists public.exams (
  id bigint generated always as identity primary key,
  subject text not null,
  title text not null,
  exam_date date not null,
  details text,
  created_at timestamptz not null default now()
);

-- 5. Packs de contenu (cours + questions ajoutés depuis l'espace admin)
create table if not exists public.packs (
  id bigint generated always as identity primary key,
  subject text not null,
  title text,
  content jsonb not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- Sécurité (Row Level Security) ----------
alter table public.profiles enable row level security;
alter table public.admins   enable row level security;
alter table public.progress enable row level security;
alter table public.exams    enable row level security;
alter table public.packs    enable row level security;

-- Profils : chacun voit le sien, l'admin voit tout ; chacun modifie le sien
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Admins : lecture de sa propre ligne seulement (aucune écriture depuis l'app)
drop policy if exists "admins_select" on public.admins;
create policy "admins_select" on public.admins for select to authenticated using (user_id = auth.uid());

-- Progression : chacun lit/écrit la sienne, l'admin peut tout lire
drop policy if exists "progress_select" on public.progress;
create policy "progress_select" on public.progress for select to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists "progress_insert" on public.progress;
create policy "progress_insert" on public.progress for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "progress_update" on public.progress;
create policy "progress_update" on public.progress for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Examens et packs : lisibles par tous les inscrits, modifiables par l'admin seulement
drop policy if exists "exams_select" on public.exams;
create policy "exams_select" on public.exams for select to anon, authenticated using (true);
drop policy if exists "exams_admin" on public.exams;
create policy "exams_admin" on public.exams for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "packs_select" on public.packs;
create policy "packs_select" on public.packs for select to anon, authenticated using (active or public.is_admin());
drop policy if exists "packs_admin" on public.packs;
create policy "packs_admin" on public.packs for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- APRÈS avoir créé TON compte dans l'app, exécute cette ligne
-- (remplace l'adresse par la tienne) pour devenir administratrice :
--
--   insert into public.admins (user_id) select id from auth.users where email = 'ton.email@exemple.com';
-- ============================================================
