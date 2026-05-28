<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

⚠️ Esta versión tiene breaking changes — APIs, convenciones y estructura de archivos pueden diferir de tu conocimiento de entrenamiento. Leer `node_modules/next/dist/docs/` antes de escribir código. Respetar los avisos de deprecación.
<!-- END:nextjs-agent-rules -->

---

# Progresos-Academicos — Reglas del Agente

## Stack
Usar el stack más valorado del mercado para cada tarea. Antes de proponer tecnologías, leer el `package.json` y el código existente para determinar qué se está usando actualmente.

## Estructura de Carpetas
```
src/
  app/          → rutas y layouts (App Router)
  components/   → componentes reutilizables
  lib/          → utilidades y clientes de servicios
content/        → contenido Markdown (filosofías, CVs)
prisma/         → schema y migraciones (si aplica)
documentacion/
  issues/       → specs ISS-XXX_nombre.md
```

## Convenciones
- **Branches:** `feature/ISS-XXX-nombre-corto`
- **Commits:** infinitivo descriptivo + referencia ISS (ej: `feat: agregar filtro de cursos ISS-025`)
- **PRs/Merges:** siempre hacia `master`, requiere tests verdes antes de merge
- **Issues:** archivos con formato `ISS-XXX_nombre-kebab-case.md` en `documentacion/issues/`

## Workflow Estándar (El Circuito)
Para cualquier tarea que involucre cambios en el código, el agente DEBE seguir estrictamente este flujo:
1. **Documentar el Issue:** Crear o actualizar el archivo en `documentacion/issues/ISS-XXX_...md`.
2. **Crear la Rama:** Hacer checkout a una nueva rama `feature/ISS-XXX-...`.
3. **Implementar:** Escribir el código o solucionar el bug.
4. **Quality Gates:** Ejecutar rigurosamente los tests (`npm test`) y comprobar compilación (`npm run build`). AMBOS deben pasar (verde).
5. **Commit:** Hacer commit siguiendo la convención semántica indicando el ISS.
6. **Merge:** Volver a `master` y hacer merge de la rama feature (vía PR o fast-forward).
7. **Memoria (Cierre):** Ejecutar `mem_session_summary` (y `mem_save` si es necesario) para registrar la resolución en Engram.

## Quality Gates por Defecto
Verificar los scripts del `package.json` del proyecto para determinar los comandos correctos.
Ejemplo típico: `npm test && npm run build` — deben pasar SIEMPRE antes de cerrar cualquier tarea.

## Lo que NO hacer
- ❌ No hacer push directo a `master` — siempre via PR
- ❌ No asumir el stack sin verificar el código y dependencias existentes
- ❌ No asumir comportamiento de frameworks sin verificar la versión instalada en el proyecto
