# ISS-019 — Navbar, Sidebar y Chat Panel (Rediseño UI)

**Estado:** OPEN  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `ui`, `navbar`, `sidebar`, `chat`, `layout`, `ux`  
**Branch:** `mantenimiento-general`  
**Creado:** 2026-05-09  
**Extiende:** ISS-017 (Planificación Narrativa)

---

## Descripción

Rediseño de tres componentes de la UI principal para mejorar la experiencia:

1. **Navbar** — Nuevos botones según la hoja de ruta del producto
2. **Sidebar** — Convertido en panel de opciones/ajustes (no navegación)
3. **Chat Panel** — Reposicionado para no tapar el avatar de Blado

---

## Feature 1: Navbar rediseñado

### Antes
```
[≡] Blado_Cavern | Inicio | Grimorio | Proyectos        [● Cueva de Blado]
```

### Después
```
[≡] Blado_Cavern | [Intro] [Timba] [Cebar Mate]         [● Cueva de Blado]
```

### Especificación de botones

| Botón | Comportamiento |
|---|---|
| **Intro** | Llama `onReplayIntro()` → muestra CavernIntro de nuevo |
| **Timba** | `disabled`, tooltip "Próximamente..." (sección de juegos futura) |
| **Cebar Mate** | `disabled`, tooltip "Próximamente..." (sección futura) |

### Props nuevas en `Navbar`
```tsx
interface NavbarProps {
  scene: 'cave' | 'library';
  onReplayIntro: () => void;        // ← NUEVA
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  // onNavigate eliminado (ya no hay nav links de diálogos en navbar)
}
```

### Archivos
- **[MODIFY]** `src/components/Navbar.tsx`
- **[MODIFY]** `src/components/GameEngine.tsx` — pasar `onReplayIntro` al Navbar

---

## Feature 2: Sidebar rediseñado (solo opciones/ajustes)

### Antes
El Sidebar mezclaba: navegación de diálogos + filtros del Grimorio + botón Intro

### Después
El Sidebar contiene **solo opciones y ajustes**:

```
┌─────────────────────────┐
│  ⚙ OPCIONES             │
│─────────────────────────│
│  Ajustes Visuales       │
│  ○ Partículas activas   │  ← toggle (futuro)
│  ○ Animaciones          │  ← toggle (futuro)
│                         │
│  Sobre esta web         │
│  [→ GitHub del proyecto]│
│  Versión: 0.1.0         │
└─────────────────────────┘
```

### Cambios en props
```tsx
// Props ELIMINADAS del Sidebar:
// - onNavigate
// - onSelectCareer / onSelectYear
// - availableCareers / availableYears
// - selectedCareer / selectedYear

// Props NUEVAS:
// (ninguna por ahora, los toggles son locales)
```

### Archivos
- **[MODIFY]** `src/components/Sidebar.tsx`
- **[MODIFY]** `src/components/GameEngine.tsx` — eliminar props de filtros del Sidebar

---

## Feature 3: Chat Panel sin tapar a Blado

### Problema actual
```
DialogBox: position absolute, bottom-8, left-1/2 -translate-x-1/2
```
Al estar centrado horizontalmente, se superpone con Blado que está en `right-10`.

### Solución

El `DialogBox` se posiciona a la **izquierda**, Blado permanece a la derecha:

```
┌────────────────────────────────────────────────┐
│  [Navbar]                                      │
├────────────────────────────────────────────────┤
│                                                │
│                           [  Blado avatar  ]   │
│  ┌──────────────────┐     [ right-10       ]   │
│  │  Chat Panel      │     [ bottom-32      ]   │
│  │  left-6, 48%w    │                          │
│  │  bottom-8        │                          │
│  │  • texto Blado   │                          │
│  │  • choices       │                          │
│  │  • input libre   │                          │
│  └──────────────────┘                          │
└────────────────────────────────────────────────┘
```

### Cambios en `DialogBox.tsx`
```tsx
// Antes:
className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50"

// Después:
className="absolute bottom-8 left-6 w-[90%] max-w-[48%] z-50"
```

### Archivos
- **[MODIFY]** `src/components/DialogBox.tsx`

---

## Archivos afectados (resumen)

| Acción | Archivo | Cambio |
|---|---|---|
| MODIFY | `src/components/Navbar.tsx` | Nuevos botones: Intro, Timba, Cebar Mate |
| MODIFY | `src/components/Sidebar.tsx` | Solo opciones/ajustes; sin filtros Grimorio ni nav |
| MODIFY | `src/components/DialogBox.tsx` | Posición `left-6` en vez de centrado |
| MODIFY | `src/components/GameEngine.tsx` | Pasar `replayIntro` al Navbar; simplificar props Sidebar |

---

## Criterios de aceptación

### Navbar
- [ ] Botón "Intro" llama `replayIntro()` correctamente
- [ ] Botón "Timba" aparece deshabilitado con tooltip "Próximamente..."
- [ ] Botón "Cebar Mate" aparece deshabilitado con tooltip "Próximamente..."
- [ ] Logo y hamburger menu se mantienen

### Sidebar
- [ ] No contiene links de navegación de diálogos
- [ ] No contiene filtros de carrera/año del Grimorio
- [ ] Muestra sección "Ajustes Visuales" (toggles placeholder)
- [ ] Muestra sección "Sobre esta web" con link a GitHub y versión
- [ ] Se abre/cierra correctamente desde el hamburger del Navbar

### Chat Panel
- [ ] El DialogBox no se superpone con el avatar de Blado
- [ ] El chat es visible y legible en pantalla full HD (1920x1080)
- [ ] Blado permanece visible a la derecha cuando el chat está abierto
- [ ] Click en Blado abre el chat (comportamiento existente se mantiene)

### General
- [ ] Sin errores TypeScript
- [ ] Sin regresiones en funcionalidad existente del diálogo/GameEngine
