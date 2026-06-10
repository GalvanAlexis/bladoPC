# ISS-021 — Chat History Persistence

**Estado:** 🔴 OPEN  
**Prioridad:** 🔴 Alta  
**Etiquetas:** `database`, `chat`, `api`, `prisma`  
**Depende de:** ISS-020 (Prisma + Supabase setup)

---

## Descripción

Cada conversación que un visitante tiene con Blado se pierde al cerrar el navegador. Este ISS implementa la persistencia de esas conversaciones en Supabase a través de Prisma, de forma completamente transparente para el usuario.

**Flujo deseado:**
1. El cliente genera un `sessionId` único al cargar la app (guardado en `localStorage`).
2. Al enviar cada mensaje, el `sessionId` viaja junto al payload de `/api/chat`.
3. El servidor guarda el mensaje del usuario y la respuesta de Blado en la DB.
4. Cada conversación queda vinculada a un `ChatSession`, y opcionalmente a un `Visitor` (ISS-022).

---

## Cambios en el cliente

### `src/components/GameEngine.tsx`

Generar y persistir el `sessionId` al montar el componente:

```typescript
import { useEffect, useRef } from 'react';

// Dentro del componente GameEngine:
const sessionIdRef = useRef<string>('');

useEffect(() => {
  const stored = localStorage.getItem('blado_session_id');
  if (stored) {
    sessionIdRef.current = stored;
  } else {
    const newId = crypto.randomUUID();
    localStorage.setItem('blado_session_id', newId);
    sessionIdRef.current = newId;
  }
}, []);
```

Modificar el `fetch` a `/api/chat` para incluir el `sessionId`:

```typescript
const res = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: messagesSnapshot,
    sessionId: sessionIdRef.current,   // ← nuevo
  }),
});
```

---

## Cambios en el servidor

### `src/app/api/chat/route.ts`

```typescript
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) { /* ... */ }

    const { messages, sessionId } = await request.json();

    // 1. Obtener o crear la sesión de chat
    const session = await prisma.chatSession.upsert({
      where: { id: sessionId ?? '' },
      update: {},
      create: { id: sessionId },
    });

    // 2. Guardar el último mensaje del usuario
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage?.role === 'user') {
      await prisma.message.create({
        data: {
          role: 'user',
          content: lastUserMessage.content,
          sessionId: session.id,
        },
      });
    }

    // 3. Llamar a Groq (sin cambios)
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    // ... resto del código existente ...

    const reply = chatCompletion.choices[0]?.message?.content ?? '...';

    // 4. Guardar la respuesta de Blado
    await prisma.message.create({
      data: {
        role: 'assistant',
        content: reply,
        sessionId: session.id,
      },
    });

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    // ... manejo de errores existente ...
  }
}
```

---

## Consideraciones de performance

- Las escrituras a DB se hacen **después** de recibir la respuesta de Groq, pero **antes** de devolver al cliente. Esto agrega ~50-100ms de latencia, acceptable.
- Alternativa más rápida: usar `waitUntil` de Vercel para hacer la escritura en background, pero requiere `@vercel/functions` y es más compleja. Implementar si la latencia fuera un problema.

---

## Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/GameEngine.tsx` | Generar y gestionar `sessionId` en `localStorage` |
| `src/app/api/chat/route.ts` | Recibir `sessionId`, persistir mensajes via Prisma |

---

## Criterios de aceptación

- [ ] Al enviar un mensaje, aparece un registro en la tabla `ChatSession` de Supabase
- [ ] Cada mensaje (user + assistant) aparece en la tabla `Message` con el `sessionId` correcto
- [ ] Si el mismo `sessionId` manda múltiples mensajes, todos quedan en la misma `ChatSession`
- [ ] Si no se envía `sessionId` (edge case), la ruta no crashea
- [ ] El tiempo de respuesta no aumenta más de 150ms respecto al baseline sin DB
- [ ] `npm run build` pasa sin errores

---

## Estimación

~45 minutos
