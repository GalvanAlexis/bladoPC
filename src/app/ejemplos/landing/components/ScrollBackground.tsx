'use client';

import { useEffect, useRef, useState } from 'react';

const SECTION_COLORS = {
  light: [
    '#0a0a0a',
    '#1a0f14',
    '#0f0a1a',
    '#14100a',
    '#0a0a0a',
  ],
  dark: [
    '#0a0a0a',
    '#1a0f14',
    '#0f0a1a',
    '#14100a',
    '#0a0a0a',
  ],
};

const SECTION_IDS = ['hero', 'beneficios', 'ingredientes', 'testimonios', 'newsletter'];

export default function ScrollBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [reduced, setReduced] = useState(false);
  const prevIndex = useRef(0);

  useEffect(() => {
    setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(entry.target.id);
            if (idx !== -1) {
              prevIndex.current = idx;
              setActiveIndex(idx);
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const darkWatcher = () => {
      setIsDark(document.documentElement.classList.contains('lum-dark'));
    };
    darkWatcher();
    const mo = new MutationObserver(darkWatcher);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  const colors = isDark ? SECTION_COLORS.dark : SECTION_COLORS.light;
  const bg = colors[activeIndex] || colors[0];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: bg,
        transition: reduced ? 'none' : 'background-color 0.8s ease',
        willChange: 'background-color',
      }}
    />
  );
}
