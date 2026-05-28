"use client";

/**
 * Navbar — ISS-019
 * Botones: Intro (replay), Timba (próximamente), Cebar Mate (próximamente)
 */
import React from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  scene: 'cave' | 'library';
  onReplayIntro: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const NAV_BUTTONS = [
  {
    id: 'intro',
    label: 'Intro',
    available: true,
    title: 'Reproducir presentación',
  },
  {
    id: 'timba',
    label: 'Timba',
    available: true,
    title: 'Ir a la Timba',
  },
  {
    id: 'cebar-mate',
    label: 'Cebar Mate',
    available: true,
    title: 'Ir a Cebar Mate',
  },
];

export default function Navbar({ scene, onReplayIntro, onToggleSidebar, sidebarOpen }: NavbarProps) {
  const router = useRouter();

  const handleClick = (id: string) => {
    if (id === 'intro') onReplayIntro();
    if (id === 'timba') router.push('/timba');
    if (id === 'cebar-mate') router.push('/cebar-mate');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 z-50 bg-black/75 backdrop-blur-sm border-b border-crimson/30 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
      <div className="h-full px-4 flex items-center justify-between">

        {/* ─── Izquierda: hamburger + logo + nav buttons ─── */}
        <div className="flex items-center gap-4">

          {/* Hamburger */}
          <button
            onClick={onToggleSidebar}
            className="text-gray-500 hover:text-toxic transition-colors p-1 rounded"
            title={sidebarOpen ? 'Cerrar panel' : 'Abrir panel'}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          </button>

          {/* Logo */}
          <span className="text-crimson font-bold text-sm uppercase tracking-widest font-mono hidden sm:inline select-none">
            Blado_Cavern
          </span>

          {/* Separador */}
          <span className="text-gray-800 hidden sm:inline">|</span>

          {/* Nav buttons */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_BUTTONS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleClick(btn.id)}
                disabled={!btn.available}
                title={btn.title}
                className={`
                  px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider
                  transition-all duration-200 border
                  ${btn.available
                    ? 'text-gray-400 border-transparent hover:text-toxic hover:border-toxic/40 hover:bg-toxic/5'
                    : 'text-gray-700 border-transparent cursor-not-allowed opacity-50'
                  }
                `}
              >
                {btn.label}
                {!btn.available && (
                  <span className="ml-1 text-[10px] text-gray-700 normal-case tracking-normal">
                    ✦
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Derecha: indicador de escena ─── */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-widest text-gray-600 font-mono hidden sm:inline">
            {scene === 'cave' ? 'Cueva de Blado' : 'Biblioteca Arcana'}
          </span>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: scene === 'cave' ? '#dc2626' : '#9333ea',
              boxShadow: scene === 'cave'
                ? '0 0 8px rgba(220,38,38,0.8)'
                : '0 0 8px rgba(147,51,234,0.8)',
            }}
          />
        </div>

      </div>
    </nav>
  );
}
