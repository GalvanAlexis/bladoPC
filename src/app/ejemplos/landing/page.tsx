'use client';

import Nav from './components/Nav';
import Hero from './components/Hero';
import Beneficios from './components/Beneficios';
import Ingredientes from './components/Ingredientes';
import Testimonios from './components/Testimonios';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ParallaxDecor from './components/ParallaxDecor';
import ScrollBackground from './components/ScrollBackground';

const COLORS = {
  primary: '#b87676',
  primaryDark: '#9a5f5f',
  primaryLight: '#d49494',
  bg: '#fdf8f5',
  bgDark: '#1a1414',
  text: '#2d2323',
  textDark: '#f0e8e5',
  muted: '#6a5a5a',
  mutedDark: '#a09090',
  section1: '#f5e6e6',
  section1Dark: '#2a1e1e',
  section2: '#f0dede',
  section2Dark: '#251818',
  section3: '#faf3f0',
  section3Dark: '#1f1616',
};

export default function LuminaPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `{
  const t = localStorage.getItem('lum-theme');
  if (t === 'dark') document.documentElement.classList.add('lum-dark');
}`,
        }}
      />

      <style>{`
        :root {
          --lum-primary: ${COLORS.primary};
          --lum-primary-dark: ${COLORS.primaryDark};
          --lum-primary-light: ${COLORS.primaryLight};
          --lum-bg: ${COLORS.bg};
          --lum-text: ${COLORS.text};
          --lum-muted: ${COLORS.muted};
          --lum-section-1: ${COLORS.section1};
          --lum-section-2: ${COLORS.section2};
          --lum-section-3: ${COLORS.section3};
          color-scheme: light dark;
        }
        .lum-dark {
          --lum-primary: #d49494;
          --lum-primary-dark: #b87676;
          --lum-primary-light: #e0b0b0;
          --lum-bg: ${COLORS.bgDark};
          --lum-text: ${COLORS.textDark};
          --lum-muted: ${COLORS.mutedDark};
          --lum-section-1: ${COLORS.section1Dark};
          --lum-section-2: ${COLORS.section2Dark};
          --lum-section-3: ${COLORS.section3Dark};
          color-scheme: dark;
        }
        .lum-dark .lum-logo,
        .lum-dark .lum-hero-title,
        .lum-dark .lum-section-title,
        .lum-dark .lum-card-title,
        .lum-dark .lum-ing-name,
        .lum-dark .lum-testimonial-name,
        .lum-dark .lum-price,
        .lum-dark .lum-dialog-title {
          color: var(--lum-text);
        }
        .lum-dark .lum-nav {
          background: rgba(26,20,20,0.95);
          border-bottom-color: rgba(212,148,148,0.12);
        }
        .lum-dark .lum-back-link { color: #a09090; }
        .lum-dark .lum-scroll-link { color: #a09090; }
        .lum-dark .lum-scroll-link.lum-nav-active { color: var(--lum-primary); }
        .lum-dark .lum-card,
        .lum-dark .lum-ing-card {
          background: #221a1a;
          border-color: rgba(212,148,148,0.08);
        }
        .lum-dark .lum-testimonial-card {
          background: linear-gradient(135deg, #221a1a 0%, #2a1e1e 100%);
        }
        .lum-dark .lum-dark-btn {
          background: rgba(212,148,148,0.15);
          color: var(--lum-primary);
        }
        .lum-dark .lum-dialog {
          background: #1a1414;
          color: var(--lum-text);
        }
        .lum-dark .lum-popover {
          background: #221a1a;
          color: var(--lum-text);
        }
        .lum-dark .lum-dialog-badge {
          background: rgba(212,148,148,0.15);
          color: var(--lum-primary);
        }

        .lum-dark-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(184,118,118,0.15);
          background: rgba(184,118,118,0.08);
          color: var(--lum-primary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .lum-dark-btn:hover {
          background: rgba(184,118,118,0.2);
        }

        .lum-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(253,248,245,0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(184,118,118,0.12);
        }
        .lum-nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .lum-nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .lum-back-link {
          font-size: 12px;
          color: #a09393;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s;
        }
        .lum-back-link:hover { color: var(--lum-primary); }
        .lum-logo {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--lum-primary);
        }
        .lum-nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 13px;
          font-weight: 500;
        }
        .lum-scroll-link {
          color: #6a5a5a;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .lum-scroll-link:hover,
        .lum-scroll-link.lum-nav-active { color: var(--lum-primary); }

        .lum-section {
          padding: clamp(60px, 10vh, 100px) 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lum-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .lum-section-title {
          text-align: center;
          font-size: clamp(22px, 3.5vw, 34px);
          font-weight: 700;
          margin: 0 0 12px 0;
          color: var(--lum-text);
        }
        .lum-section-sub {
          text-align: center;
          font-size: 14px;
          color: var(--lum-muted);
          margin: 0 0 48px 0;
          max-width: 500px;
          margin-inline: auto;
        }
        .lum-accent { color: var(--lum-primary); }

        .lum-fullpage {
          min-height: 100vh;
          background: var(--lum-bg);
          color: var(--lum-text);
          font-family: var(--font-sans);
          line-height: 1.6;
        }

        .lum-hero {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          padding: 100px 24px 80px;
          max-width: 1100px;
          margin: 0 auto;
          gap: clamp(32px, 6vw, 80px);
          position: relative;
          flex-wrap: wrap;
        }
        .lum-hero-divider {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          border-radius: 3px;
          background: linear-gradient(90deg, transparent, var(--lum-primary), transparent);
        }
        .lum-hero-content { flex: 1 1 45%; min-width: 280px; }
        .lum-hero-visual { flex: 1 1 45%; min-width: 260px; display: flex; align-items: center; justify-content: center; position: relative; }
        .lum-hero-glow {
          position: absolute;
          width: clamp(240px, 30vw, 380px);
          height: clamp(240px, 30vw, 380px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(184,118,118,0.10) 0%, rgba(184,118,118,0.03) 60%, transparent 70%);
          z-index: 0;
        }

        .lum-badge {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--lum-primary);
          font-weight: 700;
          margin: 0 0 16px 0;
          display: inline-block;
          padding: 6px 16px;
          border-radius: 50px;
          background: rgba(184,118,118,0.08);
          border: 1px solid rgba(184,118,118,0.15);
        }
        .lum-hero-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 18px 0;
          color: var(--lum-text);
        }
        .lum-hero-desc {
          font-size: 16px;
          line-height: 1.7;
          color: var(--lum-muted);
          margin: 0 0 24px 0;
          max-width: 440px;
        }
        .lum-hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .lum-price {
          font-size: 28px;
          font-weight: 700;
          color: var(--lum-text);
        }
        .lum-hero-footnote {
          font-size: 12px;
          color: #a09393;
          margin: 16px 0 0 0;
        }
        .lum-btn {
          display: inline-block;
          padding: 15px 40px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.03em;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .lum-btn-primary {
          background: linear-gradient(135deg, var(--lum-primary) 0%, var(--lum-primary-dark) 100%);
          color: #fff;
          box-shadow: 0 4px 16px rgba(184,118,118,0.35);
        }
        .lum-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(184,118,118,0.45);
        }

        .lum-beneficios { background: var(--lum-section-1); max-width: none; }
        .lum-beneficios .lum-container { max-width: 1100px; margin: 0 auto; }
        .lum-card-grid {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .lum-card {
          flex: 1 1 260px;
          padding: 0;
          border-radius: 20px;
          background: var(--lum-bg);
          box-shadow: 0 4px 20px rgba(184,118,118,0.10), 0 1px 3px rgba(0,0,0,0.04);
          border: 1px solid rgba(184,118,118,0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lum-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(184,118,118,0.18), 0 2px 6px rgba(0,0,0,0.06);
        }
        .lum-card-btn {
          all: unset;
          display: block;
          width: 100%;
          text-align: center;
          padding: 40px 24px 36px;
          cursor: pointer;
          box-sizing: border-box;
        }
        .lum-card-icon {
          font-size: 40px;
          margin-bottom: 18px;
          line-height: 1;
        }
        .lum-card-title {
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: var(--lum-text);
        }
        .lum-card-desc {
          font-size: 13px;
          line-height: 1.7;
          color: var(--lum-muted);
          margin: 0;
        }

        .lum-ingredientes { background: var(--lum-section-3); max-width: none; }
        .lum-ingredientes .lum-container { max-width: 1100px; margin: 0 auto; }
        .lum-ing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }
        .lum-ing-card {
          padding: 0;
          border-radius: 14px;
          border: 1px solid rgba(184,118,118,0.08);
          background: var(--lum-bg);
          box-shadow: 0 2px 12px rgba(184,118,118,0.06);
          border-left: 3px solid var(--lum-primary);
          transition: transform 0.2s;
        }
        .lum-ing-card:hover {
          transform: translateY(-2px);
        }
        .lum-ing-btn {
          all: unset;
          display: block;
          width: 100%;
          padding: 24px 20px 20px;
          cursor: pointer;
          box-sizing: border-box;
        }
        .lum-ing-name {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--lum-text);
        }
        .lum-ing-desc {
          font-size: 12px;
          color: var(--lum-muted);
          margin: 0;
          line-height: 1.6;
        }

        .lum-testimonios { background: var(--lum-section-2); max-width: none; }
        .lum-testimonios .lum-container { max-width: 1100px; margin: 0 auto; }
        .lum-testimonial-card {
          padding: 32px 24px 28px;
          background: linear-gradient(135deg, var(--lum-bg) 0%, #faf0f0 100%);
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .lum-dark .lum-testimonial-card {
          background: linear-gradient(135deg, #221a1a 0%, #2a1e1e 100%);
        }
        .lum-testimonial-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .lum-testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--lum-primary);
          flex-shrink: 0;
        }
        .lum-avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lum-stars { font-size: 12px; color: #d4a84b; letter-spacing: 0.02em; }
        .lum-testimonial-name { font-size: 12px; font-weight: 700; color: var(--lum-text); }
        .lum-testimonial-text {
          font-size: 13px;
          line-height: 1.8;
          color: var(--lum-muted);
          margin: 0;
          flex: 1;
          font-style: italic;
        }

        .lum-newsletter { max-width: none; }
        .lum-newsletter .lum-container { max-width: 1100px; margin: 0 auto; }
        .lum-newsletter-box {
          background: linear-gradient(135deg, var(--lum-primary) 0%, var(--lum-primary-dark) 100%);
          border-radius: 20px;
          padding: clamp(40px, 6vw, 64px);
          text-align: center;
          color: #fff;
        }
        .lum-newsletter-title {
          font-size: clamp(20px, 3vw, 30px);
          font-weight: 700;
          margin: 0 0 10px 0;
          color: #fff;
        }
        .lum-newsletter-desc {
          font-size: 14px;
          opacity: 0.85;
          margin: 0 0 28px 0;
          max-width: 420px;
          margin-inline: auto;
        }
        .lum-newsletter-form {
          display: flex;
          gap: 10px;
          max-width: 440px;
          margin: 0 auto;
          flex-wrap: wrap;
          justify-content: center;
        }
        .lum-newsletter-input {
          flex: 1 1 220px;
          padding: 14px 20px;
          border-radius: 50px;
          border: none;
          font-size: 14px;
          background: rgba(255,255,255,0.15);
          color: #fff;
          outline: none;
        }
        .lum-newsletter-input::placeholder { color: rgba(255,255,255,0.6); }
        .lum-newsletter-btn {
          padding: 14px 32px;
          border-radius: 50px;
          border: none;
          background: #fff;
          color: var(--lum-primary);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .lum-newsletter-btn:hover { transform: scale(1.03); }
        .lum-newsletter-footnote {
          font-size: 11px;
          opacity: 0.6;
          margin: 14px 0 0 0;
        }

        .lum-footer {
          border-top: 1px solid rgba(184,118,118,0.1);
          padding: 48px 24px 40px;
          text-align: center;
          background: var(--lum-section-3);
        }
        .lum-footer-logo {
          display: block;
          margin-bottom: 16px;
        }
        .lum-footer-tagline {
          font-size: 13px;
          color: var(--lum-muted);
          margin: 0 0 16px 0;
          max-width: 300px;
          margin-inline: auto;
        }
        .lum-footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 12px;
          color: var(--lum-primary);
          font-weight: 600;
        }
        .lum-footer-link {
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .lum-footer-link:hover { opacity: 0.7; }
        .lum-footer-divider {
          width: 32px;
          height: 2px;
          background: rgba(184,118,118,0.15);
          margin: 20px auto;
          border-radius: 2px;
        }
        .lum-footer-copy {
          font-size: 11px;
          color: #a09393;
          margin: 0;
        }

        .lum-dialog {
          padding: 0;
          border: none;
          border-radius: 24px;
          max-width: 680px;
          width: min(92vw, 680px);
          background: #fff;
          color: var(--lum-text);
          box-shadow: 0 40px 80px rgba(0,0,0,0.25);
          overflow: visible;
        }
        .lum-dialog::backdrop {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
        }
        .lum-dialog-form { margin: 0; }
        .lum-dialog-close {
          position: absolute;
          top: 16px;
          right: 20px;
          background: none;
          border: none;
          font-size: 28px;
          color: var(--lum-muted);
          cursor: pointer;
          z-index: 2;
          line-height: 1;
        }
        .lum-dialog-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        @media (max-width: 600px) {
          .lum-dialog-grid { grid-template-columns: 1fr; }
        }
        .lum-dialog-img-wrap {
          border-radius: 24px 0 0 24px;
          overflow: hidden;
          height: 100%;
          min-height: 300px;
        }
        @media (max-width: 600px) {
          .lum-dialog-img-wrap { border-radius: 24px 24px 0 0; min-height: 200px; }
        }
        .lum-dialog-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lum-dialog-info {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .lum-dialog-title {
          font-size: 22px;
          font-weight: 700;
          margin: 0;
        }
        .lum-dialog-desc {
          font-size: 13px;
          line-height: 1.7;
          color: var(--lum-muted);
          margin: 0;
        }
        .lum-dialog-benefits {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .lum-dialog-badge {
          font-size: 11px;
          padding: 4px 12px;
          border-radius: 50px;
          background: rgba(184,118,118,0.1);
          color: var(--lum-primary);
          font-weight: 600;
        }
        .lum-dialog-price {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
        .lum-dialog-qty-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--lum-muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lum-dialog-qty {
          width: 60px;
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid rgba(184,118,118,0.2);
          font-size: 14px;
          text-align: center;
        }
        .lum-dialog-cta {
          margin-top: auto;
          text-align: center;
        }

        .lum-popover {
          padding: 20px 24px;
          border: none;
          border-radius: 16px;
          max-width: 320px;
          background: #fff;
          color: var(--lum-text);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          border: 1px solid rgba(184,118,118,0.1);
        }
        .lum-popover::backdrop {
          background: rgba(0,0,0,0.2);
        }
        .lum-popover-close {
          float: right;
          background: none;
          border: none;
          font-size: 20px;
          color: var(--lum-muted);
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .lum-popover-title {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 10px 0;
        }
        .lum-popover-text {
          font-size: 13px;
          line-height: 1.7;
          color: var(--lum-muted);
          margin: 0;
        }

        #lum-toast {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          padding: 14px 28px;
          border-radius: 50px;
          background: #2d2323;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          border: none;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          z-index: 200;
        }
        .lum-dark #lum-toast {
          background: #f0e8e5;
          color: #1a1414;
        }
      `}</style>

      <div className="lum-fullpage">
        <CursorGlow />
        <ParallaxDecor />
        <ScrollBackground />
        <div className="lum-progress" />
        <Nav />
        <Hero />
        <Beneficios />
        <Ingredientes />
        <Testimonios />
        <Newsletter />
        <Footer />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `{
  var btn = document.getElementById('lum-dark-toggle');
  if (btn) {
    btn.addEventListener('click', function() {
      document.documentElement.classList.toggle('lum-dark');
      var isDark = document.documentElement.classList.contains('lum-dark');
      try { localStorage.setItem('lum-theme', isDark ? 'dark' : 'light'); } catch(e) {}
      var meta = document.querySelector('meta[name="color-scheme"]');
      if (meta) meta.content = isDark ? 'dark' : 'light dark';
    });
  }
}`,
        }}
      />
    </>
  );
}
