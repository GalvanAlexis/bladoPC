import React from 'react';

interface DuelResultProps {
  playerScore: number;
  bladoScore: number;
  onRematch: () => void;
  onViewTrophies: () => void;
}

export default function DuelResult({ playerScore, bladoScore, onRematch, onViewTrophies }: DuelResultProps) {
  const isWinner = playerScore >= 4;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center bg-[#0a0a0a] border-2 border-crimson p-8 shadow-[0_0_40px_rgba(220,38,38,0.3)]">
      <h2 className="text-4xl font-bold text-crimson mb-2 uppercase tracking-widest text-center">
        {isWinner ? "¡Has Ganado!" : "Derrota Aplastante"}
      </h2>
      <div className="text-2xl font-bold text-gray-400 mb-8 font-mono">
        {playerScore} - {bladoScore}
      </div>

      <div className="w-32 h-32 border-4 border-crimson bg-[#110000] flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] mb-6 animate-pulse">
        <span className="text-6xl">😈</span>
      </div>

      <p className="text-red-100 text-center italic mb-8 max-w-lg leading-relaxed text-lg bg-crimson/10 p-4 border border-crimson/30">
        &quot;{isWinner 
          ? "¡Imposible! Esto debe ser un bug en la matrix..." 
          : "Jeje... buen duelo, mortal. ¿Ya quieres irte con mamá? Intenta de nuevo... seguro aprendiste cosas nuevas."}&quot;
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full px-8">
        <button 
          onClick={onRematch}
          className="flex-1 bg-crimson hover:bg-red-700 text-white font-bold py-3 uppercase tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-colors"
        >
          Revancha
        </button>
        <button 
          onClick={onViewTrophies}
          className="flex-1 border border-gray-700 text-gray-400 hover:border-white hover:text-white font-bold py-3 uppercase tracking-widest transition-colors"
        >
          Colección
        </button>
      </div>
    </div>
  );
}
