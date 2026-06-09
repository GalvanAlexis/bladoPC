"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import PortfolioIntro from '@/components/PortfolioIntro';

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
  const [isMounted, setIsMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    if (sessionStorage.getItem('blado_intro_seen') === 'true') {
      setShowIntro(false);
    }
  }, []);

  const handleFinish = useCallback(() => {
    sessionStorage.setItem('blado_intro_seen', 'true');
    setShowIntro(false);
  }, []);

  const replayIntro = useCallback(() => {
    sessionStorage.setItem('blado_intro_seen', 'false');
    setShowIntro(true);
  }, []);

  if (!isMounted) {
    return <div style={{ minHeight: '100vh', background: '#050505' }} />;
  }

  if (showIntro) {
    return (
      <PortfolioIntro
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
