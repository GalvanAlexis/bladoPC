# ISS-029: Refactorización de Chat y Respuestas (GitHub + Cebar Mate)

## Descripción
El usuario requiere reestructurar la lógica de preguntas libres (chat con IA) para que dependan del contexto de la conversación. Además, se pide migrar la "pregunta libre genérica" a la nueva sección "Cebar Mate" y habilitar fuentes de verdad dinámicas según la ruta elegida por el usuario.

## Objetivos
1. **Eliminar `askFree` de la Caverna**: Quitar la opción de "pregunta libre" de la biblioteca.
2. **Contexto de Proyectos (GitHub)**: Cuando se pregunte por proyectos (`askProjects`), el LLM debe responder utilizando como fuente de verdad los repositorios públicos de GitHub (`GalvanAlexis`).
3. **Contexto de Teoría (Content)**: Cuando se pregunte por teoría (`askTheory`), el LLM utilizará los archivos locales de progreso de estudio (`content/`).
4. **Árbol de Habilidades**: El flujo para mostrar el Skill Tree (actualmente implementado en `openSkillTree`) se mantiene como la respuesta a consultas sobre habilidades.
5. **Chat en Cebar Mate**: Reemplazar la página de construcción de `/cebar-mate` por una interfaz de chat interactiva, donde el LLM responderá a preguntas generales (pregunta libre) utilizando un nuevo prompt específico.

## Arquitectura de Solución
- **`src/components/GameEngine.tsx`**: Modificar los nodos del diálogo para pasar la temática de la pregunta (`allowFreeQuestion: 'projects' | 'theory'`) hacia `DialogBox` y finalmente hacia `/api/chat`.
- **`src/app/api/chat/route.ts`**: Implementar enrutamiento del "System Prompt" basado en el parámetro `topic`.
- **`src/lib/github.ts`**: Nueva utilidad para consumir la API de GitHub y mapear los repositorios a texto plano que el LLM pueda leer.
- **`src/app/cebar-mate/page.tsx`**: Implementar la vista del chat libre.
