import type { MetadataRoute } from 'next';

const BASE_URL = 'https://bladopc.vercel.app';

const STATIC_ROUTES = [
  { url: '', changeFrequency: 'daily' as const, priority: 1 },
  { url: '/chat', changeFrequency: 'weekly' as const, priority: 0.5 },
  { url: '/servicios', changeFrequency: 'weekly' as const, priority: 0.9 },
  { url: '/servicios/landing', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/corporativa', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/blog', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/tienda', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/saas', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/e-learning', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/sistema-web', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/dashboard', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/mantenimiento', changeFrequency: 'monthly' as const, priority: 0.6 },
  { url: '/servicios/automatizacion', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/data-science', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/servicios/soporte-tecnico', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/ejemplos', changeFrequency: 'monthly' as const, priority: 0.7 },
  { url: '/ejemplos/landing', changeFrequency: 'monthly' as const, priority: 0.6 },
  { url: '/ejemplos/contable', changeFrequency: 'monthly' as const, priority: 0.6 },
  { url: '/ejemplos/delivery', changeFrequency: 'monthly' as const, priority: 0.6 },
  { url: '/ejemplos/blog', changeFrequency: 'monthly' as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
