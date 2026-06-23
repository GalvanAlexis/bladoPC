'use client';

import { useEffect, useState, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export default function CursorGlow() {
  const { x, y, isWithin } = useMousePosition();
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setIsDesktop(matchMedia('(hover: hover) and (pointer: fine)').matches);
    setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!isDesktop || reduced) return;
    setVisible(isWithin);
  }, [isWithin, isDesktop, reduced]);

  if (!isDesktop || reduced) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: x - 100,
        top: y - 100,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,118,118,0.12) 0%, rgba(184,118,118,0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        willChange: 'transform',
        transform: 'translate3d(0,0,0)',
      }}
    />
  );
}
