"use client";

/**
 * BladoAvatar — ISS-048 Rebranding
 * Loading screen corporativo. Sin imagen RPG.
 */
import React from 'react';

interface BladoAvatarProps {
  message?: string;
}

export default function BladoAvatar({ message = "Cargando..." }: BladoAvatarProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background)',
        gap: '32px',
      }}
    >
      {/* Logo / Avatar */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          border: '2px solid var(--accent)',
          background: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 24px var(--accent-glow)',
          animation: 'status-pulse 2s ease-in-out infinite',
        }}
      >
        <span
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--foreground)',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-geist-sans)',
            userSelect: 'none',
          }}
        >
          AG
        </span>
      </div>

      {/* Mensaje */}
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            fontFamily: 'var(--font-geist-sans)',
            letterSpacing: '0.02em',
          }}
        >
          {message}
        </p>

        {/* Dots loader */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'block',
                animation: `status-pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
