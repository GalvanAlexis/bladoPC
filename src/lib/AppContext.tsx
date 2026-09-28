"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface AppContextValue {
  animationsEnabled: boolean;
  setAnimationsEnabled: (v: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextValue>({
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
  theme: 'dark',
  toggleTheme: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem('blado-theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return 'dark';
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.classList.toggle('blado-light', initial === 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('blado-theme', next); } catch {}
      document.documentElement.classList.toggle('blado-light', next === 'light');
      return next;
    });
  }, []);

  return (
    <AppContext.Provider value={{ animationsEnabled, setAnimationsEnabled, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}
