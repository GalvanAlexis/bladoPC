"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CATALOGO, getComplexityLabel, getComplexityColors } from '@/lib/services';

function ComplexityBadge({ level, order }: { level: string; order: number }) {
  const label = getComplexityLabel(level);
  const color = getComplexityColors(level);

  return (
    <span
      style={{
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '2px 10px',
        borderRadius: '999px',
        background: color.bg,
        color: color.text,
        border: `1px solid ${color.border}`,
      }}
    >
      #{order} - {label}
    </span>
  );
}

export default function ServiciosCatalogo() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="section-container" style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: 'var(--muted)',
          textDecoration: 'none',
          marginBottom: '24px',
          transition: 'color 0.2s ease',
        }}
        className="back-link"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Volver al inicio
      </Link>
      <div className="section-divider" />
      <p
        style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          fontWeight: 600,
          margin: '0 0 12px 0',
        }}
      >
        Catalogo de Servicios
      </p>
      <h1
        style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 700,
          color: 'var(--foreground)',
          margin: '0 0 16px 0',
        }}
      >
        Tipos de proyectos que desarrollo
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: 'var(--foreground-2)',
          maxWidth: '640px',
          lineHeight: 1.7,
          margin: '0 0 56px 0',
        }}
      >
        De una landing page simple a una plataforma SaaS completa. Cada proyecto se
        construye a medida segun la necesidad del cliente. Ordenados de menor a mayor complejidad.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {CATALOGO.map((svc) => {
          const isOpen = expandedId === svc.id;

          return (
            <motion.article
              key={svc.id}
              layout
              className="skill-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isOpen ? '12px' : '0',
                padding: 'clamp(16px, 2.5vw, 24px)',
                cursor: 'pointer',
              }}
              onClick={() => toggle(svc.id)}
              whileHover={{ scale: 1.005 }}
              transition={{ layout: { duration: 0.25, ease: 'easeInOut' } }}
            >
              {/* Header siempre visible */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--accent-dim)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {svc.icon}
                  </div>
                  <h2
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--foreground)',
                      margin: 0,
                    }}
                  >
                    {svc.title}
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ComplexityBadge level={svc.complexity} order={svc.order} />
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      color: 'var(--muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </div>
              </div>

              {/* Contenido expandible */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <p
                        style={{
                          fontSize: '14px',
                          lineHeight: 1.7,
                          color: 'var(--foreground-2)',
                          margin: 0,
                        }}
                      >
                        {svc.description}
                      </p>

                      {'examples' in svc && svc.examples && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px',
                            padding: '14px',
                            background: 'var(--surface-2)',
                            borderRadius: '8px',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          <p
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: 'var(--muted)',
                              margin: 0,
                            }}
                          >
                            Ejemplo web
                          </p>
                          {svc.examples.map((ex, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
                                {ex.title}
                              </p>
                              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--foreground-2)', margin: 0 }}>
                                {ex.desc}
                              </p>
                              <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--accent)', margin: '2px 0 0 0', fontStyle: 'italic' }}>
                                {ex.benefit}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'var(--muted)',
                            letterSpacing: '0.02em',
                          }}
                        >
                          Ideal para:
                        </span>
                        <span
                          className="tech-badge"
                          style={{ fontSize: '11px', padding: '2px 10px' }}
                        >
                          {svc.persona}
                        </span>
                      </div>

                      <Link
                        href={svc.ejemploSlug ? `/ejemplos/${svc.ejemploSlug}` : `/servicios/${svc.id}`}
                        className="btn-primary"
                        style={{
                          alignSelf: 'flex-start',
                          fontSize: '12px',
                          padding: '8px 18px',
                          textDecoration: 'none',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver ejemplo →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
