'use client';

const GRANATE = '#7a1a1a';
const GRANATE_DARK = '#5a1010';
const BG_WARM = '#f5f3f0';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

function ctaBtn(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    display: 'inline-block',
    padding: '14px 36px',
    borderRadius: 6,
    background: GRANATE,
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    ...extra,
  };
}

export default function Contacto() {
  return (
    <>
      <section
        id="contacto"
        style={{
          padding: 'clamp(60px, 10vh, 100px) 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 48,
          }}
        >
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: GRANATE, fontWeight: 700, margin: '0 0 8px 0' }}>
              Contacto
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 700, margin: '0 0 16px 0', color: TEXT_PRIMARY }}>
              Trabajemos juntos
            </h2>
            <p style={{ fontSize: 15, color: TEXT_SEC, lineHeight: 1.6, margin: '0 0 24px 0' }}>
              Dejanos tus datos y te llamamos en menos de 24h para coordinar una primera reunion sin cargo.
            </p>
            <div style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 2 }}>
              <div><strong style={{ color: TEXT_PRIMARY }}>Direccion:</strong> Av. Lastra 320, Chascomus</div>
              <div><strong style={{ color: TEXT_PRIMARY }}>Telefono:</strong> (02241) 45-6789</div>
              <div><strong style={{ color: TEXT_PRIMARY }}>Email:</strong> estudio@mya-contable.com.ar</div>
              <div><strong style={{ color: TEXT_PRIMARY }}>Horario:</strong> Lun a Vie 9:00 - 18:00</div>
            </div>
            <div
              style={{
                marginTop: 20,
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                height: 160,
                background: BG_SECTION,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: TEXT_SEC,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: GRANATE, marginBottom: 4 }}>Av. Lastra 320</div>
                <div>Chascomus, Provincia de Buenos Aires</div>
                <div style={{ marginTop: 8, fontSize: 11, color: GRANATE }}>Ver en Google Maps &rarr;</div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 10,
              padding: 32,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                Nombre
              </label>
              <input
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 6,
                  border: '1px solid rgba(0,0,0,0.08)', fontSize: 14,
                  background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
                }}
                placeholder="Tu nombre"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                Email o telefono
              </label>
              <input
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 6,
                  border: '1px solid rgba(0,0,0,0.08)', fontSize: 14,
                  background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
                }}
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                Mensaje
              </label>
              <textarea
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 6,
                  border: '1px solid rgba(0,0,0,0.08)', fontSize: 14,
                  background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
                  resize: 'vertical', minHeight: 80,
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

      {/* ─── Floating consulta dialog ─── */}
      <button
        id="con-consulta-btn"
        style={{
          position: 'fixed',
          bottom: 'clamp(80px, 10vh, 100px)',
          right: 24,
          zIndex: 200,
          width: 56, height: 56, borderRadius: '50%',
          background: GRANATE, color: '#fff', border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(122,26,26,0.35)',
          fontSize: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Consulta gratis"
        aria-label="Abrir consulta rapida"
      >
        &#9993;
      </button>

      <dialog
        id="con-consulta-dialog"
        closedby="any"
        style={{
          borderRadius: 12,
          border: 'none',
          padding: 32,
          maxWidth: 400,
          width: 'calc(100% - 48px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <form method="dialog">
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px 0', color: TEXT_PRIMARY }}>
            Consulta gratis
          </h2>
          <p style={{ fontSize: 13, color: TEXT_SEC, margin: '0 0 20px 0', lineHeight: 1.5 }}>
            Dejanos tu consulta y te respondemos en menos de 24h.
          </p>
          <div style={{ marginBottom: 16 }}>
            <input
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.08)', fontSize: 14,
                background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
              }}
              placeholder="Nombre"
              aria-label="Nombre"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.08)', fontSize: 14,
                background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
              }}
              type="tel"
              placeholder="Telefono"
              aria-label="Telefono"
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <textarea
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.08)', fontSize: 14,
                background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
                resize: 'vertical', minHeight: 60,
              }}
              placeholder="Tu consulta..."
              aria-label="Tu consulta"
            />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              type="reset"
              style={{
                padding: '10px 24px', borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.08)', background: '#fff',
                color: TEXT_SEC, fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                ...ctaBtn({ padding: '10px 24px', fontSize: 13 }),
              }}
            >
              Enviar
            </button>
          </div>
        </form>
      </dialog>

      {/* ─── Sticky Mobile CTA ─── */}
      <div
        className="con-mobile-cta"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 150,
          background: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          padding: '12px 24px',
          display: 'none',
          boxShadow: '0 -4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <a
          href="#contacto"
          style={{
            ...ctaBtn({ width: '100%', textAlign: 'center', padding: 12 }),
          }}
        >
          Solicitar presupuesto gratis
        </a>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `{
  var btn = document.getElementById('con-consulta-btn');
  var dialog = document.getElementById('con-consulta-dialog');
  if (btn && dialog) {
    btn.addEventListener('click', function(){ dialog.showModal(); });
  }
}()`,
        }}
      />
      <style>{`
        .con-mobile-cta { display: none !important; }
        @media (max-width: 768px) {
          .con-mobile-cta { display: flex !important; }
        }
      `}</style>
    </>
  );
}
