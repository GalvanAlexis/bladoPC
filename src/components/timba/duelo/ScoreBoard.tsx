import React from 'react';

interface ScoreBoardProps {
  playerName: string;
  playerScore: number;
  bladoScore: number;
}

export default function ScoreBoard({ playerName, playerScore, bladoScore }: ScoreBoardProps) {
  return (
    <div className="absolute top-2 right-2 md:top-4 md:right-4 text-[10px] md:text-xs font-mono tracking-widest text-gray-400 z-50 bg-[#0a0a0a]/90 px-3 py-2 border border-gray-800 rounded shadow-md">
      <span className="text-white uppercase">{playerName}</span>{' '}
      <span className="text-toxic">{playerScore}</span> /{' '}
      <span className="text-crimson font-bold">{bladoScore}</span>{' '}
      <span className="text-crimson font-bold uppercase">Blado</span>
    </div>
  );
}
