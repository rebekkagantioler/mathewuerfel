-- Zahlen-Abenteuer: cloud profiles protected by a child PIN.
-- Run this file once in the Supabase SQL Editor.
-- Profiles contain learning progress only. Do not store addresses, e-mail
-- addresses, or other sensitive personal data in `profile_data`.

create extension if not exists pgcrypto;

create table if not exists public.student_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_name text not null check (char_length(profile_name) between 1 and 16),
  pin_hash text not null,
  profile_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.student_profiles enable row level security;
revoke all on table public.student_profiles from anon, authenticated;

-- The browser never receives direct access to the table. It may only call the
-- small RPC interface below, which checks the PIN before returning or saving a
-- profile. Use at least a six-digit PIN in the app.
create or replace function public.open_student_profile(p_name text, p_pin text)
returns table (id uuid, profile_data jsonb)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if char_length(p_pin) < 6 or p_pin !~ '^[0-9]+$' then
    raise exception 'Die PIN muss mindestens sechs Ziffern haben.';
  end if;

  return query
  select sp.id, sp.profile_data
  from public.student_profiles sp
  where lower(sp.profile_name) = lower(trim(p_name))
    and sp.pin_hash = crypt(p_pin, sp.pin_hash)
  order by sp.updated_at desc
  limit 1;
end;
$$;

create or replace function public.create_student_profile(p_name text, p_pin text, p_profile_data jsonb)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare new_id uuid;
begin
  if char_length(trim(p_name)) not between 1 and 16 then
    raise exception 'Der Profilname muss 1 bis 16 Zeichen haben.';
  end if;
  if char_length(p_pin) < 6 or p_pin !~ '^[0-9]+$' then
    raise exception 'Die PIN muss mindestens sechs Ziffern haben.';
  end if;

  insert into public.student_profiles (profile_name, pin_hash, profile_data)
  values (trim(p_name), crypt(p_pin, gen_salt('bf')), p_profile_data)
  returning student_profiles.id into new_id;
  return new_id;
end;
$$;

create or replace function public.save_student_profile(p_id uuid, p_pin text, p_profile_data jsonb)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  update public.student_profiles
  set profile_data = p_profile_data, updated_at = now()
  where id = p_id and pin_hash = crypt(p_pin, pin_hash);
  return found;
end;
$$;

revoke all on function public.open_student_profile(text, text) from public;
revoke all on function public.create_student_profile(text, text, jsonb) from public;
revoke all on function public.save_student_profile(uuid, text, jsonb) from public;
grant execute on function public.open_student_profile(text, text) to anon, authenticated;
grant execute on function public.create_student_profile(text, text, jsonb) to anon, authenticated;
grant execute on function public.save_student_profile(uuid, text, jsonb) to anon, authenticated;
