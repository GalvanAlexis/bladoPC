"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '@/components/home/hooks/useMousePosition';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progressX, progressY, isWithin } = useMousePosition(containerRef);
  const [showDialog, setShowDialog] = useState(false);

  const rotateX = isWithin ? (progressY - 0.5) * -8 : 0;
  const rotateY = isWithin ? (progressX - 0.5) * 8 : 0;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] } },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Presentaci\u00f3n"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-parallax"
        style={{
          position: 'absolute',
          top: '-20%',
          left: 0,
          width: '100%',
          height: '140%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        <source src="/video/bad-day.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Tilt container */}
      <motion.div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 2,
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            Soporte IT &middot; Soluciones Digitales &middot; Ciencia de Datos
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(40px, 7vw, 88px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--foreground)',
              margin: '0 0 16px',
              textWrap: 'balance',
            }}
          >
            &iquest;La PC no anda bien?{' '}
            <br className="hidden sm:block" />
            <span style={{ color: 'var(--foreground-2)' }}>
              &iquest;Cansado de tareas repetitivas?
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: 'var(--foreground-2)',
              maxWidth: '640px',
              lineHeight: 1.5,
              margin: '0 0 48px',
              textWrap: 'pretty',
            }}
          >
            Contact&aacute; con Blado para una soluci&oacute;n{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
              sin vueltas
            </span>
            . Dej&aacute; de pelear con la tecnolog&iacute;a y empezá a aprovecharla.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <Link href="/servicios" className="btn-primary">
              Ver servicios
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 2v12M2 8l6 6 6-6" />
              </svg>
            </Link>
            <button
              onClick={() => setShowDialog(true)}
              className="btn-secondary"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Contacto r&aacute;pido
            </button>
            <Link href="/chat" className="btn-secondary" style={{ textDecoration: 'none' }}>
              Hablar con Blado
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Morph Dialog */}
      <AnimatePresence>
        {showDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowDialog(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 100,
              }}
            />
            <div
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 101,
                padding: '20px',
                pointerEvents: 'none',
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderTop: '2px solid var(--accent)',
                  borderRadius: '14px',
                  padding: '32px',
                  width: '100%',
                  maxWidth: '400px',
                  pointerEvents: 'auto',
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setShowDialog(false)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    padding: '8px',
                    fontSize: '14px',
                    lineHeight: 1,
                    borderRadius: '4px',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
                >
                  {'\u2715'}
                </button>

                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--foreground)', margin: '0 0 20px' }}>
                  Contacto r&aacute;pido
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a
                    href="https://wa.me/5492241567142"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      color: 'var(--foreground)',
                      fontWeight: 500,
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}
                  >
                    <span style={{ fontSize: '20px'}}>{'\uD83D\uDCF1'}</span>
                    WhatsApp
                    <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--muted)' }}>2241 567142</span>
                  </a>

                  <Link
                    href="/chat"
                    onClick={() => setShowDialog(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      color: 'var(--foreground)',
                      fontWeight: 500,
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}
                  >
                    <span style={{ fontSize: '20px'}}>{'\uD83E\uDD16'}</span>
                    Blado (Chat IA)
                  </Link>

                  <a
                    href="mailto:alexis.galvan@example.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      color: 'var(--foreground)',
                      fontWeight: 500,
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}
                  >
                    <span style={{ fontSize: '20px'}}>{'\u2709\uFE0F'}</span>
                    Email
                  </a>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
