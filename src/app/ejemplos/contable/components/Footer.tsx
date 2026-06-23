const GRANATE_DARK = '#5a1010';
const TEXT_PRIMARY = '#1a1a1a';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '48px 24px 32px',
        background: GRANATE_DARK,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 32,
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>M&amp;A</div>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: 12 }}>
            Estudio Contable. Mas de 12 anos de experiencia asesorando a PyMEs y profesionales en Chascomus.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Servicios</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
            <span>Liquidacion de Sueldos</span>
            <span>Impuestos (IVA, Ganancias)</span>
            <span>Contabilidad General</span>
            <span>Monotributo</span>
            <span>Sociedades y Empresas</span>
            <span>Auditoria y Balances</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contacto</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
            <span>Av. Lastra 320, Chascomus</span>
            <span>(02241) 45-6789</span>
            <span>estudio@mya-contable.com.ar</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Horarios</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
            <span>Lun a Vie: 9:00 - 18:00</span>
            <span>Sab: 9:00 - 12:00</span>
            <span>WhatsApp: hasta 20:00</span>
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          marginTop: 32,
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
          fontSize: 11,
        }}
      >
        &copy; 2026 M&amp;A Estudio Contable. Todos los derechos reservados.
      </div>
    </footer>
  );
}
