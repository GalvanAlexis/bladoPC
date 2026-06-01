import React from 'react';
import { motion } from 'framer-motion';

interface LibraryUnitProps {
  id: string;
  name: string;
  color: string;
  icon: string;
  yearsCount: number;
  onClick?: () => void;
  selected?: boolean;
  isActive?: boolean;
}

export default function LibraryUnit({ id, name, color, icon, yearsCount, onClick, selected, isActive }: LibraryUnitProps) {
  return (
    <motion.div 
      className={`relative w-48 h-80 flex flex-col cursor-pointer select-none group transition-all duration-300 ${selected ? 'z-50' : 'z-10'}`}
      onClick={onClick}
      whileHover={!selected ? { y: -6, scale: 1.02 } : {}}
      layoutId={`library-${id}`}
    >
      {/* Sombra de perspectiva inferior */}
      <div className="absolute -bottom-4 left-4 right-0 h-8 bg-black/60 blur-md rounded-[100%] transition-opacity group-hover:opacity-100 opacity-50" />
      
      {/* Estructura Principal de la Biblioteca */}
      <div 
        className="relative flex-1 bg-[#2d1b0e] border-t-8 border-l-8 border-r-8 border-b-8 border-[#3d2415] rounded-t-xl overflow-hidden shadow-2xl transition-all"
        style={{ 
          boxShadow: `inset 0 0 40px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)`,
          borderColor: color ? `color-mix(in srgb, ${color} 30%, #3d2415)` : undefined,
          '--career-color': color,
          animation: isActive ? 'carousel-glow-active 3s infinite' : 'none'
        } as React.CSSProperties}
      >
        {/* Adorno superior central */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#1a0f08] border-b-4 border-l-4 border-r-4 border-[#3d2415] rounded-b-full flex items-center justify-center z-20">
          <span className="text-xl drop-shadow-md">{icon}</span>
        </div>

        {/* Glow interior de magia */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
        />

        {/* Estantes simulados */}
        <div className="absolute top-10 bottom-2 left-2 right-2 flex flex-col justify-evenly z-10">
          {Array.from({ length: Math.max(1, yearsCount) }).map((_, i) => (
            <div key={i} className="relative w-full h-[2px] bg-[#1a0f08]">
              {/* Sombra bajo el estante */}
              <div className="absolute top-full left-0 right-0 h-4 bg-gradient-to-b from-black/60 to-transparent" />
              
              {/* Libros falsos (placeholders) */}
              <div className="absolute bottom-full left-0 right-0 h-10 flex items-end px-2 gap-[2px]">
                {Array.from({ length: 3 + (i % 3) }).map((_, j) => (
                  <div 
                    key={j} 
                    className="w-3 rounded-t-sm border border-black/40"
                    style={{ 
                      height: `${60 + (j % 2) * 20}%`,
                      backgroundColor: (i + j) % 2 === 0 ? color : 'color-mix(in srgb, var(--book-color, #fff) 50%, #4a4040)',
                      opacity: 0.6 + (j % 3) * 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zócalo / Título Inferior */}
      <div 
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-11/12 bg-[#1a0f08] border-2 border-[#3d2415] rounded-md py-2 px-1 text-center shadow-lg transform transition-transform group-hover:scale-105 z-30"
        style={{ borderColor: `color-mix(in srgb, ${color} 50%, #3d2415)` }}
      >
        <h3 className="text-cinzel text-[#e8d5b0] text-sm md:text-base font-bold tracking-wider leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {name}
        </h3>
      </div>
    </motion.div>
  );
}
