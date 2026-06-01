# ISS-044: Carrusel Mágico Mobile — Coverflow del Grimorio

**Estado:** En progreso  
**Branch de implementación:** `feature/ISS-044-mobile-carousel`  
**Tipo:** Feature / UX Mobile  
**Prioridad:** Alta  
**Depende de:** ISS-036 ✅, ISS-041 ✅  

---

## Problema

En dispositivos móviles (< 768px), el Nivel 1 del Grimorio (La Sala) muestra las 4 bibliotecas
apiladas **verticalmente** con `flex-wrap`, lo que obliga al usuario a hacer scroll para verlas
y rompe la ilusión de sala RPG. No hay forma intuitiva de navegar entre las 4 carreras.

---

## Decisión Estratégica: Web vs React Native

Se evaluó separar la app en React Native (Expo). Se descartó por las siguientes razones:

| Criterio | Web (Opción A ✅) | React Native (Opción B ❌) |
|---|---|---|
| Esfuerzo | ~2h | ~30-40h |
| Código duplicado | 0% | ~80% |
| Calidad del efecto visual | Idéntica al nativo | Nativa |
| Deploy | Vercel (ya activo) | Play Store / App Store |
| Valor portfolio | Visible sin instalar | Requiere instalación |

**Conclusión:** Framer Motion (ya instalado) permite un efecto Coverflow indistinguible del nativo.
React Native se planificará en futuro cuando el contenido esté estable y se justifique un monorepo.

---

## Solución: Coverflow del Grimorio

### Desktop (≥ 768px) — Sin cambios
Layout de grilla horizontal con las 4 `LibraryUnit` en fila. Comportamiento actual intacto.

### Mobile (< 768px) — Carrusel Coverflow 3D
- **Una biblioteca activa** a la vez, centrada, ocupando ~70% del ancho.
- **Bibliotecas vecinas** visibles en los bordes en escorzo 3D:
  - `scale(0.70)`, `opacity: 0.45`, `rotateY(±25deg)`, `perspective: 1200px`
- **Drag táctil** con spring physics (`dragElastic`, `dragConstraints`).
- **Snap automático** al item más cercano al finalizar el swipe.
- **Dots paginadores** en la parte inferior que brillan con el color de la biblioteca activa.
- **Flecha de indicación** suave (`‹ ›`) en los laterales para discoverability.

### Diagrama Mobile

```
╔═════════════════════════════════════╗
║  🔥                             🔥  ║
║                                     ║
║  [📚   ]  [ 📚 GRIMORIO  ]  [📚   ] ║
║  violet    INDIGO • activo  emerald  ║
║  30%w      70%w             30%w    ║
║  scale.7   scale1           scale.7  ║
║  rY 25°    rY 0°            rY -25° ║
║                                     ║
║       ← [●  ○  ○  ○] →             ║
║             Ing. Sistemas            ║
╚═════════════════════════════════════╝
```

---

## Implementación Técnica

### Hook: `useIsMobile`
```tsx
// src/hooks/useIsMobile.ts
const isMobile = window.matchMedia('(max-width: 767px)').matches;
// + listener para resize
```

### Lógica del Carrusel (`LibraryRoom.tsx`)
```tsx
const x = useMotionValue(0);
// Por cada item i, la distancia al centro determina:
// - scale: 1 si activo, 0.7 si vecino, 0.5 si más lejano
// - rotateY: 0° si activo, ±25° si vecino
// - opacity: 1 si activo, 0.45 si vecino
```

### Snap al item más cercano
```tsx
// onDragEnd: calcular qué item es el más cercano al centro
// usar animate(x, targetX, { type: 'spring', ... })
```

---

## Archivos Modificados

```
src/
  components/
    biblioteca/
      LibraryRoom.tsx    [MODIFY] — carrusel mobile + grid desktop
      LibraryUnit.tsx    [MODIFY] — prop mobileScale opcional
  hooks/
    useIsMobile.ts       [NEW] — hook de breakpoint reactivo
  app/
    globals.css          [MODIFY] — @keyframes dot-pulse, carousel-glow-active
```

---

## Criterios de Aceptación

- [ ] En mobile (< 768px): carrusel horizontal con una sola biblioteca centrada visible
- [ ] Swipe táctil funciona con snap al item más cercano
- [ ] Efecto 3D Coverflow: scale + rotateY + opacity en items laterales
- [ ] Dots paginadores con color de la biblioteca activa
- [ ] Desktop: sin cambios visuales ni funcionales
- [ ] `npm test` (59 tests) → verde
- [ ] `npm run build` → sin errores TypeScript
- [ ] PR mergeado a master → deploy Vercel activo

---

## Animaciones CSS Nuevas

```css
@keyframes dot-pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0px currentColor; }
  50%       { transform: scale(1.3); box-shadow: 0 0 8px 3px currentColor; }
}

@keyframes carousel-glow-active {
  0%, 100% { box-shadow: 0 0 20px 5px var(--career-color); }
  50%       { box-shadow: 0 0 35px 12px var(--career-color); }
}
```

---

## Expansión Futura

- `ISS-045`: Considerar Expo + React Native si el proyecto pasa a tener usuarios recurrentes
  y se justifica el costo de mantenimiento de dos codebases.
- `ISS-046`: Añadir haptic feedback en mobile vía Vibration API (web nativa).
