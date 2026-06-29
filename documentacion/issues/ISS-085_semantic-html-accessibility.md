# ISS-085: Semantic HTML + heading hierarchy + accesibilidad SEO

## Resumen
Refactorizar las secciones del home para usar HTML semantico correcto, jerarquia de headings (H1->H2->H3) sin saltos, landmark regions ARIA correctas, y mejorar la accesibilidad general para crawlers semanticos y AI Agents.

## Archivos a modificar
- src/components/home/HeroSection.tsx
- src/components/home/ServicesSection.tsx
- src/components/home/AboutSection.tsx
- src/components/home/SkillsSection.tsx
- src/components/home/StatsSection.tsx
- src/components/home/ContactSection.tsx
- src/components/home/HomeLayout.tsx
- src/components/Navbar.tsx
- src/components/Sidebar.tsx
- src/app/globals.css

## Tareas

### Auditar jerarquia de headings actual
- [ ] Verificar que HERO use un unico `<h1>` (sin duplicados en el home)
- [ ] Verificar que cada seccion (servicios, about, skills, contacto) use `<h2>` para su titulo principal
- [ ] Verificar que las cards/items dentro de secciones usen `<h3>` consistentemente
- [ ] Eliminar saltos de jerarquia (ej: pasar de h2 a h4 sin h3 intermedio)

### HeroSection.tsx
- [ ] Mantener el `<h1>` existente con el texto actual de preguntas animadas
- [ ] Agregar `<h2>` oculto (screen-reader only) con texto estatico: "Soluciones IT profesionales en Chascomus" para SEO estatico
- [ ] Agregar `role="banner"` a la section (es el hero/banner principal)
- [ ] Asegurar que el `<video>` tenga `aria-hidden="true"` (ya lo tiene)
- [ ] Agregar loading="eager" al video (es LCP candidate)

### ServicesSection.tsx
- [ ] El H2 actual "Como te puedo ayudar?" es bueno, mantenerlo
- [ ] Las cards de servicio actuales usan `<h3>` - verificar que esten semanticamente bien
- [ ] Agregar `aria-label` mas descriptivo: "Servicios de desarrollo y soporte IT"
- [ ] Los modales deben tener `role="dialog"` y `aria-modal="true"`

### AboutSection.tsx
- [ ] H2 "Sobre mi" correcto
- [ ] Cards usan `<h3>` - verificar
- [ ] Agregar `aria-label` descriptivo

### SkillsSection.tsx
- [ ] H2 actual "Areas de expertise" - verificar si se beneficia de "Habilidades y tecnologias"
- [ ] Cards con `<h3>` - verificar

### StatsSection.tsx
- [ ] Los numeros deben tener `aria-label` descriptivo (ej: "15 proyectos entregados")
- [ ] Considerar si tiene `<h2>` o es solo visual

### ContactSection.tsx
- [ ] H2 "Donde encontrarme" mantenible pero considerar fortalecer a "Contacto y redes"
- [ ] Agregar `role="contentinfo"` complementario o dejar como section con aria-label

### HomeLayout.tsx
- [ ] El `<main>` existente con `id="main-content"` es correcto
- [ ] Agregar `role="main"` al `<main>`
- [ ] Footer debe tener `<footer>` semantico en vez de div
- [ ] Agregar skip-to-content link como primer elemento del body

### Navbar.tsx
- [ ] El `<nav>` actual tiene clase fixed pero no `aria-label` - agregar `aria-label="Navegacion principal"`
- [ ] Verificar que el boton hamburguesa tenga `aria-expanded` correcto

### Sidebar.tsx
- [ ] Agregar `role="dialog"` y `aria-modal`
- [ ] Agregar `aria-label="Panel de navegacion"`

### CSS globals
- [ ] Crear clase `.sr-only` para contenido solo para screen readers (ya no viene en Tailwind v4 por defecto)
  ```css
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }
  ```

## QA
- [ ] npm test
- [ ] npm run build
- [ ] Verificar con WAVE o axe DevTools que no haya errores de jerarquia
- [ ] Verificar con Lighthouse Accessibility (target: 90+)

## Branch
`feature/ISS-085-semantic-html-accessibility`
