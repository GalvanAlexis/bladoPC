# ISS-059: Hardening de seguridad y calidad de codigo

## Descripcion
Correccion de hallazgos de seguridad y calidad de codigo identificados en auditoria:
bugs criticos (stale closures, array bounds, transacciones), seguridad (CSP, rate limiting, CSRF),
validacion de entrada, y calidad de codigo (tipos, keys, CSS compatibility).

## Archivos a modificar
- src/components/timba/duelo/DuelArena.tsx
- src/lib/duelEngine.ts
- src/app/api/chat/route.ts
- src/app/api/analytics/track/route.ts
- src/app/api/library/route.ts
- src/app/api/library/topic/route.ts
- src/lib/prisma.ts
- src/lib/libraryTypes.ts
- src/lib/markdown.ts
- src/app/chat/page.tsx
- src/components/biblioteca/TopicPage.tsx
- src/components/timba/GameCarousel3D.tsx
- src/lib/constants.ts
- prisma/schema.prisma
- next.config.ts

## Archivos a crear
- src/middleware.ts
- src/lib/rateLimit.ts

## Tareas

### FASE 1 - CRITICAL (bugs runtime)
- [ ] Fix stale closures en DuelArena.tsx (checkWinCondition, handlePlayerResponseSelection)
- [ ] Fix array bounds en duelEngine.ts buildResponseOptions
- [ ] Envolver message.create en prisma.$transaction

### FASE 2 - HIGH (seguridad)
- [ ] Crear rate limiter en lib/rateLimit.ts
- [ ] Crear middleware.ts con security headers
- [ ] Configurar CSP en next.config.ts
- [ ] Agregar rate limiting a api/chat y api/analytics/track
- [ ] Agregar Origin/Referer validation a POST endpoints

### FASE 3 - MEDIUM (validacion)
- [ ] Validar body del chat (messages, sessionId, topic)
- [ ] Sanitizar sessionId (validar UUID)
- [ ] Eliminar topicsFilePath del response API
- [ ] Validar DATABASE_URL + timeouts en prisma.ts
- [ ] Agregar @@index([visitorId]) en ChatSession
- [ ] Status 503 en vez de 200 cuando falta GROQ_API_KEY

### FASE 4 - LOW (calidad)
- [ ] Tipar ChatRequestBody
- [ ] key estable en chat messages
- [ ] Tipar screen.orientation
- [ ] CSS zoom -> transform scale
- [ ] Unificar deteccion mobile (useIsMobile en GameCarousel3D)
- [ ] Extraer WhatsApp number a constants.ts

### FASE 5 - CIERRE
- [ ] npm test
- [ ] npm run build
- [ ] Commit + PR + Merge
- [ ] Engram + Memory + Notion
