# ISS-075: Ejemplo E-commerce / Delivery — Sabor Express

## Resumen
Crear el ejemplo vivo para el item "E-commerce" (#4) del catalogo de servicios.
Simula un servicio de delivery de comida rapida saludable (Sabor Express) con
home con menu, detalle de producto, checkout y panel admin con dashboard de ventas.

## Archivos a modificar
- `src/lib/services.tsx` - agregar `ejemploSlug: 'delivery'` y `examples[]` al item `ecommerce`
- `src/app/ejemplos/[slug]/page.tsx` - agregar entrada `'delivery'` en EJEMPLOS

## Archivos a crear
- `src/app/ejemplos/delivery/page.tsx` - Home + menu + carrito slide-out
- `src/app/ejemplos/delivery/[itemId]/page.tsx` - Detalle de producto
- `src/app/ejemplos/delivery/checkout/page.tsx` - Checkout + confirmacion
- `src/app/ejemplos/delivery/admin/page.tsx` - Admin dashboard (login + ventas + pedidos + productos)

## Tareas

### FASE 1 - Preparacion
- [ ] Agregar ejemploSlug y examples al item ecommerce en services.tsx
- [ ] Agregar entrada 'delivery' en EJEMPLOS en [slug]/page.tsx

### FASE 2 - Home + Menu (delivery/page.tsx)
- [ ] Top bar con logo, categorias scroll horizontal, carrito badge, admin link
- [ ] Hero promo banner con CTA
- [ ] Categoria tabs como pills
- [ ] Menu grid con items (imagen, nombre, precio, badge, boton +)
- [ ] Como funciona (3 pasos)
- [ ] Zona delivery + horarios
- [ ] Footer con direccion, telefono, horarios, redes
- [ ] Dark mode toggle
- [ ] Carrito slide-out con <dialog> mostrando items y total
- [ ] Toast notificacion al agregar item con popover

### FASE 3 - Detalle producto ([itemId]/page.tsx)
- [ ] Imagen grande + nombre + descripcion + precio
- [ ] Customizacion extras (select multiple simulado)
- [ ] Selector cantidad
- [ ] Botones Agregar al carrito + Ir al carrito
- [ ] Items relacionados

### FASE 4 - Checkout (checkout/page.tsx)
- [ ] Formulario: nombre, direccion, telefono, metodo pago
- [ ] Resumen del pedido con items y total
- [ ] Boton Confirmar pedido -> pantalla exito con numero pedido
- [ ] Scroll progress bar

### FASE 5 - Admin panel (admin/page.tsx)
- [ ] Login simulado con React state
- [ ] Dashboard: ingresos dia, pedidos pendientes, ticket promedio, productos top
- [ ] Tabla pedidos con estados (pendiente, preparando, camino, entregado)
- [ ] CRUD productos con toggle disponible/agotado y modal editar <dialog>

### FASE 6 - Interactividad nativa
- [ ] Carrito slide-out animado con <dialog>
- [ ] Toast popover al agregar item
- [ ] Categoria tabs scroll horizontal
- [ ] Dark mode con CSS custom properties + localStorage
- [ ] prefers-reduced-motion respetado
- [ ] ARIA en dialog y popover

### FASE 7 - Quality Gates
- [ ] npm test
- [ ] npm run build

### FASE 8 - CIERRE
- [ ] Commit + PR + Merge + Engram
