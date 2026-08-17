-- Unique Youth Association / Ganesh Chaturthi
-- Run this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text default 'Community Member',
  photo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;
alter table public.gallery enable row level security;

-- Public visitors can read active members and published gallery items.
drop policy if exists "Public can view active members" on public.members;
create policy "Public can view active members"
on public.members for select
using (is_active = true);

drop policy if exists "Public can view published gallery" on public.gallery;
create policy "Public can view published gallery"
on public.gallery for select
using (is_published = true);

-- For production admin writes, use Supabase Auth and add policies
-- for authenticated users with your chosen admin role/claim.
-- Example pattern:
-- create policy "Admins can manage members"
-- on public.members for all
-- to authenticated
-- using ((auth.jwt()->>'role') = 'admin')
-- with check ((auth.jwt()->>'role') = 'admin');

insert into public.members (name, role)
select 'Your Name Here', 'Community Member'
where not exists (select 1 from public.members);

insert into public.gallery (title)
select 'Our First Ganesh Chaturthi Memory'
where not exists (select 1 from public.gallery);

-- Storage:
-- Create a public bucket named "member-photos" for member photos.
-- Create a public bucket named "gallery" for event photos.
