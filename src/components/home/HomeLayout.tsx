"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import SkillsSection from '@/components/home/SkillsSection';
import RevealObserver from '@/components/home/RevealObserver';
import ScrollBackground from '@/components/home/ScrollBackground';
import CursorGlow from '@/components/home/CursorGlow';
import ReadingProgress from '@/components/home/ReadingProgress';
import ParallaxDecor from '@/components/home/ParallaxDecor';

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <RevealObserver />
      <ScrollBackground />
      <CursorGlow />
      <ReadingProgress />
      <ParallaxDecor />

      <Navbar
        onToggleSidebar={() => setSidebarOpen((p) => !p)}
        sidebarOpen={sidebarOpen}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        id="main-content"
        style={{
          paddingTop: '56px',
          overflowX: 'hidden',
        }}
      >
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <SkillsSection />

        <footer
          style={{
            borderTop: '1px solid var(--border)',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
            &copy; {new Date().getFullYear()} Alexis Galv&aacute;n &middot; Portfolio Blado &middot;{' '}
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
