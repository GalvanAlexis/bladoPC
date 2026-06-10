# ISS-046: Refactor de Avatares + Modo Landscape Mobile en Duelo con Golpes Bajos

**Estado:** En planificación  
**Branch de implementación:** `feature/ISS-046-duelo-mejoras`  
**Tipo:** Feature / UX / Refactor  
**Prioridad:** Alta  

---

## Contexto del Minijuego

El flujo actual del juego es:
1. `START_SCREEN` → pantalla de inicio
2. `AVATAR_CREATOR` → editor de avatar (tabs: rostro / ropa / extras usando DiceBear SVG generado por seed)
3. `ARENA` → `DuelArena.tsx` con avatares lado a lado (jugador izq, Blado der)
4. `RESULT` → pantalla de resultado
5. `TROPHIES` → gabinete de trofeos

---

## Cambios Requeridos

### 1. Avatar de Blado: Usar `/blado-base.png` (el mismo del Home)

**Problema actual:** En el `DuelArena.tsx` (línea 227-229), el avatar de Blado es simplemente el emoji `😈` dentro de un `div` placeholder. Dice en el comentario *"en v2 se podría animar"*.

**Solución:** Reemplazar el placeholder con el componente que ya usa `BladoAvatar.tsx`, que carga `/blado-base.png`. Crear un nuevo componente liviano reutilizable `BladoPortrait.tsx` que muestre la imagen `/blado-base.png` dentro del marco crimson del duelo.

> **El archivo fuente del avatar de Blado es: `public/blado-base.png`**
> Para agregar más avatares/skins de Blado en el futuro, basta con agregar archivos como `public/blado-vikingo.png`, `public/blado-ninja.png`, etc.

---

### 2. Avatar del Jugador: Simplificar a "Clases de Guerrero"

**Problema actual:** El `AvatarCreator.tsx` tiene un sistema complejo de 3 tabs (rostro / ropa / extras) con ~6 variables para generar un seed de DiceBear. Es demasiado para una experiencia de minijuego rápido.

**Nueva propuesta:** El jugador solo elige:
- **Un nombre** (campo de texto, máx. 15 chars)
- **Una clase de guerrero** (se elige de una grilla visual de tarjetas)

Cada clase de guerrero es básicamente un **preset fijo** que define el seed de DiceBear internamente. La imagen del jugador seguirá siendo generada por DiceBear igual que antes, pero ya sin que el usuario configure nada manualmente.

**Clases de guerrero propuestas:**

| Clase | Emoji | Descripción | Seed interno |
|---|---|---|---|
| Vikingo | ⚔️ | Guerrero del norte, bruto y directo | `vikingo-rapado-rubio-cicatriz-intimidante-vikingo` |
| Ninja | 🥷 | Silencioso, letal, preciso | `ninja-ninguno-negro-ninguno-serio-ninja` |
| Pirata | 🏴‍☠️ | Caradura, desfachatado | `pirata-largo-pelirrojo-parche-sonriente-pirata` |
| Caballero | 🛡️ | Noble, defensivo, estoico | `caballero-rapado-negro-ninguno-serio-caballero` |
| Samurai | ⛩️ | Honor por encima de todo | `samurai-cola-negro-ninguno-intimidante-samurai` |
| Gaucho | 🌵 | Criollo pintoresco | `gaucho-largo-castaño-ninguno-sonriente-gaucho` |

> **El archivo fuente del avatar del jugador es:**  
> La URL de DiceBear generada por `buildAvatarUrl()` de `avatarConfig.ts`.  
> Para agregar assets de alta calidad personalizados en el futuro: crear `public/avatar-vikingo.png`, `public/avatar-ninja.png`, etc. y reemplazar la URL de DiceBear por la imagen local en `buildAvatarUrl()`.

**Cambios en `AvatarConfig`:** Se simplificará el tipo `AvatarConfig` manteniendo compatibilidad con el storage existente. Se agrega el campo `class: WarriorClass` y se derivan las demás propiedades automáticamente del preset.

---

### 3. Forzar Landscape en Mobile durante el Duelo

**Problema actual:** La arena del duelo tiene un layout `flex-col` en mobile (avatares uno arriba del otro) que hace el layout imposible de usar en pantalla chica vertical.

**Solución:** Hay dos estrategias posibles:

#### Opción A (Recomendada): CSS + `screen-orientation` API
Cuando el usuario entra a la `ARENA`, mostrar un overlay que le pide rotar el dispositivo con la API `screen.orientation.lock('landscape')`. Si el browser lo soporta (Chrome Android sí, Safari iOS no), se rota automáticamente. Si no, se muestra un cartel con ícono de rotación.

```tsx
// Al entrar a ARENA:
useEffect(() => {
  if (isMobile) {
    screen.orientation?.lock('landscape').catch(() => {
      setShowRotatePrompt(true);
    });
  }
  return () => screen.orientation?.unlock();
}, []);
```

#### Opción B: CSS puro con `@media (orientation: portrait)`
Mostrar un overlay "Por favor, rota tu dispositivo 📱→📺" cuando `orientation: portrait` en mobile. No fuerza el giro pero lo comunica.

**Recomendación:** Implementar ambas. La API cuando está disponible (Android), y el overlay como fallback visual (iOS).

---

## Archivos a Crear/Modificar

### [NEW] `src/components/timba/duelo/BladoPortrait.tsx`
Nuevo componente liviano que muestra `/blado-base.png` con el marco crimson del duelo.
Reemplaza el `div` con emoji `😈` en `DuelArena.tsx`.

### [MODIFY] `src/lib/avatarConfig.ts`
- Agregar tipo `WarriorClass`
- Agregar array `WARRIOR_CLASSES` con los 6 presets
- Modificar `buildAvatarUrl()` para aceptar tanto el config viejo como el nuevo

### [MODIFY] `src/components/timba/duelo/AvatarCreator.tsx`
- Reemplazar los 3 tabs complejos por una grilla de selección de clase (máx 2 pasos: elegir clase → ingresar nombre)
- Mantener compatibilidad con el `savePlayerAvatar()` existente

### [MODIFY] `src/components/timba/duelo/DuelArena.tsx`
- Reemplazar el placeholder de Blado con `<BladoPortrait />`
- Agregar lógica de landscape lock al montar el componente

### [NEW] `src/components/timba/duelo/RotatePrompt.tsx`
Overlay que se muestra cuando el dispositivo está en portrait y no se puede forzar landscape.

---

## Criterios de Aceptación

- [ ] Avatar de Blado en la Arena muestra `/blado-base.png` (mismo del Home) con marco crimson
- [ ] Creador de Avatar simplificado: solo grilla de clases + input de nombre (máx 2 pantallas)
- [ ] En Android: `screen.orientation.lock('landscape')` se intenta al entrar a la Arena
- [ ] En iOS y fallbacks: overlay de "Por favor rota el dispositivo" cuando orientation=portrait
- [ ] Desktop: sin cambios en el comportamiento
- [ ] Tests: 59 tests pasan (sin cambios en la lógica del motor de duelo)
- [ ] Build: sin errores de TypeScript
- [ ] PR mergeado a master → deploy Vercel

---

## Assets Requeridos del Usuario

> [!IMPORTANT]
> Para el avatar del jugador, el archivo base es generado dinámicamente por DiceBear:
> `https://api.dicebear.com/10.x/pixel-art/svg?seed=...`
>
> Si querés subir imágenes propias de alta calidad para cada clase de guerrero,
> simplemente agregarlos en `public/` con el formato:
> - `public/avatar-vikingo.png`
> - `public/avatar-ninja.png`
> - `public/avatar-pirata.png`
> - `public/avatar-caballero.png`
> - `public/avatar-samurai.png`
> - `public/avatar-gaucho.png`
>
> El código ya estará preparado para usar esas rutas cuando los archivos existan.

---

## Estimación
- Implementación: ~3-4h
- Branch: `feature/ISS-046-duelo-mejoras`
