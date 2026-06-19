# ISS-074: Ejemplo Magazine Digital / CMS - Vortex Magazine

## Resumen
Crear el ejemplo vivo para el item "Blog / CMS" (#3) del catalogo de servicios.
Simula un medio digital moderno (Vortex Magazine) con homepage, articulos individuales
y panel de admin simulado. Sigue el patron de web#1 (Lumina) y web#2 (M&A Contable).

## Archivos a modificar
- `src/lib/services.tsx` - agregar `ejemploSlug: 'blog'` y `examples[]` al item `blog`
- `src/app/ejemplos/[slug]/page.tsx` - agregar entrada `'blog'` en EJEMPLOS

## Archivos a crear
- `src/app/ejemplos/blog/page.tsx` - Home del magazine
- `src/app/ejemplos/blog/[postId]/page.tsx` - Articulo individual
- `src/app/ejemplos/blog/admin/page.tsx` - Admin panel (login + dashboard + CRUD simulado)

## Tareas

### FASE 1 - Preparacion
- [ ] Agregar ejemploSlug y examples al item blog en services.tsx
- [ ] Agregar entrada 'blog' en EJEMPLOS y generateStaticParams en [slug]/page.tsx

### FASE 2 - Home del magazine (blog/page.tsx)
- [ ] Top bar con categorias + search popover
- [ ] Hero con featured post
- [ ] Grid de posts (6-8 cards, 3 columnas)
- [ ] Sidebar (posts populares, categorias cloud, tags)
- [ ] Newsletter CTA
- [ ] Footer 4 columnas
- [ ] Dark mode toggle
- [ ] Sticky header hide on scroll

### FASE 3 - Articulo individual ([postId]/page.tsx)
- [ ] Scroll progress bar
- [ ] Hero con imagen de portada
- [ ] Breadcrumb + tipografia de lectura
- [ ] Autor box + metadata
- [ ] Compartir dialog (HTML dialog)
- [ ] Posts relacionados

### FASE 4 - Admin panel (admin/page.tsx)
- [ ] Login simulado (formulario no funcional)
- [ ] Dashboard con 4 stat cards
- [ ] Tabla de posts con estados (published/draft)
- [ ] Modal crear/editar post con dialog

### FASE 5 - Interactividad nativa
- [ ] Dark mode toggle con CSS custom properties
- [ ] Sticky header con hide on scroll down
- [ ] Featured carrusel con scroll horizontal nativo
- [ ] prefers-reduced-motion respetado en animaciones
- [ ] ARIA attributes en dialog, popover

### FASE 6 - Quality Gates
- [ ] npm test
- [ ] npm run build

### FASE 7 - CIERRE
- [ ] Commit + PR + Merge + Engram
