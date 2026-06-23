'use client';

/**
 * ReadingProgress — Barra de progreso de lectura fija en la parte superior.
 * Usa el scroll position del window para calcular el progreso.
 */

import React, { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(scrollTop / docHeight, 1));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        zIndex: 200,
        transform: `scaleX(${progress})`,
        transformOrigin: '0 50%',
        background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))',
        transition: 'transform 0.1s linear',
      }}
    />
  );
}
