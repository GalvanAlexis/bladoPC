import React from 'react';

interface DuelLightsProps {
  playerScore: number;
  bladoScore: number;
}

export default function DuelLights({ playerScore, bladoScore }: DuelLightsProps) {
  // Array de 7 elementos: [0, 1, 2, 3, 4, 5, 6]
  // 0, 1, 2 -> Jugador
  // 3 -> Central (Siempre rojo fijo para Blado, simbolizando su imbatibilidad)
  // 4, 5, 6 -> Blado

  return (
    <div className="flex justify-center items-center gap-2 mt-1 mb-1">
      {/* Luces del jugador */}
      {[1, 2, 3].map((threshold, idx) => {
        const isLit = playerScore >= threshold;
        return (
          <div 
            key={`player-light-${idx}`}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              isLit 
                ? 'bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-110' 
                : 'bg-transparent border-gray-600'
            }`}
          />
        );
      })}

      <div className="w-px h-6 bg-gray-700 mx-2" />

      {/* Luz central (4to punto de Blado) */}
      <div 
        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
          bladoScore >= 4 
            ? 'bg-crimson border-crimson shadow-[0_0_10px_rgba(220,38,38,0.8)] scale-110' 
            : 'bg-transparent border-gray-600'
        }`}
      />

      <div className="w-px h-6 bg-gray-700 mx-2" />

      {/* Luces de Blado */}
      {[1, 2, 3].map((threshold, idx) => {
        const isLit = bladoScore >= threshold;
        return (
          <div 
            key={`blado-light-${idx}`}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              isLit 
                ? 'bg-crimson border-crimson shadow-[0_0_10px_rgba(220,38,38,0.8)] scale-110' 
                : 'bg-transparent border-gray-600'
            }`}
          />
        );
      })}
    </div>
  );
}
