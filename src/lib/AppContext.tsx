"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
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
    sessionStorage.setItem('blado_intro_seen', 'false'); // Opcional, pero para consistencia
    setShowIntro(true);
  }, []);

  // Evita hydration mismatch y parpadeos bruscos
  if (!isMounted) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

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
