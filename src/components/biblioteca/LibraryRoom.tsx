"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LibraryUnit from './LibraryUnit';
import LibraryShelf from './LibraryShelf';
import BookViewer from './BookViewer';
import { useLibraryData } from '@/hooks/useLibraryData';
import { useIsMobile } from '@/hooks/useIsMobile';
import { BookData, YearData } from '@/lib/libraryTypes';

export default function LibraryRoom() {
  const { data: libraryData, loading, error } = useLibraryData();
  const isMobile = useIsMobile(768);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedLibraryId, setSelectedLibraryId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<{ book: BookData, year: YearData } | null>(null);
  const [particles, setParticles] = useState<{ id: number; dx: number; dy: number; duration: number; delay: number; left: number; top: number }[]>([]);

  // Encontrar la carrera seleccionada de los datos reales
  const selectedCareer = libraryData?.carreras.find(c => c.id === selectedLibraryId);

  // Generar partículas solo en el cliente
  useEffect(() => {
    const pts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 200,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      left: 10 + Math.random() * 80,
      top: 50 + Math.random() * 40
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
              left: `${p.left}%`,
              top: `${p.top}%`,
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
          {!selectedLibraryId && (
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

              {loading && (
                <div className="text-[#e8d5b0] text-xl font-cinzel mt-20">Desempolvando tomos antiguos...</div>
              )}
              {error && (
                <div className="text-red-500 text-xl font-cinzel mt-20">Error al leer los registros: {error}</div>
              )}

              {!loading && !error && libraryData && (
                isMobile ? (
                  <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden mt-10">
                    <motion.div
                      className="w-full h-full relative"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        const len = libraryData.carreras.length;
                        if (info.offset.x < -40 && activeIndex < len - 1) setActiveIndex(i => i + 1);
                        else if (info.offset.x > 40 && activeIndex > 0) setActiveIndex(i => i - 1);
                      }}
                    >
                      {libraryData.carreras.map((career, i) => {
                        const offset = i - activeIndex;
                        const scale = offset === 0 ? 1 : 0.7;
                        // Use string percentage for x to handle different screen sizes safely
                        const x = offset === 0 ? '-50%' : (offset > 0 ? '20%' : '-120%');
                        const rotateY = offset === 0 ? 0 : (offset > 0 ? -25 : 25);
                        const opacity = Math.abs(offset) <= 1 ? (offset === 0 ? 1 : 0.45) : 0;
                        const zIndex = 10 - Math.abs(offset);

                        return (
                          <motion.div
                            key={career.id}
                            className="absolute top-10 left-1/2"
                            initial={false}
                            animate={{ x, scale, rotateY, opacity, zIndex }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            style={{ perspective: 1200 }}
                          >
                            <div className={offset === 0 ? 'pointer-events-auto' : 'pointer-events-none'}>
                              <LibraryUnit 
                                id={career.id}
                                name={career.name}
                                color={career.color}
                                icon={career.icon}
                                yearsCount={career.years.length}
                                onClick={() => offset === 0 ? setSelectedLibraryId(career.id) : setActiveIndex(i)} 
                                isActive={offset === 0}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Dots paginadores */}
                    <div className="absolute bottom-2 left-0 w-full flex justify-center items-center gap-4 z-20">
                      {libraryData.carreras.map((career, i) => (
                        <button
                          key={`dot-${career.id}`}
                          onClick={() => setActiveIndex(i)}
                          className="w-3 h-3 rounded-full transition-all duration-300 shadow-[0_0_0_currentColor]"
                          style={{
                            backgroundColor: i === activeIndex ? career.color : '#4a4040',
                            color: career.color, // For the currentColor in box-shadow
                            animation: i === activeIndex ? 'dot-pulse 2s infinite' : 'none',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 w-full mt-10">
                    {libraryData.carreras.map((career, i) => (
                      <motion.div
                        key={career.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 100 }}
                      >
                        <LibraryUnit 
                          id={career.id}
                          name={career.name}
                          color={career.color}
                          icon={career.icon}
                          yearsCount={career.years.length}
                          onClick={() => setSelectedLibraryId(career.id)} 
                        />
                      </motion.div>
                    ))}
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nivel 2: Biblioteca Expandida (Fase 3 Placeholder) */}
        <AnimatePresence>
          {selectedLibraryId && selectedCareer && (
            <motion.div 
              className="absolute inset-4 md:inset-10 bg-[#16213e] border-2 border-[#e8d5b0]/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-30"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              layoutId={`library-${selectedLibraryId}`}
            >
              <div className="w-full p-4 border-b border-[#e8d5b0]/20 flex items-center justify-between bg-[#0f172a] shadow-lg z-40 relative">
                <h2 className="text-cinzel text-2xl text-[#e8d5b0] font-bold drop-shadow-md">
                  {selectedCareer.name}
                </h2>
                <button 
                  onClick={() => setSelectedLibraryId(null)}
                  className="px-4 py-2 border border-[#e8d5b0]/50 text-[#e8d5b0] rounded font-cinzel hover:bg-[#e8d5b0]/10 transition-colors shadow-sm"
                >
                  ← Volver a la Sala
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto bg-wood-floor relative dialog-scrollbar pt-8 pb-20">
                {/* Glow radial de la carrera */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
                  style={{ background: `radial-gradient(circle at center, ${selectedCareer.color} 0%, transparent 60%)` }}
                />
                
                {/* Estantes renderizados */}
                <div className="relative z-10 flex flex-col items-center">
                  {selectedCareer.years.map(year => (
                    <LibraryShelf 
                      key={year.year} 
                      year={year} 
                      career={selectedCareer} 
                      onBookClick={(book) => {
                        setSelectedBook({ book, year });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Nivel 3: El Libro Abierto (Visor) */}
              <AnimatePresence>
                {selectedBook && (
                  <BookViewer 
                    book={selectedBook.book}
                    career={selectedCareer}
                    year={selectedBook.year}
                    onClose={() => setSelectedBook(null)}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
