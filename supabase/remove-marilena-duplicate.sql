-- Run in the Supabase SQL Editor. The Level-9 record is never deleted.
-- Remove only the known duplicate, only while it remains at Level 1,
-- and only if the other known Marilena profile has at least 418 points.
with profile_points as (
  select sp.id, sp.profile_name, sp.profile_data,
    coalesce((
      select sum(value::numeric)
      from jsonb_each_text(coalesce(sp.profile_data->'areaStars', '{}'::jsonb))
      where key in ('mal','geteilt','plus','minus','stellenwert')
    ),0) as points
  from public.student_profiles sp
  where lower(trim(sp.profile_name)) = 'marilena'
)
delete from public.student_profiles sp
using profile_points duplicate
where sp.id = duplicate.id
  and sp.id = 'c53055d9-c32d-46bd-845c-3dc853f59f9b'::uuid
  and duplicate.profile_data->>'sharedLevelVersion' = '1'
  and duplicate.points + coalesce((duplicate.profile_data->>'levelBonus')::numeric,0) < 50
  and exists (
    select 1 from profile_points correct
    where correct.id = '23466c87-d253-47b6-8958-18f4409b2591'::uuid
      and correct.points >= 418
  )
returning sp.id, sp.profile_name as geloeschtes_profil;
