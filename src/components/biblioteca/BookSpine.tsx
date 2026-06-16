import React from 'react';
import { motion } from 'framer-motion';
import { BookData, CarreraData } from '@/lib/libraryTypes';

interface BookSpineProps {
  book: BookData;
  career: CarreraData;
  onClick: () => void;
}

export default function BookSpine({ book, career, onClick }: BookSpineProps) {
  const isLocked = book.status === 'locked';
  const isCompleted = book.status === 'completed';
  const isProgress = book.status === 'progress';
  const isInteractable = book.hasContent;

  // Extraer un color base para el glow del estado completed/progress
  const baseColor = career.color; 
  
  // Color del libro usando colorIndex y los colores predefinidos según CSS o inline
  // Para simplificar, usaremos inline styles simulando variaciones
  const bookColor = `color-mix(in srgb, ${baseColor} ${70 + (book.colorIndex % 4) * 10}%, black)`;

  return (
    <motion.div
      onClick={isInteractable ? onClick : undefined}
      whileHover={isInteractable ? { y: -10, scale: 1.05 } : {}}
      title={isInteractable ? `${book.fullName}${isLocked ? ' (planificado)' : ''}` : `Sin contenido: ${book.fullName}`}
      className={`relative w-10 h-32 rounded-sm cursor-${isInteractable ? 'pointer' : 'not-allowed'} flex items-center justify-center transition-all z-20 group`}
      style={{
        backgroundColor: isLocked 
          ? (isInteractable ? `color-mix(in srgb, #2a2a2a 80%, ${baseColor})` : '#2a2a2a')
          : bookColor,
        border: '1px solid rgba(0,0,0,0.5)',
        '--book-color': baseColor,
      } as React.CSSProperties}
    >
      {/* Glow según estado */}
      {isCompleted && (
        <div className="absolute inset-0 pointer-events-none opacity-80" style={{ animation: 'glow-pulse 2.5s ease-in-out infinite' }} />
      )}
      
      {isProgress && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{ 
            background: `linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s linear infinite'
          }} 
        />
      )}

      {/* Sombra de relieve interior */}
      <div className="absolute inset-x-1 top-1 h-2 border-t border-white/20 rounded-t-sm pointer-events-none" />
      <div className="absolute inset-x-1 bottom-1 h-2 border-b border-black/40 rounded-b-sm pointer-events-none" />
      
      {/* Detalles del lomo (líneas horizontales) */}
      <div className="absolute top-4 w-full h-[1px] bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
      <div className="absolute top-5 w-full h-[1px] bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
      <div className="absolute bottom-5 w-full h-[1px] bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
      <div className="absolute bottom-4 w-full h-[1px] bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />

      {/* Texto del título en vertical */}
      <span 
        className={`text-crimson text-xs whitespace-nowrap overflow-hidden px-2 z-10 select-none ${isLocked ? 'text-[#4a4040]' : 'text-[#e8d5b0]'} font-bold tracking-widest`}
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {book.name}
      </span>
    </motion.div>
  );
}
