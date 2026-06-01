import React from 'react';

interface BladoPortraitProps {
  className?: string;
  size?: number;
}

export default function BladoPortrait({ className = "", size = 150 }: BladoPortraitProps) {
  return (
    <div 
      className={`relative flex items-center justify-center bg-[#050505] overflow-hidden ${className}`}
      style={{ 
        width: size, 
        height: size,
        border: '4px solid #dc2626', // crimson
        boxShadow: '0 0 15px rgba(220,38,38,0.4), inset 0 0 20px rgba(0,0,0,0.8)'
      }}
    >
      <img
        src="/blado-base.png"
        alt="Blado avatar"
        className="w-full h-full object-cover rendering-pixelated"
        style={{ imageRendering: 'pixelated' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23111"/><text x="50" y="50" fill="%23dc2626" font-size="20" text-anchor="middle" alignment-baseline="middle">BLADO</text></svg>';
        }}
      />
      {/* Overlay tipo CRT leve */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50 z-10" />
    </div>
  );
}
