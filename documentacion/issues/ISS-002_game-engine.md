# ISS-002 — Game Engine con árbol de diálogos

**Estado:** ✅ CLOSED  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `game`, `ui`  
**Fecha de cierre:** 2026-05-08  

---

## Descripción

Motor central del juego. Gestiona el estado de la aplicación, el árbol de diálogos scripted y la lógica de transición entre escenas.

## Lo que se hizo

### Árbol de diálogos (`DIALOGUES`)
Objeto de configuración que define los nodos de la narrativa:
- `intro` → Bienvenida de Blado
- `whoAmI` → Presentación del creador (Alexis Galván)
- `skills` → Apertura del skill tree
- `projects` → Descripción de proyectos
- `knowledge` → Transición a la Biblioteca Arcana
- `askTheory`, `askProjects`, `askFree` → Modos de preguntas libres con IA
- `openSkillTree` / `closeSkillTree` → Toggle del grimorio
- `back` → Vuelta al menú principal

### Estado gestionado
```typescript
currentKey: DialogueKey        // nodo actual del diálogo
isLoading: boolean             // esperando respuesta de Groq
messages: Message[]            // historial de chat con la IA
```

### Lógica de display
- Si hay respuesta del assistant → muestra esa respuesta
- Si está cargando → muestra "Consultando el grimorio..."
- Si es diálogo scripted → muestra `current.text`

## Archivos involucrados

- `src/components/GameEngine.tsx`

## Criterios de aceptación cumplidos

- [x] Navegación entre todos los nodos del árbol funciona
- [x] Flags opcionales (`showSkillTree`, `allowFreeQuestion`) funcionan correctamente
- [x] Estado de IA (loading / respuesta) se gestiona limpiamente
- [x] El overlay del Skill Tree aparece/desaparece con `AnimatePresence`
