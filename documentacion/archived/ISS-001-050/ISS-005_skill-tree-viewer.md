# ISS-005 — SkillTreeViewer con React Flow + RuneNode

**Estado:** ✅ CLOSED  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `ui`, `react-flow`  
**Fecha de cierre:** 2026-05-08  

---

## Descripción

Visualizador del Skill Tree ("Grimorio") usando React Flow con nodos customizados `RuneNode`. Se abre como overlay modal sobre la escena del juego.

## Lo que se hizo

### SkillTreeViewer
- Recibe `SkillNode[]` y `SkillEdge[]` (props del servidor)
- Transforma a formato React Flow con `useMemo`
- **Layout naive**: `x = (i % 3) * 250 + 100`, `y = floor(i/3) * 150 + 50` (grid 3 columnas)
- Background punteado dark, modo oscuro

### RuneNode (nodo custom)
Estilo visual según estado del nodo:

| Status | Border | Color texto | Efecto |
|---|---|---|---|
| `locked` | `gray-700` | `gray-500` | Ninguno |
| `progress` | `crimson` | `crimson` | `animate-pulse` + glow rojo |
| `completed` | `toxic` | `toxic` | Glow verde |

Iconos por tipo:
- `materia` → 📚
- `tecnologia` → 💻  
- `proyecto` → ⚔️

### Trigger desde GameEngine
Al activar el diálogo `openSkillTree`:
```typescript
showSkillTree: true  // flag en DIALOGUES
```
→ `AnimatePresence` muestra el overlay `inset-8` con borde `toxic` y glow verde

## Archivos involucrados

- `src/components/SkillTreeViewer.tsx`
- `src/components/RuneNode.tsx`

## Limitación conocida (→ ISS-010)

El layout es un grid simple de 3 columnas. Con muchos nodos queda desordenado y los edges pueden cruzarse sin lógica. Requiere Dagre para auto-layout jerárquico.

## Criterios de aceptación cumplidos

- [x] React Flow renderiza nodos desde las props del servidor
- [x] RuneNode muestra estado visual correcto
- [x] Overlay aparece/desaparece con animación
- [x] Dark mode + colores del design system
