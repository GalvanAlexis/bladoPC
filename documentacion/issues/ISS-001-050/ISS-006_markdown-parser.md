# ISS-006 — Parser Markdown → SkillNode/SkillEdge (Año 1)

**Estado:** ✅ CLOSED  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `data`, `markdown`  
**Fecha de cierre:** 2026-05-08  

---

## Descripción

Librería del servidor que lee los archivos `.md` de seguimiento académico y los transforma en estructuras de datos que React Flow puede renderizar.

## Lo que se hizo

### Tipos exportados
```typescript
type SkillStatus = 'locked' | 'progress' | 'completed';
type SkillType = 'materia' | 'tecnologia' | 'proyecto';

interface SkillNode {
  id: string;
  label: string;
  type: SkillType;
  status: SkillStatus;
  description?: string;
}

interface SkillEdge {
  id: string;
  source: string;  // tecnología
  target: string;  // proyecto que la usa
}
```

### Formato de archivo `.md` esperado
```markdown
## Materias
- [x] Álgebra
- [/] Cálculo I
- [ ] Física I

## Tecnologías
- [x] Python: lenguaje principal
- [x] SQL: bases de datos

## Proyectos
- [x] Nombre: InmoVoz
- [x] Stack: Python
```

### Lógica de parsing
```
- [x] → status: 'completed'
- [/] → status: 'progress'  
- [ ] → status: 'locked'
```

**Secciones identificadas por header H2:**
- `## Materias` → type: 'materia'
- `## Tecnologías` → type: 'tecnologia'
- `## Proyectos` → type: 'proyecto'

**Edges automáticos:** Si una línea de proyecto tiene `Stack: NombreTech`, se crea un edge `NombreTech → NombreProyecto`

### Archivo actualmente parseado
- `content/Carreras/1 Ing Sistemas/año 1/01_año_1.md`

## Archivos involucrados

- `src/lib/markdown.ts`
- `content/Carreras/1 Ing Sistemas/año 1/01_año_1.md`

## Limitación conocida (→ ISS-009, ISS-014)

Solo parsea Año 1 de Ing. Sistemas. Las otras carreras y años no se leen.

## Criterios de aceptación cumplidos

- [x] Parsea checkboxes `[x]`, `[/]`, `[ ]` correctamente
- [x] Identifica secciones por header H2
- [x] Genera edges automáticos proyecto↔tecnología
- [x] Ejecutado en el Server Component (sin exponer en cliente)
- [x] Maneja errores con try/catch y retorna arrays vacíos
