'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { RecursoItem } from '../hooks/useAdmin';

const GRANATE = '#7a1a1a';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  recursos: RecursoItem[];
}

export default function Recursos({ recursos }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="recursos"
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
            Recursos
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: TEXT_PRIMARY }}>
            Articulos y guias
          </h2>
          <p style={{ fontSize: 15, color: TEXT_SEC, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Informacion util para mantenerte al dia con tus obligaciones fiscales.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {recursos.length === 0 && (
            <p style={{ fontSize: 13, color: TEXT_SEC, textAlign: 'center', gridColumn: '1 / -1' }}>
              No hay recursos disponibles.
            </p>
          )}
          {recursos.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 10,
                  padding: 28,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 36, height: 4, borderRadius: 2,
                    background: GRANATE, marginBottom: 16,
                  }}
                />
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px 0', color: TEXT_PRIMARY }}>
                  {r.titulo}
                </h3>
                <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  {r.desc}
                </p>
                <button
                  data-popover={r.id}
                  style={{
                    fontSize: 13, color: GRANATE, fontWeight: 600,
                    textDecoration: 'none', background: 'none', border: 'none',
                    cursor: 'pointer', padding: 0, fontFamily: 'inherit',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}
                >
                  Leer articulo &rarr;
                </button>
              </div>

              <div
                id={r.id}
                popover="auto"
                style={{
                  maxWidth: 400,
                  padding: 24,
                  borderRadius: 10,
                  border: '1px solid rgba(122,26,26,0.15)',
                  background: '#fff',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  lineHeight: 1.6,
                  fontSize: 14,
                  color: TEXT_PRIMARY,
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px 0', color: TEXT_PRIMARY }}>
                  {r.titulo}
                </h3>
                <p style={{ margin: '0 0 16px 0', color: TEXT_SEC }}>
                  {r.popoverContent}
                </p>
                <button
                  popoverTarget={r.id}
                  popoverTargetAction="hide"
                  style={{
                    display: 'inline-block', padding: '8px 20px', borderRadius: 6,
                    background: GRANATE, color: '#fff', fontSize: 12, fontWeight: 600,
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `{
  document.querySelectorAll('[data-popover]').forEach(function(b){
    b.addEventListener('click', function(){
      var target = document.getElementById(b.getAttribute('data-popover'));
      if (target && target.togglePopover) target.togglePopover();
    });
  });
}()`,
        }}
      />
    </section>
  );
}
