'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  WEBAPP_EJEMPLOS,
  WEBAPP_CATEGORIES,
  CAPABILITY_LABELS,
  RUBRO_GUIDE,
  PWA_VS_WEBAPP,
  type WebAppCategory,
} from '@/lib/webapp-ejemplos';

const S = {
  section: { minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-sans)' },
  container: { paddingTop: 'clamp(100px, 15vh, 160px)', paddingBottom: 'clamp(80px, 12vh, 140px)' },
  back: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px' },
  tag: { fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '4px 12px', borderRadius: '999px', background: 'rgba(236,72,153,0.1)', color: '#f472b6', border: '1px solid rgba(236,72,153,0.2)', display: 'inline-block', marginBottom: '16px' },
  h1: { fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, margin: '0 0 16px 0', lineHeight: 1.15, letterSpacing: '-0.02em' },
  desc: { fontSize: '16px', lineHeight: 1.7, color: 'var(--foreground-2)', maxWidth: '680px', margin: '0 0 0 0' },
  sectionTitle: { fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, margin: '0 0 8px 0' },
  sectionSub: { fontSize: '14px', color: 'var(--muted)', margin: '0 0 28px 0', maxWidth: '500px' },
  filterRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '32px' },
  pill: (active: boolean) => ({
    padding: '8px 18px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: active ? 600 : 500,
    border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? 'var(--background)' : 'var(--foreground-2)',
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '80px' },
  card: { borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' },
  cardIcon: { width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(236,72,153,0.1)', color: '#f472b6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  cardTitle: { fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' },
  cardDesc: { fontSize: '13px', lineHeight: 1.5, color: 'var(--foreground-2)', margin: 0 },
  capBadge: { fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', background: 'rgba(236,72,153,0.06)', color: 'var(--muted-light)', border: '1px solid var(--border)' },
  expandedText: { fontSize: '13px', lineHeight: 1.6, color: 'var(--foreground-2)', margin: 0 },
  table: { width: '100%', borderCollapse: 'collapse' as const, borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '80px' },
  th: { background: 'var(--surface)', padding: '14px 18px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: 'var(--muted)', textAlign: 'left' as const, borderBottom: '1px solid var(--border)' },
  td: { padding: '14px 18px', fontSize: '13px', borderBottom: '1px solid var(--border)', color: 'var(--foreground)', verticalAlign: 'top' as const },
};

export default function WebAppPage() {
  const [activeCategory, setActiveCategory] = useState<WebAppCategory | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? WEBAPP_EJEMPLOS
    : WEBAPP_EJEMPLOS.filter((e) => e.category === activeCategory);

  return (
    <div style={S.section}>
      <div className="section-container" style={S.container}>
        <Link href="/servicios/webapp" style={S.back}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 12L6 8l4-4" /></svg>
          Volver al servicio
        </Link>

        <div className="section-divider" />

        <div style={S.tag}>Web App Interactiva</div>
        <h1 style={S.h1}>Herramientas web potentes<br />en tiempo real</h1>
        <p style={S.desc}>
          Una Web App Interactiva es una aplicacion que corre en el navegador pero se comporta como
          un programa de escritorio: permite crear, editar, colaborar y visualizar datos en vivo.
          A diferencia de una pagina web tradicional, el usuario no solo lee, sino que hace cosas.
        </p>

        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', flexWrap: 'wrap', marginTop: '40px', marginBottom: '64px' }}>
          {[
            { num: 'Tiempo real', label: 'WebSockets, cambios al instante' },
            { num: 'Colaborativo', label: 'Multiples usuarios simultaneos' },
            { num: 'Sin instalar', label: 'Solo un navegador, cero setup' },
            { num: 'En la nube', label: 'Siempre actualizado, siempre disponible' },
          ].map((s) => (
            <div key={s.num} style={{ flex: '1 1 140px', padding: '20px 24px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: '6px' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={S.sectionTitle}>Diferencia entre Web App Interactiva y PWA</h2>
        <p style={S.sectionSub}>Dos conceptos distintos, ambos potentes. La clave esta en el enfoque.</p>

        <div style={{ overflowX: 'auto', marginBottom: '80px' }}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Aspecto</th>
                <th style={{ ...S.th, color: '#f472b6' }}>Web App Interactiva</th>
                <th style={{ ...S.th, color: '#818cf8' }}>PWA</th>
              </tr>
            </thead>
            <tbody>
              {PWA_VS_WEBAPP.map((row) => (
                <tr key={row.aspect}>
                  <td style={{ ...S.td, fontWeight: 600 }}>{row.aspect}</td>
                  <td style={S.td}>{row.webapp}</td>
                  <td style={S.td}>{row.pwa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={S.sectionTitle}>10 ideas de Web Apps para tu negocio</h2>
        <p style={S.sectionSub}>Cada una demuestra capacidades distintas. Hace clic para ver el detalle completo.</p>

        <div style={S.filterRow}>
          <button onClick={() => setActiveCategory('all')} style={S.pill(activeCategory === 'all')}>Todas</button>
          {WEBAPP_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={S.pill(activeCategory === cat.id)}>{cat.label}</button>
          ))}
        </div>

        <div style={S.grid}>
          {filtered.map((ej) => {
            const isExpanded = expandedId === ej.id;
            return (
              <div key={ej.id} style={S.card} onClick={() => setExpandedId(isExpanded ? null : ej.id)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '20px' }}>
                  <div style={S.cardIcon}>{ej.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={S.cardTitle}>{ej.title}</h3>
                    <p style={S.cardDesc}>{ej.description}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '0 20px 20px 20px' }}>
                  {ej.capabilities.map((cap) => (
                    <span key={cap} style={S.capBadge}>{CAPABILITY_LABELS[cap] || cap}</span>
                  ))}
                </div>
                {isExpanded && (
                  <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <p style={S.expandedText}>{ej.longDescription}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h2 style={S.sectionTitle}>Cual Web App es ideal para tu rubro?</h2>
        <p style={S.sectionSub}>Guia rapida segun el tipo de negocio.</p>

        <div style={{ overflowX: 'auto', marginBottom: '80px' }}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Rubro</th>
                <th style={S.th}>Web App ideal</th>
                <th style={S.th}>Por que</th>
              </tr>
            </thead>
            <tbody>
              {RUBRO_GUIDE.map((row) => (
                <tr key={row.rubro}>
                  <td style={S.td}>{row.rubro}</td>
                  <td style={{ ...S.td, fontWeight: 500 }}>{row.ideal}</td>
                  <td style={{ ...S.td, color: 'var(--foreground-2)' }}>{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: 'clamp(28px, 4vw, 40px)', textAlign: 'center', background: 'var(--surface)' }}>
          <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 700, margin: '0 0 10px 0' }}>Arranquemos tu Web App</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 0 24px 0', maxWidth: '440px', marginInline: 'auto' }}>
            Contame que tipo de herramienta necesitas y te armo una propuesta sin compromiso.
          </p>
          <a href="https://wa.me/5492241567142" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '10px', background: 'var(--accent)', color: 'var(--background)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escribime por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
