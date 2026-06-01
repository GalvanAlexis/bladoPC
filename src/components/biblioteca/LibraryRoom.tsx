"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LibraryUnit from './LibraryUnit';

// Mock temporal hasta la fase 3
const MOCK_LIBRARIES = [
  { id: '1 Ing Sistemas', name: 'Ingeniería en Sistemas', color: '#3b82f6', icon: '💻', yearsCount: 6 },
  { id: '2 Ing Datos', name: 'Ingeniería de Datos', color: '#9333ea', icon: '📊', yearsCount: 6 },
  { id: '3 Lic IA', name: 'Licenciatura en IA', color: '#22c55e', icon: '🧠', yearsCount: 6 },
  { id: '4 Miscelanea', name: 'Miscelánea', color: '#d97706', icon: '🔮', yearsCount: 4 },
];

export default function LibraryRoom() {
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; dx: number; dy: number; duration: number; delay: number }[]>([]);

  // Generar partículas solo en el cliente
  useEffect(() => {
    const pts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * -300,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 5
    }));
    setParticles(pts);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0a0f] overflow-hidden flex flex-col font-sans text-white z-50">
      
      {/* Fondo y Ambiente (Nivel 1: Sala RPG) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)',
          zIndex: 0
        }}
      />

      {/* Textura de suelo (solo visible abajo) */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-wood-floor opacity-40 pointer-events-none z-0" style={{ transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'bottom' }} />

      {/* Partículas de polvo flotando */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map(p => (
          <div 
            key={p.id}
            className="absolute w-1 h-1 bg-[#e8d5b0] rounded-full blur-[1px]"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${50 + Math.random() * 40}%`,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              animation: `float-dust ${p.duration}s infinite ease-in-out ${p.delay}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Antorchas animadas */}
      <div className="absolute top-20 left-10 md:left-24 w-4 h-12 bg-[#2d1b0e] rounded-b-md border-b-2 border-black z-10">
        <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-[#ffaa44] mix-blend-screen" style={{ animation: 'flicker 1.8s infinite alternate' }} />
      </div>
      <div className="absolute top-20 right-10 md:right-24 w-4 h-12 bg-[#2d1b0e] rounded-b-md border-b-2 border-black z-10">
        <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-[#ffaa44] mix-blend-screen" style={{ animation: 'flicker 2.2s infinite alternate-reverse' }} />
      </div>

      {/* Contenido Principal */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center z-20">
        
        {/* Nivel 1: La Sala (Las Bibliotecas) */}
        <AnimatePresence>
          {!selectedLibrary && (
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 md:gap-16 px-4 py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <h1 className="text-cinzel text-3xl md:text-5xl text-[#e8d5b0] font-bold tracking-widest drop-shadow-[0_0_10px_rgba(255,170,68,0.5)]">
                  El Grimorio
                </h1>
                <p className="text-crimson text-gray-400 mt-2 text-lg italic tracking-wide">
                  Elige el camino del conocimiento...
                </p>
              </div>

              {MOCK_LIBRARIES.map((lib, i) => (
                <motion.div
                  key={lib.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 100 }}
                >
                  <LibraryUnit 
                    {...lib} 
                    onClick={() => setSelectedLibrary(lib.id)} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nivel 2: Biblioteca Expandida (Fase 3 Placeholder) */}
        <AnimatePresence>
          {selectedLibrary && (
            <motion.div 
              className="absolute inset-4 md:inset-10 bg-[#16213e] border-2 border-[#e8d5b0]/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              layoutId={`library-${selectedLibrary}`}
            >
              <div className="w-full p-4 border-b border-[#e8d5b0]/20 flex items-center justify-between bg-[#0f172a]">
                <h2 className="text-cinzel text-2xl text-[#e8d5b0] font-bold">
                  {MOCK_LIBRARIES.find(l => l.id === selectedLibrary)?.name}
                </h2>
                <button 
                  onClick={() => setSelectedLibrary(null)}
                  className="px-4 py-2 border border-[#e8d5b0]/50 text-[#e8d5b0] rounded font-cinzel hover:bg-[#e8d5b0]/10 transition-colors"
                >
                  ← Volver a la Sala
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center bg-wood-floor relative">
                {/* Glow radial de la carrera */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${MOCK_LIBRARIES.find(l => l.id === selectedLibrary)?.color} 0%, transparent 60%)` }}
                />
                <p className="text-crimson text-2xl text-gray-400 italic">
                  (El contenido de los estantes se cargará en la Fase 3)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
