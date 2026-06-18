"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
interface AppContextValue {
  animationsEnabled: boolean;
  setAnimationsEnabled: (v: boolean) => void;
}

export const AppContext = createContext<AppContextValue>({
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ minHeight: '100vh', background: '#050505' }} />;
  }

  return (
    <AppContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      {children}
    </AppContext.Provider>
  );
}
