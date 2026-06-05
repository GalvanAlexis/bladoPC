import React from 'react';

interface InsultBubbleProps {
  text: string;
  speaker: 'blado' | 'player';
}

export default function InsultBubble({ text, speaker }: InsultBubbleProps) {
  const isBlado = speaker === 'blado';

  return (
    <div
      key={text}
      className={`relative max-w-lg p-3 md:p-4 font-mono text-sm md:text-base border-2 ${
        isBlado
          ? 'bubble-blado bg-[#1a0505] border-crimson text-red-100 ml-auto'
          : 'bubble-player bg-[#051a05] border-toxic text-green-100 mr-auto'
      }`}
      style={{
        boxShadow: isBlado
          ? '0 0 20px oklch(0.55 0.25 25 / 0.35), inset 0 0 30px rgba(0,0,0,0.5)'
          : '0 0 20px oklch(0.85 0.3 145 / 0.25), inset 0 0 30px rgba(0,0,0,0.5)',
      }}
    >
      {/* Scanline overlay para Blado — efecto CRT */}
      {isBlado && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30 z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
          }}
        />
      )}

      <p className="leading-relaxed relative z-20">&quot;{text}&quot;</p>

      {/* Piquito del globo de diálogo */}
      <div
        className={`absolute w-4 h-4 border-b-2 border-r-2 bg-inherit transform rotate-45 ${
          isBlado
            ? 'border-crimson right-8 -bottom-2.5'
            : 'border-toxic left-8 -top-2.5 rotate-[-135deg]'
        }`}
      />
    </div>
  );
}
