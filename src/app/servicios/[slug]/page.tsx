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
  const example = svc.examples?.[0];

  const steps = [
    { num: '01', title: 'Brief', desc: 'Definimos objetivo, audiencia y CTA principal del proyecto.' },
    { num: '02', title: 'Wireframe', desc: 'Bosquejamos la estructura y jerarquia visual de la pagina.' },
    { num: '03', title: 'Diseno + Dev', desc: 'Maquetamos y desarrollamos en simultaneo con feedback constante.' },
    { num: '04', title: 'Deploy', desc: 'Publicamos, configuramos analytics y te explicamos como medir resultados.' },
  ];

  const deliverables = [
    'Diseno 100% responsive',
    'Formulario de contacto funcional',
    'SEO basico (meta tags, Open Graph)',
    'Carga optimizada ( < 2s )',
    'Analytics de visitas, clics y conversiones',
    'Hosting y dominio opcional',
  ];

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

        {/* ─── Featured project ─── */}
        {example && (
          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: '14px',
              overflow: 'hidden',
              marginBottom: '64px',
              background: 'var(--surface)',
            }}
          >
            <div
              style={{
                height: 'clamp(160px, 25vw, 280px)',
                background: 'linear-gradient(135deg, #f7e8e8 0%, #f0d4d4 30%, #e8c8c8 60%, #dfe8f0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ textAlign: 'center', opacity: 0.6 }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8a6e6e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '16px',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: 'rgba(138,110,110,0.5)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Mockup
              </span>
            </div>
            <div style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
              <h2
                style={{
                  fontSize: 'clamp(17px, 2.5vw, 22px)',
                  fontWeight: 700,
                  margin: '0 0 6px 0',
                }}
              >
                {example.title}
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--foreground-2)',
                  margin: '0 0 16px 0',
                  maxWidth: '600px',
                }}
              >
                {example.desc}
              </p>
              <div
                style={{
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.15)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#22c55e',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Resultados
                </span>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'var(--foreground)',
                    margin: 0,
                  }}
                >
                  {example.benefit}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ─── How we work ─── */}
        <h2
          style={{
            fontSize: 'clamp(18px, 2.8vw, 24px)',
            fontWeight: 700,
            margin: '0 0 6px 0',
          }}
        >
          Como trabajamos
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--muted)',
            margin: '0 0 28px 0',
          }}
        >
          De la idea al deploy, siempre con vos en el loop.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '64px',
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                flex: '1 1 180px',
                minWidth: '140px',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  opacity: 0.4,
                  display: 'block',
                  marginBottom: '8px',
                  lineHeight: 1,
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  margin: '0 0 6px 0',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  lineHeight: 1.5,
                  color: 'var(--muted)',
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Deliverables ─── */}
        <h2
          style={{
            fontSize: 'clamp(18px, 2.8vw, 24px)',
            fontWeight: 700,
            margin: '0 0 6px 0',
          }}
        >
          Que incluye
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--muted)',
            margin: '0 0 24px 0',
          }}
        >
          Todo lo necesario para que tu landing cumpla su objetivo.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '48px',
            maxWidth: '480px',
          }}
        >
          {deliverables.map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                color: 'var(--foreground)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M13.3 4.3L6 11.6 2.7 8.3" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: 'clamp(28px, 4vw, 40px)',
            textAlign: 'center',
            background: 'var(--surface)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(17px, 2.5vw, 22px)',
              fontWeight: 700,
              margin: '0 0 10px 0',
            }}
          >
            Listo para arrancar tu landing?
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              margin: '0 0 24px 0',
              maxWidth: '440px',
              marginInline: 'auto',
            }}
          >
            Contame de tu proyecto y te armo una propuesta sin compromiso.
          </p>
          <a
            href="https://wa.me/5492494226641"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '10px',
              background: 'var(--accent)',
              color: 'var(--background)',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escribime por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
