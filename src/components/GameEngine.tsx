"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisualNovelScene from '@/components/VisualNovelScene';
import DialogBox, { Choice } from '@/components/DialogBox';
import SkillTreeViewer from '@/components/SkillTreeViewer';
import { SkillNode, SkillEdge } from '@/lib/markdown';

// ─── Types ────────────────────────────────────────────────────────────────────

type Scene = 'cave' | 'library';
type BladoPose = 'base' | 'phone';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GameEngineProps {
  initialNodes: SkillNode[];
  initialEdges: SkillEdge[];
}

// ─── Dialogue Tree ─────────────────────────────────────────────────────────────
// This is the scripted part of the game — predefined paths the recruiter can take.

const DIALOGUES = {
  intro: {
    text: "¡Bienvenido, mortal! Soy Blado, guardián de estos dominios de conocimiento. ¿A qué has venido?",
    scene: 'cave' as Scene,
    pose: 'base' as BladoPose,
    choices: ['whoAmI', 'skills', 'projects', 'knowledge'],
  },
  whoAmI: {
    text: "¡Ah! Mi creador es Alexis Galván... o como yo lo llamo: el mortal que firmó un pacto con el conocimiento. Backend, IA y Datos son sus armas. Estudia Ingeniería de Sistemas mientras forja sus habilidades en el fuego de proyectos reales.",
    scene: 'cave' as Scene,
    pose: 'base' as BladoPose,
    choices: ['skills', 'projects', 'knowledge', 'back'],
  },
  skills: {
    text: "Sus habilidades... *frota sus manos maliciosamente*. Python, SQL, FastAPI, algoritmos... todas forjadas con sudor y código. ¿Quieres ver el árbol completo de poder? ¡Invoco el Grimorio!",
    scene: 'cave' as Scene,
    pose: 'base' as BladoPose,
    choices: ['openSkillTree', 'projects', 'knowledge', 'back'],
  },
  projects: {
    text: "¡Proyectos! Esas son las batallas reales. InmoVoz (buscador de propiedades con NLP), sistemas de autenticación, dashboards de análisis... Cada uno, una cicatriz de aprendizaje.",
    scene: 'cave' as Scene,
    pose: 'phone' as BladoPose,
    choices: ['knowledge', 'skills', 'back'],
  },
  knowledge: {
    text: "¿Conocimiento teórico? Para eso... debemos ir a mi Biblioteca. *abre un portal de fuego*",
    scene: 'library' as Scene,
    pose: 'base' as BladoPose,
    choices: ['askTheory', 'askProjects', 'askFree', 'back'],
  },
  askTheory: {
    text: "Bien, mortal. ¿Sobre qué materia deseas interrogarme? Pregúntame y yo, Blado, buscaré en los grimoires de mi creador y te responderé con honestidad... o casi.",
    scene: 'library' as Scene,
    pose: 'phone' as BladoPose,
    choices: ['back'],
    allowFreeQuestion: true,
  },
  askProjects: {
    text: "¿Los proyectos aplicados? ¡Excelente elección! Pregunta lo que quieras sobre la arquitectura, el código, las decisiones de diseño... yo consulto los archivos.",
    scene: 'library' as Scene,
    pose: 'phone' as BladoPose,
    choices: ['back'],
    allowFreeQuestion: true,
  },
  askFree: {
    text: "Puedes preguntarme lo que desees, mortal. Yo consulto el grimorio de conocimientos de mi creador y te respondo. ¿Qué quieres saber?",
    scene: 'library' as Scene,
    pose: 'phone' as BladoPose,
    choices: ['back'],
    allowFreeQuestion: true,
  },
  back: {
    text: "Como gustes. *bosteza demoníacamente*. ¿Qué más deseas saber sobre mi creador?",
    scene: 'cave' as Scene,
    pose: 'base' as BladoPose,
    choices: ['whoAmI', 'skills', 'projects', 'knowledge'],
  },
  openSkillTree: {
    text: "¡El Grimorio! Aquí verás cada habilidad que ha conquistado... los nodos verdes brillan con poder, los rojos aún luchan por ser dominados.",
    scene: 'cave' as Scene,
    pose: 'base' as BladoPose,
    choices: ['closeSkillTree', 'back'],
    showSkillTree: true,
  },
  closeSkillTree: {
    text: "Bien, cerramos el Grimorio. ¿Qué más te interesa?",
    scene: 'cave' as Scene,
    pose: 'base' as BladoPose,
    choices: ['whoAmI', 'skills', 'projects', 'knowledge'],
  },
} as const;

type DialogueKey = keyof typeof DIALOGUES;

const CHOICE_LABELS: Record<string, string> = {
  whoAmI: "¿Quién es tu creador?",
  skills: "Muéstrame sus habilidades",
  projects: "Cuéntame sobre sus proyectos",
  knowledge: "Quiero ver su conocimiento teórico",
  openSkillTree: "🗺️ Abrir el Grimorio de Habilidades",
  closeSkillTree: "📖 Cerrar el Grimorio",
  askTheory: "Preguntar sobre teoría y materias",
  askProjects: "Preguntar sobre proyectos específicos",
  askFree: "Hacer una pregunta libre",
  back: "← Volver",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function GameEngine({ initialNodes, initialEdges }: GameEngineProps) {
  const [currentKey, setCurrentKey] = useState<DialogueKey>('intro');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const current = DIALOGUES[currentKey];
  const scene: Scene = current.scene;
  const bladoPose: BladoPose = current.pose;
  const showSkillTree = 'showSkillTree' in current && current.showSkillTree;
  const allowFreeQuestion = 'allowFreeQuestion' in current && current.allowFreeQuestion;

  // Build choice objects from the keys in the current dialogue
  const choices: Choice[] = (current.choices as readonly string[])
    .filter(key => key !== 'back' || current.choices.includes('back'))
    .map(key => ({
      label: CHOICE_LABELS[key] ?? key,
      action: () => setCurrentKey(key as DialogueKey),
    }));

  const handleFreeQuestion = useCallback(async (question: string) => {
    setIsLoading(true);

    const updatedMessages: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(updatedMessages);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      const reply = data.reply ?? "Los portales de conocimiento están bloqueados... (error al contactar a mi cerebro de fuego)";

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Mis conexiones al inframundo fallaron. Intenta de nuevo, mortal." }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  // The text shown in the box: if there's an AI reply, show it. Otherwise, show scripted text.
  const lastMessage = messages[messages.length - 1];
  const displayText = (lastMessage?.role === 'assistant')
    ? lastMessage.content
    : isLoading
    ? "Consultando el grimorio... *llamas en los ojos*"
    : current.text;

  const displayChoices: Choice[] = (lastMessage?.role === 'assistant' || isLoading)
    ? [{ label: "← Volver al menú", action: () => { setMessages([]); } }]
    : choices;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black font-mono select-none">
      {/* 2D Scene + Blado Sprite */}
      <VisualNovelScene scene={scene} bladoPose={bladoPose} />

      {/* Atmospheric vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_black_100%)] pointer-events-none z-10" />

      {/* Skill Tree Grimoire (overlay) */}
      <AnimatePresence>
        {showSkillTree && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-8 z-30 rounded-xl overflow-hidden border-2 border-toxic shadow-[0_0_50px_rgba(57,255,20,0.3)]"
          >
            <SkillTreeViewer initialNodes={initialNodes} initialEdges={initialEdges} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top HUD */}
      <div className="absolute top-6 left-6 z-40 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-toxic animate-pulse shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
        <span className="text-xs uppercase tracking-widest text-gray-400">
          {scene === 'cave' ? '🗻 La Cueva de Blado' : '📚 Biblioteca Arcana'}
        </span>
      </div>

      {/* Dialog Box */}
      <div className="relative z-40">
        <DialogBox
          speakerName="Blado"
          text={displayText}
          choices={displayChoices}
          onAskQuestion={allowFreeQuestion ? handleFreeQuestion : undefined}
          isTyping={isLoading}
        />
      </div>
    </main>
  );
}
