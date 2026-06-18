"use client";

/**
 * HomeLayout — ISS-049
 * Layout scrollable del home. Ordena las secciones narrativas del portfolio.
 * La Navbar y el Sidebar viven aquí.
 */
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import SkillsSection from '@/components/home/SkillsSection';
import RevealObserver from '@/components/home/RevealObserver';

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <RevealObserver />
      {/* Navbar fija */}
      <Navbar
        onToggleSidebar={() => setSidebarOpen((p) => !p)}
        sidebarOpen={sidebarOpen}
      />

      {/* Sidebar overlay */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Scroll container — padding-top para compensar navbar fija (56px) */}
      <main
        id="main-content"
        style={{
          paddingTop: '56px', /* h-14 navbar */
          overflowX: 'hidden',
        }}
      >
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <SkillsSection />

        {/* Footer mínimo */}
        <footer
          style={{
            borderTop: '1px solid var(--border)',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Alexis Galván · Portfolio Blado ·{' '}
            <a
              href="https://github.com/GalvanAlexis/bladoPC"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'none' }}
            >
              GitHub ↗
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
