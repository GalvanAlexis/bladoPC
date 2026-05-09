import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { getFullContextString } from '@/lib/markdown';

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { reply: "Blado esta dormido... (GROQ_API_KEY no configurada. Revisa el archivo .env.local)" },
        { status: 200 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { messages } = await request.json();

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

    // 2. Call the Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: 'llama3-70b-8192', // Using a fast/good model from Groq
      temperature: 0.7,
      max_tokens: 512,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "El abismo está silencioso hoy...";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Groq API Error:", error);
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
