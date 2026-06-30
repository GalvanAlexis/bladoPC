# ISS-090: Pagina de ejemplo PWA - Vitrina comercial de 20 ejemplos

## Resumen
Crear pagina `/ejemplos/pwa` que muestre los 20 ejemplos de PWA del archivo `documentacion/pwa-ejemplos.md` como vitrina comercial para clientes potenciales. Conectar el boton "Ver ejemplo" del catalogo de servicios (PWA) a esta nueva pagina.

## Archivos a modificar

| Archivo | Accion |
|---|---|
| `src/lib/services.tsx` | Agregar `ejemploSlug: 'pwa'` al servicio PWA |
| `src/app/ejemplos/[slug]/page.tsx` | Agregar `pwa` al record `EJEMPLOS` |
| `src/app/ejemplos/pwa/page.tsx` | **CREAR** - Pagina vitrina de 20 ejemplos PWA |

## Tareas

- [ ] Agregar `ejemploSlug: 'pwa'` al item PWA en `services.tsx`
- [ ] Agregar entrada `pwa` en `EJEMPLOS` del router `ejemplos/[slug]/page.tsx`
- [ ] Crear `src/app/ejemplos/pwa/page.tsx` con:
  - Hero section explicando que es una PWA y sus ventajas (instalable, offline, push, camara/GPS)
  - Grid de 20 tarjetas, una por cada ejemplo del documento
  - Cada tarjeta: titulo, descripcion corta, icono representativo
  - Filtro por categoria (productividad, salud, estilo de vida, finanzas, etc.)
  - Seccion "Cual es la ideal para tu negocio?" con guia rapida
  - CTA a WhatsApp al final
- [ ] `npm run build` - verificar build exitoso
- [ ] Commit y PR

## Estructura de la pagina

```
Hero: "PWA - Apps que funcionan como nativas sin pasar por las tiendas"
  -> Que es una PWA? (3 ventajas clave: instalable, offline, hardware)
  -> Estadistica: +68% de retencion vs web mobile tradicional

Categorias con filtro:
  - Productividad (Taskio, GrocMate, BudgetBee, Stash)
  - Salud y Bienestar (FitMin, MedTime, PlantPal, FlexGym, Pollen)
  - Estilo de Vida (RecetApp, PackPal, PocketReader, Shelfie, CinePop)
  - Finanzas y Datos (CoinFolio, BudgetBee, QuickScan)
  - Educacion y Creatividad (Glot, JamPad, PocketReader)
  - Utilidades (VoteHub, QuickScan, Stash)

Grid de 20 tarjetas expandibles:
  - Icono + titulo
  - Descripcion de 2-3 lineas
  - Tags de capacidades PWA que demuestra (offline, push, camara, GPS, etc.)

Guia rapida: "Cual PWA es ideal para tu rubro?"
  - Tabla: Rubro -> Tipo de PWA recomendada

CTA Final: "Arranquemos tu PWA" -> WhatsApp
```

## Notas
- No es una PWA funcional, es una pagina explicativa/comercial
- Sigue el patron de diseno de las otras paginas de ejemplo (sin AppShell)
- Los 20 ejemplos se cargan desde un archivo de datos separado en `src/lib/pwa-ejemplos.ts`
