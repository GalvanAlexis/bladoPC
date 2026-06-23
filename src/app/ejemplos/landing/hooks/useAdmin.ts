'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'lum-admin';

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  img?: string;
}

export interface AdminState {
  galleryImages: string[];
  mainPrice: number;
  addonPrice: number;
  testimonials: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Carolina M.', text: 'Desde que uso Lumina mi piel se ve mas luminosa y las lineas de expresion se notan mucho menos. Lo recomiendo 100%.', rating: 5 },
  { id: '2', name: 'Valentina R.', text: 'Habia probado mil serums y ninguno me habia funcionado como este. En dos semanas note la diferencia.', rating: 5 },
  { id: '3', name: 'Camila L.', text: 'Me encanta que sea natural y que realmente funcione. La textura es super suave y huele increible.', rating: 5 },
];

const DEFAULTS: AdminState = {
  galleryImages: [
    'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
  ],
  mainPrice: 24990,
  addonPrice: 12500,
  testimonials: DEFAULT_TESTIMONIALS,
};

function loadState(): AdminState {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULTS, ...parsed };
    }
  } catch { /* ignore */ }
  return DEFAULTS;
}

function saveState(state: AdminState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

export function useAdmin() {
  const [state, setState] = useState<AdminState>(loadState);

  useEffect(() => { saveState(state); }, [state]);

  const update = useCallback((partial: Partial<AdminState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const updateImage = useCallback((index: number, src: string) => {
    setState((prev) => {
      const images = [...prev.galleryImages];
      images[index] = src;
      return { ...prev, galleryImages: images };
    });
  }, []);

  const addTestimonial = useCallback((t: Omit<Testimonial, 'id'>) => {
    setState((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { ...t, id: String(Date.now()) }],
    }));
  }, []);

  const updateTestimonial = useCallback((id: string, t: Partial<Testimonial>) => {
    setState((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((item) =>
        item.id === id ? { ...item, ...t } : item
      ),
    }));
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((item) => item.id !== id),
    }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULTS);
  }, []);

  return { ...state, update, updateImage, addTestimonial, updateTestimonial, deleteTestimonial, reset, DEFAULTS };
}
