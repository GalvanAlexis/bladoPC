import React from 'react';

interface DuelLightsProps {
  playerScore: number;
  bladoScore: number;
}

export default function DuelLights({ playerScore, bladoScore }: DuelLightsProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-1 mb-1 relative z-20">
      {/* Luces del jugador */}
      {[1, 2, 3].map((threshold, idx) => {
        const isLit = playerScore >= threshold;
        return (
          <div 
            key={`player-light-${idx}`}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              isLit 
                ? 'duel-light-toxic scale-110' 
                : 'bg-transparent border-gray-800'
            }`}
          />
        );
      })}

      {/* Separador con gradiente oklch */}
      <div 
        className="w-px h-6 mx-2" 
        style={{
          background: 'linear-gradient(to bottom, transparent, oklch(0.85 0.3 145 / 0.5) 50%, transparent)'
        }}
      />

      {/* Luz central (4to punto de Blado) */}
      <div 
        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
          bladoScore >= 4 
            ? 'duel-light-crimson scale-110' 
            : 'bg-transparent border-gray-800'
        }`}
      />

      {/* Separador con gradiente oklch */}
      <div 
        className="w-px h-6 mx-2" 
        style={{
          background: 'linear-gradient(to bottom, transparent, oklch(0.55 0.25 25 / 0.5) 50%, transparent)'
        }}
      />

      {/* Luces de Blado */}
      {[1, 2, 3].map((threshold, idx) => {
        const isLit = bladoScore >= threshold;
        return (
          <div 
            key={`blado-light-${idx}`}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              isLit 
                ? 'duel-light-crimson scale-110' 
                : 'bg-transparent border-gray-800'
            }`}
          />
        );
      })}
    </div>
  );
}
