"use client";

/**
 * Sidebar — ISS-019
 * Panel lateral de opciones y ajustes. Sin filtros de Grimorio ni nav items.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Toggles de ajustes visuales (placeholder para features futuras)
  const [particles, setParticles] = useState(true);
  const [animations, setAnimations] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-14 left-0 bottom-0 w-64 z-40 bg-black/95 backdrop-blur-md border-r border-gray-800/60 overflow-y-auto"
          >
            <div className="p-5 flex flex-col gap-6">

              {/* ─── Header ─── */}
              <div className="flex items-center justify-between">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 font-mono">
                  ⚙ Opciones
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-700 hover:text-gray-400 transition-colors text-lg leading-none"
                  aria-label="Cerrar panel"
                >
                  ✕
                </button>
              </div>

              {/* ─── Ajustes Visuales ─── */}
              <section>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-700 mb-3 font-mono">
                  Ajustes Visuales
                </h3>
                <div className="flex flex-col gap-3">

                  {/* Toggle Partículas */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-gray-500 font-mono group-hover:text-gray-300 transition-colors">
                      Partículas
                    </span>
                    <button
                      role="switch"
                      aria-checked={particles}
                      onClick={() => setParticles(p => !p)}
                      className={`relative w-10 h-5 rounded-full border transition-colors duration-200
                        ${particles
                          ? 'bg-toxic/20 border-toxic/50'
                          : 'bg-gray-800 border-gray-700'
                        }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200
                          ${particles
                            ? 'left-5 bg-toxic shadow-[0_0_6px_rgba(57,255,20,0.6)]'
                            : 'left-0.5 bg-gray-600'
                          }`}
                      />
                    </button>
                  </label>

                  {/* Toggle Animaciones */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-gray-500 font-mono group-hover:text-gray-300 transition-colors">
                      Animaciones
                    </span>
                    <button
                      role="switch"
                      aria-checked={animations}
                      onClick={() => setAnimations(a => !a)}
                      className={`relative w-10 h-5 rounded-full border transition-colors duration-200
                        ${animations
                          ? 'bg-toxic/20 border-toxic/50'
                          : 'bg-gray-800 border-gray-700'
                        }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200
                          ${animations
                            ? 'left-5 bg-toxic shadow-[0_0_6px_rgba(57,255,20,0.6)]'
                            : 'left-0.5 bg-gray-600'
                          }`}
                      />
                    </button>
                  </label>

                </div>
              </section>

              {/* Divisor */}
              <div className="border-t border-gray-800/60" />

              {/* ─── Sobre esta web ─── */}
              <section>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-700 mb-3 font-mono">
                  Sobre esta web
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/GalvanAlexis/Progresos-Academicos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-500 hover:text-toxic hover:bg-gray-800/40 transition-colors font-mono"
                  >
                    <span>→</span>
                    <span>GitHub del proyecto</span>
                  </a>
                  <div className="px-3 py-1 text-[11px] text-gray-700 font-mono">
                    v0.1.0 — Blado_Cavern
                  </div>
                </div>
              </section>

            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
