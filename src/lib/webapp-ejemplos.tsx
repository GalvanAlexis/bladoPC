import React from 'react';

export type WebAppCategory = 'colaboracion' | 'datos' | 'diseno' | 'gestion' | 'comunicacion';

export interface WebAppExample {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: WebAppCategory;
  capabilities: string[];
  icon: React.ReactNode;
}

const ICON_SIZE = { width: 20, height: 20 };

export const WEBAPP_EJEMPLOS: WebAppExample[] = [
  {
    id: 'collabboard',
    title: 'CollabBoard',
    description: 'Pizarra colaborativa infinita donde varios usuarios dibujan y escriben simultaneamente.',
    longDescription: 'Pizarra infinita con herramientas de dibujo, notas adhesivas, texto e imagenes. Cada cambio se replica al instante a todos los participantes via WebSocket. Cursor de cada usuario con su color. Exportacion a PDF. Ideal para brainstorming remoto y sesiones de diseño en equipo.',
    category: 'colaboracion',
    capabilities: ['tiempo-real', 'multi-usuario', 'websocket', 'export'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>,
  },
  {
    id: 'datalens',
    title: 'DataLens',
    description: 'Constructor de dashboards con graficos interactivos, filtros en vivo y fuentes de datos via API.',
    longDescription: 'Crea dashboards con graficos de barras, torta, lineas, mapas de calor y tablas. Conecta a cualquier fuente via API REST. Filtros que actualizan todos los graficos simultaneamente. Drag & drop para reorganizar paneles. Exporta a PDF, CSV e imagen. Ideal para equipos que necesitan monitorear metricas en vivo.',
    category: 'datos',
    capabilities: ['tiempo-real', 'graficos', 'api', 'export'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
  },
  {
    id: 'docuflow',
    title: 'DocuFlow',
    description: 'Editor de documentos colaborativo con formato rich text, comentarios y chat en linea.',
    longDescription: 'Editor de texto enriquecido con formato (negrita, listas, tablas, imagenes) similar a Google Docs. Colaboracion en tiempo real con cursores de colores por usuario. Comentarios en linea, historial de cambios y chat lateral. Soporta Markdown. Exportacion a PDF y DOCX.',
    category: 'colaboracion',
    capabilities: ['tiempo-real', 'multi-usuario', 'websocket', 'export'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    id: 'schemaforge',
    title: 'SchemaForge',
    description: 'Diagramador visual de bases de datos y UML con arrastrar y soltar.',
    longDescription: 'Editor visual para crear diagramas entidad-relacion, UML y arquitectura de software. Arrastra y suelta tablas, las conexiones se auto-rutean inteligentemente. Exportacion a SQL, PNG y SVG. Colaboracion en tiempo real. Ideal para equipos de desarrollo que disenan arquitectura juntos.',
    category: 'diseno',
    capabilities: ['tiempo-real', 'multi-usuario', 'drag-drop', 'export'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    id: 'taskforge',
    title: 'TaskForge',
    description: 'Gestor de proyectos con tablero Kanban, drag & drop, calendario y timeline.',
    longDescription: 'Tablero Kanban con arrastrar y soltar entre columnas. Asignacion de miembros, etiquetas, fechas limite y checklists. Vista calendario y timeline Gantt. Actualizaciones en vivo cuando alguien mueve una tarea. Carga de archivos adjuntos. Ideal para equipos agiles que gestionan sprints.',
    category: 'gestion',
    capabilities: ['tiempo-real', 'multi-usuario', 'drag-drop', 'websocket'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    id: 'codepair',
    title: 'CodePair',
    description: 'Editor de codigo colaborativo con terminal integrada y ejecucion remota.',
    longDescription: 'Editor de codigo con resaltado de sintaxis para +50 lenguajes. Colaboracion en tiempo real con cursores multiples. Terminal integrada que ejecuta codigo en servidor remoto. Chat integrado y videollamada embebida. Ideal para pair programming, entrevistas tecnicas y clases de programacion.',
    category: 'colaboracion',
    capabilities: ['tiempo-real', 'multi-usuario', 'websocket', 'api'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    id: 'mapexplorer',
    title: 'MapExplorer',
    description: 'Visualizador de mapas interactivos con markers, capas, filtros y animaciones.',
    longDescription: 'Mapa interactivo con markers personalizados, clustering automatico y capas superpuestas. Carga datos geo-referenciados via JSON o CSV. Calculo de rutas y distancias. Filtros en vivo que actualizan el mapa. Animaciones suaves al hacer zoom y pan. Ideal para flotas, inmobiliarias y negocios con presencia geografica.',
    category: 'datos',
    capabilities: ['tiempo-real', 'graficos', 'api', 'drag-drop'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    id: 'formkit',
    title: 'FormKit',
    description: 'Constructor de formularios inteligentes drag & drop con logica condicional.',
    longDescription: 'Editor visual drag & drop para crear formularios: texto, selects, fechas, archivos, firmas. Logica condicional que muestra/oculta campos segun respuestas. Panel de respuestas con graficos automaticos. Exportacion a Excel. Notificaciones por email de nuevos registros. Ideal para encuestas, registros y formularios internos.',
    category: 'gestion',
    capabilities: ['drag-drop', 'graficos', 'export', 'api'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
  },
  {
    id: 'chatpro',
    title: 'ChatPro',
    description: 'Panel de atencion al cliente multicanal en tiempo real con asignacion automatica.',
    longDescription: 'Panel unificado que recibe mensajes de WhatsApp, email, chat web y redes sociales en un solo lugar. Asignacion automatica a agentes disponibles. Respuestas rapidas predefinidas. Historial completo de conversaciones. Graficos de volumen diario y tiempo de respuesta. Ideal para areas de soporte y ventas.',
    category: 'comunicacion',
    capabilities: ['tiempo-real', 'multi-usuario', 'websocket', 'graficos'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    id: 'canvasstudio',
    title: 'CanvasStudio',
    description: 'Editor de imagenes y diseño en navegador con capas, filtros y colaboracion.',
    longDescription: 'Editor de imagenes con capas, filtros, texto, recortes y formas. Similar a Canva pero con colaboracion en vivo: varios diseñadores trabajando en el mismo proyecto. Plantillas prediseñadas por rubro. Exportacion a PNG, JPG, PDF. Ideal para equipos de marketing que crean contenido visual en equipo.',
    category: 'diseno',
    capabilities: ['tiempo-real', 'multi-usuario', 'drag-drop', 'export'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  },
];

export const WEBAPP_CATEGORIES: { id: WebAppCategory; label: string }[] = [
  { id: 'colaboracion', label: 'Colaboracion' },
  { id: 'datos', label: 'Datos y Visualizacion' },
  { id: 'diseno', label: 'Diseño' },
  { id: 'gestion', label: 'Gestion' },
  { id: 'comunicacion', label: 'Comunicacion' },
];

export const CAPABILITY_LABELS: Record<string, string> = {
  'tiempo-real': 'Tiempo real',
  'multi-usuario': 'Multi-usuario',
  websocket: 'WebSockets',
  'drag-drop': 'Drag & drop',
  graficos: 'Graficos',
  api: 'APIs',
  export: 'Exportacion',
};

export const RUBRO_GUIDE: { rubro: string; ideal: string; reason: string }[] = [
  { rubro: 'Tecnologia / Software', ideal: 'CodePair, SchemaForge, TaskForge', reason: 'Editores colaborativos, diagramacion de sistemas y gestion de proyectos agil.' },
  { rubro: 'Marketing / Diseño', ideal: 'CanvasStudio, CollabBoard, DataLens', reason: 'Diseño en equipo, brainstorming visual y dashboards de metricas de campanas.' },
  { rubro: 'Atencion al Cliente', ideal: 'ChatPro, FormKit, DataLens', reason: 'Panel multicanal en vivo, formularios inteligentes y reportes de volumen.' },
  { rubro: 'Logistica / Flotas', ideal: 'MapExplorer, DataLens, TaskForge', reason: 'Mapas interactivos con rutas, dashboards de operaciones y gestion de tareas.' },
  { rubro: 'Educacion / Capacitacion', ideal: 'DocuFlow, CollabBoard, CodePair', reason: 'Documentos compartidos, pizarras colaborativas y coding en vivo.' },
  { rubro: 'Recursos Humanos', ideal: 'FormKit, TaskForge, DocuFlow', reason: 'Formularios de postulacion, seguimiento de candidates y documentacion compartida.' },
  { rubro: 'Ventas / CRM', ideal: 'ChatPro, DataLens, FormKit', reason: 'Chat con clientes en vivo, dashboards de ventas y formularios de captacion.' },
];

export const PWA_VS_WEBAPP: { aspect: string; webapp: string; pwa: string }[] = [
  {
    aspect: 'Internet',
    webapp: 'Requiere conexion permanente',
    pwa: 'Funciona completamente offline',
  },
  {
    aspect: 'Instalacion',
    webapp: 'No, se usa en el navegador',
    pwa: 'Se instala en la pantalla de inicio',
  },
  {
    aspect: 'Hardware',
    webapp: 'No accede a硬件 del dispositivo',
    pwa: 'Camara, GPS, microfono, acelerometro',
  },
  {
    aspect: 'Notificaciones',
    webapp: 'No tipicamente',
    pwa: 'Push notifications',
  },
  {
    aspect: 'Colaboracion',
    webapp: 'Multi-usuario en tiempo real',
    pwa: 'Generalmente individual',
  },
  {
    aspect: 'Datos',
    webapp: 'Procesados en servidor',
    pwa: 'Almacenados localmente (IndexedDB)',
  },
  {
    aspect: 'Ejemplo tipico',
    webapp: 'Google Docs, Figma, Grafana',
    pwa: 'Taskio, Spotify Web, Pinterest',
  },
  {
    aspect: 'Ideal para',
    webapp: 'Herramientas de productividad, dashboards',
    pwa: 'Reemplazar app nativa en mobile',
  },
];

