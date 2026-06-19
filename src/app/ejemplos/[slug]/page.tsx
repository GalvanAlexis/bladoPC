import { notFound } from 'next/navigation';

const EJEMPLOS: Record<string, { title: string; desc: string }> = {
  landing: {
    title: 'Lumina — Serum Facial Natural',
    desc: 'Landing page profesional para producto cosmetico con captacion SEO y venta directa.',
  },
  contable: {
    title: 'M&A — Estudio Contable',
    desc: 'Sitio corporativo multi-seccion para despacho contable con servicios, equipo, blog y captacion de leads.',
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

  if (slug === 'contable') {
    return <ContablePage />;
  }

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
        className="lum-hero"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          padding: '100px 24px 80px',
          maxWidth: '1100px',
          margin: '0 auto',
          gap: 'clamp(32px, 6vw, 80px)',
          position: 'relative',
          flexWrap: 'wrap',
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
            Envio gratis a todo Argentina &middot; Paga en hasta 6 cuotas
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
            className="lum-hero-img-wrap"
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

/* ═══════════════════════════════════════════════════
   contable: M&A — Estudio Contable
   ═══════════════════════════════════════════════════ */

const C = {
  fullPage: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    background: '#f5f3f0',
    color: '#1a1a1a',
    minHeight: '100dvh',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
  } as const,
};

const granate = '#7a1a1a';
const granateLight = '#9a2a2a';
const granateDark = '#5a1010';
const bgWarm = '#f5f3f0';
const bgSection = '#edeae5';
const textPrimary = '#1a1a1a';
const textSecondary = '#5a5550';

const servicios = [
  {
    titulo: 'Liquidacion de Sueldos',
    desc: 'Calculo de remuneraciones, cargas sociales y sindicales. Presentacion de declaraciones juradas mensuales y anuales.',
    publico: 'Empresas con empleados registrados',
  },
  {
    titulo: 'Impuestos (IVA, Ganancias, BBPP)',
    desc: 'Liquidacion mensual y anual de todos los impuestos nacionales y provinciales. Regimenes de retencion y percepcion.',
    publico: 'Monotributistas, autonomos y sociedades',
  },
  {
    titulo: 'Contabilidad General',
    desc: 'Registro contable completo, balances, libros IVA y societarios. Emision de estados contables certificados.',
    publico: 'Comercios, industrias y servicios',
  },
  {
    titulo: 'Monotributo',
    desc: 'Altas, bajas, recategorizaciones y declaraciones juradas mensuales. Gestion de categorias y facturacion.',
    publico: 'Emprendedores y profesionales independientes',
  },
  {
    titulo: 'Sociedades y Empresas',
    desc: 'Constitucion de SAS/SRL, asambleas, registros contables y presentacion de estados contables anuales.',
    publico: 'Empresas constituidas o en formacion',
  },
  {
    titulo: 'Auditoria y Balances',
    desc: 'Revision de estados contables, auditoria externa y certificacion de balances para entes publicos y privados.',
    publico: 'Sociedades que requieren balance certificado',
  },
];

const equipo = [
  {
    nombre: 'CPN Martin Martinez',
    rol: 'Socio Fundador',
    bio: 'Contador Publico (UBA). Especialista en Impuestos. +15 anos de experiencia en asesoria impositiva a PyMEs.',
  },
  {
    nombre: 'Cra. Laura Gomez',
    rol: 'Socia',
    bio: 'Contadora Publica (UNLP). Especialista en Liquidacion de Sueldos. +12 anos liderando el area laboral.',
  },
  {
    nombre: 'CPN Federico Lopez',
    rol: 'Senior',
    bio: 'Contador Publico. Especialista en Sociedades y Constitucion de Empresas. Expositor en camaras empresariales.',
  },
];

const diferenciales = [
  {
    titulo: 'Respuesta en menos de 24h',
    desc: 'Consultas respondidas dentro del dia habil. Sin esperas ni mensajes sin respuesta.',
  },
  {
    titulo: 'Atencion personalizada',
    desc: 'Un contador asignado por cliente. Conoces a quien te atiende y el te conoce a vos.',
  },
  {
    titulo: 'Precios claros',
    desc: 'Honorarios fijos y previsibles desde el inicio. Sin cargos sorpresa ni facturas inesperadas.',
  },
  {
    titulo: 'Plataforma online',
    desc: 'Portal digital para subir y descargar tus documentos, recibir recordatorios y ver el estado de tus tramites.',
  },
];

const recursos = [
  {
    titulo: 'Guia completa de Monotributo 2026',
    desc: 'Todo lo que necesitas saber para categorizarte, recategorizarte y pagar menos. Incluye tabla de categorias actualizada.',
  },
  {
    titulo: 'Calendario impositivo: vencimientos de Julio',
    desc: 'Fechas clave de IVA, Ganancias, Bienes Personales, Sueldos y mas. No te pierdas ningun vencimiento.',
  },
];

function ctaBtn(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    display: 'inline-block',
    padding: '14px 36px',
    borderRadius: '6px',
    background: granate,
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ...extra,
  };
}

function ContablePage() {
  return (
    <div style={C.fullPage}>

      {/* ─── Nav ─── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(245,243,240,0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ ...C.container, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a
              href="/servicios"
              style={{
                fontSize: '12px',
                color: textSecondary,
                textDecoration: 'none',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.2s',
              }}
            >
              &larr; Servicios
            </a>
            <span style={{ fontSize: '18px', fontWeight: 700, color: granate }}>M&amp;A</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '13px', fontWeight: 500, color: textSecondary }}>
            <span style={{ cursor: 'default' }}>Servicios</span>
            <span style={{ cursor: 'default' }}>Equipo</span>
            <span style={{ cursor: 'default' }}>Recursos</span>
            <span style={{ cursor: 'default' }}>Contacto</span>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section
        style={{
          minHeight: '85dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: `linear-gradient(135deg, ${granateDark} 0%, ${granate} 50%, ${granateLight} 100%)`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            mixBlendMode: 'overlay',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '120px 24px 80px',
            maxWidth: '720px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 600,
              margin: '0 0 16px 0',
            }}
          >
            Estudio Contable en Chascomus
          </p>
          <h1
            style={{
              fontSize: 'clamp(30px, 5vw, 50px)',
              fontWeight: 700,
              lineHeight: 1.12,
              margin: '0 0 20px 0',
              color: '#fff',
            }}
          >
            Tu contador de confianza,
            <br />
            <span style={{ borderBottom: '2px solid rgba(255,255,255,0.3)' }}>siempre cerca</span>
          </h1>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.8)',
              margin: '0 0 32px 0',
              maxWidth: '540px',
              marginInline: 'auto',
            }}
          >
            Mas de 12 anos asesorando a PyMEs, comercios y profesionales en Chascomus y la region.
            Liquidacion de sueldos, impuestos, contabilidad general y mas.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={ctaBtn()}>
              Solicitar presupuesto
            </a>
            <a
              href="#"
              style={{
                ...ctaBtn(),
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
              }}
            >
              Conocer servicios
            </a>
          </div>
        </div>
      </section>

      {/* ─── Metrics ─── */}
      <section style={{ padding: 'clamp(48px, 8vh, 72px) 24px', background: '#fff' }}>
        <div style={{ ...C.container, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '32px' }}>
          {[
            { num: '+12', label: 'anos de experiencia' },
            { num: '+350', label: 'clientes activos' },
            { num: '+2.000', label: 'declaraciones anuales' },
            { num: '98%', label: 'retencion de clientes' },
          ].map((m) => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: granate, lineHeight: 1 }}>
                {m.num}
              </div>
              <div style={{ fontSize: '13px', color: textSecondary, marginTop: '6px' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Servicios ─── */}
      <section style={{ padding: 'clamp(60px, 10vh, 100px) 24px' }}>
        <div style={C.container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: granate,
                fontWeight: 700,
                margin: '0 0 8px 0',
              }}
            >
              Servicios
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: textPrimary }}>
              Todo lo que tu negocio necesita
            </h2>
            <p style={{ fontSize: '15px', color: textSecondary, maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
              Desde monotributo hasta sociedades completas. Te acompanamos en cada etapa de tu negocio.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {servicios.map((s) => (
              <div
                key={s.titulo}
                style={{
                  background: '#fff',
                  borderRadius: '10px',
                  padding: '28px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0', color: textPrimary }}>
                  {s.titulo}
                </h3>
                <p style={{ fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: '0 0 12px 0' }}>
                  {s.desc}
                </p>
                <span
                  style={{
                    fontSize: '11px',
                    color: granate,
                    fontWeight: 500,
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '50px',
                    background: `rgba(122,26,26,0.06)`,
                  }}
                >
                  {s.publico}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Us ─── */}
      <section style={{ padding: 'clamp(60px, 10vh, 100px) 24px', background: bgSection }}>
        <div style={C.container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: textPrimary }}>
              Por que elegirnos
            </h2>
            <p style={{ fontSize: '15px', color: textSecondary, maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
              No somos un estudio mas. Estos son los valores que nos diferencian.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {diferenciales.map((d) => (
              <div key={d.titulo} style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: `rgba(122,26,26,0.08)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '20px',
                    color: granate,
                  }}
                >
                  &#10003;
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0', color: textPrimary }}>
                  {d.titulo}
                </h3>
                <p style={{ fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section style={{ padding: 'clamp(60px, 10vh, 100px) 24px' }}>
        <div style={C.container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: granate,
                fontWeight: 700,
                margin: '0 0 8px 0',
              }}
            >
              Equipo
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: textPrimary }}>
              Conocenos
            </h2>
            <p style={{ fontSize: '15px', color: textSecondary, maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
              Detras de cada servicio hay personas comprometidas con tu tranquilidad fiscal.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {equipo.map((m) => (
              <div
                key={m.nombre}
                style={{
                  background: '#fff',
                  borderRadius: '10px',
                  padding: '28px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                  textAlign: 'center',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${granate} 0%, ${granateLight} 100%)`,
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 600,
                  }}
                >
                  {m.nombre.split(' ')[1][0]}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 2px 0', color: textPrimary }}>
                  {m.nombre}
                </h3>
                <p style={{ fontSize: '12px', color: granate, fontWeight: 600, margin: '0 0 10px 0' }}>
                  {m.rol}
                </p>
                <p style={{ fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recursos ─── */}
      <section style={{ padding: 'clamp(60px, 10vh, 100px) 24px', background: bgSection }}>
        <div style={C.container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: granate,
                fontWeight: 700,
                margin: '0 0 8px 0',
              }}
            >
              Recursos
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: textPrimary }}>
              Articulos y guias
            </h2>
            <p style={{ fontSize: '15px', color: textSecondary, maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
              Informacion util para mantenerte al dia con tus obligaciones fiscales.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {recursos.map((r) => (
              <div
                key={r.titulo}
                style={{
                  background: '#fff',
                  borderRadius: '10px',
                  padding: '28px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '4px',
                    borderRadius: '2px',
                    background: granate,
                    marginBottom: '16px',
                  }}
                />
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0', color: textPrimary }}>
                  {r.titulo}
                </h3>
                <p style={{ fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  {r.desc}
                </p>
                <a
                  href="#"
                  style={{
                    fontSize: '13px',
                    color: granate,
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Leer articulo &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section style={{ padding: 'clamp(60px, 10vh, 100px) 24px' }}>
        <div style={{ ...C.container, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: granate,
                fontWeight: 700,
                margin: '0 0 8px 0',
              }}
            >
              Contacto
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 700, margin: '0 0 16px 0', color: textPrimary }}>
              Trabajemos juntos
            </h2>
            <p style={{ fontSize: '15px', color: textSecondary, lineHeight: 1.6, margin: '0 0 24px 0' }}>
              Dejanos tus datos y te llamamos en menos de 24h para coordinar una primera reunion sin cargo.
            </p>
            <div style={{ fontSize: '14px', color: textSecondary, lineHeight: 2 }}>
              <div><strong style={{ color: textPrimary }}>Direccion:</strong> Av. Lastra 320, Chascomus</div>
              <div><strong style={{ color: textPrimary }}>Telefono:</strong> (02241) 45-6789</div>
              <div><strong style={{ color: textPrimary }}>Email:</strong> estudio@mya-contable.com.ar</div>
              <div><strong style={{ color: textPrimary }}>Horario:</strong> Lun a Vie 9:00 - 18:00</div>
            </div>
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: '10px',
              padding: '32px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textPrimary, marginBottom: '6px' }}>
                Nombre
              </label>
              <input
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  fontSize: '14px',
                  background: bgWarm,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
                placeholder="Tu nombre"
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textPrimary, marginBottom: '6px' }}>
                Email o telefono
              </label>
              <input
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  fontSize: '14px',
                  background: bgWarm,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textPrimary, marginBottom: '6px' }}>
                Mensaje
              </label>
              <textarea
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  fontSize: '14px',
                  background: bgWarm,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  minHeight: '80px',
                }}
                placeholder="Contame de tu negocio y en que necesitas ayuda..."
              />
            </div>
            <button style={ctaBtn({ width: '100%', textAlign: 'center' })}>
              Enviar consulta
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          padding: '40px 24px',
          background: granateDark,
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          fontSize: '12px',
        }}
      >
        <div style={C.container}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>M&amp;A</div>
          <p style={{ margin: '0 0 16px 0', lineHeight: 1.6 }}>
            Estudio Contable &mdash; Av. Lastra 320, Chascomus, Provincia de Buenos Aires
          </p>
          <div
            style={{
              width: '32px',
              height: '2px',
              background: 'rgba(255,255,255,0.15)',
              margin: '0 auto 16px',
              borderRadius: '2px',
            }}
          />
          <p style={{ margin: 0 }}>&copy; 2026 M&amp;A Estudio Contable. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
