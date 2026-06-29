# ISS-084: Meta tags, JSON-LD structured data & Open Graph

## Resumen
Implementar meta tags semanticos, JSON-LD structured data (Person, LocalBusiness, WebSite) y Open Graph en el root layout y home page para mejorar la comprension semantica por parte de Google y AI Agents.

## Archivos a modificar
- src/app/layout.tsx
- src/app/page.tsx
- next.config.ts (si se requiere generateMetadata estatica)

## Archivos nuevos
- src/lib/structured-data.ts (funciones para generar JSON-LD)

## Tareas

### Meta tags (layout.tsx)
- [ ] Agregar `metadataBase` con URL canonica del sitio
- [ ] Expandir `title` con patron: "Alexis Galvan | Desarrollador Full-Stack en Chascomus | BladoPC"
- [ ] Agregar `description` rica en topicos: "Portfolio de Alexis Galvan, desarrollador Full-Stack, Data Scientist y lider tecnico en Chascomus, Buenos Aires. Desarrollo web, automatizaciones con IA y ciencia de datos."
- [ ] Agregar `keywords` con terminos estrategicos: "desarrollador web Chascomus, desarrollo web Argentina, automatizaciones IA, ciencia de datos, Next.js, React, full-stack developer, Python, Django"
- [ ] Agregar `robots` index, follow
- [ ] Agregar `alternates` canonical
- [ ] Agregar `openGraph` completo: type website, locale es_AR, determiner, siteName "BladoPC - Alexis Galvan"
- [ ] Agregar `twitter` card: summary_large_image, creator @, site @
- [ ] Agregar `other` con Google Site Verification tag (placeholder)

### JSON-LD structured data (nuevo archivo lib/structured-data.ts)
- [ ] Crear funcion `personSchema()`: devuelve JSON-LD @type Person con:
  - name: "Alexis Galvan"
  - givenName: "Alexis", familyName: "Galvan"
  - description: "Desarrollador Full-Stack y Data Scientist basado en Chascomus"
  - url: sitio web
  - sameAs: [GitHub, LinkedIn, email]
  - knowsAbout: ["Next.js", "React", "Python", "TypeScript", "PostgreSQL", "Machine Learning", "Node.js", "Go"]
  - worksFor / affiliation
- [ ] Crear funcion `localBusinessSchema()`: JSON-LD @type LocalBusiness:
  - name: "BladoPC - Alexis Galvan"
  - description: "Servicios de desarrollo web, automatizaciones y ciencia de datos"
  - url: sitio web
  - address: { @type: PostalAddress, addressLocality: "Chascomus", addressRegion: "Buenos Aires", addressCountry: "AR" }
  - telephone: +54 2241 567142
  - email: alexisvladimirgalvan@gmail.com
  - areaServed: ["Chascomus", "Buenos Aires", "Argentina", "Remoto"]
  - priceRange: "$$"
  - hasOfferCatalog con servicios ofrecidos
- [ ] Crear funcion `websiteSchema()`: JSON-LD @type WebSite:
  - name: "BladoPC - Alexis Galvan"
  - url: sitio web
  - description (misma que meta)
  - inLanguage: "es-AR"
- [ ] Crear funcion `breadcrumbListSchema()`: JSON-LD @type BreadcrumbList
- [ ] Crear funcion `allStructuredData()` que combina todos los schemas en un array @graph

### Integracion en layout.tsx
- [ ] Importar `allStructuredData` en layout.tsx
- [ ] Agregar `<script type="application/ld+json">` en el head con JSON.stringify del schema
- [ ] Verificar que el JSON-LD se renderice correctamente en SSR (Server Component)

### Open Graph especifico por pagina
- [ ] En page.tsx, exportar metadata especifica para el home:
  - og:title: "Alexis Galvan | Desarrollador Full-Stack en Chascomus"
  - og:description: rica y convincente
  - og:image: url de screenshot del portfolio o imagen de marca
  - og:url: canonical

### QA y verificacion
- [ ] npm test
- [ ] npm run build
- [ ] Verificar con herramienta Rich Results Test de Google que el JSON-LD sea valido
- [ ] Verificar preview de Open Graph en opengraph.xyz

## Branch
`feature/ISS-084-meta-jsonld-opengraph`
