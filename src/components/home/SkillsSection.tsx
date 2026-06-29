"use client";

/**
 * SkillsSection — ISS-051
 * 3 áreas técnicas principales con interactividad de expansión.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILL_AREAS = [
  {
    id: 'fullstack',
    icon: '⬡',
    title: 'Full-Stack & Mobile',
    desc: 'Aplicaciones web modernas y multiplataforma. Interfaces de alto rendimiento con los mejores frameworks.',
    tags: ['Next.js', 'React', 'Expo', 'NestJS', 'HTMX', 'Tailwind CSS'],
    potency: 92,
    color: '#e11d48',
    details: 'Desarrollo de plataformas SaaS completas, aplicaciones móviles con Expo y sistemas e-learning. Dominio de Server-Side Rendering (SSR) y Static Site Generation (SSG) con Next.js, y creación de UIs fluidas con Tailwind CSS y HTMX para experiencias de usuario premium.',
  },
  {
    id: 'backend',
    icon: '▣',
    title: 'Arquitectura Backend',
    desc: 'APIs robustas, microservicios y bases de datos eficientes para sistemas escalables.',
    tags: ['Go (Gin)', 'Python (Django)', 'PostgreSQL', 'Redis', 'SQLite', 'Node.js'],
    potency: 88,
    color: '#3b82f6',
    details: 'Diseño avanzado de esquemas de bases de datos relacionales, optimización de consultas complejas y migraciones. Construcción de APIs REST ultrarrápidas y concurrentes utilizando Go (Gin) y sistemas completos con Python (Django). Implementación de capas de caché con Redis para máxima performance.',
  },
  {
    id: 'ai-data',
    icon: '◈',
    title: 'IA & Data Science',
    desc: 'Análisis de datos, NLP y creación de agentes autónomos potenciados por LLMs y Machine Learning.',
    tags: ['Streamlit', 'spaCy', 'Gemini API', 'AI Agents', 'Pandas'],
    potency: 85,
    color: '#8b5cf6',
    details: 'Implementación de pipelines de Procesamiento de Lenguaje Natural (NLP) usando spaCy y TF-IDF. Desarrollo de sistemas interactivos en Streamlit, y creación de agentes de Inteligencia Artificial autónomos (ej. proyecto Prometheus) integrando directamente la API de Google Gemini para razonamiento complejo.',
  },
];

export default function SkillsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="skills"
      aria-label="Habilidades"
      className="section-padding"
      style={{ background: 'var(--surface)', position: 'relative' }}
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
          Habilidades
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <h2
            className="reveal"
            style={{
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: 700,
              color: 'var(--foreground)',
              margin: 0,
            }}
          >
            Áreas de expertise
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}
        >
          {SKILL_AREAS.map((area) => (
            <motion.article
              key={area.id}
              layoutId={`skill-card-${area.id}`}
              onClick={() => setSelectedId(area.id)}
              className="skill-card reveal"
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icono */}
              <motion.div
                layoutId={`skill-icon-${area.id}`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'var(--accent-dim)',
                  border: '1px solid rgba(225,29,72,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: 'var(--accent)',
                  marginBottom: '16px',
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                {area.icon}
              </motion.div>

              <motion.h3
                layoutId={`skill-title-${area.id}`}
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {area.title}
              </motion.h3>
              
              <motion.p
                layoutId={`skill-desc-${area.id}`}
                style={{
                  fontSize: '13px',
                  color: 'var(--muted-light)',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                }}
              >
                {area.desc}
              </motion.p>

              {/* Potency meter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                style={{ marginBottom: '14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--muted)' }}>
                  <span>Competencia</span>
                  <span style={{ fontWeight: 600, color: area.color }}>{area.potency}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--surface-2)', borderRadius: '99px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${area.potency}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    style={{ height: '100%', borderRadius: '99px', background: `linear-gradient(90deg, ${area.color}, ${area.color}88)` }}
                  />
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div layoutId={`skill-tags-${area.id}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {area.tags.map((tag) => (
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
            {SKILL_AREAS.map(area => area.id === selectedId && (
              <div
                key={`modal-${area.id}`}
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
                  role="dialog"
                  aria-modal="true"
                  aria-label={area.title}
                  layoutId={`skill-card-${area.id}`}
                  style={{
                    background: 'var(--surface)',
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

                  <motion.div
                    layoutId={`skill-icon-${area.id}`}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      background: 'var(--accent-dim)',
                      border: '1px solid rgba(225,29,72,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: 'var(--accent)',
                      marginBottom: '20px',
                    }}
                  >
                    {area.icon}
                  </motion.div>

                  <motion.h3
                    layoutId={`skill-title-${area.id}`}
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--foreground)',
                      marginBottom: '12px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {area.title}
                  </motion.h3>

                  <motion.p
                    layoutId={`skill-desc-${area.id}`}
                    style={{
                      fontSize: '14px',
                      color: 'var(--muted-light)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    {area.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      background: 'var(--surface-2)',
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '24px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 600 }}>Detalle de experiencia</h4>
                    <p style={{ fontSize: '14px', color: 'var(--foreground-2)', lineHeight: 1.7 }}>
                      {area.details}
                    </p>
                  </motion.div>

                  {/* Potency meter en modal */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginBottom: '20px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: 'var(--muted)' }}>
                      <span>Nivel de competencia</span>
                      <span style={{ fontWeight: 700, color: area.color }}>{area.potency}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--surface-2)', borderRadius: '99px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${area.potency}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                        style={{ height: '100%', borderRadius: '99px', background: `linear-gradient(90deg, ${area.color}, ${area.color}88)` }}
                      />
                    </div>
                  </motion.div>

                  <motion.div layoutId={`skill-tags-${area.id}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {area.tags.map((tag) => (
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
