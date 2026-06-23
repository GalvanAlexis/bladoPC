'use client';

/**
 * CursorGlow — Brillo decorativo que sigue el mouse en desktop.
 * Solo se activa en dispositivos hover/pointer fine y si
 * prefers-reduced-motion es no-preference.
 */

import React, { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReduced || !isDesktop) return;

    let rafId: number;
    const onMouse = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(225,29,72,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${pos.x - 150}px, ${pos.y - 150}px)`,
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    />
  );
}
