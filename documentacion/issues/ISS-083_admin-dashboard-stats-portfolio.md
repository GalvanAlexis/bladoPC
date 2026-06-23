# ISS-083: Admin Dashboard + Stats Section del Portfolio

## Resumen

Agregar al portfolio principal la seccion de estadisticas con contadores animados
y el panel de administracion completo con login, sidebar y CRUD para gestionar
el contenido del portfolio.

## Archivos nuevos

- src/components/home/StatsSection.tsx
- src/components/home/hooks/useAdmin.ts
- src/components/home/AdminLogin.tsx
- src/components/home/AdminDashboard.tsx

## Archivos a modificar

- src/components/home/HomeLayout.tsx
- src/components/Navbar.tsx

## Tareas

- [ ] StatsSection con contadores animados (rAF + framer-motion)
- [ ] useAdmin hook con tipos, defaults y persistencia localStorage
- [ ] AdminLogin modal con credenciales admin/admin123
- [ ] AdminDashboard full-page con sidebar y tabs CRUD
- [ ] Integrar en HomeLayout y Navbar
- [ ] npm test
- [ ] npm run build
