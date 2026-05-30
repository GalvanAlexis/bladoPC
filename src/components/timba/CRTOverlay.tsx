import React from 'react';

export default function CRTOverlay() {
  return (
    <>
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 4px)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-90 mix-blend-overlay animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%)',
          animationDuration: '0.15s',
          animationIterationCount: 'infinite'
        }}
      />
    </>
  );
}
