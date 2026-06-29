const SITE_URL = 'https://bladopc.vercel.app';
const SITE_NAME = 'BladoPC - Alexis Galvan';

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alexis Galvan',
    givenName: 'Alexis',
    familyName: 'Galvan',
    description: 'Desarrollador Full-Stack y Data Scientist basado en Chascomus, Buenos Aires. Desarrollo web, automatizaciones con IA y ciencia de datos.',
    url: SITE_URL,
    sameAs: [
      'https://github.com/GalvanAlexis',
      'https://www.linkedin.com/in/alexis-galvan',
      'mailto:alexisvladimirgalvan@gmail.com',
    ],
    knowsAbout: [
      'Next.js', 'React', 'TypeScript', 'Python', 'Go',
      'PostgreSQL', 'Node.js', 'Tailwind CSS', 'Machine Learning',
      'Data Science', 'NLP', 'APIs REST', 'Prisma',
    ],
    email: 'alexisvladimirgalvan@gmail.com',
    telephone: '+542241567142',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chascomus',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description: 'Servicios profesionales de desarrollo web, automatizaciones con IA, ciencia de datos y soporte IT en Chascomus y remoto.',
    url: SITE_URL,
    telephone: '+542241567142',
    email: 'alexisvladimirgalvan@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chascomus',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    areaServed: ['Chascomus', 'Buenos Aires', 'Argentina', 'Remoto'],
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios IT',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reparacion de PC',
            description: 'Diagnostico, mantenimiento y optimizacion de PCs de escritorio en Chascomus.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desarrollo Web y Automatizaciones',
            description: 'Sistemas a medida, bots, APIs e integraciones para PyMEs y emprendedores.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ciencia de Datos e IA',
            description: 'Dashboards interactivos, analisis predictivo y modelos de lenguaje.',
          },
        },
      ],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Portfolio profesional de Alexis Galvan. Desarrollador Full-Stack, Ciencia de Datos e IA. Proyectos, habilidades y experiencia.',
    inLanguage: 'es-AR',
  };
}

export function allStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      localBusinessSchema(),
      websiteSchema(),
    ],
  };
}
