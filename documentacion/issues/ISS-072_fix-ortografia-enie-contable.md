# ISS-072: Fix ortografia -- reemplazar n por ñ en ejemplo corporativo

## Tipo
Fix

## Descripcion
Corregir palabras que requerian la letra ñ en el ejemplo corporativo M&A (/ejemplos/contable):
- "anos" -> "años" (x5: años de experiencia, años liderando, años asesorando)
- "acompan" -> "acompañ" (x3: acompañamiento, acompañando, acompañamos)

## Archivos
- `src/app/ejemplos/[slug]/page.tsx`

## Quality Gates
- [ ] npm test
- [ ] npm run build
