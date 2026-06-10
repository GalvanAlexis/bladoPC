# ISS-025: Ajuste de animación y métricas de CavernIntro

## Descripción
La animación de introducción `CavernIntro.tsx` (creada originalmente en el ISS-018) presentaba un problema de sincronización visual (ritmo de lectura vs. duración real de pantalla). El texto, al hacerse más grande, recorría la distancia más rápido, y la pantalla quedaba negra por varios segundos antes de finalizar.

## Objetivos (Resueltos)
1. **Velocidad de Lectura**: Ralentizar el desplazamiento para permitir la lectura cómoda.
2. **Eliminación de Tiempos Muertos**: Evitar la pantalla negra sin texto que duraba 5 segundos al final de la introducción.
3. **Ajustes de UI**: Letra levemente más grande y de color rojo brillante más claro (`#ff6b6b`).

## Implementación
- Se modificó la duración a `27000` (27 segundos).
- Se modificó el `translateY` límite de `-100%` a `-75%`, acortando la distancia de viaje. Esto hace que el texto se mueva más despacio en los mismos 27 segundos y que se detenga con el último párrafo ("Yo, Blado...") centrado en la pantalla.
- Se ajustaron los *times* de desvanecimiento (`opacity`) al último 5% de la animación (`[0, 0.05, 0.95, 1]`) para que el texto siga 100% visible hasta el final.
- Se removió el padding artificial masivo (`paddingBottom: 40vh` -> `10vh`).
- Se ajustó el `fontSize` a `clamp(20px, 3vw, 30px)` y el color/textShadow a `#ff6b6b`.

## Quality Gates
- Los estilos y las animaciones cumplen con la legibilidad requerida.
- La experiencia cinemática se mantiene suave.
