# ISS-049 — Rediseño del Home: Portfolio Hero + Secciones narrativas

**Branch:** `feature/ISS-048-rebranding-proyecto` (misma branch, continuación del rebranding)
**Prioridad:** Alta
**Dependencias:** ISS-048 (completado)

## Objetivo
Reorganizar el Home para que refleje la finalidad real del portfolio:
- Identidad profesional de Alexis Galván (Blado)
- Habilidades técnicas full-stack + IA/datos
- Proyectos reales
- Asistente interactivo (Blado/chat)
- Árbol de habilidades navegable

El Home actual es una "room view" de videojuego con avatar clicable. El nuevo diseño será una experiencia scrollable moderna con secciones bien definidas.

## Cambios Propuestos

### Secciones del nuevo Home
1. **HeroSection** — Presentación directa: nombre, rol, tagline, CTAs (Chat Blado / Ver Habilidades)
2. **AboutSection** — Quién es, dónde vive, qué estudia, AIDO
3. **SkillsSection** — Cards de las áreas técnicas principales con entrada scroll-driven
4. **ProjectsSection** — Grid de proyectos destacados
5. **AssistantSection** — La escena del asistente Blado (chat interactivo)

### Guías Modern Web Guidance aplicadas
- `scroll-entry-exit-effects`: Reveal de secciones con scroll-driven animations (CSS puro, sin Framer Motion)
- `same-document-transitions`: View Transitions entre estados del asistente
- `performance`: Code-splitting, lazy loading, content-visibility

## Estado
- [ ] Crear `HomeHero.tsx`
- [ ] Crear `HomeAbout.tsx`
- [ ] Crear `HomeSkills.tsx`
- [ ] Crear `HomeProjects.tsx`
- [ ] Refactorizar `page.tsx` → layout scrollable con las secciones
- [ ] Mover el GameEngine (asistente) a sección dedicada dentro del scroll
- [ ] Aplicar `@keyframes` scroll-driven en `globals.css`
- [ ] Tests actualizados
