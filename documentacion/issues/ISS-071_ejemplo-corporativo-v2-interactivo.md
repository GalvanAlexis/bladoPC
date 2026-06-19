# ISS-071: Ejemplo Corporativo V2 -- Interactividad y Diferenciacion

## Tipo
Feature

## Descripcion
Refactor del ejemplo corporativo M&A Estudio Contable (/ejemplos/contable) para diferenciarlo radicalmente del ejemplo landing (Lumina). Se agregan 5 nuevas secciones, componentes interactivos nativos (sin frameworks extra), layout zigzag, sidebar de navegacion interna y footer tipo sitemap.

## Archivos a modificar
- `src/app/ejemplos/[slug]/page.tsx` -- Refactor completo de ContablePage (~14 secciones vs 9 actuales)

## Cambios propuestos

### Nuevas secciones
1. **Top bar** con telefono/email/horario antes del nav
2. **FAQ con acordeon nativo** (`<details name="faq">`) -- exclusivo, searchable por "Find in page"
3. **Timeline "Nuestra historia"** con scroll-driven animations y pasos numerados
4. **Proceso en 4 pasos** con iconos numerados (Consulta -> Diagnostico -> Plan -> Acompanamiento)
5. **Footer sitemap** con 4 columnas (servicios, links, horarios, contacto)

### Componentes interactivos (APIs nativas del browser)
1. **Modal de consulta rapida** con `<dialog>` + `form method="dialog"` -- boton flotante "Consulta gratis"
2. **Popover de recursos** con `[popover="auto"]` -- al clickear un articulo del blog
3. **Contador animado en metrics** con Intersection Observer
4. **Sticky CTA mobile** con CSS position: sticky + media query
5. **Sidebar navegacion interna** con scroll-spy (Intersection Observer) -- solo desktop

### Layout
1. **Alternancia texto|imagen** en servicios (zigzag) en vez de grid centrado
2. **Fondos con cortes diagonales** via clip-path en secciones alternadas

## Interactividad detallada

### Modal consulta rapida
- Boton flotante "Consulta gratis" en esquina inferior derecha
- Al clickear abre `<dialog>` con formulario de 3 campos (nombre, telefono, consulta)
- `form method="dialog"` para cierre nativo con botones Enviar/Cancelar
- `closedby="any"` para cierre al hacer click fuera o Escape

### Popover recursos
- Click en tarjeta de articulo activa popover con resumen extendido
- `popover="auto"` con light-dismiss (click fuera cierra)

### Contador animado
- Intersection Observer detecta cuando la seccion metrics entra en viewport
- Incrementa numeros desde 0 hasta el valor final con `requestAnimationFrame`
- Solo una vez (disconnect tras disparar)

### Sticky CTA mobile
- Barra fija inferior con boton "Solicitar presupuesto"
- Solo visible en viewports < 768px
- `position: fixed` + `bottom: 0` con padding seguro

### Sidebar navegacion
- Columna izquierda sticky con links a cada seccion
- Intersection Observer marca seccion activa
- CSS custom property para indicador de posicion
- Solo visible en desktop (> 1024px)
- Back-link "Servicios" y breadcrumb incluidos

## Notas tecnicas
- No se agregan dependencias npm -- todo con APIs nativas HTML/CSS/JS inline
- Los scripts van en un bloque `<script>` dentro del componente usando useEffect o similar
- `prefers-reduced-motion` respetado en todas las animaciones
- ARIA attributes obligatorios en dialog, popover y detalles

## Quality Gates
- [ ] npm test (13 tests deben pasar)
- [ ] npm run build (compilacion sin errores)

## Referencias
- modern-web-guidance: `search-hidden-content`, `html`, `anchor-positioning-tab-underline`
- Basado en ISS-070 (ejemplo corporativo original)
