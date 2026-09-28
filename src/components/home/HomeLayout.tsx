import React, { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/home/HeroSection';
import ContactSection from '@/components/home/ContactSection';
import FAQSection from '@/components/home/FAQSection';

import RevealObserver from '@/components/home/RevealObserver';
import ReadingProgress from '@/components/home/ReadingProgress';

const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'));
const AboutSection = dynamic(() => import('@/components/home/AboutSection'));
const SkillsSection = dynamic(() => import('@/components/home/SkillsSection'));

const ScrollBackground = dynamic(() => import('@/components/home/ScrollBackground'));
const CursorGlow = dynamic(() => import('@/components/home/CursorGlow'));
const ParallaxDecor = dynamic(() => import('@/components/home/ParallaxDecor'));

export default function HomeLayout() {
  return (
    <>
      {/* Skip-to-content link para accesibilidad */}
      <a
        href="#main-content"
        className="fixed left-1/2 -translate-x-1/2 -top-[100%] focus:top-0 z-[9999] px-6 py-3 bg-[var(--accent)] text-white font-semibold text-sm rounded-b-lg no-underline transition-[top] duration-200"
      >
        Saltar al contenido principal
      </a>

      <RevealObserver />
      <ScrollBackground />
      <CursorGlow />
      <ReadingProgress />
      <ParallaxDecor />

      <Navbar />

      <Sidebar />



      <main
        id="main-content"
        role="main"
        style={{
          paddingTop: '56px',
          overflowX: 'hidden',
        }}
      >
        <HeroSection />
        
        <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
          <ServicesSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
          <SkillsSection />
        </Suspense>

        <FAQSection />
        <ContactSection />

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
