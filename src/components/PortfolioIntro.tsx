"use client";

/**
 * PortfolioIntro — ISS-048 Rebranding
 * Reemplaza CavernIntro. Pantalla de bienvenida clean y profesional.
 * Sin brasas, sin color RPG. Texto blanco sobre negro, acento rojo.
 */
import React, { useEffect, useRef } from "react";

interface PortfolioIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

const INTRO_TEXT = `Soy Alexis Galván.
Vivo en Chascomús, Buenos Aires, Argentina.

Desarrollador Full-Stack y cofundador de AIDO.
Estudio Ciencia de Datos en el ISFDyT 57.
Construyo webs, apps y software
que resuelven problemas reales.

Esta web es mi portfolio.
Aquí encontrarás mis habilidades,
proyectos y forma de pensar.

— Blado`;

const DURATION_MS = 22000;

export default function PortfolioIntro({ onComplete, onSkip }: PortfolioIntroProps) {
  const hasFinished = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onSkipRef = useRef(onSkip);

  useEffect(() => { onCompleteRef.current = onComplete; });
  useEffect(() => { onSkipRef.current = onSkip; });

  const finish = (type: "complete" | "skip") => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    if (type === "complete") onCompleteRef.current();
    else onSkipRef.current();
  };

  useEffect(() => {
    const timer = setTimeout(() => finish("complete"), DURATION_MS);
    const handleInteraction = () => finish("skip");

    const bind = setTimeout(() => {
      window.addEventListener("keydown", handleInteraction);
      window.addEventListener("click", handleInteraction);
      window.addEventListener("touchstart", handleInteraction);
    }, 120);

    return () => {
      clearTimeout(timer);
      clearTimeout(bind);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#050505',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Viñeta lateral sutil */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Línea vertical roja — decorativa */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '1px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, var(--accent) 30%, var(--accent) 70%, transparent)',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Texto scrolleando */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 'min(70%, 600px)',
            paddingBottom: '10vh',
            animation: `intro-scroll ${DURATION_MS / 1000}s linear both`,
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            fontSize: 'clamp(18px, 2.4vw, 26px)',
            lineHeight: 1.9,
            color: '#e5e5e5',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}
        >
          {INTRO_TEXT}
        </div>
      </div>

      {/* Skip hint */}
      <p
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      >
        Toca o presiona cualquier tecla para continuar
      </p>
    </div>
  );
}
