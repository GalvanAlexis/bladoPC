# ISS-008 — Assets públicos (sprites Blado + fondos RPG)

**Estado:** ✅ CLOSED  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `assets`, `design`  
**Fecha de cierre:** 2026-05-08  

---

## Descripción

Generación y colocación de los assets visuales del juego en la carpeta `/public`.

## Assets creados

| Archivo | Tamaño | Descripción |
|---|---|---|
| `blado-base.png` | ~1MB | Sprite de Blado en pose normal/base |
| `blado-phone.png` | ~986KB | Sprite de Blado sosteniendo un teléfono (modo "revisar datos") |
| `dark-cave-bg.png` | ~840KB | Fondo de cueva oscura RPG |
| `dark-library-bg.png` | ~918KB | Fondo de biblioteca arcana oscura |

## Generación

Los assets fueron generados con IA de imágenes siguiendo la estética:
- **Blado**: Diablillo pequeño, rojo, con expresión traviesa pero inteligente. Estilo ilustración 2D/anime oscuro.
- **Fondos**: Ambientes de fantasía oscura medieval, tonos muy oscuros, iluminación dramática con rojos y púrpuras.

## Uso en código

```typescript
// VisualNovelScene.tsx
const bgImage = scene === 'cave' ? '/dark-cave-bg.png' : '/dark-library-bg.png';
const bladoImage = `/blado-${bladoPose}.png`;
```

## Archivos involucrados

- `public/blado-base.png`
- `public/blado-phone.png`
- `public/dark-cave-bg.png`
- `public/dark-library-bg.png`

## Criterios de aceptación cumplidos

- [x] Assets accesibles desde `/` en el browser
- [x] Blado tiene 2 poses funcionales (base, phone)
- [x] 2 backgrounds funcionales (cave, library)
- [x] Estilos aplicados: `object-contain`, `drop-shadow` en Blado, `opacity-60` en backgrounds
