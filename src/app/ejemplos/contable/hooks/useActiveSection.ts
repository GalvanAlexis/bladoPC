'use client';

import { useEffect, useRef, useState } from 'react';

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return { active, containerRef: ref };
}
