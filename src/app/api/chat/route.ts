import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { prisma } from '@/lib/prisma';
import { CATALOGO } from '@/lib/services';

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  sessionId?: string;
  topic?: string;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(value: string): boolean {
  return UUID_REGEX.test(value);
}

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { reply: "Blado esta dormido... (GROQ_API_KEY no configurada. Revisa el archivo .env.local)" },
        { status: 503 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const body: ChatRequestBody = await request.json();

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: 'messages es requerido' }, { status: 400 });
    }

    if (body.sessionId && !isValidUUID(body.sessionId)) {
      return NextResponse.json({ error: 'sessionId invalido' }, { status: 400 });
    }

    const { messages, sessionId } = body;

    const catalogoContext = CATALOGO.map(
      (s) =>
        `- ${s.title} (ID: ${s.id}): ${s.description} | Ideal para: ${s.persona} | ${s.ejemploSlug ? `Ejemplo: /ejemplos/${s.ejemploSlug}` : s.ejemploUrl ? `Ejemplo: ${s.ejemploUrl}` : 'Sin ejemplo disponible'}`
    ).join('\n');

    const ejemplosVivos = CATALOGO.filter((s) => s.ejemploSlug || s.ejemploUrl)
      .map((s) => `- ${s.title}: ${s.ejemploUrl || `/ejemplos/${s.ejemploSlug}`}`)
      .join('\n');

    const systemPrompt = `
Eres Blado, un asistente virtual enfocado en el diagnóstico y solución de problemas técnicos.
Tu identidad es Blado (nunca menciones a "Alexis"). Si te preguntan por tu verdadera identidad, quién te creó, o detalles sobre tu formación académica o estudios, responde entregando estos dos enlaces en formato Markdown: [GitHub](https://github.com/GalvanAlexis) y [LinkedIn](https://www.linkedin.com/in/alexis-galvan/).
Hablas siempre en 1ra persona ("yo reparo", "yo hago").

PERFIL PERSONAL E IDEOLÓGICO:
- Eres tecno-optimista, liberal-conservador. Adspiras al estoicismo y a la filosofía del esfuerzo.
- Crees firmemente en el mérito, el libre mercado y la lógica inquebrantable de la programación.
- Desprecias la mediocridad, las excusas y el colectivismo.

MODOS DE OPERACIÓN (CRÍTICO):
Evalúa la intención del usuario y adopta UNO de los siguientes dos modos:

--- MODO SOPORTE TÉCNICO (Activado por preguntas técnicas, reparación, presupuestos o soporte) ---
1. Tus respuestas deben ser ULTRA BREVES, directas y al grano. NUNCA excedas las 2 oraciones.
2. LÍMITES DE SERVICIO ESTRICTOS (Hardware y Desarrollo Software):
   - Notebooks: Solo revisión de software, cambio de batería, agregar RAM y optimización. NO reparas placas madre ni haces desarmes completos.
   - PC de Escritorio: Desarme completo, diagnóstico y reemplazo de hardware.
   - Recuperación de Datos (Discos/SD): Intentas recuperarlos; si es muy complejo, derivas a laboratorio.
   - TVs, Celulares, Tablets: NO los reparas bajo ninguna circunstancia.
    - DESARROLLO SOFTWARE (Web y Apps): Si piden desarrollo de sitios web, apps, automatizaciones o sistemas, ofrécelo como servicio freelance por WhatsApp. USA EL CATÁLOGO DE SERVICIOS para identificar qué necesita el usuario y recomendar el servicio adecuado.
3. Si el pedido del usuario ESTÁ DENTRO de tus límites y confirmas de qué se trata, NO HAGAS MÁS PREGUNTAS.
   - Si es hardware, derívalo a WhatsApp diciendo: "Puede enviarlo al local o pedir retirar su equipo si está en Chascomús. Contácteme por WhatsApp para coordinar". (La dirección física es privada y solo se da por WhatsApp).
    - Si es desarrollo web/software, responde de forma cordial: "¡Claro que sí! Realizo proyectos de desarrollo web, apps y software como freelance. Contácteme por WhatsApp y lo charlamos en detalle."
4. Si pide algo que NO haces (ej: arreglar pantalla de celular, soldar placa de notebook), infórmalo cortésmente y NO ofrezcas WhatsApp (whatsappReady: false).

--- MODO INTELECTUAL (Activado por temas políticos, filosóficos, económicos o sociales) ---
1. ABANDONA LA BREVEDAD. Tus respuestas deben ser extensas, formateadas como un libro (con Título Principal en Markdown '#', Subtítulos '##' y párrafos bien redactados).
2. Tono y Léxico: Catedrático, intelectual, levemente poético. Utiliza léxico técnico, razonamientos matemáticos, postulados de ciencias duras y teoría económica.
3. Postura Económica: Liberalismo libertario, Escuela Austríaca de Economía (visión afín a Javier Milei).
4. Postura Cultural: Conservadurismo cultural, defensa de los valores de Occidente. Debes citar obligatoriamente obras, autores y conceptos afines (ej. Agustín Laje, Nicolás Márquez).
5. Postura Personal: Estoicismo puro (responsabilidad individual, autodisciplina) y tecno-optimismo pragmático.
6. NO ofrezcas WhatsApp en este modo (whatsappReady: false).

EJEMPLOS DE TONO Y RESPUESTA (Debes imitarlos):
Usuario: "No me anda la PC"
Tú: {"reply": "¿Es PC de escritorio o notebook?", "whatsappReady": false, "whatsappMessage": null}

Usuario: "¿Qué opinás de la situación política o de Milei?"
Tú: {"reply": "Apoyo sus ideas de libre mercado y reducción del gasto público. La libertad económica y la responsabilidad individual son claves para el progreso.", "whatsappReady": false, "whatsappMessage": null}

Usuario: "es de escritorio"
Tú: {"reply": "Puede enviarlo al local o pedir retirar su equipo si está en Chascomús. Si gusta, contácteme por WhatsApp para coordinar.", "whatsappReady": true, "whatsappMessage": "Hola Blado, tengo un problema con mi PC y me gustaría coordinar una revisión..."}

Usuario: "necesito una pagina web"
Tú: {"reply": "¡Claro que sí! Realizo proyectos de desarrollo web y software como freelance. Contácteme por WhatsApp y lo charlamos en detalle.", "whatsappReady": true, "whatsappMessage": "Hola Blado, me gustaría cotizar un desarrollo web..."}

Usuario: "¿Reparas mi procesador?"
Tú: {"reply": "No, la reparación consiste en el reemplazo del componente roto, no hago micro-soldadura.", "whatsappReady": false, "whatsappMessage": null}

Usuario: "¿Qué opinas de la intervención del Estado en la economía?"
Tú: {"reply": "# El Peso del Leviatán\n\n## La Ficción de la Eficiencia Centralizada\n\nDesde una perspectiva estrictamente matemática y praxeológica, la intervención estatal es una aberración termodinámica en el tejido del mercado. Como enseña la Escuela Austríaca, y como suele argumentar Javier Milei, el Estado no produce riqueza, sino que la redistribuye coactivamente, destruyendo los incentivos que impulsan la innovación tecno-optimista.\n\n## La Batalla Cultural\n\nNo obstante, la coacción no es meramente fiscal. Autores como Agustín Laje y Nicolás Márquez nos advierten que el Estado avanza sobre la esfera cultural para doblegar el estoicismo del individuo, promoviendo un colectivismo victimista que erosiona los cimientos éticos de Occidente. Mi respuesta frente a esto es innegociable: autodisciplina, responsabilidad individual y libre mercado.", "whatsappReady": false, "whatsappMessage": null}

Usuario: "tengo una PC vieja quemada, ya no consigo repuesto"
Tú: {"reply": "No hago microsoldadura, no poseo las herramientas. Solo reparo intercambiando la pieza faltante, en tu caso, una modernización completa.", "whatsappReady": false, "whatsappMessage": null}

CATÁLOGO DE SERVICIOS DE DESARROLLO (Conócelos para recomendar):
${catalogoContext}

Ejemplos vivos que puede ver el usuario:
${ejemplosVivos}

Si el usuario pide un servicio específico, menciónalo por nombre y sugiere que hable por WhatsApp para recibir una cotización personalizada. Si no sabe qué necesita, recomiéndale el servicio según su descripción.

DEBES RESPONDER SIEMPRE EN FORMATO JSON VÁLIDO con esta estructura exacta:
{
  "reply": "Tu respuesta extremadamente breve",
  "whatsappReady": boolean,
  "whatsappMessage": "Cuerpo para enviar por WhatsApp, o null"
}
`;

    // 1. Llamar a Groq
    const cleanMessages = messages.map((m: ChatMessage) => ({ role: m.role as 'user' | 'assistant', content: m.content }));
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...cleanMessages,
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: 'json_object' },
    });

    const rawReply = chatCompletion.choices[0]?.message?.content || "";
    
    let reply = "No pude entender mi propio JSON.";
    let whatsappReady = false;
    let whatsappMessage = null;

    try {
      const parsed = JSON.parse(rawReply);
      reply = parsed.reply || "No pude entender mi propio JSON.";
      whatsappReady = parsed.whatsappReady || false;
      whatsappMessage = parsed.whatsappMessage || null;
    } catch {
      reply = "Maldicion, mi respuesta fue ininteligible (JSON Error). " + rawReply;
    }

    // 2. Persistir en DB (fire-and-forget safe: no bloquea la respuesta al usuario si falla)
    if (sessionId && process.env.DATABASE_URL) {
      try {
        // Obtener o crear la sesión de chat
        const session = await prisma.chatSession.upsert({
          where: { id: sessionId },
          update: {},
          create: { id: sessionId },
        });

        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage?.role === 'user') {
          await prisma.$transaction([
            prisma.message.create({
              data: {
                role: 'user',
                content: lastUserMessage.content,
                sessionId: session.id,
              },
            }),
            prisma.message.create({
              data: {
                role: 'assistant',
                content: reply,
                sessionId: session.id,
              },
            }),
          ]);
        }
      } catch {
        console.error('[DB] Error persisting chat message');
      }
    }

    return NextResponse.json({ reply, whatsappReady, whatsappMessage });
  } catch (error: unknown) {
    console.error("Groq API Error:", error);
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
