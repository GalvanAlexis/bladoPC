# ISS-078: Dashboard admin + fix menu hamburguesa + login

## Resumen

Reparar menu hamburguesa (transparente por stacking context) y agregar panel de administracion con login para controlar imagenes, precios y recomendados desde la misma landing.

## Cambios

- `src/app/ejemplos/landing/hooks/useAdmin.ts` -- hook global con estado y localStorage
- `src/app/ejemplos/landing/components/Nav.tsx` -- createPortal para panel + boton Login
- `src/app/ejemplos/landing/components/AdminLogin.tsx` -- dialog login
- `src/app/ejemplos/landing/components/AdminDashboard.tsx` -- panel con pestanas
- `src/app/ejemplos/landing/components/Hero.tsx` -- usa useAdmin para precios
- `src/app/ejemplos/landing/components/Galeria.tsx` -- usa useAdmin para imagenes
- `src/app/ejemplos/landing/components/Testimonios.tsx` -- usa useAdmin para lista
- `src/app/ejemplos/landing/page.tsx` -- CSS login + dashboard

## Detalles

### Fix menu hamburguesa
- Causa: panel slide-in es hijo de `<nav>` con `position:fixed`, lo que crea stacking context limitado
- Solucion: usar `createPortal` de react-dom para renderizar overlay + panel en `document.body`

### Login
- Boton "Ingresar" en Nav (desktop y mobile)
- Dialog login: user `admin`, pass `admin123`
- Al exito, abre Dashboard

### Dashboard (3 pestanas)
1. **Imagenes**: 3 inputs URL para las fotos de galeria
2. **Precios**: input precio serum + input precio protector solar
3. **Recomendados**: CRUD de testimonios (nombre + texto + rating)

### Persistencia
- Todo en `localStorage` clave `lum-admin`
- Al cargar pagina, defaults del codigo si no hay datos guardados

## QA
- `npm run build` debe compilar sin errores
- Login con admin/admin123 debe abrir dashboard
- Cambiar imagenes/precios/recomendados debe reflejarse en vivo
- Menu hamburguesa debe verse solido (no transparente)
- Datos deben persistir al recargar pagina
