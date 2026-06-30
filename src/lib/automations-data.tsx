export interface AutomationExample {
  id: string;
  title: string;
  desc: string;
  benefit: string;
  icon: React.ReactNode;
  features: string[];
  tech: string[];
}

export const AUTOMATION_EJEMPLOS: AutomationExample[] = [
  {
    id: 'atencion-247',
    title: 'Atencion al cliente con IA 24/7',
    desc: 'Un bot que responde consultas frecuentes, deriva casos complejos y agenda turnos automaticamente usando tu base de conocimiento.',
    benefit: 'Tus clientes reciben respuesta al instante sin importar la hora. El equipo de soporte se enfoca solo en casos complejos. Menos esperas, mas ventas.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    features: [
      'Base de conocimiento con FAQs de tu negocio',
      'Derivacion inteligente a humano cuando el bot no puede resolver',
      'Agenda de turnos integrada con calendario',
      'Historial de conversaciones por cliente',
      'Disponible en WhatsApp, web y redes sociales',
      'Reportes semanales de consultas resueltas vs derivadas',
    ],
    tech: ['OpenAI / Claude', 'WhatsApp API', 'Calendly / Google Calendar', 'Dashboard en tiempo real'],
  },
  {
    id: 'extraccion-datos',
    title: 'Extraccion inteligente de datos',
    desc: 'Lee facturas, comprobantes, PDFs y contratos, y los convierte automaticamente en datos estructurados para tu sistema.',
    benefit: 'Adios a tipear datos a mano. Eliminas errores de carga, aceleras procesos contables y tu equipo administrativo trabaja en minutos lo que antes tomaba horas.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    features: [
      'Reconocimiento de texto en PDFs, imagenes y capturas',
      'Extraccion automatica de montos, fechas, proveedores y conceptos',
      'Validacion contra reglas de negocio (ej: facturas duplicadas)',
      'Exportacion a Excel, CSV o API de tu sistema',
      'Procesamiento batch de lotes de documentos',
      'Integracion con sistemas contables (QuickBooks, Balanz, etc.)',
    ],
    tech: ['OCR + LLM', 'Python / Node.js', 'PostgreSQL', 'Excel / CSV / API REST'],
  },
  {
    id: 'generacion-contenido',
    title: 'Generacion automatica de contenido',
    desc: 'Redacta posts para redes sociales, fichas de producto, newsletters o descripciones usando el tono de tu marca.',
    benefit: 'Mantenes redes activas y contenido fresco sin tener que escribir cada publicacion. Publicas mas seguido con menos esfuerzo.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    features: [
      'Generacion de posts para Instagram, LinkedIn, Twitter y Facebook',
      'Redaccion de newsletters con tu tone of voice',
      'Fichas de producto con descripciones SEO optimizadas',
      'Calendarizacion automatica con sugerencia de mejor horario de publicacion',
      'Variantes A/B del mismo contenido para testear',
      'Revision humana opcional antes de publicar',
    ],
    tech: ['GPT-4 / Claude', 'Canva API / Buffer', 'SEO analizer', 'Programacion de contenido'],
  },
  {
    id: 'routing-correos',
    title: 'Clasificacion y routing de correos',
    desc: 'Analiza cada email entrante, lo clasifica por tema y lo envia al area correspondiente con una respuesta de acuse automatica.',
    benefit: 'Ningun correo se pierde en la bandeja de entrada. Cada consulta llega al area correcta al instante. Tu equipo responde mas rapido.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    features: [
      'Clasificacion automatica por rubro: ventas, soporte, facturacion, RRHH',
      'Deteccion de urgencia por palabras clave y tono del mensaje',
      'Respuesta de acuse personalizada por cada categoria',
      'Re-envio al responsable del area con prioridad asignada',
      'Estadisticas semanales: volumen, tiempos de respuesta, categorias mas consultadas',
      'Integracion con Gmail, Outlook y cualquier IMAP',
    ],
    tech: ['Clasificador NLP', 'Gmail / Outlook API', 'Dashboard', 'Webhook a sistemas internos'],
  },
  {
    id: 'conciliacion-bancaria',
    title: 'Conciliacion bancaria automatica',
    desc: 'Conecta tu cuenta bancaria con tu sistema de facturacion. La IA cruza pagos, detecta diferencias y genera el reporte de conciliacion.',
    benefit: 'El cierre contable que te llevaba un dia entero se hace en minutos. Detectas inconsistencias al instante sin revisar planillas manualmente.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    features: [
      'Conexion directa con Home Banking / API de tu banco',
      'Cruze automatico de extractos contra facturas emitidas y cobradas',
      'Deteccion de pagos no identificados para conciliar manualmente',
      'Reporte de diferencias: montos, fechas, omitidos',
      'Generacion de asientos contables preparados para exportar',
      'Notificaciones diarias de novedades sin abrir el sistema',
    ],
    tech: ['API bancaria', 'Python / Node.js', 'PostgreSQL', 'Excel / PDF export'],
  },
];
