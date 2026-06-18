# ISS-067: Simulacion de landing real para producto cosmetico

## Resumen
Crear una pagina independiente `/ejemplos/landing` que simule una landing profesional de venta de producto cosmetico (Lumina serum facial natural). El boton "Ver ejemplo" en el catalogo de servicios debe linkear a esta simulacion en lugar de a la pagina de explicacion del servicio.

## Cambios
- `src/lib/services.tsx` -- agregar campo `ejemploSlug` a `ServiceItem`; setear `ejemploSlug: 'landing'` en el item landing
- `src/components/servicios/ServiciosCatalogo.tsx` -- cambiar link "Ver ejemplo" para usar `ejemploSlug` si existe, con fallback a `/servicios/${id}`
- `src/app/ejemplos/[slug]/page.tsx` -- nueva ruta dinamica con la simulacion de la landing real

## Contenido de la simulacion (/ejemplos/landing)
- Hero full-viewport con producto, tagline, precio y CTA
- Seccion de beneficios (3 cards)
- Ingredientes
- Testimonios
- Captura de email (lead gen)
- Footer minimal

## Restricciones
- Sin headers/footers del portfolio
- Sin explicaciones de armado ni referencias al portfolio
- Debe verse como un sitio web real e independiente
- Sin event handlers (Server Component)

## QA
- `npm test` debe pasar
- `npm run build` debe compilar sin errores
- `/ejemplos/landing` debe cargar y verse como una landing real
