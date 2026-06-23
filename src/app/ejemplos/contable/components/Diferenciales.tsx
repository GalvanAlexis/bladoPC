'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GRANATE = '#7a1a1a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

const DIFERENCIALES = [
  { titulo: 'Respuesta en menos de 24h', desc: 'Consultas respondidas dentro del dia habil. Sin esperas ni mensajes sin respuesta.' },
  { titulo: 'Atencion personalizada', desc: 'Un contador asignado por cliente. Conoces a quien te atiende y el te conoce a vos.' },
  { titulo: 'Precios claros', desc: 'Honorarios fijos y previsibles desde el inicio. Sin cargos sorpresa ni facturas inesperadas.' },
  { titulo: 'Plataforma online', desc: 'Portal digital para subir y descargar tus documentos, recibir recordatorios y ver el estado de tus tramites.' },
];

export default function Diferenciales() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="por-que"
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
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: TEXT_PRIMARY }}>
            Por que elegirnos
          </h2>
          <p style={{ fontSize: 15, color: TEXT_SEC, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            No somos un estudio mas. Estos son los valores que nos diferencian.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}
        >
          {DIFERENCIALES.map((d, i) => (
            <motion.div
              key={d.titulo}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              style={{
                textAlign: 'center',
                padding: '32px 20px',
                background: BG_SECTION,
                borderRadius: 10,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'rgba(122,26,26,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', fontSize: 20, color: GRANATE,
                }}
              >
                &#10003;
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px 0', color: TEXT_PRIMARY }}>
                {d.titulo}
              </h3>
              <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: 0 }}>
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
