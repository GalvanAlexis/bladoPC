# ISS-065: Paginas individuales de servicios

## Descripcion
Agregar una pagina individual por cada tipo de servicio del catalogo, accesible via `/servicios/{slug}`. Cada pagina muestra los datos del servicio (titulo, descripcion, complejidad, publico ideal) con un placeholder "proximamente" para el contenido de ejemplo. Se agrega un boton "Ver ejemplo" en cada card del catalogo que navega a la pagina correspondiente.

## Archivos nuevos
- src/lib/services.ts — Array CATALOGO extraido a modulo compartido
- src/app/servicios/[slug]/page.tsx — Dynamic route para paginas individuales

## Archivos modificados
- src/components/servicios/ServiciosCatalogo.tsx — Importar desde services.ts + boton "Ver ejemplo"

## Tareas

### FASE 1 — Extraer datos a shared lib
- [x] Crear src/lib/services.ts con el array CATALOGO tipado
- [x] Actualizar ServiciosCatalogo.tsx para importar desde ahi

### FASE 2 — Dynamic route [slug]
- [x] Crear src/app/servicios/[slug]/page.tsx
- [x] Buscar servicio por slug y renderizar placeholder
- [x] Incluir boton "Volver al catalogo"

### FASE 3 — Boton "Ver ejemplo"
- [x] Agregar boton en la seccion expandida de cada card
- [x] Link a /servicios/{svc.id} con stopPropagation

### FASE 4 — Quality Gates
- [x] lint: 0 errores
- [x] build: compilacion exitosa

### FASE 5 — CIERRE
- [x] Commit + branch + PR + merge a master
