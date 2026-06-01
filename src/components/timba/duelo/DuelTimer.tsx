import React, { useEffect, useState } from 'react';

interface DuelTimerProps {
  seconds: number;
  onTimeout: () => void;
  isActive: boolean; // Si no está activo, se queda quieto
}

export default function DuelTimer({ seconds, onTimeout, isActive }: DuelTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeLeft(seconds);
      return;
    }

    // Usamos setInterval para el countdown visual del número, 
    // la barra roja se anima vía CSS.
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (isActive && timeLeft === 0) {
      onTimeout();
    }
  }, [isActive, timeLeft, onTimeout]);

  // Colores según el tiempo (OKLCH variables)
  let barColorClass = 'bg-[oklch(0.85_0.3_145)]';
  let textColor = 'oklch(0.85 0.3 145)';
  let isUrgent = false;

  if (timeLeft <= 4 && timeLeft > 1) {
    barColorClass = 'bg-yellow-400';
    textColor = '#facc15';
  } else if (timeLeft <= 1) {
    barColorClass = 'bg-[oklch(0.55_0.25_25)]';
    textColor = 'oklch(0.55 0.25 25)';
    isUrgent = true;
  }

  return (
    <div className={`w-full flex flex-col items-center transition-all ${isUrgent ? 'timer-urgent' : ''}`}>
      <div 
        key={timeLeft} // Fuerza re-animación
        className="text-xl md:text-2xl font-bold font-mono mb-2 timer-tick drop-shadow-md" 
        style={{ color: textColor }}
      >
        {timeLeft}s
      </div>
      <div className="w-full h-2 md:h-3 bg-[#0a0a0a] overflow-hidden border border-gray-800 shadow-inner">
        {isActive ? (
          <div 
            className={`h-full ${barColorClass} timer-bar`}
            style={{ '--timer-duration': `${seconds}s` } as React.CSSProperties}
          />
        ) : (
          <div className={`h-full w-full ${barColorClass}`} />
        )}
      </div>
    </div>
  );
}
