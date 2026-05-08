"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BladoAvatarProps {
  message?: string;
  pose?: 'base' | 'phone' | 'trono';
}

export default function BladoAvatar({ message = "¡Mortal! ¿Vienes a evaluar mis poderes técnicos?", pose = 'base' }: BladoAvatarProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Fallback image path. In reality, the user will put these in /public
  const imageSrc = `/blado-${pose}.png`;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="mb-16 mr-4 relative bg-black border border-crimson p-4 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] max-w-xs"
          >
            <div className="text-sm font-mono text-gray-300">
              {message}
            </div>
            {/* Speech bubble pointer */}
            <div className="absolute -right-3 bottom-4 w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-black border-b-8 border-b-transparent z-10" />
            <div className="absolute -right-3.5 bottom-3.5 w-0 h-0 border-t-[10px] border-t-transparent border-l-[14px] border-l-crimson border-b-[10px] border-b-transparent z-0" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Placeholder styling for the image in case it's not loaded yet */}
        <div className="w-32 h-32 rounded-full border-2 border-toxic bg-obsidian flex items-center justify-center overflow-hidden shadow-[0_0_25px_rgba(57,255,20,0.3)]">
          <img 
            src={imageSrc} 
            alt="Blado Avatar" 
            className="object-cover w-full h-full"
            onError={(e) => {
              // Fallback if image not found
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23111"/><text x="50" y="50" fill="%23dc2626" font-size="20" text-anchor="middle" alignment-baseline="middle">BLADO</text></svg>';
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
