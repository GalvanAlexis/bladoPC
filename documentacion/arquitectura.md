# 🏗️ Arquitectura Técnica — Blado_Cavern

---

## Diagrama de Flujo General

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                           │
│                                                                 │
│  /app/page.tsx (Server Component)                               │
│    │                                                            │
│    ├── getSkillTreeData()  ◄── /lib/markdown.ts                 │
│    │       │                       │                            │
│    │       │                 Parsea archivos .md               │
│    │       │                 content/Carreras/**               │
│    │       │                                                    │
│    └── <GameEngine initialNodes edges />                        │
│                                                                 │
│  /app/api/chat/route.ts (API Route)                             │
│    │                                                            │
│    └── Groq SDK ──► LLaMA 70B                                   │
│          (con system prompt + contexto del grimorio)            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Árbol de Componentes

```
<GameEngine>                       ← Motor central. Gestiona estado del juego.
  │
  ├── <VisualNovelScene>           ← Fondo + sprite Blado (posición según escena)
  │     ├── <motion.img>           ← Background (cave / library) con AnimatePresence
  │     └── <motion.div>          ← Sprite Blado (base / phone) con AnimatePresence
  │
  ├── <div> vignette overlay       ← Radial gradient decorativo (z-10)
  │
  ├── <AnimatePresence>            ← Grimoire overlay (Skill Tree)
  │     └── <SkillTreeViewer>      ← React Flow con nodos RuneNode
  │           └── <RuneNode>       ← Nodo custom: 📚 materia | 💻 tech | ⚔️ proyecto
  │
  ├── <div> HUD                    ← Indicador de escena actual (top-left)
  │
  └── <DialogBox>                  ← Caja de diálogo (bottom-center)
        ├── Name Badge "BLADO"
        ├── Texto con typewriter effect
        ├── Choice buttons
        └── Free question input (form)
```

---

## Flujo de Datos

### 1. Carga Inicial (Server Side)
```
page.tsx (Server) 
  → getSkillTreeData() en lib/markdown.ts
  → Lee: content/Carreras/1 Ing Sistemas/año 1/01_año_1.md
  → Parsea checkboxes: - [x], - [/], - [ ]
  → Retorna: SkillNode[] + SkillEdge[]
  → Props a GameEngine → SkillTreeViewer
```

### 2. Árbol de Diálogos (Client Side)
```
GameEngine state: currentKey (DialogueKey)
  → DIALOGUES[currentKey] → { text, scene, pose, choices[], flags }
  → VisualNovelScene recibe: scene + bladoPose
  → DialogBox recibe: text + choices[]
  → Usuario hace click en choice → setCurrentKey(newKey)
```

### 3. Pregunta Libre a Blado (Client → API → Client)
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
│   │   ├── GameEngine.tsx        ← Motor del juego + state management
│   │   ├── VisualNovelScene.tsx  ← Backgrounds + sprites con Framer Motion
│   │   ├── DialogBox.tsx         ← UI de diálogo (typewriter, choices, input)
│   │   ├── SkillTreeViewer.tsx   ← React Flow wrapper
│   │   ├── RuneNode.tsx          ← Nodo custom para React Flow
│   │   └── BladoAvatar.tsx       ← [HUÉRFANO] Avatar flotante (no usado)
│   │
│   └── lib/
│       └── markdown.ts           ← Parser de .md → SkillNode[] + SkillEdge[]
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
| `lucide-react` | ^1.14.0 | Iconos (disponibles, no usados aún) |
| `tailwindcss` | ^4 | CSS utilitario |

---

## Variables de Entorno Requeridas

```env
# .env.local
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Obtener en: https://console.groq.com/keys
