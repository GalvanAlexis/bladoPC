import { notFound } from 'next/navigation';

const EJEMPLOS: Record<string, { title: string; desc: string }> = {
  landing: {
    title: 'Lumina — Serum Facial Natural',
    desc: 'Landing page profesional para producto cosmetico con captacion SEO y venta directa.',
  },
};

export function generateStaticParams() {
  return Object.keys(EJEMPLOS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ej = EJEMPLOS[slug];
  if (!ej) return { title: 'Ejemplo no encontrado' };
  return {
    title: ej.title,
    description: ej.desc,
  };
}

const styles = {
  fullPage: {
    minHeight: '100vh',
    background: '#fdf8f5',
    color: '#2d2323',
    fontFamily: 'var(--font-sans)',
    lineHeight: 1.6,
  },
  nav: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(253,248,245,0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(184,118,118,0.08)',
  },
  navInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#b87676',
  },
  navLinks: {
    display: 'flex',
    gap: '28px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#6a5a5a',
  },
  section: {
    padding: 'clamp(60px, 10vh, 100px) 24px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
};

export default async function EjemploPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ej = EJEMPLOS[slug];
  if (!ej) notFound();

  return (
    <div style={styles.fullPage}>
      {/* ─── Nav ─── */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <span style={styles.logo}>Lumina</span>
          <div style={styles.navLinks}>
            <span>Inicio</span>
            <span>Ingredientes</span>
            <span>Testimonios</span>
            <span>Contacto</span>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          padding: '100px 24px 60px',
          maxWidth: '1100px',
          margin: '0 auto',
          gap: 'clamp(32px, 6vw, 80px)',
        }}
      >
        <div style={{ flex: '1 1 45%', minWidth: '280px' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#d4a84b',
              fontWeight: 600,
              margin: '0 0 16px 0',
            }}
          >
            Nueva formula 2026
          </p>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.15,
              margin: '0 0 18px 0',
              color: '#2d2323',
            }}
          >
            Tu piel merece{' '}
            <span style={{ color: '#b87676' }}>lo natural</span>
          </h1>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: '#6a5a5a',
              margin: '0 0 24px 0',
              maxWidth: '440px',
            }}
          >
            Serum facial organico con acido hialuronico, vitamina C y aceite de
            rosa mosqueta. Hidratacion profunda sin quimicos agresivos.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#2d2323',
              }}
            >
              $24.990
            </span>
            <a
              href="#"
              className="lum-btn"
              style={{
                display: 'inline-block',
                padding: '14px 36px',
                borderRadius: '50px',
                background: '#b87676',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Comprar ahora
            </a>
          </div>
          <p
            style={{
              fontSize: '12px',
              color: '#a09393',
              margin: '14px 0 0 0',
            }}
          >
            Envio gratis a todo Chile · Pagá en hasta 6 cuotas
          </p>
        </div>

        <div
          style={{
            flex: '1 1 45%',
            minWidth: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 'clamp(200px, 25vw, 320px)',
              height: 'clamp(300px, 38vw, 460px)',
              borderRadius: '80px 80px 40px 40px',
              background: 'linear-gradient(160deg, #f0e4e4 0%, #e8c8c8 40%, #d4a84b 90%, #c9973e 100%)',
              position: 'relative',
              boxShadow: '0 30px 60px rgba(184,118,118,0.2), inset 0 -20px 40px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
              }}
            >
              LUMINA
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Beneficios ─── */}
      <section
        style={{
          padding: 'clamp(60px, 10vh, 100px) 24px',
          background: '#faf0f0',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(22px, 3.5vw, 34px)',
              fontWeight: 700,
              margin: '0 0 48px 0',
              color: '#2d2323',
            }}
          >
            Por que elegir Lumina
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { icon: '💧', title: 'Hidratacion 24h', desc: 'Acido hialuronico de triple peso molecular que retiene la humedad en todas las capas de la piel.' },
              { icon: '🌿', title: '100% Natural', desc: 'Formula vegana, libre de parabenos, sulfatos, siliconas y fragancias sinteticas.' },
              { icon: '✨', title: 'Antioxidante Potente', desc: 'Vitamina C estabilizada que ilumina, unifica el tono y combate los radicales libres.' },
            ].map((b) => (
              <div
                key={b.title}
                style={{
                  flex: '1 1 260px',
                  textAlign: 'center',
                  padding: '32px 20px',
                  borderRadius: '16px',
                  background: '#fdf8f5',
                  border: '1px solid rgba(184,118,118,0.1)',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{b.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>{b.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#6a5a5a', margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Ingredientes ─── */}
      <section style={styles.section}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(22px, 3.5vw, 34px)',
            fontWeight: 700,
            margin: '0 0 12px 0',
          }}
        >
          Ingredientes que importan
        </h2>
        <p
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#6a5a5a',
            margin: '0 0 48px 0',
            maxWidth: '500px',
            marginInline: 'auto',
          }}
        >
          Cada componente fue seleccionado por su eficacia comprobada y su
          origen sostenible.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { name: 'Acido Hialuronico', desc: 'Hidratacion profunda y relleno de arrugas' },
            { name: 'Vitamina C', desc: 'Antioxidante que ilumina y unifica el tono' },
            { name: 'Rosa Mosqueta', desc: 'Regenera la piel y reduce cicatrices' },
            { name: 'Aloe Vera', desc: 'Calma la irritacion y aporta frescura' },
            { name: 'Colageno Vegetal', desc: 'Mejora la elasticidad y firmeza' },
            { name: 'Aceite de Jojoba', desc: 'Regula la produccion de sebo natural' },
          ].map((ing) => (
            <div
              key={ing.name}
              style={{
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(184,118,118,0.1)',
                background: '#fdf8f5',
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 6px 0' }}>{ing.name}</h3>
              <p style={{ fontSize: '12px', color: '#6a5a5a', margin: 0, lineHeight: 1.5 }}>{ing.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Testimonios ─── */}
      <section
        style={{
          padding: 'clamp(60px, 10vh, 100px) 24px',
          background: '#faf0f0',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(22px, 3.5vw, 34px)',
              fontWeight: 700,
              margin: '0 0 48px 0',
            }}
          >
            Lo que dicen nuestras clientas
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { name: 'Carolina M.', text: 'Desde que uso Lumina mi piel se ve mas luminosa y las lineas de expresion se notan mucho menos. Lo recomiendo 100%.', rating: 5 },
              { name: 'Valentina R.', text: 'Habia probado mil serums y ninguno me habia funcionado como este. En dos semanas note la diferencia.', rating: 5 },
              { name: 'Camila L.', text: 'Me encanta que sea natural y que realmente funcione. La textura es super suave y huele increible.', rating: 5 },
            ].map((t) => (
              <div
                key={t.name}
                style={{
                  flex: '1 1 260px',
                  padding: '28px 24px',
                  borderRadius: '16px',
                  background: '#fdf8f5',
                  border: '1px solid rgba(184,118,118,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: '13px', color: '#d4a84b', marginBottom: '12px' }}>
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#6a5a5a', margin: '0 0 16px 0', flex: 1, fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#b87676' }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section style={styles.section}>
        <div
          style={{
            background: 'linear-gradient(135deg, #b87676 0%, #a06565 100%)',
            borderRadius: '20px',
            padding: 'clamp(40px, 6vw, 64px)',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 30px)',
              fontWeight: 700,
              margin: '0 0 10px 0',
            }}
          >
            Recibi un 10% OFF en tu primera compra
          </h2>
          <p
            style={{
              fontSize: '14px',
              opacity: 0.85,
              margin: '0 0 28px 0',
              maxWidth: '420px',
              marginInline: 'auto',
            }}
          >
            Suscribite a nuestro newsletter y recibi consejos de cuidado facial,
            lanzamientos exclusivos y descuentos especiales.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '440px',
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <input
              type="email"
              placeholder="tu@email.com"
              readOnly
              style={{
                flex: '1 1 220px',
                padding: '14px 20px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '14px',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                outline: 'none',
              }}
            />
            <button
              type="button"
              style={{
                padding: '14px 32px',
                borderRadius: '50px',
                border: 'none',
                background: '#fff',
                color: '#b87676',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Quiero mi descuento
            </button>
          </div>
          <p
            style={{
              fontSize: '11px',
              opacity: 0.6,
              margin: '14px 0 0 0',
            }}
          >
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          borderTop: '1px solid rgba(184,118,118,0.1)',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        <span style={{ ...styles.logo, display: 'block', marginBottom: '12px' }}>Lumina</span>
        <p style={{ fontSize: '12px', color: '#a09393', margin: '0 0 12px 0' }}>
          Cuidado facial natural · Hecho en Chile
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            fontSize: '12px',
            color: '#b87676',
            fontWeight: 500,
          }}
        >
          <span>Instagram</span>
          <span>Facebook</span>
          <span>TikTok</span>
          <span>WhatsApp</span>
        </div>
        <p style={{ fontSize: '11px', color: '#c5b5b5', margin: '20px 0 0 0' }}>
          &copy; 2026 Lumina. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
