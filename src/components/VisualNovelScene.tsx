"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VisualNovelSceneProps {
  scene: 'cave' | 'library';
  bladoPose: 'base' | 'phone';
  dialogVisible: boolean;
  onBladoClick?: () => void;
}

export default function VisualNovelScene({ scene, bladoPose, dialogVisible, onBladoClick }: VisualNovelSceneProps) {
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
          animate={{ opacity: 0.8, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </AnimatePresence>

      {/* Blado Character */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bladoImage}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-32 right-2 sm:right-10 md:right-32 w-40 sm:w-56 md:w-80 h-[300px] sm:h-[400px] md:h-[500px] flex items-end justify-center"
        >
          {dialogVisible ? (
            <img
              src={bladoImage}
              alt="Blado"
              className="object-contain max-h-full drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            />
          ) : (
            <motion.button
              onClick={onBladoClick}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="cursor-pointer relative"
              title="Click para hablar con Blado"
            >
              <img
                src={bladoImage}
                alt="Blado"
                className="object-contain max-h-full drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap font-mono"
              >
                Click para hablar conmigo, mortal...
              </motion.span>
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
