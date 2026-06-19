# ISS-070: Ejemplo corporativo — Despacho Contable M&A

## Resumen
Crear pagina `/ejemplos/contable` que simule un sitio web corporativo de un despacho contable (Estudio Contable M&A). Funciona como ejemplo vivo para el item "Corporativa / Institucional" del catalogo de servicios (web#2). Sigue el mismo patron que Lumina para web#1 (landing).

## Archivos a modificar
- `src/lib/services.tsx` — agregar `ejemploSlug: 'contable'` y un `examples[]` al item `corporativa`
- `src/app/ejemplos/[slug]/page.tsx` — agregar entrada `contable` a `EJEMPLOS` y agregar la pagina completa inline

## Especificacion visual

### Identidad
- **Nombre ficticio:** Estudio Contable M&A (Martinez & Asociados)
- **Paleta:** Granate `#7a1a1a` primario, gris calido `#f5f3f0` fondo, texto `#1a1a1a`
- **Tono:** Profesional, serio, de confianza

### Secciones

1. **Navbar:** Logo "M&A" estilizado, links (Inicio, Servicios, Nosotros, Recursos, Contacto)
2. **Hero:** Headline "Soluciones contables que impulsan tu negocio", subhead, CTA "Solicitar asesoria gratuita", fondo con overlay granate
3. **Confianza:** 3 metricas: "+12 anos", "+350 clientes activos", "+2000 declaraciones anuales"
4. **Servicios:** 6 tarjetas con icono, titulo, descripcion y publico objetivo:
   - Liquidacion de Sueldos
   - Impuestos (IVA/Ganancias/BBPP)
   - Contabilidad General
   - Monotributo
   - Sociedades y Empresas
   - Auditoria y Balances
5. **Por que elegirnos:** 4 diferenciales (Respuesta rapida, Atencion personalizada, Precios claros, Plataforma online)
6. **Equipo:** 3 fichas con foto generica, nombre, cargo y especialidad
7. **Recursos/Blog:** 2 cards de articulos ficticios (Guia Monotributo 2026, Calendario vencimientos)
8. **Contacto:** Formulario + datos (direccion, tel, email, horarios)
9. **Footer:** Logo, links, copyright

## Tareas
- [ ] Crear spec ISS-070
- [ ] Consultar modern-web-guidance para patrones de UI corporativa
- [ ] Crear branch feature/ISS-070-ejemplo-contable
- [ ] Implementar las 9 secciones en /ejemplos/contable inline en [slug]/page.tsx
- [ ] Actualizar services.tsx con ejemploSlug y examples
- [ ] npm test
- [ ] npm run build
- [ ] Commit + PR + Merge + Engram
