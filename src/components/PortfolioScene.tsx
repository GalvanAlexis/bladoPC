"use client";

/**
 * PortfolioScene — ISS-048 Rebranding
 * Reemplaza VisualNovelScene. Fondo negro + avatar Blado CSS puro.
 * Sin imágenes RPG. Avatar basado en texto/iniciales con acento rojo.
 */
import React from 'react';

interface PortfolioSceneProps {
  dialogVisible: boolean;
  onBladoClick?: () => void;
}

export default function PortfolioScene({ dialogVisible, onBladoClick }: PortfolioSceneProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: 'var(--background)',
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern sutil — corporativo */}
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
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* Viñeta radial — profundidad */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(5,5,5,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Glow rojo sutil — esquina inferior derecha */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-80px',
          right: '-60px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      {/* Avatar Blado — CSS puro */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          right: 'clamp(16px, 8vw, 120px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {dialogVisible ? (
          /* Avatar estático cuando el diálogo está abierto */
          <BladoAvatarFigure />
        ) : (
          /* Avatar clickable con hover */
          <button
            onClick={onBladoClick}
            title="Hablar con Blado"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <BladoAvatarFigure hoverable />
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                fontFamily: 'var(--font-geist-sans)',
                animation: 'status-pulse 2.5s ease-in-out infinite',
              }}
            >
              Click para interactuar
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function BladoAvatarFigure({ hoverable = false }: { hoverable?: boolean }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        transition: 'transform 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Avatar circular */}
      <div
        style={{
          width: 'clamp(100px, 14vw, 180px)',
          height: 'clamp(100px, 14vw, 180px)',
          borderRadius: '50%',
          background: 'var(--surface-2)',
          border: `2px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          boxShadow: hovered
            ? '0 0 30px var(--accent-glow), 0 0 60px rgba(225,29,72,0.1)'
            : '0 0 0px transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Iniciales */}
        <span
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: hovered ? 'var(--accent)' : 'var(--foreground)',
            fontFamily: 'var(--font-geist-sans)',
            transition: 'color 0.3s ease',
            userSelect: 'none',
          }}
        >
          AG
        </span>

        {/* Línea decorativa superior */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40%',
            height: '2px',
            background: 'var(--accent)',
            opacity: hovered ? 1 : 0.3,
            transition: 'opacity 0.3s',
          }}
        />
      </div>

      {/* Nombre */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', fontWeight: 600, color: 'var(--foreground)', margin: 0, letterSpacing: '-0.01em' }}>
          Alexis Galván
        </p>
        <p style={{ fontSize: 'clamp(10px, 1.2vw, 13px)', color: 'var(--accent)', margin: '4px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
          Blado
        </p>
      </div>
    </div>
  );
}
