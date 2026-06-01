# ISS-043: Navbar no visible en Mobile

**Estado:** En progreso
**Branch de implementación:** `feature/ISS-043-navbar-mobile`
**Tipo:** Bugfix / Responsive Design

---

## Visión General

Al visualizar la aplicación desde un dispositivo móvil, las opciones de navegación principales de la `Navbar` (Intro, Timba, Cebar Mate) no se muestran.
El usuario se queda sin forma de navegar a estas secciones en dispositivos pequeños.

## Causa Raíz

En `Navbar.tsx`, los botones de navegación tienen la clase de Tailwind `hidden sm:flex`, lo que oculta las opciones en pantallas con ancho menor a `sm` (`640px`) para evitar desbordar la barra superior (que ya tiene el logo, el botón de menú y otros indicadores).
Sin embargo, no existe un *fallback* de esta navegación para la versión móvil en el `Sidebar` (menú hamburguesa), que es lo que el usuario esperaría al abrir el panel.

## Solución

1. Modificar `Sidebar.tsx` para incluir una nueva sección "Navegación".
2. Mostrar esta sección principalmente en mobile (`sm:hidden` o dejarla visible siempre, pero ya que están en la Navbar, ocultarla en desktop podría ser lo mejor).
3. Añadir los botones "Intro", "Timba" y "Cebar Mate" dentro del Sidebar, utilizando `useRouter` y `useAppContext` (para `replayIntro`).
4. Al hacer click, realizar la navegación y cerrar el Sidebar automáticamente.
