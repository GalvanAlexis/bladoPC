# ISS-068: Mantenimiento general y limpieza de legacy

## Resumen
Auditoria completa del codigo fuente para eliminar codigo muerto, imports sin usar, referencias legacy, configuraciones obsoletas y dependencias no utilizadas. Dejar el proyecto limpio antes del deploy.

## Hallazgos de auditoria

### P0 — DEAD CODE (eliminar)
- [x] `src/hooks/useIsMobile.ts` — hook huerfano, no referenciado por ningun componente
- [ ] `src/lib/markdownRenderer.tsx` — componente huerfano, no importado en ningun lado
- [ ] `src/app/api/chat/route.ts` — ramas muertas: prompt RPG diablillo (lines 117-151), topic projects/theory nunca enviados
- [ ] `src/app/globals.css` — CSS muerto: `.react-flow*`, `@keyframes intro-scroll`, `@keyframes option-in`/`.response-option`, `.project-card`
- [ ] `output.html` — artifacto de build, eliminar y agregar a .gitignore

### P1 — LEGACY Y CONFIG
- [ ] `package.json` — name: "progresos-academicos" -> "bladopc"
- [ ] `src/app/chat/page.tsx` — renombrar funcion `CebarMatePage` -> `ChatPage`; topic 'mate' hardcodeado
- [ ] `src/lib/AppContext.tsx` — eliminar `particlesEnabled`/`setParticlesEnabled` (nunca consumido)
- [ ] `src/components/home/HomeLayout.tsx` — comentario "antes estaban en GameEngine" legacy
- [ ] `src/components/Sidebar.tsx` + `src/components/home/HomeLayout.tsx` — URLs legacy a Progresos-Academicos
- [ ] `src/__tests__/components/Sidebar.test.tsx` — URL legacy en test
- [ ] `src/app/servicios/[slug]/page.tsx` — WhatsApp number hardcodeado distinto a WHATSAPP_NUMBER en constants
- [ ] `next.config.ts` — headers() duplican CSP que ya esta en middleware.ts

### P2 — CALIDAD Y ESTILO
- [ ] `src/app/globals.css` — `.dialog-scrollbar` definido pero no usado; `custom-scrollbar` usado pero no definido (chat/page.tsx)
- [ ] `src/app/api/chat/route.ts` — imports: `getGithubProjectsContext` y `getFullContextString` solo llamados en rama muerta
- [ ] `src/app/chat/page.tsx` — emojis en codigo
- [ ] `src/middleware.ts` — deprecation warning: rename to proxy.ts
- [ ] `prisma.config.ts` — `import "dotenv/config"` redundante (Next.js ya carga .env)
- [ ] `src/components/AppShell.tsx` — emoji en aviso de privacidad
- [ ] `src/components/home/HomeLayout.tsx` — year hardcodeado 2025
- [ ] `src/lib/constants.ts` — emojis
- [ ] `src/app/globals.css` — clases utilitarias definidas y no usadas directamente (.accent, .accent-bg, etc.)

## QA
- `npm test` debe pasar
- `npm run build` debe compilar sin errores
- `git status` debe quedar limpio

## Branch
`feature/ISS-068-mantenimiento-general`
