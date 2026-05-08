# INSTRUCTIONS FOR AI AGENTS - Progresos Academicos

## Communication Rules (STRICT)

### Always respond in Spanish
All interaction with Blado MUST be in Spanish. Never respond in English or any other language unless explicitly asked.

### First response protocol
Every time Blado initiates a session, your FIRST response MUST include:
1. **Que fue lo ultimo que hicimos** - Summarize the last commit, branch merged, or file modified
2. **Que falta por hacer** - List pending items (untracked files, incomplete checkboxes, next steps)

## Identity
**Blado** is the student. He is pursuing 3 technical careers simultaneously.

## Methodology: MEABE (Modelo de Evaluacion de los Aprendizajes Basado en Evidencias)

All academic progress is tracked using **MEABE**, an evidence-based evaluation framework that replaces binary checkboxes with weighted, demonstrable progress.

### Evidence types

Each subject/technology is evaluated across 3 dimensions:

| Evidence | Weight | What it measures | Artifacts |
|---|---|---|---|
| **Saber** | 30% | Theoretical understanding | Notes, summaries, concept maps, mind maps |
| **Hacer** | 40% | Hands-on application | Solved exercises, code scripts, terminal logs |
| **Producto** | 30% | Tangible deliverable | Project files, documentation, reports |

### Progress format

Every tracking file (`0X_año_Y.md`) uses this structure:

```markdown
## [Subject Name] [Progress: X%]
### Saber [X/Y complete = Z%]
- [ ] Topic A: description
- [ ] Topic B: description

### Hacer [X/Y complete = Z%]
- [ ] Exercise 1: description
- [ ] Exercise 2: description

### Producto [X/Y complete = Z%]
- [ ] Deliverable: description
```

**Progress calculation**: `(Saber% * 0.3) + (Hacer% * 0.4) + (Producto% * 0.3) = Total%`

### Evidence repository

Every completed checkbox MUST produce a concrete artifact stored in:

```
Carreras/[N Carrera]/Evidencias/[subject-name]/
  saber/
    resumen_tema_X.md
    mapa_conceptual.pdf
  hacer/
    ejercicio_1.py
    script_analisis.py
  producto/
    proyecto_final/
    documentacion.md
```

If a checkbox is marked `[x]` but has no evidence artifact, it is considered incomplete.

## Project Structure
```
Progresos-Academicos/
├── Readme.md (human presentation)
└── Carreras/
    ├── Readme.md (THIS file - instructions for AI)
    ├── 1 Ing Sistemas/
    │   ├── 0X_año_Y.md (MEABE tracking with evidence sections)
    │   ├── año X/
    │   │   ├── Materias/ (theory .md per subject)
    │   │   ├── Tecnologias/ (theory .md per technology)
    │   │   ├── Proyecto/ (annual project)
    │   │   └── Evidencias/ (artifact repository)
    ├── 2 Ing Datos/ (same structure)
    └── 3 Lic IA/ (same structure)
```

## Workflow with Branches (CRITICAL)

### Branches are created DINAMICALLY according to the theory being studied.

1. **When studying a subject from `Materias/`**:
   - Create branch: `año-X/materias/[subject-name]`
   - Example: Studying Matematica I → `año-1/materias/matematica-1`
   - Example: Studying Fisica I → `año-1/materias/fisica-1`

2. **When studying a technology from `Tecnologias/`**:
   - Create branch: `año-X/tecnologias/[technology-name]`
   - Example: Studying Python → `año-1/tecnologias/python`
   - Example: Studying Git → `año-1/tecnologias/git`

3. **Flow per topic:**
   ```bash
   # Create branch from master
   git checkout -b año-X/materias/[topic] master
   
   # Study the topic
   # 1. Create evidence artifact in Evidencias/[topic]/
   # 2. Update checkbox `- [ ]` → `- [x]` in `0X_año_Y.md`
   # 3. Recalculate progress percentage
   
   # Commit changes
   git add .
   git commit -m "Complete: [Subject/Technology Name] #issue"
   
   # Push
   git push -u origin año-X/materias/[topic]
   
   # Return to master
   git checkout master
   ```

## GitHub Issues (ALREADY CREATED)
There are **5 GitHub Issues** for the **5 final projects** of Year 1 (Ing Sistemas):
- Issue #1: Complete project: Simulador de Sistema Solar
- Issue #2: Complete project: Monitor de Sistema (CLI)
- Issue #3: Complete project: Analizador de Texto
- Issue #4: Complete project: Generador de Documentacion Tecnica
- Issue #5: Complete project: Juego de Adivinanza

When working on a project:
- Create branch: `proyecto/[project-name]`
- Reference the issue in commits: `git commit -m "Complete: Simulador Solar #1"`

## Current Status (For agent reference)
- **Year 1 (3 careers)**: Planned. Checkboxes ready. **5 PROJECTS documented** in `Proyecto/`:
  - `01_Simulador_Sistema_Solar.md`
  - `02_Monitor_Sistema.md`
  - `03_Analizador_Texto.md`
  - `04_Generador_Documentacion_Tecnica.md`
  - `05_Juego_Adivinanza.md`
- **Year 1 (1 Ing Sistemas)**: 5 projects documented.
- **Year 2 (1 Ing Sistemas)**: Planned. Complete theory in `Materias/` (10), `Tecnologias/` (14), `Proyecto/` (1).
- **Years 3-6**: Pending.

## MCP Instructions for the Agent
- **memory**: Load context from previous Blado sessions.
- **sequential-thinking**: Use for complex analysis.
- **engram**: Register learnings upon task completion.
- **GitHub**: Repository at `GalvanAlexis/Progresos-Academicos`.

## Important Notes
- Blado **has NOT started** studying yet. Everything is in **planning phase**.
- Do not modify structure without Blado's consent.
- Respect conventions: `[order]_[Name].md` for theory files.
- **BRANCHES**: Do NOT create all branches now. They are created when Blado studies each topic.
- **FOCUS**: Only Year 1 of Ing Sistemas unless otherwise indicated.
- The local root folder is `3 CARRERAS`, but on GitHub it is `Progresos-Academicos`.
- **NEVER USE EMOJIS** unless explicitly told to do so.
- **MEABE first**: Always use the evidence-based format (Saber/Hacer/Producto) when creating or updating tracking files.

---
*Instructions for AI agents - Next session*  
*Repository: https://github.com/GalvanAlexis/Progresos-Academicos*
