# ISS-061: Catalogo completo de servicios web / SaaS / software

## Descripcion
Reemplazar la pagina placeholder `/servicios` con un catalogo completo de todos los tipos de paginas web, SaaS y software que se pueden desarrollar. Ordenado de menor a mayor complejidad, con descripcion, para que sirve y a que cliente apunta.

## Archivos a modificar
- src/app/servicios/page.tsx (reescribir completamente)

## Archivos a crear
- src/components/servicios/ServiciosCatalogo.tsx (componente del catalogo)

## Tareas

### FASE 1 - Componente catalogo
- [ ] Crear componente ServiciosCatalogo con listado completo ordenado por complejidad
- [ ] Cada item: titulo, descripcion, publico objetivo, badge de complejidad

### FASE 2 - Pagina
- [ ] Actualizar page.tsx para usar el nuevo componente
- [ ] Actualizar metadata

### FASE 3 - CIERRE
- [ ] npm test
- [ ] npm run build
- [ ] Commit + PR + Merge
