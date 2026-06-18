# ISS-064: Eliminar juegos y biblioteca del proyecto

## Descripcion
Remover los modulos de juegos (Timba + Duelo Golpes Bajos) y Biblioteca (progreso academico) del portfolio. Se eliminan ~34 archivos de componentes, paginas, APIs, librerias y tests asociados a estas funcionalidades. Se modifican 4 archivos existentes para remover referencias.

## Archivos eliminados

### Juegos (Timba + Duelo)
- src/app/timba/page.tsx
- src/app/timba/duelo-golpes-bajos/page.tsx
- src/components/timba/ (18 componentes, incluyendo duelo/ con 12 subcomponentes)
- src/lib/games.ts, duelEngine.ts, duelInsults.ts, duelStorage.ts, avatarConfig.ts
- src/__tests__/lib/duelEngine.test.ts
- public/games/placeholder.svg

### Biblioteca
- src/app/biblioteca/page.tsx
- src/app/api/library/route.ts, topic/route.ts
- src/components/biblioteca/ (8 componentes)
- src/lib/libraryTypes.ts
- src/hooks/useLibraryData.ts
- src/__tests__/lib/libraryParser.test.ts

## Archivos modificados
- src/components/Navbar.tsx — remover links a Timba y Biblioteca
- src/middleware.ts — remover games/ del matcher regex
- src/app/globals.css — remover ~150 lineas de animaciones de duelo
- src/app/api/chat/route.ts — actualizar system prompt (cueva/biblioteca arcana -> espacio arcano)
- src/lib/markdown.ts — remover funciones exclusivas de biblioteca (getLibraryData, getTopicContent), conservar las del chat (getFullContextString, getFilosofiaContextString)

## Archivos conservados
- src/lib/markdown.ts — funciones de contexto para el chat
- src/lib/markdownRenderer.tsx — renderer markdown (sin dependencias rotas)

## Tareas

### FASE 1 - Eliminar archivos de juegos
- [x] Eliminar src/app/timba/ (2 paginas)
- [x] Eliminar src/components/timba/ (18 componentes)
- [x] Eliminar src/lib/* juegos (5 archivos)
- [x] Eliminar test de duelEngine
- [x] Eliminar public/games/

### FASE 2 - Eliminar archivos de biblioteca
- [x] Eliminar src/app/biblioteca/ y src/app/api/library/
- [x] Eliminar src/components/biblioteca/ (8 componentes)
- [x] Eliminar src/lib/libraryTypes.ts
- [x] Eliminar src/hooks/useLibraryData.ts
- [x] Eliminar test de libraryParser

### FASE 3 - Modificar archivos existentes
- [x] Navbar.tsx — remover NAV_LINKS de timba y biblioteca
- [x] middleware.ts — remover games/ del regex
- [x] globals.css — remover animaciones de duelo
- [x] api/chat/route.ts — actualizar system prompt
- [x] markdown.ts — limpiar funciones de biblioteca

### FASE 4 - Quality Gates
- [x] lint: 0 errores
- [x] test: 16/16 pasando
- [x] build: compilacion exitosa
- Rutas activas: /, /chat, /servicios, /api/chat, /api/analytics/track
