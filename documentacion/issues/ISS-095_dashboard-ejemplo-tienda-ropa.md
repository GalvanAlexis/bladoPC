# ISS-095: Dashboard premium "Atelier" — Tienda de ropa

## Objetivo
Crear pagina de ejemplo `/ejemplos/dashboard` con un dashboard premium interactivo de una tienda de ropa ficticia llamada "Atelier", usando Recharts para graficos. Los datos deben ser logicos y coherentes con temporadas reales (Enero-Junio 2026).

## Datos ficticios
- Tienda: "Atelier" — indumentaria femenina y masculina
- Periodo: Enero a Junio 2026 (6 meses)
- Categorias: Remeras, Jeans, Vestidos, Abrigos, Calzado
- Coherencia estacional: remeras/vestidos pico en verano, abrigos en invierno

## Metricas y KPIs
- Ingresos totales: ~$304,000 en 6 meses
- Pedidos totales: ~5,850
- Ticket promedio: ~$52
- Crecimiento vs periodo anterior: +18%

## Charts (Recharts)
1. LineChart — ventas mensuales (6 meses)
2. BarChart — ventas por categoria (acumulado)
3. PieChart — distribucion por region (BS AS 42%, CABA 22%, Cordoba 15%, etc.)
4. BarChart — ventas por dia de la semana
5. Top 5 productos — tabla/barras horizontales
6. LineChart — proyeccion Julio-Diciembre (dashed line)

## Recomendaciones IA
5 insights predictivos basados en los datos:
1. Aumentar stock de abrigos 35% para julio
2. Newsletter los lunes con descuento express
3. Campana coleccion de verano desde octubre
4. Upsell de accesorios en checkout
5. Expandir puntos de entrega en Buenos Aires

## Archivos
- `src/lib/dashboard-data.ts` — datos completos
- `src/app/ejemplos/dashboard/page.tsx` — dashboard page
- `src/lib/services.tsx` — agregar `ejemploSlug: 'dashboard'`
- `src/app/servicios/[slug]/page.tsx` — excluir dashboard de generateStaticParams

## Dependencias
- `npm install recharts`

## Diseno
- Fondo oscuro con glassmorphism
- Paleta: slate + indigo + rose gold
- Cards con borde sutil, sombras y backdrop-filter
- Animaciones de entrada en KPIs
