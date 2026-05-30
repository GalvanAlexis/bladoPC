"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BladoGameQuoteProps {
  quote: string;
}

export default function BladoGameQuote({ quote }: BladoGameQuoteProps) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(quote.substring(0, i));
      i++;
      if (i > quote.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [quote]);

  return (
    <div className="flex items-end gap-4 h-32 relative shrink-0">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
        className="w-24 h-24 shrink-0 -mb-2 z-10 relative"
      >
        <img 
          src="/blado-base.png" 
          alt="Blado" 
          className="w-full h-full object-cover rounded-full border-2 border-toxic shadow-[0_0_20px_rgba(57,255,20,0.2)] bg-black"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23111"/><text x="50" y="50" fill="%23dc2626" font-size="20" text-anchor="middle" alignment-baseline="middle">BLADO</text></svg>';
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="flex-1 bg-black/80 border border-toxic/40 rounded-lg p-4 relative mb-2 shadow-[0_0_15px_rgba(57,255,20,0.15)]"
      >
        <div className="absolute -left-3 bottom-6 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-toxic/40 border-b-[8px] border-b-transparent" />
        <div className="absolute -left-[10px] bottom-[25px] w-0 h-0 border-t-[7px] border-t-transparent border-r-[11px] border-r-black border-b-[7px] border-b-transparent" />
        
        <p className="font-mono text-sm text-gray-300 leading-relaxed min-h-[4rem]">
          {displayedText}
          <span className="animate-pulse text-toxic ml-1 inline-block">_</span>
        </p>
      </motion.div>
    </div>
  );
}
