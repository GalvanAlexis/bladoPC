# ISS-093: Inyectar catalogo de servicios en el contexto del chat Blado

## Resumen
El chat de IA (Blado) no tiene conocimiento del catalogo de servicios ni de los ejemplos de trabajo. Al preguntarle "que servicios ofreces?" o "necesito una web", responde generico sin detalle. Se debe inyectar el catalogo completo en el system prompt para que pueda orientar al usuario y redirigir a WhatsApp con contexto especifico.

## Archivos a modificar

| Archivo | Accion |
|---|---|
| `src/app/api/chat/route.ts` | Importar CATALOGO, generar resumen textual e inyectar en system prompt |

## Tareas

- [ ] Importar `CATALOGO` de `@/lib/services` en route.ts
- [ ] Generar resumen textual del catalogo con titulo, descripcion, ejemplos y enlaces
- [ ] Agregar seccion "CATALOGO DE SERVICIOS" en el system prompt, detallando los 13 servicios
- [ ] Actualizar la seccion "DESARROLLO SOFTWARE" del modo soporte para que use el catalogo
- [ ] `npm run build` - verificar build exitoso
- [ ] Commit y PR
