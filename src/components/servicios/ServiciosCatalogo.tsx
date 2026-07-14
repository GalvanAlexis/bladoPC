"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CATALOGO, getComplexityLabel, getComplexityColors, type ServiceItem } from '@/lib/services';

/* ─── Filtros disponibles ─── */
type FilterKey = 'all' | 'simple' | 'media' | 'compleja';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',      label: 'Todos' },
  { key: 'simple',   label: 'Sencillo' },
  { key: 'media',    label: 'Medio' },
  { key: 'compleja', label: 'Complejo' },
];

/* Clase activa para cada filtro (color del badge correspondiente) */
const ACTIVE_CLASS: Record<FilterKey, string> = {
  all:      'active',
  simple:   'active-simple',
  media:    'active-media',
  compleja: 'active-compleja',
};

/* Colores del ::before accent-line según complejidad */
const ACCENT_LINE: Record<string, string> = {
  simple:   '#22c55e',
  media:    '#eab308',
  compleja: '#ef4444',
};

/* ─── Badge de complejidad ─── */
function ComplexityBadge({ level }: { level: string }) {
  const label = getComplexityLabel(level);
  const color = getComplexityColors(level);
  return (
    <span
      className="complexity-badge"
      style={{
        background: color.bg,
        color: color.text,
        border: `1px solid ${color.border}`,
      }}
    >
      {label}
    </span>
  );
}

/* ─── Modal de detalle ─── */
function ServicioModal({
  svc,
  onClose,
}: {
  svc: ServiceItem;
  onClose: () => void;
}) {
  /* Cerrar con ESC */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Bloquear scroll del body */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const hasEjemplo = Boolean(svc.ejemploUrl || svc.ejemploSlug);

  return (
    <div
      className="servicio-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle: ${svc.title}`}
    >
      <div
        className="servicio-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          className="servicio-modal-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', paddingRight: '40px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                #{svc.order} de {CATALOGO.length}
              </span>
              <ComplexityBadge level={svc.complexity} />
            </div>
            <h2
              style={{
                fontSize: 'clamp(18px, 3vw, 22px)',
                fontWeight: 700,
                color: 'var(--foreground)',
                margin: 0,
              }}
            >
              {svc.title}
            </h2>
          </div>
        </div>

        {/* Línea divisora */}
        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '20px' }} />

        {/* Descripción */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'var(--foreground-2)',
            margin: '0 0 20px 0',
          }}
        >
          {svc.description}
        </p>

        {/* Ejemplos */}
        {'examples' in svc && svc.examples && svc.examples.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              padding: '16px',
              background: 'var(--surface-2)',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px',
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
              Ejemplo real
            </p>
            {svc.examples.map((ex, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
                  {ex.title}
                </p>
                <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--foreground-2)', margin: 0 }}>
                  {ex.desc}
                </p>
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--accent)', margin: 0, fontStyle: 'italic' }}>
                  {ex.benefit}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Ideal para */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: hasEjemplo ? '24px' : '0' }}>
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)' }}>
            Ideal para:
          </span>
          <span className="tech-badge" style={{ fontSize: '11px', padding: '2px 10px' }}>
            {svc.persona}
          </span>
        </div>

        {/* CTA */}
        {hasEjemplo && (
          svc.ejemploUrl ? (
            <a
              href={svc.ejemploUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ alignSelf: 'flex-start', fontSize: '13px', padding: '10px 22px', textDecoration: 'none', display: 'inline-flex' }}
            >
              Ver ejemplo →
            </a>
          ) : (
            <Link
              href={svc.ejemploSlug ? `/ejemplos/${svc.ejemploSlug}` : `/servicios/${svc.id}`}
              className="btn-primary"
              style={{ alignSelf: 'flex-start', fontSize: '13px', padding: '10px 22px', textDecoration: 'none', display: 'inline-flex' }}
              onClick={onClose}
            >
              Ver ejemplo →
            </Link>
          )
        )}
      </div>
    </div>
  );
}

/* ─── Componente principal ─── */
export default function ServiciosCatalogo() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedSvc, setSelectedSvc] = useState<ServiceItem | null>(null);

  const filtered = activeFilter === 'all'
    ? CATALOGO
    : CATALOGO.filter((s) => s.complexity === activeFilter);

  const handleClose = useCallback(() => setSelectedSvc(null), []);

  return (
    <div
      className="section-container"
      style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}
    >
      {/* Volver */}
      <Link
        href="/"
        className="back-link"
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
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Volver al inicio
      </Link>

      <div className="section-divider" />

      {/* Eyebrow */}
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

      {/* Título */}
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

      {/* Subtítulo */}
      <p
        style={{
          fontSize: '16px',
          color: 'var(--foreground-2)',
          maxWidth: '640px',
          lineHeight: 1.7,
          margin: '0 0 40px 0',
        }}
      >
        De una landing page simple a una plataforma SaaS completa. Cada proyecto se
        construye a medida segun la necesidad del cliente.
      </p>

      {/* Filtros */}
      <div className="servicios-filters" role="group" aria-label="Filtrar por complejidad">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              id={`filter-${f.key}`}
              className={`servicios-filter-btn ${isActive ? ACTIVE_CLASS[f.key] : ''}`}
              onClick={() => setActiveFilter(f.key)}
              aria-pressed={isActive}
            >
              {f.label}
              {f.key !== 'all' && (
                <span style={{ marginLeft: '4px', opacity: 0.7 }}>
                  ({CATALOGO.filter((s) => s.complexity === f.key).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid de cards */}
      <div className="servicios-grid">
        {filtered.map((svc, idx) => {
          const accentLine = ACCENT_LINE[svc.complexity] ?? 'var(--accent)';
          return (
            <article
              key={svc.id}
              id={`card-${svc.id}`}
              className="servicio-card"
              data-complexity={svc.complexity}
              onClick={() => setSelectedSvc(svc)}
              role="button"
              tabIndex={0}
              aria-label={`${svc.title} — ver detalle`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedSvc(svc); }}
              style={{
                '--card-delay': `${idx * 60}ms`,
                '--card-accent-color': accentLine,
              } as React.CSSProperties}
            >
              {/* Header: ícono + número */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div className="servicio-card-icon">
                  {svc.icon}
                </div>
                <ComplexityBadge level={svc.complexity} />
              </div>

              {/* Título */}
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {svc.title}
              </h2>

              {/* Descripción truncada */}
              <p className="servicio-card-desc">
                {svc.description}
              </p>

              {/* CTA reveal on hover */}
              <span className="servicio-card-cta" aria-hidden="true">
                Ver detalle
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </span>
            </article>
          );
        })}
      </div>

      {/* Modal */}
      {selectedSvc && (
        <ServicioModal svc={selectedSvc} onClose={handleClose} />
      )}
    </div>
  );
}
