/**
 * ServicesSection — ISS-050
 * Sección de servicios orientada a clientes y pymes.
 * 3 servicios principales presentados como tarjetas con hover effects y scroll reveal.
 */
import React from 'react';

const SERVICES = [
  {
    id: 'hardware',
    title: 'Reparación de PC',
    subtitle: 'Nivel Componente',
    desc: 'Diagnóstico preciso, microsoldadura y mantenimiento preventivo/correctivo. Revivimos ese equipo que dabas por perdido para que vuelva a rendir al máximo.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: 'software',
    title: 'Automatizaciones',
    subtitle: 'Soluciones Digitales',
    desc: 'Sistemas a medida para PyMEs y emprendedores. Automatizamos tareas repetitivas para que vos y tu equipo se enfoquen en lo que realmente importa: hacer crecer el negocio.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    id: 'data',
    title: 'Ciencia de Datos',
    subtitle: 'Optimización con IA',
    desc: 'Análisis profundo de tus datos, tableros de control predictivos e integración de Inteligencia Artificial para tomar decisiones informadas y escalar tu operatividad.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      aria-label="Servicios"
      className="section-padding section-lazy"
      style={{ background: 'var(--surface-2)' }}
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
            <article
              key={srv.id}
              className="reveal"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '32px 28px',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(225,29,72,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div
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
              </div>

              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  margin: '0 0 4px 0',
                }}
              >
                {srv.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--accent)',
                  fontWeight: 500,
                  margin: '0 0 16px 0',
                }}
              >
                {srv.subtitle}
              </p>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--foreground-2)',
                  margin: 0,
                }}
              >
                {srv.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
