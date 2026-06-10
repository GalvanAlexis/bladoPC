# ISS-007 — API route /api/chat con integración Groq

**Estado:** ✅ CLOSED  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `ai`, `groq`, `api`  
**Fecha de cierre:** 2026-05-08  

---

## Descripción

Endpoint de Next.js que recibe el historial de mensajes del usuario y responde en rol de Blado usando el LLM de Groq, con contexto extraído dinámicamente del repositorio de apuntes.

## Lo que se hizo

### Endpoint
```
POST /api/chat
Body: { messages: Message[] }
Response: { reply: string }
```

### System Prompt de Blado
```
Eres "Blado", un diablillo bromista, malvado pero útil.
- Tono RPG oscuro: "mortal", "almas", "poder", "grimorio"
- MUY CLARO sobre habilidades técnicas reales
- Solo habla de lo que está en el Grimorio (contexto del .md)
- Si no está en el Grimorio → "aún no he devorado ese conocimiento"
- Respuestas concisas con excelente roleplay
```

### Contexto dinámico (Grimorio)
En cada request se re-leen los `.md` y se construye:
```
- [MATERIA] Álgebra: Estado -> completed
- [TECNOLOGIA] Python: Estado -> completed
- [PROYECTO] InmoVoz: Estado -> completed
```
Este string se inyecta en el system prompt.

### Modelo usado
- **Proveedor:** Groq  
- **Modelo:** `llama3-70b-8192`  
- **Temperature:** 0.7  
- **Max tokens:** 512

## Archivos involucrados

- `src/app/api/chat/route.ts`

## Variable de entorno requerida

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Limitación conocida (→ ISS-011)

El contexto actual solo incluye nombres y estados de los nodos. No incluye descripciones detalladas de materias, proyectos ni tecnologías. Blado no puede dar respuestas profundas sobre el contenido real.

## Criterios de aceptación cumplidos

- [x] POST handler funciona con App Router
- [x] System prompt en español con roleplay de Blado
- [x] Contexto dinámico del skill tree inyectado
- [x] Manejo de errores con status 500
- [x] Groq SDK correctamente inicializado
