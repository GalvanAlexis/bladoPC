# ISS-041: Libros planificados clickeables

**Estado:** En progreso
**Branch de implementación:** `feature/ISS-041-libros-planificados`
**Tipo:** Bugfix / Mejora UX

---

## Visión General

Los libros con estado `locked` (checkbox `[ ]` en el tracking) no son clickeables, aunque tengan un archivo `.md` de contenido real planificado. Por ejemplo, en **Año 1 → Matemática I**, existe el archivo `01_Matemática_I.md` con contenido completo, pero como el status es `locked`, el libro no responde al click.

## Causa Raíz

Existe una confusión semántica entre dos conceptos:
- `status`: ¿El estudiante cursó/completó la materia? (`locked` / `progress` / `completed`)
- `hasContent`: ¿Existe un archivo .md con info? (`boolean` en `BookData`)

El click se bloquea con `isLocked`, cuando debería bloquearse únicamente si **no hay contenido** para mostrar (`topicsFilePath === null`).

## Solución

Desacoplar la interactividad del estado de completitud:
1. En `BookSpine.tsx`: Usar `isInteractable = book.topicsFilePath !== null` para habilitar el click y el hover, en lugar de `!isLocked`.
2. Mantener la distinción visual: Un libro `locked` con contenido se ve distinto a los `locked` sin contenido (color ligeramente diferente), pero no tiene los brillos de `completed` o `progress`.
3. En `BookIndex.tsx`: Mostrar un badge "📋 Planificado" si el libro está `locked` pero tiene contenido.
