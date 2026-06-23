'use client';

import { RefObject, useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  isWithin: boolean;
  progressX: number;
  progressY: number;
}

function isMouseEvent(e: Event): e is MouseEvent {
  return 'clientX' in e;
}

export function useMousePosition(containerRef?: RefObject<HTMLElement | null>): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, isWithin: false, progressX: 0.5, progressY: 0.5 });

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = typeof window !== 'undefined'
      && !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReduced || isTouch) return;

    let rafId: number;

    const handleMouse = (e: Event) => {
      if (!isMouseEvent(e)) return;
      rafId = requestAnimationFrame(() => {
        if (containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setPos({
            x, y,
            isWithin: true,
            progressX: rect.width > 0 ? x / rect.width : 0.5,
            progressY: rect.height > 0 ? y / rect.height : 0.5,
          });
        } else {
          setPos({
            x: e.clientX,
            y: e.clientY,
            isWithin: true,
            progressX: e.clientX / window.innerWidth,
            progressY: e.clientY / window.innerHeight,
          });
        }
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(rafId);
      setPos(prev => ({ ...prev, isWithin: false }));
    };

    const target = containerRef?.current ?? window;
    target.addEventListener('mousemove', handleMouse, { passive: true });
    if (containerRef?.current) {
      containerRef.current.addEventListener('mouseleave', handleLeave, { passive: true });
    } else {
      document.addEventListener('mouseleave', handleLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      target.removeEventListener('mousemove', handleMouse);
      if (containerRef?.current) {
        containerRef.current.removeEventListener('mouseleave', handleLeave);
      } else {
        document.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, [containerRef]);

  return pos;
}
