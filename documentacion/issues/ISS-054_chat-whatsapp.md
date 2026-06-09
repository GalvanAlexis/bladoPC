# ISS-054: Refactorización Chat LLM y WhatsApp (Cebar Mate)

**Estado:** Completado
**Branch:** `feature/ISS-054-chat-whatsapp`
**Tipo:** Feature / Refactor
**Prioridad:** Alta

---

## Objetivo

Eliminar todo el código legacy relacionado a `GameEngine`, el avatar de "Blado" en la biblioteca y las escenas visuales (`/timba`, `/biblioteca`).
Redirigir el botón "Hablar con Blado" hacia la interfaz de chat (anteriormente "Cebar Mate").
Actualizar el LLM (Groq) para diagnosticar problemas del usuario y preparar intenciones de contacto por WhatsApp, devolviendo un JSON estructurado.
Renovar la interfaz del chat para alinearlo con el rebranding clean/corporativo (ISS-048), mostrando un botón "Enviar a WhatsApp" cuando corresponda.

## Tareas Pendientes

- [ ] Eliminar componentes legacy (`GameEngine`, `DialogBox`, `VisualNovelScene`, `PortfolioScene`, etc.).
- [ ] Eliminar rutas legacy (`/timba`, `/biblioteca`).
- [ ] Modificar enlaces en `HeroSection` y `Sidebar` para apuntar a `/cebar-mate` y quitar `/timba`.
- [ ] Actualizar `api/chat/route.ts` para forzar JSON mode, detectar el problema y armar el cuerpo del mensaje de WhatsApp.
- [ ] Refactorizar UI en `src/app/cebar-mate/page.tsx`:
  - Cambiar estilo visual de verde/hacker a clean/corporativo.
  - Soportar el nuevo JSON estructurado.
  - Mostrar un Call-To-Action (botón) explícito para abrir WhatsApp si la intención del LLM lo solicita.
