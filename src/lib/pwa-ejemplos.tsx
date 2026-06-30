import React from 'react';

export type PWACategory = 'productividad' | 'salud' | 'estilo-vida' | 'finanzas' | 'educacion';

export interface PWAExample {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: PWACategory;
  capabilities: string[];
  icon: React.ReactNode;
}

const ICON_SIZE = { width: 20, height: 20 };

export const PWA_EJEMPLOS: PWAExample[] = [
  {
    id: 'taskio',
    title: 'Taskio',
    description: 'Gestor de tareas offline-first con IndexedDB, sincronizacion automatica y notificaciones push.',
    longDescription: 'Crea, edita y completa tareas sin conexion a internet. Cuando vuelve la red, sincroniza automaticamente. Categorias con colores, filtros, busqueda y gestos tactiles (swipe para completar/eliminar). Notificaciones push para recordatorios.',
    category: 'productividad',
    capabilities: ['offline', 'push', 'sync'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  },
  {
    id: 'pocketweather',
    title: 'PocketWeather',
    description: 'App del clima con cache de pronostico semanal, radar interactivo y alertas push de tormentas.',
    longDescription: 'Pronostico del tiempo con cache completo para uso offline. Radar interactivo con animacion de precipitaciones. Geolocalizacion automatica. Alertas push para tormentas y cambios bruscos. Tema claro/oscuro segun el horario.',
    category: 'estilo-vida',
    capabilities: ['offline', 'push', 'gps', 'cache'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  },
  {
    id: 'fitmin',
    title: 'FitMin',
    description: 'Rastreador de ejercicios, agua, sueño y animo con graficos de progreso y recordatorios push.',
    longDescription: 'Registro diario de ejercicios, hidratacion, sueño y estado de animo. Graficos de progreso semanal y mensual. Recordatorios push personalizados. Sincronizacion multi-dispositivo. UI tipo app nativa con gestos y feedback haptico.',
    category: 'salud',
    capabilities: ['offline', 'push', 'sync', 'graphs'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
  },
  {
    id: 'pocketreader',
    title: 'PocketReader',
    description: 'Lector de articulos offline con resaltado, notas y marcadores. Cache-first para leer sin internet.',
    longDescription: 'Guarda articulos web para leer sin conexion (modo avion). Extrae contenido limpio eliminando publicidad y distracciones. Resaltado de texto, notas al margen y marcadores. Service Worker con estrategia cache-first. Push con recomendaciones personalizadas.',
    category: 'estilo-vida',
    capabilities: ['offline', 'push', 'cache', 'sync'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  },
  {
    id: 'quickscan',
    title: 'QuickScan',
    description: 'Escaner de codigos QR y barcodes con historial offline y generador de QR personalizados.',
    longDescription: 'Usa la camara del dispositivo para escanear codigos QR y barcodes al instante. Guarda historial completo de escaneos en IndexedDB. Genera QR personalizados con texto o URL. Exporta historial a CSV o PDF. Modo linterna integrado.',
    category: 'finanzas',
    capabilities: ['offline', 'camera', 'export'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>,
  },
  {
    id: 'budgetbee',
    title: 'BudgetBee',
    description: 'Control de gastos personal con graficos, presupuestos mensuales y alertas push al superar limites.',
    longDescription: 'Registro de ingresos y gastos con categorizacion. Graficos de torta y barras para visualizar tus finanzas. Funciona offline completo, sincroniza cuando hay red. Presupuesto mensual con alertas push al acercarte al limite. Escaneo de tickets con camara. Exporta reportes mensuales.',
    category: 'finanzas',
    capabilities: ['offline', 'push', 'sync', 'graphs', 'camera'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
  {
    id: 'recetapp',
    title: 'RecetApp',
    description: 'Libro de recetas offline con busqueda por ingredientes, temporizador y lista de compras.',
    longDescription: 'Recetario completo con busqueda por ingredientes disponibles. Modo offline con recetas cacheadas. Temporizador integrado para la coccion. Conversor de medidas. Lista de compras generada automaticamente desde las recetas. Notificaciones push con receta del dia.',
    category: 'estilo-vida',
    capabilities: ['offline', 'push', 'cache'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  {
    id: 'plantpal',
    title: 'PlantPal',
    description: 'Cuidador de plantas con recordatorios de riego, base de datos offline e identificacion por camara.',
    longDescription: 'Recordatorios de riego, fertilizacion y poda con notificaciones push. Base de datos de cuidados offline para +100 plantas. Identifica tu planta con la camara. Diario de crecimiento con fotos. Widget de proximo riego en la pantalla de inicio.',
    category: 'salud',
    capabilities: ['offline', 'push', 'camera', 'cache'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c0-4 4-6 4-6"/><path d="M12 4C8 4 4 8 4 14c0 2 1 4 2 6h12c1-2 2-4 2-6 0-6-4-10-8-10z"/></svg>,
  },
  {
    id: 'flexgym',
    title: 'FlexGym',
    description: 'Entrenador de estiramientos con temporizador, animaciones y progreso semanal. 100% offline.',
    longDescription: 'Rutinas de estiramientos guiadas con temporizador y animaciones. Funciona completamente offline sin depender de videos. Progreso semanal con graficos de consistencia. Notificaciones push para recordatorios diarios. Personaliza tus propias rutinas. Modo oscuro y accesibilidad.',
    category: 'salud',
    capabilities: ['offline', 'push', 'graphs'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14"/><path d="M6 8h2a2 2 0 0 1 2 2v10"/><path d="M2 18h20"/><path d="M2 14h20"/></svg>,
  },
  {
    id: 'glot',
    title: 'Glot',
    description: 'Aprendizaje de idiomas con flashcards, repeticion espaciada y pronunciacion por voz.',
    longDescription: 'Tarjetas de vocabulario con algoritmo de repeticion espaciada para optimizar el aprendizaje. Funciona offline con paquetes de idiomas descargables. Pronunciacion con Web Speech API. Push con palabra del dia. Progreso con rachas y estadisticas. Modo oscuro.',
    category: 'educacion',
    capabilities: ['offline', 'push', 'cache', 'graphs'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  },
  {
    id: 'packpal',
    title: 'PackPal',
    description: 'Planificador de viajes con checklist de equipaje, presupuesto y documentos offline.',
    longDescription: 'Checklist interactiva de equipaje categorizada por tipo de viaje (playa, nieve, negocio, aventura). Funciona offline en el destino sin roaming. Presupuesto de viaje en multiples monedas. Documentos escaneados guardados localmente. Push con recordatorios previos al viaje.',
    category: 'productividad',
    capabilities: ['offline', 'push', 'camera'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>,
  },
  {
    id: 'grocmate',
    title: 'GrocMate',
    description: 'Lista de compras colaborativa en tiempo real con escaneo de codigos y sincronizacion offline.',
    longDescription: 'Lista de compras compartida en tiempo real con tu familia o companeros. Modo offline con sincronizacion automatica al reconectar. Escanea codigos de barras de productos para agregarlos. Historial de precios por producto. Push cuando alguien agrega un item. Plantillas por supermercado.',
    category: 'productividad',
    capabilities: ['offline', 'push', 'sync', 'camera'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  },
  {
    id: 'medtime',
    title: 'MedTime',
    description: 'Recordatorio de medicamentos con push, historial offline y alertas de compatibilidad.',
    longDescription: 'Recordatorios de medicacion con notificaciones push infalibles. Historial de toma completo offline. Escanea el blister con la camara para registrar automaticamente. Alertas de compatibilidad entre medicamentos. Reporte semanal para compartir con tu medico.',
    category: 'salud',
    capabilities: ['offline', 'push', 'camera'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>,
  },
  {
    id: 'jampad',
    title: 'JamPad',
    description: 'Grabador de ideas musicales con almacenamiento offline, tempo y lista de reproduccion.',
    longDescription: 'Grabador de audio simple para capturar ideas musicales al instante. Almacena grabaciones en IndexedDB sin limites. Informacion de tempo y tono por grabacion. Lista de reproduccion ordenable. Comparte grabaciones cuando hay red. Push con recordatorio de practica diaria.',
    category: 'educacion',
    capabilities: ['offline', 'push', 'sync'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  },
  {
    id: 'votehub',
    title: 'VoteHub',
    description: 'Encuestas y sondeos en vivo con resultados en tiempo real y voto offline diferido.',
    longDescription: 'Crea y vota en encuestas al instante. Resultados en tiempo real con graficos animados. Modo offline: emite tu voto sin conexion y se sincroniza automaticamente despues. Push cuando hay una nueva encuesta. QR para compartir encuestas al instante. Sin necesidad de registro.',
    category: 'educacion',
    capabilities: ['offline', 'push', 'sync', 'graphs'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9h.01"/><path d="M18 9h.01"/><path d="M6 15h.01"/><path d="M18 15h.01"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>,
  },
  {
    id: 'shelfie',
    title: 'Shelfie',
    description: 'Catalogo de libros personal con escaneo ISBN, estadisticas de lectura y recomendaciones.',
    longDescription: 'Registra libros leidos, leyendo y por leer. Escanea el codigo de barras ISBN para auto-completar la ficha. Funciona offline con todos tus datos locales. Estadisticas de lectura: horas, paginas, libros por mes. Push con recomendaciones personalizadas. Modo oscuro.',
    category: 'estilo-vida',
    capabilities: ['offline', 'push', 'camera', 'graphs'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M12 6v7"/><path d="M9 9h6"/></svg>,
  },
  {
    id: 'cinepop',
    title: 'CinePop',
    description: 'Descubridora de peliculas con catalogo offline, busqueda sin conexion y recomendaciones.',
    longDescription: 'Catalogo de peliculas con cache completo para explorar sin internet. Busqueda y filtros funcionan offline. Push con estrenos de la semana. Marca peliculas vistas y pendientes. Recomendaciones aleatorias cuando no sabes que ver. Sin registro requerido.',
    category: 'estilo-vida',
    capabilities: ['offline', 'push', 'cache'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/></svg>,
  },
  {
    id: 'coinfolio',
    title: 'CoinFolio',
    description: 'Portfolio de criptomonedas con precios en vivo, alertas push y graficos offline.',
    longDescription: 'Seguimiento de precios de criptomonedas en tiempo real con WebSocket. Cache offline del ultimo precio consultado. Alertas push cuando un precio cruza el umbral que definiste. Portfolio simulado con ganancias/perdidas. Graficos de velas offline con datos cacheados.',
    category: 'finanzas',
    capabilities: ['offline', 'push', 'graphs', 'cache'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
  {
    id: 'stash',
    title: 'Stash',
    description: 'Gestor de contrasenas offline con cifrado local, WebAuthn y generador seguro.',
    longDescription: 'Almacena contrasenas cifradas localmente en tu dispositivo - nunca sube a la nube. Desbloqueo con PIN o huella digital (WebAuthn). Offline-first total: tus datos nunca salen del dispositivo. Generador de contrasenas seguras. Autocompletado en el navegador. Exporta backup cifrado.',
    category: 'productividad',
    capabilities: ['offline', 'auth', 'export'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  },
  {
    id: 'pollen',
    title: 'Pollen',
    description: 'Seguimiento de alergias estacionales con prediccion offline, mapa de polen y alertas.',
    longDescription: 'Registro diario de sintomas de alergia con escala de intensidad. Prediccion basada en datos historicos offline. Mapa de polen de tu zona con cache para consultar sin internet. Push con alerta de polen alto personalizada. Consejos segun nivel actual. Reporte semanal para el alergologo.',
    category: 'salud',
    capabilities: ['offline', 'push', 'gps', 'graphs'],
    icon: <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  },
];

export const PWA_CATEGORIES: { id: PWACategory; label: string }[] = [
  { id: 'productividad', label: 'Productividad' },
  { id: 'salud', label: 'Salud y Bienestar' },
  { id: 'estilo-vida', label: 'Estilo de Vida' },
  { id: 'finanzas', label: 'Finanzas' },
  { id: 'educacion', label: 'Educacion y Creatividad' },
];

export const CAPABILITY_LABELS: Record<string, string> = {
  offline: 'Offline',
  push: 'Push notifications',
  sync: 'Sincronizacion',
  cache: 'Cache inteligente',
  camera: 'Camara',
  gps: 'Geolocalizacion',
  graphs: 'Graficos',
  auth: 'Biometric auth',
  export: 'Exportacion',
};

export const RUBRO_GUIDE: { rubro: string; ideal: string; reason: string }[] = [
  { rubro: 'Gastronomia / Delivery', ideal: 'GrocMate, RecetApp', reason: 'Listas colaborativas, escaneo de productos y recetario offline para cocina.' },
  { rubro: 'Salud y Fitness', ideal: 'FitMin, MedTime, FlexGym, Pollen', reason: 'Recordatorios push, tracking offline y reportes para compartir con profesionales.' },
  { rubro: 'E-commerce / Retail', ideal: 'QuickScan, BudgetBee, GrocMate', reason: 'Escaneo de productos, control de gastos y listas de compras colaborativas.' },
  { rubro: 'Viajes y Turismo', ideal: 'PackPal, PocketWeather, PocketReader', reason: 'Informacion disponible sin roaming, checklists y lectura offline en el destino.' },
  { rubro: 'Educacion / Idiomas', ideal: 'Glot, VoteHub, JamPad', reason: 'Aprendizaje offline, encuestas en vivo y creatividad musical sin conexion.' },
  { rubro: 'Finanzas Personales', ideal: 'BudgetBee, CoinFolio, Stash', reason: 'Control de gastos offline, seguimiento de inversiones y contrasenas seguras.' },
  { rubro: 'Entretenimiento', ideal: 'CinePop, Shelfie, PocketReader', reason: 'Catalogo offline, recomendaciones y lectura sin conexion.' },
  { rubro: 'Agricultura / Jardineria', ideal: 'PlantPal, Pollen', reason: 'Cuidado de plantas offline y seguimiento de alergias estacionales.' },
];
