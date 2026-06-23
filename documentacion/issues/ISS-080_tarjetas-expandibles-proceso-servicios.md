# ISS-080: Tarjetas expandibles en Proceso y Servicios de Contable

## Resumen

Agregar estado expandible con informacion detallada a las tarjetas de Proceso
(4 pasos) y Servicios (6 items) en la pagina corporativa M&A Estudio Contable.
Al clickear/tocar una tarjeta, se despliega contenido adicional con
framer-motion AnimatePresence.

## Archivos a modificar

- `src/app/ejemplos/contable/components/Proceso.tsx` — agregar `detalle` a cada
  paso, useState + AnimatePresence para expandir/colapsar
- `src/app/ejemplos/contable/components/Servicios.tsx` — useState + AnimatePresence
  para expandir/colapsar, mostrar `detalle` del servicio
- `src/app/ejemplos/contable/hooks/useAdmin.ts` — agregar campo `detalle` a
  `ServicioItem`, actualizar defaults con texto detallado
- `src/app/ejemplos/contable/components/AdminDashboard.tsx` — agregar campo
  `detalle` al CrudList de ServiciosTab

## Detalles de implementacion

### Proceso
- Cada paso del array `PROCESO` recibe un campo `detalle` con 3-4 lineas de
  informacion adicional
- Click en la tarjeta togglea el estado expandido
- El detalle se despliega debajo del texto actual con framer-motion
  `AnimatePresence` + `motion.div` slideDown
- La tarjeta cambia visualmente (borde granate sutil, indicador de expandido)

### Servicios
- `ServicioItem` recibe campo `detalle` (string opcional)
- Click en la tarjeta togglea expandido
- Mismo patron AnimatePresence que Proceso
- AdminDashboard: el tab Servicios ahora incluye campo `detalle` en el CRUD

## Tareas
- [ ] Agregar `detalle` a array PROCESO en Proceso.tsx
- [ ] Agregar `detalle` a ServicioItem en useAdmin.ts
- [ ] Agregar `detalle` a defaults de servicios en useAdmin.ts
- [ ] Agregar `detalle` al CrudList de ServiciosTab en AdminDashboard.tsx
- [ ] Implementar expandible en Proceso.tsx con framer-motion
- [ ] Implementar expandible en Servicios.tsx con framer-motion
- [ ] npm run build

## Notas
- Cursor pointer en las tarjetas
- Un solo item expandido a la vez (acordeon) o multiples (segun prefiera el user)
  -> multiples, para poder comparar
- Animacion suave con AnimatePresence + height auto
- prefers-reduced-motion respetado
