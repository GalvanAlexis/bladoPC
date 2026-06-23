# ISS-077: Landing premium cinematica para producto cosmetico

## Resumen

Refactorizar la landing de producto cosmetico (`/ejemplos/landing`) con animaciones cinematicas premium: hero 3D con tilt seguimiento de mouse, morph dialog con layoutId, scrollytelling con entry/exit por scroll-driven CSS, fondo con transiciones de color entre secciones, medidores de potencia en ingredientes con framer-motion whileInView, cursor glow decorativo en desktop y parallax decorativo con scroll-driven CSS.

## Cambios

- `documentacion/issues/ISS-077_landing-premium-cinematica.md` -- este archivo
- `src/app/ejemplos/landing/hooks/useMousePosition.ts` -- nuevo hook para tracking de mouse
- `src/app/ejemplos/landing/components/CursorGlow.tsx` -- nuevo componente cursor decorativo
- `src/app/ejemplos/landing/components/ParallaxDecor.tsx` -- nuevo componente parallax
- `src/app/ejemplos/landing/components/ScrollBackground.tsx` -- nuevo componente fondo transicional
- `src/app/ejemplos/landing/components/Hero.tsx` -- refactor: 3D tilt + morph dialog
- `src/app/ejemplos/landing/components/Beneficios.tsx` -- refactor: view-timeline reveal + 3D tilt
- `src/app/ejemplos/landing/components/Ingredientes.tsx` -- refactor: potency meters
- `src/app/ejemplos/landing/components/Testimonios.tsx` -- refactor: scroll snap + reveal
- `src/app/ejemplos/landing/page.tsx` -- refactor: integrar nuevos componentes + progress bar
- `src/app/globals.css` -- agregar keyframes utility para scroll-driven animations

## Detalles de implementacion

### useMousePosition.ts
- Custom hook que devuelve { x, y, isWithin, progressX, progressY }
- Toma un containerRef opcional para coord relativas
- No opera en touch devices ni con prefers-reduced-motion
- Throttled con rAF para performance

### CursorGlow.tsx
- Fixed div con radial-gradient, pointer-events: none
- Sigue posicion del mouse
- Opacidad variable: sutil por defecto, mas intensa sobre CTAs
- Solo visible en desktop (hover: hover + pointer: fine)
- Respeta prefers-reduced-motion

### ParallaxDecor.tsx
- 3-4 elementos decorativos con scroll-driven CSS
- animation-timeline: scroll(root block)
- Distintas velocidades de translateY (10% a 40%)
- Envuelto en @supports para graceful degradation

### ScrollBackground.tsx
- Fixed overlay con z-index: -1
- IntersectionObserver detecta que seccion esta en viewport
- Transicion CSS de background-color entre secciones
- Colores: hero (oscuro) -> beneficios (rose oscuro) -> ingredientes (violeta) -> testimonios (ambar) -> newsletter (oscuro)

### Hero.tsx -- 3D tilt
- Wrapper con perspective(1000px)
- Producto se inclina con rotateX/rotateY segun mouse usando useMousePosition
- rango de +/- 10 grados

### Hero.tsx -- Morph dialog
- Reemplazar <dialog> nativo por AnimatePresence + motion.div
- layoutId en imagen producto, badge, precio
- Misma UX: click en "Comprar ahora" abre dialog con animacion morph
- Toast con showPopover() se mantiene

### Beneficios.tsx
- CSS view-timeline para entry animation de cada card
- nth-child stagger delays
- 3D tilt micro-interaccion en hover con CSS perspective

### Ingredientes.tsx -- Potency meters
- Cada ingrediente tiene target de potencia (0-100%)
- framer-motion whileInView anima barra de 0 a target
- transition.delay creciente por indice
- Tooltip popover se mantiene

### Testimonios.tsx
- scroll-snap-type: x mandatory horizontal
- Entry animation con view-timeline
- Stagger visual

### page.tsx
- Montar CursorGlow, ParallaxDecor, ScrollBackground
- Barra de progreso de lectura con animation-timeline: scroll()
- Keyframes globales para view-timeline sections

### globals.css
- Keyframes genericos: fade-in-up, fade-out-up, scale-in
- Utility class .lum-section-reveal con view-timeline

## Restricciones
- Sin nuevas librerias npm (solo framer-motion ya instalado)
- Sin portfolio headers/footers en la landing
- Sin romper funcionalidad existente (popovers, theme toggle, newsletter)
- prefers-reduced-motion respetado en todas las animaciones
- CSS scroll-driven anim envueltas en @supports
- Cursor glow solo en desktop (hover: hover + pointer: fine)
- Datos de PRODUCT se mantienen iguales

## QA
- `npm test` debe pasar
- `npm run build` debe compilar sin errores
- `/ejemplos/landing` debe cargar con todas las nuevas animaciones
- Dark mode debe seguir funcionando
- En mobile, cursor glow no debe aparecer
- Con prefers-reduced-motion, todas las animaciones deben desactivarse
