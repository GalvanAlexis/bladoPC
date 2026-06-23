"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '@/components/home/hooks/useMousePosition';

const QUESTIONS = [
  "La PC no anda bien?",
  "Cansado de tareas repetitivas?",
  "Gestionas todo a mano?",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progressX, progressY, isWithin } = useMousePosition(containerRef);
  const [showDialog, setShowDialog] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const rotateX = isWithin ? (progressY - 0.5) * -8 : 0;
  const rotateY = isWithin ? (progressX - 0.5) * 8 : 0;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setQuestionIndex((prev) => (prev + 1) % QUESTIONS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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
          background: 'var(--hero-overlay-bg)',
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
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--foreground)',
              margin: '0 0 8px',
              textWrap: 'balance',
              minHeight: '1.4em',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={questionIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ display: 'inline-block' }}
              >
                {QUESTIONS[questionIndex]}
              </motion.span>
            </AnimatePresence>
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
              justifyContent: 'center',
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
              className="btn-whatsapp"
              style={{ cursor: 'pointer' }}
            >
              Hablar con Blado
            </button>
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
                background: 'var(--overlay-bg-light)',
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
                  Contactar con Blado
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a
                    href="https://wa.me/5492241567142"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-1.102-1.083-1.847-2.37-2.063-2.77-.217-.4-.023-.617.163-.817.167-.18.371-.373.557-.563.186-.19.248-.32.372-.532.124-.212.062-.398-.031-.557-.093-.16-.671-1.618-.919-2.215-.242-.58-.488-.5-.671-.51-.173-.008-.372-.01-.57-.01-.199 0-.521.074-.794.372-.273.297-1.045 1.02-1.045 2.488 0 1.468 1.067 2.886 1.217 3.085.15.2 2.095 3.2 5.076 4.487.708.306 1.261.488 1.693.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                    WhatsApp
                  </a>

                  <Link
                    href="/chat"
                    onClick={() => setShowDialog(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=alexisvladimirgalvan@gmail.com&su=bladoPC"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#EA4335" aria-hidden="true">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.691 2.28 24 3.434 24 5.457z"/>
                  </svg>
                    Gmail
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
