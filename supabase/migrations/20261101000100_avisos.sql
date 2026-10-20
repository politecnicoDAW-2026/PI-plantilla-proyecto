-- Tabla de ejemplo de la plantilla: un tablón de avisos. Enseña los dos patrones de permisos:
-- leer, cualquiera que haya entrado; escribir, solo un rol. En la K04 la cambiáis por vuestra primera tabla.

create table public.avisos (
  id bigint generated always as identity primary key,
  titulo text not null check (char_length(titulo) between 1 and 120),
  texto text not null default '' check (char_length(texto) <= 2000),
  autor_id uuid not null default auth.uid() references public.perfiles (id),
  creado_en timestamptz not null default now()
);

-- 1. Seguridad por filas: sin esto, cualquiera con una cuenta del proyecto lee y escribe la tabla entera
alter table public.avisos enable row level security;

-- 2. Qué operaciones puede intentar quien ha entrado, y sobre qué columnas. Al crear, solo título y texto:
--    el autor y la fecha los pone la base de datos. Quien no ha entrado (anon) no tiene ningún permiso.
grant select, delete on public.avisos to authenticated;
grant insert (titulo, texto) on public.avisos to authenticated;

-- 3. Y sobre qué filas
create policy "quien ha entrado lee los avisos"
  on public.avisos for select to authenticated
  using ((select auth.uid()) is not null);

create policy "solo admin publica avisos, firmados por sí mismo"
  on public.avisos for insert to authenticated
  with check ((select private.rol_actual()) = 'admin' and autor_id = (select auth.uid()));

create policy "solo admin borra avisos"
  on public.avisos for delete to authenticated
  using ((select private.rol_actual()) = 'admin');
