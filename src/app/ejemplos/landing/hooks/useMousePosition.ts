'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
  isWithin: boolean;
  progressX: number;
  progressY: number;
}

export function useMousePosition(containerRef?: RefObject<HTMLElement | null>): MousePosition {
  const [pos, setPos] = useState<MousePosition>({
    x: 0, y: 0, isWithin: false, progressX: 0, progressY: 0,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = matchMedia('(hover: hover) and (pointer: fine)');
    const rm = matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches || rm.matches) return;

    const handleMove: EventListener = (e) => {
      const ev = e as MouseEvent;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = ev.clientX - rect.left;
          const y = ev.clientY - rect.top;
          setPos({
            x, y,
            isWithin: true,
            progressX: rect.width > 0 ? x / rect.width : 0,
            progressY: rect.height > 0 ? y / rect.height : 0,
          });
        } else {
          setPos(prev => ({
            ...prev,
            x: ev.clientX, y: ev.clientY,
            isWithin: true,
          }));
        }
      });
    };

    const handleLeave: EventListener = () => setPos(prev => ({ ...prev, isWithin: false }));

    const target = containerRef?.current ?? window;
    target.addEventListener('mousemove', handleMove, { passive: true });
    if (containerRef?.current) {
      containerRef.current.addEventListener('mouseleave', handleLeave);
    }

    return () => {
      target.removeEventListener('mousemove', handleMove);
      if (containerRef?.current) {
        containerRef.current.removeEventListener('mouseleave', handleLeave);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return pos;
}
