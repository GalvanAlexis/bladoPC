"use client";

/**
 * Sidebar — ISS-048 Rebranding Portfolio Blado
 * Panel lateral de opciones — clean, corporativo.
 */
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/lib/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: 'Inicio',    path: '/' },
  { label: 'Chat Assistant',  path: '/chat' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const { animationsEnabled, setAnimationsEnabled, theme, toggleTheme } = useAppContext();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 30,
          background: 'rgba(0,0,0,0.5)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        style={{
          position: 'fixed',
          top: '56px', /* h-14 */
          left: 0,
          bottom: 0,
          width: '260px',
          zIndex: 40,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          overflowY: 'auto',
          transform: isOpen ? 'translateX(0)' : 'translateX(-260px)',
          transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}
        aria-label="Panel de navegación"
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>
            Menú
          </span>
          <button
            onClick={onClose}
            style={{ color: 'var(--muted)', lineHeight: 1, padding: '4px', borderRadius: '4px', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            aria-label="Cerrar panel"
          >
            ✕
          </button>
        </div>

        {/* Navegación — solo mobile */}
        <section className="sm:hidden" style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <p style={{ padding: '6px 20px 10px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>
            Navegación
          </p>
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              onClick={() => { onClose(); router.push(item.path); }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 20px',
                fontSize: '14px',
                color: 'var(--foreground-2)',
                background: 'transparent',
                transition: 'color 0.15s, background 0.15s',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.background = 'var(--surface-2)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--foreground-2)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {item.label}
            </button>
          ))}
        </section>

        {/* Ajustes */}
        <section style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <p style={{ padding: '6px 20px 10px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>
            Preferencias
          </p>
          <label
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '14px', color: 'var(--foreground-2)' }}>Animaciones</span>
            <button
              role="switch"
              aria-checked={animationsEnabled}
              onClick={() => setAnimationsEnabled(!animationsEnabled)}
              style={{
                position: 'relative',
                width: '36px',
                height: '20px',
                borderRadius: '99px',
                border: '1px solid',
                borderColor: animationsEnabled ? 'var(--accent)' : 'var(--border)',
                background: animationsEnabled ? 'var(--accent-dim)' : 'var(--surface-2)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: animationsEnabled ? '17px' : '2px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: animationsEnabled ? 'var(--accent)' : 'var(--muted)',
                  transition: 'all 0.2s',
                  boxShadow: animationsEnabled ? '0 0 6px var(--accent-glow)' : 'none',
                }}
              />
            </button>
          </label>
          <label
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '14px', color: 'var(--foreground-2)' }}>Tema {theme === 'dark' ? 'oscuro' : 'claro'}</span>
            <button
              onClick={toggleTheme}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted)',
                padding: '4px',
                borderRadius: '6px',
                transition: 'color 0.2s',
                display: 'flex',
                fontSize: '18px',
                lineHeight: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
            >
              {theme === 'dark' ? '\u2600' : '\u263E'}
            </button>
          </label>
        </section>

        {/* Footer */}
        <section style={{ marginTop: 'auto', padding: '16px 20px' }}>
          <a
            href="https://github.com/GalvanAlexis/bladoPC"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <span>↗</span>
            <span>GitHub del proyecto</span>
          </a>
          <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--muted)' }}>
            v1.0.0 — Portfolio Blado
          </div>
        </section>
      </aside>
    </>
  );
}
