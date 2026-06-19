# ISS-068: Mantenimiento general y limpieza de legacy

## Resumen
Auditoria completa del codigo fuente para eliminar codigo muerto, imports sin usar, referencias legacy, configuraciones obsoletas y dependencias no utilizadas. Dejar el proyecto limpio antes del deploy.

## Hallazgos de auditoria

### P0 — DEAD CODE (eliminado)
- [x] `src/hooks/useIsMobile.ts` — hook huerfano, no referenciado por ningun componente
- [x] `src/lib/markdownRenderer.tsx` — componente huerfano, no importado en ningun lado
- [x] `src/app/api/chat/route.ts` — ramas muertas: prompt RPG diablillo (lines 117-151), topic projects/theory nunca enviados
- [x] `src/app/globals.css` — CSS muerto: `.react-flow*`, `@keyframes intro-scroll`, `@keyframes option-in`/`.response-option`, `.project-card`
- [x] `output.html` — artifacto de build, eliminar y agregar a .gitignore

### P1 — LEGACY Y CONFIG
- [x] `package.json` — name: "progresos-academicos" -> "bladopc"
- [x] `src/app/chat/page.tsx` — renombrar funcion `CebarMatePage` -> `ChatPage`; topic 'mate' hardcodeado
- [x] `src/lib/AppContext.tsx` — eliminar `particlesEnabled`/`setParticlesEnabled` (nunca consumido)
- [x] `src/components/home/HomeLayout.tsx` — comentario "antes estaban en GameEngine" legacy
- [x] `src/components/Sidebar.tsx` + `src/components/home/HomeLayout.tsx` — URLs legacy a Progresos-Academicos
- [x] `src/__tests__/components/Sidebar.test.tsx` — URL legacy en test
- [x] `src/app/servicios/[slug]/page.tsx` — WhatsApp number hardcodeado distinto a WHATSAPP_NUMBER en constants
- [x] `next.config.ts` — headers() duplican CSP que ya esta en middleware.ts

### P2 — CALIDAD Y ESTILO
- [x] `src/app/globals.css` — `.dialog-scrollbar` -> `custom-scrollbar` unificado
- [x] `src/app/api/chat/route.ts` — imports: `getGithubProjectsContext` y `getFullContextString` solo llamados en rama muerta
- [x] `src/middleware.ts` -> `src/proxy.ts` — deprecation warning corregido
- [x] `prisma.config.ts` — `import "dotenv/config"` redundante removido
- [x] `src/components/home/HomeLayout.tsx` — year hardcodeado 2025 -> dinamico

## QA
- `npm test` debe pasar
- `npm run build` debe compilar sin errores
- `git status` debe quedar limpio

## Branch
`feature/ISS-068-mantenimiento-general`
