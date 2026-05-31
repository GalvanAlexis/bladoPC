import React from 'react';

interface ScoreBoardProps {
  playerName: string;
  playerScore: number;
  bladoScore: number;
}

export default function ScoreBoard({ playerName, playerScore, bladoScore }: ScoreBoardProps) {
  return (
    <div className="w-full flex items-center justify-between border-2 border-crimson/50 bg-[#0a0a0a] p-4 shadow-[0_0_20px_rgba(220,38,38,0.2)] relative">
      <div className="absolute top-1 left-0 w-full text-center text-[10px] text-gray-500 tracking-[0.3em]">DUELOS GANADOS</div>
      {/* Jugador */}
      <div className="flex flex-col items-center flex-1">
        <h2 className="text-gray-400 text-xs uppercase tracking-widest mb-1">{playerName}</h2>
        <div className="text-3xl font-bold text-toxic drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">
          {playerScore}
        </div>
      </div>

      {/* Centro */}
      <div className="flex-shrink-0 px-4 flex flex-col items-center">
        <span className="text-2xl mb-1 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">⚔️</span>
        <span className="text-xs text-gray-600 uppercase tracking-widest font-bold">VS</span>
      </div>

      {/* Blado */}
      <div className="flex flex-col items-center flex-1">
        <h2 className="text-crimson text-xs uppercase tracking-widest mb-1 font-bold">Blado</h2>
        <div className="text-3xl font-bold text-crimson drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">
          {bladoScore}
        </div>
      </div>
    </div>
  );
}
