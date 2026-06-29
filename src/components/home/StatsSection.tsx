'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  label: string;
  target: number;
  suffix: string;
  prefix?: string;
}

const STATS: StatItem[] = [
  { label: 'Proyectos entregados', target: 15, suffix: '+' },
  { label: 'Clientes activos', target: 12, suffix: '' },
  { label: 'Años de experiencia', target: 5, suffix: '' },
  { label: 'Tecnologías dominadas', target: 20, suffix: '+' },
];

function AnimatedCounter({ item, inView }: { item: StatItem; inView: boolean }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const duration = 1500;
    const steps = 30;
    const increment = item.target / steps;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCount(item.target);
        clearInterval(timer);
      } else {
        current += increment;
        setCount(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, item.target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] }}
      style={{
        textAlign: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        aria-label={`${item.prefix || ''}${count}${item.suffix} ${item.label}`}
        style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 800,
          color: 'var(--accent)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {item.prefix || ''}{count}{item.suffix}
      </div>
      <div
        aria-hidden="true"
        style={{
          fontSize: '13px',
          color: 'var(--muted-light)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {item.label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stats"
      aria-label="Estadísticas"
      className="section-padding"
      style={{ background: 'var(--surface)', position: 'relative' }}
      ref={ref}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
            gap: '8px',
          }}
        >
          {STATS.map((item) => (
            <AnimatedCounter key={item.label} item={item} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
