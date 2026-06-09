"use client";

/**
 * AssistantSection — ISS-049
 * Sección del home que contiene el GameEngine (asistente Blado).
 * El motor de diálogos vive dentro de esta sección como overlay disparado desde un CTA.
 */
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import BladoAvatar from '@/components/BladoAvatar';

const GameEngine = dynamic(() => import('@/components/GameEngine'), {
  loading: () => <BladoAvatar message="Cargando asistente..." />,
  ssr: false,
});

export default function AssistantSection() {
  const [active, setActive] = useState(false);

  const handleActivate = useCallback(() => {
    setActive(true);
    // Esperar al siguiente frame y hacer scroll para centrar la sección
    requestAnimationFrame(() => {
      document.getElementById('assistant')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <section
      id="assistant"
      aria-label="Asistente interactivo"
      className="section-lazy"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'var(--surface)',
        overflow: 'hidden',
      }}
    >
      {/* ── Header de la sección ── */}
      <div
        className="section-container"
        style={{
          paddingTop: 'clamp(56px, 8vh, 96px)',
          paddingBottom: '0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="section-divider reveal" />
        <p
          className="reveal"
          style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: '12px',
          }}
        >
          Asistente interactivo
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <h2
            className="reveal"
            style={{
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              fontWeight: 700,
              color: 'var(--foreground)',
              margin: 0,
            }}
          >
            Hablá con Blado
          </h2>
          {!active && (
            <p className="reveal" style={{ fontSize: '14px', color: 'var(--muted-light)', maxWidth: '360px', textAlign: 'right' }}>
              El asistente puede responder preguntas sobre Alexis, sus proyectos, habilidades y más.
            </p>
          )}
        </div>
      </div>

      {/* ── Área del asistente ── */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          minHeight: '600px',
        }}
      >
        {active ? (
          /* GameEngine montado — full height de la sección */
          <div style={{ position: 'absolute', inset: 0 }}>
            <GameEngine />
          </div>
        ) : (
          /* CTA de activación — antes de montar el heavy component */
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
            }}
          >
            {/* Grid bg */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(var(--border-subtle) 1px, transparent 1px),
                  linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                opacity: 0.2,
                pointerEvents: 'none',
              }}
            />
            {/* Glow central */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                pointerEvents: 'none',
                opacity: 0.4,
              }}
            />

            {/* Avatar placeholder */}
            <div
              style={{
                width: 'clamp(80px, 10vw, 120px)',
                height: 'clamp(80px, 10vw, 120px)',
                borderRadius: '50%',
                background: 'var(--surface-2)',
                border: '2px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(20px, 3vw, 36px)',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                  userSelect: 'none',
                }}
              >
                AG
              </span>
            </div>

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '16px', color: 'var(--foreground-2)', marginBottom: '8px' }}>
                Alexis Galván · <span style={{ color: 'var(--accent)' }}>Blado</span>
              </p>
              <p style={{ fontSize: '13px', color: 'var(--muted)', maxWidth: '300px' }}>
                Hacé clic para iniciar la sesión interactiva
              </p>
            </div>

            <button
              id="activate-assistant"
              onClick={handleActivate}
              className="btn-primary"
              style={{ position: 'relative', zIndex: 1 }}
            >
              Iniciar conversación
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M8 1l7 7-7 7M1 8h14" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
