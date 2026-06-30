# ISS-091: Enlace externo para ejemplo del servicio Portal

## Resumen
El boton "Ver ejemplo" del servicio Portal/Intranet debe enlazar a `https://bts-arg.vercel.app/` (BTS fan portal real) en vez de una ruta interna. Se agrega soporte de `ejemploUrl` en el tipo `ServiceItem` para permitir enlaces externos.

## Archivos a modificar

| Archivo | Accion |
|---|---|
| `src/lib/services.tsx` | Agregar `ejemploUrl?: string` a `ServiceItem` y asignarlo al servicio `portal` |
| `src/components/servicios/ServiciosCatalogo.tsx` | Modificar el boton "Ver ejemplo" para usar `ejemploUrl` (link externo) cuando exista |

## Tareas

- [ ] Agregar `ejemploUrl` al tipo `ServiceItem` en services.tsx
- [ ] Asignar `ejemploUrl: 'https://bts-arg.vercel.app/'` al servicio `portal`
- [ ] Modificar ServiciosCatalogo.tsx: si `ejemploUrl` existe, renderizar `<a>` externo; si no, usar `ejemploSlug` o fallback
- [ ] `npm run build` - verificar build exitoso
- [ ] Commit y PR
