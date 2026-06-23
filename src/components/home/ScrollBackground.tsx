'use client';

/**
 * ScrollBackground — Fondo ambiental que cambia de color sutilemente
 * por cada seccion, usando IntersectionObserver.
 */

import React, { useEffect, useState, useRef } from 'react';

const COLORS: Record<string, { dark: string; light: string }> = {
  hero:      { dark: 'rgba(225,29,72,0.03)', light: 'rgba(225,29,72,0.02)' },
  servicios: { dark: 'rgba(225,29,72,0.06)', light: 'rgba(225,29,72,0.04)' },
  about:     { dark: 'rgba(100,100,255,0.03)', light: 'rgba(100,100,255,0.02)' },
  skills:    { dark: 'rgba(225,29,72,0.04)', light: 'rgba(225,29,72,0.03)' },
};

export default function ScrollBackground() {
  const [currentColor, setCurrentColor] = useState('transparent');

  useEffect(() => {
    const isDark = !document.documentElement.classList.contains('blado-light');
    const defaultColor = isDark ? 'transparent' : 'transparent';

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const color = COLORS[sectionId];
            if (color) {
              const isDark = !document.documentElement.classList.contains('blado-light');
              setCurrentColor(isDark ? color.dark : color.light);
            }
            break;
          }
        }
      },
      { threshold: 0.2 }
    );

    const ids = Object.keys(COLORS);
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onThemeChange = () => {
      const isDark = !document.documentElement.classList.contains('blado-light');
      const activeId = ids.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.5 && rect.bottom > 0;
      });
      if (activeId && COLORS[activeId]) {
        setCurrentColor(isDark ? COLORS[activeId].dark : COLORS[activeId].light);
      }
    };

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: `radial-gradient(ellipse at 50% 0%, ${currentColor}, transparent 70%)`,
        transition: 'background 0.8s ease',
        pointerEvents: 'none',
      }}
    />
  );
}
