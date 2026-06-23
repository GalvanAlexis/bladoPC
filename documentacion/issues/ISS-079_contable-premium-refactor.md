# ISS-079: Refactor premium web#2 — M&A Estudio Contable

## Resumen

Portear toda la arquitectura premium de web#1 (landing Lumina) a web#2 (Contable M&A):
extraer las ~1300 lineas inline de `ejemplos/[slug]/page.tsx` a componentes separados
con animaciones framer-motion, hamburguesa con createPortal, admin dashboard CRUD,
newsletter y persistencia localStorage.

## Archivos a crear

- `src/app/ejemplos/contable/page.tsx` — Pagina principal 'use client'
- `src/app/ejemplos/contable/hooks/useAdmin.ts` — Estado admin + CRUD + localStorage
- `src/app/ejemplos/contable/hooks/useActiveSection.ts` — IntersectionObserver hook
- `src/app/ejemplos/contable/components/Nav.tsx` — Nav + hamburguesa + createPortal
- `src/app/ejemplos/contable/components/Hero.tsx` — Hero con gradient + overlay + CTA
- `src/app/ejemplos/contable/components/Contadores.tsx` — Metricas animadas framer-motion
- `src/app/ejemplos/contable/components/Proceso.tsx` — Grid 4 pasos con lineas
- `src/app/ejemplos/contable/components/Timeline.tsx` — Linea tiempo 2012-2026
- `src/app/ejemplos/contable/components/Servicios.tsx` — Zigzag servicios + CRUD admin
- `src/app/ejemplos/contable/components/Diferenciales.tsx` — Why us grid
- `src/app/ejemplos/contable/components/Equipo.tsx` — Team grid + CRUD admin
- `src/app/ejemplos/contable/components/Recursos.tsx` — Cards popover + CRUD admin
- `src/app/ejemplos/contable/components/FAQ.tsx` — Acordeon nativo + CRUD admin
- `src/app/ejemplos/contable/components/Contacto.tsx` — Form + info + dialog flotante
- `src/app/ejemplos/contable/components/Newsletter.tsx` — Newsletter con estado success
- `src/app/ejemplos/contable/components/AdminLogin.tsx` — Login modal
- `src/app/ejemplos/contable/components/AdminDashboard.tsx` — Dashboard CRUD 5 tabs
- `src/app/ejemplos/contable/components/Footer.tsx` — Footer sitemap

## Archivos a modificar

- `src/app/ejemplos/[slug]/page.tsx` — Importar ContablePage desde contable/page,
  eliminar ~1300 lineas inline

## Tareas

### Bloque A — Infraestructura
- [ ] Crear `hooks/useActiveSection.ts` — hook reutilizable
- [ ] Crear `hooks/useAdmin.ts` — tipos, defaults, CRUD, localStorage
- [ ] Crear `components/AdminLogin.tsx` — login modal (admin/admin123)
- [ ] Crear `components/AdminDashboard.tsx` — dashboard con 5 tabs
- [ ] Crear `components/Newsletter.tsx` — email ejemplo + success state

### Bloque B — Componentes secciones
- [ ] Crear `components/Nav.tsx` — sticky + hamburguesa + createPortal + active observer
- [ ] Crear `components/Hero.tsx` — gradient + overlay + CTA + animaciones
- [ ] Crear `components/Contadores.tsx` — metricas con framer-motion useInView
- [ ] Crear `components/Proceso.tsx` — 4 pasos con grid + lineas conectoras
- [ ] Crear `components/Timeline.tsx` — linea vertical con dots + animacion
- [ ] Crear `components/Servicios.tsx` — zigzag + precio desde admin
- [ ] Crear `components/Diferenciales.tsx` — 4 cards checkmark
- [ ] Crear `components/Equipo.tsx` — team grid desde admin
- [ ] Crear `components/Recursos.tsx` — popover API nativa + contenido desde admin
- [ ] Crear `components/FAQ.tsx` — details/summary nativo + preguntas desde admin
- [ ] Crear `components/Contacto.tsx` — formulario + info + dialog consulta
- [ ] Crear `components/Footer.tsx` — sitemap 4 columnas

### Bloque C — Integracion
- [ ] Crear `contable/page.tsx` — pagina principal que monta todos los componentes
- [ ] Modificar `[slug]/page.tsx` — routing a contable/page, eliminar inline

### Quality Gates
- [ ] npm test
- [ ] npm run build

## Notas

- Mantener paleta granate `#7a1a1a` existente
- Mantener inline styles por consistencia con el proyecto
- No portear: Cart/MercadoPago, galeria embla, CursorGlow, ParallaxDecor, ScrollBackground
- Datos admin persistidos en localStorage con fallback a defaults
- framer-motion para entrance animations (ya en dependencias)
- createPortal para hamburguesa y modales
