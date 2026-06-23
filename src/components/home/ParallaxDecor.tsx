'use client';

/**
 * ParallaxDecor — Capas decorativas con parallax scroll-driven CSS.
 * Solo visibles en navegadores que soportan animation-timeline.
 */

import React from 'react';

export default function ParallaxDecor() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div
        className="blado-parallax-layer"
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225,29,72,0.06) 0%, transparent 70%)',
          animationDelay: '0s',
        }}
      />
      <div
        className="blado-parallax-layer"
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '-8%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
          animationDelay: '-0.15s',
        }}
      />
      <div
        className="blado-parallax-layer"
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
          animationDelay: '-0.3s',
        }}
      />
    </div>
  );
}
