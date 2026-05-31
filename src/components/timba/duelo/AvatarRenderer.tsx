import React, { useState } from 'react';
import { AvatarConfig, buildAvatarUrl } from '@/lib/avatarConfig';

interface AvatarRendererProps {
  config: AvatarConfig;
  className?: string;
  size?: number;
}

export default function AvatarRenderer({ config, className = "", size = 200 }: AvatarRendererProps) {
  const [isLoading, setIsLoading] = useState(true);
  const avatarUrl = buildAvatarUrl(config);

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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-crimson border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={avatarUrl}
        alt={`${config.name} avatar`}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} rendering-pixelated`}
        onLoad={() => setIsLoading(false)}
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Overlay tipo CRT leve */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50 z-10" />
    </div>
  );
}
