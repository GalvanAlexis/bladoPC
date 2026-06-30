# ISS-094: Ejemplo Marketplace "Profesional a Domicilio"

## Resumen
Crear demo funcional de marketplace/directorio de profesionales freelance llamado "Profesional a Domicilio". Los profesionales publican su perfil y servicios; los clientes buscan, filtran y contactan directo por WhatsApp.

## Arquitectura

```
src/
  lib/
    marketplace-data.ts      -> Datos mock de 15-20 profesionales
  app/
    ejemplos/
      marketplace/
        page.tsx             -> Home: hero + categorias + listado con filtros
        [slug]/
          page.tsx           -> Perfil del profesional
```

## Features

### Home (`/ejemplos/marketplace`)
- Hero: "Encontra el profesional que necesitas en tu zona"
- Grid de categorias con iconos + contador de profesionales
- Barra de busqueda por nombre o rubro
- Filtro por categoria + ordenar por rating
- Grid de tarjetas de profesionales: foto, nombre, rubro, ubicacion, rating, precio estimado
- CTA "Publica tu servicio" (simulado, llevaria a WhatsApp)

### Perfil del profesional (`/ejemplos/marketplace/[slug]`)
- Header: foto grande, nombre, rubro, ubicacion, rating
- Bio / descripcion
- Servicios que ofrece con precios estimados
- Experiencia y formacion
- Resenas de clientes (mock)
- Boton "Contactar por WhatsApp" con mensaje pre-hecho

### Datos mock (15-20 profesionales)
Categorias:
- Construccion y Reparaciones (albanil, pintor, plomero, gasista, electricista, cerrajero)
- Profesionales (abogado, contador, veterinario)
- Tecnologia y Diseno (desarrollador web, disenador grafico, fotografo)
- Hogar y Jardin (jardinero, mecanico a domicilio, limpieza)
- Educacion y Salud (profe particular, entrenador personal, nutricionista)

Cada profesional: nombre, foto (placeholder), rubro, ubicacion (Chascomus), bio, servicios con precios, rating, resenas, disponibilidad, telefono, email.

## Archivos a modificar

| Archivo | Accion |
|---|---|
| `src/lib/services.tsx` | Agregar `ejemploSlug: 'marketplace'` al servicio marketplace |
| `src/lib/marketplace-data.ts` | **CREAR** - Datos mock + tipos |
| `src/app/ejemplos/marketplace/page.tsx` | **CREAR** - Home con categorias y listado |
| `src/app/ejemplos/marketplace/[slug]/page.tsx` | **CREAR** - Perfil del profesional |

## Tareas

- [ ] Crear `src/lib/marketplace-data.ts` con tipos y 15-20 profesionales mock
- [ ] Crear `src/app/ejemplos/marketplace/page.tsx` con hero, categorias, busqueda y listado
- [ ] Crear `src/app/ejemplos/marketplace/[slug]/page.tsx` con perfil completo
- [ ] Agregar `ejemploSlug: 'marketplace'` al servicio marketplace en services.tsx
- [ ] `npm run build` - verificar build exitoso
- [ ] Commit y PR

## Notas
- Sin backend: datos mock en archivo TS
- Sin autenticacion: demo visual funcional
- Contacto via WhatsApp con mensaje pre-armado segun el profesional
- Sigue el mismo patron que delivery, blog y contable (funcional, no vitrina)
