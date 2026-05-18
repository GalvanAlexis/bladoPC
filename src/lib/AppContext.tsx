"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import CavernIntro from '@/components/CavernIntro';

interface AppContextValue {
  replayIntro: () => void;
  particlesEnabled: boolean;
  animationsEnabled: boolean;
  setParticlesEnabled: (v: boolean) => void;
  setAnimationsEnabled: (v: boolean) => void;
}

export const AppContext = createContext<AppContextValue>({
  replayIntro: () => {},
  particlesEnabled: true,
  animationsEnabled: true,
  setParticlesEnabled: () => {},
  setAnimationsEnabled: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const handleFinish = useCallback(() => {
    setShowIntro(false);
  }, []);

  const replayIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

  if (showIntro) {
    return (
      <CavernIntro
        onComplete={handleFinish}
        onSkip={handleFinish}
      />
    );
  }

  return (
    <AppContext.Provider value={{ replayIntro, particlesEnabled, animationsEnabled, setParticlesEnabled, setAnimationsEnabled }}>
      {children}
    </AppContext.Provider>
  );
}
