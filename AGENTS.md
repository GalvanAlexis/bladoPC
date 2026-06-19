<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

⚠️ Esta versión tiene breaking changes — APIs, convenciones y estructura de archivos pueden diferir de tu conocimiento de entrenamiento. Leer `node_modules/next/dist/docs/` antes de escribir código. Respetar los avisos de deprecación.
<!-- END:nextjs-agent-rules -->

---

# bladoPC — Reglas del Agente

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
.agents/
  skills/       → supabase | supabase-postgres-best-practices | modern-web-guidance
```

## Skills Disponibles

| Skill | Cuándo usar |
|---|---|
| `supabase` | Cualquier tarea que toque Supabase (DB, Auth, RLS, Storage) |
| `supabase-postgres-best-practices` | Queries, schema design, optimización Postgres |
| `modern-web-guidance` | **OBLIGATORIO** al inicio de cualquier tarea frontend (HTML/CSS/JS de cliente) |

## Convenciones
- **Branches:** `feature/ISS-XXX-nombre-corto`
- **Commits:** infinitivo descriptivo + referencia ISS (ej: `feat: agregar filtro de cursos ISS-025`)
- **PRs/Merges:** siempre hacia `master`, requiere tests verdes antes de merge
- **Issues:** archivos con formato `ISS-XXX_nombre-kebab-case.md` en `documentacion/issues/`

## Workflow Obligatorio

**LEER `documentacion/README.md` seccion "Workflow Obligatorio" — es la fuente de la verdad.**

Todo cambio de código DEBE seguir este flujo en orden estricto:

1. **Documentar el Issue:** Crear `documentacion/issues/ISS-XXX_nombre.md` ANTES de codificar.
2. **Crear la Rama:** `git checkout -b feature/ISS-XXX-nombre` o `fix/ISS-XXX-nombre`.
3. **Consultar Skills:** `modern-web-guidance` para frontend, `supabase` skill para DB.
4. **Implementar:** Codificar siguiendo las guías.
5. **Quality Gates:** `npm test && npm run build` — AMBOS deben pasar.
6. **Commit:** `git commit -m "tipo: descripcion infinitivo ISS-XXX"`.
7. **PR, Merge y Deploy:** `git push` -> `gh pr create` -> `gh pr merge --merge` -> `git checkout master; git pull`.
8. **Memoria (Cierre):** `engram_mem_session_summary` + `engram_mem_save` si aplica.

## Quality Gates por Defecto
Verificar los scripts del `package.json` del proyecto para determinar los comandos correctos.
Ejemplo típico: `npm test && npm run build` — deben pasar SIEMPRE antes de cerrar cualquier tarea.

## Lo que NO hacer
- ❌ No hacer push directo a `master` — siempre via PR
- ❌ No asumir el stack sin verificar el código y dependencias existentes
- ❌ No asumir comportamiento de frameworks sin verificar la versión instalada en el proyecto
- ❌ No implementar modales, tooltips, dialogs, animaciones o layouts sin consultar `modern-web-guidance` primero

