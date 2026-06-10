# ISS-003 — VisualNovelScene con backgrounds y sprites

**Estado:** ✅ CLOSED  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `ui`, `animation`  
**Fecha de cierre:** 2026-05-08  

---

## Descripción

Componente que renderiza el fondo y el sprite de Blado, respondiendo a cambios de escena y pose con animaciones fluidas.

## Lo que se hizo

### Escenas disponibles
| scene | Background | Cuándo se usa |
|---|---|---|
| `cave` | `/dark-cave-bg.png` | Intro, skills, proyectos |
| `library` | `/dark-library-bg.png` | Modo conocimiento / preguntas IA |

### Poses disponibles
| pose | Imagen | Cuándo se usa |
|---|---|---|
| `base` | `/blado-base.png` | Diálogos normales |
| `phone` | `/blado-phone.png` | Proyectos / preguntas específicas |

### Animaciones (Framer Motion)
- **Background**: fade in/out + escala 1.05→1 (transición suave entre escenas)
- **Sprite Blado**: slide up desde y:50 al aparecer, slide down al salir
- Ambos usan `AnimatePresence` con `mode="wait"` para transiciones limpias

## Archivos involucrados

- `src/components/VisualNovelScene.tsx`
- `public/dark-cave-bg.png`
- `public/dark-library-bg.png`
- `public/blado-base.png`
- `public/blado-phone.png`

## Criterios de aceptación cumplidos

- [x] Transición de fondo al cambiar escena es suave (opacity + scale)
- [x] Sprite Blado cambia de pose con animación
- [x] Efecto drop-shadow rojo sobre el sprite de Blado
- [x] Componente absolutamente posicionado (capa -z-10)
