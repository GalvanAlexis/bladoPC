# ISS-073: Fix ortografia restante y caracteres chinos en timeline

## Tipo
Fix

## Descripcion
Dos correcciones en /ejemplos/contable:
- "Acompanamiento continuo" -> "Acompañamiento continuo" (faltaba ñ en el titulo del paso 4 del proceso)
- Caracteres chinos "专注" en entrada de timeline 2012 reemplazados por "enfocado en"

## Archivos
- `src/app/ejemplos/[slug]/page.tsx`

## Quality Gates
- [ ] npm test
- [ ] npm run build
