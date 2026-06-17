import AppShell from '@/components/AppShell';

export const metadata = {
  title: 'Servicios — Portfolio Blado',
  description: 'Servicios de desarrollo web y software en Chascomus.',
};

export default function ServiciosPage() {
  return (
    <AppShell>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            color: 'var(--foreground)',
            marginBottom: '16px',
          }}
        >
          Proximamente
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--foreground-2)',
            maxWidth: '500px',
            lineHeight: 1.7,
          }}
        >
          Aqui estaran disponibles los distintos tipos de sitios web y
          soluciones digitales que puedo desarrollar para tu negocio.
        </p>
      </main>
    </AppShell>
  );
}
