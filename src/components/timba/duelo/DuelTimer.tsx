import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  // Colores según el tiempo
  let barColor = 'bg-toxic';
  if (timeLeft === 2) barColor = 'bg-yellow-400';
  if (timeLeft <= 1) barColor = 'bg-crimson';

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-xl font-bold font-mono mb-2" style={{ color: timeLeft <= 1 ? '#dc2626' : (timeLeft === 2 ? '#facc15' : '#39ff14') }}>
        {timeLeft}s
      </div>
      <div className="w-full h-2 bg-gray-900 overflow-hidden border border-gray-800">
        <motion.div 
          className={`h-full ${barColor}`}
          initial={{ width: '100%' }}
          animate={isActive ? { width: '0%' } : { width: '100%' }}
          transition={{ duration: isActive ? seconds : 0, ease: "linear" }}
        />
      </div>
    </div>
  );
}
