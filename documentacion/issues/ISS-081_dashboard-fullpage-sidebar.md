# ISS-081: Dashboard full-page con sidebar + remover formulario de Contacto

## Resumen

Remover el formulario de contacto estatico que quedo abajo de la pagina
y redisenar el AdminDashboard como una pantalla completa con sidebar
lateral en vez de modal con tabs horizontales.

## Cambios

### 1. Remover formulario vacio de Contacto
- Sacar el `<div>` del formulario (nombre, email, mensaje, boton enviar)
  de la seccion Contacto, ya que el modal de PresupuestoForm lo reemplaza.
- Mantener la columna izquierda con datos de contacto (direccion, telefono,
  email, horario, mapa).

### 2. AdminDashboard full-page con sidebar

**Layout actual (modal):**
- Modal centrado, max 700px
- Tabs horizontales arriba (Hero, Equipo, Servicios, FAQ, Recursos)
- Contenido crampeado, scroll interno
- Footer con botones

**Layout nuevo (full-page):**
- `position: fixed; inset: 0; z-index: 300` — ocupa todo el viewport
- Sin backdrop (es la pantalla en si)
- Body scroll lock
- Sidebar izquierda (~220px):
  - Header "Panel de Administracion"
  - Nav items: Hero, Equipo, Servicios, FAQ, Recursos
  - Item activo resaltado con granate
  - Al fondo: "Restaurar defaults" + "Volver al sitio"
- Area de contenido a la derecha:
  - Scrollable, ocupa el resto del viewport
  - Cada tab muestra su editor completo
  - Hero: inputs tagline + descripcion
  - Equipo/Servicios/FAQ/Recursos: CrudList con mejor espaciado
- Animacion de entrada: slide desde la derecha + fade

## Archivos a modificar

- `src/app/ejemplos/contable/components/AdminDashboard.tsx` — rediseno completo
- `src/app/ejemplos/contable/components/Contacto.tsx` — remover formulario
