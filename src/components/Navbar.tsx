"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAppContext } from '@/lib/AppContext';

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onAdminClick?: () => void;
}

const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'about', label: 'Sobre m\u00ed' },
  { id: 'skills', label: 'Habilidades' },
];

export default function Navbar({ onToggleSidebar, sidebarOpen, onAdminClick }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useAppContext();
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;
    const ids = SECTIONS.map(s => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [pathname]);

  const scrollTo = (id: string) => {
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 200);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHome = pathname === '/';

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center"
      style={{
        background: scrolled
          ? 'var(--background)'
          : 'linear-gradient(to bottom, var(--background), var(--nav-bg-to, transparent))',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="h-full w-full px-4 sm:px-6 flex items-center justify-between">

        {/* Izquierda: hamburger + logo */}
        <div className="flex items-center gap-4">

          {/* Hamburger animado */}
          <button
            id="sidebar-toggle"
            onClick={onToggleSidebar}
            className="p-1 rounded"
            title={sidebarOpen ? 'Cerrar panel' : 'Abrir panel'}
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted)',
              width: '24px',
              height: '24px',
              position: 'relative',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
          >
            <span style={{
              position: 'absolute',
              left: '3px',
              top: sidebarOpen ? '11px' : '5px',
              width: '18px',
              height: '2px',
              borderRadius: '1px',
              background: 'currentColor',
              transform: sidebarOpen ? 'rotate(45deg)' : 'none',
              transition: 'all 0.25s ease',
            }} />
            <span style={{
              position: 'absolute',
              left: '3px',
              top: '11px',
              width: '18px',
              height: '2px',
              borderRadius: '1px',
              background: 'currentColor',
              opacity: sidebarOpen ? 0 : 1,
              transition: 'all 0.2s ease',
            }} />
            <span style={{
              position: 'absolute',
              left: '3px',
              top: sidebarOpen ? '11px' : '17px',
              width: '18px',
              height: '2px',
              borderRadius: '1px',
              background: 'currentColor',
              transform: sidebarOpen ? 'rotate(-45deg)' : 'none',
              transition: 'all 0.25s ease',
            }} />
          </button>

          {/* Logotipo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="text-sm font-semibold tracking-tight select-none transition-opacity group-hover:opacity-80"
              style={{ color: 'var(--foreground)' }}
            >
              Portfolio
            </span>
          </Link>
        </div>

        {/* Centro: desktop nav links */}
        {isHome && (
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: activeSection === s.id ? 'var(--accent)' : 'var(--muted)',
                  transition: 'color 0.2s ease',
                  borderRadius: '6px',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = activeSection === s.id ? 'var(--accent)' : 'var(--muted)'; }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Derecha */}
        <div className="flex items-center gap-3">
          {/* Admin button */}
          <button
            onClick={onAdminClick}
            aria-label="Panel de administracion"
            title="Admin"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted)',
              padding: '6px',
              borderRadius: '6px',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              lineHeight: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted)',
              padding: '6px',
              borderRadius: '6px',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              lineHeight: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Volver (solo en subpages) */}
          {!isHome && (
            <button
              onClick={() => router.push('/')}
              className="text-xs transition-colors hidden sm:block"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              &larr; Volver
            </button>
          )}

          {/* Status dot */}
          <div className="flex items-center gap-2">
            <span className="text-xs hidden sm:inline" style={{ color: 'var(--muted)' }}>
              Online
            </span>
            <span className="status-dot" aria-hidden="true" />
          </div>
        </div>

      </div>
    </nav>
  );
}
