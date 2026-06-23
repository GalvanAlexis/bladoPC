'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const GRANATE = '#7a1a1a';
const GRANATE_DARK = '#5a1010';
const TEXT_SEC = '#5a5550';
const BG_WARM = '#f5f3f0';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Trayectoria', href: '#metrics' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.href.slice(1))).filter(Boolean) as HTMLElement[];
    const links = navRef.current?.querySelectorAll('.con-scroll-link');

    if (!links || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => {
              const anchor = link as HTMLAnchorElement;
              const href = anchor.getAttribute('href')?.slice(1);
              anchor.classList.toggle('con-nav-active', href === entry.target.id);
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

  const handleLoginClick = useCallback(() => {
    setOpen(false);
    setShowLogin(true);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setShowLogin(false);
    setShowDash(true);
  }, []);

  const panel = open ? (
    <>
      <motion.div
        key="con-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
        style={{
          position: 'fixed', inset: 0, zIndex: 999998,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
        }}
      />
      <motion.nav
        key="con-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(75vw, 300px)',
          zIndex: 999999,
          background: BG_WARM,
          display: 'flex', flexDirection: 'column',
          padding: '56px 32px 32px',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
        }}
      >
        {NAV_ITEMS.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            className="con-scroll-link con-mobile-link"
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
          <button
            className="con-mobile-admin"
            onClick={() => { setOpen(false); setShowLogin(true); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
            </svg>
            Ingresar
          </button>
        </motion.div>
      </motion.nav>
    </>
  ) : null;

  return (
    <>
      {/* ─── Top Bar ─── */}
      <div
        style={{
          background: GRANATE_DARK,
          color: 'rgba(255,255,255,0.8)',
          fontSize: 12,
          padding: '6px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '4px 16px',
        }}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span>&#9742; (02241) 45-6789</span>
          <span>&#9993; estudio@mya-contable.com.ar</span>
        </div>
        <span className="con-topbar-hours">Lun a Vie 9:00 - 18:00</span>
      </div>

      {/* ─── Nav ─── */}
      <nav
        ref={navRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(245,243,240,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="/servicios"
              style={{
                fontSize: 12, color: TEXT_SEC, textDecoration: 'none',
                fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4,
                transition: 'color 0.2s',
              }}
            >
              &larr; Servicios
            </a>
            <span style={{ fontSize: 17, fontWeight: 700, color: GRANATE, letterSpacing: '-0.01em' }}>M&amp;A</span>
          </div>

          {/* Desktop links */}
          <div className="con-nav-desktop" style={{ alignItems: 'center', gap: 20, fontSize: 13, fontWeight: 500, color: TEXT_SEC }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="con-scroll-link"
                onClick={(e) => handleLinkClick(e, item.href)}
                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                {item.label}
              </a>
            ))}
            <button
              className="con-login-btn"
              onClick={handleLoginClick}
              aria-label="Ingresar"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 500, color: TEXT_SEC,
                background: 'none', border: '1px solid rgba(122,26,26,0.15)',
                borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
              </svg>
              <span>Admin</span>
            </button>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="con-hamburger"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          >
            <span className={`con-ham-line ${open ? 'con-ham-open' : ''}`} />
          </button>
        </div>
      </nav>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>{panel}</AnimatePresence>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AdminLogin open={showLogin} onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />,
        document.body
      )}
      {typeof document !== 'undefined' && createPortal(
        <AdminDashboard open={showDash} onClose={() => setShowDash(false)} />,
        document.body
      )}

      <style>{`
        .con-nav-desktop { display: flex; align-items: center; gap: 20px; }
        .con-topbar-hours { display: inline; }
        @media (max-width: 480px) {
          .con-topbar-hours { display: none; }
        }
        .con-hamburger {
          display: none;
          background: none; border: none; cursor: pointer;
          width: 28px; height: 28px;
          padding: 4px;
          position: relative;
          z-index: 100;
        }
        .con-ham-line,
        .con-ham-line::before,
        .con-ham-line::after {
          display: block;
          width: 100%; height: 2px;
          background: #1a1a1a;
          border-radius: 2px;
          transition: all 0.3s ease;
          position: absolute;
          left: 0;
        }
        .con-ham-line {
          top: 50%; transform: translateY(-50%);
        }
        .con-ham-line::before {
          content: '';
          top: -7px;
        }
        .con-ham-line::after {
          content: '';
          top: 7px;
        }
        .con-ham-line.con-ham-open {
          background: transparent;
        }
        .con-ham-line.con-ham-open::before {
          top: 0; transform: rotate(45deg);
        }
        .con-ham-line.con-ham-open::after {
          top: 0; transform: rotate(-45deg);
        }
        .con-mobile-link {
          font-size: 18px !important;
          font-weight: 600 !important;
          padding: 14px 0;
          border-bottom: 1px solid rgba(122,26,26,0.08);
          text-decoration: none;
          color: #1a1a1a !important;
        }
        .con-mobile-link.con-nav-active {
          color: ${GRANATE} !important;
        }
        .con-mobile-admin {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          padding: 14px 18px;
          height: auto;
          background: rgba(122,26,26,0.08);
          border: 1px solid rgba(122,26,26,0.15);
          color: #1a1a1a;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .con-mobile-admin:hover {
          background: rgba(122,26,26,0.15);
        }
        .con-scroll-link.con-nav-active {
          color: ${GRANATE} !important;
          font-weight: 600 !important;
        }
        .con-login-btn:hover {
          color: ${GRANATE};
          border-color: ${GRANATE};
          background: rgba(122,26,26,0.05);
        }
        @media (max-width: 768px) {
          .con-nav-desktop { display: none; }
          .con-hamburger { display: block; }
        }
      `}</style>
    </>
  );
}
