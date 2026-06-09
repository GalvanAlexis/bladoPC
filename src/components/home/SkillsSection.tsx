/**
 * SkillsSection — ISS-049
 * 4 áreas técnicas principales con reveal scroll-driven.
 * Cada card conecta con el árbol de habilidades interactivo.
 */
import React from 'react';

const SKILL_AREAS = [
  {
    id: 'webdev',
    icon: '⬡',
    title: 'Full-Stack Web',
    desc: 'Aplicaciones web modernas de punta a punta. Desde UI interactivas hasta APIs robustas y bases de datos.',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'REST', 'SSR'],
  },
  {
    id: 'data',
    icon: '◈',
    title: 'IA & Data Science',
    desc: 'Análisis de datos, modelos de machine learning y sistemas con procesamiento de lenguaje natural.',
    tags: ['Python', 'Pandas', 'Scikit-Learn', 'NLP', 'Numpy'],
  },
  {
    id: 'db',
    icon: '▣',
    title: 'Bases de Datos',
    desc: 'Diseño de esquemas, migraciones, optimización de queries y seguridad a nivel de fila (RLS).',
    tags: ['PostgreSQL', 'Supabase', 'Prisma', 'SQL', 'Indexing'],
  },
  {
    id: 'devops',
    icon: '⬡',
    title: 'DevOps & Tooling',
    desc: 'Flujos de CI/CD, containerización, control de versiones y calidad de código.',
    tags: ['Git', 'GitHub Actions', 'Docker', 'Jest', 'ESLint'],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Habilidades"
      className="section-padding section-lazy"
      style={{ background: 'var(--surface)' }}
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
          <a
            href="#assistant"
            className="btn-secondary reveal"
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            Ver árbol completo →
          </a>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '20px',
          }}
        >
          {SKILL_AREAS.map((area) => (
            <article key={area.id} className="skill-card reveal">
              {/* Icono */}
              <div
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
              </div>

              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {area.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--muted-light)',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                }}
              >
                {area.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {area.tags.map((tag) => (
                  <span key={tag} className="tech-badge" style={{ fontSize: '10px', padding: '2px 8px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
