"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
interface AppContextValue {
  particlesEnabled: boolean;
  animationsEnabled: boolean;
  setParticlesEnabled: (v: boolean) => void;
  setAnimationsEnabled: (v: boolean) => void;
}

export const AppContext = createContext<AppContextValue>({
  particlesEnabled: true,
  animationsEnabled: true,
  setParticlesEnabled: () => {},
  setAnimationsEnabled: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ minHeight: '100vh', background: '#050505' }} />;
  }

  return (
    <AppContext.Provider value={{ particlesEnabled, animationsEnabled, setParticlesEnabled, setAnimationsEnabled }}>
      {children}
    </AppContext.Provider>
  );
}
