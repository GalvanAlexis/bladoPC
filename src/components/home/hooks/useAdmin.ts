'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SkillItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  potency: number;
  color: string;
  details: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  details: string;
  tags: string[];
  localOnly: boolean;
}

export interface AboutItem {
  id: string;
  title: string;
  desc: string;
  details: string;
  tags: string[];
}

export interface HeroContent {
  tagline: string;
  headline1: string;
  headline2: string;
  description: string;
}

export interface PortfolioAdminState {
  hero: HeroContent;
  services: ServiceItem[];
  skills: SkillItem[];
  about: AboutItem[];
}

const DEFAULT_HERO: HeroContent = {
  tagline: 'Soporte IT · Soluciones Digitales · Ciencia de Datos',
  headline1: '¿La PC no anda bien?',
  headline2: '¿Cansado de tareas repetitivas?',
  description: 'Contactá con Blado para una solución sin vueltas. Dejá de pelear con la tecnología y empezá a aprovecharla.',
};

const DEFAULT_STATE: PortfolioAdminState = {
  hero: DEFAULT_HERO,
  services: [
    { id: 'hardware', title: 'Reparación de PC', subtitle: 'Nivel Componente y Software', desc: 'Diagnóstico preciso, mantenimiento preventivo/correctivo y optimización profunda.', details: 'Mi enfoque técnico de reparación está fuertemente inclinado a la resolución por software y a la optimización del sistema operativo. A nivel de hardware, la reparación se ejecuta mediante el recambio directo del componente dañado.', tags: ['PC de Escritorio', 'Optimización SO', 'Diagnóstico Avanzado', 'Recambio de Componentes'], localOnly: true },
    { id: 'software', title: 'Automatizaciones', subtitle: 'Soluciones Digitales', desc: 'Sistemas a medida para PyMEs y emprendedores que ahorran horas de trabajo a la semana.', details: 'Analizamos cómo tu negocio pierde tiempo en tareas manuales y desarrollamos software a medida para resolverlo.', tags: ['Bots', 'Scripts', 'Node.js', 'Integración de APIs', 'Sistemas a Medida'], localOnly: false },
    { id: 'data', title: 'Ciencia de Datos', subtitle: 'Optimización con IA', desc: 'Análisis profundo de datos y tableros predictivos para tomar decisiones gerenciales informadas.', details: 'Diseñamos tableros de control interactivos (Dashboards) analizando a fondo la base de datos de tus clientes u operaciones.', tags: ['Dashboards', 'Machine Learning', 'Gemini API', 'Análisis Predictivo', 'Pandas'], localOnly: false },
  ],
  skills: [
    { id: 'fullstack', icon: '⬡', title: 'Full-Stack & Mobile', desc: 'Aplicaciones web modernas y multiplataforma.', tags: ['Next.js', 'React', 'Expo', 'NestJS', 'HTMX', 'Tailwind CSS'], potency: 92, color: '#e11d48', details: 'Desarrollo de plataformas SaaS completas, aplicaciones móviles con Expo y sistemas e-learning.' },
    { id: 'backend', icon: '▣', title: 'Arquitectura Backend', desc: 'APIs robustas, microservicios y bases de datos eficientes.', tags: ['Go (Gin)', 'Python (Django)', 'PostgreSQL', 'Redis', 'SQLite', 'Node.js'], potency: 88, color: '#3b82f6', details: 'Diseño avanzado de esquemas de bases de datos relacionales, optimización de consultas complejas.' },
    { id: 'ai-data', icon: '◈', title: 'IA & Data Science', desc: 'Análisis de datos, NLP y creación de agentes autónomos.', tags: ['Streamlit', 'spaCy', 'Gemini API', 'AI Agents', 'Pandas'], potency: 85, color: '#8b5cf6', details: 'Implementación de pipelines de NLP y sistemas interactivos con IA.' },
  ],
  about: [
    { id: 'perfil', title: 'El Perfil Técnico', desc: 'Desarrollador Full-Stack, Data Scientist y líder técnico.', details: 'Mi visión combina el entendimiento profundo del hardware con el desarrollo de software escalable.', tags: ['Full-Stack', 'Data Science', 'SaaS', 'Arquitectura', 'Liderazgo Técnico'] },
    { id: 'formacion', title: 'Formación y Camino', desc: 'De Técnico de PC a Ingeniero de Sistemas autodidacta.', details: 'Mi formación comenzó como Técnico de Reparación de PC, lo que me dio las bases sobre hardware y sistemas.', tags: ['Técnico de PC', 'ISFDyT 57', 'Ing. de Sistemas', 'OSSU', 'Autodidacta'] },
  ],
};

const STORAGE_KEY = 'blado-admin';

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function loadState(): PortfolioAdminState {
  if (typeof window === 'undefined') return deepClone(DEFAULT_STATE);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PortfolioAdminState>;
      const merged: PortfolioAdminState = {
        hero: { ...DEFAULT_HERO, ...parsed.hero },
        services: parsed.services ?? deepClone(DEFAULT_STATE.services),
        skills: parsed.skills ?? deepClone(DEFAULT_STATE.skills),
        about: parsed.about ?? deepClone(DEFAULT_STATE.about),
      };
      return merged;
    }
  } catch { /* ignore */ }
  return deepClone(DEFAULT_STATE);
}

function saveState(state: PortfolioAdminState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

export function useAdmin() {
  const [state, setState] = useState<PortfolioAdminState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(loadState());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveState(state);
  }, [state, loaded]);

  const update = useCallback((partial: Partial<PortfolioAdminState>) => {
    setState(prev => ({ ...prev, ...partial }));
  }, []);

  const updateHero = useCallback((hero: Partial<HeroContent>) => {
    setState(prev => ({ ...prev, hero: { ...prev.hero, ...hero } }));
  }, []);

  const addService = useCallback((item: ServiceItem) => {
    setState(prev => ({ ...prev, services: [...prev.services, item] }));
  }, []);

  const updateService = useCallback((id: string, item: Partial<ServiceItem>) => {
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...item } : s),
    }));
  }, []);

  const deleteService = useCallback((id: string) => {
    setState(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  }, []);

  const addSkill = useCallback((item: SkillItem) => {
    setState(prev => ({ ...prev, skills: [...prev.skills, item] }));
  }, []);

  const updateSkill = useCallback((id: string, item: Partial<SkillItem>) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...item } : s),
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setState(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  }, []);

  const addAbout = useCallback((item: AboutItem) => {
    setState(prev => ({ ...prev, about: [...prev.about, item] }));
  }, []);

  const updateAbout = useCallback((id: string, item: Partial<AboutItem>) => {
    setState(prev => ({
      ...prev,
      about: prev.about.map(a => a.id === id ? { ...a, ...item } : a),
    }));
  }, []);

  const deleteAbout = useCallback((id: string) => {
    setState(prev => ({ ...prev, about: prev.about.filter(a => a.id !== id) }));
  }, []);

  const reset = useCallback(() => {
    setState(deepClone(DEFAULT_STATE));
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  return {
    ...state,
    loaded,
    update,
    updateHero,
    addService, updateService, deleteService,
    addSkill, updateSkill, deleteSkill,
    addAbout, updateAbout, deleteAbout,
    reset,
  };
}
