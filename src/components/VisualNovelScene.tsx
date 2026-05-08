"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VisualNovelSceneProps {
  scene: 'cave' | 'library';
  bladoPose: 'base' | 'phone';
}

export default function VisualNovelScene({ scene, bladoPose }: VisualNovelSceneProps) {
  const bgImage = scene === 'cave' ? '/dark-cave-bg.png' : '/dark-library-bg.png';
  const bladoImage = `/blado-${bladoPose}.png`;

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-black overflow-hidden">
      {/* Background Image with transition */}
      <AnimatePresence mode="wait">
        <motion.img
          key={bgImage}
          src={bgImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Blado Character */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bladoImage}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-32 right-10 md:right-32 w-80 h-[500px] flex items-end justify-center"
        >
          <img 
            src={bladoImage} 
            alt="Blado" 
            className="object-contain max-h-full drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
