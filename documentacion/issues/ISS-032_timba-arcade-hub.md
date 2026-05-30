# ISS-032: Timba Arcade Hub — Galería de Minijuegos

**Estado:** Planificado

---

## Descripción

Reemplazar la página placeholder `/timba` (actualmente "en construcción") por una galería interactiva de minijuegos creados por el autor. La experiencia debe mantener la estética RPG/demoniaca del proyecto y ser fiel al personaje de Blado.

### Comportamiento deseado

- Un **carrusel vertical** muestra todos los minijuegos disponibles (hasta 10).
- Al seleccionar un juego del carrusel, el **panel derecho** se actualiza con:
  - Un **GIF/preview animado** del juego seleccionado.
  - Una **burbuja de diálogo de Blado** explicando el juego con su tono característico.
  - Un botón "Jugar" que lleva al juego.
- La selección ocurre al hacer click en una carta del carrusel (no se requiere navegación).
- Blado solo aparece para **presentar el juego seleccionado**, sin un chat libre.

---

## Estructura de Datos

Cada minijuego tendrá un objeto `GameEntry` en un archivo de configuración estático:

```ts
interface GameEntry {
  id: string;           // "snake-arcano"
  title: string;        // "Serpiente Arcana"
  description: string;  // descripción corta para UI
  bladoQuote: string;   // frase de Blado al seleccionarlo
  previewGif: string;   // ruta al gif en /public/games/
  href: string;         // ruta al juego, ej: "/timba/snake"
  tags: string[];       // ["Arcade", "Habilidad"]
  available: boolean;   // para mostrar "próximamente"
}
```

Archivo: `src/lib/games.ts` — array exportado `GAMES`.

---

## Arquitectura de Rutas

```
src/app/timba/
  page.tsx              → Galería principal (Timba Hub)
  [game]/
    page.tsx            → Shell de juego individual (carga el componente)

src/components/timba/
  GameCarousel.tsx      → Carrusel vertical con las cartas
  GameCard.tsx          → Carta individual (título, tag, animación hover)
  GamePreviewPanel.tsx  → Panel derecho: gif + Blado hablando
  BladoGameQuote.tsx    → Burbuja de diálogo estilizada (sin chat libre)

src/lib/games.ts        → Registro estático de todos los juegos
public/games/           → GIFs de preview por juego
```

---

## Opciones de Implementación

### ✅ Opción A — Sólida y Robusta (Recomendada para MVP)

**Stack:** CSS puro + `framer-motion` (ya instalado) + React state local.

**Carrusel:**
- Lista vertical con `overflow-y-scroll` oculto y animaciones de entrada con `framer-motion`.
- Al hacer click en una carta, se actualiza `selectedGame` en el estado local del componente padre.
- No se requieren librerías adicionales.
- `GameCard` con `whileHover` de framer-motion (escala + glow) para feedback visual.

**Panel de preview:**
- `AnimatePresence` de framer-motion para transición suave entre juegos seleccionados.
- `<img>` con el GIF del juego (preload al montar).
- Burbuja de diálogo estilo RPG (igual que `DialogBox.tsx` existente pero simplificada, solo lectura).
- Avatar de Blado (sprite existente `BladoAvatar.tsx`).

**Pros:** Sin dependencias nuevas, consistente con el codebase, fácil de mantener.
**Contras:** El carrusel vertical requiere lógica manual para centrar el elemento seleccionado.

---

### ⭐ Opción B — Premium con Efecto WOW

**Stack:** `framer-motion` (ya instalado) + CSS 3D transforms + `requestAnimationFrame`.

**Carrusel (3D Coverflow):**
- Las cartas se muestran en perspectiva 3D (`perspective`, `rotateY`, `translateZ`).
- Las cartas no seleccionadas están levemente rotadas y alejadas en el eje Z, la seleccionada está centrada y al frente.
- La rotación de las cartas adyacentes se calcula dinámicamente según la distancia al índice activo.
- Navegación con teclado (flechas), click directo, y posible swipe en mobile.
- Implementación con `framer-motion` `useMotionValue` + `useTransform` para valores reactivos 3D.

**Panel de preview:**
- Transición de **crossfade + slide** al cambiar de juego (el gif anterior sale y entra el nuevo).
- Efecto de "scanlines" animadas sobre el GIF (estética CRT retro-demoniaca).
- Blado "entra en cuadro" desde abajo con un bounce animation al cambiar de juego.
- Fondo del panel con partículas/runas animadas que refuerzan la estética.
- Borde del panel con glow animado en color que cambia según el tag del juego (Arcade = crimson, Estrategia = toxic, etc.).

**Pros:** Visualmente impactante, único, coherente con la estética del proyecto.
**Contras:** Mayor complejidad de implementación. El carrusel 3D requiere más pruebas en mobile.

---

## Estimación

| Opción | Complejidad | Tiempo estimado | Dependencias nuevas |
|--------|-------------|-----------------|---------------------|
| A (Robusta) | Media | 3–4h | Ninguna |
| B (Premium WOW) | Alta | 6–8h | Ninguna (todo con framer-motion + CSS) |

---

## Archivos a Crear / Modificar

| Acción | Archivo |
|--------|---------|
| MODIFY | `src/app/timba/page.tsx` |
| NEW    | `src/components/timba/GameCarousel.tsx` |
| NEW    | `src/components/timba/GameCard.tsx` |
| NEW    | `src/components/timba/GamePreviewPanel.tsx` |
| NEW    | `src/components/timba/BladoGameQuote.tsx` |
| NEW    | `src/lib/games.ts` |
| NEW    | `src/app/timba/[game]/page.tsx` |
| NEW    | `public/games/*.gif` (1 GIF placeholder por juego) |

---

## Preguntas Abiertas

1. **¿Opción A o B?** ¿Arrancamos con el MVP robusto o vamos directo al efecto WOW?
2. **¿Cuántos juegos para el MVP?** ¿Con 1 juego real y el resto en "próximamente", o todos placeholders por ahora?
3. **¿GIFs propios o generados?** ¿Ya tenés GIFs de tus juegos o generamos placeholders con IA para el diseño?
4. **¿El juego se juega en la misma página o abre una nueva ruta `/timba/[game]`?**

---

## Plan de Verificación

- `npm test` debe seguir pasando (tests existentes no deben romperse).
- `npm run build` debe compilar sin errores.
- Verificación visual en `http://localhost:3000/timba`.
- Revisar responsive en mobile (el carrusel debe degradar graciosamente).
