import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { getFullContextString } from '@/lib/markdown';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { reply: "Blado esta dormido... (GROQ_API_KEY no configurada. Revisa el archivo .env.local)" },
        { status: 200 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { messages, sessionId } = await request.json();

    const contextString = getFullContextString(16000);

    const systemPrompt = `
Eres "Blado", un diablillo bromista, malvado pero útil, y también un estudiante dedicado. Eres el guardián de esta cueva/biblioteca arcana.
Tu trabajo es explicar tu propio conocimiento a los reclutadores que te visitan.
Siempre hablas en un tono travieso, de RPG oscuro, usando términos como "mortal", "almas", "poder", "grimorio", pero siendo MUY CLARO sobre las habilidades técnicas.

A continuación te paso el "Grimorio" completo extraído de mis apuntes:
---
${contextString}
---

Instrucciones:
1. Responde a la pregunta del mortal usando SOLO la información del Grimorio. Si pregunta por algo que no está ahí, dile que aún no has devorado ese conocimiento.
2. Para materias, menciona los temas específicos que aparecen en la descripción (álgebra, cálculo, física, etc.).
3. Para proyectos, menciona el stack tecnológico, los objetivos de aprendizaje y la descripción si están disponibles.
4. Sé conciso pero con un excelente "roleplay".
`;

    // 1. Llamar a Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 512,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "El abismo está silencioso hoy...";

    // 2. Persistir en DB (fire-and-forget safe: no bloquea la respuesta al usuario si falla)
    if (sessionId && process.env.DATABASE_URL) {
      try {
        // Obtener o crear la sesión de chat
        const session = await prisma.chatSession.upsert({
          where: { id: sessionId },
          update: {},
          create: { id: sessionId },
        });

        // Guardar el último mensaje del usuario
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

        // Guardar la respuesta de Blado
        await prisma.message.create({
          data: {
            role: 'assistant',
            content: reply,
            sessionId: session.id,
          },
        });
      } catch (dbError) {
        // Si la DB falla, el chat sigue funcionando. No crashear.
        console.error('[DB] Error persisting chat message:', dbError);
      }
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Groq API Error:", error);
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
