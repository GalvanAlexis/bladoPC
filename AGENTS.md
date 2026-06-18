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

## Workflow Estándar (El Circuito)
Para cualquier tarea que involucre cambios en el código, el agente DEBE seguir estrictamente este flujo:
1. **Documentar el Issue:** Crear o actualizar el archivo en `documentacion/issues/ISS-XXX_...md`.
2. **Crear la Rama:** Hacer checkout a una nueva rama `feature/ISS-XXX-...`.
3. **Consultar Skills:** Para tareas frontend, ejecutar `npx -y modern-web-guidance@latest search "<tarea>"` ANTES de escribir código. Para tareas de DB/Auth, leer `.agents/skills/supabase/SKILL.md`.
4. **Implementar:** Escribir el código o solucionar el bug, siguiendo las guías recuperadas.
5. **Quality Gates:** Ejecutar rigurosamente los tests (`npm test`) y comprobar compilación (`npm run build`). AMBOS deben pasar (verde).
6. **Commit:** Hacer commit siguiendo la convención semántica indicando el ISS.
7. **PR, Merge y Deploy:** Hacer push de la rama al remoto (`git push -u origin feature/...`). Luego, crear explícitamente el Pull Request en GitHub usando la CLI (`gh pr create --title "..." --body "..."`). Finalmente, fusionarlo remotamente (`gh pr merge --merge`). Volver a master y actualizar localmente (`git checkout master; git pull`). Todo PR y Merge DEBE reflejarse en el repositorio remoto (origin master) para disparar el CI/CD y el despliegue automático.
8. **Memoria (Cierre):** Ejecutar `mem_session_summary` (y `mem_save` si es necesario) para registrar la resolución en Engram.

## Quality Gates por Defecto
Verificar los scripts del `package.json` del proyecto para determinar los comandos correctos.
Ejemplo típico: `npm test && npm run build` — deben pasar SIEMPRE antes de cerrar cualquier tarea.

## Lo que NO hacer
- ❌ No hacer push directo a `master` — siempre via PR
- ❌ No asumir el stack sin verificar el código y dependencias existentes
- ❌ No asumir comportamiento de frameworks sin verificar la versión instalada en el proyecto
- ❌ No implementar modales, tooltips, dialogs, animaciones o layouts sin consultar `modern-web-guidance` primero

