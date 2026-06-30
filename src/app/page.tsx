import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import HomeLayout from '@/components/home/HomeLayout';

export const metadata: Metadata = {
  title: 'BladoPC | Desarrollador Full-Stack en Chascomus',
  description:
    'Soy BladoPC - Alexis Galvan, desarrollador Full-Stack y Data Scientist en Chascomus. Ofrezco desarrollo web, automatizaciones con IA, ciencia de datos y reparacion de PC. Contactame para tu proyecto.',
  openGraph: {
    title: 'BladoPC | Desarrollador Full-Stack en Chascomus',
    description:
      'BladoPC - Desarrollador Full-Stack y Data Scientist en Chascomus. Desarrollo web moderno, automatizaciones con IA y ciencia de datos.',
    url: 'https://bladopc.vercel.app',
  },
  twitter: {
    title: 'BladoPC | Desarrollador Full-Stack en Chascomus',
    description:
      'BladoPC - Desarrollador Full-Stack y Data Scientist en Chascomus. Desarrollo web moderno, automatizaciones con IA y ciencia de datos.',
  },
};

export default function Home() {
  return (
    <AppShell>
      <HomeLayout />
    </AppShell>
  );
}
