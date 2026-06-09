"use client";

import React, { useState } from 'react';
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

  const selectedCareer = libraryData?.carreras.find(c => c.id === selectedLibraryId);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        background: 'var(--background)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        color: 'var(--foreground)',
      }}
    >
      {/* Fondo con grid sutil */}
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
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      {/* Contenido Principal */}
      <div style={{ position: 'relative', flex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>

        {/* Nivel 1: Carreras */}
        <AnimatePresence>
          {!selectedLibraryId && (
            <motion.div
              style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '96px', paddingBottom: '16px' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ position: 'absolute', top: '32px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <h1 style={{ fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)', margin: 0 }}>
                  Árbol de Habilidades
                </h1>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px', letterSpacing: '0.04em' }}>
                  Seleccioná una carrera para explorar
                </p>
              </div>

              {loading && (
                <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '80px' }}>Cargando datos...</div>
              )}
              {error && (
                <div style={{ color: 'var(--accent)', fontSize: '14px', marginTop: '80px' }}>Error al cargar: {error}</div>
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
              style={{ position: 'absolute', inset: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '2px solid var(--accent)', borderRadius: '8px', boxShadow: '0 0 60px rgba(0,0,0,0.8)', overflow: 'hidden', display: 'flex', flexDirection: 'column', zIndex: 30 }}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              layoutId={`library-${selectedLibraryId}`}
            >
              <div style={{ width: '100%', padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-2)', zIndex: 40, position: 'relative' }}>
                <h2 style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.01em', margin: 0 }}>
                  {selectedCareer.name}
                </h2>
                <button
                  onClick={() => setSelectedLibraryId(null)}
                  style={{ padding: '7px 16px', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--foreground-2)', background: 'transparent', cursor: 'pointer', fontSize: '13px', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--foreground-2)'; }}
                >
                  ← Volver
                </button>
              </div>
              
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  background: 'var(--surface)',
                  position: 'relative',
                  paddingTop: '32px',
                  paddingBottom: '80px',
                }}
                className="dialog-scrollbar"
              >
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
