# Portfolio Blado — Alexis Galván

Portfolio profesional y moderno de **Alexis Galván**, desarrollador Full-Stack y estudiante de Ciencia de Datos e IA.
Incluye un Asistente Virtual Inteligente (Blado) diseñado para brindar diagnóstico técnico y derivar presupuestos vía WhatsApp.

---

## 🎮 Features

- **Home Corporativo** — Landing page limpia enfocada en servicios, habilidades, about y proyectos.
- **Asistente Técnico (Blado)** — IA configurada con límites estrictos, capaz de resolver dudas técnicas, actuar en "Modo Intelectual" y derivar a WhatsApp (con máquina de estados para recolección de info).
- **Módulos Interactivos (Extras)** — Se conservan las secciones `/timba` (minijuegos) y `/biblioteca` (Skill Tree interactivo en React Flow) de la versión original (legacy) del proyecto.
- **Persistencia de Datos** — Historial completo de chat guardado asíncronamente en PostgreSQL vía Supabase + Prisma.
- **Visitor Analytics** — Tracking de accesos.

---

## 🛠️ Stack

| Área | Tecnología |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Lenguaje | TypeScript 5 |
| UI/Estilos | Tailwind CSS 4, Framer Motion |
| Base de Datos | Supabase (PostgreSQL) + Prisma 7 ORM |
| Inteligencia Artificial | Groq SDK (LLaMA 3 70B) |
| Render de Chat | React Markdown |
| Módulos interactivos | `@xyflow/react` (React Flow) |

---

---

> **IMPORTANTE:** Este proyecto sigue un workflow OBLIGATORIO para todo cambio de codigo.
> Leer [`documentacion/README.md`](documentacion/README.md) seccion **Workflow Obligatorio** antes de tocar cualquier archivo.

## 🚀 Correr localmente

### Prerrequisitos
- Node.js ≥ 20
- Una API key de [Groq](https://console.groq.com/keys)
- Base de datos [Supabase](https://supabase.com) (o Postgres local)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/GalvanAlexis/bladoPC.git
cd bladoPC

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Añade tu GROQ_API_KEY y credenciales de Supabase.

# 4. Sincronizar DB
npx prisma migrate dev

# 5. Correr el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 🧪 Tests

```bash
npm test              # Correr todos los tests
npm run build         # Verificar Typescript y build
```

---

## 👤 Autor

**Alexis Galván** — [GitHub](https://github.com/GalvanAlexis)
