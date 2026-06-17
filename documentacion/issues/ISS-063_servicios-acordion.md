# ISS-063: Accordion colapsable en catalogo de servicios

## Descripcion
Convertir las tarjetas del catalogo de servicios (/servicios) en un accordion colapsable para reducir el scroll vertical. Por defecto cada tarjeta muestra solo titulo, badge y preview; al clickear se expande para mostrar descripcion completa, ejemplos y publico objetivo.

## Archivos a modificar
- src/components/servicios/ServiciosCatalogo.tsx

## Tareas

### FASE 1 - Estado de expansion
- [ ] Agregar estado `expandedId` con useState
- [ ] Cada card clickeable togglea su estado

### FASE 2 - Render condicional
- [ ] Mostrar preview resumido cuando colapsado (titulo + badge + frase corta)
- [ ] Mostrar contenido completo cuando expandido (descripcion + ejemplos + persona)
- [ ] Transicion suave con framer-motion

### FASE 3 - CIERRE
- [ ] npm run build
- [ ] Commit + PR + Merge
