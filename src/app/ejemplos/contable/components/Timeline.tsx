'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { HistoriaItem } from '../hooks/useAdmin';

const GRANATE = '#7a1a1a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  historia: HistoriaItem[];
}

export default function Timeline({ historia }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="historia"
      style={{
        padding: 'clamp(60px, 10vh, 100px) 24px',
        background: BG_SECTION,
      }}
    >
      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: GRANATE, fontWeight: 700, margin: '0 0 8px 0' }}>
            Historia
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: TEXT_PRIMARY }}>
            Nuestra trayectoria
          </h2>
          <p style={{ fontSize: 15, color: TEXT_SEC, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Desde 2012 acompanando el crecimiento de PyMEs y profesionales en Chascomus.
          </p>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div
            style={{
              position: 'absolute',
              left: 11,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'rgba(122,26,26,0.12)',
              borderRadius: 1,
            }}
          />
          {historia.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              style={{
                display: 'flex',
                gap: 24,
                paddingBottom: 32,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: GRANATE,
                  border: '3px solid #fff',
                  boxShadow: '0 0 0 2px rgba(122,26,26,0.15)',
                  flexShrink: 0,
                  marginTop: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                {t.year.slice(2)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: GRANATE, marginBottom: 4 }}>
                  {t.year}
                </div>
                <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: 0 }}>
                  {t.event}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
