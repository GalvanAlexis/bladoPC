# ISS-052: Mejora de la Sección "Sobre Mí"

**Descripción**: Refactorizar la sección `AboutSection` (`src/components/home/AboutSection.tsx`) aplicando interactividad mediante Framer Motion (layoutId) para mostrar el perfil del usuario dividido en 3 capítulos clave.

## Objetivos
- [x] Transformar lista estática en 3 tarjetas expansibles: Perfil Técnico, AIDO & Emprendedurismo, y Formación.
- [ ] Incorporar el feedback sobre formación: Técnico PC -> ISFDyT 57 -> Ing. Sistemas autodidacta.
- [ ] Aplicar animaciones de revelado y modales overlay.
- [ ] Ejecutar Quality Gates (`npm test && npm run build`).

## Detalles de Implementación
- El componente pasa a tener `"use client"`.
- Se integran `motion` y `AnimatePresence`.
- La información clave está contenida en `ABOUT_CHAPTERS`.

## Estado
En progreso.
