'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'con-admin';

export interface Miembro {
  id: string;
  nombre: string;
  rol: string;
  bio: string;
}

export interface ServicioItem {
  id: string;
  titulo: string;
  desc: string;
  detalle: string;
  publico: string;
  precio: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface RecursoItem {
  id: string;
  titulo: string;
  desc: string;
  popoverContent: string;
}

export interface ContableAdminState {
  heroTagline: string;
  heroDesc: string;
  equipo: Miembro[];
  servicios: ServicioItem[];
  faq: FAQItem[];
  recursos: RecursoItem[];
}

const DEFAULTS: ContableAdminState = {
  heroTagline: 'Estudio Contable en Chascomus',
  heroDesc:
    'Mas de 12 anos asesorando a PyMEs, comercios y profesionales en Chascomus y la region. Liquidacion de sueldos, impuestos, contabilidad general y mas.',
  equipo: [
    { id: '1', nombre: 'CPN Martin Martinez', rol: 'Socio Fundador', bio: 'Contador Publico (UBA). Especialista en Impuestos. +15 anos de experiencia en asesoria impositiva a PyMEs.' },
    { id: '2', nombre: 'Cra. Laura Gomez', rol: 'Socia', bio: 'Contadora Publica (UNLP). Especialista en Liquidacion de Sueldos. +12 anos liderando el area laboral.' },
    { id: '3', nombre: 'CPN Federico Lopez', rol: 'Senior', bio: 'Contador Publico. Especialista en Sociedades y Constitucion de Empresas. Expositor en camaras empresariales.' },
  ],
  servicios: [
    { id: '1', titulo: 'Liquidacion de Sueldos', desc: 'Calculo de remuneraciones, cargas sociales y sindicales. Presentacion de declaraciones juradas mensuales y anuales.', detalle: 'Incluye calculo de remuneraciones mensuales, cargas sociales (jubilacion, obra social, sindicato), liquidacion anual del SAC, presentacion de declaraciones juradas (F.931), emision de recibos de sueldo digitales y certificaciones de servicios. Gestionamos tambien altas y bajas en AFIP, ART y obra social.', publico: 'Empresas con empleados registrados', precio: 'Desde $15.000/mes' },
    { id: '2', titulo: 'Impuestos (IVA, Ganancias, BBPP)', desc: 'Liquidacion mensual y anual de todos los impuestos nacionales y provinciales. Regimenes de retencion y percepcion.', detalle: 'Liquidacion mensual de IVA (F.2002), regimen general y monotributo. Impuesto a las Ganancias personas juridicas (F.712) y personas fisicas (F.711). Bienes Personales (F.762). Regimenes de retencion y percepcion de IIBB. Gestion de planes de pago y moratorias.', publico: 'Monotributistas, autonomos y sociedades', precio: 'Desde $12.000/mes' },
    { id: '3', titulo: 'Contabilidad General', desc: 'Registro contable completo, balances, libros IVA y societarios. Emision de estados contables certificados.', detalle: 'Registro diario de operaciones en libros contables obligatorios (Diario, Inventarios, IVA). Emision de balances mensuales y anuales. Certificacion de estados contables por contador publico. Libros societarios (Actas, Socios). Preparacion de documentacion para entes de control.', publico: 'Comercios, industrias y servicios', precio: 'Desde $18.000/mes' },
    { id: '4', titulo: 'Monotributo', desc: 'Altas, bajas, recategorizaciones y declaraciones juradas mensuales. Gestion de categorias y facturacion.', detalle: 'Gestion completa de altas, bajas y recategorizaciones automaticas y voluntarias. Categoria optima segun parametros facturacion/alquiler. Declaraciones juradas mensuales. Pago facil con debito automatico. Asesoramiento sobre el momento optimo para pasar a responsable inscripto.', publico: 'Emprendedores y profesionales independientes', precio: 'Desde $8.000/mes' },
    { id: '5', titulo: 'Sociedades y Empresas', desc: 'Constitucion de SAS/SRL, asambleas, registros contables y presentacion de estados contables anuales.', detalle: 'Constitucion de SAS, SRL y SA. Tramites ante la Inspeccion General de Justicia (IGJ) o Registro Publico. Redaccion de contratos societarios. Asambleas ordinarias y extraordinarias. Aumentos de capital y modificaciones estatutarias. Disolucion y liquidacion de sociedades.', publico: 'Empresas constituidas o en formacion', precio: 'Desde $25.000/mes' },
    { id: '6', titulo: 'Auditoria y Balances', desc: 'Revision de estados contables, auditoria externa y certificacion de balances para entes publicos y privados.', detalle: 'Revision integral de estados contables segun normas RT y NCPA. Auditoria externa para entes publicos y privados. Certificacion de balances para creditos bancarios, licitaciones y concursos. Due diligence contable-impositiva para fusiones y adquisiciones.', publico: 'Sociedades que requieren balance certificado', precio: 'Desde $30.000/mes' },
  ],
  faq: [
    { id: '1', q: 'Cuanto cuesta una consulta inicial?', a: 'La primera reunion es totalmente gratuita y sin compromiso. Nos conoces, te contamos como trabajamos y si te sentis comodo, ahi recien arrancamos.' },
    { id: '2', q: 'Que necesito para empezar a trabajar con ustedes?', a: 'Muy poco: tu CUIT, clave fiscal, y los datos basicos de tu actividad. Nosotros nos encargamos de todo el tramite administrativo.' },
    { id: '3', q: 'Toman clientes de otros estudios contables?', a: 'Si, recibimos clientes que vienen de otros estudios. Nos encargamos de la transferencia ordenada de toda la documentacion y registros.' },
  ],
  recursos: [
    { id: '1', titulo: 'Guia completa de Monotributo 2026', desc: 'Todo lo que necesitas saber para categorizarte, recategorizarte y pagar menos. Incluye tabla de categorias actualizada.', popoverContent: 'La AFIP actualizo las escalas de monotributo para 2026 con incrementos del 25% promedio. Las categorias mas bajas (A y B) tienen los menores aumentos. Te ayudamos a calcular tu categoria optima para pagar menos impuestos legalmente.' },
    { id: '2', titulo: 'Calendario impositivo: vencimientos de Julio', desc: 'Fechas clave de IVA, Ganancias, Bienes Personales, Sueldos y mas. No te pierdas ningun vencimiento.', popoverContent: 'Julio es el mes con mas vencimientos concentrados del semestre. IVA mensual (dia 18), Ganancias personas juridicas (dia 22), Bienes Personales (dia 25), y liquidacion de sueldos con SAC (dia 5). Descarga el calendario completo en PDF.' },
  ],
};

function loadState(): ContableAdminState {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const merged = { ...DEFAULTS, ...parsed };
      if (Array.isArray(parsed.servicios)) {
        merged.servicios = parsed.servicios.map((s: Partial<ServicioItem>) => {
          const def = DEFAULTS.servicios.find((d) => d.id === s.id);
          return { ...def, ...s } as ServicioItem;
        });
      }
      return merged;
    }
  } catch {
    /* ignore */
  }
  return DEFAULTS;
}

function saveState(state: ContableAdminState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function useAdmin() {
  const [state, setState] = useState<ContableAdminState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = useCallback((partial: Partial<ContableAdminState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  /* Equipo CRUD */
  const addMiembro = useCallback((m: Omit<Miembro, 'id'>) => {
    setState((prev) => ({
      ...prev,
      equipo: [...prev.equipo, { ...m, id: String(Date.now()) }],
    }));
  }, []);

  const updateMiembro = useCallback((id: string, data: Partial<Miembro>) => {
    setState((prev) => ({
      ...prev,
      equipo: prev.equipo.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  }, []);

  const deleteMiembro = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      equipo: prev.equipo.filter((item) => item.id !== id),
    }));
  }, []);

  /* Servicios CRUD */
  const addServicio = useCallback((s: Omit<ServicioItem, 'id'>) => {
    setState((prev) => ({
      ...prev,
      servicios: [...prev.servicios, { ...s, id: String(Date.now()) }],
    }));
  }, []);

  const updateServicio = useCallback((id: string, data: Partial<ServicioItem>) => {
    setState((prev) => ({
      ...prev,
      servicios: prev.servicios.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  }, []);

  const deleteServicio = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      servicios: prev.servicios.filter((item) => item.id !== id),
    }));
  }, []);

  /* FAQ CRUD */
  const addFAQ = useCallback((f: Omit<FAQItem, 'id'>) => {
    setState((prev) => ({
      ...prev,
      faq: [...prev.faq, { ...f, id: String(Date.now()) }],
    }));
  }, []);

  const updateFAQ = useCallback((id: string, data: Partial<FAQItem>) => {
    setState((prev) => ({
      ...prev,
      faq: prev.faq.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  }, []);

  const deleteFAQ = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      faq: prev.faq.filter((item) => item.id !== id),
    }));
  }, []);

  /* Recursos CRUD */
  const addRecurso = useCallback((r: Omit<RecursoItem, 'id'>) => {
    setState((prev) => ({
      ...prev,
      recursos: [...prev.recursos, { ...r, id: String(Date.now()) }],
    }));
  }, []);

  const updateRecurso = useCallback((id: string, data: Partial<RecursoItem>) => {
    setState((prev) => ({
      ...prev,
      recursos: prev.recursos.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  }, []);

  const deleteRecurso = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      recursos: prev.recursos.filter((item) => item.id !== id),
    }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULTS);
  }, []);

  return {
    ...state,
    update,
    addMiembro,
    updateMiembro,
    deleteMiembro,
    addServicio,
    updateServicio,
    deleteServicio,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    addRecurso,
    updateRecurso,
    deleteRecurso,
    reset,
    DEFAULTS,
  };
}
