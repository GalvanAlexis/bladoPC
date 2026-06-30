# ISS-092: Pagina de ejemplo Web App Interactiva

## Resumen
Crear pagina `/ejemplos/webapp` con vitrina comercial de 10 ejemplos de Web Apps Interactivas, explicando que son y la diferencia con PWA. Conectar el boton "Ver ejemplo" del catalogo al nuevo ejemplo.

## Archivos a modificar

| Archivo | Accion |
|---|---|
| `src/lib/services.tsx` | Agregar `ejemploSlug: 'webapp'` al servicio webapp |
| `src/lib/webapp-ejemplos.tsx` | **CREAR** - Datos de 10 ejemplos + definicion + tabla comparativa PWA |
| `src/app/ejemplos/webapp/page.tsx` | **CREAR** - Pagina vitrina |

## Tareas

- [ ] Crear `src/lib/webapp-ejemplos.tsx` con datos (10 ejemplos, categorias, capacidades)
- [ ] Crear `src/app/ejemplos/webapp/page.tsx` con hero, tabla PWA vs WebApp, grid de ejemplos, guia por rubro y CTA
- [ ] Agregar `ejemploSlug: 'webapp'` al item webapp en services.tsx
- [ ] `npm run build` - verificar build exitoso
- [ ] Commit y PR
