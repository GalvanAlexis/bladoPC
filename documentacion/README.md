# Portfolio Blado — Documentacion del Proyecto

> Portfolio profesional de Alexis Galvan con asistente virtual de IA (Blado) integrado.

---

## Workflow Obligatorio

**ESTE WORKFLOW ES DE CUMPLIMIENTO OBLIGATORIO PARA TODA TAREA QUE INVOLUCRE CAMBIOS EN EL CODIGO.** Ningun paso puede saltarse. Si el agente lo incumple, se considera un error grave.

### Paso 1 — Documentar el Issue

Antes de escribir UNA SOLA LINEA de codigo, crear o actualizar el archivo de especificacion en `documentacion/issues/ISS-XXX_nombre-kebab-case.md`.

Formato:
```markdown
# ISS-XXX: Titulo descriptivo

## Resumen
[Una linea clara de que hay que hacer]

## Archivos a modificar
[lista de archivos]

## Tareas
- [ ] checklist de lo necesario
- [ ] checklist de lo necesario
- [ ] npm test
- [ ] npm run build
```

**Regla:** Sin archivo ISS, no se puede empezar a codificar.

### Paso 2 — Crear la Rama

La rama DEBE llamarse `feature/ISS-XXX-nombre-corto` o `fix/ISS-XXX-nombre-corto`.

```bash
git checkout -b feature/ISS-XXX-nombre-corto
```

**Regla:** Nunca pushear directo a `master`. Nunca codelear sobre `master`.

### Paso 3 — Consultar Skills (si aplica)

- **Tarea frontend (HTML/CSS/JS de cliente):** ejecutar `npx -y modern-web-guidance@latest search "<descripcion>"` ANTES de escribir codigo. Recuperar la guia completa con `retrieve`.
- **Tarea de DB/Supabase:** leer `.agents/skills/supabase/SKILL.md`.

### Paso 4 — Implementar

Escribir el codigo siguiendo las guias del paso 3 (si aplica) y las convenciones del proyecto (ver AGENTS.md).

### Paso 5 — Quality Gates

Ejecutar AMBOS:

```bash
npm test          # Todos los tests deben pasar
npm run build     # Compilacion exitosa sin errores
```

**Regla:** Si alguno falla, NO se puede hacer commit. Corregir primero.

### Paso 6 — Commit

```bash
git add -A
git commit -m "tipo: descripcion en infinitivo ISS-XXX"
```

Tipos aceptados: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.

Ejemplo: `feat: agregar boton volver al inicio en catalogo de servicios`

### Paso 7 — PR, Merge y Deploy

```bash
git push -u origin feature/ISS-XXX-nombre-corto
gh pr create --title "tipo: descripcion ISS-XXX" --body "cambios..."
gh pr merge --merge
git checkout master
git pull
```

**Regla:** Todo cambio debe pasar por PR y ser mergeado. No hay excepciones.

### Paso 8 — Memoria (Engram)

Registrar en Engram:

```
engram_mem_session_summary (o engram_mem_save)
```

Esto guarda contexto para sesiones futuras.

### Resumen visual

```
ISS doc -> branch -> skills -> codigo -> test+build -> commit -> PR -> merge -> engram
```

---

## Prohibiciones (Zero Tolerance)

- Saltarse la creacion del ISS doc
- Pushear directo a master
- Codelear sobre master sin branch
- No ejecutar tests antes del commit
- No ejecutar build antes del commit
- No registrar en Engram al cerrar tarea

---

## Estructura de Archivos

```
documentacion/
  README.md              <- Este archivo (workflow obligatorio)
  arquitectura.md        <- Arquitectura tecnica
  ISSUES.md              <- Backlog de issues
  issues/
    ISS-XXX_nombre.md    <- Especificacion de cada issue
```

---

## Stack Tecnologico

| Tecnologia | Uso |
|---|---|
| **Next.js 16.2.6** (App Router) | Framework principal |
| **React 19** | UI Components |
| **TypeScript** | Tipado estricto |
| **Tailwind CSS v4** | Estilado con design tokens custom |
| **Framer Motion** | Animaciones y transiciones |
| **Groq SDK** | IA generativa (LLaMA 3) |
| **Prisma 7 + Supabase** | Base de datos relacional |

---

## Contacto

**Alexis Galvan** — Desarrollador Full-Stack, Ciencia de Datos e IA.
Repositorio: `GalvanAlexis/bladoPC`
