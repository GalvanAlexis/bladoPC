# ISS-066: Contenido real para pagina /servicios/landing

## Resumen
Reemplazar el placeholder de la pagina `/servicios/landing` con contenido real: proyecto destacado "Lumina" (serum facial natural), proceso de trabajo, checklist de entregables y CTA final.

## Cambios
- `src/lib/services.tsx` -- agregar `examples` al item `landing`
- `src/app/servicios/[slug]/page.tsx` -- reemplazar placeholder con secciones reales
- `src/app/globals.css` -- estilos adicionales si son necesarios

## Detalle del contenido
1. **Proyecto destacado**: Landing page del producto cosmetico "Lumina" (serum facial natural). Resultados: 12% conversion rate, 340 unidades vendidas en el primer mes.
2. **Como trabajamos**: 4 pasos (Brief -> Wireframe -> Diseno+Dev -> Deploy)
3. **Que incluye**: Checklist de entregables (responsive, formulario, SEO, performance, analytics, hosting)
4. **CTA**: Boton "Contame de tu proyecto" link a contacto

## QA
- `npm test` debe pasar
- `npm run build` debe compilar sin errores
- Las 13 rutas `/servicios/{slug}` deben pre-renderizarse correctamente
