import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InsultBubbleProps {
  text: string;
  speaker: 'blado' | 'player';
}

export default function InsultBubble({ text, speaker }: InsultBubbleProps) {
  const isBlado = speaker === 'blado';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text} // Fuerza re-render y animación cuando cambia el texto
        initial={{ opacity: 0, y: isBlado ? -20 : 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className={`relative max-w-lg p-4 font-mono text-sm md:text-base border-2 ${
          isBlado 
            ? 'bg-[#1a0a0a] border-crimson text-red-100 shadow-[0_0_15px_rgba(220,38,38,0.2)] ml-auto' 
            : 'bg-[#0a1a0a] border-toxic text-green-100 shadow-[0_0_15px_rgba(57,255,20,0.2)] mr-auto'
        }`}
      >
        <p className="leading-relaxed">"{text}"</p>
        
        {/* Piquito del globo de diálogo */}
        <div 
          className={`absolute w-4 h-4 border-b-2 border-r-2 bg-inherit transform rotate-45 ${
            isBlado 
              ? 'border-crimson right-8 -bottom-2.5' 
              : 'border-toxic left-8 -top-2.5 rotate-[-135deg]'
          }`}
        />
      </motion.div>
    </AnimatePresence>
  );
}
