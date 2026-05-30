# ISS-030: Evitar repetición de Intro al volver al Inicio

**Estado:** Completado / Cerrado

## Descripción
Al navegar hacia otras páginas (como `/cebar-mate` o `/timba`) y hacer click en "Volver" (`href="/"`), la cinemática introductoria de la Caverna vuelve a reproducirse desde el principio. El comportamiento deseado es que la intro se reproduzca solamente en la carga inicial de la web o cuando se presione el botón explícito de "Intro" en el Navbar.

## Causa
El estado de la intro (`showIntro`) reside en `AppContext.tsx`, el cual es renderizado dentro de `AppShell` en la ruta principal (`src/app/page.tsx`). Cuando el usuario cambia de ruta, el proveedor de contexto se desmonta, y al volver a `/` se monta nuevamente, reiniciando su estado por defecto (`true`).

## Solución
Utilizar `sessionStorage` para guardar una bandera (`blado_intro_seen`).
- Al terminar o saltar la intro, guardar `sessionStorage.setItem('blado_intro_seen', 'true')`.
- Al inicializar el `AppContext`, verificar si esta bandera es `true` para skipear la intro directamente.
- Para evitar errores de *hydration mismatch* en Next.js, se utilizará un estado `isMounted` en el cliente.
