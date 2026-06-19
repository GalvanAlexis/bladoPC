import Link from 'next/link';
import { notFound } from 'next/navigation';

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
  id: string; title: string; excerpt: string; content: string;
  category: string; author: string; date: string; readTime: number;
  image: string; featured?: boolean; popular?: boolean;
}

const POSTS: Post[] = [
  {
    id: 'vortex-001', title: 'El auge de la IA generativa en las PyMEs argentinas',
    excerpt: 'Como las empresas locales estan adoptando inteligencia artificial...',
    content: `La inteligencia artificial generativa dejo de ser un lujo de las grandes corporaciones. En 2026, las PyMEs argentinas estan adoptando estas tecnologias a un ritmo acelerado, impulsadas por la necesidad de optimizar procesos y reducir costos en un contexto economico desafiante.

Segun un relevamiento de la Camara Argentina de Comercio, el 43% de las pequeñas y medianas empresas ya utiliza algun tipo de herramienta de IA en sus operaciones diarias, ya sea para atencion al cliente, generacion de contenido o analisis de datos.

## Automatizacion al alcance de todos

Lo mas interesante es que la barrera de entrada nunca fue tan baja. Hoy, una PyME puede implementar un chatbot con IA por menos de lo que cuesta un empleado part-time. Y los resultados son contundentes:

"Implementamos un asistente virtual para responder consultas frecuentes de nuestros clientes. En tres meses, redujimos en un 60% las consultas que llegaban a nuestro equipo de soporte", cuenta Martin Gomez, dueño de una ferreteria online de Chascomus.

## Casos de uso reales

Las aplicaciones mas comunes incluyen:

- Atencion al cliente 24/7 con chatbots inteligentes
- Generacion automatica de descripciones de productos para e-commerce
- Analisis de sentimiento en redes sociales y reseñas
- Optimizacion de inventario con prediccion de demanda
- Redaccion de newsletters y contenido para redes

## El desafio de la implementacion

Sin embargo, no todo es color de rosa. Muchos empresarios se enfrentan a la curva de aprendizaje y la resistencia al cambio. La clave, segun los expertos, esta en empezar con proyectos pequeños y escalar gradualmente.

"El error mas comun es querer implementar un sistema integral de IA de golpe. Recomendamos empezar con un proceso especifico, medir resultados y ahi recien expandir", explica Laura Mendez, consultora en transformacion digital.

## El futuro

Con la llegada de modelos mas eficientes y herramientas no-code, la tendencia es que cada vez mas PyMEs se sumen a la revolucion de la IA. Las que no lo hagan, corren el riesgo de quedar rezagadas frente a competidores que si aprovechen estas tecnologias.`,
    category: 'tech', author: 'ag', date: '15 Jun, 2026', readTime: 6,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&q=80',
    featured: true, popular: true,
  },
  {
    id: 'vortex-002', title: 'Guia completa para migrar tu negocio al entorno digital',
    excerpt: 'Pasos concretos para llevar tu comercio fisico al mundo online...',
    content: `Migrar un negocio tradicional al mundo digital puede parecer abrumador, pero con una estrategia clara es mas simple de lo que parece. Esta guia te lleva paso a paso por el proceso.`,
    category: 'business', author: 'jp', date: '12 Jun, 2026', readTime: 8,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
    featured: true,
  },
  {
    id: 'vortex-003', title: 'Minimalismo digital: como reducir el estres tecnologico',
    excerpt: 'Estrategias para recuperar tu atencion y productividad...',
    content: `Pasamos horas frente a pantallas, atrapados en un ciclo de notificaciones, scrolling infinito y multitarea que agota nuestra mente. El minimalismo digital propune una alternativa.`,
    category: 'lifestyle', author: 'mc', date: '10 Jun, 2026', readTime: 5,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&q=80',
    popular: true,
  },
  {
    id: 'vortex-004', title: 'Blockchain mas alla de las criptomonedas',
    excerpt: 'Trazabilidad, contratos inteligentes y votacion electronica...',
    content: `Cuando se habla de blockchain, la mayoria piensa en Bitcoin y criptomonedas. Sin embargo, la tecnologia subyacente tiene aplicaciones mucho mas amplias.`,
    category: 'tech', author: 'ag', date: '8 Jun, 2026', readTime: 7,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000&q=80',
    popular: true,
  },
  {
    id: 'vortex-005', title: 'Cine argentino 2026: las peliculas que tenes que ver',
    excerpt: 'Un repaso por los estrenos nacionales mas destacados del ano...',
    content: `El cine argentino atraviesa un momento creativo excepcional. Con presupuestos ajustados pero historias potentes.`,
    category: 'culture', author: 'mc', date: '5 Jun, 2026', readTime: 4,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&q=80',
  },
  {
    id: 'vortex-006', title: 'Coworking en Chascomus: el nuevo hub de emprendedores',
    excerpt: 'Como los espacios de trabajo compartido estan cambiando la cultura laboral en la ciudad.',
    content: `Chascomus ya no es solo un destino turistico de fin de semana. La ciudad esta viendo un crecimiento silencioso.`,
    category: 'trends', author: 'jp', date: '3 Jun, 2026', readTime: 4,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80',
  },
  {
    id: 'vortex-007', title: 'Como armar un portfolio digital que consiga clientes',
    excerpt: 'Las claves para mostrar tu trabajo de forma profesional...',
    content: `En 2026, tener un portfolio digital no es opcional para ningun profesional creativo o desarrollador.`,
    category: 'business', author: 'ag', date: '1 Jun, 2026', readTime: 6,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80',
    popular: true,
  },
  {
    id: 'vortex-008', title: 'La vuelta del vinilo: por que lo analogico esta de moda',
    excerpt: 'El resurgimiento de los discos de vinilo...',
    content: `En una era dominada por el streaming y la musica digital, los discos de vinilo estan experimentando un renacimiento.`,
    category: 'culture', author: 'mc', date: '30 May, 2026', readTime: 5,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=80',
  },
];

const accent = '#4f46e5';

function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id) || { id: '', name: id, color: '#666' };
}
function getAuthor(id: string) {
  return AUTHORS.find((a) => a.id === id) || { id: '', name: id, role: '', avatar: '?' };
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ postId: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const post = POSTS.find((p) => p.id === postId);
  if (!post) return { title: 'Articulo no encontrado' };
  return { title: post.title, description: post.excerpt };
}

export default async function VortexArticle({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const post = POSTS.find((p) => p.id === postId);
  if (!post) notFound();

  const cat = getCategory(post.category);
  const author = getAuthor(post.author);
  const related = POSTS.filter((p) => p.category === post.category && p.id !== postId).slice(0, 3);

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: '#fafafa', color: '#1a1a2e', minHeight: '100dvh',
    }}>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .va-progress {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 3px;
            z-index: 200;
            background: linear-gradient(90deg, ${accent}, #818cf8);
            transform-origin: 0 50%;
            animation: va-grow auto linear;
            animation-timeline: scroll();
          }
          @keyframes va-grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        }
        .va-share-dialog {
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          max-width: 360px;
        }
        .va-share-dialog::backdrop {
          background: rgba(0,0,0,0.2);
        }
        .va-content h2 {
          font-size: 22px;
          font-weight: 700;
          margin: 32px 0 12px 0;
          color: #1a1a2e;
        }
        .va-content p {
          font-size: 16px;
          line-height: 1.8;
          color: #4b5563;
          margin: 0 0 16px 0;
        }
      `}</style>

      <div className="va-progress" aria-hidden="true" />

      {/* ─── Header minimal ─── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(250,250,250,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{
          maxWidth: '720px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '56px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/ejemplos/blog" style={{
              fontSize: '13px', color: '#6b7280', textDecoration: 'none',
              fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              &larr; Volver
            </Link>
            <span style={{ fontSize: '18px', fontWeight: 800, color: accent, letterSpacing: '-0.03em' }}>
              Vortex
            </span>
          </div>
          <button
            id="va-share-btn"
            style={{
              background: 'none', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#4b5563',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Compartir
          </button>
        </div>
      </header>

      {/* ─── Share Dialog ─── */}
      <dialog id="va-share-dialog" className="va-share-dialog">
        <form method="dialog">
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0' }}>
            Compartir articulo
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {['Twitter', 'LinkedIn', 'WhatsApp', 'Email'].map((s) => (
              <button key={s} type="button" style={{
                padding: '10px 16px', borderRadius: '8px', border: '1px solid #e5e7eb',
                background: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                textAlign: 'left', color: '#1a1a2e',
              }}>
                {s}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button type="submit" style={{
              padding: '8px 20px', borderRadius: '8px', border: 'none',
              background: accent, color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}>
              Cerrar
            </button>
          </div>
        </form>
      </dialog>

      {/* ─── Article ─── */}
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>
        <span style={{
          display: 'inline-block', padding: '4px 12px', borderRadius: '50px',
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.03em',
          background: `${cat.color}1a`, color: cat.color, marginBottom: '16px',
        }}>
          {cat.name}
        </span>

        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, lineHeight: 1.15,
          margin: '0 0 16px 0', color: '#1a1a2e',
        }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <span style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: accent, color: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700,
          }}>
            {author.avatar}
          </span>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', display: 'block' }}>
              {author.name}
            </span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{author.role}</span>
          </div>
          <span style={{ color: '#d1d5db' }}>&middot;</span>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>{post.date}</span>
          <span style={{ color: '#d1d5db' }}>&middot;</span>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>{post.readTime} min de lectura</span>
        </div>

        <div style={{
          borderRadius: '16px', overflow: 'hidden', marginBottom: '40px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
        }}>
          <img
            src={post.image}
            alt={post.title}
            fetchPriority="high"
            width="720"
            height="400"
            style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
          />
        </div>

        <div className="va-content">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i}>{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('- ')) {
              return (
                <li key={i} style={{
                  fontSize: '15px', lineHeight: 1.7, color: '#4b5563', marginBottom: '4px',
                }}>
                  {line.replace('- ', '')}
                </li>
              );
            }
            if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />;
            return <p key={i}>{line}</p>;
          })}
        </div>

        {/* ─── Author Box ─── */}
        <div style={{
          marginTop: '48px', padding: '24px', borderRadius: '12px',
          background: '#f5f5f5', display: 'flex', gap: '16px', alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          <span style={{
            width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
            background: accent, color: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700,
          }}>
            {author.avatar}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e' }}>{author.name}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>{author.role}</div>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
              Editor de Vortex Magazine. Apasionado por la tecnologia, la innovacion y el impacto digital en las PyMEs locales.
            </p>
          </div>
        </div>

        {/* ─── Related ─── */}
        {related.length > 0 && (
          <section style={{ marginTop: '48px' }}>
            <h2 style={{
              fontSize: '20px', fontWeight: 700, margin: '0 0 20px 0', color: '#1a1a2e',
            }}>
              Articulos relacionados
            </h2>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}>
              {related.map((r) => {
                const rc = getCategory(r.category);
                return (
                  <Link key={r.id} href={`/ejemplos/blog/${r.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: '#fff', borderRadius: '10px', overflow: 'hidden',
                      border: '1px solid #e5e7eb', transition: 'transform 0.2s',
                    }}>
                      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img
                          src={r.image}
                          alt={r.title}
                          loading="lazy"
                          width="200"
                          height="113"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '14px' }}>
                        <span style={{
                          display: 'inline-block', padding: '2px 8px', borderRadius: '50px',
                          fontSize: '10px', fontWeight: 600, background: `${rc.color}1a`, color: rc.color,
                          marginBottom: '6px',
                        }}>
                          {rc.name}
                        </span>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, color: '#1a1a2e', lineHeight: 1.3 }}>
                          {r.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var shareBtn = document.getElementById('va-share-btn');
          var shareDialog = document.getElementById('va-share-dialog');
          if (shareBtn && shareDialog) {
            shareBtn.addEventListener('click', function() { shareDialog.showModal(); });
          }
        })();
      `}} />
    </div>
  );
}
