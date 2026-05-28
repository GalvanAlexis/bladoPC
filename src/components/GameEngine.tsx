"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VisualNovelScene from "@/components/VisualNovelScene";
import DialogBox, { Choice } from "@/components/DialogBox";
import SkillTreeViewer from "@/components/SkillTreeViewer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ReadmeModal from "@/components/ReadmeModal";
import { useAppContext } from "@/lib/AppContext";
import { SkillNode, SkillEdge } from "@/lib/markdown";

// --- Types -------------------------------------------------------------------

type Scene = "cave" | "library";
type BladoPose = "base" | "phone";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GameEngineProps {
  initialNodes: SkillNode[];
  initialEdges: SkillEdge[];
}

// --- Dialogue Tree ------------------------------------------------------------

const DIALOGUES = {
  intro: {
    text: "Bienvenido, mortal! Soy Blado, esta es mi caverna. A que has venido?",
    scene: "cave" as Scene,
    pose: "base" as BladoPose,
    choices: ["whoAmI", "skills", "projects", "knowledge", "cv"],
  },
  whoAmI: {
    text: "Soy Alexis Galvan! Me dicen Blado. Estudio Ciencia de Datos e IA en ISFDyT 57 Chascomus. Tambien estudio Ingenieria de Sistemas de forma autodidacta.",
    scene: "cave" as Scene,
    pose: "base" as BladoPose,
    choices: ["skills", "projects", "knowledge", "cv", "back"],
  },
  skills: {
    text: "Mis habilidades... - frota sus manos maliciosamente - ...Quieres ver el arbol completo de poder? Invoco el Grimorio? jeje",
    scene: "cave" as Scene,
    pose: "base" as BladoPose,
    choices: ["openSkillTree", "projects", "knowledge", "cv", "back"],
  },
  projects: {
    text: "Proyectos! Esas son las batallas reales. InmoVoz (buscador de propiedades con NLP), sistemas de autenticacion, dashboards de analisis... Cada uno, una cicatriz de aprendizaje.",
    scene: "cave" as Scene,
    pose: "phone" as BladoPose,
    choices: ["knowledge", "skills", "cv", "back"],
  },
  knowledge: {
    text: "Conocimiento teorico? Para eso... debemos ir a mi Biblioteca. abre un portal de fuego",
    scene: "library" as Scene,
    pose: "base" as BladoPose,
    choices: ["askTheory", "askProjects", "cv", "back"],
  },
  askTheory: {
    text: "Bien, mortal. Me interrogas? Jejeje. Preguntame y yo buscaré entre mis libros. Te respondere con honestidad... o casi.",
    scene: "library" as Scene,
    pose: "phone" as BladoPose,
    choices: ["back"],
    allowFreeQuestion: "theory",
  },
  askProjects: {
    text: "Mis proyectos? Espero hayas leido mi Github antes de venir a molest... Preguntarme sobre mi experiencia. Como sea, aqui tienes algunos",
    scene: "library" as Scene,
    pose: "phone" as BladoPose,
    choices: ["back"],
    allowFreeQuestion: "projects",
  },
  cv: {
    text: "Mi CV? Claro, mortal. Aqui tienes el grimorio de mi experiencia profesional... saca un pergamino en llamas. Todo lo que he hecho y lo que puedo hacer esta ahi.",
    scene: "library" as Scene,
    pose: "phone" as BladoPose,
    choices: ["back"],
    showCV: true,
  },
  back: {
    text: "Como gustes. bosteza demoniacamente. Que mas deseas saber sobre mis conocimientos?",
    scene: "cave" as Scene,
    pose: "base" as BladoPose,
    choices: ["whoAmI", "skills", "projects", "knowledge", "cv"],
  },
  openSkillTree: {
    text: "El Grimorio! Aqui veras cada habilidad que he conquistado... los nodos verdes brillan con poder, los rojos aun luchan por ser dominados.",
    scene: "cave" as Scene,
    pose: "base" as BladoPose,
    choices: ["closeSkillTree", "back"],
    showSkillTree: true,
  },
  closeSkillTree: {
    text: "Bien, cerramos el Grimorio. Que mas te interesa?",
    scene: "cave" as Scene,
    pose: "base" as BladoPose,
    choices: ["whoAmI", "skills", "projects", "knowledge", "cv"],
  },
} as const;

type DialogueKey = keyof typeof DIALOGUES;

const CHOICE_LABELS: Record<string, string> = {
  whoAmI: "Quien eres?",
  skills: "Mostrame tus habilidades",
  projects: "Contame sobre tus proyectos",
  knowledge: "Quiero ver tu conocimiento teorico",
  cv: "Ver tu CV / Experiencia",
  openSkillTree: "Abrir el Grimorio de Habilidades",
  closeSkillTree: "Cerrar el Grimorio",
  askTheory: "Preguntar sobre teoria y materias",
  askProjects: "Preguntar sobre proyectos especificos",
  back: "Volver",
};

// --- Component ----------------------------------------------------------------

export default function GameEngine({
  initialNodes,
  initialEdges,
}: GameEngineProps) {
  const { replayIntro } = useAppContext();
  const [currentKey, setCurrentKey] = useState<DialogueKey>("intro");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string>("Todos");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showCVModal, setShowCVModal] = useState(false);

  const current = DIALOGUES[currentKey];
  const scene: Scene = current.scene;
  const bladoPose: BladoPose = current.pose;
  const showSkillTree = "showSkillTree" in current && current.showSkillTree;
  const allowFreeQuestion =
    "allowFreeQuestion" in current && current.allowFreeQuestion;

  const choices: Choice[] = (current.choices as readonly string[]).map(
    (key) => ({
      label: CHOICE_LABELS[key] ?? key,
      action: () => {
        setCurrentKey(key as DialogueKey);
        setMessages([]);
        if (key === "cv") {
          setShowCVModal(true);
        }
      },
    }),
  );

  const handleBladoClick = useCallback(() => {
    setDialogVisible(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
    setMessages([]);
  }, []);

  const handleNavigate = useCallback((key: string) => {
    setCurrentKey(key as DialogueKey);
    setMessages([]);
    setDialogVisible(true);
  }, []);

  // BUG-02: Usamos useRef como snapshot buffer para evitar stale closure.
  // handleFreeQuestion nunca depende del estado messages directamente,
  // lo que estabiliza su referencia y evita re-renders innecesarios en DialogBox.
  const messagesRef = React.useRef<Message[]>(messages);
  messagesRef.current = messages;

  // ISS-021: sessionId persistido en localStorage para vincular mensajes a una sesión
  const sessionIdRef = useRef<string>("");
  useEffect(() => {
    const stored = localStorage.getItem("blado_session_id");
    if (stored) {
      sessionIdRef.current = stored;
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem("blado_session_id", newId);
      sessionIdRef.current = newId;
    }
  }, []);

  const handleFreeQuestion = useCallback(async (question: string) => {
    setIsLoading(true);

    // Capturamos el snapshot del estado actual sin depender de messages en closure
    const snapshot: Message[] = [
      ...messagesRef.current,
      { role: "user", content: question },
    ];
    setMessages(snapshot);

    try {
      const topic = typeof allowFreeQuestion === 'string' ? allowFreeQuestion : 'theory';
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: snapshot,
          sessionId: sessionIdRef.current,
          topic: topic,
        }),
      });

      // BUG-03: Validar res.ok antes de parsear para no ignorar errores HTTP
      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(errData.error ?? `HTTP ${res.status}`);
      }

      const data = (await res.json()) as { reply?: string };
      const reply =
        data.reply ??
        "Los portales de conocimiento estan bloqueados... (error al contactar a mi cerebro de fuego)";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Mis conexiones al inframundo fallaron. Intenta de nuevo, mortal.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []); // referencia estable — no depende de messages

  // The text shown in the box: if there's an AI reply, show it. Otherwise, show scripted text.
  const lastMessage = messages[messages.length - 1];
  const displayText =
    lastMessage?.role === "assistant"
      ? lastMessage.content
      : isLoading
        ? "Consultando el grimorio... llamas en los ojos"
        : current.text;

  const displayChoices: Choice[] =
    lastMessage?.role === "assistant" || isLoading
      ? [
          {
            label: "Volver al menu",
            action: () => {
              setMessages([]);
            },
          },
        ]
      : choices;

  return (
    <main className="relative w-screen h-screen overflow-hidden font-mono select-none">
      {/* Navbar */}
      <Navbar
        scene={scene}
        onReplayIntro={replayIntro}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2D Scene + Blado Sprite */}
      <VisualNovelScene
        scene={scene}
        bladoPose={bladoPose}
        dialogVisible={dialogVisible}
        onBladoClick={handleBladoClick}
      />

      {/* Atmospheric vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_black_100%)] pointer-events-none z-10" />

      {/* Skill Tree Grimoire (overlay) */}
      <AnimatePresence>
        {showSkillTree && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-2 sm:inset-4 md:inset-8 z-30 rounded-xl overflow-hidden border-2 border-toxic shadow-[0_0_50px_rgba(57,255,20,0.3)]"
          >
            <SkillTreeViewer
              initialNodes={initialNodes}
              initialEdges={initialEdges}
              selectedCareer={selectedCareer}
              selectedYear={selectedYear}
              onCareerChange={setSelectedCareer}
              onYearChange={setSelectedYear}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Readme CV Modal */}
      <ReadmeModal isOpen={showCVModal} onClose={() => setShowCVModal(false)} />

      {/* Dialog Box */}
      <AnimatePresence>
        {dialogVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <DialogBox
              key={
                currentKey +
                "-" +
                (lastMessage?.role === "assistant" ? "ai" : "")
              }
              speakerName="Blado"
              text={displayText}
              choices={displayChoices}
              onAskQuestion={allowFreeQuestion ? handleFreeQuestion : undefined}
              isTyping={isLoading}
              onClose={handleCloseDialog}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
