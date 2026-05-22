# 🏔️ Progresos Académicos — Blado Cavern

Portfolio interactivo en formato Visual Novel RPG que muestra el progreso académico de **Alexis Galván** a través de un Skill Tree gamificado, con IA integrada (Blado) y chat persistente.

> **Demo:** [progresos-academicos.vercel.app](https://progresos-academicos.vercel.app) *(próximamente)*

---

## 🎮 Features

- **Visual Novel** — intro narrativa con sprites, fondos de caverna y diálogos tipográficos
- **Skill Tree** — árbol de habilidades académicas por carrera (React Flow + Dagre auto-layout)
- **Chat con Blado** — IA basada en Groq (LLaMA 3) con contexto enriquecido del portfolio
- **Chat History** — historial de conversaciones persistido en Supabase
- **Visitor Analytics** — tracking anónimo de visitas (país, dispositivo, referrer)
- **Sección Filosofía** — ensayos y reflexiones personales integrados al contexto de la IA

---

## 🛠️ Stack

| Área | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 |
| ORM | Prisma 7 + `@prisma/adapter-pg` |
| Base de datos | Supabase (PostgreSQL) |
| IA / LLM | Groq SDK (LLaMA 3) |
| Animaciones | Framer Motion |
| Grafos | React Flow (@xyflow) + Dagre |
| Testing | Jest + Testing Library |
| Deploy | Vercel |

---

## 🚀 Correr localmente

### Prerrequisitos
- Node.js ≥ 20
- Una API key de [Groq](https://console.groq.com/keys)
- Una base de datos en [Supabase](https://supabase.com) (o PostgreSQL local)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/GalvanAlexis/Progresos-Academicos.git
cd Progresos-Academicos

# 2. Instalar dependencias (también corre prisma generate)
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales (ver sección Variables de entorno)

# 4. Correr el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### Variables de entorno

Editar `.env.local` con los siguientes valores:

```bash
# Chat con IA Blado
GROQ_API_KEY=gsk_tu_api_key_de_groq

# Supabase — Transaction pooler (para Next.js serverless)
DATABASE_URL="postgresql://postgres.[REF]:[PWD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase — Directo (para migraciones con prisma migrate)
DIRECT_URL="postgresql://postgres:[PWD]@db.[REF].supabase.co:5432/postgres"
```

> Ver `.env.local.example` para el template completo con instrucciones.

### Migraciones de base de datos

```bash
# Crear o actualizar tablas en Supabase
npx prisma migrate dev

# Ver la DB en modo visual
npx prisma studio
```

---

## 🧪 Tests

```bash
npm test              # Correr todos los tests
npm run test:watch    # Modo watch
npm run test:coverage # Con reporte de cobertura
```

---

## 🏗️ Estructura del proyecto

```
src/
  app/          → Rutas y layouts (Next.js App Router)
    api/
      chat/     → POST /api/chat — Chat con Groq (LLaMA 3)
      analytics/→ POST /api/analytics — Tracking de visitas
  components/   → Componentes reutilizables (Visual Novel, Skill Tree, Chat)
  lib/          → Clientes y utilidades (Prisma, Groq, Dagre, Markdown parser)

content/        → Archivos .md con datos del Skill Tree por carrera y año
prisma/         → Schema y migraciones de la base de datos
documentacion/  → Issues (ISS-XXX), arquitectura y README interno
public/         → Assets estáticos (sprites, fondos RPG, iconos)
```

---

## 📋 Issues y roadmap

Ver [`documentacion/ISSUES.md`](./documentacion/ISSUES.md) para el tracking completo de features y bugs.

---

## 👤 Autor

**Alexis Galván** — [GitHub](https://github.com/GalvanAlexis)
