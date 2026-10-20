-- Perfiles: cada persona ve el suyo, admin los ve todos y nadie cambia su rol desde la web.
-- Usa los usuarios de la semilla (supabase/seed.sql).
begin;
select plan(4);

set local role authenticated;

-- usuario.prueba
set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select results_eq($$ select usuario from public.perfiles $$, $$ values ('usuario.prueba') $$,
  'un usuario solo ve su propio perfil');
select throws_ok($$ update public.perfiles set rol = 'admin' $$, '42501', null,
  'un usuario no puede cambiar su rol (no hay grant de update)');

-- admin.prueba
set local request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select is((select count(*)::int from public.perfiles), 2, 'admin ve todos los perfiles');

-- sin sesión
set local role anon;
select throws_ok($$ select * from public.perfiles $$, '42501', null, 'sin sesión no se leen perfiles');

select * from finish();
rollback;
