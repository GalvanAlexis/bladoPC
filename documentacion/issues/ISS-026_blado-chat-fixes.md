# ISS-026: Corrección de Modelo Groq y Ajustes de Interfaz de Blado

## Descripción
Se detectó un error al momento de realizar preguntas libres al asistente virtual Blado. Adicionalmente, el avatar de Blado en el entorno de la caverna/biblioteca contenía un texto titilante intrusivo.

## Objetivos (Resueltos)
1. **Chat Inteligente**: Restaurar la funcionalidad del chat libre con la inteligencia artificial.
2. **Ajuste de UI**: Limpiar la interfaz eliminando textos de ayuda redundantes.

## Implementación
- Se identificó mediante los logs de servidor que Groq dio de baja el modelo `llama3-70b-8192` (`model_decommissioned`).
- Se actualizó el endpoint `/api/chat` en `src/app/api/chat/route.ts` para utilizar el nuevo modelo recomendado y soportado: `llama-3.3-70b-versatile`.
- Se eliminó el texto parpadeante "Click para hablar conmigo, mortal..." (`motion.span`) del componente `src/components/VisualNovelScene.tsx` para lograr un diseño más limpio y menos ruidoso.

## Quality Gates
- Las solicitudes a la API de Groq ahora retornan 200 OK y las respuestas se generan en tiempo real.
- La interfaz visual se mantiene sin advertencias ni regresiones en React/Next.js.
