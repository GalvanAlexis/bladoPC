# INSTRUCTIONS FOR AI AGENTS - Progresos Academicos

## Identity
**Blado** is the student. He is pursuing 3 technical careers simultaneously.

## Project Structure
```
Progresos-Academicos/
├── Readme.md (this file - human presentation)
└── Carreras/
    ├── Readme.md (THIS file - instructions for AI)
    ├── 1 Ing Sistemas/
    │   ├── 0X_año_Y.md (topic checkboxes)
    │   ├── año X/
    │   │   ├── Materias/ (theory .md per subject)
    │   │   ├── Tecnologias/ (theory .md per technology)
    │   │   └── Proyecto/ (annual project)
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
   
   # Study the topic, update checkbox `- [ ]` → `- [x]` in `0X_año_Y.md`
   # Commit changes
   git add .
   git commit -m "Complete: [Subject/Technology Name] #issue"
   
   # Push
   git push -u origin año-X/materias/[topic]
   
   # Return to master
   git checkout master
   ```

## GitHub Issues (ALREADY CREATED)
There are **5 GitHub Issues** for the **5 final projects** of Year 1 (Ing Sistemas):**
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

---
*Instructions for AI agents - Next session*  
*Repository: https://github.com/GalvanAlexis/Progresos-Academicos*
