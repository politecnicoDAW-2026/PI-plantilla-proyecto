-- Avisos: quien ha entrado los lee; solo admin los publica y los borra. Incluye lo que NO se debe poder hacer.
begin;
select plan(8);

set local role authenticated;

-- usuario.prueba
set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select is((select count(*)::int from public.avisos), 1, 'un usuario lee los avisos');
select throws_ok($$ insert into public.avisos (titulo) values ('Aviso falso') $$, '42501', null,
  'un usuario no publica avisos');
select lives_ok($$ delete from public.avisos $$, 'el borrado de un usuario no da error…');
select is((select count(*)::int from public.avisos), 1, '…pero no borra nada');

-- admin.prueba
set local request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select lives_ok($$ insert into public.avisos (titulo, texto) values ('Reunión', 'El jueves a las 10') $$,
  'admin publica un aviso');
select throws_ok($$ insert into public.avisos (titulo) values ('') $$, '23514', null,
  'un aviso sin título no entra (validación en la tabla)');
select throws_ok(
  $$ insert into public.avisos (titulo, autor_id) values ('Firmado por otro', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'nadie publica un aviso a nombre de otra persona');

-- sin sesión
set local role anon;
select throws_ok($$ select * from public.avisos $$, '42501', null, 'sin sesión no se leen avisos');

select * from finish();
rollback;
