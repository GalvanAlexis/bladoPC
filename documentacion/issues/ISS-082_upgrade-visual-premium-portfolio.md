# ISS-082: Upgrade Visual Premium del Portfolio

## Resumen

Portear las features premium visuales de las webs de ejemplo (Lumina web#1, Contable web#2)
al portfolio principal: theme dark/light, navbar premium con scroll spy y hamburguesa animada,
hero con 3D tilt y morph dialog, animaciones de secciones, y polish visual.

## Fases

### F1 — Sistema Dark/Light Theme
- CSS variables para light mode en globals.css
- Script flash prevention en layout.tsx
- Theme toggle con persistencia localStorage via AppContext
- Toggle button en Navbar y Sidebar

### F2 — Navbar Premium
- Scroll spy con IntersectionObserver
- Hamburguesa animada (3 lineas -> X)
- Desktop nav links con active section highlight
- Background intensity change on scroll

### F3 — Hero Premium
- Hook useMousePosition con rAF throttle
- 3D tilt tracking con Framer Motion spring
- Entry stagger animations (badge, titulo, desc, CTAs)
- Morph dialog con layoutId en CTA principal

### F4 — Animaciones de Secciones
- Potency meters con whileInView en Skills
- Scroll-driven entry animations (CSS view-timeline)
- Background color transitions entre secciones
- Mejora de timing y transitions en morph dialogs existentes

### F5 — Visual Polish
- CursorGlow decorativo (desktop, respeta reduced-motion)
- ReadingProgressBar (scroll-driven CSS)
- ParallaxDecor (capas decorativas sutiles)

## Archivos nuevos
- src/components/home/hooks/useMousePosition.ts
- src/components/home/ScrollBackground.tsx
- src/components/home/CursorGlow.tsx
- src/components/home/ParallaxDecor.tsx
- src/components/home/ReadingProgress.tsx

## Archivos a modificar
- src/app/layout.tsx
- src/app/globals.css
- src/lib/AppContext.tsx
- src/components/Navbar.tsx
- src/components/Sidebar.tsx
- src/components/home/HeroSection.tsx
- src/components/home/ServicesSection.tsx
- src/components/home/AboutSection.tsx
- src/components/home/SkillsSection.tsx
- src/components/home/HomeLayout.tsx

## Tareas
- [ ] F1: Sistema Dark/Light Theme
- [ ] F2: Navbar Premium
- [ ] F3: Hero Premium
- [ ] F4: Animaciones de Secciones
- [ ] F5: Visual Polish
- [ ] npm test
- [ ] npm run build
