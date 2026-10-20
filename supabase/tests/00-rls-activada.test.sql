-- Ninguna tabla de public sin seguridad por filas. Si añadís una tabla y olvidáis activarla, este test falla.
begin;
select plan(1);

select is_empty(
  $$ select c.relname
     from pg_class c join pg_namespace n on n.oid = c.relnamespace
     where n.nspname = 'public' and c.relkind = 'r' and not c.relrowsecurity $$,
  'todas las tablas de public tienen RLS activada');

select * from finish();
rollback;
