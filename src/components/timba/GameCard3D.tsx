"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GameEntry, TAG_COLORS } from '@/lib/games';
import TagBadge from './TagBadge';

interface GameCard3DProps {
  game: GameEntry;
  isSelected: boolean;
  onClick: () => void;
  offset: number;
  isMobile: boolean;
}

export default function GameCard3D({ game, isSelected, onClick, offset, isMobile }: GameCard3DProps) {
  const primaryTag = game.tags[0];
  const color = game.accentColor || TAG_COLORS[primaryTag] || '#888';

  const desktopAnim = {
    rotateX: offset * -18,
    y: offset * 120,
    z: -Math.abs(offset) * 80,
    scale: 1 - Math.abs(offset) * 0.08,
    opacity: Math.max(0, 1 - Math.abs(offset) * 0.3),
  };

  const mobileAnim = {
    x: offset * 280,
    scale: isSelected ? 1 : 0.9,
    opacity: isSelected ? 1 : 0.5,
  };

  return (
    <motion.div
      onClick={onClick}
      className={`
        ${isMobile ? 'absolute top-0 left-1/2 -ml-[130px] w-[260px]' : 'absolute inset-0'}
        h-[160px] rounded-lg cursor-pointer overflow-hidden
        flex flex-col p-4 border bg-black/80
        transition-colors duration-300
        ${!game.available ? 'grayscale opacity-75' : ''}
      `}
      animate={{
        ...(isMobile ? mobileAnim : desktopAnim),
        boxShadow: isSelected ? `0 0 20px ${color}80, inset 0 0 10px ${color}40` : 'none',
        borderColor: isSelected ? color : `${color}40`,
      }}
      initial={false}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ scale: isSelected ? 1 : 1.03 }}
      style={{
        transformStyle: isMobile ? 'flat' : 'preserve-3d',
        zIndex: 100 - Math.abs(offset),
        display: (!isMobile && Math.abs(offset) > 3) ? 'none' : 'flex'
      }}
    >
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-mono font-bold text-lg text-white truncate drop-shadow-md">
          {game.title}
        </h3>
        
        <p className="font-mono text-xs text-gray-400 line-clamp-2">
          {game.shortDesc}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {game.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {!game.available && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
          <div className="bg-crimson text-white text-xs font-bold px-3 py-1 -rotate-12 border border-black shadow-xl">
            PRÓXIMAMENTE
          </div>
        </div>
      )}
    </motion.div>
  );
}
