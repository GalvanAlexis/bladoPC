# ISS-088: Indexacion, presencia local y autoridad inicial

## Resumen
El sitio no aparece en Google por 3 problemas: no esta indexado, no tiene autoridad (backlinks), y no existe en los canales locales. Este ISS resuelve la indexacion y crea la base de presencia local.

## Archivos nuevos
- src/app/sitemap.ts
- src/app/robots.ts

## Tareas

### Archivos creados
- `src/app/sitemap.ts` -> genera `/sitemap.xml` con 20 URLs estaticas
- `src/app/robots.ts` -> genera `/robots.txt` con Allow /, Disallow /api/

### 1. Sitemap.xml
- [x] Crear src/app/sitemap.ts que genere sitemap.xml con todas las rutas estaticas
- [x] Frecuencias: home diaria, servicios semanal, ejemplos mensual
- [x] Prioridades: home 1.0, servicios 0.9, ejemplos 0.7, chat 0.5

### 2. Robots.txt
- [x] Crear src/app/robots.ts con referencia al sitemap
- [x] Allow all crawlers
- [x] Referencia a sitemap: https://bladopc.vercel.app/sitemap.xml
- [x] Disallow rutas de API (/api/)

### 3. Search Console - Solicitar indexacion (MANUAL)
- [ ] Ir a https://search.google.com/search-console -> Sitemaps -> ingresar `sitemap.xml` -> enviar
- [ ] Ir a URL Inspection -> pegar `https://bladopc.vercel.app/` -> "Solicitar indexacion"
- [ ] Repetir con `/chat`, `/servicios`, `/servicios/landing`

### 4. Google Business Profile (MANUAL)
- [ ] Ir a https://google.com/business -> crear ficha
- [ ] Nombre: "BladoPC - Servicios IT" o "Blado - Alexis Galvan"
- [ ] Categoria principal: "Desarrollador web" o "Servicios informaticos"
- [ ] Direccion: Chascomus, Buenos Aires (si atendes presencial)
- [ ] Sino, marcar "Servicio a domicilio" y definir area: Chascomus
- [ ] Telefono: +54 2241 567142
- [ ] Sitio web: https://bladopc.vercel.app
- [ ] Horario de atencion
- [ IMPORTANTE: Es el factor #1 para aparecer en "desarrollador web Chascomus" ]

### 5. Perfiles en plataformas (MANUAL)
- [ ] LinkedIn: actualizar perfil con link a bladopc.vercel.app en la seccion "Contact info" y "Website"
- [ ] GitHub: editar profile README y agregar link a bladopc.vercel.app
- [ ] WhatsApp Business: configurar perfil con link al portfolio
- [ ] Marketplace / plataformas locales de Chascomus si existen (ej: grupos de Facebook, MercadoLibre servicios)

### 6. Canonical fix (verificado)
- [x] layout.tsx tiene alternates.canonical correcto
- [x] metadataBase apunta a https://bladopc.vercel.app

### 7. Proximo paso recomendado (ISS-089)
- Crear pagina dedicada de servicios con contenido SEO profundo
- Blog o seccion de casos de exito para generar contenido indexable
- Estrategia de backlinks a mediano plazo

## QA
- [x] npm run build exitoso
- [x] npm test 13/13 pass
- [x] Verificar que https://bladopc.vercel.app/sitemap.xml exista y sea valido
- [x] Verificar que https://bladopc.vercel.app/robots.txt exista

## Branch
feature/ISS-088-indexacion-presencia-local
