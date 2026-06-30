'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart,
} from 'recharts';
import {
  MONTHLY_DATA, TOTAL_REVENUE, TOTAL_ORDERS, AVG_TICKET, GROWTH,
  TOP_PRODUCTS, REGION_DATA, WEEKDAY_DATA, PROJECTION, RECOMMENDATIONS,
} from '@/lib/dashboard-data';

const ACCENT = '#818cf8';
const ACCENT2 = '#f472b6';
const BG = '#0a0a0f';
const SIDEBAR_W = 200;
const CARD_BG = 'rgba(255,255,255,0.03)';
const CARD_BORDER = 'rgba(255,255,255,0.06)';
const TEXT_SEC = 'rgba(255,255,255,0.5)';
const TEXT_MUTED = 'rgba(255,255,255,0.3)';
const COLORS = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', '#fb923c'];
const REGION_COLORS = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', 'rgba(255,255,255,0.2)'];

const SECTIONS = [
  { id: 'resumen', label: 'Resumen', icon: '▦' },
  { id: 'ventas', label: 'Ventas', icon: '▤' },
  { id: 'categorias', label: 'Categorias', icon: '▨' },
  { id: 'productos', label: 'Productos', icon: '▣' },
  { id: 'datos', label: 'Datos', icon: '◉' },
  { id: 'proyeccion', label: 'Proyeccion', icon: '◈' },
  { id: 'recomendaciones', label: 'Recomendaciones', icon: '✦' },
];

const cardBase = { background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: '16px' };

function KpiCard({ label, value, suffix, gradient, subtitle }: {
  label: string; value: string; suffix?: string; gradient: string; subtitle?: string;
}) {
  return (
    <div style={{ ...cardBase, padding: 'clamp(16px, 2vw, 24px)', background: gradient, flex: '1 1 160px', minWidth: '130px' }}>
      <div style={{ fontSize: '11px', fontWeight: 500, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
        {value}{suffix && <span style={{ fontSize: '13px', fontWeight: 400, color: TEXT_SEC, marginLeft: '4px' }}>{suffix}</span>}
      </div>
      {subtitle && <div style={{ fontSize: '11px', color: '#34d399', marginTop: '6px' }}>{subtitle}</div>}
    </div>
  );
}

function ChartCard({ title, subtitle, children, isMobile }: {
  title: string; subtitle?: string; children: React.ReactNode; isMobile?: boolean;
}) {
  return (
    <div style={{ ...cardBase, padding: 'clamp(14px, 2vw, 24px)', flex: '1 1 300px', minWidth: isMobile ? '100%' : '280px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '12px', color: TEXT_SEC, marginTop: '2px' }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

const tooltipStyle = {
  background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', padding: '10px 14px', fontSize: '13px',
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ color: '#fff', fontWeight: 600, marginBottom: '4px', fontSize: '13px' }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color, fontSize: '12px', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <span>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{p.name === 'orders' ? p.value : `$${p.value.toLocaleString()}`}</span>
        </div>
      ))}
    </div>
  );
}

const fmtCurr = (v: number) => `$${v.toLocaleString()}`;

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('resumen');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const isMobile = width > 0 && width < 768;
  const mob = isMobile;
  const yAxisW = mob ? 40 : 60;
  const pieR = mob ? { i: 30, o: 48 } : { i: 55, o: 80 };
  const chH = mob ? 200 : 260;
  const smH = mob ? 180 : 220;

  const totalByCat = useMemo(() => [
    { name: 'Remeras', value: MONTHLY_DATA.reduce((s, m) => s + m.remeras, 0) },
    { name: 'Jeans', value: MONTHLY_DATA.reduce((s, m) => s + m.jeans, 0) },
    { name: 'Vestidos', value: MONTHLY_DATA.reduce((s, m) => s + m.vestidos, 0) },
    { name: 'Abrigos', value: MONTHLY_DATA.reduce((s, m) => s + m.abrigos, 0) },
    { name: 'Calzado', value: MONTHLY_DATA.reduce((s, m) => s + m.calzado, 0) },
  ], []);

  const projData = useMemo(() => PROJECTION.map((d) => ({
    month: d.month, actual: d.actual ?? null, projected: d.projected,
  })), []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    for (const sec of SECTIONS) {
      const el = document.getElementById(sec.id);
      if (el) { obs.observe(el); sectionRefs.current[sec.id] = el; }
    }
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const sidebar = (
    <nav style={{
      display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px 8px',
    }}>
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 14px', borderRadius: '10px', border: 'none',
            background: activeSection === s.id ? 'rgba(129,140,248,0.12)' : 'transparent',
            color: activeSection === s.id ? ACCENT : TEXT_SEC, cursor: 'pointer',
            fontSize: '13px', fontWeight: activeSection === s.id ? 600 : 400,
            transition: 'all 0.15s', textAlign: 'left', width: '100%',
          }}
        >
          <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{s.icon}</span>
          {!isMobile && <span>{s.label}</span>}
        </button>
      ))}
    </nav>
  );

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#fff', fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>

      {/* Mobile menu overlay */}
      {mob && menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 98 }}
        />
      )}

      {/* Mobile menu panel */}
      {mob && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '260px',
          background: '#0f0f17', borderLeft: `1px solid ${CARD_BORDER}`,
          zIndex: 99, transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s ease', padding: '24px 16px', overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: TEXT_SEC }}>Secciones</span>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: TEXT_SEC, cursor: 'pointer', padding: '4px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                padding: '12px 14px', borderRadius: '10px', border: 'none',
                background: activeSection === s.id ? 'rgba(129,140,248,0.12)' : 'transparent',
                color: activeSection === s.id ? ACCENT : TEXT_SEC, cursor: 'pointer',
                fontSize: '14px', fontWeight: activeSection === s.id ? 600 : 400,
                marginBottom: '2px', textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '16px', width: '24px' }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Layout: content + sidebar */}
      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, padding: 'clamp(60px, 8vh, 100px) clamp(16px, 4vw, 40px) clamp(60px, 8vh, 100px)' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
            <div style={{ flex: 1 }}>
              <Link href="/servicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: TEXT_SEC, textDecoration: 'none', marginBottom: '12px' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 12L6 8l4-4" /></svg>
                Volver al catalogo
              </Link>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '999px', background: 'rgba(129,140,248,0.1)', color: ACCENT, border: '1px solid rgba(129,140,248,0.2)', display: 'inline-block', marginBottom: '10px' }}>
                Dashboards / BI
              </div>
              <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, margin: '0 0 4px 0', lineHeight: 1.2 }}>Dashboard Atelier</h1>
              <p style={{ fontSize: '13px', color: TEXT_SEC, margin: 0 }}>Panel de control de tienda de ropa — Enero a Junio 2026</p>
            </div>

            {/* Mobile hamburger */}
            {mob && (
              <button onClick={() => setMenuOpen(true)} style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: '10px', color: TEXT_SEC, cursor: 'pointer', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              </button>
            )}
          </div>

          {/* ===== RESUMENT ===== */}
          <section id="resumen" style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <KpiCard label="Ingresos totales" value={`$${(TOTAL_REVENUE / 1000).toFixed(0)}K`}
                gradient="linear-gradient(135deg, rgba(99,102,241,0.12), transparent)" subtitle={`+${GROWTH}% vs semestre anterior`} />
              <KpiCard label="Pedidos" value={TOTAL_ORDERS.toLocaleString()}
                gradient="linear-gradient(135deg, rgba(244,114,182,0.12), transparent)" />
              <KpiCard label="Ticket prom." value={`$${AVG_TICKET}`}
                gradient="linear-gradient(135deg, rgba(52,211,153,0.12), transparent)" subtitle="+8% vs semestre anterior" />
              <KpiCard label="Conversion" value="3.2" suffix="%"
                gradient="linear-gradient(135deg, rgba(251,191,36,0.12), transparent)" subtitle="+0.4pp vs semestre anterior" />
            </div>
          </section>

          {/* ===== VENTAS ===== */}
          <section id="ventas" style={{ marginBottom: '12px' }}>
            <ChartCard title="Ventas mensuales" subtitle="Ingresos por mes en los ultimos 6 meses" isMobile={mob}>
              <ResponsiveContainer width="100%" height={chH}>
                <LineChart data={MONTHLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: TEXT_SEC, fontSize: mob ? 10 : 12 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={fmtCurr} tick={{ fill: TEXT_SEC, fontSize: mob ? 10 : 12 }} axisLine={false} tickLine={false} width={yAxisW} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="revenue" stroke={ACCENT} strokeWidth={2.5} dot={{ fill: ACCENT, r: mob ? 2 : 4 }} activeDot={{ r: mob ? 4 : 6 }} name="revenue" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </section>

          {/* ===== CATEGORIAS ===== */}
          <section id="categorias" style={{ marginBottom: '12px' }}>
            <ChartCard title="Ventas por categoria" subtitle="Acumulado Enero-Junio 2026" isMobile={mob}>
              <ResponsiveContainer width="100%" height={chH}>
                <BarChart data={totalByCat} barCategoryGap={mob ? '10%' : '20%'}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: TEXT_SEC, fontSize: mob ? 9 : 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={fmtCurr} tick={{ fill: TEXT_SEC, fontSize: mob ? 9 : 11 }} axisLine={false} tickLine={false} width={yAxisW} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {totalByCat.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </section>

          {/* ===== PRODUCTOS ===== */}
          <section id="productos" style={{ marginBottom: '12px' }}>
            <ChartCard title="Top 5 productos" subtitle="Unidades vendidas en el semestre" isMobile={mob}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {TOP_PRODUCTS.map((p, i) => {
                  const pct = (p.units / TOP_PRODUCTS[0].units) * 100;
                  return (
                    <div key={p.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: COLORS[i], width: '16px' }}>{i + 1}</span>
                          <span style={{ fontSize: '13px', color: '#fff' }}>{p.name}</span>
                        </div>
                        <span style={{ fontSize: '12px', color: TEXT_SEC }}>{p.units.toLocaleString()} u.</span>
                      </div>
                      <div style={{ height: '6px', borderRadius: '99px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, borderRadius: '99px', background: COLORS[i], opacity: 0.7 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ChartCard>
          </section>

          {/* ===== DATOS ===== */}
          <section id="datos" style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <ChartCard title="Distribucion por region" subtitle="% de ingresos por provincia" isMobile={mob}>
                <ResponsiveContainer width="100%" height={smH}>
                  <PieChart>
                    <Pie data={REGION_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%"
                      innerRadius={pieR.i} outerRadius={pieR.o} paddingAngle={3}>
                      {REGION_DATA.map((_, i) => <Cell key={i} fill={REGION_COLORS[i]} stroke="transparent" />)}
                    </Pie>
                    <Tooltip content={({ active, payload }) => active && payload?.[0] ? (
                      <div style={tooltipStyle}>
                        <div style={{ color: payload[0].color, fontWeight: 600, fontSize: '13px' }}>{payload[0].name}</div>
                        <div style={{ fontSize: '12px', color: TEXT_SEC }}>{payload[0].value}% de ingresos</div>
                      </div>
                    ) : null} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {REGION_DATA.map((r, i) => (
                    <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: TEXT_SEC }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: REGION_COLORS[i], display: 'inline-block' }} />
                      {r.name} {r.value}%
                    </div>
                  ))}
                </div>
              </ChartCard>

              <ChartCard title="Ventas por dia" subtitle="Pedidos promedio por dia de la semana" isMobile={mob}>
                <ResponsiveContainer width="100%" height={smH}>
                  <BarChart data={WEEKDAY_DATA} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: TEXT_SEC, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                    <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                      {WEEKDAY_DATA.map((d, i) => (
                        <Cell key={i} fill={d.day === 'Lun' ? '#f43f5e' : d.day === 'Vie' ? '#34d399' : '#818cf8'}
                          fillOpacity={d.day === 'Lun' ? 0.4 : 0.7} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </section>

          {/* ===== PROYECCION ===== */}
          <section id="proyeccion" style={{ marginBottom: '12px' }}>
            <ChartCard title="Proyeccion Julio-Diciembre" subtitle="Estimacion basada en tendencia del semestre + estacionalidad" isMobile={mob}>
              <ResponsiveContainer width="100%" height={chH}>
                <ComposedChart data={projData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: TEXT_SEC, fontSize: mob ? 10 : 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={fmtCurr} tick={{ fill: TEXT_SEC, fontSize: mob ? 9 : 11 }} axisLine={false} tickLine={false} width={yAxisW} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="actual" fill={ACCENT} fillOpacity={0.6} radius={[4, 4, 0, 0]} name="actual" />
                  <Line type="monotone" dataKey="projected" stroke={ACCENT2} strokeWidth={2} strokeDasharray="6 4" dot={{ fill: ACCENT2, r: 3 }} name="projected" />
                  <Legend formatter={(v: string) => <span style={{ color: TEXT_SEC, fontSize: '12px' }}>{v === 'actual' ? 'Real' : 'Proyeccion'}</span>} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>
          </section>

          {/* ===== RECOMENDACIONES ===== */}
          <section id="recomendaciones" style={{ marginBottom: '12px' }}>
            <ChartCard title="Recomendaciones" subtitle="Insights basados en datos del semestre" isMobile={mob}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {RECOMMENDATIONS.map((r, i) => (
                  <div key={i} style={{ padding: '14px 16px', borderRadius: '12px', background: r.gradient, border: `1px solid ${CARD_BORDER}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: COLORS[i], display: 'inline-block' }} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{r.title}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: TEXT_SEC, margin: '0 0 6px 0', lineHeight: 1.5 }}>{r.insight}</p>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#34d399' }}>{r.impact}</div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </section>

          {/* CTA */}
          <div style={{ ...cardBase, padding: 'clamp(24px, 4vw, 36px)', textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 700, margin: '0 0 8px 0', color: '#fff' }}>
              Necesitas un dashboard para tu negocio?
            </h2>
            <p style={{ fontSize: '13px', color: TEXT_SEC, margin: '0 0 20px 0', maxWidth: '400px', marginInline: 'auto' }}>
              Conectamos tus fuentes de datos y creamos un tablero a medida con las metricas que realmente importan.
            </p>
            <a href="https://wa.me/5492241567142" target="_blank" rel="noopener noreferrer" className="cta-button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '10px', background: ACCENT, color: '#000', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
              Quiero mi dashboard
            </a>
          </div>
        </div>

        {/* Desktop sidebar */}
        {!mob && (
          <div style={{
            width: `${SIDEBAR_W}px`, flexShrink: 0, position: 'sticky', top: 0,
            height: '100vh', borderLeft: `1px solid ${CARD_BORDER}`,
            background: '#0d0d14', display: 'flex', flexDirection: 'column', overflowY: 'auto',
          }}>
            <div style={{ padding: '20px 16px 8px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: TEXT_MUTED }}>
              Navegacion
            </div>
            {sidebar}
          </div>
        )}
      </div>
    </div>
  );
}
