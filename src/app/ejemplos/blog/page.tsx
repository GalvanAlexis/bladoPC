import Link from 'next/link';

const VORTEX = {
  accent: '#4f46e5',
  accentLight: '#6366f1',
  accentDark: '#3730a3',
  accentBg: 'rgba(79,70,229,0.06)',
  accentBorder: 'rgba(79,70,229,0.12)',
};

const CATEGORIES = [
  { id: 'tech', name: 'Tecnologia', color: '#2563eb' },
  { id: 'culture', name: 'Cultura', color: '#7c3aed' },
  { id: 'business', name: 'Negocios', color: '#059669' },
  { id: 'lifestyle', name: 'Estilo de Vida', color: '#d97706' },
  { id: 'trends', name: 'Tendencias', color: '#dc2626' },
];

const AUTHORS = [
  { id: 'ag', name: 'Alexis Galvan', role: 'Editor Principal', avatar: 'AG' },
  { id: 'mc', name: 'Maria Castro', role: 'Redactora Tech', avatar: 'MC' },
  { id: 'jp', name: 'Juan Perez', role: 'Analista de Negocios', avatar: 'JP' },
];

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
  popular?: boolean;
}

const POSTS: Post[] = [
  {
    id: 'vortex-001',
    title: 'El auge de la IA generativa en las PyMEs argentinas',
    excerpt: 'Como las empresas locales estan adoptando inteligencia artificial para automatizar procesos, reducir costos y competir con grandes corporaciones.',
    content: 'La inteligencia artificial generativa dejo de ser un lujo de las grandes corporaciones. En 2026, las PyMEs argentinas estan adoptando estas tecnologias a un ritmo acelerado...',
    category: 'tech',
    author: 'ag',
    date: '15 Jun, 2026',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    featured: true,
    popular: true,
  },
  {
    id: 'vortex-002',
    title: 'Guia completa para migrar tu negocio al entorno digital',
    excerpt: 'Pasos concretos para llevar tu comercio fisico al mundo online sin morir en el intento.',
    content: 'Migrar un negocio tradicional al mundo digital puede parecer abrumador, pero con una estrategia clara es mas simple de lo que parece...',
    category: 'business',
    author: 'jp',
    date: '12 Jun, 2026',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    featured: true,
  },
  {
    id: 'vortex-003',
    title: 'Minimalismo digital: como reducir el estres tecnológico',
    excerpt: 'Estrategias para recuperar tu atencion y productividad en un mundo de distracciones constantes.',
    content: 'Pasamos horas frente a pantallas, atrapados en un ciclo de notificaciones, scrolling infinito y multitarea que agota nuestra mente...',
    category: 'lifestyle',
    author: 'mc',
    date: '10 Jun, 2026',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80',
    popular: true,
  },
  {
    id: 'vortex-004',
    title: 'Blockchain mas alla de las criptomonedas',
    excerpt: 'Trazabilidad, contratos inteligentes y votacion electronica: los usos reales que estan transformando industrias.',
    content: 'Cuando se habla de blockchain, la mayoria piensa en Bitcoin y criptomonedas. Sin embargo, la tecnologia subyacente tiene aplicaciones mucho mas amplias...',
    category: 'tech',
    author: 'ag',
    date: '8 Jun, 2026',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
    popular: true,
  },
  {
    id: 'vortex-005',
    title: 'Cine argentino 2026: las peliculas que tenes que ver',
    excerpt: 'Un repaso por los estrenos nacionales mas destacados del ano y las tendencias que marcan la industria.',
    content: 'El cine argentino atraviesa un momento creativo excepcional. Con presupuestos ajustados pero historias potentes...',
    category: 'culture',
    author: 'mc',
    date: '5 Jun, 2026',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
  },
  {
    id: 'vortex-006',
    title: 'Coworking en Chascomus: el nuevo hub de emprendedores',
    excerpt: 'Como los espacios de trabajo compartido estan cambiando la cultura laboral en la ciudad.',
    content: 'Chascomus ya no es solo un destino turistico de fin de semana. La ciudad esta viendo un crecimiento silencioso...',
    category: 'trends',
    author: 'jp',
    date: '3 Jun, 2026',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    id: 'vortex-007',
    title: 'Como armar un portfolio digital que consiga clientes',
    excerpt: 'Las claves para mostrar tu trabajo de forma profesional y convertir visitas en proyectos pagos.',
    content: 'En 2026, tener un portfolio digital no es opcional para ningun profesional creativo o desarrollador...',
    category: 'business',
    author: 'ag',
    date: '1 Jun, 2026',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    popular: true,
  },
  {
    id: 'vortex-008',
    title: 'La vuelta del vinilo: por que lo analogico esta de moda',
    excerpt: 'El resurgimiento de los discos de vinilo y lo que dice sobre nuestra relacion con la tecnologia.',
    content: 'En una era dominada por el streaming y la musica digital, los discos de vinilo estan experimentando un renacimiento...',
    category: 'culture',
    author: 'mc',
    date: '30 May, 2026',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
  },
];

function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id) || { id: '', name: id, color: '#666' };
}

function getAuthor(id: string) {
  return AUTHORS.find((a) => a.id === id) || { id: '', name: id, role: '', avatar: '?' };
}

const featured = POSTS.find((p) => p.featured);
const popular = POSTS.filter((p) => p.popular);
const rest = POSTS.filter((p) => !p.featured);

export default function VortexHome() {
  return (
    <div className="vortex-full">
      <style>{`
        .vortex-full {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: var(--v-bg);
          color: var(--v-text);
          min-height: 100dvh;
        }
        :root {
          --v-bg: #fafafa;
          --v-surface: #ffffff;
          --v-surface-2: #f5f5f5;
          --v-text: #1a1a2e;
          --v-text-secondary: #6b7280;
          --v-border: #e5e7eb;
          --v-accent: ${VORTEX.accent};
          --v-header-bg: rgba(250,250,250,0.95);
          color-scheme: light dark;
        }
        .vortex-dark {
          --v-bg: #0f0f1a;
          --v-surface: #1a1a2e;
          --v-surface-2: #16162a;
          --v-text: #e5e7eb;
          --v-text-secondary: #9ca3af;
          --v-border: #2d2d44;
          --v-header-bg: rgba(15,15,26,0.95);
          color-scheme: dark;
        }
        .v-hero-post {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .v-hero-post {
            grid-template-columns: 1fr;
          }
        }
        .v-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .v-grid {
            grid-template-columns: 1fr;
          }
        }
        .v-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .v-card {
          background: var(--v-surface);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--v-border);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .v-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(79,70,229,0.08);
        }
        .v-category-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
        }
        .v-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--v-header-bg);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--v-border);
          transition: transform 0.3s ease;
        }
        .v-header.hidden {
          transform: translateY(-100%);
        }
        .v-search-popover {
          width: min(400px, 90vw);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--v-border);
          background: var(--v-surface);
          color: var(--v-text);
        }
        .v-search-popover::backdrop {
          background: rgba(0,0,0,0.2);
        }
        .v-newsletter {
          background: linear-gradient(135deg, ${VORTEX.accentDark} 0%, ${VORTEX.accent} 50%, ${VORTEX.accentLight} 100%);
          border-radius: 16px;
          padding: clamp(40px, 6vw, 64px);
          text-align: center;
          color: #fff;
        }
        .v-footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        @media (max-width: 640px) {
          .v-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .v-popular-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--v-border);
        }
        .v-popular-item:last-child {
          border-bottom: none;
        }
        @media (prefers-reduced-motion: no-preference) {
          .v-scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            z-index: 200;
            background: linear-gradient(90deg, ${VORTEX.accent}, ${VORTEX.accentLight});
            transform-origin: 0 50%;
            animation: v-grow auto linear;
            animation-timeline: scroll();
          }
          @keyframes v-grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        }
        [data-sidebar-link].active {
          color: ${VORTEX.accent} !important;
          font-weight: 600;
        }
      `}</style>

      <div className="v-scroll-progress" aria-hidden="true" />

      {/* ─── Header ─── */}
      <header className="v-header" id="v-header">
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '60px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/servicios" style={{
              fontSize: '12px', color: 'var(--v-text-secondary)', textDecoration: 'none',
              fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              &larr; Servicios
            </Link>
            <span style={{
              fontSize: '20px', fontWeight: 800, color: VORTEX.accent,
              letterSpacing: '-0.03em',
            }}>
              Vortex
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <nav style={{ display: 'flex', gap: '20px', fontSize: '13px', fontWeight: 500 }}>
              {CATEGORIES.map((c) => (
                <span key={c.id} style={{
                  color: 'var(--v-text-secondary)', cursor: 'default',
                  transition: 'color 0.2s',
                }}>
                  {c.name}
                </span>
              ))}
            </nav>
            <button
              popoverTarget="v-search"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--v-text-secondary)', fontSize: '18px', padding: '4px',
              }}
              aria-label="Buscar articulos"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <Link
              href="/ejemplos/blog/admin"
              style={{
                fontSize: '12px', fontWeight: 600, color: VORTEX.accent,
                textDecoration: 'none', padding: '6px 14px', borderRadius: '6px',
                border: `1px solid ${VORTEX.accentBorder}`,
                background: VORTEX.accentBg, letterSpacing: '0.02em',
              }}
            >
              Login
            </Link>
            <button
              id="v-dark-toggle"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--v-text-secondary)', fontSize: '18px', padding: '4px',
              }}
              aria-label="Cambiar modo oscuro"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Search Popover ─── */}
      <div id="v-search" className="v-search-popover" popover="auto">
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            type="search"
            placeholder="Buscar articulos..."
            readOnly
            style={{
              flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--v-border)',
              background: 'var(--v-surface-2)', color: 'var(--v-text)', fontSize: '14px',
            }}
          />
          <button
            popoverTarget="v-search"
            popoverTargetAction="hide"
            style={{
              padding: '10px 16px', borderRadius: '8px', border: 'none',
              background: VORTEX.accent, color: '#fff', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cerrar
          </button>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--v-text-secondary)', margin: 0 }}>
          Resultados simulados: buscaria entre {POSTS.length} articulos indexados.
        </p>
      </div>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* ─── Hero Featured ─── */}
        {featured && (() => {
          const cat = getCategory(featured.category);
          const author = getAuthor(featured.author);
          return (
            <section className="v-hero-post" style={{ marginBottom: '48px' }}>
              <div>
                <span className="v-category-badge" style={{
                  background: `${cat.color}1a`, color: cat.color, marginBottom: '12px', display: 'inline-block',
                }}>
                  {cat.name}
                </span>
                <h1 style={{
                  fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, lineHeight: 1.15,
                  margin: '12px 0', color: 'var(--v-text)',
                }}>
                  <Link href={`/ejemplos/blog/${featured.id}`} style={{
                    color: 'inherit', textDecoration: 'none',
                  }}>
                    {featured.title}
                  </Link>
                </h1>
                <p style={{
                  fontSize: '15px', lineHeight: 1.7, color: 'var(--v-text-secondary)',
                  margin: '0 0 20px 0',
                }}>
                  {featured.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--v-text-secondary)' }}>
                  <span style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: VORTEX.accent, color: '#fff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700,
                  }}>
                    {author.avatar}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--v-text)' }}>{author.name}</span>
                  <span>&middot;</span>
                  <span>{featured.date}</span>
                  <span>&middot;</span>
                  <span>{featured.readTime} min lectura</span>
                </div>
              </div>
              <div style={{
                borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(79,70,229,0.12)',
              }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  fetchPriority="high"
                  width="600"
                  height="400"
                  style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '3/2', objectFit: 'cover' }}
                />
              </div>
            </section>
          );
        })()}

        {/* ─── Grid + Sidebar ─── */}
        <div className="v-grid">
          <section>
            <h2 style={{
              fontSize: '20px', fontWeight: 700, margin: '0 0 24px 0',
              color: 'var(--v-text)',
            }}>
              Ultimos articulos
            </h2>
            <div className="v-posts-grid">
              {rest.map((post) => {
                const cat = getCategory(post.category);
                const author = getAuthor(post.author);
                return (
                  <Link key={post.id} href={`/ejemplos/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <article className="v-card">
                      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          width="400"
                          height="225"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      <div style={{ padding: '20px' }}>
                        <span className="v-category-badge" style={{
                          background: `${cat.color}1a`, color: cat.color, marginBottom: '10px',
                        }}>
                          {cat.name}
                        </span>
                        <h3 style={{
                          fontSize: '16px', fontWeight: 700, lineHeight: 1.3,
                          margin: '8px 0', color: 'var(--v-text)',
                        }}>
                          {post.title}
                        </h3>
                        <p style={{
                          fontSize: '13px', lineHeight: 1.6, color: 'var(--v-text-secondary)',
                          margin: '0 0 12px 0', display: '-webkit-box', WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {post.excerpt}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--v-text-secondary)' }}>
                          <span>{author.name}</span>
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ─── Sidebar ─── */}
          <aside>
            <div style={{
              background: 'var(--v-surface)', borderRadius: '12px',
              border: '1px solid var(--v-border)', padding: '24px',
              position: 'sticky', top: '80px',
            }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--v-text)' }}>
                Mas leidos
              </h3>
              {popular.map((p, i) => {
                const cat = getCategory(p.category);
                return (
                  <div key={p.id} className="v-popular-item">
                    <span style={{
                      fontSize: '20px', fontWeight: 800, color: VORTEX.accent,
                      opacity: 0.3, minWidth: '24px', lineHeight: 1,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="v-category-badge" style={{
                        background: `${cat.color}1a`, color: cat.color,
                        fontSize: '10px', padding: '2px 8px', marginBottom: '4px',
                      }}>
                        {cat.name}
                      </span>
                      <Link href={`/ejemplos/blog/${p.id}`} style={{
                        fontSize: '13px', fontWeight: 600, lineHeight: 1.3,
                        color: 'var(--v-text)', textDecoration: 'none', display: 'block',
                      }}>
                        {p.title}
                      </Link>
                    </div>
                  </div>
                );
              })}

              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '24px 0 12px 0', color: 'var(--v-text)' }}>
                Categorias
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {CATEGORIES.map((c) => (
                  <span key={c.id} className="v-category-badge" style={{
                    background: `${c.color}1a`, color: c.color,
                  }}>
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ─── Newsletter ─── */}
        <section className="v-newsletter" style={{ marginTop: '64px' }}>
          <h2 style={{
            fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700,
            margin: '0 0 10px 0',
          }}>
            Recibi Vortez en tu bandeja de entrada
          </h2>
          <p style={{
            fontSize: '14px', opacity: 0.85, margin: '0 0 24px 0',
            maxWidth: '460px', marginInline: 'auto',
          }}>
            Resumen semanal con lo mejor de tecnologia, cultura y negocios.
            Sin spam, solo contenido que suma.
          </p>
          <div style={{
            display: 'flex', gap: '10px', maxWidth: '420px', margin: '0 auto',
            flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <input
              type="email"
              placeholder="tu@email.com"
              readOnly
              style={{
                flex: '1 1 200px', padding: '12px 20px', borderRadius: '8px',
                border: 'none', fontSize: '14px', background: 'rgba(255,255,255,0.15)',
                color: '#fff', outline: 'none',
              }}
            />
            <button
              type="button"
              style={{
                padding: '12px 28px', borderRadius: '8px', border: 'none',
                background: '#fff', color: VORTEX.accent, fontSize: '14px',
                fontWeight: 600, cursor: 'pointer',
              }}
            >
              Suscribirme
            </button>
          </div>
        </section>

      </main>

      {/* ─── Footer ─── */}
      <footer style={{
        borderTop: '1px solid var(--v-border)', marginTop: '64px',
        padding: '48px 24px 40px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="v-footer-grid">
            <div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: VORTEX.accent, letterSpacing: '-0.03em' }}>
                Vortex
              </span>
              <p style={{ fontSize: '13px', color: 'var(--v-text-secondary)', margin: '8px 0 0 0', lineHeight: 1.6 }}>
                Tu dosis semanal de tecnologia, cultura y negocios.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--v-text)' }}>Categorias</h4>
              {CATEGORIES.map((c) => (
                <div key={c.id} style={{ fontSize: '13px', color: 'var(--v-text-secondary)', marginBottom: '6px' }}>
                  {c.name}
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--v-text)' }}>Redes</h4>
              {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((r) => (
                <div key={r} style={{ fontSize: '13px', color: 'var(--v-text-secondary)', marginBottom: '6px' }}>
                  {r}
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--v-text)' }}>Contacto</h4>
              <div style={{ fontSize: '13px', color: 'var(--v-text-secondary)', marginBottom: '6px' }}>
                hola@vortexmag.com
              </div>
              <div style={{ fontSize: '13px', color: 'var(--v-text-secondary)' }}>
                Chascomus, Argentina
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid var(--v-border)', marginTop: '32px',
            paddingTop: '20px', textAlign: 'center', fontSize: '12px',
            color: 'var(--v-text-secondary)',
          }}>
            &copy; 2026 Vortex Magazine. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var header = document.getElementById('v-header');
          var toggle = document.getElementById('v-dark-toggle');
          var lastScroll = 0;

          if (header) {
            window.addEventListener('scroll', function() {
              var currentScroll = window.scrollY;
              if (currentScroll > lastScroll && currentScroll > 80) {
                header.classList.add('hidden');
              } else {
                header.classList.remove('hidden');
              }
              lastScroll = currentScroll;
            });
          }

          if (toggle) {
            toggle.addEventListener('click', function() {
              document.documentElement.classList.toggle('vortex-dark');
              var isDark = document.documentElement.classList.contains('vortex-dark');
              toggle.innerHTML = isDark
                ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
                : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
              try { localStorage.setItem('vortex-theme', isDark ? 'dark' : 'light'); } catch(e) {}
            });

            try {
              if (localStorage.getItem('vortex-theme') === 'dark') {
                document.documentElement.classList.add('vortex-dark');
                toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
              }
            } catch(e) {}
          }
        })();
      `}} />
    </div>
  );
}
