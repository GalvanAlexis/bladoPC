"use client";

/**
 * GameEngine — ISS-048 Rebranding Portfolio Blado
 * Core del portfolio interactivo. Texto profesional, sin RPG.
 * Usa PortfolioScene, PortfolioIntro, DialogBox, Navbar, Sidebar.
 */
import React, { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PortfolioScene from "@/components/PortfolioScene";
import DialogBox, { Choice } from "@/components/DialogBox";
import LibraryRoom from "@/components/biblioteca/LibraryRoom";
import ReadmeModal from "@/components/ReadmeModal";
import { useAppContext } from "@/lib/AppContext";

// --- Types -------------------------------------------------------------------

interface Message {
  role: "user" | "assistant";
  content: string;
}

// --- Dialogue Tree ------------------------------------------------------------

const DIALOGUES = {
  intro: {
    text: "Hola! Soy Blado, el asistente de este portfolio. ¿Qué querés conocer de Alexis?",
    choices: ["whoAmI", "skills", "projects", "knowledge", "cv"],
  },
  whoAmI: {
    text: "Soy Alexis Galván, más conocido como Blado. Desarrollador Full-Stack y cofundador de AIDO. Estudio Ciencia de Datos e IA en ISFDyT 57, Chascomús. También estudio Ingeniería de Sistemas de forma autodidacta.",
    choices: ["skills", "projects", "knowledge", "cv", "back"],
  },
  skills: {
    text: "Las habilidades de Alexis van desde desarrollo web full-stack hasta ciencia de datos e IA. ¿Querés ver el árbol de habilidades completo?",
    choices: ["openSkillTree", "projects", "knowledge", "cv", "back"],
  },
  projects: {
    text: "Los proyectos incluyen InmoVoz (buscador de propiedades con NLP), sistemas de autenticación, dashboards de análisis, y este portfolio. Cada uno representa un desafío técnico real.",
    choices: ["knowledge", "skills", "cv", "back"],
  },
  knowledge: {
    text: "El conocimiento teórico está organizado en un Skill Tree interactivo. Podés explorar materias, tecnologías y conceptos organizados por carrera y año.",
    choices: ["askTheory", "askProjects", "cv", "back"],
  },
  askTheory: {
    text: "Preguntame sobre cualquier aspecto académico o tecnológico y buscaré la mejor respuesta.",
    choices: ["back"],
    allowFreeQuestion: "theory",
  },
  askProjects: {
    text: "¿Querés saber más sobre algún proyecto en particular? Podés preguntar sobre el stack, las decisiones técnicas o los resultados.",
    choices: ["back"],
    allowFreeQuestion: "projects",
  },
  cv: {
    text: "Acá podés ver el CV completo de Alexis con toda su experiencia profesional, formación académica y proyectos destacados.",
    choices: ["back"],
    showCV: true,
  },
  back: {
    text: "¿Qué más querés saber sobre el portfolio de Alexis?",
    choices: ["whoAmI", "skills", "projects", "knowledge", "cv"],
  },
  openSkillTree: {
    text: "Este es el árbol de habilidades. Los nodos muestran el estado de dominio de cada tecnología y materia.",
    choices: ["closeSkillTree", "back"],
    showSkillTree: true,
  },
  closeSkillTree: {
    text: "¿Qué más querés explorar?",
    choices: ["whoAmI", "skills", "projects", "knowledge", "cv"],
  },
} as const;

type DialogueKey = keyof typeof DIALOGUES;

const CHOICE_LABELS: Record<string, string> = {
  whoAmI:         "¿Quién es Alexis?",
  skills:         "Ver sus habilidades",
  projects:       "Conocer sus proyectos",
  knowledge:      "Explorar conocimiento académico",
  cv:             "Ver CV / Experiencia",
  openSkillTree:  "Abrir árbol de habilidades",
  closeSkillTree: "Cerrar árbol",
  askTheory:      "Preguntar sobre teoría y materias",
  askProjects:    "Preguntar sobre proyectos",
  back:           "Volver al menú",
};

// --- Component ----------------------------------------------------------------

export default function GameEngine() {
  const { replayIntro } = useAppContext();
  const [currentKey, setCurrentKey] = useState<DialogueKey>("intro");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);

  const current = DIALOGUES[currentKey];
  const showSkillTree = "showSkillTree" in current && current.showSkillTree;
  const allowFreeQuestion = "allowFreeQuestion" in current && current.allowFreeQuestion;

  const choices: Choice[] = (current.choices as readonly string[]).map((key) => ({
    label: CHOICE_LABELS[key] ?? key,
    action: () => {
      setCurrentKey(key as DialogueKey);
      setMessages([]);
      if (key === "cv") setShowCVModal(true);
    },
  }));

  const handleBladoClick = useCallback(() => {
    setDialogVisible(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
    setMessages([]);
  }, []);

  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

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
    const snapshot: Message[] = [
      ...messagesRef.current,
      { role: "user", content: question },
    ];
    setMessages(snapshot);

    try {
      const topic = typeof allowFreeQuestion === "string" ? allowFreeQuestion : "theory";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: snapshot,
          sessionId: sessionIdRef.current,
          topic,
        }),
      });

      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errData.error ?? `HTTP ${res.status}`);
      }

      const data = (await res.json()) as { reply?: string };
      const reply = data.reply ?? "No pude procesar la respuesta en este momento. Intentá de nuevo.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hubo un problema al conectar con el sistema. Intentá de nuevo." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [allowFreeQuestion]);

  const lastMessage = messages[messages.length - 1];
  const displayText =
    lastMessage?.role === "assistant"
      ? lastMessage.content
      : isLoading
        ? "Procesando tu pregunta..."
        : current.text;

  const displayChoices: Choice[] =
    lastMessage?.role === "assistant" || isLoading
      ? [{ label: "Volver al menú", action: () => setMessages([]) }]
      : choices;

  return (
    <div className="relative w-full h-full overflow-hidden select-none">

      {/* Scene */}
      <PortfolioScene
        dialogVisible={dialogVisible}
        onBladoClick={handleBladoClick}
      />

      {/* Skill Tree overlay */}
      <AnimatePresence>
        {showSkillTree && <LibraryRoom />}
      </AnimatePresence>

      {/* CV Modal */}
      <ReadmeModal isOpen={showCVModal} onClose={() => setShowCVModal(false)} />

      {/* Dialog Box */}
      <AnimatePresence>
        {dialogVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <DialogBox
              key={currentKey + "-" + (lastMessage?.role === "assistant" ? "ai" : "")}
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
    </div>
  );
}
