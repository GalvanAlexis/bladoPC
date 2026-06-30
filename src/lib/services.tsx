import React from 'react';

export interface ServiceExample {
  title: string;
  desc: string;
  benefit: string;
}

export interface ServiceItem {
  id: string;
  order: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  persona: string;
  complexity: 'simple' | 'media' | 'compleja';
  examples?: ServiceExample[];
  ejemploSlug?: string;
  ejemploUrl?: string;
}

export const CATALOGO: ServiceItem[] = [
  {
    id: 'landing',
    order: 1,
    title: 'Landing Page / One-Page',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    description: 'Una sola pagina, limpia y enfocada en un objetivo concreto: presentar un producto, captar leads o promocionar un evento. Incluye formulario de contacto, llamada a la accion y diseño responsivo.',
    persona: 'Emprendedores, negocios locales, lanzamientos de producto, freelancers.',
    complexity: 'simple',
    ejemploSlug: 'landing',
    examples: [
      {
        title: 'Lumina — Serum Facial Natural',
        desc: 'Landing one-page con hero de producto, seccion de ingredientes con iconos, testimoniales con fotos, FAQ tipo acordeon y CTA de compra integrado con Mercado Pago.',
        benefit: '12% de conversion rate. 340 unidades vendidas en el primer mes. La pagina carga en menos de 1.5s y el 40% del trafico llego por SEO local.',
      },
    ],
  },
  {
    id: 'corporativa',
    order: 2,
    title: 'Corporativa / Institucional',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    description: 'Multi-pagina con inicio, servicios, sobre nosotros, blog y contacto. Diseño profesional que transmite confianza y respaldo. Ideal para establecer presencia digital seria.',
    persona: 'Empresas, estudios profesionales, consultoras, ONGs.',
    complexity: 'simple',
    ejemploSlug: 'contable',
    examples: [
      {
        title: 'M&A — Estudio Contable',
        desc: 'Sitio corporativo multi-seccion con hero de confianza, servicios detallados, equipo profesional, blog de recursos y formulario de contacto integrado.',
        benefit: 'Genera confianza en potenciales clientes. +40 consultas recibidas en el primer mes. El sitio posiciona para busquedas locales como "contador en Chascomus" y "estudio contable".',
      },
    ],
  },
  {
    id: 'blog',
    order: 3,
    title: 'Blog / CMS',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    description: 'Sistema de gestion de contenido con articulos, categorias, etiquetas, SEO optimizado y busqueda. Permite publicar y editar contenido sin conocimientos tecnicos.',
    persona: 'Creadores de contenido, medios digitales, marcas personales, educadores.',
    complexity: 'simple',
    ejemploSlug: 'blog',
    examples: [
      {
        title: 'Vortex Magazine — Medio Digital',
        desc: 'Magazine moderno multi-categoria con homepage curada, pagina de articulo con progreso de lectura, categorias, busqueda y panel de administracion con login y CRUD simulado.',
        benefit: 'Muestra un CMS realista con todas las funcionalidades esperadas: publicacion, categorizacion, busqueda y panel de gestion. Ideal para creadores de contenido y medios.',
      },
    ],
  },
  {
    id: 'ecommerce',
    order: 4,
    title: 'E-commerce',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    description: 'Tienda online completa: catalogo de productos, carrito de compras, pasarela de pago, gestion de stock, pedidos y notificaciones. Escalable de pequeño a gran volumen.',
    persona: 'Comercios, marcas, distribuidores, emprendedores de producto.',
    complexity: 'media',
    ejemploSlug: 'delivery',
    examples: [
      {
        title: 'Sabor Express — Delivery de Comida',
        desc: 'Plataforma de pedidos de comida rapida con menu por categorias, carrito interactivo, checkout con formulario y panel admin con dashboard de ventas y gestion de pedidos.',
        benefit: 'Demuestra un e-commerce funcional completo: navegacion de productos, carrito persistente, flujo de compra y administracion. Ideal para comercios gastronomicos y delivery.',
      },
    ],
  },
  {
    id: 'pwa',
    order: 5,
    title: 'PWA — Progressive Web App',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/>
      </svg>
    ),
    description: 'Aplicacion web que funciona como una app nativa: instalable en el celular, funciona offline, notificaciones push y acceso a camara/GPS. Sin pasar por las tiendas de apps.',
    persona: 'Startups, negocios mobile-first, medios, servicios con alta interaccion movil.',
    complexity: 'media',
    ejemploSlug: 'pwa',
  },
  {
    id: 'portal',
    order: 6,
    title: 'Portal / Intranet',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    description: 'Sistema con acceso privado por roles: administradores, empleados, clientes. Gestion documental, paneles internos, comunicacion y reportes. Centraliza la operacion del negocio.',
    persona: 'Empresas con equipos, instituciones educativas, ONGs, clubes.',
    complexity: 'media',
    ejemploUrl: 'https://bts-arg.vercel.app/',
  },
  {
    id: 'webapp',
    order: 7,
    title: 'Web App Interactiva',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    description: 'Aplicaciones con funcionalidad en tiempo real: dashboards interactivos, mapas, editores colaborativos, visualizacion de datos, juegos o herramientas profesionales.',
    persona: 'Startups tecnologicas, herramientas digitales, negocios con operaciones en tiempo real.',
    complexity: 'media',
    ejemploSlug: 'webapp',
  },
  {
    id: 'marketplace',
    order: 8,
    title: 'Marketplace / Directorio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    description: 'Plataforma multi-vendedor o directorio con busqueda avanzada, filtros, perfiles, reviews y sistema de reputacion. Conecta oferta con demanda en un mismo ecosistema.',
    persona: 'Plataformas de servicios, clasificados, comunidades, hubs locales.',
    complexity: 'compleja',
  },
  {
    id: 'automations',
    order: 9,
    title: 'Automatizaciones / Bots con IA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    description: 'Scripts y robots con inteligencia artificial que eliminan tareas manuales y repetitivas. Automatizamos procesos usando IA generativa, bots y APIs para que tu negocio funcione solo.',
    persona: 'PyMEs con procesos manuales repetitivos, areas de operaciones, logistica.',
    complexity: 'media',
    examples: [
      {
        title: 'Atencion al cliente con IA 24/7',
        desc: 'Un bot que responde consultas frecuentes, deriva casos complejos y agenda turnos automaticamente usando tu base de conocimiento.',
        benefit: 'Tus clientes reciben respuesta al instante sin importar la hora. El equipo de soporte se enfoca solo en casos complejos. Menos esperas, mas ventas.',
      },
      {
        title: 'Extraccion inteligente de datos',
        desc: 'Lee facturas, comprobantes, PDFs y contratos, y los convierte automaticamente en datos estructurados para tu sistema.',
        benefit: 'Adios a tipear datos a mano. Eliminas errores de carga, aceleras procesos contables y tu equipo administrativo trabaja en minutos lo que antes tomaba horas.',
      },
      {
        title: 'Generacion automatica de contenido',
        desc: 'Redacta posts para redes sociales, fichas de producto, newsletters o descripciones usando el tono de tu marca.',
        benefit: 'Mantenes redes activas y contenido fresco sin tener que escribir cada publicacion. Publicas mas seguido con menos esfuerzo.',
      },
      {
        title: 'Clasificacion y routing de correos',
        desc: 'Analiza cada email entrante, lo clasifica por tema y lo envia al area correspondiente con una respuesta de acuse automatica.',
        benefit: 'Ningun correo se pierde en la bandeja de entrada. Cada consulta llega al area correcta al instante. Tu equipo responde mas rapido.',
      },
      {
        title: 'Conciliacion bancaria automatica',
        desc: 'Conecta tu cuenta bancaria con tu sistema de facturacion. La IA cruza pagos, detecta diferencias y genera el reporte de conciliacion.',
        benefit: 'El cierre contable que te llevaba un dia entero se hace en minutos. Detectas inconsistencias al instante sin revisar planillas manualmente.',
      },
    ],
  },
  {
    id: 'dashboard',
    order: 10,
    title: 'Dashboards / BI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
    description: 'Tableros de control con KPIs clave, graficos interactivos, exportacion de reportes y multi-tenant. Convierte datos dispersos en decisiones informadas.',
    persona: 'Gerentes, directores, areas de datos, negocios con volumen de operaciones.',
    complexity: 'compleja',
  },
  {
    id: 'elearning',
    order: 11,
    title: 'Plataforma E-learning / LMS',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    description: 'Sistema de gestion de aprendizaje: cursos, modulos, progreso de alumnos, evaluaciones, certificados y pagos. Ideal para escalar la enseñanza digitalmente.',
    persona: 'Academias, instructores, empresas de capacitacion, coaches.',
    complexity: 'compleja',
  },
  {
    id: 'erp',
    order: 12,
    title: 'Sistemas Administrativos / ERP',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    description: 'Software de gestion empresarial a medida: facturacion, stock, compras, proveedores, caja, reportes. Un sistema unificado que reemplaza planillas y papeles.',
    persona: 'PyMEs, comercios, distribuidoras, talleres, fabricas chicas.',
    complexity: 'compleja',
  },
  {
    id: 'saas',
    order: 13,
    title: 'SaaS — Software as a Service',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    description: 'Producto digital multi-tenant con suscripciones, paneles de administracion, facturacion recurrente y API. Los clientes pagan por usar tu plataforma sin necesidad de instalacion.',
    persona: 'Startups, founders digitales, negocios con modelo de suscripcion.',
    complexity: 'compleja',
  },
];

export function findServiceBySlug(slug: string): ServiceItem | undefined {
  return CATALOGO.find((s) => s.id === slug);
}

export function getComplexityLabel(level: string): string {
  return { simple: 'Sencillo', media: 'Medio', compleja: 'Complejo' }[level] || level;
}

export function getComplexityColors(level: string) {
  return {
    simple: { bg: 'rgba(34,197,94,0.1)', text: '#22c55e', border: 'rgba(34,197,94,0.2)' },
    media: { bg: 'rgba(234,179,8,0.1)', text: '#eab308', border: 'rgba(234,179,8,0.2)' },
    compleja: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.2)' },
  }[level] || { bg: 'var(--surface-2)', text: 'var(--muted-light)', border: 'var(--border)' };
}
