# ISS-032: Timba Arcade Hub — Galería de Minijuegos

**Estado:** Planificado — Opción B (Premium WOW) aprobada  
**Branch de implementación:** `feature/ISS-032-timba-arcade-hub`

---

## Descripción

Reemplazar la página placeholder `/timba` por una **galería interactiva premium** de minijuegos creados por el autor. La experiencia mantiene la estética RPG/demoniaca del proyecto y el personaje de Blado.

### Comportamiento final

- Un **carrusel 3D tipo Coverflow** (vertical en desktop, horizontal en mobile) muestra las cartas de los juegos con perspectiva 3D. Las cartas adyacentes están rotadas en el eje Y y alejadas en Z; la seleccionada está al frente y centrada.
- Al seleccionar un juego, el **panel derecho** transiciona con crossfade + slide mostrando:
  - Un **GIF/preview animado** del juego con overlay de scanlines CRT.
  - Una **burbuja de diálogo de Blado** con su `bladoQuote` (solo lectura, sin chat libre).
  - El **avatar de Blado** entrando en cuadro desde abajo con bounce animation.
  - Un botón `"Jugar"` / `"Próximamente"` según `available`.
- Borde del panel con **glow animado** cuyo color varía según el tag del juego (ver tabla de colores).
- Navegación con **flechas de teclado** y **click directo** en carta. Swipe en mobile.
- Soporte para juegos en estado `available: false` (se muestra la carta en gris con badge "Próximamente").

---

## Estructura de Datos

### `src/lib/games.ts`

```ts
export interface GameEntry {
  id: string;           // slug único, ej: "snake-arcano"
  title: string;        // nombre para mostrar
  shortDesc: string;    // 1 línea para la carta del carrusel
  bladoQuote: string;   // frase de Blado al seleccionarlo (tono RPG/demoniaco)
  previewGif: string;   // ruta relativa a /public, ej: "/games/snake-arcano.gif"
  href: string;         // ruta del juego, ej: "/timba/snake-arcano"
  tags: GameTag[];      // categorías
  available: boolean;
  accentColor?: string; // override de color de glow si no alcanza con el tag
}

export type GameTag = 'Arcade' | 'Estrategia' | 'Puzzle' | 'Habilidad' | 'RPG';

// Colores de glow por tag (primary tag determina el color)
export const TAG_COLORS: Record<GameTag, string> = {
  Arcade:    '#dc2626', // crimson
  Estrategia:'#9333ea', // purple
  Puzzle:    '#2563eb', // blue
  Habilidad: '#39ff14', // toxic green
  RPG:       '#f59e0b', // amber
};

// Registro de juegos — MVP con placeholders
export const GAMES: GameEntry[] = [
  {
    id: 'snake-arcano',
    title: 'Serpiente Arcana',
    shortDesc: 'La serpiente del abismo devora almas.',
    bladoQuote: '¡Ah, la Serpiente Arcana! Un clásico del inframundo... pero con mi toque maligno. Guíala con cuidado, mortal, o te devorará a TI.',
    previewGif: '/games/snake-arcano.gif',
    href: '/timba/snake-arcano',
    tags: ['Arcade', 'Habilidad'],
    available: false,
  },
  // ... hasta 10 entradas — el resto available: false como placeholder
];
```

---

## Arquitectura de Archivos

```
src/app/timba/
  page.tsx                    → MODIFY: Timba Hub principal
  [game]/
    page.tsx                  → NEW: Shell de juego individual

src/components/timba/
  GameCarousel3D.tsx          → NEW: Carrusel 3D coverflow
  GameCard3D.tsx              → NEW: Carta individual con 3D transforms
  GamePreviewPanel.tsx        → NEW: Panel derecho (gif + Blado + quote)
  BladoGameQuote.tsx          → NEW: Burbuja de diálogo (solo lectura)
  CRTOverlay.tsx              → NEW: Efecto scanlines CRT sobre el gif
  TagBadge.tsx                → NEW: Badge de categoría con color del tag

src/lib/games.ts              → NEW: Registro estático de GameEntry[]

public/games/
  placeholder.gif             → GIF placeholder animado para juegos no disponibles
  snake-arcano.gif            → (y los demás cuando existan)
```

---

## Especificaciones de Componentes

### `GameCarousel3D.tsx`

**Props:**
```ts
interface GameCarousel3DProps {
  games: GameEntry[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}
```

**Lógica 3D:**
- Para cada carta `i`, calcular `offset = i - selectedIndex`.
- Aplicar transforms CSS via `framer-motion` `animate`:
  ```
  rotateX:    offset * -18deg       (carrusel vertical)
  translateY: offset * 120px
  translateZ: -Math.abs(offset) * 80px
  scale:      1 - Math.abs(offset) * 0.08  (máximo 3 cartas visibles a cada lado)
  opacity:    Math.max(0, 1 - Math.abs(offset) * 0.3)
  ```
- `perspective: 1200px` en el contenedor padre.
- Las cartas con `|offset| > 3` tienen `display: none` para no acumular DOM.
- Animación: `transition={{ type: 'spring', stiffness: 300, damping: 30 }}`.
- **Teclado:** `useEffect` con listener en `keydown` para `ArrowUp` / `ArrowDown`.
- **Mobile:** `useSwipe` custom hook (touch events) para navegar con swipe vertical.

### `GameCard3D.tsx`

**Props:**
```ts
interface GameCard3DProps {
  game: GameEntry;
  isSelected: boolean;
  onClick: () => void;
}
```

**Visual:**
- Dimensiones: `280px × 160px`.
- Fondo: `bg-black/80` con `border` cuyo color es `TAG_COLORS[game.tags[0]]` al 40% de opacidad.
- Estado `isSelected`: border full opacity + `box-shadow` con glow del color del tag.
- Estado `!available`: toda la carta en `grayscale(0.8) opacity-50` + badge "Próximamente" en esquina.
- `whileHover` (framer-motion): `scale: 1.03` + ligero `rotateX: -2deg` + incrementar glow.
- Contenido: icono/emoji del tag a la izquierda, título en bold, `shortDesc` en gris pequeño, tags como `<TagBadge>`.

### `GamePreviewPanel.tsx`

**Props:**
```ts
interface GamePreviewPanelProps {
  game: GameEntry;
}
```

**Layout (columna):**
1. Contenedor del GIF con `CRTOverlay` encima.
2. `BladoGameQuote` con el avatar y la frase.
3. Botón de acción.

**Transición al cambiar de juego:**
- Envolver todo en `<AnimatePresence mode="wait">` con key `game.id`.
- El panel saliente hace `opacity: 0, x: -20` y el entrante `opacity: 1, x: 0`.
- Duration: `0.25s ease-out`.

**Glow del borde del panel:**
- `box-shadow` animado con `framer-motion` `useMotionValue` + `animate`:
  - Color: `TAG_COLORS[game.tags[0]]` al 40%.
  - Pulso: keyframes `0% → 100% → 0%` de intensidad (2s loop).

### `BladoGameQuote.tsx`

**Props:**
```ts
interface BladoGameQuoteProps {
  quote: string;
  onEnter: boolean; // true cuando se monta/cambia el juego
}
```

**Animación de entrada de Blado:**
- Avatar (`BladoAvatar` sprite existente, pose `"base"`): entra con `initial={{ y: 60, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}` con `type: 'spring', bounce: 0.5, delay: 0.1`.
- Burbuja de texto: `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}` con `delay: 0.25`.
- El texto de la burbuja usa efecto typewriter con `framer-motion` `staggerChildren` en caracteres o implementación simple con `useEffect` + `substring`.

### `CRTOverlay.tsx`

Overlay absoluto posicionado sobre el GIF, sin interacción (`pointer-events: none`):

```css
/* Scanlines */
background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0, 0, 0, 0.15) 2px,
  rgba(0, 0, 0, 0.15) 4px
);

/* Ruido/flicker animado */
@keyframes crt-flicker {
  0%, 100% { opacity: 0.97; }
  50%       { opacity: 1; }
}
animation: crt-flicker 0.15s infinite;
```

También añade un vignette radial sutil en las esquinas del GIF.

---

## Layout de la Página `/timba`

```
┌─────────────────────────────────────────────────────────┐
│ NAVBAR (existente, fixed top)                           │
├───────────────────────┬─────────────────────────────────┤
│                       │                                 │
│  CARRUSEL 3D          │  GAME PREVIEW PANEL             │
│  (izquierda, 40%)     │  (derecha, 60%)                 │
│                       │                                 │
│  [ carta -2 ]         │  ┌────────────────────────┐     │
│  [ carta -1 ]         │  │  GIF preview + CRT     │     │
│ ▶[ carta SEL ]◀       │  └────────────────────────┘     │
│  [ carta +1 ]         │  ┌──────────────────────────┐   │
│  [ carta +2 ]         │  │ [avatar] Blado quote...  │   │
│                       │  └──────────────────────────┘   │
│  [▲] [▼]              │  [ JUGAR / PRÓXIMAMENTE ]       │
│                       │                                 │
└───────────────────────┴─────────────────────────────────┘
```

**Mobile (< 768px):**
- Layout en columna: carrusel horizontal arriba (scroll snap), panel abajo.
- Las cartas en mobile: `160px × 100px`, sin 3D (rotateX = 0, solo scale + opacity).

---

## Colores de Glow por Tag

| Tag        | Color Hex | Uso                          |
|------------|-----------|------------------------------|
| Arcade     | `#dc2626` | Crimson (consistente con el proyecto) |
| Estrategia | `#9333ea` | Purple                        |
| Puzzle     | `#2563eb` | Blue                          |
| Habilidad  | `#39ff14` | Toxic green (consistente)     |
| RPG        | `#f59e0b` | Amber                         |

---

## Ruta de Juego Individual `/timba/[game]`

Shell minimalista que carga el componente del juego:

```tsx
// src/app/timba/[game]/page.tsx
import { GAMES } from '@/lib/games';
import Link from 'next/link';

export default function GamePage({ params }: { params: { game: string } }) {
  const game = GAMES.find(g => g.id === params.game);
  if (!game || !game.available) {
    return <ComingSoonShell />;
  }
  // Lazy-load del componente del juego real
  return <GameShell game={game} />;
}
```

Para el MVP, todos los juegos irán a `ComingSoonShell` (pantalla de "en construcción" estilizada).

---

## GIFs de Preview

Para el MVP, usar **un único `placeholder.gif`** (loop animado con la estética del proyecto) referenciado por todos los juegos con `available: false`. Cuando el juego esté terminado, se reemplaza el `previewGif` de su `GameEntry` con el gif real.

El `placeholder.gif` puede ser generado con IA o construido manualmente con CSS animation exportado (runas, fuego, estática CRT).

---

## Dependencias

| Dependencia | Estado | Uso |
|-------------|--------|-----|
| `framer-motion` | ✅ Ya instalada | 3D transforms, AnimatePresence, spring animations |
| `CSS transforms 3D` | ✅ Nativo | perspective, rotateX, translateZ |
| Ninguna nueva | — | Todo resuelto con el stack actual |

---

## Plan de Implementación (Task Order)

```
1. [ ] Crear src/lib/games.ts con las entradas placeholder
2. [ ] Crear TagBadge.tsx
3. [ ] Crear CRTOverlay.tsx
4. [ ] Crear BladoGameQuote.tsx
5. [ ] Crear GameCard3D.tsx
6. [ ] Crear GameCarousel3D.tsx (con hook useSwipe)
7. [ ] Crear GamePreviewPanel.tsx
8. [ ] Modificar src/app/timba/page.tsx (integrar todo)
9. [ ] Crear src/app/timba/[game]/page.tsx (shell + ComingSoonShell)
10. [ ] Agregar placeholder.gif a public/games/
11. [ ] Tests + Build
12. [ ] PR → merge a master
```

---

## Plan de Verificación

- `npm test` debe pasar sin errores (tests existentes no se tocan).
- `npm run build` debe compilar sin errores TypeScript.
- Verificación visual en `http://localhost:3000/timba`.
- Navegación con teclado (ArrowUp/Down) funcional.
- Responsive: carrusel horizontal en `< 768px`.
- Hacer click en "Próximamente" → no crashea, muestra shell correcto.
