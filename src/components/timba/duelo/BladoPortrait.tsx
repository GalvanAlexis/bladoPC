import React from 'react';

interface BladoPortraitProps {
  className?: string;
  size?: number;
  isActive?: boolean;
}

export default function BladoPortrait({ className = "", size = 150, isActive = false }: BladoPortraitProps) {
  return (
    <div 
      className={`relative flex items-center justify-center bg-[#050505] overflow-hidden transition-all duration-300 ${isActive ? 'blado-portrait-active' : ''} ${className}`}
      style={{ 
        width: size, 
        height: size,
        border: '4px solid #dc2626', // crimson
        boxShadow: isActive ? 'none' : '0 0 15px rgba(220,38,38,0.4), inset 0 0 20px rgba(0,0,0,0.8)'
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
      {/* Overlay tipo CRT leve con contraste dinámico si está activo */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 transition-all duration-300"
        style={{
          backgroundImage: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))',
          backgroundSize: '100% 4px, 3px 100%',
          opacity: isActive ? 0.7 : 0.5,
          backdropFilter: isActive ? 'contrast(1.2) saturate(1.2)' : 'none'
        }} 
      />
    </div>
  );
}
