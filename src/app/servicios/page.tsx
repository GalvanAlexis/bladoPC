import AppShell from '@/components/AppShell';
import ServiciosCatalogo from '@/components/servicios/ServiciosCatalogo';

export const metadata = {
  title: 'Servicios — Portfolio Blado',
  description: 'Catalogo completo de servicios de desarrollo web, software y SaaS en Chascomus. Desde landing pages hasta plataformas SaaS.',
};

export default function ServiciosPage() {
  return (
    <AppShell>
      <ServiciosCatalogo />
    </AppShell>
  );
}
