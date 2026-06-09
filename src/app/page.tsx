import AppShell from '@/components/AppShell';
import HomeLayout from '@/components/home/HomeLayout';

export const metadata = {
  title: 'Portfolio Blado — Alexis Galván',
  description:
    'Portfolio interactivo de Alexis Galván (Blado). Full-Stack Developer, Data Scientist y co-fundador de AIDO. Explorá habilidades, proyectos y hablá con el asistente.',
};

export default function Home() {
  return (
    <AppShell>
      <HomeLayout />
    </AppShell>
  );
}
