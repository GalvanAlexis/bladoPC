"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BladoAvatarProps {
  message?: string;
}

export default function BladoAvatar({ message = "Cargando..." }: BladoAvatarProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian">
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="relative"
      >
        <div className="w-40 h-40 rounded-full border-2 border-toxic bg-black flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(57,255,20,0.3)]">
          <img 
            src="/blado-base.png" 
            alt="Blado" 
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23111"/><text x="50" y="50" fill="%23dc2626" font-size="20" text-anchor="middle" alignment-baseline="middle">BLADO</text></svg>';
            }}
          />
        </div>
      </motion.div>
      
      <div className="mt-8 bg-black/80 border border-crimson p-4 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] max-w-sm">
        <p className="text-sm font-mono text-gray-300 text-center">
          {message}
        </p>
        <div className="flex justify-center mt-3 gap-1">
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            className="w-2 h-2 bg-toxic rounded-full"
          />
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
            className="w-2 h-2 bg-toxic rounded-full"
          />
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
            className="w-2 h-2 bg-toxic rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
