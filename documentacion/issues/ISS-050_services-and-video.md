# ISS-050: Nueva Sección de Servicios y Video Hero

## Contexto
El usuario quiere dar un vuelco a la página principal del portfolio. Ahora, el Hero debe presentar una propuesta de valor humorística y directa basada en un video de un hombre golpeando el monitor. Además, se añade un enfoque más marcado a la venta de tres servicios principales:
1. Reparación de PC a nivel componente.
2. Automatizaciones y soluciones digitales para pymes y emprendedores.
3. Ciencia de Datos y Optimización con IA.

## Requerimientos Técnicos
- **HeroSection:**
  - Añadir `<video>` reproduciendo en loop `bad-day.mp4`.
  - Capa overlay para no sacrificar legibilidad.
  - Headline: "¿La PC no anda bien?"
  - Sub-headline: "Contactá con Blado para una solución sin vueltas!"
- **ServicesSection:**
  - Componente nuevo para listar los servicios.
  - Diseño moderno usando scroll-driven animations (`.reveal`).
- **Navegación:**
  - Nuevo ancla en `Navbar.tsx` para `#servicios`.

## Implementación
- Se creará `ServicesSection.tsx` en `src/components/home/`.
- Se modificarán `HeroSection.tsx`, `HomeLayout.tsx` y `Navbar.tsx`.
- Se actualizarán tests si se rompen.
