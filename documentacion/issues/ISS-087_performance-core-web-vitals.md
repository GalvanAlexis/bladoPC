# ISS-087: Performance SEO - Core Web Vitals

## Resumen
Optimizar el home para Core Web Vitals: LCP (Largest Contentful Paint), INP (Interaction to Next Paint) y CLS (Cumulative Layout Shift). Un portfolio rapido es senal de calidad para Google y mejora la experiencia del usuario.

## Archivos a modificar
- src/components/home/HeroSection.tsx
- src/components/home/HomeLayout.tsx
- src/app/globals.css
- src/app/layout.tsx
- next.config.ts
- src/components/home/ServicesSection.tsx
- src/components/home/ParallaxDecor.tsx
- src/components/home/CursorGlow.tsx
- src/components/home/ScrollBackground.tsx

## Tareas

### LCP Optimization (Hero Section)
- [ ] **Video poster**: Agregar `poster` al video del hero (imagen estatica de preview) para que el LCP no dependa del video
- [ ] **Preload del video hero**: agregar `<link rel="preload" as="image" href="/video/bad-day.mp4" type="video/mp4">` o usar `fetchPriority="high"` en el video
- [ ] **Eliminar dependencia JS para LCP**: El H1 no debe depender de JS para renderizarse (actualmente usa framer-motion). Evaluar si el hero puede ser Server Component parcial o si se puede usar CSS animation en vez de JS.
- [ ] **Hero image placeholder**: Si el poster no es viable, considerar cambiar el video por una imagen estatica hero de alta calidad (menor peso, LCP mas rapido)

### INP Optimization (Interaction to Next Paint)
- [ ] **Auditar modales**: Los modales de servicios, about y skills usan framer-motion con layoutId. Evaluar si el INP se ve afectado en dispositivos lentos
- [ ] **Debounce/resize handlers**: Verificar que no haya handlers de scroll/resize sin passive: true
- [ ] **Minimizar layout shifts en hover**: Verificar que hover states (like skill-card:hover) no causen reflow
- [ ] **Button transitions**: Simplificar transiciones donde sea posible sin perder calidad visual

### CLS Optimization (Cumulative Layout Shift)
- [ ] **Dimensiones de video**: El video del hero tiene height 140% con top -20% - asegurar dimensiones explicitas para evitar CLS
- [ ] **Font swap**: Las fuentes Geist estan con `preload: false` en layout.tsx. Evaluar si causa CLS. Si es necesario, cambiar a `preload: true` o agregar fallback con `size-adjust`
- [ ] **Imagenes**: Si hay imagenes sin width/height, agregarlas

### Carga diferida de secciones below-fold
- [ ] **content-visibility**: Evaluar que las secciones Services, About, Skills, Stats, Contact tengan `content-visibility: auto` correctamente aplicado (ya hay clase `.section-lazy` pero no se usa en todas)
- [ ] **Lazy loading de videos**: El video de ServicesSection (Mind-explosion.mp4) debe tener `loading="lazy"` (es below-fold)
- [ ] **Reducir bundle JS**: Evaluar framer-motion impact. Considerar dynamic import con next/dynamic para componentes pesados que no estan en el viewport inicial (ParallaxDecor, CursorGlow, ScrollBackground)

### Configuracion Next.js (next.config.ts)
- [ ] Evaluar si agregar headers de cache para assets estaticos
- [ ] Evaluar `reactStrictMode` si afecta rendimiento
- [ ] Evaluar `compress: true` (gzip)

### Network y precarga
- [ ] Agregar `<link rel="preconnect" href="https://fonts.googleapis.com">` para fuentes externas si las hay
- [ ] Agregar preconnect a Groq API si se necesita en pages del home
- [ ] Evaluar si los SVGs inline son preferibles a iconos en el bundle

### QA y medicion
- [ ] npm test
- [ ] npm run build
- [ ] Ejecutar Lighthouse en localhost (target: Performance 90+, Accessibility 90+, SEO 100)
- [ ] Verificar con PageSpeed Insights (o web.dev/measure) que no haya regresiones
- [ ] Verificar CLS实测 (actual) con Chrome DevTools Performance tab

## Branch
`feature/ISS-087-performance-core-web-vitals`
