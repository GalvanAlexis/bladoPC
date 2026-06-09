/**
 * ProjectsSection — ISS-049
 * Grid de proyectos destacados: InmoVoz + Portfolio Blado.
 */
import React from 'react';

const PROJECTS = [
  {
    id: 'inmovoz',
    title: 'InmoVoz',
    tagline: 'Buscador de propiedades con IA',
    desc: 'Aplicación web que permite buscar propiedades inmobiliarias usando lenguaje natural (NLP). El usuario habla o escribe en lenguaje coloquial y el sistema filtra, clasifica y recomienda resultados relevantes.',
    stack: ['Python', 'Streamlit', 'NLP', 'PostgreSQL', 'Supabase'],
    status: 'En producción',
    statusColor: 'var(--accent)',
    href: 'https://github.com/GalvanAlexis/inmobiliaria-losvagos',
    highlight: true,
  },
  {
    id: 'portfolio',
    title: 'Portfolio Blado',
    tagline: 'Portfolio interactivo con asistente IA',
    desc: 'Este mismo sitio. Una SPA en Next.js 16 con un asistente conversacional, árbol de habilidades navegable (Skill Tree), y un motor de diálogos interactivo. Diseño corporativo black/red.',
    stack: ['Next.js', 'TypeScript', 'React Flow', 'Supabase', 'Prisma'],
    status: 'Live',
    statusColor: '#22c55e',
    href: 'https://github.com/GalvanAlexis/Progresos-Academicos',
    highlight: false,
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Proyectos"
      className="section-padding section-lazy"
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
          Proyectos
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
          Trabajo real, problemas reales
        </h2>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: '24px',
          }}
        >
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="project-card reveal"
              style={{
                borderTop: p.highlight ? '2px solid var(--accent)' : '1px solid var(--border)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '24px 28px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--foreground)',
                      marginBottom: '4px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>
                    {p.tagline}
                  </p>
                </div>
                {/* Status badge */}
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: '99px',
                    background: `${p.statusColor}18`,
                    border: `1px solid ${p.statusColor}40`,
                    color: p.statusColor,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {p.status}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '20px 28px 24px' }}>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--foreground-2)',
                    lineHeight: 1.75,
                    marginBottom: '20px',
                  }}
                >
                  {p.desc}
                </p>

                {/* Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {p.stack.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: '13px', padding: '8px 16px', width: 'fit-content' }}
                >
                  Ver repositorio
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M7 3H3v10h10V9" />
                    <path d="M13 3H9m4 0v4" />
                    <path d="M9 7l4-4" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
