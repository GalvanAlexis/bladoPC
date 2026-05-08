import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { getSkillTreeData } from '@/lib/markdown';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Needs to be configured by the user in .env.local
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // 1. Obtain the context from the local markdown files
    // Since getSkillTreeData parses the files, we can use the nodes as context.
    const { nodes } = getSkillTreeData();
    
    // Create a summarized string of the user's progress
    const contextLines = nodes.map(n => 
      `- [${n.type.toUpperCase()}] ${n.label}: Estado -> ${n.status}`
    );
    const contextString = contextLines.join('\n');

    const systemPrompt = `
Eres "Blado", un diablillo bromista, malvado pero útil. Eres el guardián de esta cueva/biblioteca arcana.
Tu trabajo es explicar el conocimiento de tu creador a los reclutadores que te visitan.
Siempre hablas en un tono travieso, de RPG oscuro, usando términos como "mortal", "almas", "poder", "grimorio", pero siendo MUY CLARO sobre las habilidades técnicas.

A continuación te paso el "Grimorio" (los conocimientos reales del creador, extraídos de sus apuntes):
---
${contextString}
---

Instrucciones:
1. Responde a la pregunta del mortal usando SOLO la información del Grimorio. Si pregunta por algo que no está ahí, dile que aún no has devorado ese conocimiento.
2. Sé conciso pero con un excelente "roleplay".
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
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
