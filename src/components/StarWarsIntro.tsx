"use client";

import React, { useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarWarsIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

const INTRO_TEXT = `Hace mucho tiempo, en un repositorio no muy lejano...

Presentamos a

ALEXIS GALVAN

Cofundador de AIDO
Desarrollador Full-Stack

Chascomus, Buenos Aires, Argentina

---
DOMINIOS TECNOLOGICOS

Ecosistema TypeScript:
React, Node.js (NestJS / Express)
PostgreSQL, Docker, Pandas, Polars

Ecosistema Laravel:
PHP 8.4, Laravel 12, Blade / Tailwind
MySQL, Redis, Nginx, Docker

---
PRODUCTOS Y SERVICIOS

APIs REST y Backend
Dashboards y Paneles de Control
Sistemas de Gestion Internos
Pipelines de Datos y Automatizacion
Herramientas SaaS para Agencias

---
PROYECTOS DESTACADOS

one piece api - API REST del universo One Piece
remis app - Ride-sharing platform
Inmobiliaria3D - Visualizacion Inmobiliaria
Focaccia - SaaS
Prometheus 6.0 - Automatizacion
aidoagencia.com - Sitio Corporativo

---
SU VISITA ES VALORADA

Explore el grimorio de conocimientos
y descubra las habilidades forjadas
en el fuego de proyectos reales.`;

const DURATION = 18000; // 18 seconds

function generateStars() {
  return Array.from({ length: 50 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.8 + 0.2,
  }));
}

export default function StarWarsIntro({ onComplete, onSkip }: StarWarsIntroProps) {
  const hasFinished = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stars = useMemo(() => generateStars(), []);

  const onCompleteRef = useRef(onComplete);
  const onSkipRef = useRef(onSkip);
  useEffect(() => { onCompleteRef.current = onComplete; });
  useEffect(() => { onSkipRef.current = onSkip; });

  const finish = (type: 'complete' | 'skip') => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    if (type === 'complete') onCompleteRef.current();
    else onSkipRef.current();
  };

  useEffect(() => {
    const timer = setTimeout(() => finish('complete'), DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Starfield effect - subtle dots */}
        <div className="absolute inset-0 opacity-30">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white rounded-full"
              style={{
                left: star.left,
                top: star.top,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        {/* Scrolling text container */}
        <div
          ref={containerRef}
          className="absolute w-full"
          style={{
            perspective: '400px',
            perspectiveOrigin: '50% 100%',
          }}
        >
          <motion.div
            initial={{ y: '100vh', rotateX: 25, opacity: 0 }}
            animate={{ y: '-200vh', rotateX: 25, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: DURATION / 1000,
              ease: 'linear',
              times: [0, 0.05, 0.85, 1],
            }}
            onAnimationComplete={() => finish('complete')}
            className="mx-auto text-center"
            style={{
              width: 'min(70%, 800px)',
              transformOrigin: '50% 100%',
              color: '#ffe81f',
              fontFamily: "'Courier New', Courier, monospace",
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
              fontSize: 'clamp(14px, 2.5vw, 24px)',
              textShadow: '0 0 20px rgba(255,232,31,0.3)',
            }}
          >
            {INTRO_TEXT}
          </motion.div>
        </div>

        {/* Skip button */}
        <button
          onClick={() => finish('skip')}
          className="fixed bottom-8 right-8 z-[110] px-6 py-2 rounded-md
            bg-gray-900/80 border border-gray-700 text-gray-400
            hover:text-white hover:border-gray-500
            text-sm font-mono uppercase tracking-wider
            transition-all duration-300"
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
