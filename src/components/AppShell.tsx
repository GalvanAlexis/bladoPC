"use client";

import React, { useEffect, useState } from 'react';
import { AppProvider } from '@/lib/AppContext';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);

  useEffect(() => {
    // ISS-022: Registrar visita (fire-and-forget, no bloquea la UI)
    fetch('/api/analytics/track', { method: 'POST' }).catch(() => {});

    // ISS-023: Mostrar aviso de privacidad solo en la primera visita
    const seen = localStorage.getItem('blado_privacy_seen');
    if (!seen) {
      setShowPrivacyNotice(true);
      localStorage.setItem('blado_privacy_seen', '1');
      const timer = setTimeout(() => setShowPrivacyNotice(false), 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AppProvider>
      {children}

      {/* ISS-023: Privacy Notice Toast */}
      {showPrivacyNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 z-50 max-w-xs rounded-lg border border-gray-700 bg-gray-900/90 px-4 py-3 text-xs text-gray-400 shadow-lg backdrop-blur-sm animate-fade-in"
        >
          🔒 Este sitio registra datos anónimos de visita (país, dispositivo)
          con fines estadísticos. No se almacenan IPs.
          <button
            onClick={() => setShowPrivacyNotice(false)}
            className="ml-2 text-gray-600 hover:text-gray-400 transition-colors"
            aria-label="Cerrar aviso"
          >
            ✕
          </button>
        </div>
      )}
    </AppProvider>
  );
}
