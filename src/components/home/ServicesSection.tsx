"use client";

/**
 * ServicesSection — ISS-053
 * Sección interactiva de servicios orientada a clientes y pymes,
 * con expansión a través de layoutId de framer-motion.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
  {
    id: 'hardware',
    title: 'Reparación de PC',
    subtitle: 'Nivel Componente y Software',
    desc: 'Diagnóstico preciso, mantenimiento preventivo/correctivo y optimización profunda.',
    details: 'Mi enfoque técnico de reparación está fuertemente inclinado a la resolución por software y a la optimización del sistema operativo. A nivel de hardware, la reparación se ejecuta mediante el recambio directo del componente dañado. El servicio está destinado exclusivamente a PCs de Escritorio (no notebooks ni dispositivos móviles), asegurando diagnósticos certeros y que el equipo vuelva a rendir al máximo.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    tags: ['PC de Escritorio', 'Optimización SO', 'Diagnóstico Avanzado', 'Recambio de Componentes'],
  },
  {
    id: 'software',
    title: 'Automatizaciones',
    subtitle: 'Soluciones Digitales',
    desc: 'Sistemas a medida para PyMEs y emprendedores que ahorran horas de trabajo a la semana.',
    details: 'Analizamos cómo tu negocio pierde tiempo en tareas manuales y desarrollamos software a medida para resolverlo. Ya sea creando bots de respuesta automática, scripts para carga masiva de datos, o conectando todos tus sistemas actuales a través de APIs. El objetivo es claro: automatizar lo repetitivo para que tu equipo se enfoque en hacer crecer el negocio.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    tags: ['Bots', 'Scripts', 'Node.js', 'Integración de APIs', 'Sistemas a Medida'],
  },
  {
    id: 'data',
    title: 'Ciencia de Datos',
    subtitle: 'Optimización con IA',
    desc: 'Análisis profundo de datos y tableros predictivos para tomar decisiones gerenciales informadas.',
    details: 'Diseñamos tableros de control interactivos (Dashboards) analizando a fondo la base de datos de tus clientes u operaciones. Integramos modelos de lenguaje potentes (LLMs, como Gemini API) y algoritmos predictivos para asistir en la toma de decisiones, escalar tu operatividad de manera inteligente y descubrir patrones que mejoren directamente la rentabilidad.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    tags: ['Dashboards', 'Machine Learning', 'Gemini API', 'Análisis Predictivo', 'Pandas'],
  },
];

export default function ServicesSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="servicios"
      aria-label="Servicios"
      className="section-padding section-lazy"
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#050505' }}
    >
      {/* Video Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          src="/video/Mind-explosion.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        />
        {/* Overlay gradient para mezclar suavemente */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, var(--background) 0%, transparent 15%, transparent 85%, var(--background) 100%), radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-divider reveal" />
        <p
          className="reveal"
          style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: '12px',
          }}
        >
          Servicios IT
        </p>
        <h2
          className="reveal"
          style={{
            fontSize: 'clamp(26px, 4vw, 44px)',
            fontWeight: 700,
            color: 'var(--foreground)',
            margin: '0 0 48px 0',
          }}
        >
          ¿Cómo te puedo ayudar?
        </h2>

        {/* Grid de Servicios */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
          }}
        >
          {SERVICES.map((srv) => (
            <motion.article
              key={srv.id}
              layoutId={`service-card-${srv.id}`}
              onClick={() => setSelectedId(srv.id)}
              className="reveal"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '32px 28px',
                cursor: 'pointer',
              }}
              whileHover={{ 
                scale: 1.02, 
                borderColor: 'var(--accent)',
                boxShadow: '0 12px 40px rgba(225,29,72,0.15)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <motion.div
                layoutId={`service-icon-${srv.id}`}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'var(--accent-dim)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                }}
              >
                {srv.icon}
              </motion.div>

              <motion.h3
                layoutId={`service-title-${srv.id}`}
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  margin: '0 0 4px 0',
                }}
              >
                {srv.title}
              </motion.h3>
              
              <motion.p
                layoutId={`service-subtitle-${srv.id}`}
                style={{
                  fontSize: '13px',
                  color: 'var(--accent)',
                  fontWeight: 500,
                  margin: '0 0 16px 0',
                }}
              >
                {srv.subtitle}
              </motion.p>

              <motion.p
                layoutId={`service-desc-${srv.id}`}
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--foreground-2)',
                  margin: 0,
                }}
              >
                {srv.desc}
              </motion.p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
                zIndex: 100,
              }}
            />
            {SERVICES.map(srv => srv.id === selectedId && (
              <div
                key={`modal-srv-${srv.id}`}
                style={{
                  position: 'fixed',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 101,
                  padding: '20px',
                  pointerEvents: 'none',
                }}
              >
                <motion.article
                  layoutId={`service-card-${srv.id}`}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderTop: '2px solid var(--accent)',
                    borderRadius: '12px',
                    padding: '32px',
                    width: '100%',
                    maxWidth: '540px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                    pointerEvents: 'auto',
                    position: 'relative',
                  }}
                >
                  <button
                    onClick={() => setSelectedId(null)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--muted)',
                      cursor: 'pointer',
                      padding: '8px',
                      fontSize: '14px',
                    }}
                  >
                    ✕
                  </button>

                  <motion.div
                    layoutId={`service-icon-${srv.id}`}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: 'var(--accent-dim)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {srv.icon}
                  </motion.div>

                  <motion.h3
                    layoutId={`service-title-${srv.id}`}
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'var(--foreground)',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {srv.title}
                  </motion.h3>

                  <motion.p
                    layoutId={`service-subtitle-${srv.id}`}
                    style={{
                      fontSize: '14px',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      margin: '0 0 20px 0',
                    }}
                  >
                    {srv.subtitle}
                  </motion.p>

                  <motion.p
                    layoutId={`service-desc-${srv.id}`}
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: 'var(--foreground-2)',
                      margin: '0 0 24px 0',
                      fontWeight: 500,
                    }}
                  >
                    {srv.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      background: 'var(--surface-2)',
                      padding: '20px',
                      borderRadius: '8px',
                      marginBottom: '24px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <p style={{ fontSize: '15px', color: 'var(--foreground-2)', lineHeight: 1.8, margin: 0 }}>
                      {srv.details}
                    </p>
                  </motion.div>

                  <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {srv.tags.map((tag) => (
                      <span key={tag} className="tech-badge" style={{ fontSize: '12px', padding: '4px 10px' }}>
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </motion.article>
              </div>
            ))}
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
