"use client";

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AppProvider } from '@/lib/AppContext';

function getOrCreateSessionId(): string {
  const key = 'blado_visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function trackPageView(page: string, title: string | undefined) {
  const sessionId = getOrCreateSessionId();
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, title, sessionId }),
  }).catch(() => {});
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      const title = document.title || undefined;
      trackPageView(pathname, title);
    }
  }, [pathname]);

  useEffect(() => {
    trackPageView(pathname, document.title || undefined);

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

      {showPrivacyNotice && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            zIndex: 50,
            maxWidth: '320px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--foreground-2)',
            fontSize: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          Este sitio registra datos anonimos de visita (pagina, pais, dispositivo) con fines estadisticos.
          <button
            onClick={() => setShowPrivacyNotice(false)}
            style={{
              marginLeft: '8px',
              background: 'none',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
            aria-label="Cerrar aviso"
          >
            {'\u2715'}
          </button>
        </div>
      )}
    </AppProvider>
  );
}
