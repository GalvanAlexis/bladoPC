"use client";

/**
 * CavernIntro — ISS-018
 *
 * Reemplaza StarWarsIntro. Scroll vertical puro (sin perspectiva 3D)
 * sobre fondo negro con partículas tipo brasas. Legible y temático.
 */
import React, { useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CavernIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

const INTRO_TEXT = `Soy Alexis Galván.
Vivo en Chascomús, Buenos Aires, Argentina.

Desarrollador Full-Stack y cofundador de AIDO.
Construyo backends, APIs y herramientas
que resuelven problemas reales.

Esta web es mi grimorio digital.
Aquí vas a encontrar mis habilidades,
mis proyectos y mi forma de pensar.

Si sos reclutador, cliente o simplemente curioso:
bienvenido a la Caverna.

— Blado te guía desde aquí.`;

const DURATION_MS = 28000; // 28s — velocidad cómoda de lectura

// Genera partículas de brasa estáticas (posición aleatoria)
function generateEmbers(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,          // 1–4px
    duration: Math.random() * 4 + 3,      // 3–7s por ciclo
    delay: Math.random() * 6,             // delay inicial
    color: Math.random() > 0.5 ? '#cc3300' : '#ff6600',
  }));
}

export default function CavernIntro({ onComplete, onSkip }: CavernIntroProps) {
  const hasFinished = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onSkipRef = useRef(onSkip);
  const embers = useMemo(() => generateEmbers(40), []);

  // Mantener refs actualizados sin re-crear efectos
  useEffect(() => { onCompleteRef.current = onComplete; });
  useEffect(() => { onSkipRef.current = onSkip; });

  const finish = (type: 'complete' | 'skip') => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    if (type === 'complete') onCompleteRef.current();
    else onSkipRef.current();
  };

  useEffect(() => {
    const timer = setTimeout(() => finish('complete'), DURATION_MS);
    return () => clearTimeout(timer);
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
              bottom: '-8px',
              width: ember.size,
              height: ember.size,
              backgroundColor: ember.color,
              boxShadow: `0 0 ${ember.size * 2}px ${ember.color}`,
            }}
            animate={{
              y: [0, -(Math.random() * 300 + 150)],
              opacity: [0, 0.8, 0.6, 0],
              x: [(Math.random() - 0.5) * 40],
            }}
            transition={{
              duration: ember.duration,
              delay: ember.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Vignette inferior */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

        {/* Texto scrolleando — translateY puro, sin perspectiva 3D */}
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
          <motion.div
            initial={{ y: '100vh', opacity: 0 }}
            animate={{
              y: '-110%',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              y: { duration: DURATION_MS / 1000, ease: 'linear' },
              opacity: {
                duration: DURATION_MS / 1000,
                ease: 'linear',
                times: [0, 0.06, 0.88, 1],
              },
            }}
            onAnimationComplete={() => finish('complete')}
            style={{
              width: 'min(65%, 680px)',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 'clamp(15px, 2vw, 22px)',
              lineHeight: 2,
              color: '#cc4400',
              textShadow: '0 0 18px rgba(200, 50, 0, 0.6)',
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
              paddingBottom: '40vh', // espacio para que el texto desaparezca por arriba
            }}
          >
            {INTRO_TEXT}
          </motion.div>
        </div>

        {/* Botón omitir */}
        <button
          onClick={() => finish('skip')}
          className="fixed bottom-8 right-8 z-[110] px-5 py-2 rounded
            bg-black/70 border border-red-900/50 text-red-800
            hover:text-red-500 hover:border-red-700
            text-xs font-mono uppercase tracking-widest
            transition-all duration-300"
        >
          Omitir
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
