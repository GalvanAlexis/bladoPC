"use client";

import React from 'react';

interface NavbarProps {
  scene: 'cave' | 'library';
  onNavigate: (key: string) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const NAV_LINKS = [
  { key: 'intro', label: 'Inicio' },
  { key: 'openSkillTree', label: 'Grimorio' },
  { key: 'projects', label: 'Proyectos' },
];

export default function Navbar({ scene, onNavigate, onToggleSidebar, sidebarOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 z-50 bg-black/70 backdrop-blur-sm border-b border-crimson/30 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-toxic transition-colors p-1"
            title={sidebarOpen ? 'Cerrar panel' : 'Abrir panel'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          </button>

          {/* Logo */}
          <span className="text-crimson font-bold text-sm uppercase tracking-widest hidden sm:inline">
            Blado_Cavern
          </span>

          {/* Divider */}
          <span className="text-gray-700 hidden sm:inline">|</span>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className="text-xs uppercase tracking-wider text-gray-400 hover:text-toxic transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Scene indicator */}
          <span className="text-xs uppercase tracking-widest text-gray-500">
            {scene === 'cave' ? 'Cueva de Blado' : 'Biblioteca Arcana'}
          </span>
          <div className={`w-2 h-2 rounded-full ${scene === 'cave' ? 'bg-crimson' : 'bg-sulfur'} shadow-[0_0_8px_var(--tw-shadow-color)]`}
            style={{ boxShadow: scene === 'cave' ? '0 0 8px rgba(220,38,38,0.8)' : '0 0 8px rgba(147,51,234,0.8)' }}
          />
        </div>
      </div>
    </nav>
  );
}
