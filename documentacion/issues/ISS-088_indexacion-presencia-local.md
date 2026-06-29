# ISS-088: Indexacion, presencia local y autoridad inicial

## Resumen
El sitio no aparece en Google por 3 problemas: no esta indexado, no tiene autoridad (backlinks), y no existe en los canales locales. Este ISS resuelve la indexacion y crea la base de presencia local.

## Archivos nuevos
- src/app/sitemap.ts
- src/app/robots.ts

## Tareas

### 1. Sitemap.xml
- [ ] Crear src/app/sitemap.ts que genere sitemap.xml con todas las rutas estaticas: /, /chat, /servicios, /servicios/[slug], /ejemplos/[slug]
- [ ] Frecuencias: home diaria, servicios semanal, ejemplos mensual
- [ ] Prioridades: home 1.0, servicios 0.9, ejemplos 0.7, chat 0.5

### 2. Robots.txt
- [ ] Crear src/app/robots.ts con referencia al sitemap
- [ ] Allow all crawlers
- [ ] Referencia a sitemap: https://bladopc.vercel.app/sitemap.xml
- [ ] Disallow rutas de API (/api/)

### 3. Search Console - Solicitar indexacion
- [ ] Enviar sitemap.xml desde Search Console
- [ ] Solicitar indexacion manual de la URL principal via URL Inspection tool
- [ ] (Esto lo hace Blado manualmente desde la UI de Search Console)

### 4. Google Business Profile
- [ ] Crear ficha en Google Business Profile (Blado - Servicios IT)
- [ ] Datos: categoria "Desarrollador web", Chascomus, telefono, web, horario
- [ ] Esto es MANUAL - Blado debe crearlo desde google.com/business

### 5. Perfiles en plataformas (backlinks iniciales)
- [ ] Crear perfil en LinkedIn completo con link a bladopc.vercel.app
- [ ] Crear perfil en GitHub profile con link a bladopc.vercel.app
- [ ] Crear perfil en Behance / Dribbble si aplica
- [ ] (Blado lo hace manual, NO es codigo)

### 6. Canonical fix
- [ ] Verificar que layout.tsx tenga alternates.canonical correcto (ya esta desde ISS-084)
- [ ] Verificar que metadataBase apunte a https://bladopc.vercel.app (ya esta)

## QA
- [ ] npm run build (solo si hay cambios de codigo)
- [ ] Verificar que https://bladopc.vercel.app/sitemap.xml exista y sea valido
- [ ] Verificar que https://bladopc.vercel.app/robots.txt exista

## Branch
feature/ISS-088-indexacion-presencia-local
