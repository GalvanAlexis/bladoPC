# ISS-078: Landing premium mobile - navbar hamburguesa + galeria de imagenes

## Resumen

Refinar la landing de producto cosmetico (`/ejemplos/landing`) con mejoras mobile: navbar con hamburguesa y panel slide-in para mobile, galeria de 3 imagenes del producto con flechas triangulares y autoplay usando embla-carousel-react.

## Cambios

- `documentacion/issues/ISS-078_landing-premium-mobile.md` -- este archivo
- `package.json` -- agregar `embla-carousel-react`
- `src/app/ejemplos/landing/components/Nav.tsx` -- refactor: hamburguesa + slide panel
- `src/app/ejemplos/landing/components/Hero.tsx` -- refactor: galeria con embla-carousel
- `src/app/ejemplos/landing/components/Galeria.tsx` -- nuevo componente de galeria
- `src/app/ejemplos/landing/page.tsx` -- ajustes de estilos responsivos

## Detalles de implementacion

### Nav.tsx - Hamburguesa + Slide Panel
- Boton hamburguesa (3 lineas animadas -> X) visible solo en mobile (< 768px)
- Panel slide-in desde la derecha usando framer-motion `AnimatePresence`
- `motion.div` con `initial={{ x: '100%' }}` y `animate={{ x: 0 }}`
- Overlay backdrop con blur detras
- Links con stagger delay
- Cerrar al clickear link, tap en overlay, o Escape
- En desktop (> 768px) se mantiene igual (links inline)

### Hero.tsx - Galeria de imagenes
- Usar embla-carousel-react para el carrusel
- 3 imagenes del producto desde Unsplash (distintos angulos)
- Flechas triangulares (◂ ▸) semi-transparentes a los costados
- Dots indicadores abajo de la imagen
- Autoplay cada 5s, pausa al hover
- Swipe táctil nativo (embla lo provee)
- Transicion smooth entre slides
- La galeria reemplaza la imagen estatica actual en `.lum-hero-visual`

### Nuevo componente Galeria.tsx
- Encapsula la logica de embla-carousel
- Props: imagenes, autoplayInterval
- Renderiza: viewport, slides, flechas, dots

## Restricciones
- Sin romper el layout desktop existente
- La imagen del producto en desktop debe mantener el mismo tamaNo y estilo visual
- prefers-reduced-motion respetado
- Dark mode debe seguir funcionando

## QA
- `npm test` debe pasar
- `npm run build` debe compilar sin errores
- En mobile (< 768px), navbar debe mostrar hamburguesa
- En desktop (> 768px), navbar debe mostrar links inline
- Galeria debe mostrar 3 imagenes con navegacion por flechas y dots
- Autoplay debe pausarse al hover
- Swipe touch debe funcionar en mobile
