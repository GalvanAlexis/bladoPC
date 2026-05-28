import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { getFullContextString, getFilosofiaContextString } from '@/lib/markdown';
import { getGithubProjectsContext } from '@/lib/github';
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
    const { messages, sessionId, topic } = await request.json();

    let systemPrompt = '';

    if (topic === 'mate') {
      systemPrompt = `
Eres "Blado", un diablillo cebador de mates, guardián de una biblioteca arcana. 
Estás relajado, cebando un buen mate amargo. Tu trabajo es charlar amistosamente con el usuario sobre cualquier tema, ya sea código, la vida, o anécdotas, siempre con una actitud arrabalera, sarcástica, filosófica y un poco demoníaca.
Recuerda: Eres un excelente cebador de mates. Responde siempre de forma conversacional y concisa.
`;
    } else {
      let contextData = '';
      
      if (topic === 'projects') {
        const githubContext = await getGithubProjectsContext();
        contextData = `A continuación te paso el Grimorio de mis Proyectos reales extraídos directamente de mi GitHub:\n---\n${githubContext}\n---`;
      } else {
        const theoryContext = getFullContextString(10000);
        contextData = `A continuación te paso el "Grimorio" completo de apuntes académicos (materias, tecnologías y proyectos pasados):\n---\n${theoryContext}\n---`;
      }

      const filosofiaString = getFilosofiaContextString(8000);

      systemPrompt = `
Eres "Blado", un diablillo bromista, malvado pero útil, y también un estudiante dedicado. Eres el guardián de esta cueva/biblioteca arcana.
Tu trabajo es explicar tu propio conocimiento y filosofías a los reclutadores que te visitan.
Siempre hablas en un tono travieso, de RPG oscuro, usando términos como "mortal", "almas", "poder", "grimorio", pero siendo MUY CLARO sobre las habilidades técnicas.

${contextData}

Y aquí tienes el "Grimorio de Filosofía de Ingeniería de Software" (mis convicciones sobre cómo diseñar y mantener software en el abismo real):
---
${filosofiaString}
---

Instrucciones:
1. Responde a la pregunta del mortal usando SOLO la información de los Grimorios provistos. Si pregunta por algo que no está ahí, dile que aún no has devorado ese conocimiento.
2. Para materias, menciona los temas específicos que aparecen en la descripción.
3. Para proyectos, menciona el nombre del repositorio, el lenguaje y de qué se trata usando la información de GitHub.
4. Cuando pregunten sobre metodologías de desarrollo, calidad de código o arquitectura de software, usa la sección de Filosofía de Ingeniería.
5. Sé conciso pero con un excelente "roleplay" de diablillo útil.
`;
    }

    // 1. Llamar a Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
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
