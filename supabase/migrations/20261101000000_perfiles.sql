-- Perfiles: el rol de cada persona que entra. Es la base de todas las políticas por rol.
-- Las migraciones ya fusionadas no se editan: cualquier cambio va en una migración nueva.

create table public.perfiles (
  id uuid primary key references auth.users (id) on delete cascade,
  usuario text not null unique,
  rol text not null default 'usuario' check (rol in ('usuario', 'admin'))
);

alter table public.perfiles enable row level security;

-- Desde la web solo se lee. El rol lo cambia el grupo desde el panel de Supabase, nunca la web.
grant select on public.perfiles to authenticated;

-- Funciones internas, en un esquema que la API no expone. «security definer» las ejecuta con los permisos de
-- quien las creó, así que pueden leer perfiles sin depender de las políticas de perfiles (evita el círculo).
create schema if not exists private;
grant usage on schema private to authenticated;

create function private.rol_actual()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select rol from public.perfiles where id = (select auth.uid())
$$;

revoke execute on function private.rol_actual() from public;
grant execute on function private.rol_actual() to authenticated;

create policy "cada persona ve su perfil"
  on public.perfiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "admin ve todos los perfiles"
  on public.perfiles for select to authenticated
  using ((select private.rol_actual()) = 'admin');

-- Cada persona que se da de alta en Supabase Auth tiene su perfil, con el rol por defecto
create function private.crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles (id, usuario) values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$;

create trigger crear_perfil_al_registrarse
  after insert on auth.users
  for each row execute function private.crear_perfil();
