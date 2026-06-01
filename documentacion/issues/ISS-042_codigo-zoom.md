# ISS-042: Ajuste de Bloques de Código y Zoom Dinámico

**Estado:** En progreso
**Branch de implementación:** `feature/ISS-042-codigo-zoom`
**Tipo:** Bugfix / Mejora UX

---

## Visión General

1. Los diagramas ASCII en bloques de código sin lenguaje se renderizan incorrectamente al heredar el ajuste de línea (word-wrap) del código en línea.
2. Los usuarios no tienen forma de ajustar el tamaño de fuente (zoom) dentro de la página del libro para mejorar la legibilidad.

## Solución

1. **Fix de MarkdownRenderer:** Ajustar la lógica de renderizado del elemento `code`. Detectar si el contenido tiene múltiples líneas y, de ser así, aplicar clases de bloque (`whitespace-pre`, `overflow-x-auto`) aunque no tenga un lenguaje especificado.
2. **Zoom con Ctrl+Wheel:** Añadir un listener nativo en `TopicPage.tsx` para el evento `wheel`. Interceptar si se presiona `Ctrl` y modificar el estado `zoomLevel`. Aplicar este estado a través de la propiedad CSS `zoom` en el contenedor.
