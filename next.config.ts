import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|webp|woff2|css)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/video/:all*',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=604800',
        },
      ],
    },
  ],
};

export default nextConfig;
