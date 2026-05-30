"use client";

import React, { useEffect, useState } from 'react';
import { GameEntry } from '@/lib/games';
import GameCard3D from './GameCard3D';

interface GameCarousel3DProps {
  games: GameEntry[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function GameCarousel3D({ games, selectedIndex, onSelect }: GameCarousel3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        onSelect(Math.max(0, selectedIndex - 1));
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        onSelect(Math.min(games.length - 1, selectedIndex + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onSelect, games.length]);

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const dx = touchEnd.x - touchStart.x;
    const dy = touchEnd.y - touchStart.y;
    
    if (isMobile) {
      if (Math.abs(dx) > 50) {
        if (dx > 0) onSelect(Math.max(0, selectedIndex - 1));
        else onSelect(Math.min(games.length - 1, selectedIndex + 1));
      }
    } else {
      if (Math.abs(dy) > 50) {
        if (dy > 0) onSelect(Math.max(0, selectedIndex - 1));
        else onSelect(Math.min(games.length - 1, selectedIndex + 1));
      }
    }
    setTouchStart(null);
  };

  return (
    <div 
      className={`w-full h-full flex items-center justify-center ${isMobile ? 'overflow-hidden px-4' : ''}`}
      style={{ perspective: isMobile ? 'none' : '1200px' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={`relative ${isMobile ? 'w-full h-[160px]' : 'w-full max-w-[280px] h-[160px]'}`}>
        {games.map((game, i) => {
          const offset = i - selectedIndex;
          if (isMobile && Math.abs(offset) > 2) return null;
          
          return (
            <GameCard3D 
              key={game.id} 
              game={game} 
              isSelected={i === selectedIndex} 
              onClick={() => onSelect(i)} 
              offset={offset} 
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </div>
  );
}
