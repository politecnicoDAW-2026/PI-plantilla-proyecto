# DESIGN · nombre del proyecto

## Contexto
Personas y sistemas con los que se relaciona la aplicación.

## Arquitectura
Diagrama C4 (niveles 1 y 2, en Mermaid): la web en GitHub Pages,
Supabase (Auth y base de datos) y las Edge Functions si las hay.

## Modelo de datos
Entidades, relaciones y campos principales (diagrama E-R, en Mermaid).

## Tablas, políticas y funciones
| Tabla o función | Qué guarda o hace | Quién lee | Quién escribe | Historia |
|-----------------|-------------------|-----------|---------------|----------|

## Errores
| Error | De dónde sale (restricción, política o función) | Lo que ve la persona |
|-------|-----------------------------------------------|----------------------|

## Decisiones (ADR)
- docs/adr/001-autenticacion.md
- docs/adr/002-datos-personales.md
- docs/adr/003-una-decision-vuestra.md (por ejemplo, qué va en
  una función de la base de datos o en una Edge Function)

## Seguridad y datos
Qué datos se guardan, quién accede y cómo se protegen.
