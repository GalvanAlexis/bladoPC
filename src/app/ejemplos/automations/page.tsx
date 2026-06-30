'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AUTOMATION_EJEMPLOS } from '@/lib/automations-data';

const S = {
  section: { minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-sans)' },
  container: { paddingTop: 'clamp(100px, 15vh, 160px)', paddingBottom: 'clamp(80px, 12vh, 140px)' },
  back: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px' },
  tag: { fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '4px 12px', borderRadius: '999px', background: 'rgba(236,72,153,0.1)', color: '#f472b6', border: '1px solid rgba(236,72,153,0.2)', display: 'inline-block', marginBottom: '16px' },
  h1: { fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.15, letterSpacing: '-0.02em' },
  desc: { fontSize: '16px', lineHeight: 1.7, color: 'var(--foreground-2)', maxWidth: '680px', margin: '0 0 0 0' },
  sectionTitle: { fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, margin: '0 0 8px 0' },
  sectionSub: { fontSize: '14px', color: 'var(--muted)', margin: '0 0 28px 0', maxWidth: '500px' },
  card: { borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 24px' },
  cardIcon: { width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(236,72,153,0.1)', color: '#f472b6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  cardTitle: { fontSize: '16px', fontWeight: 600, margin: '0 0 2px 0' },
  cardDesc: { fontSize: '13px', lineHeight: 1.5, color: 'var(--foreground-2)', margin: 0 },
  expanded: { padding: '0 24px 24px', display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  benefitBox: { borderRadius: '10px', padding: '16px 20px', border: '1px solid rgba(34,197,94,0.15)', background: 'rgba(34,197,94,0.06)' },
  benefitLabel: { fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: '#22c55e', marginBottom: '4px' },
  benefitText: { fontSize: '13px', lineHeight: 1.6, color: 'var(--foreground)', margin: 0 },
  featureList: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  featureItem: { display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', lineHeight: 1.5, color: 'var(--foreground-2)' },
  techRow: { display: 'flex', gap: '6px', flexWrap: 'wrap' as const },
  techBadge: { fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', background: 'rgba(236,72,153,0.06)', color: 'var(--muted-light)', border: '1px solid var(--border)' },
  ctaBox: { border: '1px solid var(--border)', borderRadius: '14px', padding: 'clamp(28px, 4vw, 40px)', textAlign: 'center' as const, background: 'var(--surface)', marginTop: '64px' },
};

const ACCENT = '#f472b6';

export default function AutomationsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <div style={S.section}>
      <div className="section-container" style={S.container}>
        <Link href="/servicios/automations" style={S.back}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 12L6 8l4-4" /></svg>
          Volver al servicio
        </Link>

        <div className="section-divider" />

        <div style={S.tag}>Automatizaciones / Bots con IA</div>
        <h1 style={S.h1}>Ejemplos de automatizaciones</h1>
        <p style={S.desc}>
          Cada ejemplo incluye el problema que resuelve, el beneficio concreto para tu negocio
          y las tecnologias que lo hacen posible. Hace clic para ver el detalle completo.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '48px', marginBottom: '80px' }}>
          {AUTOMATION_EJEMPLOS.map((ex) => {
            const isOpen = expandedId === ex.id;
            return (
              <article key={ex.id} style={S.card} onClick={() => toggle(ex.id)}>
                <div style={S.cardHeader}>
                  <div style={S.cardIcon}>{ex.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h2 style={S.cardTitle}>{ex.title}</h2>
                    <p style={S.cardDesc}>{ex.desc}</p>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--muted)"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </div>

                {isOpen && (
                  <div style={S.expanded}>
                    <div className="section-divider" />

                    <div style={S.benefitBox}>
                      <span style={S.benefitLabel}>Beneficio clave</span>
                      <p style={S.benefitText}>{ex.benefit}</p>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 12px 0' }}>Que incluye</h3>
                      <div style={S.featureList}>
                        {ex.features.map((f, i) => (
                          <div key={i} style={S.featureItem}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}>
                              <path d="M13.3 4.3L6 11.6 2.7 8.3" />
                            </svg>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 10px 0' }}>Stack tecnologico</h3>
                      <div style={S.techRow}>
                        {ex.tech.map((t, i) => (
                          <span key={i} style={S.techBadge}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div style={S.ctaBox}>
          <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 700, margin: '0 0 10px 0' }}>
            Cual automatizacion necesita tu negocio?
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 0 24px 0', maxWidth: '440px', marginInline: 'auto' }}>
            Contame que proceso repetitivo te esta frenando y te digo como automatizarlo.
          </p>
          <a
            href="https://wa.me/5492241567142"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '10px', background: 'var(--accent)', color: 'var(--background)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
          >
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
