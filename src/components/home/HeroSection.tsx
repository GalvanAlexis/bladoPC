/**
 * HeroSection — ISS-049
 * Primera sección del home. Full viewport, impacto inmediato.
 * Nombre, alias, tagline, CTAs scroll-suave al asistente / habilidades.
 */
import React from 'react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Presentación"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Fondo: grid + glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-120px',
          right: '-80px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,5,0.9) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Contenido ── */}
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Label superior */}
        <p
          className="animate-fade-in"
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: '24px',
            animationDelay: '0.1s',
          }}
        >
          Full-Stack Developer · IA & Data Science · Chascomús, Argentina
        </p>

        {/* Nombre */}
        <h1
          className="animate-fade-in"
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--foreground)',
            margin: '0 0 4px',
            animationDelay: '0.15s',
          }}
        >
          Alexis Galván
        </h1>

        {/* Alias */}
        <p
          className="animate-fade-in"
          style={{
            fontSize: 'clamp(18px, 3vw, 36px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--accent)',
            margin: '0 0 32px',
            animationDelay: '0.2s',
          }}
        >
          Blado
        </p>

        {/* Tagline */}
        <p
          className="animate-fade-in"
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'var(--foreground-2)',
            maxWidth: '520px',
            lineHeight: 1.7,
            margin: '0 0 48px',
            animationDelay: '0.25s',
          }}
        >
          Construyo software que resuelve problemas reales. Co-fundador de{' '}
          <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>AIDO</span>.
          Estudiante de Ciencia de Datos e Ingeniería de Sistemas.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            animationDelay: '0.35s',
          }}
        >
          <a href="#assistant" className="btn-primary">
            Hablar con Blado
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 2v12M2 8l6 6 6-6" />
            </svg>
          </a>
          <a href="#skills" className="btn-secondary">
            Ver habilidades
          </a>
          <a href="#projects" className="btn-secondary">
            Proyectos
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="animate-fade-in"
          style={{
            marginTop: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--muted)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            animationDelay: '0.5s',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              animation: 'status-pulse 2s ease-in-out infinite',
            }}
          >
            ↓
          </span>
          Scroll para explorar
        </div>
      </div>
    </section>
  );
}
