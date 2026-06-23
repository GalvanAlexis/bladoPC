'use client';

import { useEffect, useRef } from 'react';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Ingredientes', href: '#ingredientes' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#newsletter' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

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

  return (
    <nav ref={navRef} className="lum-nav">
      <div className="lum-nav-inner">
        <div className="lum-nav-left">
          <a href="/servicios" className="lum-back-link">&larr; Servicios</a>
          <span className="lum-logo">Lumina</span>
        </div>
        <div className="lum-nav-right">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="lum-scroll-link">{item.label}</a>
          ))}
          <button id="lum-dark-toggle" className="lum-dark-btn" aria-label="Alternar modo oscuro">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
