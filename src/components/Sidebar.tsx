"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCareer: string;
  selectedYear: number | null;
  availableCareers: string[];
  availableYears: number[];
  onSelectCareer: (career: string) => void;
  onSelectYear: (year: number | null) => void;
  onNavigate: (key: string) => void;
  onReplayIntro: () => void;
}

const NAV_ITEMS = [
  { key: 'intro', label: 'Inicio' },
  { key: 'whoAmI', label: 'Perfil de Blado' },
  { key: 'openSkillTree', label: 'Habilidades (Skill Tree)' },
  { key: 'projects', label: 'Proyectos' },
  { key: 'askFree', label: 'Chat con Blado' },
];

export default function Sidebar({ isOpen, onClose, selectedCareer, selectedYear, availableCareers, availableYears, onSelectCareer, onSelectYear, onNavigate, onReplayIntro }: SidebarProps) {
  const handleNavigate = (key: string) => {
    onNavigate(key);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/40"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-14 left-0 bottom-0 w-64 z-40 bg-black/90 backdrop-blur-md border-r border-gray-800 overflow-y-auto"
          >
            <div className="p-4">
              {/* Navigation */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-3 font-mono">Navegacion</h3>
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleNavigate(item.key)}
                      className="text-left px-3 py-2 text-sm text-gray-400 hover:text-toxic hover:bg-gray-800/50 rounded transition-colors font-mono"
                    >
                      {item.label}
                    </button>
                  ))}
                  {/* Intro replay */}
                  <button
                    onClick={() => { onClose(); onReplayIntro(); }}
                    className="text-left px-3 py-2 text-sm text-gray-400 hover:text-toxic hover:bg-gray-800/50 rounded transition-colors font-mono"
                  >
                    Intro
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-3 font-mono">Grimorio - Filtros</h3>
                
                {/* Career filter */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-mono">Carrera</p>
                  <div className="flex flex-wrap gap-1">
                    {availableCareers.map((c) => (
                      <button
                        key={c}
                        onClick={() => onSelectCareer(c)}
                        className={`px-2 py-1 rounded text-xs transition-colors font-mono border
                          ${selectedCareer === c
                            ? 'bg-sulfur/20 text-sulfur border-sulfur'
                            : 'bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700 hover:text-gray-300'
                          }`}
                      >
                        {c.replace(/^\d\s/, '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year filter */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-mono">Ano</p>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => onSelectYear(null)}
                      className={`px-2 py-1 rounded text-xs transition-colors font-mono border
                        ${selectedYear === null
                          ? 'bg-toxic/20 text-toxic border-toxic'
                          : 'bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700 hover:text-gray-300'
                        }`}
                    >
                      Todos
                    </button>
                    {availableYears.map((y) => (
                      <button
                        key={y}
                        onClick={() => onSelectYear(y)}
                        className={`px-2 py-1 rounded text-xs transition-colors font-mono border
                          ${selectedYear === y
                            ? 'bg-toxic/20 text-toxic border-toxic'
                            : 'bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700 hover:text-gray-300'
                          }`}
                      >
                        Ano {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
