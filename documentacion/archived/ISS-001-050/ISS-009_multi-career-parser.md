# ISS-009 — Expandir parser para las 3 carreras

**Estado:** 🔴 OPEN  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `data`, `markdown`  
**Depende de:** ISS-006 (base)  

---

## Descripción

El parser actual (`lib/markdown.ts`) solo lee `content/Carreras/1 Ing Sistemas/año 1/01_año_1.md`. El repositorio tiene 3 carreras con múltiples años y archivos. Blado debe tener acceso a todo el conocimiento.

## Estructura de contenido existente

```
content/Carreras/
├── 1 Ing Sistemas/
│   ├── año 1/
│   │   └── 01_año_1.md        ← ÚNICO PARSEADO
│   ├── año 2/                 ← ❌ NO PARSEADO
│   ├── 02_año_2.md            ← ❌ NO PARSEADO
│   ├── 03_año_3.md
│   ├── 04_año_4.md
│   ├── 05_año_5.md
│   └── 06_año_6.md
├── 2 Ing Datos/               ← ❌ NO PARSEADO
└── 3 Lic IA/                  ← ❌ NO PARSEADO
```

## Solución propuesta

### Approach: `glob` recursivo o `fs.readdirSync` manual

```typescript
// lib/markdown.ts — nueva función
export function getAllSkillData(): { nodes: SkillNode[]; edges: SkillEdge[] } {
  const CAREERS = ['1 Ing Sistemas', '2 Ing Datos', '3 Lic IA'];
  const allNodes: SkillNode[] = [];
  const allEdges: SkillEdge[] = [];

  for (const career of CAREERS) {
    const careerDir = path.join(CONTENT_DIR_BASE, career);
    // Buscar todos los .md recursivamente
    const mdFiles = findAllMarkdownFiles(careerDir);
    for (const file of mdFiles) {
      const { nodes, edges } = parseMarkdownFile(file, career);
      allNodes.push(...nodes);
      allEdges.push(...edges);
    }
  }
  return { nodes: allNodes, edges: allEdges };
}
```

### Agregar `carrera` como dimensión al SkillNode

```typescript
export interface SkillNode {
  id: string;
  label: string;
  type: SkillType;
  status: SkillStatus;
  description?: string;
  career?: string;   // ← NUEVO
  year?: number;     // ← NUEVO
}
```

### Filtrado en SkillTreeViewer

Agregar filtros por carrera en la UI del Skill Tree:
```
[Ing. Sistemas] [Ing. Datos] [Lic. IA] [Todos]
```

## Criterios de aceptación

- [ ] Parser lee archivos `.md` de las 3 carpetas de carreras
- [ ] Los nodos incluyen `career` y `year` como metadatos
- [ ] Los IDs de nodos son únicos globalmente (incluir carrera en el ID)
- [ ] El Skill Tree puede filtrar por carrera
- [ ] No hay duplicados ni conflictos entre nodos de distintas carreras

## Estimación

~3-4 horas de desarrollo
