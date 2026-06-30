# ISS-018 — CavernIntro: Scroll vertical en fondo oscuro caverna

**Estado:** OPEN  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `ui`, `intro`, `animation`, `ux`  
**Branch:** `mantenimiento-general`  
**Creado:** 2026-05-09  
**Reemplaza:** ISS-017 Feature 5 (StarWarsIntro)

---

## Descripción

El componente `StarWarsIntro.tsx` actual tiene problemas de scroll porque combina `translateY` con `rotateX: 25` en perspectiva 3D. Esto causa que la velocidad percibida del texto varíe según su posición en el eje Z, haciendo el texto difícil de leer.

Se reemplaza por `CavernIntro.tsx`: un scroll vertical puro sin perspectiva, con estética coherente con la temática de caverna oscura.

---

## Problema actual

```tsx
// StarWarsIntro.tsx — causa scroll irregular
animate={{ y: '-200vh', rotateX: 25 }}
// La combinación de rotateX con translateY causa distorsión visual
// El texto en la parte superior parece ir más rápido que en la inferior
```

---

## Solución propuesta

### Animación
- **Solo `translateY`** de `100vh` a `-100%`, sin rotación ni perspectiva
- `ease: 'linear'` para velocidad constante y legible
- Duración: `~28 segundos` (más cómodo para leer)
- Fade-in primeros 2s, fade-out últimos 3s via `opacity` keyframes

### Estética caverna
- Fondo: `#000` puro
- Partículas flotantes: pequeños puntos naranja/rojo con animación de fade random (brasas)
- Color de texto: `#cc4400` a `#ff6600` con `text-shadow` rojo oscuro
- Tipografía: `'Courier New', monospace` — evoca un grimorio/terminal
- Ancho del texto: `min(65%, 700px)` centrado

### Texto del intro
```
Soy Alexis Galván.
Vivo en Chascomús, Buenos Aires, Argentina.

Desarrollador Full-Stack y cofundador de AIDO.
Construyo backends, APIs y herramientas
que resuelven problemas reales.

Esta web es mi grimorio digital.
Aquí vas a encontrar mis habilidades,
mis proyectos y mi forma de pensar.

Si sos reclutador, cliente o simplemente curioso:
bienvenido a la Caverna.

— Blado te guía desde aquí.
```

### Comportamiento
- Se muestra al cargar la app (mismo comportamiento que `StarWarsIntro`)
- Botón **"Omitir"** bottom-right, estilo monoespaciado oscuro
- Se puede reproducir desde el botón "Intro" del Navbar (via `AppContext.replayIntro`)
- Al completar → fade-out → landing principal

---

## Archivos

| Acción | Archivo |
|---|---|
| **[NEW]** | `src/components/CavernIntro.tsx` |
| **[MODIFY]** | `src/lib/AppContext.tsx` — reemplazar `StarWarsIntro` por `CavernIntro` |
| **[DEPRECATED]** | `src/components/StarWarsIntro.tsx` — queda en repo, no se usa |

---

## Criterios de aceptación

- [ ] El texto sube a velocidad constante y legible (sin distorsión 3D)
- [ ] Fondo negro con partículas tipo brasas/ceniza
- [ ] Tipografía monoespaciada en tono naranja/rojo oscuro
- [ ] Botón "Omitir" funcional
- [ ] Se puede reproducir desde el Navbar con `replayIntro()`
- [ ] Transición suave (fade-out) al terminar
- [ ] Sin errores TypeScript
