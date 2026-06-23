'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ServicioItem } from '../hooks/useAdmin';

const GRANATE = '#7a1a1a';
const GRANATE_LIGHT = '#9a2a2a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  servicios: ServicioItem[];
}

export default function Servicios({ servicios }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="servicios"
      style={{
        padding: 'clamp(60px, 10vh, 100px) 24px',
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
            Servicios
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: TEXT_PRIMARY }}>
            Todo lo que tu negocio necesita
          </h2>
          <p style={{ fontSize: 15, color: TEXT_SEC, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Desde monotributo hasta sociedades completas. Te acompanamos en cada etapa de tu negocio.
          </p>
        </motion.div>

        {servicios.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'flex',
              flexDirection: i % 2 === 0 ? 'row' as const : 'row-reverse' as const,
              alignItems: 'center',
              gap: 'clamp(24px, 4vw, 48px)',
              marginBottom: i < servicios.length - 1 ? 24 : 0,
              background: i % 2 === 0 ? '#fff' : BG_SECTION,
              borderRadius: 12,
              padding: 'clamp(20px, 3vw, 32px)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ flex: '1 1 55%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: TEXT_PRIMARY }}>
                  {s.titulo}
                </h3>
                {s.publico && (
                  <span
                    style={{
                      fontSize: 11, color: GRANATE, fontWeight: 500,
                      padding: '3px 10px', borderRadius: 50,
                      background: 'rgba(122,26,26,0.06)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.publico}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: 0 }}>
                {s.desc}
              </p>
              {s.precio && (
                <div style={{ marginTop: 12, fontSize: 13, color: GRANATE, fontWeight: 600 }}>
                  {s.precio}
                </div>
              )}
            </div>
            <div
              style={{
                flex: '0 0 80px',
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${GRANATE} 0%, ${GRANATE_LIGHT} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 28,
                fontWeight: 300,
                fontFamily: 'serif',
              }}
            >
              {s.titulo[0]}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
