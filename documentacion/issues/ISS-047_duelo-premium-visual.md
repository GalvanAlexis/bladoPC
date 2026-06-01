# ISS-047: Visual Premium "Duelo Golpes Bajos" — Efecto WOW

**Estado:** En progreso  
**Branch:** `feature/ISS-047-duelo-premium-visual`  
**Tipo:** Visual / UX / Polish  
**Prioridad:** Alta  

---

## Objetivo

Elevar el nivel visual de todos los componentes del Duelo Golpes Bajos a una experiencia PREMIUM. Actualmente el juego funciona bien mecánicamente pero visualmente es funcional-básico. Este ISS transforma cada componente con animaciones CSS nativas modernas, efectos de luz, atmósfera cinematográfica y feedback visual de alta calidad.

---

## Modern Web Guidance — Guías Aplicadas

Guías recuperadas mediante `npx -y modern-web-guidance@latest retrieve`:

- **`animate-to-from-top-layer`**: Usar `@starting-style` + `transition-behavior: allow-discrete` + `overlay` para animar burbujas y overlays entrando/saliendo del DOM. Reemplaza Framer Motion en `InsultBubble.tsx`.
- **`animate-element-entry-exit`**: Ocultar/mostrar elementos con transiciones CSS nativas al cambiar `display`. Aplica a `ResponseOptions`, paneles de control.
- **`css` (visual effects)**: Usar `filter: drop-shadow()`, `mix-blend-mode`, `color-mix()`, `oklch`, `@starting-style`, patrones con gradientes CSS. Aplica a todos los componentes.

> **Principio central de MWG:** Preferir `opacity` y `transform` para animaciones en el compositor thread. Usar `@starting-style` para entradas, nunca JS donde CSS alcanza.

---

## Analisis del Estado Actual

| Componente | Estado actual | Problema |
|---|---|---|
| `InsultBubble.tsx` | Framer Motion `AnimatePresence` | JS pesado para algo que CSS nativo resuelve |
| `ResponseOptions.tsx` | `border-2` + hover básico | Sin animación de entrada, feedback débil |
| `DuelLights.tsx` | Luces simples `rounded-full` | Sin pulso, sin glow gradiente |
| `BladoPortrait.tsx` | Border crimson + CRT overlay | Sin animación al estar activo |
| `DuelTimer.tsx` | Barra Framer Motion simple | Sin urgencia visual progresiva |
| `ScoreBoard.tsx` | Texto plano `10px` gris | Invisible en el contexto del duelo |
| `DuelArena.tsx` | Layout funcional | Sin atmósfera, sin fondo dramático, VS text gris |

---

## Cambios por Componente

### 1. `InsultBubble.tsx` — Migrar Framer Motion a CSS nativo

**Técnica:** `@starting-style` + `transition-behavior: allow-discrete` + `@keyframes`.

La burbuja de Blado entra desde arriba-derecha con scale y blur. La del jugador desde abajo-izquierda. Sin JavaScript de animación. Agrega efecto de "scanline" en la burbuja de Blado y glow neon en la del jugador.

### 2. `ResponseOptions.tsx` — Feedback premium con animaciones de entrada

- Cada opción entra con `@starting-style` con delay escalonado (stagger efecto) usando `animation-delay: calc(var(--i) * 60ms)`.
- Hover: borde neon con `box-shadow` pulsante, fondo con `color-mix(in oklch, ...)`.
- Feedback correcto: flash verde + `scale(1.02)` + glow expandido.
- Feedback incorrecto: shake lateral (`@keyframes shake`) + glow rojo.
- Letra de opción (A, B, C) con estilo "arcade badge".

### 3. `DuelLights.tsx` — Luces con pulso y glow cinematográfico

- Luz activa: `@keyframes pulse-glow` con `box-shadow` escalonado (3 capas de glow).
- Luz del jugador: color `oklch(0.85 0.3 145)` (verde neón preciso).
- Luz de Blado: color `oklch(0.55 0.25 25)` (rojo crimson profundo).
- Al encenderse: `@starting-style` con `scale(0)` → `scale(1)` + aparición del glow.
- Separador central: línea con gradiente `oklch` en lugar de `bg-gray-700`.

### 4. `BladoPortrait.tsx` — Marco vivo cuando Blado ataca

- Nueva prop `isActive: boolean` (pasada desde `DuelArena`).
- Cuando activo: borde con `animation: border-pulse 1s ease-in-out infinite` — el crimson pulsa hacia afuera con `box-shadow` en capas.
- Overlay CRT mejorado: `backdrop-filter: contrast(1.1) saturate(1.2)` (progresivo).
- Sombra exterior dramática: `drop-shadow(0 0 20px oklch(0.55 0.3 25))`.

### 5. `DuelTimer.tsx` — Urgencia visual progresiva

- Migrar la barra de Framer Motion a CSS animation con `animation-timing-function: linear`.
- Colores con transición automática via custom properties:
  - `> 8s`: verde neón pulsante suave
  - `4-8s`: amarillo con pulso medio
  - `< 4s`: crimson + shake lateral + pulso rápido
- El número de segundos: `@keyframes countdown-pulse` — escala brevemente en cada tick.

### 6. `ScoreBoard.tsx` — Marcador tipo arcade premium

- Fondo: `background: linear-gradient(in oklch, ...)` con vidrio oscuro.
- Nombres en `text-shadow` neon del color del jugador/blado.
- Al cambiar el puntaje: `@keyframes score-pop` — el número salta y vuelve.
- Border con `border-image` gradiente crimson-toxic.

### 7. `DuelArena.tsx` — Atmósfera y fondo dramático

- Fondo del arena: gradiente radial oscuro con viñeta crimson sutil en esquinas.
- "VS" text: reemplazar el gris aburrido por texto con `background-clip: text` en gradiente crimson→toxic, animación de brillo rotante.
- Panel de controles (`PLAYER_ATTACKING`): borde con `border-image` animado (neón rotante).
- Transición entre fases con `@starting-style` en el panel, sin Framer.
- Avatar activo: mejorar el `drop-shadow` con `filter: drop-shadow()` en capas.

---

## Archivos a Modificar

| Archivo | Cambio |
|---|---|
| [MODIFY] `InsultBubble.tsx` | Reemplazar Framer Motion por CSS `@starting-style` |
| [MODIFY] `ResponseOptions.tsx` | Stagger entry, feedback premium, shake |
| [MODIFY] `DuelLights.tsx` | Glow pulso + oklch colors |
| [MODIFY] `BladoPortrait.tsx` | Prop `isActive`, border pulse animado |
| [MODIFY] `DuelTimer.tsx` | CSS animation, urgencia progresiva |
| [MODIFY] `ScoreBoard.tsx` | Arcade premium, score-pop |
| [MODIFY] `DuelArena.tsx` | Fondo atmósfera, VS premium, pasa `isActive` a BladoPortrait |

---

## Criterios de Aceptación

- [ ] `InsultBubble` no importa Framer Motion — usa CSS nativo `@starting-style`
- [ ] `ResponseOptions` tiene stagger de entrada y feedback correcto/incorrecto con animaciones distintas
- [ ] `DuelLights` pulsan con glow multi-capa al encenderse
- [ ] `BladoPortrait` borde pulsa cuando es el turno de Blado
- [ ] `DuelTimer` cambia de color/intensidad progresivamente según el tiempo restante
- [ ] `ScoreBoard` aplica `score-pop` al cambiar el puntaje
- [ ] `DuelArena` tiene fondo con viñeta crimson, VS text con gradiente, panel con border neón
- [ ] `prefers-reduced-motion` respetado en todas las animaciones CSS
- [ ] 59 tests pasan sin modificaciones
- [ ] Build sin errores TypeScript
- [ ] PR mergeado a master → deploy Vercel

---

## Estimación

- Implementación: ~2-3h
- Branch: `feature/ISS-047-duelo-premium-visual`
