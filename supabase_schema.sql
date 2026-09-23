-- ====================================================================
-- STUDIO Comp CTF Writeup Vault - Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ====================================================================

-- 1. Create table for CTF Flags
create table if not exists public.flags (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,                  -- Matches the writeup markdown filename slug (e.g. 'web-sqli-login')
  flag text not null,                         -- The secret flag text (e.g. 'STUDIO{...}')
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.flags enable row level security;

-- 3. Policy: Allow read access for public website readers
-- The website's server/client will query the flag by slug when "Reveal Flag" is clicked
create policy "Allow read flags by slug" 
  on public.flags 
  for select 
  using (true);

-- 4. Policy: Allow insert/update only via service_role key (used by CLI pnpm flag:set)
create policy "Allow full access for service role"
  on public.flags
  for all
  using (auth.role() = 'service_role');

-- 5. Seed sample flags for testing
insert into public.flags (slug, flag)
values
  ('studio-comp-intro-web', 'STUDIO{w3lc0m3_t0_stud10_ctf_2026}'),
  ('pwn-buffer-overflow-101', 'STUDIO{stack_sm4sh1ng_succ3ssful_0xdeadbeef}')
on conflict (slug) do update 
set flag = excluded.flag, updated_at = now();
