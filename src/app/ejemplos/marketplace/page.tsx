'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROFESSIONALS, CATEGORIES, CATEGORY_ICONS } from '@/lib/marketplace-data';

const S = {
  section: { minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-sans)' },
  container: { paddingTop: 'clamp(100px, 15vh, 160px)', paddingBottom: 'clamp(80px, 12vh, 140px)' },
  back: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px' },
  tag: { fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '4px 12px', borderRadius: '999px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)', display: 'inline-block', marginBottom: '16px' },
  h1: { fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.15, letterSpacing: '-0.02em' },
  desc: { fontSize: '16px', lineHeight: 1.7, color: 'var(--foreground-2)', maxWidth: '600px', margin: '0 0 0 0' },
  input: { width: '100%', padding: '14px 20px 14px 48px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--foreground)', fontSize: '15px', outline: 'none' },
  pill: (active: boolean) => ({ padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: active ? 600 : 500, border: active ? '1px solid var(--accent)' : '1px solid var(--border)', background: active ? 'var(--accent)' : 'transparent', color: active ? 'var(--background)' : 'var(--foreground-2)', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' as const }),
  card: {
    borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none', color: 'inherit', display: 'block',
  },
  catCard: {
    borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--surface)', padding: '24px 20px', textAlign: 'center' as const, cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none', color: 'inherit', display: 'block',
  },
};

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all');

  const filtered = useMemo(() => {
    let result = PROFESSIONALS;
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.bio.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const ratingBg = (r: number) =>
    r >= 4.8 ? 'rgba(34,197,94,0.1)' : r >= 4.5 ? 'rgba(234,179,8,0.1)' : 'rgba(239,68,68,0.1)';
  const ratingColor = (r: number) =>
    r >= 4.8 ? '#22c55e' : r >= 4.5 ? '#eab308' : '#ef4444';

  return (
    <div style={S.section}>
      <div className="section-container" style={S.container}>
        <Link href="/servicios" style={S.back}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 12L6 8l4-4" /></svg>
          Volver al catalogo
        </Link>

        <div style={S.tag}>Marketplace / Directorio</div>
        <h1 style={S.h1}>Profesional a Domicilio</h1>
        <p style={S.desc}>
          Encontra el profesional que necesitas en Chascomus. Busca por rubro, compara perfiles y contacta directo por WhatsApp.
        </p>

        <div style={{ position: 'relative', marginTop: '36px', marginBottom: '32px', maxWidth: '480px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Busca por nombre, rubro o servicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={S.input}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          <button onClick={() => setActiveCategory('all')} style={S.pill(activeCategory === 'all')}>Todas las categorías</button>
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={S.pill(activeCategory === cat.id)}>
              {cat.id} ({cat.count})
            </button>
          ))}
        </div>

        {activeCategory === 'all' && !search && (
          <>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0' }}>Categorías</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '14px', marginBottom: '48px' }}>
              {CATEGORIES.map((cat) => {
                const catPros = PROFESSIONALS.filter((p) => p.category === cat.id);
                return (
                  <Link key={cat.id} href={`/ejemplos/marketplace?cat=${cat.id}`} scroll={false} style={S.catCard}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      {CATEGORY_ICONS[cat.icon]}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{cat.id}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{catPros.length} profesionales</div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
            {activeCategory === 'all' ? 'Todos los profesionales' : activeCategory} ({filtered.length})
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '80px' }}>
          {filtered.map((pro) => (
            <Link key={pro.id} href={`/ejemplos/marketplace/${pro.id}`} style={S.card}>
              <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '22px', fontWeight: 700, flexShrink: 0 }}>
                  {pro.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{pro.name}</h3>
                    {pro.featured && <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 8px', borderRadius: '999px', background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Destacado</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{pro.subcategory} - {pro.location}</div>
                  <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--foreground-2)', margin: '8px 0 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pro.bio}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, padding: '2px 8px', borderRadius: '6px', background: ratingBg(pro.rating), color: ratingColor(pro.rating) }}>
                    {pro.rating.toFixed(1)}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>({pro.reviewCount} reseñas)</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)' }}>{pro.priceRange}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
            <p style={{ fontSize: '16px' }}>No encontre profesionales con ese criterio.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all'); }} style={{ ...S.pill(true), marginTop: '16px', display: 'inline-block' }}>Limpiar filtros</button>
          </div>
        )}

        <div style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: 'clamp(28px, 4vw, 40px)', textAlign: 'center', background: 'var(--surface)' }}>
          <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 700, margin: '0 0 10px 0' }}>Sos profesional y queres aparecer aca?</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 0 24px 0', maxWidth: '440px', marginInline: 'auto' }}>
            Sumate al directorio y recibi contactos de clientes de tu zona. Publica tu perfil y empeza a recibir mensajes.
          </p>
          <a href="https://wa.me/5492241567142" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '10px', background: 'var(--accent)', color: 'var(--background)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Quiero aparecer en el directorio
          </a>
        </div>
      </div>
    </div>
  );
}
