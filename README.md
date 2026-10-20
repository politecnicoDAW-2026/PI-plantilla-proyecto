# Nombre del proyecto

Qué es, para quién y enlace a producción (GitHub Pages). *Cambiadlo en la K04.*

Este repositorio sale de la plantilla del curso de Proyecto Intermodular: una web estática (Vite y JavaScript) que se
publica en GitHub Pages y usa Supabase para los datos, los usuarios y los permisos. Trae un ejemplo, un tablón de
avisos, que cambiaréis por vuestra primera historia.

## Capturas
## Funcionalidades
## Stack

- Web: Vite + JavaScript, sin framework. Se publica en GitHub Pages desde `main`.
- Datos, usuarios y permisos: Supabase (Postgres con seguridad por filas y Auth).
- Tests: Vitest (lógica de la web), pgTAP (políticas y funciones) y Playwright (de extremo a extremo).

## Puesta en marcha en local

Necesitas Node.js 22 o superior y Git. Docker es opcional: sin él no puedes levantar Supabase en local, pero sí
trabajar contra el proyecto del grupo en la nube.

```bash
npm ci
cp .env.example .env
```

**Con Supabase en local (con Docker):**

```bash
npm run db:start          # la primera vez descarga las imágenes; tarda unos minutos
npx supabase status       # copia «API URL» y la clave «Publishable» al .env
npm run dev               # http://127.0.0.1:5173
```

Usuarios de prueba, inventados (`supabase/seed.sql`): `usuario.prueba@example.invalid` y
`admin.prueba@example.invalid`, los dos con la contraseña `prueba-1234`.

**Con el proyecto del grupo en la nube (sin Docker):** pon en el `.env` la dirección del proyecto y su clave
**publicable** (panel de Supabase → Settings → API Keys). Nunca la secreta.

## Tests

```bash
npm run lint
npm test                  # lógica de la web, sin Docker
npm run test:db           # políticas y funciones, con la base de datos local
npm run test:e2e          # de extremo a extremo, con la base de datos local y las variables del .env
```

El CI de GitHub pasa todos en cada pull request, con su propio Supabase en local.

## Despliegue

1. **Proyecto de Supabase** (una persona del grupo, una vez): crea el proyecto en una región de la Unión Europea e
   invita a los demás. Después, en tu ordenador:

   ```bash
   npx supabase login
   npx supabase link --project-ref <la referencia de vuestro proyecto>
   npx supabase db push      # aplica las migraciones al proyecto de la nube
   ```

   Repite `npx supabase db push` cada vez que se fusione una migración nueva. La semilla de datos de prueba no se
   sube: en la nube, los usuarios se crean desde el panel.

2. **Variables del repositorio** (una vez): en GitHub, Settings → Secrets and variables → Actions → Variables, crea
   `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con los valores de vuestro proyecto. Son públicas: por eso
   van en *Variables* y no en *Secrets*.

3. **GitHub Pages**: cada push a `main` despliega solo (workflow «Pages»). La dirección es
   `https://<organización>.github.io/<repositorio>/`.

## Equipo y roles
## Uso de IA en el proyecto
## Licencia
