# 🏗️ Arquitectura Técnica — Blado_Cavern

---

## Diagrama de Flujo General

```
┌─────────────────────────────────────────────────────────────────────┐
│                       NEXT.JS APP ROUTER                            │
│                                                                     │
│  /app/page.tsx (Server Component)                                   │
│    │                                                                │
│    ├── getSkillTreeData()  ◄── /lib/markdown.ts                     │
│    │       │                       │                                │
│    │       │                 Parsea archivos .md                   │
│    │       │                 content/Carreras/**                   │
│    │       │                                                        │
│    └── <AppShell>  ◄── cliente: estado del Intro                    │
│          │                                                          │
│          ├── [showIntro=true]  → <StarWarsIntro>                    │
│          │                        │ skip / onComplete               │
│          │                        ▼                                │
│          └── [showIntro=false] → <GameEngine>                       │
│                                   │                                 │
│                   ┌───────────────┼───────────────┐                 │
│                   ▼               ▼               ▼                 │
│             <Navbar>         <Sidebar>     <VisualNovelScene>       │
│             (z-50)           (z-40)        + <DialogBox>            │
│                                            + <ReadmeModal>          │
│                                            + <SkillTreeViewer>      │
│                                                                     │
│  /app/api/chat/route.ts (API Route)                                 │
│    │                                                                │
│    └── Groq SDK ──► LLaMA 70B                                       │
│          (con system prompt + contexto del grimorio)                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Arbol de Componentes

```
<AppShell>                         ← Wrapper cliente. Maneja estado del Intro.
  │
  ├── [showIntro] <StarWarsIntro>  ← Scroll Star Wars 3D con texto amarillo
  │
  └── [showIntro=false]
        <GameEngine>               ← Motor central. Gestiona estado del juego.
          │
          ├── <Navbar>             ← Barra superior glassmorphism (z-50)
          │     ├── Sidebar toggle (hamburguesa)
          │     ├── Enlaces: Inicio / Grimorio / Proyectos
          │     └── Indicador de escena (cueva / biblioteca)
          │
          ├── <Sidebar>            ← Panel lateral plegable (z-40)
          │     ├── Navegacion: Inicio / Perfil / Skills / Proyectos / Chat / Intro
          │     └── Filtros: por carrera y año
          │
          ├── <VisualNovelScene>   ← Fondo + sprite Blado con animacion idle
          │     ├── <motion.img>   ← Background (object-contain, opacidad 0.8)
          │     └── <motion.div>  ← Sprite Blado clickeable (base / phone)
          │
          ├── <div> vignette       ← Radial gradient decorativo (z-10)
          │
          ├── <AnimatePresence>    ← Grimoire overlay (Skill Tree)
          │     └── <SkillTreeViewer> ← React Flow con nodos filtrables
          │           └── <RuneNode>   ← Nodo custom
          │
          ├── <ReadmeModal>        ← Modal CV con react-markdown (z-95)
          │
          └── <AnimatePresence>    ← DialogBox animado (slide-up)
                └── <DialogBox>    ← Caja de dialogo (bottom-center)
                      ├── Name Badge "BLADO"
                      ├── Boton "Cerrar"
                      ├── Texto con typewriter effect
                      ├── Choice buttons
                      └── Free question input (form)
```

---

## Flujo de Datos

### 1. Intro Star Wars (Client Side)
```
AppShell
  → showIntro=true → renderiza <StarWarsIntro>
  → Scroll animado ~18s con texto de presentacion (quien es, ubicacion, stacks, proyectos)
  → Boton "Skip" para saltear
  → onComplete/onSkip → setShowIntro(false) → renderiza <GameEngine>
```

### 2. Carga del Juego (Server Side)
```
page.tsx (Server) 
  → getSkillTreeData() en lib/markdown.ts
  → Lee todas las carreras recursivamente
  → Parsea checkboxes: - [x], - [/], - [ ]
  → Retorna: SkillNode[] + SkillEdge[]
  → Props a GameEngine → SkillTreeViewer
```

### 3. Arbol de Dialogos (Client Side)
```
GameEngine state: currentKey (DialogueKey)
  → DIALOGUES[currentKey] → { text, scene, pose, choices[], flags }
  → dialogVisible=false al inicio
  → Click en Blado → dialogVisible=true
  → VisualNovelScene recibe: scene + bladoPose + dialogVisible + onBladoClick
  → DialogBox recibe: text + choices[] + onClose
  → Usuario hace click en choice → setCurrentKey(newKey)
  → Opcion "CV" → setShowCVModal(true) → <ReadmeModal>
```

### 4. Sidebar y Navegacion
```
Sidebar/Navbar
  → onNavigate(key) → setCurrentKey(key) + dialogVisible=true
  → Sidebar: onReplayIntro() → AppContext → remonta StarWarsIntro
  → Sidebar: filtros de carrera/año sincronizados con SkillTreeViewer
```

### 5. Pregunta Libre a Blado (Client → API → Client)
```
Usuario escribe en DialogBox input
  → handleFreeQuestion(question)
  → POST /api/chat  { messages: Message[] }
  
API route:
  → getSkillTreeData() (re-lee los .md en servidor)
  → Construye contextString con nodos del grimorio
  → Llama a Groq: system_prompt + contextString + messages
  → Retorna: { reply: string }
  
GameEngine:
  → Agrega reply a messages[]
  → displayText = lastMessage.content (si role === 'assistant')
```

---

## Estructura de Archivos del Proyecto

```
Progresos-Academicos/
│
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Entry point. Server Component.
│   │   ├── layout.tsx            ← Root layout con fuentes Geist
│   │   ├── globals.css           ← Design tokens + Tailwind v4
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts      ← POST handler. Groq integration.
│   │
│   ├── components/
│   │   ├── AppShell.tsx          ← Wrapper cliente (estado del Intro)
│   │   ├── GameEngine.tsx        ← Motor del juego + state management
│   │   ├── StarWarsIntro.tsx     ← Scroll Star Wars 3D de presentacion
│   │   ├── Navbar.tsx            ← Barra de navegacion superior
│   │   ├── Sidebar.tsx           ← Sidebar plegable con navegacion y filtros
│   │   ├── VisualNovelScene.tsx  ← Backgrounds + sprites con Framer Motion
│   │   ├── DialogBox.tsx         ← UI de dialogo (typewriter, choices, input, cerrar)
│   │   ├── SkillTreeViewer.tsx   ← React Flow wrapper (filtros como props)
│   │   ├── ReadmeModal.tsx       ← Modal CV con react-markdown
│   │   ├── RuneNode.tsx          ← Nodo custom para React Flow
│   │   └── BladoAvatar.tsx       ← Loading screen con Suspense
│   │
│   └── lib/
│       ├── markdown.ts           ← Parser de .md → SkillNode[] + SkillEdge[]
│       └── AppContext.tsx        ← Contexto con funcion replayIntro
│
├── content/
│   └── Carreras/
│       ├── 1 Ing Sistemas/
│       │   ├── año 1/ ← PARSEADO ✅
│       │   │   └── 01_año_1.md
│       │   ├── año 2/ ← NO PARSEADO ❌
│       │   ├── 02_año_2.md
│       │   ├── ...
│       ├── 2 Ing Datos/ ← NO PARSEADO ❌
│       └── 3 Lic IA/   ← NO PARSEADO ❌
│
├── public/
│   ├── blado-base.png        ← Sprite Blado pose base
│   ├── blado-phone.png       ← Sprite Blado pose teléfono
│   ├── dark-cave-bg.png      ← Fondo cueva
│   └── dark-library-bg.png   ← Fondo biblioteca arcana
│
└── documentacion/
    ├── README.md
    ├── arquitectura.md       ← Este archivo
    ├── ISSUES.md
    └── issues/
```

---

## Design Tokens (globals.css)

| Token | Valor | Uso |
|---|---|---|
| `--color-obsidian` | `#050505` | Background profundo |
| `--color-crimson` | `#dc2626` | Blado / Peligro / Nombre |
| `--color-toxic` | `#39ff14` | Habilidades completas / CTA |
| `--color-sulfur` | `#9333ea` | Edges React Flow / Inputs |
| `--background` | `#050505` | Body background |
| `--foreground` | `#e5e5e5` | Texto base |

---

## Dependencias Clave

| Paquete | Versión | Para qué |
|---|---|---|
| `next` | 16.2.6 | Framework |
| `react` | 19.2.4 | UI |
| `@xyflow/react` | ^12.10.2 | Skill Tree / React Flow |
| `framer-motion` | ^12.38.0 | Animaciones |
| `groq-sdk` | ^1.1.2 | Chat IA con Blado |
| `gray-matter` | ^4.0.3 | Frontmatter en .md |
| `lucide-react` | ^1.14.0 | Iconos (disponibles, no usados aun) |
| `react-markdown` | ^10 | Renderizado de Markdown (CV modal) |
| `remark-gfm` | ^4 | Plugin GFM para tablas, links, etc. |
| `tailwindcss` | ^4 | CSS utilitario |

---

## Variables de Entorno Requeridas

```env
# .env.local
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Obtener en: https://console.groq.com/keys
