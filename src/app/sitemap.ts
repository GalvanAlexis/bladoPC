import type { MetadataRoute } from 'next';
import { CATALOGO } from '@/lib/services';

const BASE_URL = 'https://bladopc.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = CATALOGO.map((svc) => ({
    url: `${BASE_URL}/servicios/${svc.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    { url: BASE_URL, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${BASE_URL}/chat`, changeFrequency: 'weekly' as const, priority: 0.5 },
    { url: `${BASE_URL}/servicios`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/ejemplos/landing`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/ejemplos/contable`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/ejemplos/delivery`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/ejemplos/blog`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/ejemplos/pwa`, changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  return [...staticRoutes, ...serviceRoutes];
}
