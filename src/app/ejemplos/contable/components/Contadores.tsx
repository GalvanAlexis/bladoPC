'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const GRANATE = '#7a1a1a';
const TEXT_SEC = '#5a5550';

const METRICS = [
  { target: 12, suffix: '+', label: 'anos de experiencia' },
  { target: 350, suffix: '+', label: 'clientes activos' },
  { target: 2000, suffix: '+', label: 'declaraciones anuales' },
  { target: 98, suffix: '%', label: 'retencion de clientes' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const done = useRef(false);

  useEffect(() => {
    if (!isInView || done.current) return;
    done.current = true;
    const duration = 1500;
    const start = performance.now();

    function update(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Contadores() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      id="metrics"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ padding: 'clamp(48px, 8vh, 72px) 24px', background: '#fff' }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: 32,
        }}
      >
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: GRANATE, lineHeight: 1 }}>
              <AnimatedCounter target={m.target} suffix={m.suffix} />
            </div>
            <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 6 }}>{m.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
