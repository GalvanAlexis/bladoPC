# ISS-001 — Setup Next.js App Router + TypeScript + Tailwind

**Estado:** ✅ CLOSED  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `setup`, `config`  
**Fecha de cierre:** 2026-05-08  

---

## Descripción

Inicialización del proyecto Blado_Cavern como una aplicación Next.js moderna con el stack completo.

## Lo que se hizo

- `npx create-next-app` con App Router, TypeScript y Tailwind CSS v4
- Configuración del `next.config.ts`
- Setup de `tsconfig.json` con paths alias (`@/` apuntando a `src/`)
- Instalación de dependencias principales: `framer-motion`, `@xyflow/react`, `groq-sdk`, `gray-matter`, `lucide-react`

## Archivos involucrados

- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `eslint.config.mjs`

## Criterios de aceptación cumplidos

- [x] `npm run dev` arranca sin errores
- [x] TypeScript configurado con strict mode
- [x] Tailwind v4 operativo con `@theme inline`
- [x] Alias `@/` funciona en imports
