"use client";

/**
 * CavernIntro — ISS-018
 *
 * Reemplaza StarWarsIntro. Scroll vertical puro (sin perspectiva 3D)
 * sobre fondo negro con partículas tipo brasas. Legible y temático.
 */
import React, { useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface CavernIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

const INTRO_TEXT = `Soy Alexis Galván.
Vivo en Chascomús, Buenos Aires, Argentina.

Desarrollador Full-Stack y cofundador de AIDO.
Estudio Ciencia de Datos en el ISFDyT 57.
Construyo Webs, Apps y Softwares 
que resuelven problemas cotidianos.

Esta web es un intento de mostrarte 
mis conocimientos. Aquí vas a encontrar mis 
habilidades, mis proyectos y mi forma de pensar.

Si sos reclutador, cliente o simplemente un curioso:
bienvenido a mi Caverna.

— Yo, Blado, te guiaré a través de ella.`;

const DURATION_MS = 27000; // 27s — velocidad cómoda de lectura

// Genera partículas de brasa estáticas (posición aleatoria)
function generateEmbers(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1, // 1–4px
    duration: Math.random() * 4 + 3, // 3–7s por ciclo
    delay: Math.random() * 6, // delay inicial
    color: Math.random() > 0.5 ? "#cc3300" : "#ff6600",
    targetY: -(Math.random() * 300 + 150),
    targetX: (Math.random() - 0.5) * 40,
  }));
}

export default function CavernIntro({ onComplete, onSkip }: CavernIntroProps) {
  const hasFinished = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onSkipRef = useRef(onSkip);
  const embers = useMemo(() => generateEmbers(40), []);

  // Mantener refs actualizados sin re-crear efectos
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });
  useEffect(() => {
    onSkipRef.current = onSkip;
  });

  const finish = (type: "complete" | "skip") => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    if (type === "complete") onCompleteRef.current();
    else onSkipRef.current();
  };

  useEffect(() => {
    const timer = setTimeout(() => finish("complete"), DURATION_MS);
    
    const handleInteraction = () => finish("skip");
    
    // Retrasar 100ms para evitar que el click que abre la intro la cierre inmediatamente
    const bindListeners = setTimeout(() => {
      window.addEventListener("keydown", handleInteraction);
      window.addEventListener("click", handleInteraction);
      window.addEventListener("touchstart", handleInteraction);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(bindListeners);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="cavern-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center"
      >
        {/* Partículas de brasa */}
        {embers.map((ember) => (
          <motion.div
            key={ember.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ember.left,
              bottom: "-8px",
              width: ember.size,
              height: ember.size,
              backgroundColor: ember.color,
              boxShadow: `0 0 ${ember.size * 2}px ${ember.color}`,
            }}
            animate={{
              y: [0, ember.targetY],
              opacity: [0, 0.8, 0.6, 0],
              x: [ember.targetX],
            }}
            transition={{
              duration: ember.duration,
              delay: ember.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Vignette inferior */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

        {/* Texto scrolleando — de abajo (100vh) hacia arriba (-150vh) */}
        <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none">
          <motion.div
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: "-150vh",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              y: { duration: DURATION_MS / 1000, ease: "linear" },
              opacity: {
                duration: DURATION_MS / 1000,
                ease: "linear",
                times: [0, 0.05, 0.95, 1],
              },
            }}
            onAnimationComplete={() => finish("complete")}
            style={{
              width: "min(65%, 680px)",
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "clamp(20px, 3vw, 30px)",
              lineHeight: 2,
              color: "#ff6b6b",
              textShadow: "0 0 18px rgba(255, 107, 107, 0.6)",
              whiteSpace: "pre-wrap",
              textAlign: "center",
              paddingBottom: "10vh", // Menos padding para no tener tiempo vacío
            }}
          >
            {INTRO_TEXT}
          </motion.div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
