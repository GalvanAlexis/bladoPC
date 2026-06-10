# ISS-010 — Auto-layout Dagre en Skill Tree

**Estado:** 🔴 OPEN  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `ui`, `react-flow`  
**Depende de:** ISS-009  

---

## Descripción

El layout actual del Skill Tree es un grid estático de 3 columnas con posicionamiento naive `(i%3)*250`. Con muchos nodos (cuando se parseen las 3 carreras) el grafo queda ilegible y los edges se cruzan sin estructura.

## Problema actual

```typescript
// SkillTreeViewer.tsx — layout actual
position: { x: (i % 3) * 250 + 100, y: Math.floor(i / 3) * 150 + 50 }
```

Esto produce un grid uniforme donde no hay jerarquía visual, todos los nodos se ven iguales en términos de posición.

## Solución propuesta: Dagre

Dagre es una librería de layout de grafos dirigidos que calcula posiciones jerárquicas automáticamente.

### Instalación

```bash
npm install @dagrejs/dagre
npm install -D @types/dagre  # si existe
```

### Implementación

```typescript
// lib/dagre-layout.ts
import dagre from '@dagrejs/dagre';
import { Node, Edge } from '@xyflow/react';

const NODE_WIDTH = 172;
const NODE_HEIGHT = 80;

export function getLayoutedElements(nodes: Node[], edges: Edge[], direction = 'TB') {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 60 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = dagreGraph.node(node.id);
      return { ...node, position: { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 } };
    }),
    edges,
  };
}
```

### Uso en SkillTreeViewer

```typescript
const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
  return getLayoutedElements(flowNodes, flowEdges, 'TB');
}, [flowNodes, flowEdges]);
```

## Impacto visual esperado

```
[Álgebra]  [Cálculo I]  [Física]     ← Materias (top)
    ↓           ↓
[Python]   [SQL]   [FastAPI]          ← Tecnologías (middle)
    └──────────┴──────┐
                   [InmoVoz]          ← Proyectos (bottom)
```

## Criterios de aceptación

- [ ] `@dagrejs/dagre` instalado y tipado
- [ ] `getLayoutedElements()` exportado desde `lib/dagre-layout.ts`
- [ ] `SkillTreeViewer` usa Dagre para posicionar nodos
- [ ] Dirección del grafo: Top-Bottom (`TB`)
- [ ] Se agrega botón "Re-layout" para refrescar si el grafo cambia
- [ ] El layout funciona con 5 nodos y con 50+ nodos

## Estimación

~2-3 horas de desarrollo
