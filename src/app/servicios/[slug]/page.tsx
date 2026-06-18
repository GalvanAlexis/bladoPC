import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATALOGO, findServiceBySlug, getComplexityLabel, getComplexityColors } from '@/lib/services';

export function generateStaticParams() {
  return CATALOGO.map((svc) => ({ slug: svc.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = findServiceBySlug(slug);
  if (!svc) return { title: 'Servicio no encontrado — Portfolio Blado' };
  return {
    title: `${svc.title} — Portfolio Blado`,
    description: svc.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = findServiceBySlug(slug);
  if (!svc) notFound();

  const colors = getComplexityColors(svc.complexity);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--foreground)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div className="section-container" style={{ paddingTop: 'clamp(100px, 15vh, 160px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}>
        <Link
          href="/servicios"
          className="back-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: 'var(--muted)',
            textDecoration: 'none',
            marginBottom: '32px',
            transition: 'color 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Volver al catalogo
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {svc.icon}
          </div>
          <div>
            <h1
              style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {svc.title}
            </h1>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '2px 10px',
                borderRadius: '999px',
                background: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                display: 'inline-block',
                marginTop: '6px',
              }}
            >
              #{svc.order} - {getComplexityLabel(svc.complexity)}
            </span>
          </div>
        </div>

        <div className="section-divider" />

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'var(--foreground-2)',
            maxWidth: '680px',
            margin: '0 0 24px 0',
          }}
        >
          {svc.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)' }}>
            Ideal para:
          </span>
          <span
            className="tech-badge"
            style={{ fontSize: '12px', padding: '3px 12px' }}
          >
            {svc.persona}
          </span>
        </div>

        <div
          style={{
            border: '1px dashed var(--border)',
            borderRadius: '12px',
            padding: 'clamp(32px, 5vw, 48px)',
            textAlign: 'center',
            background: 'var(--surface)',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              marginBottom: '12px',
              opacity: 0.4,
            }}
          >
            {'{  }'}
          </div>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              margin: '0 0 8px 0',
              color: 'var(--foreground)',
            }}
          >
            Pagina de ejemplo en construccion
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Proximamente: demo interactivo, capturas de pantalla y casos de uso reales.
          </p>
        </div>
      </div>
    </div>
  );
}
