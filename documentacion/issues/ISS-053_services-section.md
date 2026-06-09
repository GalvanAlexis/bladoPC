# ISS-053: Mejora de la Sección "Servicios IT"

**Descripción**: Refactorizar la sección `ServicesSection` (`src/components/home/ServicesSection.tsx`) aplicando interactividad mediante Framer Motion (layoutId) para mostrar los servicios como tarjetas expansibles.

## Objetivos
- [x] Transformar la lista estática en 3 tarjetas expansibles: Reparación de PC, Automatizaciones, y Ciencia de Datos.
- [ ] Aplicar feedback de usuario en Reparación de PC:
  - Eliminar microsoldadura y ultrasonido.
  - Foco en reemplazo de componentes dañados y fuerte enfoque en software.
  - Exclusivamente PCs de Escritorio.
- [ ] Aplicar animaciones de revelado y modales overlay.
- [ ] Ejecutar Quality Gates (`npm test && npm run build`).

## Detalles de Implementación
- El componente pasa a tener `"use client"`.
- Se integran `motion` y `AnimatePresence`.
- La información clave está contenida en `SERVICES`.

## Estado
En progreso.
