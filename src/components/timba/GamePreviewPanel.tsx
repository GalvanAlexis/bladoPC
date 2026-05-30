"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameEntry, TAG_COLORS } from '@/lib/games';
import BladoGameQuote from './BladoGameQuote';
import CRTOverlay from './CRTOverlay';
import Link from 'next/link';

interface GamePreviewPanelProps {
  game: GameEntry;
}

export default function GamePreviewPanel({ game }: GamePreviewPanelProps) {
  const primaryTag = game.tags[0];
  const color = game.accentColor || TAG_COLORS[primaryTag] || '#888';

  return (
    <div className="w-full h-full flex flex-col pt-4 md:pt-8 pb-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={game.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex-1 flex flex-col gap-4 md:gap-6 w-full max-w-2xl mx-auto h-full"
        >
          {/* GIF Preview Container */}
          <motion.div 
            className="flex-1 min-h-0 relative rounded-xl overflow-hidden bg-black/50 border-2 flex items-center justify-center shrink"
            style={{ borderColor: `${color}80` }}
            animate={{
              boxShadow: [`0 0 10px ${color}40`, `0 0 30px ${color}80`, `0 0 10px ${color}40`],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img 
              src={game.previewGif} 
              alt={game.title}
              className={`w-full h-full object-cover ${!game.available ? 'grayscale opacity-60' : ''}`}
            />
            <CRTOverlay />
          </motion.div>

          {/* Blado Quote */}
          <BladoGameQuote quote={game.bladoQuote} />

          {/* Action Button */}
          <div className="flex justify-center mt-auto shrink-0">
            <Link
              href={game.available ? game.href : '#'}
              className={`
                px-8 py-3 rounded uppercase tracking-widest font-bold font-mono transition-all duration-300
                border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]
                ${game.available 
                  ? 'hover:scale-105 hover:bg-black/50 hover:shadow-xl bg-black/30'
                  : 'opacity-50 cursor-not-allowed bg-black/80'
                }
              `}
              style={{
                color: game.available ? color : '#888',
                borderColor: game.available ? color : '#555',
                boxShadow: game.available ? `0 0 15px ${color}40, inset 0 0 10px ${color}20` : 'none',
              }}
              onClick={(e) => {
                if (!game.available) e.preventDefault();
              }}
            >
              {game.available ? 'Jugar' : 'Próximamente'}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
