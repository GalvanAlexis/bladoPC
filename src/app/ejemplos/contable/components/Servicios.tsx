'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  const [expanded, setExpanded] = useState<string | null>(null);

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
            Toca cada servicio para ver los detalles. Desde monotributo hasta sociedades completas.
          </p>
        </motion.div>

        {servicios.map((s, i) => {
          const isOpen = expanded === s.id;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="con-servicio-card"
              onClick={() => setExpanded(isOpen ? null : s.id)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 'clamp(16px, 3vw, 48px)',
                marginBottom: i < servicios.length - 1 ? 16 : 0,
                background: i % 2 === 0 ? '#fff' : BG_SECTION,
                borderRadius: 12,
                padding: 'clamp(16px, 3vw, 32px)',
                border: isOpen
                  ? `1px solid ${GRANATE}20`
                  : '1px solid transparent',
                cursor: 'pointer',
                transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{ flex: '1 1 55%', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: TEXT_PRIMARY }}>
                    {s.titulo}
                  </h3>
                  {s.publico && (
                    <span
                      className="con-servicio-tag"
                      style={{
                        fontSize: 11, color: GRANATE, fontWeight: 500,
                        padding: '3px 10px', borderRadius: 50,
                        background: 'rgba(122,26,26,0.06)',
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
                  <div style={{ marginTop: 8, fontSize: 13, color: GRANATE, fontWeight: 600 }}>
                    {s.precio}
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {isOpen && s.detalle && (
                    <motion.div
                      key="detalle"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: '1px solid rgba(122,26,26,0.08)',
                          fontSize: 13,
                          color: TEXT_SEC,
                          lineHeight: 1.7,
                        }}
                      >
                        {s.detalle}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 11,
                    color: GRANATE,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {isOpen ? 'Ver menos' : 'Ver detalle completo'}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'inline-block' }}
                  >
                    &#9660;
                  </motion.span>
                </div>
              </div>
              <div
                className="con-servicio-circle"
                style={{
                  flex: '0 0 64px',
                  height: 64,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${GRANATE} 0%, ${GRANATE_LIGHT} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 24,
                  fontWeight: 300,
                  fontFamily: 'serif',
                }}
              >
                {s.titulo[0]}
              </div>
            </motion.div>
          );
        })}
        <style>{`
          .con-servicio-card { flex-direction: row; }
          .con-servicio-circle { flex: 0 0 64px; height: 64px; }
          @media (max-width: 600px) {
            .con-servicio-card { flex-direction: column !important; text-align: center; }
            .con-servicio-circle { flex: 0 0 48px !important; width: 48px !important; height: 48px !important; font-size: 18px !important; margin-top: 8px; order: -1; }
            .con-servicio-tag { white-space: normal !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
