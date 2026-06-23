import { notFound } from 'next/navigation';
import ContablePage from '../contable/page';

const EJEMPLOS: Record<string, { title: string; desc: string }> = {
  landing: {
    title: 'Lumina — Serum Facial Natural',
    desc: 'Landing page profesional para producto cosmetico con captacion SEO y venta directa.',
  },
  contable: {
    title: 'M&A — Estudio Contable',
    desc: 'Sitio corporativo multi-seccion para despacho contable con servicios, equipo, blog y captacion de leads.',
  },
  blog: {
    title: 'Vortex Magazine',
    desc: 'Magazine digital multi-categoria con articulos, busqueda y panel de administracion.',
  },
  delivery: {
    title: 'Sabor Express — Delivery de Comida',
    desc: 'Plataforma de delivery con menu interactivo, carrito, checkout y panel admin.',
  },
};

export function generateStaticParams() {
  return Object.keys(EJEMPLOS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ej = EJEMPLOS[slug];
  if (!ej) return { title: 'Ejemplo no encontrado' };
  return {
    title: ej.title,
    description: ej.desc,
  };
}

export default async function EjemploPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ej = EJEMPLOS[slug];
  if (!ej) notFound();

  if (slug === 'contable') {
    return <ContablePage />;
  }

  notFound();
}
