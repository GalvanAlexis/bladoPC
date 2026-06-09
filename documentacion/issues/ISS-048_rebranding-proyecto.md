# ISS-048: Rebranding Completo del Proyecto

**Estado:** En Planificación
**Branch:** `feature/ISS-048-rebranding-proyecto`
**Tipo:** Refactor Estructural / Visual
**Prioridad:** Alta

---

## Objetivo

Realizar un rebranding integral de "Progresos Académicos — Blado Cavern". Esto implica una redefinición de la identidad visual, colores, tipografía, estilo de componentes, y posiblemente el tono o nombre del proyecto en sí, afectando a la UI global de la aplicación.

## Requisitos y Tareas Pendientes

- [ ] Definir nueva paleta de colores y tokens CSS (`oklch`).
- [ ] Definir nueva tipografía.
- [ ] Actualizar estilos globales y componentes core (DialogBox, SkillTree, Layouts).
- [ ] Actualizar assets si es necesario (Favicon, Logo, Sprites).
- [ ] Actualizar textos y copy para reflejar la nueva identidad.

## Notas de Implementación

- Requerirá el uso de `modern-web-guidance` para asegurar que el nuevo UI use las mejores prácticas modernas de CSS (Container Queries, `:has()`, animaciones CSS sobre JS).
- Impacto global: requiere testing minucioso en todas las rutas.
