# ISS-076: Upgrade Lumina — Refactor a componentes + Interactividad

## Resumen
Refactorizar el ejemplo vivo `/ejemplos/landing` (Lumina) extrayendo las ~540 lineas inline de `[slug]/page.tsx` a una arquitectura de componentes separados con Tailwind, y agregar interactividad usando APIs nativas del browser.

## Nivel 1 — Refactor (Componentes + Tailwind)
- Extraer a `src/app/ejemplos/landing/` con estructura de componentes
- Refactor de inline styles (`style={}`) a clases Tailwind
- Dividir en: Nav, Hero, Beneficios, Ingredientes, Testimonios, Newsletter, Footer
- Delegar desde `[slug]/page.tsx` a `src/app/ejemplos/landing/page.tsx`

## Nivel 2 — Interactividad
- **Dialog quick-view:** Al hacer click en "Comprar ahora", abrir `<dialog>` con detalle del producto, cantidad y CTA
- **Popover ingredientes:** Mostrar `<div popover>` con descripcion y beneficio al hacer click en cada ingrediente
- **Dark mode:** Toggle con `prefers-color-scheme` + `localStorage` (mismo patron que Vortex/Sabor Express)
- **Smooth scroll + active spy:** Navegacion con scroll suave y resaltado de seccion activa via IntersectionObserver
- **Toast notificacion:** Popover efimero al agregar al carrito desde quick-view

## Archivos a crear
| Archivo | Proposito |
|---|---|
| `src/app/ejemplos/landing/page.tsx` | Entry point, script dark mode, CSS vars, layout |
| `src/app/ejemplos/landing/components/Nav.tsx` | Navbar con dark toggle y smooth scroll |
| `src/app/ejemplos/landing/components/Hero.tsx` | Hero + quick-view dialog |
| `src/app/ejemplos/landing/components/Beneficios.tsx` | Cards beneficio con popover detalle |
| `src/app/ejemplos/landing/components/Ingredientes.tsx` | Grid ingredientes con popover |
| `src/app/ejemplos/landing/components/Testimonios.tsx` | Testimonios |
| `src/app/ejemplos/landing/components/Newsletter.tsx` | Captura email |
| `src/app/ejemplos/landing/components/Footer.tsx` | Footer minimal |

## Archivos a modificar
| Archivo | Cambio |
|---|---|
| `src/app/ejemplos/[slug]/page.tsx` | Eliminar `landing` de EJEMPLOS (lo maneja ruta estatica) |

## Restricciones
- Sin librerias externas nuevas — solo APIs nativas: `<dialog>`, `popover`, IntersectionObserver, CSS custom properties
- Sin cambios visuales respecto al diseño original de Lumina
- Mismo patron de dark mode que Vortex y Sabor Express (clase en `documentElement` + `localStorage`)

## QA
- `npm test` debe pasar
- `npm run build` debe compilar sin errores
- `/ejemplos/landing` debe cargar y verse visualmente identico al original
- Dark mode, dialog, popover, smooth scroll deben funcionar
