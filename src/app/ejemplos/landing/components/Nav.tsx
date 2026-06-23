'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Ingredientes', href: '#ingredientes' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#newsletter' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.href.slice(1))).filter(Boolean) as HTMLElement[];
    const links = navRef.current?.querySelectorAll('.lum-scroll-link');

    if (!links || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => {
              const anchor = link as HTMLAnchorElement;
              const href = anchor.getAttribute('href')?.slice(1);
              anchor.classList.toggle('lum-nav-active', href === entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, close]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    close();
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: 'smooth' });
  }, [close]);

  return (
    <nav ref={navRef} className="lum-nav">
      <div className="lum-nav-inner">
        <div className="lum-nav-left">
          <a href="/servicios" className="lum-back-link">&larr; Servicios</a>
          <span className="lum-logo">Lumina</span>
        </div>
        <div className="lum-nav-right">
          <div className="lum-nav-desktop">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="lum-scroll-link"
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <button id="lum-dark-toggle" className="lum-dark-btn" aria-label="Alternar modo oscuro">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
          </div>
          <button
            className="lum-hamburger"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          >
            <span className={`lum-ham-line ${open ? 'lum-ham-open' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              style={{
                position: 'fixed', inset: 0, zIndex: 99,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
              }}
            />
            <motion.nav
              key="nav-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(75vw, 300px)',
                zIndex: 100,
                background: 'var(--lum-bg)',
                display: 'flex', flexDirection: 'column',
                padding: '56px 32px 32px',
                boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
              }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="lum-scroll-link lum-mobile-link"
                  onClick={(e) => handleLinkClick(e, item.href)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{ marginTop: 'auto' }}
              >
                <button id="lum-dark-toggle-mobile" className="lum-dark-btn lum-mobile-theme" aria-label="Alternar modo oscuro">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  <span>Modo oscuro</span>
                </button>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .lum-nav-desktop { display: flex; align-items: center; gap: 20px; }
        .lum-hamburger {
          display: none;
          background: none; border: none; cursor: pointer;
          width: 28px; height: 28px;
          padding: 4px;
          position: relative;
          z-index: 100;
        }
        .lum-ham-line,
        .lum-ham-line::before,
        .lum-ham-line::after {
          display: block;
          width: 100%; height: 2px;
          background: var(--lum-text);
          border-radius: 2px;
          transition: all 0.3s ease;
          position: absolute;
          left: 0;
        }
        .lum-ham-line {
          top: 50%; transform: translateY(-50%);
        }
        .lum-ham-line::before {
          content: '';
          top: -7px;
        }
        .lum-ham-line::after {
          content: '';
          top: 7px;
        }
        .lum-ham-line.lum-ham-open {
          background: transparent;
        }
        .lum-ham-line.lum-ham-open::before {
          top: 0; transform: rotate(45deg);
        }
        .lum-ham-line.lum-ham-open::after {
          top: 0; transform: rotate(-45deg);
        }
        .lum-mobile-link {
          font-size: 18px !important;
          font-weight: 600 !important;
          padding: 14px 0;
          border-bottom: 1px solid rgba(184,118,118,0.08);
          text-decoration: none;
          color: var(--lum-text) !important;
        }
        .lum-mobile-link.lum-nav-active {
          color: var(--lum-primary) !important;
        }
        .lum-mobile-theme {
          display: flex !important;
          align-items: center;
          gap: 10px;
          width: 100%;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px !important;
          padding: 14px 18px !important;
          height: auto !important;
        }
        @media (max-width: 768px) {
          .lum-nav-desktop { display: none; }
          .lum-hamburger { display: block; }
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `{
  function setupDarkToggle(btnId) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', function() {
      document.documentElement.classList.toggle('lum-dark');
      var isDark = document.documentElement.classList.contains('lum-dark');
      try { localStorage.setItem('lum-theme', isDark ? 'dark' : 'light'); } catch(e) {}
      var meta = document.querySelector('meta[name="color-scheme"]');
      if (meta) meta.content = isDark ? 'dark' : 'light dark';
    });
  }
  setupDarkToggle('lum-dark-toggle');
  setupDarkToggle('lum-dark-toggle-mobile');
}`,
        }}
      />
    </nav>
  );
}
