'use client';

import PresupuestoForm from './PresupuestoForm';

const GRANATE = '#7a1a1a';
const GRANATE_DARK = '#5a1010';
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
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
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
      </section>

      {/* --- Sticky Mobile CTA --- */}
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
        <PresupuestoForm label="Solicitar presupuesto gratis" btnStyle={ctaBtn({ width: '100%', textAlign: 'center', padding: 12 })} />
      </div>

      <style>{`
        .con-mobile-cta { display: none !important; }
        @media (max-width: 768px) {
          .con-mobile-cta { display: flex !important; }
        }
      `}</style>
    </>
  );
}
