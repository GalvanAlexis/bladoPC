# 🔥 Blado_Cavern — Documentación del Proyecto

> **Portafolio interactivo de Alexis Galván** en formato Visual Novel RPG oscuro.
> Blado, el diablillo guardián, guía a los reclutadores y tech leads por el conocimiento técnico de su creador.

---

## 📁 Estructura de esta documentación

```
documentacion/
├── README.md                    ← Este archivo: visión general del proyecto
├── arquitectura.md              ← Arquitectura técnica detallada
├── ISSUES.md                    ← Master list de todos los issues (backlog)
└── issues/
    ├── ISS-001_setup-nextjs.md          [CLOSED]
    ├── ISS-002_game-engine.md           [CLOSED]
    ├── ISS-003_visual-novel-scene.md    [CLOSED]
    ├── ISS-004_dialog-box.md            [CLOSED]
    ├── ISS-005_skill-tree-viewer.md     [CLOSED]
    ├── ISS-006_markdown-parser.md       [CLOSED]
    ├── ISS-007_groq-chat-api.md         [CLOSED]
    ├── ISS-008_public-assets.md         [CLOSED]
    ├── ISS-009_multi-career-parser.md   [OPEN]
    ├── ISS-010_dagre-autolayout.md      [OPEN]
    ├── ISS-011_rich-context-ai.md       [OPEN]
    ├── ISS-012_blado-avatar-cleanup.md  [OPEN]
    ├── ISS-013_env-and-config.md        [OPEN]
    ├── ISS-014_multi-year-parser.md     [OPEN]
    ├── ISS-015_mobile-responsive.md     [OPEN]
    └── ISS-016_vercel-deploy.md         [OPEN]
```

---

## 🎯 Visión del Proyecto

**Blado_Cavern** transforma un repositorio estático de apuntes académicos en una **experiencia interactiva tipo RPG** que:

1. 🗺️ Muestra el **Árbol de Habilidades** (React Flow) con el progreso académico real leído desde archivos Markdown
2. 🎭 Presenta al visitante un **personaje jugable** (Blado) con árbol de diálogos scripted
3. 🤖 Permite **preguntas libres** a Blado, respondidas por una IA (Groq/LLaMA) con contexto real del repositorio
4. 🎨 Usa una **estética dark RPG** consistente (colores: obsidian, crimson, toxic green, sulfur purple)

---

## 🏗️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 16.2.6** (App Router) | Framework principal |
| **React 19** | UI Components |
| **TypeScript** | Tipado estricto |
| **Tailwind CSS v4** | Estilado con design tokens custom |
| **Framer Motion** | Animaciones y transiciones |
| **@xyflow/react** (React Flow) | Skill Tree visual |
| **Groq SDK** | IA generativa (LLaMA 70B) |
| **gray-matter** | Parsing de frontmatter en Markdown |

---

## 📊 Estado Actual

| Fase | Estado |
|---|---|
| Setup y arquitectura base | ✅ Completo |
| Game Engine + Dialogue Tree | ✅ Completo |
| Visual Novel Scene (backgrounds + sprites) | ✅ Completo |
| Dialog Box (typewriter + choices + input) | ✅ Completo |
| Skill Tree Viewer básico | ✅ Completo |
| Parser Markdown (Año 1, Carrera 1) | ✅ Completo |
| Chat API con Groq | ✅ Completo |
| Assets públicos (sprites, fondos) | ✅ Completo |
| Parser multi-carrera y multi-año | 🔴 Pendiente |
| Auto-layout Dagre en Skill Tree | 🔴 Pendiente |
| Contexto enriquecido para IA | 🔴 Pendiente |
| Responsive mobile | 🔴 Pendiente |
| Deploy a Vercel | 🔴 Pendiente |

---

## 🚀 Cómo Arrancar

```bash
# 1. Clonar e instalar dependencias
npm install

# 2. Configurar la API key de Groq
cp .env.local.example .env.local
# Editar .env.local y agregar: GROQ_API_KEY=gsk_...

# 3. Correr el servidor de desarrollo
npm run dev

# 4. Abrir en el browser
# http://localhost:3000
```

---

## 📬 Contacto

**Alexis Galván** — Estudiante de Ingeniería en Sistemas  
Repositorio: `GalvanAlexis/Progresos-Academicos`
