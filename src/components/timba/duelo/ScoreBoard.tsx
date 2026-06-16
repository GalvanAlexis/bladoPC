import React, { useEffect, useState } from 'react';

interface ScoreBoardProps {
  playerName: string;
  playerScore: number;
  bladoScore: number;
}

export default function ScoreBoard({ playerName, playerScore, bladoScore }: ScoreBoardProps) {
  const [pChanged, setPChanged] = useState(false);
  const [bChanged, setBChanged] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPChanged(true);
      setTimeout(() => setPChanged(false), 300);
    }, 0);
    return () => clearTimeout(timer);
  }, [playerScore]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBChanged(true);
      setTimeout(() => setBChanged(false), 300);
    }, 0);
    return () => clearTimeout(timer);
  }, [bladoScore]);

  return (
    <div 
      className="text-xs md:text-sm font-mono tracking-widest text-gray-300 z-50 px-4 py-2 flex items-center gap-3 relative shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(10,10,10,0.95), rgba(5,5,5,0.98))',
        borderImage: 'linear-gradient(to right, oklch(0.85 0.3 145), oklch(0.55 0.25 25)) 1',
        borderWidth: '2px',
        borderStyle: 'solid',
        backdropFilter: 'blur(4px)'
      }}
    >
      <span 
        className="uppercase font-bold" 
        style={{ color: 'oklch(0.85 0.3 145)', textShadow: '0 0 8px oklch(0.85 0.3 145 / 0.5)' }}
      >
        {playerName}
      </span>
      
      <span 
        key={`p-${playerScore}`}
        className={`text-white font-bold text-lg inline-block ${pChanged ? 'score-value-pop' : ''}`}
      >
        {playerScore}
      </span> 
      
      <span className="text-gray-600 font-bold mx-1">/</span>
      
      <span 
        key={`b-${bladoScore}`}
        className={`text-white font-bold text-lg inline-block ${bChanged ? 'score-value-pop' : ''}`}
      >
        {bladoScore}
      </span> 
      
      <span 
        className="uppercase font-bold" 
        style={{ color: 'oklch(0.55 0.25 25)', textShadow: '0 0 8px oklch(0.55 0.25 25 / 0.5)' }}
      >
        Blado
      </span>
    </div>
  );
}
