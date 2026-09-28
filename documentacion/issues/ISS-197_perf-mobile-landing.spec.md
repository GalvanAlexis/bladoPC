# ISS-197 — Performance Mobile: Landing Page pesada en gama media-baja

## Contexto del problema

La landing page (`/`) presenta lentitud perceptible en dispositivos moviles de gama media-baja:
- Las tarjetas de Servicios y Habilidades tardan en abrirse y cerrarse.
- El scroll se siente pesado y poco fluido.
- El costo de render global es excesivo para CPUs limitadas.

---

## Investigacion Realizada (2026-09-28)

### 1. Arquitectura de renderizado — Problema: "use client" en todo el arbol

**Todo `HomeLayout` es un Client Component.** El archivo `HomeLayout.tsx` tiene `"use client"` en la linea 1
y no usa lazy/Suspense para ningun componente de sección. Esto implica que:
- Todo el JavaScript de Hero, Services, About, Skills, FAQ y Contact se envia y ejecuta en el cliente desde el inicio.
- Los 6 componentes de seccion son importados de forma **estática y sincrona** — nada se carga lazy con Suspense.
- `React.lazy` y `Suspense` estan importados en `HomeLayout.tsx` pero **nunca se usan**.

### 2. Capas de animacion simultaneas

Al cargar la landing, estos **5 sistemas de animacion corren en paralelo** sobre el hilo principal:

| Componente | Mecanismo | Impacto en mobile |
|---|---|---|
| `RevealObserver` | IntersectionObserver + classList mutations | Bajo (ok) |
| `ReadingProgress` | `scroll` event + `useState` => re-render | **Medio** — re-render en cada px scrolleado |
| `ScrollBackground` | IntersectionObserver + `useState` + MutationObserver | **Medio** |
| `ParallaxDecor` | scroll-driven animation CSS | **Bajo** en Chrome |
| `HeroSection` | `useMousePosition` hook — mousemove + RAF + `useState` | Alto desktop, desactivado en mobile |

`ReadingProgress` llama a `setProgress()` en cada evento scroll → re-render de React en cada pixel.
En CPUs lentas esto genera Long Tasks.

### 3. Dos videos en autoplay simultaneos

- `HeroSection`: `/video/bad-day.mp4` — **1.05 MB**, **sin** `preload="none"`, con `autoPlay`.
- `ServicesSection`: `/video/Mind-explosion.mp4` — **1.75 MB**, con `preload="none"` pero con `autoPlay`.

El video del Hero no tiene `preload="none"`, el navegador lo descarga inmediatamente.
En 3G/4G lenta esto bloquea o retrasa el render del LCP.
Dos streams de video a la vez consumen CPU y RAM extras en hardware limitado.

### 4. Glassmorphism con backdrop-filter: blur() — El principal asesino de FPS en mobile

Se encontraron **7 instancias** de `backdrop-filter: blur()` activas:

| Archivo | Blur | Cuando activo |
|---|---|---|
| `globals.css` → `.skill-card` | `blur(16px)` | **Siempre** (todas las cards de Habilidades) |
| `globals.css` → `.servicio-card` | `blur(16px)` | **Siempre** (todas las cards del catalogo /servicios) |
| `globals.css` → `.btn-secondary` | `blur(10px)` | **Siempre** (botones) |
| `ServicesSection.tsx` (modal overlay) | `blur(4px)` | Al abrir modal |
| `SkillsSection.tsx` (modal overlay) | `blur(4px)` | Al abrir modal |
| `HeroSection.tsx` (modal overlay) | `blur(4px)` | Al abrir modal |
| `AboutSection.tsx` (modal overlay) | `blur(4px)` | Al abrir modal |

El `backdrop-filter: blur(16px)` en `.skill-card` es **siempre activo** — cada tarjeta crea una capa de
composicion que el GPU del celular debe renderizar constantemente.
Esto es lo que causa la lentitud al abrir/cerrar modales: se agrega una capa de blur sobre el overlay
mientras ya hay otras capas activas debajo.

**Este es el principal culpable reportado** ("tardan en abrir las tarjetas, tardan en cerrar").

### 5. Bundle JS — Chunks pesados sin identificar

El chunk mas grande del build es de **422 KB** (sin gzip). Top chunks:
- `0j3ig_2pe-kja.js` → 422.9 KB
- `05z7gdapzva0c.js` → 247.9 KB
- `0lmy5p8t7j9ll.js` → 222.2 KB
- `0laxlxsqof8r-.js` → 117.8 KB

Sin `@next/bundle-analyzer` no se puede identificar que librerias los componen.
Sospechosas que **no deberian** estar en el bundle de `/`:

| Libreria | Tamaño estimado minificado | Usado en landing `/` |
|---|---|---|
| `recharts` | ~250 KB | No — solo en `/admin/clientes` |
| `@hello-pangea/dnd` | ~80 KB | No — solo en `/admin/kanban` |
| `highlight.js` | ~100 KB | No — solo en `/chat` |
| `react-markdown` + `rehype-highlight` | ~70 KB | No — solo en `/chat` |
| `embla-carousel-react` | ~15 KB | Si — ServicesSection y SkillsSection |

### 6. AppContext — Double-render en hydration

`AppContext.tsx` tiene un patron que genera un **doble render visible**:

```tsx
if (!isMounted) {
  return <div style={{ minHeight: '100vh', background: '#050505' }} />;
}
```

Al montar: renderiza primero un div negro vacio (flash), luego renderiza toda la app.
Esto produce un parpadeo y una segunda pasada de render completa en cada visita.

### 7. RevealObserver — Re-animacion innecesaria al scroll up

`RevealObserver.tsx` remueve la clase `in-view` cuando el elemento sale del viewport (linea 16).
Esto hace que todas las secciones se des-animen al hacer scroll hacia arriba y se re-animen al bajar.
En mobile, el continuo toggle de opacity y transform con `will-change` activo genera layout thrashing.

### 8. Geist font con preload: false

```tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,  // problema
});
```

No se precarga la fuente → potencial FOIT (Flash of Invisible Text) que afecta el LCP percibido.

---

## Diagnostico Resumido — Arbol de Causas

```
Lentitud en mobile
├── [CRITICO] backdrop-filter: blur() siempre activo en .skill-card y .servicio-card
│   └── GPU overflow → FPS drop en interacciones (open/close modal)
├── [ALTO] Video autoplay sin preload="none" en HeroSection (1.05 MB)
│   └── Bloquea/retrasa LCP en conexiones lentas
├── [ALTO] ReadingProgress con setState en cada scroll event
│   └── Long Tasks en CPU de gama baja
├── [MEDIO] Todo el arbol Home es "use client" sin lazy loading real
│   └── Bundle JS completo se evalua antes del primer frame
├── [MEDIO] Double render por patron isMounted en AppContext
│   └── Flash negro + 2 pasadas de render
├── [MEDIO] Bundle potencialmente inflado por recharts/highlight.js (a confirmar)
│   └── Requiere @next/bundle-analyzer para verificar
├── [BAJO] RevealObserver re-anima al scroll-up (will-change activo constante)
├── [BAJO] Geist font con preload: false (FOIT)
└── [BAJO] ParallaxDecor con scroll-driven animation (compositing layer extra)
```

---

## Plan de Solucion (3 fases)

### 🎯 Fase 1 — Quick Wins (mayor impacto, menor riesgo)
1. Eliminar `backdrop-filter: blur()` en `.skill-card` y `.servicio-card`.
   Reemplazar con `background: var(--surface)` solido. Mantener blur SOLO en modal overlays.
2. Agregar `preload="none"` al video del Hero (`bad-day.mp4`).
3. Refactorizar `ReadingProgress` a CSS scroll-driven animations (sin JS ni `setState`).
4. Fijar `RevealObserver` — usar `unobserve` despues del primer reveal (una sola vez).

### 🎯 Fase 2 — Arquitectura Client/Server Split
5. Eliminar `"use client"` de `HomeLayout` — convertir en Server Component.
   Pasar secciones estaticas (FAQ, Contact, Footer) a Server Components.
6. Agregar `dynamic()` con `ssr: false` y `Suspense` real para secciones pesadas below-fold.
7. Corregir el patron `isMounted` en AppContext para evitar el doble render en hydration.

### 🎯 Fase 3 — Bundle Optimization
8. Instalar `@next/bundle-analyzer` y confirmar si recharts/highlight.js estan en el bundle de `/`.
9. Si confirmado: aplicar `dynamic()` con `ssr: false` en admin y chat.
10. Activar `preload: true` en Geist font.

---

### 🎯 Target Files Permitidos

**Fase 1:**
- [MODIFY] src/app/globals.css
- [MODIFY] src/components/home/HeroSection.tsx
- [MODIFY] src/components/home/ReadingProgress.tsx
- [MODIFY] src/components/home/RevealObserver.tsx

**Fase 2:**
- [MODIFY] src/components/home/HomeLayout.tsx
- [MODIFY] src/lib/AppContext.tsx
- [MODIFY] src/app/layout.tsx

**Fase 3:**
- [NEW] next.config.ts (bundle-analyzer)
- [MODIFY] src/app/admin/clientes/page.tsx
- [MODIFY] src/app/admin/kanban/page.tsx
- [MODIFY] src/app/chat/page.tsx

### 🚫 Acciones Prohibidas (Guardrails)
- Prohibido usar Playwright para ninguna parte de este issue.
- Prohibido remover animaciones visuales sin equivalente CSS nativo.
- Prohibido modificar rutas, schemas de DB, o archivos `.env`.
- Prohibido instalar nuevas dependencias de animacion pesadas.
- Prohibido alterar logica de negocio (modales, View Transitions, carruseles).
- Prohibido desactivar los videos — solo optimizarlos.

### 🧪 Quality Gate Determinista
`npm run build`

Build sin errores TypeScript. Verificacion visual: abrir/cerrar modal en mobile emulado
(DevTools Throttling → Mid-tier mobile) debe tener transicion fluida sin jank visible.

---

## Referencias Cruzadas
- ISS-193: Purga de framer-motion (completado)
- ISS-186, ISS-190, ISS-192: View Transitions (relacionado)
- Engram: "El backdrop-blur mata los FPS en celulares" (CRM-Negocio)
