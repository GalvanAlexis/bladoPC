# ISS-028: Páginas "Timba" y "Cebar Mate" (En Construcción)

## Descripción
En el Navbar actual (`src/components/Navbar.tsx`) existen dos botones ("Timba" y "Cebar Mate") que se encuentran deshabilitados y marcados como "Próximamente...". Se requiere habilitarlos y crear sus respectivas rutas/páginas en el framework (Next.js) que actúen como pantallas de "Bajo Construcción".

## Objetivos
1. **Routing:** Crear las rutas `/timba` y `/cebar-mate`.
2. **UI (Bajo Construcción):** Desarrollar un layout o página temporal que mantenga el estilo visual oscuro/arcano ("Blado Cavern") y anuncie que el contenido está en construcción.
3. **Navegación:** Activar los botones en el componente `Navbar` para que redirijan a estas nuevas rutas.

## Implementación Propuesta
- **`src/app/timba/page.tsx`**: Nueva página con mensaje de "Timba bajo construcción" y un botón para volver al inicio.
- **`src/app/cebar-mate/page.tsx`**: Nueva página con mensaje de "Cebar Mate bajo construcción" y un botón de retorno.
- **`src/components/Navbar.tsx`**: Importar `useRouter` de `next/navigation`, marcar los botones como `available: true` y agregar la redirección (`router.push`) en el `handleClick`.
