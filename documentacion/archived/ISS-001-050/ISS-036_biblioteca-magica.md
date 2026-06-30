# ISS-036: La Biblioteca Mágica — Grimorio de Habilidades RPG

**Estado:** Completado
**Branch de implementación:** `feature/ISS-036-biblioteca-magica`  
**Tipo:** Minijuego / Feature — Portafolio  
**Ruta:** Overlay desde el diálogo de Blado → opción "Abrir el Grimorio"  
**Prioridad:** Alta — reemplaza el Skill Tree actual (React Flow)

---

## Visión General

Reemplazar el árbol de habilidades basado en React Flow por una **Sala de Biblioteca estilo RPG oscuro pixel art** que sirve como minijuego de exploración de conocimiento. El jugador navega como si explorara un dungeon de rol: entra a una sala, ve las bibliotecas de sus carreras, elige una, examina los estantes por año, y abre los libros-materia para leer su contenido.

> **Premisa narrativa:** Blado invita al visitante a explorar su Grimorio Personal. Cada libro es una materia que Blado ha estudiado (o planea estudiar). Los libros brillantes contienen conocimiento; los opacos, oscuridad que aún no fue iluminada.

La experiencia es **premium pixel art RPG oscuro**, con animaciones de alta calidad, tipografía medieval, efectos de luz de antorcha, partículas de polvo y transiciones cinematográficas entre vistas.

---

## Estética y Temática

### Pixel Art RPG Oscuro — Estilo "Blado"

El diseño sigue el universo visual de la aplicación: oscuro, demoníaco-cómico, con toques de humor. Referencias visuales:

- **Castlevania** (Symphony of the Night): biblioteca oscura, candelabros, piedra gris
- **Undertale / Deltarune**: pixel art con personalidad, efectos de brillo suaves
- **Darkest Dungeon**: atmósfera opresiva pero funcional, tipografía serif pesada
- **Habitación de Blado en el juego**: coherencia con la cueva y el personaje

### Paleta de Colores Global

```
Fondo sala:       #0a0a0f (casi negro azulado)
Piedra paredes:   #1a1a2e / #16213e
Madera estantes:  #2d1b0e / #3d2415
Antorcha glow:    #ff6b1a / #ffaa44
Texto base:       #e8d5b0 (pergamino)
Texto bloqueado:  #4a4040 (ceniza)

Carrera 1 (Ing. Sistemas):  familia índigo  #1e3a5f → #3b82f6
Carrera 2 (Ing. Datos):     familia violeta #4a1d6b → #9333ea
Carrera 3 (Lic. IA):        familia verde   #0f3d1a → #22c55e
Carrera 4 (Miscelánea):     familia ámbar   #3d2800 → #d97706
```

### Tipografías
- **Títulos de sala/biblioteca:** `Cinzel` (Google Fonts) — medieval romana
- **Nombres de materias / lomo de libro:** `Crimson Text` — serif elegante
- **Contenido de páginas:** `Crimson Text` 18px, line-height 1.8
- **Código en las páginas:** `JetBrains Mono` — ya en el proyecto

---

## Arquitectura de Datos

### Inventario de Contenido Real

| Carrera | Años | Archivos tracking | Carpetas Materias existentes |
|---|---|---|---|
| 1 Ing Sistemas | 6 | `01_año_1.md` → `06_año_6.md` | `año 1/Materias/` (7 .md), `año 2/` (vacío) |
| 2 Ing Datos | 6 | `01_año_1.md` → `06_año_6.md` | ❌ Ninguna |
| 3 Lic IA | 6 | `01_año_1.md` → `06_año_6.md` | ❌ Ninguna |
| 4 Miscelánea | N/A | N/A | `Miscelánea/` (nueva) |

### Biblioteca 4: Miscelánea

Contiene todo el conocimiento que no encaja en las 3 carreras formales:
- Filosofías de ingeniería (Clean Architecture, SOLID, DDD, Unix Philosophy)
- Tecnologías transversales (Docker, Git avanzado, Linux)
- Proyectos personales (InmoVoz, Progresos-Académicos, etc.)
- Lectura autodidata (libros, papers, recursos)

Sus "libros" se parsean desde `content/Filosofia/` y un nuevo directorio `content/Miscelanea/`.

### Tipos TypeScript (libraryTypes.ts)

```typescript
export type BookStatus = 'locked' | 'progress' | 'completed';

export interface LibraryData {
  carreras: CarreraData[];
}

export interface CarreraData {
  id: string;           // "1 Ing Sistemas"
  slug: string;         // "ing-sistemas"
  name: string;         // "Ingeniería en Sistemas"
  shortName: string;    // "Ing. Sistemas"
  color: string;        // Color primario CSS: "#3b82f6"
  colorFamily: BookColorFamily;
  icon: string;         // Emoji/ícono representativo
  years: YearData[];    // Para Miscelánea: un solo "año" con todos los temas
}

export interface YearData {
  year: number;         // 1, 2, 3... Para Miscelánea: 0
  title: string;        // "Año 1: Fundamentos de ingeniería"
  materias: BookData[];
}

export interface BookData {
  slug: string;         // "matematica-ii" (URL-safe)
  name: string;         // "Matemática II"
  fullName: string;     // "Matemática II: Cálculo Diferencial e Integral"
  status: BookStatus;
  colorIndex: number;   // 0-7 — para elegir el tono dentro de la paleta de la carrera
  hasContent: boolean;  // true si existe el archivo .md de temas
  topicsFilePath: string | null;  // path absoluto al .md, null si no existe
  topics: TopicEntry[]; // vacío si !hasContent
}

export interface TopicEntry {
  id: string;           // "calculo-diferencial" (slug del heading)
  title: string;        // "Cálculo Diferencial" (texto del heading)
  level: 2 | 3;         // ## = 2, ### = 3
  hasContent: boolean;  // true si la sección tiene texto real (no solo el heading)
  charCount: number;    // aprox. de contenido para mostrar barra de llenado
}

export type BookColorFamily =
  | 'indigo'    // Ing. Sistemas
  | 'violet'    // Ing. Datos
  | 'emerald'   // Lic. IA
  | 'amber';    // Miscelánea

// Paletas de colores por familia (8 variantes para el lomo del libro)
export const BOOK_COLOR_PALETTES: Record<BookColorFamily, string[]> = {
  indigo:  ['#1e3a5f','#1a3a6b','#1e3a80','#1d3461','#162447','#1f4068','#1b2a4a','#243b6e'],
  violet:  ['#4a1d6b','#3d1460','#551d77','#3b1456','#4e1b70','#421960','#380f55','#5a2080'],
  emerald: ['#0f3d1a','#0a3015','#123d1a','#0c3818','#0e3516','#113a1a','#0d3214','#153f1c'],
  amber:   ['#3d2800','#4a3000','#3a2500','#4d3200','#3f2900','#452d00','#382200','#503600'],
};
```

### Parser (getLibraryData)

Flujo de parseo al cargar:

1. **Por cada carrera** (incluida Miscelánea):
   - Lee cada archivo `0X_año_Y.md` de tracking
   - Extrae las materias de `## Materias` con nombre y status del checkbox
   - Genera el `slug` del nombre (lowercase, sin tildes, guiones)
   - Busca `año X/Materias/[slug].md` o variantes con prefijo numérico
   - Si encuentra el .md → parsea headings `##` y `###`, detecta si tienen contenido
   - Asigna `colorIndex = i % 8` por posición en el año

2. **Miscelánea**:
   - Lee `content/Filosofia/*.md` → cada archivo = un libro
   - Lee `content/Miscelanea/*.md` (nuevo directorio) → cada archivo = un libro
   - Todos tienen status `completed` si tienen contenido real, `locked` si están vacíos

### Endpoints API

```
GET /api/library
  Respuesta: LibraryData completo (JSON)
  Cache: revalidate = 3600 (1 hora, contenido cambia poco)

GET /api/library/topic
  Query params: career, year, slug, section (opcional)
  Respuesta: { markdown: string, title: string }
  Si section está presente: solo esa sección del .md
  Si no: el .md completo
```

---

## Flujo de Navegación (4 Niveles)

```
[Nivel 0] Overlay activado desde GameEngine (diálogo de Blado)
          → Transición cinematográfica de entrada

[Nivel 1] LA SALA
          4 bibliotecas en perspectiva 2.5D
          Click en biblioteca → transición "zoom hacia ella"

[Nivel 2] LA BIBLIOTECA (carrera)
          Estantes apilados verticalmente (uno por año)
          Libros como lomos en el estante
          Click en libro → transición "abrir libro"

[Nivel 3] EL LIBRO (materia)
          Panel de páginas: izquierda = índice, derecha = contenido
          Click en tema disponible → carga el .md

[Nivel 4] LA PÁGINA (tema)
          Markdown renderizado, tipografía de lectura
          Botón "← Cerrar página" vuelve al índice
```

---

## Pantallas en Detalle

### Nivel 1: La Sala RPG

**Composición:**
```
╔═══════════════════════════════════════════════════════════╗
║  🔥                                                   🔥  ║  ← antorchas
║                                                           ║
║    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  ║
║    │📚        │  │📚        │  │📚        │  │📚      │  ║
║    │          │  │          │  │          │  │        │  ║
║    │Ing.      │  │Ing.      │  │Lic.      │  │Misc.   │  ║
║    │Sistemas  │  │Datos     │  │IA        │  │        │  ║
║    │          │  │          │  │          │  │        │  ║
║    │[6 años]  │  │[6 años]  │  │[6 años]  │  │[libre] │  ║
║    └──────────┘  └──────────┘  └──────────┘  └────────┘  ║
║                                                           ║
║  · · · ·  partículas de polvo flotando  · · · ·          ║
╚═══════════════════════════════════════════════════════════╝
```

**Efectos:**
- Antorchas: `@keyframes flicker` en 5 pasos con variación de `box-shadow` naranja/amarillo y ligero `translateY`
- Partículas de polvo: 8 partículas CSS con `@keyframes float` — movimiento aleatorio lento y opacidad variable
- Bibliotecas hover: `translateY(-6px)` + brillo dorado + sombra elongada
- Fondo: `radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)` — efecto de luz central
- Suelo: `repeating-linear-gradient` simulando tablas de madera oscura
- Música de fondo (placeholder para v2): silencio ambiental

### Nivel 2: La Biblioteca (carrera)

**Composición:**
```
┌─ [← Sala]  INGENIERÍA EN SISTEMAS ─────────────────────┐
│                                                         │
│  ╔═══ Año 1: Fundamentos ══════════════════════════════╗ │
│  ║ [📕] [📗] [📘] [📙] [📒] [📔] [📕] [📗]          ║ │
│  ╚════════════════════════════════════════════════════╝ │
│                                                         │
│  ╔═══ Año 2: Programación y Algoritmos ══════════════╗ │
│  ║ [▓▓] [▓▓] [▓▓] [▓▓] [▓▓] [▓▓] [▓▓] [▓▓] [▓▓] ║ │
│  ╚═══ (gris — "No comenzado") ═════════════════════╝ │
│                                                         │
│  [Año 3 ▸] ... (acordeón colapsado para años futuros)   │
└─────────────────────────────────────────────────────────┘
```

**Los libros (BookSpine):**
- Rectángulo vertical `~40px ancho × 120px alto`
- Color de lomo: según paleta de la carrera + `colorIndex`
- Texto del nombre: `writing-mode: vertical-rl; rotate: 180deg` — legible de abajo a arriba
- **Estado completed:** lomo con `glow` pulsante leve del color de la carrera
- **Estado progress:** lomo con brillo parpadeante (`@keyframes shimmer`)
- **Estado locked:** lomo `#2a2a2a`, texto `#4a4040`, sin efectos de luz
- **Hover (solo si no locked):** `translateY(-10px)` + sombra aumentada (0.3s ease)
- Tooltip al hover: nombre completo de la materia + porcentaje completado

### Nivel 3: El Libro (índice de temas)

```
╔════════════════════════════════════════════════════════╗
║  [← Biblioteca]  📖 Matemática II: Cálculo            ║
║  ─────────────────────────────────────────────────    ║
║  Estado: [/] En progreso   ████████░░░░  40%          ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  ÍNDICE DE TEMAS                                       ║
║  ──────────────────                                    ║
║                                                        ║
║  ✦ Cálculo Diferencial          [VER PÁGINA ▸]        ║  ← disponible
║  ✦ Derivadas                    [VER PÁGINA ▸]        ║  ← disponible
║  ✦ Integrales                   [VER PÁGINA ▸]        ║  ← disponible
║  ○ Series y Sucesiones           (aún no estudiado)   ║  ← bloqueado
║  ○ Recursos Recomendados         (aún no estudiado)   ║  ← bloqueado
║                                                        ║
║  ─────────────────────────────────────────────────    ║
║  Sin notas: este libro está en blanco.                 ║  ← si hasContent = false
╚════════════════════════════════════════════════════════╝
```

**Reglas del índice:**
- Si `hasContent = false`: muestra todos los temas del tracking como `locked` (gris, ○)
- Si `hasContent = true`: muestra las secciones del .md; las que tienen texto = disponibles (✦ dorado), las vacías = bloqueadas (○)
- La barra de progreso calcula `seccionesConContenido / totalSecciones * 100`
- Ítems disponibles: cursor `pointer`, hover con subrayado dorado
- Ítems bloqueados: cursor `not-allowed`, hover muestra tooltip "Aún no has estudiado este tema"

### Nivel 4: La Página (contenido)

```
╔════════════════════════════════════════════════════════╗
║  [← Índice]    Cálculo Diferencial                    ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  ## Derivadas                                          ║
║  ─────────────                                         ║
║  **Definición:** La derivada mide la tasa de           ║
║  cambio instantánea de una función.                    ║
║                                                        ║
║  ```python                                             ║
║  x = sp.symbols('x')                                  ║
║  f = x**3 + 2*x**2                                    ║
║  ```                                                   ║
║                                                        ║
║  [← Sección anterior]  [Sección siguiente →]          ║
╚════════════════════════════════════════════════════════╝
```

**Renderizado:**
- `react-markdown` + `remark-gfm` + `rehype-highlight`
- Componentes custom para headings (tipografía `Cinzel`), código (`JetBrains Mono` con fondo oscuro)
- Scroll automático al tope al cargar nueva sección
- Navegación "anterior/siguiente sección" usando el índice

---

## Animaciones (Detalle Técnico)

### Transición Sala → Biblioteca (Nivel 1 → 2)
- La biblioteca seleccionada hace `scale(1.2)` mientras las otras hacen `opacity: 0`
- Luego la seleccionada hace `scale(3) translateY(-50%)` — efecto de "zoom hacia ella"
- El contenido de la biblioteca aparece con `AnimatePresence` de Framer Motion (`opacity: 0 → 1, y: 20 → 0`)
- Duración total: 600ms

### Transición Biblioteca → Libro (Nivel 2 → 3)
- El `BookSpine` clickeado: `scale(1) → scale(1.5) → opacity: 0` (vuela hacia el centro)
- El panel del libro aparece desde el centro con `scale(0.8) → scale(1)` y `opacity: 0 → 1`
- Duración: 400ms

### Transición Libro → Página (Nivel 3 → 4)
- El ítem del índice clickeado se resalta con un destello dorado
- El contenido de la página entra con `x: 40px → 0, opacity: 0 → 1`
- Duración: 300ms

### Animación de antorchas
```css
@keyframes flicker {
  0%   { box-shadow: 0 0 15px 8px #ff6b1a80; opacity: 1; }
  25%  { box-shadow: 0 0 20px 12px #ffaa4480; opacity: 0.95; }
  50%  { box-shadow: 0 0 12px 6px #ff6b1a60; opacity: 0.9; }
  75%  { box-shadow: 0 0 18px 10px #ff8c2a70; opacity: 0.97; }
  100% { box-shadow: 0 0 15px 8px #ff6b1a80; opacity: 1; }
}
/* Duración variable por antorcha: 1.8s y 2.2s para asincronía */
```

### Partículas de polvo
```css
@keyframes float-dust {
  0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
  20%  { opacity: 0.4; }
  80%  { opacity: 0.2; }
  100% { transform: translate(var(--dx), var(--dy)) rotate(360deg); opacity: 0; }
}
/* 8 partículas con --dx y --dy aleatorios via CSS custom properties */
/* Duración: 6s - 12s por partícula, con delays distintos */
```

### Glow pulsante (libro completado)
```css
@keyframes glow-pulse {
  0%   { box-shadow: 0 0 8px 2px var(--book-color); }
  50%  { box-shadow: 0 0 20px 8px var(--book-color); }
  100% { box-shadow: 0 0 8px 2px var(--book-color); }
}
/* 2.5s ease-in-out infinite */
```

### Shimmer (libro en progreso)
```css
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
/* background: linear-gradient(90deg, var(--book-color) 20%, lighten 50%, var(--book-color) 80%) */
/* 3s linear infinite */
```

---

## Fases de Implementación

### Fase 1 — Infraestructura de Datos
**Duración estimada:** 3-4h  
**Objetivo:** Parser robusto + API. Sin UI.

**Archivos:**
- `[NEW]` `src/lib/libraryTypes.ts`
- `[MODIFY]` `src/lib/markdown.ts` — agregar `getLibraryData()`
- `[NEW]` `src/app/api/library/route.ts`
- `[NEW]` `src/app/api/library/topic/route.ts`
- `[NEW]` `content/Miscelanea/` (directorio vacío con `.gitkeep`)
- `[NEW]` `src/__tests__/lib/libraryParser.test.ts` — tests del parser

**Criterio de éxito:** `npm test` verde + `curl /api/library` devuelve JSON válido con las 4 carreras.

---

### Fase 2 — La Sala RPG (Nivel 1)
**Duración estimada:** 4-5h  
**Objetivo:** Pantalla visual de la sala con las 4 bibliotecas. Solo visual.

**Archivos:**
- `[NEW]` `src/components/biblioteca/LibraryRoom.tsx`
- `[NEW]` `src/components/biblioteca/LibraryUnit.tsx` (cada biblioteca en la sala)
- `[MODIFY]` `src/app/globals.css` — tokens CSS y animaciones de sala
- `[MODIFY]` `src/components/GameEngine.tsx` — integrar LibraryRoom

**Criterio de éxito:** El overlay se activa desde el diálogo de Blado. Las 4 bibliotecas se ven con antorchas y partículas animadas.

---

### Fase 3 — Estantes y Libros (Nivel 2)
**Duración estimada:** 4-5h  
**Objetivo:** Click en biblioteca muestra estantes reales con libros con datos y estados correctos.

**Archivos:**
- `[NEW]` `src/components/biblioteca/LibraryShelf.tsx` (estante de un año)
- `[NEW]` `src/components/biblioteca/BookSpine.tsx` (lomo de libro)
- `[NEW]` `src/hooks/useLibraryData.ts`
- `[MODIFY]` `src/components/biblioteca/LibraryRoom.tsx` — conectar datos

**Criterio de éxito:** Los libros muestran colores correctos, glows según estado, nombres en vertical. Hover funciona.

---

### Fase 4 — Libro y Páginas (Nivel 3 y 4)
**Duración estimada:** 4-5h  
**Objetivo:** Flujo completo de libro → índice → página con contenido Markdown.

**Archivos:**
- `[NEW]` `src/components/biblioteca/BookViewer.tsx`
- `[NEW]` `src/components/biblioteca/BookIndex.tsx`
- `[NEW]` `src/components/biblioteca/TopicPage.tsx`
- `[NEW]` `src/lib/markdownRenderer.ts`

**Dependencias nuevas:**
```bash
npm install react-markdown remark-gfm rehype-highlight
```
*(verificar si react-markdown ya está antes de instalar)*

**Criterio de éxito:** Flujo completo funcional. Ingeniería Sistemas → Año 1 → Matemática II → Cálculo Diferencial muestra el markdown real.

---

### Fase 5 — Pulido y Quality Gates
**Duración estimada:** 2-3h  
**Objetivo:** Animaciones finales, responsive, accesibilidad, build limpio.

**Tareas:**
1. Animaciones de transición entre niveles (`layoutId` Framer Motion o equivalente)
2. Responsive: mobile colapsa a lista vertical de bibliotecas
3. `aria-label` en libros, `role="button"`, foco visible
4. Limpiar imports de React Flow de `GameEngine.tsx` (sin borrar los archivos)
5. `npm test && npm run build` — ambos limpios
6. Push + PR + Merge a master

---

## Estructura de Archivos Final

```
src/
  lib/
    libraryTypes.ts              [NEW] Tipos TypeScript
    markdownRenderer.ts          [NEW] Config react-markdown
    markdown.ts                  [MODIFY] + getLibraryData()

  app/
    api/
      library/
        route.ts                 [NEW] GET /api/library
        topic/
          route.ts               [NEW] GET /api/library/topic

  components/
    biblioteca/
      LibraryRoom.tsx            [NEW] Sala RPG (Nivel 1)
      LibraryUnit.tsx            [NEW] Tarjeta biblioteca en la sala
      LibraryShelf.tsx           [NEW] Estante de un año (Nivel 2)
      BookSpine.tsx              [NEW] Lomo de libro
      BookViewer.tsx             [NEW] Libro abierto (Nivel 3)
      BookIndex.tsx              [NEW] Índice de temas
      TopicPage.tsx              [NEW] Página de contenido (Nivel 4)

    GameEngine.tsx               [MODIFY] integrar LibraryRoom

  hooks/
    useLibraryData.ts            [NEW] Hook de datos

  __tests__/
    lib/
      libraryParser.test.ts      [NEW] Tests del parser

content/
  Miscelanea/
    .gitkeep                     [NEW] Directorio para contenido libre

documentacion/
  issues/
    ISS-036_biblioteca-magica.md [THIS FILE]
```

**Archivos deprecados (se mantienen en repo, sin uso):**
- `src/components/SkillTreeViewer.tsx`
- `src/components/RuneNode.tsx`
- `src/lib/dagre-layout.ts`

---

## Preguntas Resueltas

| Pregunta | Respuesta |
|---|---|
| ¿Tecnologías y Proyectos también son libros? | No — solo Materias. Proyectos y Tecnologías se planifican para ISS-037 |
| ¿Libro sin .md muestra índice vacío o está bloqueado? | Aparece, tiene 3 estados (locked/progress/completed), índice vacío si no hay .md |
| ¿Sala separada o overlay? | Overlay desde el diálogo de Blado (mismo flujo que el SkillTree actual) |
| ¿Cuántas carreras? | 4 (Ing. Sistemas, Ing. Datos, Lic. IA, Miscelánea) |
| ¿Miscelánea tiene años? | No — un solo "estante" con todos sus libros |

---

## Plan de Verificación

```bash
# Tests automatizados
npm test          # todos los tests pasan incluyendo libraryParser.test.ts
npm run build     # build limpio sin errores de TypeScript
```

**Verificación manual por fase:**
- **F1:** `fetch('/api/library')` devuelve 4 carreras con materias y estados correctos
- **F2:** Activar Grimorio desde Blado → sala con 4 bibliotecas, antorchas y partículas
- **F3:** Click en Ing. Sistemas → 6 estantes con libros coloreados y glows según estado
- **F4:** Click en "Matemática II" → índice → "Cálculo Diferencial" → Markdown real renderizado
- **F5:** Mobile funcional, ARIA correcto, build 0 errores, deploy Vercel OK

---

## Expansión Futura (v2+)

- **ISS-037:** Agregar "Tecnologías" como objetos especiales en los estantes (pergaminos, pociones)
- **ISS-038:** Minijuego de búsqueda de libro — el jugador debe "encontrar" el libro correcto en un tiempo dado
- **ISS-039:** Editor inline — editar el .md del libro desde la sala (requiere API de escritura)
- **ISS-040:** Miscelánea expandida — tablón de proyectos, sección de filosofías como cuadros en la pared
- **v2:** Sonidos ambientales (pasos, páginas pasando, fuego de antorchas)
