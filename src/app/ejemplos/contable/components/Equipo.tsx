'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Miembro } from '../hooks/useAdmin';

const GRANATE = '#7a1a1a';
const GRANATE_LIGHT = '#9a2a2a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  equipo: Miembro[];
}

export default function Equipo({ equipo }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="equipo"
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
            Equipo
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: TEXT_PRIMARY }}>
            Conocenos
          </h2>
          <p style={{ fontSize: 15, color: TEXT_SEC, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Detras de cada servicio hay personas comprometidas con tu tranquilidad fiscal.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {equipo.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              style={{
                background: '#fff',
                borderRadius: 10,
                padding: 28,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                textAlign: 'center',
                border: '1px solid rgba(0,0,0,0.04)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)'; }}
            >
              <div
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${GRANATE} 0%, ${GRANATE_LIGHT} 100%)`,
                  margin: '0 auto 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 24, fontWeight: 600,
                }}
              >
                {m.nombre.split(' ')[1]?.[0] ?? m.nombre[0]}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 2px 0', color: TEXT_PRIMARY }}>
                {m.nombre}
              </h3>
              <p style={{ fontSize: 12, color: GRANATE, fontWeight: 600, margin: '0 0 10px 0' }}>
                {m.rol}
              </p>
              <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: 0 }}>
                {m.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
