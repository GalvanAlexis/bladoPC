# ISS-017 -- Planificacion de la Narrativa, Layout y UX

**Estado:** OPEN
**Prioridad:** Alta
**Etiquetas:** `narrative`, `layout`, `ux`, `ui`, `navbar`, `sidebar`, `background`

---

## Descripcion

Este issue agrupa varias mejoras de experiencia de usuario, layout y narrativa para Blado_Cavern. Incluye:

1. **Navbar** -- Barra de navegacion superior
2. **Sidebar plegable** -- Panel lateral colapsable
3. **Chat al hacer click en Blado** -- El dialogo aparece solo cuando se interactua con Blado
4. **Fondo fullscreen sin crop** -- Los backgrounds (cueva/biblioteca) deben verse completos y detallados
5. **Star Wars Intro** -- Scroll de presentacion estilo Star Wars al cargar la web
6. **CV Modal** -- Modal con el README del perfil de GitHub renderizado con react-markdown

---

## Feature 1: Navbar

### Estado actual
No hay navbar. La app es pantalla completa sin navegacion. Solo hay un HUD en top-left que muestra la escena actual.

### Solucion propuesta
Agregar un `<nav>` fijo en la parte superior con enlaces y toggle para sidebar.

**Elementos del navbar:**
- Logo de Blado (icono pequeno o texto "Blado_Cavern")
- Enlaces: Inicio, Grimorio, Proyectos, Contacto
- Boton de toggle para la sidebar (hamburguesa)
- Indicador de escena actual

**Estilo:**
- Fondo semi-transparente (glassmorphism: `bg-black/70 backdrop-blur-sm`)
- Borde inferior con glow color `--color-crimson`
- Altura ~48-56px, z-50

**Archivos:**
- `src/components/Navbar.tsx` -- NUEVO
- `src/components/GameEngine.tsx` -- integrar Navbar

---

## Feature 2: Sidebar plegable

### Estado actual
No hay sidebar. Los filtros de carrera/año estan dentro del SkillTreeViewer.

### Solucion propuesta
Sidebar colapsable en el lado izquierdo con Framer Motion.

**Contenido del sidebar:**
- Navegacion: Inicio, Perfil, Habilidades (Skill Tree), Proyectos, Chat libre
- Filtros de Grimorio: por carrera, por año
- Contacto / redes al final

**Comportamiento:**
- Animacion slide desde la izquierda
- Ancho 240px abierto, 0px cerrado
- Toggle desde navbar o boton propio
- z-index 40

**Archivos:**
- `src/components/Sidebar.tsx` -- NUEVO
- `src/components/GameEngine.tsx` -- integrar Sidebar

---

## Feature 3: Chat al hacer click en Blado

### Estado actual
El DialogBox esta siempre visible en la parte inferior, tapando parte del arte.

### Solucion propuesta
DialogBox oculto inicialmente. Click en Blado lo abre.

**Flujo:**
1. Estado idle: fondo completo visible + Blado flotando (animacion)
2. Click en Blado -> DialogBox aparece (slide-up)
3. DialogBox se cierra con boton Cerrar o click fuera

**Cambios:**
- `dialogVisible` inicia `false`
- Blado clickeable con `cursor-pointer` y tooltip
- Blado idle con animacion Framer Motion (flotar suave)

**Archivos:**
- `src/components/GameEngine.tsx` -- logica de dialogVisible
- `src/components/VisualNovelScene.tsx` -- onBladoClick, animacion idle
- `src/components/DialogBox.tsx` -- boton de cerrar

---

## Feature 5: Star Wars Intro

### Estado actual
La web carga directamente el juego (VisualNovelScene + DialogBox). No hay presentacion inicial.

### Solucion propuesta
Componente `StarWarsIntro` que se muestra al cargar la pagina:

- Fondo negro fullscreen con efecto de estrellas
- Texto amarillo (#ffe81f) con perspectiva 3D (CSS perspective + rotateX)
- Scroll vertical al estilo Star Wars (de abajo hacia arriba, desapareciendo en la distancia)
- Contenido del scroll (extraido de GitHub profile): quien es Alexis, donde vive, stacks, productos, proyectos destacados
- Duracion: ~18 segundos
- Boton "Skip" para saltear
- Al terminar, transiciona al juego con fade-out

**Archivos:**
- `src/components/StarWarsIntro.tsx` -- NUEVO
- `src/components/AppShell.tsx` -- NUEVO (wrapper cliente que maneja estado del intro)
- `src/lib/AppContext.tsx` -- NUEVO (contexto con funcion `replayIntro`)
- `src/app/page.tsx` -- modificado para usar AppShell

---

## Feature 6: CV Modal

### Estado actual
Blado no tiene forma de mostrar el CV. No hay referencia al perfil de GitHub dentro de la app.

### Solucion propuesta
Modal que fetchea y renderiza el README del perfil de GitHub `https://raw.githubusercontent.com/GalvanAlexis/GalvanAlexis/main/README.md`:

- Modal overlay con fondo oscuro (glassmorphism)
- Header con titulo "Grimorio de Experiencia - CV" y boton Cerrar
- Contenido renderizado con `react-markdown` + `remark-gfm`
- Soporta: headers, bold, lists, links, code blocks, tablas
- Estados: loading (spinner), error (mensaje de error), success (contenido formateado)
- Accesible desde: dialogo de Blado (opcion "Ver tu CV / Experiencia") y sidebar
- Se abre con efecto spring de Framer Motion

**Archivos:**
- `src/components/ReadmeModal.tsx` -- NUEVO
- `package.json` -- agregadas dependencias `react-markdown` + `remark-gfm`

---

## Feature 4: Fondo fullscreen sin crop

### Estado actual
Backgrounds 1024x1024 con `object-cover` que corta bordes. En pantalla 1920x1080 solo se ve el centro.

### Solucion propuesta
Cambiar a `object-contain` para ver la imagen completa. Aumentar opacidad de 0.6 a 0.8.

**Archivos:**
- `src/components/VisualNovelScene.tsx` -- cambiar object-cover a object-contain

---

## Archivos creados

| Archivo | Descripcion |
|---|---|
| `src/components/Navbar.tsx` | Barra de navegacion superior |
| `src/components/Sidebar.tsx` | Sidebar plegable izquierdo |
| `src/components/StarWarsIntro.tsx` | Intro Star Wars con scroll 3D |
| `src/components/ReadmeModal.tsx` | Modal de CV con react-markdown |
| `src/components/AppShell.tsx` | Wrapper cliente para estado del intro |
| `src/lib/AppContext.tsx` | Contexto con funcion replayIntro |

## Archivos modificados

| Archivo | Cambios |
|---|---|
| `src/components/GameEngine.tsx` | Agregar Navbar, Sidebar, ReadmeModal; dialogVisible inicia false; manejar onBladoClick; dialogo CV; integracion AppContext |
| `src/components/VisualNovelScene.tsx` | Agregar onBladoClick, animacion idle, cursor-pointer; object-cover -> object-contain; opacidad 0.6 -> 0.8 |
| `src/components/DialogBox.tsx` | Agregar boton de cerrar dialogBox |
| `src/components/SkillTreeViewer.tsx` | Filtros como props (compatibles con Sidebar) |
| `src/components/RuneNode.tsx` | Tipado correcto con NodeProps |
| `src/app/page.tsx` | Envuelto en AppShell para intro |
| `src/app/layout.tsx` | Metadata actualizada |
| `src/app/api/chat/route.ts` | Fix error typing |
| `package.json` | Dependencias: react-markdown, remark-gfm |

---

## Criterios de aceptacion

### Navbar
- [x] Barra fija en parte superior con glassmorphism
- [x] Enlaces: Inicio, Grimorio, Proyectos
- [x] Boton de toggle para sidebar
- [x] Indicador de escena actual

### Sidebar
- [x] Se abre/cierra con animacion suave (Framer Motion)
- [x] Contiene navegacion y filtros de carrera/año
- [x] Boton "Intro" para reproducir la presentacion
- [x] Se cierra al hacer click fuera o seleccionar opcion

### Chat al hacer click en Blado
- [x] Dialogo inicia oculto
- [x] Click en Blado abre el dialogo
- [x] Blado tiene animacion idle flotando
- [x] Cursor pointer sobre Blado
- [x] Tooltip "Click para hablar conmigo, mortal..."
- [x] Dialogo se puede cerrar

### Background
- [x] Imagen completa visible sin crop (object-contain)
- [x] Sin distorsion, mantiene relacion de aspecto
- [x] Opacidad 0.8 para mejor visibilidad

### Star Wars Intro
- [x] Fondo negro con estrellas
- [x] Texto amarillo con perspectiva 3D estilo Star Wars
- [x] Contenido: quien es, ubicacion, stacks, productos, proyectos
- [x] Boton Skip para saltear
- [x] ~18 segundos de duracion
- [x] Transicion fade-out al juego
- [x] Re-producible desde la Sidebar ("Intro")

### CV Modal
- [x] Fetch del README desde GitHub raw
- [x] Renderizado con react-markdown + remark-gfm
- [x] Modal overlay con estilo dark
- [x] Estados: loading (spinner), error, success
- [x] Boton Cerrar
- [x] Accesible desde dialogo de Blado y Sidebar

---

## Estimacion

| Feature | Tiempo |
|---|---|
| Navbar | 1-2 horas |
| Sidebar | 1-2 horas |
| Chat on Blado click | 2-3 horas |
| Background fix | 30 min |
| Star Wars Intro | 2-3 horas |
| CV Modal | 1-2 horas |
| **Total** | **~10-14 horas** |

---

## Implementacion

### Resumen de cambios realizados

1. **Navbar** (`src/components/Navbar.tsx`) - Creado con enlaces, toggle sidebar, indicador de escena
2. **Sidebar** (`src/components/Sidebar.tsx`) - Creado con navegacion, filtros de carrera/año y boton "Intro"
3. **StarWarsIntro** (`src/components/StarWarsIntro.tsx`) - Scroll 3D con texto amarillo, estrellas, boton Skip, 18s duracion
4. **ReadmeModal** (`src/components/ReadmeModal.tsx`) - Modal con fetch del README de GitHub, renderizado con react-markdown
5. **AppShell** (`src/components/AppShell.tsx`) - Wrapper cliente, maneja estado del intro via AppContext
6. **AppContext** (`src/lib/AppContext.tsx`) - Contexto con funcion `replayIntro` para Sidebar
7. **GameEngine** (`src/components/GameEngine.tsx`) - Integrados Navbar, Sidebar, ReadmeModal; dialogVisible inicia false; onBladoClick; dialogo CV; replayIntro desde contexto
8. **VisualNovelScene** (`src/components/VisualNovelScene.tsx`) - onBladoClick, animacion idle, object-contain, opacidad 0.8
9. **DialogBox** (`src/components/DialogBox.tsx`) - Boton de cerrar agregado
10. **SkillTreeViewer** (`src/components/SkillTreeViewer.tsx`) - Filtros como props (no internos)
11. **page.tsx** - Envuelto en AppShell para mostrar intro antes del juego
