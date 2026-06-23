'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const GRANATE = '#7a1a1a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

const PROCESO = [
  {
    paso: 1,
    titulo: 'Consulta inicial gratuita',
    desc: 'Nos reunimos sin cargo para entender tu negocio, tus necesidades y explicarte como trabajamos. Sin compromiso.',
    detalle: 'Te invitamos a una reunion sin cargo de 30 minutos. Vas a conocer al equipo, entender nuestra metodologia de trabajo y recibir un diagnostico preliminar de tu situacion. No necesitas traer nada, solo tu CUIT y ganas de ordenar tus cuentas.',
  },
  {
    paso: 2,
    titulo: 'Diagnostico y plan',
    desc: 'Analizamos tu situacion actual, detectamos oportunidades de ahorro y armamos un plan de trabajo con plazos y honorarios claros.',
    detalle: 'Analizamos en profundidad tu situacion impositiva, contable y laboral. Detectamos oportunidades de ahorro fiscal, riesgos de multas y puntos a regularizar. Te entregamos un plan de trabajo detallado con plazos, responsables y honorarios completamente transparentes.',
  },
  {
    paso: 3,
    titulo: 'Implementacion',
    desc: 'Ponemos en marcha el plan: registraciones, presentaciones, regularizaciones. Te asignamos un contador responsable.',
    detalle: 'Ponemos en marcha el plan acordado: inscripciones, registraciones contables, presentacion de declaraciones juradas, regularizacion de deudas. Te asignamos un contador responsable que seguira tu caso de principio a fin y estara disponible para consultas.',
  },
  {
    paso: 4,
    titulo: 'Acompanamiento continuo',
    desc: 'Seguimiento mensual, consultas por WhatsApp, recordatorios de vencimientos y reunion anual de balance.',
    detalle: 'Una vez al mes recibis un resumen de tu situacion fiscal, recordatorios de vencimientos y acceso a nuestra plataforma online. Tenes WhatsApp directo con tu contador para consultas rapidas. Cada ano hacemos una reunion de balance para proyectar el siguiente.',
  },
];

export default function Proceso() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="proceso"
      style={{
        padding: 'clamp(60px, 10vh, 100px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '40%',
          background: BG_SECTION,
          zIndex: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
        }}
      />
      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: GRANATE, fontWeight: 700, margin: '0 0 8px 0' }}>
            Proceso
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: TEXT_PRIMARY }}>
            Como trabajamos
          </h2>
          <p style={{ fontSize: 15, color: TEXT_SEC, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Toca cada paso para ver los detalles. Un proceso simple y transparente.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}
        >
          {PROCESO.map((p, i) => {
            const isOpen = expanded === p.paso;
            return (
              <motion.div
                key={p.paso}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                onClick={() => setExpanded(isOpen ? null : p.paso)}
                style={{
                  background: '#fff',
                  borderRadius: 10,
                  padding: 28,
                  boxShadow: isOpen
                    ? '0 4px 24px rgba(122,26,26,0.10)'
                    : '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                  border: isOpen
                    ? `1px solid ${GRANATE}20`
                    : '1px solid rgba(0,0,0,0.04)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)';
                  }
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: GRANATE, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 700, marginBottom: 14,
                  }}
                >
                  {p.paso}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px 0', color: TEXT_PRIMARY }}>
                  {p.titulo}
                </h3>
                <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>

                <AnimatePresence initial={false}>
                  {isOpen && (
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
                          marginTop: 14,
                          paddingTop: 14,
                          borderTop: '1px solid rgba(122,26,26,0.08)',
                          fontSize: 13,
                          color: TEXT_SEC,
                          lineHeight: 1.7,
                        }}
                      >
                        {p.detalle}
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
                  {isOpen ? 'Ver menos' : 'Ver detalle'}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'inline-block' }}
                  >
                    &#9660;
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {PROCESO.length > 1 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${PROCESO.length - 1}, 1fr)`,
              gap: 24,
              marginTop: 16,
              padding: '0 18px',
            }}
          >
            {Array.from({ length: PROCESO.length - 1 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 2,
                  background: 'rgba(122,26,26,0.10)',
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
