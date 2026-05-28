# ISS-027: Scroll en Respuestas Largas de Blado

## Descripción
Cuando Blado genera una respuesta extensa ante una pregunta abierta, el contenedor de texto de `DialogBox.tsx` se expande verticalmente sin límite, lo que provoca que el texto sobrepase la pantalla y sea imposible de leer en su totalidad (no hay comportamiento de scroll).

## Objetivos
1. **Contención:** Limitar la altura máxima (max-height) de la ventana de diálogo para que no desborde la pantalla, independientemente de la longitud de la respuesta.
2. **Navegabilidad:** Activar el scroll vertical (overflow-y-auto) en el contenedor de texto cuando el contenido excede la altura límite.
3. **Estética:** Añadir un estilo personalizado (custom scrollbar) al scroll para que combine con el diseño oscuro y rojo arcano del entorno de Blado.

## Implementación Propuesta
- **`src/components/DialogBox.tsx`**: 
  - Añadir clases de Tailwind al div que envuelve el texto (`{displayedText}`): `max-h-[40vh] overflow-y-auto pr-2 dialog-scrollbar`.
- **`src/app/globals.css`**:
  - Añadir selectores `::-webkit-scrollbar` para la clase `.dialog-scrollbar` estilizando la barra con color oscuro de fondo y `var(--color-crimson)` en el slider.
