"use client";

/**
 * Navbar — ISS-048 Rebranding Portfolio Blado
 * Clean, corporativo, negro/rojo. Sin referencias RPG.
 */
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const NAV_LINKS = [
  { id: 'timba',      label: 'Timba',       path: '/timba' },
  { id: 'biblioteca', label: 'Biblioteca',  path: '/biblioteca' },
];

export default function Navbar({ onToggleSidebar, sidebarOpen }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center"
      style={{
        background: 'rgba(5,5,5,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="h-full w-full px-4 sm:px-6 flex items-center justify-between">

        {/* ─── Izquierda: hamburger + logo ─── */}
        <div className="flex items-center gap-4">

          {/* Hamburger */}
          <button
            id="sidebar-toggle"
            onClick={onToggleSidebar}
            className="text-gray-500 hover:text-gray-300 transition-colors p-1 rounded"
            title={sidebarOpen ? 'Cerrar panel' : 'Abrir panel'}
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          </button>

          {/* Logotipo */}
          <a
            href="/"
            className="flex items-center gap-2 group"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="text-sm font-semibold tracking-tight select-none transition-colors group-hover:opacity-80"
              style={{ color: 'var(--foreground)' }}
            >
              Portfolio
              <span style={{ color: 'var(--accent)' }}> Blado</span>
            </span>
          </a>

          {/* Separador */}
          <div
            className="block h-4 w-px"
            style={{ background: 'var(--border)' }}
          />

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <button
                  key={link.id}
                  onClick={() => router.push(link.path)}
                  className="px-3 py-1.5 rounded text-xs font-medium tracking-wide transition-all duration-150"
                  style={{
                    color: isActive ? 'var(--foreground)' : 'var(--muted)',
                    background: isActive ? 'var(--surface-2)' : 'transparent',
                    border: isActive
                      ? '1px solid var(--border)'
                      : '1px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                    }
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Derecha: status dot + volver ─── */}
        <div className="flex items-center gap-4">
          {pathname !== '/' && (
            <button
              onClick={() => router.push('/')}
              className="text-xs transition-colors hidden sm:block"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              ← Volver
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs hidden sm:inline" style={{ color: 'var(--muted)' }}>
              Online
            </span>
            <span className="status-dot" aria-hidden="true" />
          </div>
        </div>

      </div>
    </nav>
  );
}
