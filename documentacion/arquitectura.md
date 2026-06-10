# 🏗️ Arquitectura Técnica — Portfolio Blado

---

## Diagrama de Flujo General

```
┌─────────────────────────────────────────────────────────────────────┐
│                       NEXT.JS APP ROUTER                            │
│                                                                     │
│  /app/page.tsx (Server Component)                                   │
│    │                                                                │
│    └── <AppShell>                                                   │
│          │                                                          │
│          └── <HomeLayout> (Scrollable)                              │
│                │                                                    │
│                ├── <Navbar> (z-50) ── toggle ──► <Sidebar> (z-40)   │
│                │                                                    │
│                ├── <HeroSection>                                    │
│                ├── <ServicesSection>                                │
│                ├── <AboutSection>                                   │
│                └── <SkillsSection>                                  │
│                                                                     │
│  /app/chat/page.tsx (Ruta del Asistente)                            │
│    │                                                                │
│    └── <CebarMatePage> (UI del Chat)                                │
│          │                                                          │
│          └── POST /api/chat                                         │
│                                                                     │
│  /app/timba/ & /app/biblioteca/ (Rutas Interactivas)                │
│    └── Minijuegos y Visualizador de Conocimiento (Legacy)           │
│                                                                     │
│  /app/api/chat/route.ts (API Route)                                 │
│    │                                                                │
│    ├── 1. Prisma Client ──► Supabase (Guardar/Cargar Sesión)        │
│    └── 2. Groq SDK ───────► LLaMA 70B (Generación de Respuestas)    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Flujo de Datos del Chat (Asistente Blado)

### Interacción y Persistencia
1. El usuario entra a `/chat` y envía un mensaje.
2. `CebarMatePage` realiza un POST a `/api/chat` enviando: `messages` (historial de sesión), `sessionId` (uuid en localStorage) y `topic: 'mate'`.
3. El Endpoint de API `/api/chat` procesa:
   - Determina el perfil del bot según el topic. Para `mate` (Modo Soporte/Intelectual), carga las instrucciones estrictas.
   - Pide la respuesta generada al modelo a través del SDK de Groq.
   - Persiste asíncronamente el mensaje del usuario y la respuesta de Blado en PostgreSQL (Supabase) vía Prisma.
   - Analiza el JSON devuelto por la IA para detectar si es una derivación a soporte (`whatsappReady: true`) o si es charla normal.
4. El cliente recibe la respuesta. Si hay `whatsappReady`, muestra el botón de contacto con el mensaje pre-armado.

---

## Estructura de Archivos del Proyecto

```
Progresos-Academicos/
│
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Entry point. (Home Layout)
│   │   ├── layout.tsx            ← Root layout con fuentes Geist
│   │   ├── globals.css           ← Design tokens + Tailwind v4
│   │   ├── chat/                 ← UI del asistente Blado
│   │   ├── timba/                ← Minijuegos
│   │   ├── biblioteca/           ← Skill Tree
│   │   └── api/
│   │       ├── chat/route.ts     ← Groq integration y Prisma persist
│   │       └── analytics/        ← Tracking endpoints
│   │
│   ├── components/
│   │   ├── home/                 ← Secciones del portfolio
│   │   ├── timba/                ← Componentes de minijuegos
│   │   ├── biblioteca/           ← Componentes del Skill Tree
│   │   ├── Navbar.tsx            ← Barra de navegacion
│   │   └── Sidebar.tsx           ← Panel lateral
│   │
│   └── lib/
│       ├── prisma.ts             ← Prisma client instance
│       ├── AppContext.tsx        ← Estado global
│       └── markdown.ts           ← Parsers de progreso académico
│
├── content/                      ← Archivos .md (Carreras y Filosofía)
├── prisma/                       ← Esquema y migraciones de DB
├── public/                       ← Assets estáticos
└── documentacion/                ← Markdown de arquitectura e issues
```

---

## Dependencias Clave

| Paquete | Versión | Para qué |
|---|---|---|
| `next` | 16.2.6 | Framework |
| `react` | 19.2.4 | UI |
| `prisma` & `@prisma/client` | ^7.8.0 | ORM y cliente DB |
| `@prisma/adapter-pg` | ^7.8.0 | Adaptador PostgreSQL (Transaction Pooler) |
| `groq-sdk` | ^1.1.2 | Chat IA con Blado |
| `framer-motion` | ^12.38.0 | Animaciones UI |
| `react-markdown` | ^10 | Renderizado de Markdown en el Chat |
| `tailwindcss` | ^4 | CSS utilitario |
| `@xyflow/react` | ^12.10.2 | Visualización de nodos en la Biblioteca |

---

## Variables de Entorno Requeridas

```env
# .env.local
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Supabase — Transaction pooler (para serverless Next.js)
DATABASE_URL="postgresql://postgres.[REF]:[PWD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase — Directo (sólo para npx prisma migrate dev)
DIRECT_URL="postgresql://postgres:[PWD]@db.[REF].supabase.co:5432/postgres"
```
