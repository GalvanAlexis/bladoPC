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
    background: 'rgba(253,248,245,0.95)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(184,118,118,0.12)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="/servicios"
              style={{
                fontSize: '12px',
                color: '#a09393',
                textDecoration: 'none',
                fontWeight: 500,
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.2s',
              }}
              className="lum-back-link"
            >
              &larr; Servicios
            </a>
            <span style={styles.logo}>Lumina</span>
          </div>
          <div style={styles.navLinks}>
            <span className="lum-nav-link">Inicio</span>
            <span className="lum-nav-link">Ingredientes</span>
            <span className="lum-nav-link">Testimonios</span>
            <span className="lum-nav-link">Contacto</span>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          padding: '100px 24px 80px',
          maxWidth: '1100px',
          margin: '0 auto',
          gap: 'clamp(32px, 6vw, 80px)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            borderRadius: '3px',
            background: 'linear-gradient(90deg, transparent, #b87676, transparent)',
          }}
        />
        <div style={{ flex: '1 1 45%', minWidth: '280px' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#b87676',
              fontWeight: 700,
              margin: '0 0 16px 0',
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '50px',
              background: 'rgba(184,118,118,0.08)',
              border: '1px solid rgba(184,118,118,0.15)',
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
                padding: '15px 40px',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #b87676 0%, #9a5f5f 100%)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.03em',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 16px rgba(184,118,118,0.35)',
              }}
            >
              Comprar ahora
            </a>
          </div>
          <p
            style={{
              fontSize: '12px',
              color: '#a09393',
              margin: '16px 0 0 0',
            }}
          >
            Envio gratis a todo Argentina · Pagá en hasta 6 cuotas
          </p>
        </div>

        <div
          style={{
            flex: '1 1 45%',
            minWidth: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 'clamp(240px, 30vw, 380px)',
              height: 'clamp(240px, 30vw, 380px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(184,118,118,0.10) 0%, rgba(184,118,118,0.03) 60%, transparent 70%)',
              zIndex: 0,
            }}
          />
          <div
            style={{
              width: 'clamp(200px, 25vw, 320px)',
              height: 'clamp(300px, 38vw, 460px)',
              borderRadius: '80px 80px 40px 40px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(184,118,118,0.25), 0 10px 20px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80"
              alt="Lumina Serum Facial"
              fetchPriority="high"
              width="320"
              height="460"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── Beneficios ─── */}
      <section
        style={{
          padding: 'clamp(60px, 10vh, 100px) 24px',
          background: 'linear-gradient(180deg, #f5e6e6 0%, #f0dede 100%)',
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
            Por que elegir{' '}
            <span style={{ color: '#b87676' }}>Lumina</span>
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
                  padding: '40px 24px 36px',
                  borderRadius: '20px',
                  background: '#fdf8f5',
                  boxShadow: '0 4px 20px rgba(184,118,118,0.10), 0 1px 3px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(184,118,118,0.08)',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '18px', lineHeight: 1 }}>{b.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 10px 0', color: '#2d2323' }}>{b.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#7a6868', margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Ingredientes ─── */}
      <section style={{
        ...styles.section,
        background: 'linear-gradient(180deg, #fdf8f5 0%, #faf3f0 100%)',
        paddingBottom: 'clamp(80px, 12vh, 120px)',
      }}>
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
            color: '#7a6868',
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
          ].map((ing, i) => (
            <div
              key={ing.name}
              style={{
                padding: '24px 20px 20px',
                borderRadius: '14px',
                border: '1px solid rgba(184,118,118,0.08)',
                background: '#fdf8f5',
                boxShadow: '0 2px 12px rgba(184,118,118,0.06)',
                borderLeft: `3px solid ${['#b87676', '#d4a84b', '#8faa7a', '#7a9e9e', '#b87676', '#d4a84b'][i]}`,
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 8px 0', color: '#2d2323' }}>{ing.name}</h3>
              <p style={{ fontSize: '12px', color: '#7a6868', margin: 0, lineHeight: 1.6 }}>{ing.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Testimonios ─── */}
      <section
        style={{
          padding: 'clamp(60px, 10vh, 100px) 24px',
          background: 'linear-gradient(180deg, #f0dede 0%, #ebd5d5 100%)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(22px, 3.5vw, 34px)',
              fontWeight: 700,
              margin: '0 0 12px 0',
              color: '#2d2323',
            }}
          >
            Lo que dicen nuestras clientas
          </h2>
          <p
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#7a6868',
              margin: '0 0 48px 0',
            }}
          >
            Resultados reales de mujeres como vos
          </p>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { name: 'Carolina M.', text: 'Desde que uso Lumina mi piel se ve mas luminosa y las lineas de expresion se notan mucho menos. Lo recomiendo 100%.', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80' },
              { name: 'Valentina R.', text: 'Habia probado mil serums y ninguno me habia funcionado como este. En dos semanas note la diferencia.', rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80' },
              { name: 'Camila L.', text: 'Me encanta que sea natural y que realmente funcione. La textura es super suave y huele increible.', rating: 5, img: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=120&q=80' },
            ].map((t) => (
              <div
                key={t.name}
                style={{
                  flex: '1 1 260px',
                  padding: '32px 24px 28px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #fdf8f5 0%, #faf0f0 100%)',
                  boxShadow: '0 4px 24px rgba(184,118,118,0.12), 0 1px 4px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(184,118,118,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid #b87676',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={t.img}
                      alt={t.name}
                      loading="lazy"
                      width="44"
                      height="44"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#d4a84b', letterSpacing: '0.02em' }}>
                      {'★'.repeat(t.rating)}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#2d2323' }}>{t.name}</span>
                  </div>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#6a5a5a', margin: 0, flex: 1, fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
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
          padding: '48px 24px 40px',
          textAlign: 'center',
          background: '#faf3f0',
        }}
      >
        <span style={{ ...styles.logo, display: 'block', marginBottom: '16px' }}>Lumina</span>
        <p style={{ fontSize: '13px', color: '#7a6868', margin: '0 0 16px 0', maxWidth: '300px', marginInline: 'auto' }}>
          Cuidado facial natural · Hecho en Argentina
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            fontSize: '12px',
            color: '#b87676',
            fontWeight: 600,
          }}
        >
          <span className="lum-footer-link">Instagram</span>
          <span className="lum-footer-link">Facebook</span>
          <span className="lum-footer-link">TikTok</span>
          <span className="lum-footer-link">WhatsApp</span>
        </div>
        <div
          style={{
            width: '32px',
            height: '2px',
            background: 'rgba(184,118,118,0.15)',
            margin: '20px auto',
            borderRadius: '2px',
          }}
        />
        <p style={{ fontSize: '11px', color: '#a09393', margin: 0 }}>
          &copy; 2026 Lumina. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
