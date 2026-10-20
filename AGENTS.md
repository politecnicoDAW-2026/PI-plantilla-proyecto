# AGENTS.md

## Proyecto
Qué es y para quién, en dos líneas. (Cambiadlo en la K04.)
Especificación: docs/SPEC.md · Diseño: docs/DESIGN.md · Decisiones: docs/adr/ · Encargos: docs/issues/

## Stack
Vite + JavaScript (módulos ES, sin framework) · Supabase (Postgres con RLS, Auth)
Despliegue: GitHub Pages desde main (versiones exactas en package.json)

## Comandos
- Instalar:            npm ci
- Arrancar:            npm run dev           (necesita el .env: ver README)
- Tests:               npm test              (lógica de la web, sin Docker)
- Lint:                npm run lint
- Build:               npm run build
- Base de datos local: npm run db:start      (necesita Docker; npm run db:reset la vuelve a crear)
- Tests de RLS:        npm run test:db       (necesita la base de datos local)
- E2E:                 npm run test:e2e      (necesita la base de datos local y las dos variables del README)

## Estructura
- src/                 la web: pantallas (src/pantallas/), datos.js (todo lo que se pide a Supabase) y errores.js
- supabase/migrations/ tablas, políticas RLS y funciones, en SQL; una migración nueva por cambio
- supabase/tests/      tests de las políticas y las funciones (pgTAP)
- supabase/seed.sql    usuarios y datos inventados, solo para la base de datos local
- test/                tests de la lógica de la web (Vitest)
- e2e/                 tests de extremo a extremo (Playwright)

## Convenciones
- Una tarea = una rama = un PR pequeño.
- Primero el test que falla; después el código.
- Cada tabla nueva: RLS activada, `grant` solo de lo necesario (y por columnas al insertar) y su test pgTAP con casos
  de lo que un usuario NO debe poder hacer.
- Los permisos se deciden en la base de datos, nunca en la web. Lo que tiene reglas entre tablas va en una función.
- Con lo que viene de fuera, `textContent`, nunca `innerHTML`.
- Código en inglés o en español, pero el mismo en todo el proyecto; textos de la interfaz en español.

## Prohibido
- Borrar, saltar o debilitar tests para que pasen.
- Añadir dependencias sin avisar en el PR.
- La clave secreta de Supabase (sb_secret_…, o la antigua service_role) en cualquier fichero del repositorio.
- Arreglar un error de permisos dando permiso a todo (`grant … to anon`, `grant insert on … to authenticated`
  sin columnas, o una política `using (true)`): primero preguntar.
- Cambiar tablas a mano en el panel de Supabase: todo va en una migración.
- Editar migraciones ya fusionadas: crea una nueva.
- Datos personales reales o secretos en código, semillas, tests o prompts.

## Antes de dar una tarea por terminada
Pasa lint, tests y build; si has tocado la base de datos, también npm run test:db.
Resume qué has cambiado y qué no has podido verificar.
