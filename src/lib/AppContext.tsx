"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import StarWarsIntro from '@/components/StarWarsIntro';

interface AppContextValue {
  replayIntro: () => void;
}

const AppContext = createContext<AppContextValue>({
  replayIntro: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  const handleFinish = useCallback(() => {
    setShowIntro(false);
  }, []);

  const replayIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

  if (showIntro) {
    return (
      <StarWarsIntro
        onComplete={handleFinish}
        onSkip={handleFinish}
      />
    );
  }

  return (
    <AppContext.Provider value={{ replayIntro }}>
      {children}
    </AppContext.Provider>
  );
}
