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
- **PRs:** siempre hacia `main`, requiere tests verdes antes de merge
- **Issues:** archivos con formato `ISS-XXX_nombre-kebab-case.md` en `documentacion/issues/`

## Quality Gates por Defecto
Verificar los scripts del `package.json` del proyecto para determinar los comandos correctos.
Ejemplo típico: `npm test && npm run build` — deben pasar SIEMPRE antes de cerrar cualquier tarea.

## Lo que NO hacer
- ❌ No hacer push directo a `main` — siempre via PR
- ❌ No asumir el stack sin verificar el código y dependencias existentes
- ❌ No asumir comportamiento de frameworks sin verificar la versión instalada en el proyecto
