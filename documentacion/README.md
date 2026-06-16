# 🔥 Portfolio Blado — Documentación del Proyecto

> **Portfolio profesional de Alexis Galván** con un asistente virtual de IA (Blado) integrado para diagnóstico y soporte, además de módulos interactivos.

---

## 📁 Estructura de esta documentación

```
documentacion/
├── README.md                    ← Este archivo: visión general del proyecto
├── arquitectura.md              ← Arquitectura técnica detallada
├── ISSUES.md                    ← Master list de todos los issues (backlog)
└── issues/
    ├── ISS-001_setup-nextjs.md          [CLOSED]
    ...
```

---

## 🎯 Visión del Proyecto

**Portfolio Blado** es un portfolio profesional interactivo y dinámico que sirve como carta de presentación, herramienta de embudo de ventas y demostración de habilidades técnicas de Alexis Galván.

1. 💼 **Secciones Narrativas**: Home scrollable con Hero, Servicios (AIDO), About, Skills y Proyectos.
2. 🤖 **Asistente Virtual (Blado)**: IA impulsada por Groq (LLaMA) configurada con límites estrictos de soporte técnico y personalidad estoico/tecno-optimista, capaz de derivar leads directo a WhatsApp.
3. 🎮 **Módulos Interactivos (Legacy)**: Incorpora minijuegos (`/timba`) y un Árbol de Habilidades/Progreso (`/biblioteca`) heredados de iteraciones anteriores, accesibles desde el menú.
4. 📈 **Analíticas y Persistencia**: Historial de chat persistido en PostgreSQL (Supabase) y tracking de visitas anónimo.

---

## 🏗️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 16.2.6** (App Router) | Framework principal |
| **React 19** | UI Components |
| **TypeScript** | Tipado estricto |
| **Tailwind CSS v4** | Estilado con design tokens custom |
| **Framer Motion** | Animaciones y transiciones |
| **Groq SDK** | IA generativa (LLaMA 3) |
| **Prisma 7 + Supabase** | Base de datos relacional |
| **@xyflow/react** | Skill Tree visual (Biblioteca) |

---

## 🚀 Cómo Arrancar

```bash
# 1. Clonar e instalar dependencias
npm install

# 2. Configurar base de datos y API keys
cp .env.local.example .env.local
# Editar .env.local con credenciales de Groq y Supabase

# 3. Migraciones Prisma
npx prisma migrate dev

# 4. Correr servidor de desarrollo
npm run dev
```

---

## 📬 Contacto

**Alexis Galván** — Desarrollador Full-Stack, Ciencia de Datos e IA.
Repositorio: `GalvanAlexis/Progresos-Academicos`
