"use client";

/**
 * AboutSection — ISS-052
 * Sección biográfica interactiva: 3 capítulos (Perfil, Empresa, Formación).
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ABOUT_CHAPTERS = [
  {
    id: 'perfil',
    title: 'El Perfil Técnico',
    desc: 'Desarrollador Full-Stack, Data Scientist y lider técnico en desarrollo de software a medida.',
    details: 'Mi visión combina el entendimiento profundo del hardware con el desarrollo de software escalable. Lidero proyectos de software a medida —plataformas e-learning, integraciones avanzadas, aplicaciones SaaS— diseñando arquitecturas de sistemas complejos y gestionando proyectos end-to-end. Integro la Inteligencia Artificial como herramienta potenciadora real, no como un simple parche.',
    tags: ['Full-Stack', 'Data Science', 'SaaS', 'Arquitectura', 'Liderazgo Técnico'],
  },
  {
    id: 'formacion',
    title: 'Formación y Camino',
    desc: 'De Técnico de PC a Ingeniero de Sistemas autodidacta.',
    details: 'Mi formación comenzó como Técnico de Reparación de PC, lo que me dio las bases absolutas sobre hardware y sistemas operativos. Actualmente curso la Tecnicatura en Ciencia de Datos e IA en el ISFDyT 57, a la par que estudio Ingeniería de Sistemas de manera completamente autodidacta (siguiendo el currículum de OSSU Computer Science), abarcando estructuras de datos, algoritmos, y fundamentos matemáticos.',
    tags: ['Técnico de PC', 'ISFDyT 57', 'Ing. de Sistemas', 'OSSU', 'Autodidacta'],
  },
];

export default function AboutSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="about"
      aria-label="Sobre mí"
      className="section-padding"
      style={{ position: 'relative' }}
    >
      <div className="section-container">
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
          Biografía
        </p>
        <h2
          className="reveal"
          style={{
            fontSize: 'clamp(26px, 4vw, 44px)',
            fontWeight: 700,
            color: 'var(--foreground)',
            marginBottom: '48px',
          }}
        >
          Sobre mí
        </h2>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}
        >
          {ABOUT_CHAPTERS.map((chapter) => (
            <motion.article
              key={chapter.id}
              layoutId={`about-card-${chapter.id}`}
              onClick={() => setSelectedId(chapter.id)}
              className="skill-card reveal"
              style={{ cursor: 'pointer', background: 'var(--surface)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >


              <motion.h3
                layoutId={`about-title-${chapter.id}`}
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {chapter.title}
              </motion.h3>
              
              <motion.p
                layoutId={`about-desc-${chapter.id}`}
                style={{
                  fontSize: '13px',
                  color: 'var(--muted-light)',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                }}
              >
                {chapter.desc}
              </motion.p>

              {/* Tags */}
              <motion.div layoutId={`about-tags-${chapter.id}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {chapter.tags.map((tag) => (
                  <span key={tag} className="tech-badge" style={{ fontSize: '10px', padding: '2px 8px' }}>
                    {tag}
                  </span>
                ))}
              </motion.div>
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
                background: 'var(--overlay-bg)',
                backdropFilter: 'blur(4px)',
                zIndex: 100,
              }}
            />
            {ABOUT_CHAPTERS.map(chapter => chapter.id === selectedId && (
              <div
                key={`modal-about-${chapter.id}`}
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
                  layoutId={`about-card-${chapter.id}`}
                  style={{
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderTop: '2px solid var(--accent)',
                    borderRadius: '12px',
                    padding: '32px',
                    width: '100%',
                    maxWidth: '500px',
                    boxShadow: 'var(--card-shadow-lg)',
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



                  <motion.h3
                    layoutId={`about-title-${chapter.id}`}
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--foreground)',
                      marginBottom: '12px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {chapter.title}
                  </motion.h3>

                  <motion.p
                    layoutId={`about-desc-${chapter.id}`}
                    style={{
                      fontSize: '14px',
                      color: 'var(--muted-light)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                      fontWeight: 500,
                    }}
                  >
                    {chapter.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      background: 'var(--surface)',
                      padding: '20px',
                      borderRadius: '8px',
                      marginBottom: '24px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <p style={{ fontSize: '14px', color: 'var(--foreground-2)', lineHeight: 1.8 }}>
                      {chapter.details}
                    </p>
                  </motion.div>

                  <motion.div layoutId={`about-tags-${chapter.id}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {chapter.tags.map((tag) => (
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
