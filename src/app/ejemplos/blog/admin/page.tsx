import Link from 'next/link';

const accent = '#4f46e5';
const accentLight = '#6366f1';

const POSTS_DATA = [
  { id: 'vortex-001', title: 'El auge de la IA generativa en las PyMEs argentinas', category: 'Tecnologia', status: 'published' as const, date: '15 Jun, 2026', views: 2847 },
  { id: 'vortex-002', title: 'Guia completa para migrar tu negocio al entorno digital', category: 'Negocios', status: 'published' as const, date: '12 Jun, 2026', views: 1934 },
  { id: 'vortex-003', title: 'Minimalismo digital: como reducir el estres tecnologico', category: 'Estilo de Vida', status: 'published' as const, date: '10 Jun, 2026', views: 2102 },
  { id: 'vortex-004', title: 'Blockchain mas alla de las criptomonedas', category: 'Tecnologia', status: 'published' as const, date: '8 Jun, 2026', views: 1567 },
  { id: 'vortex-005', title: 'Cine argentino 2026: las peliculas que tenes que ver', category: 'Cultura', status: 'draft' as const, date: '5 Jun, 2026', views: 0 },
  { id: 'vortex-006', title: 'Coworking en Chascomus: el nuevo hub de emprendedores', category: 'Tendencias', status: 'published' as const, date: '3 Jun, 2026', views: 893 },
  { id: 'vortex-007', title: 'Como armar un portfolio digital que consiga clientes', category: 'Negocios', status: 'published' as const, date: '1 Jun, 2026', views: 3201 },
  { id: 'vortex-008', title: 'La vuelta del vinilo: por que lo analogico esta de moda', category: 'Cultura', status: 'draft' as const, date: '30 May, 2026', views: 0 },
];

const stats = [
  { label: 'Posts totales', value: POSTS_DATA.length.toString(), color: accent },
  { label: 'Publicados', value: POSTS_DATA.filter((p) => p.status === 'published').length.toString(), color: '#059669' },
  { label: 'Borradores', value: POSTS_DATA.filter((p) => p.status === 'draft').length.toString(), color: '#d97706' },
  { label: 'Visitas totales', value: POSTS_DATA.reduce((a, p) => a + p.views, 0).toLocaleString(), color: '#7c3aed' },
];

export default function VortexAdmin() {
  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: '#f9fafb', color: '#1a1a2e', minHeight: '100dvh',
    }}>
      <style>{`
        .va-login {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .va-modal {
          padding: 24px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          max-width: 480px;
          width: 90vw;
        }
        .va-modal::backdrop {
          background: rgba(0,0,0,0.3);
        }
      `}</style>

      {/* ─── Login Panel ─── */}
      <div className="va-login">
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '40px',
          width: 'min(380px, 90vw)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{
              fontSize: '24px', fontWeight: 800, color: accent, letterSpacing: '-0.03em',
              display: 'block', marginBottom: '6px',
            }}>
              Vortex
            </span>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
              Panel de administracion
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                Usuario
              </label>
              <input
                type="text"
                defaultValue="admin"
                readOnly
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px',
                  border: '1px solid #e5e7eb', fontSize: '14px', color: '#1a1a2e',
                  background: '#f9fafb', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                Contrasena
              </label>
              <input
                type="password"
                defaultValue="••••••••"
                readOnly
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px',
                  border: '1px solid #e5e7eb', fontSize: '14px', color: '#1a1a2e',
                  background: '#f9fafb', boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              id="va-login-btn"
              type="button"
              style={{
                width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
                background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
                color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                marginTop: '8px',
              }}
            >
              Iniciar sesion
            </button>
          </div>

          <p style={{
            fontSize: '11px', color: '#9ca3af', textAlign: 'center', marginTop: '20px',
          }}>
            Panel simulado - los datos no son persistentes
          </p>
        </div>
      </div>

      {/* ─── Template for dashboard (shown after login via JS) ─── */}
      <div id="va-dashboard" style={{ display: 'none' }}>
        <header style={{
          background: '#fff', borderBottom: '1px solid #e5e7eb',
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <div style={{
            maxWidth: '1100px', margin: '0 auto', padding: '0 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: '60px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href="/ejemplos/blog" style={{
                fontSize: '13px', color: '#6b7280', textDecoration: 'none',
                fontWeight: 500,
              }}>
                &larr; Vortex
              </Link>
              <span style={{ fontSize: '17px', fontWeight: 800, color: accent, letterSpacing: '-0.03em' }}>
                Admin
              </span>
            </div>
            <button
              id="va-logout"
              style={{
                padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb',
                background: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                color: '#6b7280',
              }}
            >
              Cerrar sesion
            </button>
          </div>
        </header>

        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 24px 0', color: '#1a1a2e' }}>
            Dashboard
          </h1>

          {/* ─── Stats ─── */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px', marginBottom: '32px',
          }}>
            {stats.map((s) => (
              <div key={s.label} style={{
                background: '#fff', borderRadius: '12px', padding: '24px',
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: s.color, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ─── Posts Table ─── */}
          <div style={{
            background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '20px 24px', borderBottom: '1px solid #e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '12px',
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#1a1a2e' }}>
                Posts
              </h2>
              <button
                id="va-new-post"
                style={{
                  padding: '8px 20px', borderRadius: '8px', border: 'none',
                  background: accent, color: '#fff', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                + Nuevo post
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%', borderCollapse: 'collapse', fontSize: '13px',
              }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Titulo</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categoria</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visitas</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {POSTS_DATA.map((p, i) => (
                    <tr key={p.id} style={{
                      borderBottom: '1px solid #f3f4f6',
                      background: i % 2 === 0 ? '#fff' : '#fafafa',
                    }}>
                      <td style={{ padding: '12px 20px', fontWeight: 600, color: '#1a1a2e' }}>
                        <Link href={`/ejemplos/blog/${p.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {p.title}
                        </Link>
                      </td>
                      <td style={{ padding: '12px 20px', color: '#6b7280' }}>{p.category}</td>
                      <td style={{ padding: '12px 20px' }}>
                        <span style={{
                          display: 'inline-block', padding: '2px 10px', borderRadius: '50px',
                          fontSize: '11px', fontWeight: 600,
                          background: p.status === 'published' ? 'rgba(5,150,105,0.1)' : 'rgba(217,119,6,0.1)',
                          color: p.status === 'published' ? '#059669' : '#d97706',
                        }}>
                          {p.status === 'published' ? 'Publicado' : 'Borrador'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 20px', color: '#6b7280' }}>{p.views.toLocaleString()}</td>
                      <td style={{ padding: '12px 20px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="va-edit-btn" data-post={p.id} type="button" style={{
                            padding: '4px 12px', borderRadius: '6px', border: '1px solid #e5e7eb',
                            background: '#fff', fontSize: '12px', cursor: 'pointer', color: '#4b5563',
                          }}>
                            Editar
                          </button>
                          <button className="va-delete-btn" data-post={p.id} type="button" style={{
                            padding: '4px 12px', borderRadius: '6px', border: '1px solid #fca5a5',
                            background: '#fef2f2', fontSize: '12px', cursor: 'pointer', color: '#dc2626',
                          }}>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* ─── Create/Edit Modal ─── */}
      <dialog id="va-post-modal" className="va-modal">
        <form method="dialog">
          <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 20px 0', color: '#1a1a2e' }}>
            Nuevo post
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>Titulo</label>
              <input type="text" placeholder="Titulo del articulo" readOnly style={{
                width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb',
                fontSize: '14px', boxSizing: 'border-box', background: '#f9fafb',
              }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>Categoria</label>
                <select disabled style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb',
                  fontSize: '14px', background: '#f9fafb', color: '#1a1a2e',
                }}>
                  <option>Tecnologia</option>
                  <option>Cultura</option>
                  <option>Negocios</option>
                  <option>Estilo de Vida</option>
                  <option>Tendencias</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>Estado</label>
                <select disabled style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb',
                  fontSize: '14px', background: '#f9fafb', color: '#1a1a2e',
                }}>
                  <option>Publicado</option>
                  <option>Borrador</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>Contenido</label>
              <textarea rows={6} placeholder="Escribe el contenido del articulo..." readOnly style={{
                width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb',
                fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit',
                background: '#f9fafb',
              }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="submit" style={{
              padding: '10px 24px', borderRadius: '8px', border: '1px solid #e5e7eb',
              background: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer', color: '#6b7280',
            }}>
              Cancelar
            </button>
            <button type="submit" style={{
              padding: '10px 24px', borderRadius: '8px', border: 'none',
              background: accent, color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}>
              Guardar
            </button>
          </div>
        </form>
      </dialog>

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var loginBtn = document.getElementById('va-login-btn');
          var logoutBtn = document.getElementById('va-logout');
          var dashboard = document.getElementById('va-dashboard');
          var loginPanel = document.querySelector('.va-login');
          var postModal = document.getElementById('va-post-modal');
          var newPostBtn = document.getElementById('va-new-post');
          var editBtns = document.querySelectorAll('.va-edit-btn');
          var deleteBtns = document.querySelectorAll('.va-delete-btn');

          if (loginBtn) {
            loginBtn.addEventListener('click', function() {
              loginPanel.style.display = 'none';
              dashboard.style.display = 'block';
            });
          }

          if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
              loginPanel.style.display = 'flex';
              dashboard.style.display = 'none';
            });
          }

          if (newPostBtn && postModal) {
            newPostBtn.addEventListener('click', function() { postModal.showModal(); });
          }

          editBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
              if (postModal) postModal.showModal();
            });
          });

          deleteBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
              var row = btn.closest('tr');
              if (row && confirm('¿Eliminar este post?')) {
                row.style.opacity = '0.3';
              }
            });
          });
        })();
      `}} />
    </div>
  );
}
