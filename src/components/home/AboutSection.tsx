/**
 * AboutSection — ISS-049
 * Sección biográfica: quién es, dónde está, qué estudia, AIDO, stack.
 */
import React from 'react';

const TECH_STACK = [
  'Next.js', 'React', 'TypeScript', 'Node.js',
  'Python', 'Pandas', 'Scikit-Learn',
  'PostgreSQL', 'Supabase', 'Prisma',
  'Git', 'Docker',
];

const FACTS = [
  { label: 'Ubicación', value: 'Chascomús, Buenos Aires, Argentina' },
  { label: 'Formación',  value: 'ISFDyT 57 — Ciencia de Datos e IA · Ing. Sistemas (autodidacta)' },
  { label: 'Empresa',    value: 'AIDO — Co-fundador y desarrollador principal' },
  { label: 'Enfoque',    value: 'Full-Stack Web · Machine Learning · Software a medida' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="Sobre mí"
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
          Sobre mí
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
          Desarrollador con foco en impacto real
        </h2>

        {/* Grid: bio + stack */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Facts */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {FACTS.map((f) => (
              <div
                key={f.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '16px',
                  alignItems: 'start',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    fontWeight: 500,
                    paddingTop: '2px',
                  }}
                >
                  {f.label}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--foreground-2)', lineHeight: 1.6 }}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          {/* Stack + párrafo */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ fontSize: '15px', color: 'var(--foreground-2)', lineHeight: 1.8 }}>
              Me apasiona construir soluciones que van desde aplicaciones web modernas hasta sistemas
              de análisis de datos y machine learning. En AIDO llevamos esas soluciones a clientes reales.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--foreground-2)', lineHeight: 1.8 }}>
              Este portfolio refleja mi proceso de aprendizaje continuo: cada proyecto, cada materia
              y cada tecnología tiene su lugar en el{' '}
              <a href="#skills" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                árbol de habilidades
              </a>
              .
            </p>

            {/* Tech badges */}
            <div>
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '12px',
                }}
              >
                Stack principal
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TECH_STACK.map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
