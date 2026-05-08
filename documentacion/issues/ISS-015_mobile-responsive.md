# ISS-015 — Responsive mobile para la Visual Novel

**Estado:** 🔴 OPEN  
**Prioridad:** 🟢 Baja  
**Etiquetas:** `ui`, `responsive`  

---

## Descripción

La aplicación actual está diseñada primordialmente para desktop. En móvil, el sprite de Blado, el dialog box y el HUD pueden sobreponerse o quedar fuera de la pantalla.

## Problemas identificados

### 1. Sprite de Blado — posicionamiento fijo
```typescript
// VisualNovelScene.tsx
className="absolute bottom-32 right-10 md:right-32 w-80 h-[500px]"
//                                    ↑ solo tiene breakpoint md, no sm
```
En pantallas < 768px el sprite de `w-80` (320px) puede ocupar demasiado espacio.

### 2. DialogBox — width fijo
```typescript
// DialogBox.tsx
className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl"
```
El `w-[90%]` es razonable, pero el `font-size text-lg` del texto puede ser muy grande en móvil.

### 3. Skill Tree overlay
```typescript
// GameEngine.tsx
className="absolute inset-8 z-30 rounded-xl overflow-hidden"
```
`inset-8` en móvil deja muy poco espacio para el grafo de React Flow.

### 4. Choices — scroll
Con muchas opciones en el DialogBox, en móvil pueden quedar cortadas fuera del viewport.

## Solución propuesta

### Breakpoint strategy
```
sm (< 640px): Layout vertical. Blado arriba, dialog abajo.
md (640-1024px): Layout híbrido
lg (> 1024px): Layout actual (desktop)
```

### Cambios en VisualNovelScene
```typescript
// Blado más pequeño en móvil
className="absolute bottom-32 right-2 sm:right-10 md:right-32 
           w-40 sm:w-56 md:w-80 
           h-[300px] sm:h-[400px] md:h-[500px]"
```

### Cambios en DialogBox
```typescript
// Texto más pequeño en móvil
className="text-sm sm:text-base md:text-lg"

// Max height + scroll para las choices
className="flex flex-col gap-2 mt-4 max-h-40 overflow-y-auto"
```

### Cambios en GameEngine (overlay Skill Tree)
```typescript
// Menos margen en móvil
className="absolute inset-2 sm:inset-4 md:inset-8 z-30"
```

## Criterios de aceptación

- [ ] La app es usable en iPhone SE (375px) sin elementos cortados
- [ ] El sprite de Blado escala proporcionalmente en móvil
- [ ] El DialogBox tiene scroll si hay muchas opciones
- [ ] El Skill Tree overlay usa toda la pantalla en móvil
- [ ] El HUD de escena (top-left) no se superpone con el sprite

## Estimación

~3-4 horas de desarrollo + testing en distintos viewports
