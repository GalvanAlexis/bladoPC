# ISS-060: Exclusividad Chascomus y pagina de servicios web

## Descripcion
- Agregar indicacion de cobertura exclusiva en Chascomus en la seccion Servicios IT del home.
- Crear pagina `/servicios` (placeholder) para listar diferentes webs que se pueden desarrollar.
- Cambiar boton "Ver servicios" del HeroSection para que redirija a `/servicios` en vez de al ancla `#servicios`.

## Archivos a modificar
- src/components/home/ServicesSection.tsx
- src/components/home/HeroSection.tsx

## Archivos a crear
- src/app/servicios/page.tsx

## Tareas

### FASE 1 - ServicesSection
- [ ] Agregar un badge o texto indicando "Exclusivo Chascomus" junto al titulo de la seccion

### FASE 2 - Pagina /servicios
- [ ] Crear pagina placeholder con AppShell y titulo "Proximamente..."

### FASE 3 - HeroSection
- [ ] Cambiar `<a href="#servicios">` por `<Link href="/servicios">`

### FASE 4 - CIERRE
- [ ] npm test
- [ ] npm run build
- [ ] Commit + PR + Merge
