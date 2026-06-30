'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, AreaChart,
} from 'recharts';
import {
  MONTHLY_DATA, TOTAL_REVENUE, TOTAL_COST, TOTAL_GROSS_PROFIT, TOTAL_ORDERS,
  TOTAL_RETURNS, AVG_TICKET, PROFIT_MARGIN, ROI, REVENUE_TREND, ORDER_TREND,
  DAILY_DATA, TOP_PRODUCTS, REGION_DATA, WEEKDAY_DATA, PROJECTION, RECOMMENDATIONS,
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
const PERIODS = ['7d', '30d', '6m'] as const;
type Period = typeof PERIODS[number];

const cardBase = { background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: '16px' };
const tooltipStyle = { background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px' };

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ color: '#fff', fontWeight: 600, marginBottom: '4px', fontSize: '13px' }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color, fontSize: '12px', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <span>{p.name === 'revenue' ? 'Ingresos' : p.name === 'cost' ? 'Costos' : p.name === 'orders' ? 'Pedidos' : p.name}:</span>
          <span style={{ fontWeight: 600 }}>{p.name === 'orders' ? p.value : `$${p.value.toLocaleString()}`}</span>
        </div>
      ))}
    </div>
  );
}

const fmtCurr = (v: number) => `$${v.toLocaleString()}`;
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const id = `spark-${Math.random().toString(36).slice(2, 6)}`;
  const w = 80; const h = 28;
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${id})`} />
    </svg>
  );
}

function KpiCard({ label, value, suffix, gradient, subtitle, sparkData, sparkColor }: {
  label: string; value: string; suffix?: string; gradient: string; subtitle?: string;
  sparkData?: number[]; sparkColor?: string;
}) {
  return (
    <div style={{ ...cardBase, padding: 'clamp(14px, 1.5vw, 20px)', background: gradient, flex: '1 1 160px', minWidth: '130px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '10px', fontWeight: 500, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{label}</div>
        {sparkData && <MiniSparkline data={sparkData} color={sparkColor || '#818cf8'} />}
      </div>
      <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
        {value}{suffix && <span style={{ fontSize: '12px', fontWeight: 400, color: TEXT_SEC, marginLeft: '4px' }}>{suffix}</span>}
      </div>
      {subtitle && <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>{subtitle}</div>}
    </div>
  );
}

function PanelCard({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ ...cardBase, padding: 'clamp(14px, 2vw, 24px)' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '12px', color: TEXT_SEC, marginTop: '2px' }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [menuOpen, setMenuOpen] = useState(false);
  const [period, setPeriod] = useState<Period>('6m');
  const [searchProd, setSearchProd] = useState('');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const isMobile = width > 0 && width < 768;
  const yAxisW = isMobile ? 40 : 60;
  const pieR = isMobile ? { i: 30, o: 48 } : { i: 55, o: 80 };
  const chH = isMobile ? 220 : 300;
  const smH = isMobile ? 180 : 240;

  const monthsInPeriod = useMemo(() => {
    if (period === '7d') return MONTHLY_DATA.slice(-1);
    if (period === '30d') return MONTHLY_DATA.slice(-2);
    return MONTHLY_DATA;
  }, [period]);

  const periodAgg = useMemo(() => {
    const acc = { revenue: 0, cost: 0, orders: 0, returns: 0, remeras: 0, jeans: 0, vestidos: 0, abrigos: 0, calzado: 0 };
    monthsInPeriod.forEach((m) => {
      acc.revenue += m.revenue; acc.cost += m.cost; acc.orders += m.orders; acc.returns += m.returns;
      acc.remeras += m.remeras; acc.jeans += m.jeans; acc.vestidos += m.vestidos; acc.abrigos += m.abrigos; acc.calzado += m.calzado;
    });
    return acc;
  }, [monthsInPeriod]);

  const growthStr = period === '6m' ? '+18%' : period === '30d' ? '+12%' : '+5%';
  const marginPct = ((periodAgg.revenue - periodAgg.cost) / periodAgg.revenue * 100).toFixed(1);

  const totalByCat = useMemo(() => ([
    { name: 'Remeras', value: periodAgg.remeras },
    { name: 'Jeans', value: periodAgg.jeans },
    { name: 'Vestidos', value: periodAgg.vestidos },
    { name: 'Abrigos', value: periodAgg.abrigos },
    { name: 'Calzado', value: periodAgg.calzado },
  ]), [periodAgg]);

  const projData = useMemo(() => PROJECTION.map((d) => ({ month: d.month, actual: d.actual ?? null, projected: d.projected })), []);

  const filteredProducts = useMemo(() => {
    if (!searchProd.trim()) return TOP_PRODUCTS;
    const q = searchProd.toLowerCase();
    return TOP_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [searchProd]);

  const chartData: any[] = useMemo(() => {
    if (period === '7d') return DAILY_DATA.slice(-7);
    if (period === '30d') return DAILY_DATA;
    return MONTHLY_DATA;
  }, [period]);

  const chartKey = period === '6m' ? 'month' : 'day';

  const tab = (id: string) => { setActiveTab(id); setMenuOpen(false); };

  const sidebar = (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px 8px' }}>
      {SECTIONS.map((s) => (
        <button key={s.id} onClick={() => tab(s.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: 'none',
            background: activeTab === s.id ? 'rgba(129,140,248,0.12)' : 'transparent',
            color: activeTab === s.id ? ACCENT : TEXT_SEC, cursor: 'pointer',
            fontSize: '13px', fontWeight: activeTab === s.id ? 600 : 400, transition: 'all 0.15s', textAlign: 'left', width: '100%',
          }}>
          <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{s.icon}</span>
          <span>{s.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#fff', fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>

      {/* Mobile menu */}
      {isMobile && menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 98 }} />}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '260px', background: '#0f0f17',
          borderLeft: `1px solid ${CARD_BORDER}`, zIndex: 99,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.25s ease',
          padding: '24px 16px', overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: TEXT_SEC }}>Panel</span>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: TEXT_SEC, cursor: 'pointer', padding: '4px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => tab(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 14px', borderRadius: '10px', border: 'none',
                background: activeTab === s.id ? 'rgba(129,140,248,0.12)' : 'transparent',
                color: activeTab === s.id ? ACCENT : TEXT_SEC, cursor: 'pointer', fontSize: '14px',
                fontWeight: activeTab === s.id ? 600 : 400, marginBottom: '2px', textAlign: 'left',
              }}>
              <span style={{ fontSize: '16px', width: '24px' }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, padding: 'clamp(60px, 8vh, 100px) clamp(16px, 4vw, 40px) clamp(60px, 8vh, 100px)' }}>

          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: TEXT_MUTED, marginBottom: '20px' }}>
            <Link href="/" style={{ color: TEXT_MUTED, textDecoration: 'none' }}>BladoPC</Link>
            <span>/</span>
            <Link href="/servicios" style={{ color: TEXT_MUTED, textDecoration: 'none' }}>Servicios</Link>
            <span>/</span>
            <Link href="/servicios/dashboard" style={{ color: TEXT_MUTED, textDecoration: 'none' }}>Dashboards</Link>
            <span>/</span>
            <span style={{ color: TEXT_SEC }}>Atelier</span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block',
                  boxShadow: '0 0 8px rgba(52,211,153,0.5)',
                }} />
                <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 500 }}>
                  En vivo — datos simulados
                </span>
                <span style={{ fontSize: '11px', color: TEXT_MUTED }}>
                  Actualizado hace 2 min
                </span>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '999px', background: 'rgba(129,140,248,0.1)', color: ACCENT, border: '1px solid rgba(129,140,248,0.2)', display: 'inline-block', marginBottom: '8px' }}>
                Dashboards / BI
              </div>
              <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, margin: '0 0 2px 0', lineHeight: 1.2 }}>Dashboard Atelier</h1>
              <p style={{ fontSize: '13px', color: TEXT_SEC, margin: 0 }}>Panel de control de tienda de ropa — Enero a Junio 2026</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '4px', background: CARD_BG, borderRadius: '8px', padding: '3px', border: `1px solid ${CARD_BORDER}` }}>
                {PERIODS.map((p) => (
                  <button key={p} onClick={() => setPeriod(p)}
                    style={{
                      padding: '6px 14px', borderRadius: '6px', border: 'none',
                      background: period === p ? ACCENT : 'transparent',
                      color: period === p ? '#000' : TEXT_SEC, cursor: 'pointer',
                      fontSize: '12px', fontWeight: period === p ? 600 : 400,
                    }}>
                    {p}
                  </button>
                ))}
              </div>
              {isMobile && (
                <button onClick={() => setMenuOpen(true)} style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: '10px', color: TEXT_SEC, cursor: 'pointer', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => tab(s.id)}
                style={{
                  padding: '6px 14px', borderRadius: '8px', border: `1px solid ${activeTab === s.id ? ACCENT : CARD_BORDER}`,
                  background: activeTab === s.id ? 'rgba(129,140,248,0.1)' : 'transparent',
                  color: activeTab === s.id ? ACCENT : TEXT_SEC, cursor: 'pointer',
                  fontSize: '12px', fontWeight: activeTab === s.id ? 600 : 400,
                  display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '6px',
                }}>
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* ===== RESUMEN ===== */}
          {activeTab === 'resumen' && (
            <>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <KpiCard label="Ingresos" value={`$${(periodAgg.revenue / 1000).toFixed(0)}K`}
                  gradient="linear-gradient(135deg, rgba(99,102,241,0.12), transparent)"
                  subtitle={`${growthStr} vs periodo anterior`}
                  sparkData={REVENUE_TREND} sparkColor="#818cf8" />
                <KpiCard label="Ganancia bruta" value={`$${((periodAgg.revenue - periodAgg.cost) / 1000).toFixed(0)}K`}
                  gradient="linear-gradient(135deg, rgba(52,211,153,0.12), transparent)"
                  subtitle={`Margen ${marginPct}%`}
                  sparkData={REVENUE_TREND.map((r, i) => r - MONTHLY_DATA[i].cost)} sparkColor="#34d399" />
                <KpiCard label="Pedidos" value={periodAgg.orders.toLocaleString()}
                  gradient="linear-gradient(135deg, rgba(244,114,182,0.12), transparent)"
                  subtitle={`${periodAgg.returns} devoluciones (${((periodAgg.returns / periodAgg.orders) * 100).toFixed(1)}%)`}
                  sparkData={ORDER_TREND} sparkColor="#f472b6" />
                <KpiCard label="ROI" value={`${((periodAgg.revenue - periodAgg.cost) / periodAgg.cost * 100).toFixed(0)}%`}
                  gradient="linear-gradient(135deg, rgba(251,191,36,0.12), transparent)"
                  subtitle={`$${periodAgg.cost.toLocaleString()} en costos`} />
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <PanelCard>
                  <div style={{ display: 'flex', gap: '24px', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    {monthsInPeriod.slice(-3).map((m) => (
                      <div key={m.month} style={{ textAlign: 'center', padding: '8px 16px' }}>
                        <div style={{ fontSize: '11px', color: TEXT_SEC, marginBottom: '4px' }}>{m.month}</div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>${(m.revenue / 1000).toFixed(0)}K</div>
                        <div style={{ fontSize: '10px', color: '#34d399', marginTop: '2px' }}>{m.orders} pedidos</div>
                      </div>
                    ))}
                  </div>
                </PanelCard>
              </div>
            </>
          )}

          {/* ===== VENTAS ===== */}
          {activeTab === 'ventas' && (
            <PanelCard title="Ventas" subtitle={period === '6m' ? 'Ingresos por mes (ultimos 6 meses)' : period === '30d' ? 'Ingresos diarios (ultimos 30 dias)' : 'Ingresos diarios (ultimos 7 dias)'}>
              <ResponsiveContainer width="100%" height={chH}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey={chartKey} tick={{ fill: TEXT_SEC, fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={fmtCurr} tick={{ fill: TEXT_SEC, fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} width={yAxisW} />
                  <Tooltip content={<CustomTooltip />} />
                  {period === '6m' && (
                    <>
                      <Area type="monotone" dataKey="cost" stroke="#f43f5e" strokeWidth={1.5} fillOpacity={1} fill="url(#costGrad)" name="cost" />
                      <Area type="monotone" dataKey="revenue" stroke={ACCENT} strokeWidth={2} fillOpacity={1} fill="url(#revGrad)" name="revenue" />
                    </>
                  )}
                  {period !== '6m' && (
                    <Area type="monotone" dataKey="revenue" stroke={ACCENT} strokeWidth={2} fillOpacity={1} fill="url(#revGrad)" name="revenue" />
                  )}
                  {period === '6m' && (
                    <Legend formatter={(v: string) => <span style={{ color: TEXT_SEC, fontSize: '12px' }}>{v === 'revenue' ? 'Ingresos' : 'Costos'}</span>} />
                  )}
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Ingresos', value: periodAgg.revenue },
                  { label: 'Costos', value: periodAgg.cost },
                  { label: 'Ganancia', value: periodAgg.revenue - periodAgg.cost },
                ].map((d) => (
                  <div key={d.label} style={{ textAlign: 'center', padding: '10px 20px', borderRadius: '10px', border: `1px solid ${CARD_BORDER}` }}>
                    <div style={{ fontSize: '10px', color: TEXT_SEC, marginBottom: '2px' }}>{d.label}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>${(d.value / 1000).toFixed(0)}K</div>
                  </div>
                ))}
              </div>
            </PanelCard>
          )}

          {/* ===== CATEGORIAS ===== */}
          {activeTab === 'categorias' && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ ...cardBase, padding: 'clamp(14px, 2vw, 24px)', flex: '2 1 400px', minWidth: isMobile ? '100%' : '300px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Ventas por categoria</div>
                  <div style={{ fontSize: '12px', color: TEXT_SEC, marginTop: '2px' }}>Acumulado Enero-Junio 2026</div>
                </div>
                <ResponsiveContainer width="100%" height={chH}>
                  <BarChart data={totalByCat} barCategoryGap={isMobile ? '10%' : '20%'}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: TEXT_SEC, fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={fmtCurr} tick={{ fill: TEXT_SEC, fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} width={yAxisW} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {totalByCat.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ ...cardBase, padding: 'clamp(14px, 2vw, 24px)', flex: '1 1 200px', minWidth: isMobile ? '100%' : '180px' }}>
                <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Distribucion</div>
                {totalByCat.map((c, i) => {
                  const total = totalByCat.reduce((s, x) => s + x.value, 0);
                  const pct = ((c.value / total) * 100).toFixed(0);
                  return (
                    <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: COLORS[i], flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', flex: 1, color: TEXT_SEC }}>{c.name}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== PRODUCTOS ===== */}
          {activeTab === 'productos' && (
            <PanelCard title="Productos" subtitle="Rendimiento por producto en el semestre">
              <div style={{ marginBottom: '16px' }}>
                <input type="text" placeholder="Buscar producto o categoria..."
                  value={searchProd} onChange={(e) => setSearchProd(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${CARD_BORDER}`,
                    background: CARD_BG, color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                  }} />
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '11px' : '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${CARD_BORDER}`, color: TEXT_MUTED, fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Producto</th>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Categoria</th>
                      <th style={{ padding: '10px 8px', textAlign: 'right' }}>Vendidos</th>
                      <th style={{ padding: '10px 8px', textAlign: 'right' }}>Ingresos</th>
                      <th style={{ padding: '10px 8px', textAlign: 'right' }}>Stock</th>
                      <th style={{ padding: '10px 8px', textAlign: 'right' }}>Margen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p, i) => (
                      <tr key={p.name} style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                        <td style={{ padding: '10px 8px', color: '#fff', fontWeight: 500 }}>
                          <span style={{ color: COLORS[i % COLORS.length], marginRight: '8px' }}>{i + 1}</span>
                          {p.name}
                        </td>
                        <td style={{ padding: '10px 8px', color: TEXT_SEC }}>{p.category}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'right', color: '#fff' }}>{p.units.toLocaleString()}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'right', color: '#fff' }}>${(p.revenue / 1000).toFixed(1)}K</td>
                        <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                          <span style={{ color: p.stock < 150 ? '#f43f5e' : '#34d399' }}>{p.stock}</span>
                        </td>
                        <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                          <span style={{ color: '#34d399' }}>{p.margin}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: TEXT_SEC, fontSize: '13px' }}>
                  No se encontraron productos para &quot;{searchProd}&quot;
                </div>
              )}
            </PanelCard>
          )}

          {/* ===== DATOS ===== */}
          {activeTab === 'datos' && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ ...cardBase, padding: 'clamp(14px, 2vw, 24px)', flex: '1 1 300px', minWidth: isMobile ? '100%' : '280px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Distribucion por region</div>
                  <div style={{ fontSize: '12px', color: TEXT_SEC, marginTop: '2px' }}>% de ingresos por provincia</div>
                </div>
                <ResponsiveContainer width="100%" height={smH}>
                  <PieChart>
                    <Pie data={REGION_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={pieR.i} outerRadius={pieR.o} paddingAngle={3}>
                      {REGION_DATA.map((_, i) => <Cell key={i} fill={REGION_COLORS[i]} stroke="transparent" />)}
                    </Pie>
                    <Tooltip content={({ active, payload }) => active && payload?.[0] ? (
                      <div style={tooltipStyle}>
                        <div style={{ color: payload[0].color, fontWeight: 600, fontSize: '12px' }}>{payload[0].name}</div>
                        <div style={{ fontSize: '11px', color: TEXT_SEC }}>{payload[0].value}% de ingresos</div>
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
              </div>
              <div style={{ ...cardBase, padding: 'clamp(14px, 2vw, 24px)', flex: '1 1 300px', minWidth: isMobile ? '100%' : '280px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Ventas por dia</div>
                  <div style={{ fontSize: '12px', color: TEXT_SEC, marginTop: '2px' }}>Pedidos promedio por dia de la semana</div>
                </div>
                <ResponsiveContainer width="100%" height={smH}>
                  <BarChart data={WEEKDAY_DATA} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: TEXT_SEC, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                    <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                      {WEEKDAY_DATA.map((d, i) => (
                        <Cell key={i} fill={d.day === 'Lun' ? '#f43f5e' : d.day === 'Vie' ? '#34d399' : '#818cf8'} fillOpacity={d.day === 'Lun' ? 0.4 : 0.7} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ===== PROYECCION ===== */}
          {activeTab === 'proyeccion' && (
            <PanelCard title="Proyeccion Julio-Diciembre" subtitle="Estimacion basada en tendencia del semestre + estacionalidad">
              <ResponsiveContainer width="100%" height={chH}>
                <ComposedChart data={projData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: TEXT_SEC, fontSize: isMobile ? 10 : 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={fmtCurr} tick={{ fill: TEXT_SEC, fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} width={yAxisW} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="actual" fill={ACCENT} fillOpacity={0.6} radius={[4, 4, 0, 0]} name="revenue" />
                  <Line type="monotone" dataKey="projected" stroke={ACCENT2} strokeWidth={2} strokeDasharray="6 4" dot={{ fill: ACCENT2, r: 3 }} name="projected" />
                  <Legend formatter={(v: string) => <span style={{ color: TEXT_SEC, fontSize: '12px' }}>{v === 'revenue' ? 'Real' : 'Proyeccion'}</span>} />
                </ComposedChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                {PROJECTION.filter((d) => d.projected).slice(0, 3).map((d) => (
                  <div key={d.month} style={{ textAlign: 'center', padding: '10px 20px', borderRadius: '10px', border: `1px solid ${CARD_BORDER}` }}>
                    <div style={{ fontSize: '11px', color: TEXT_SEC, marginBottom: '4px' }}>{d.month}</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: ACCENT2 }}>${(d.projected! / 1000).toFixed(0)}K</div>
                  </div>
                ))}
              </div>
            </PanelCard>
          )}

          {/* ===== RECOMENDACIONES ===== */}
          {activeTab === 'recomendaciones' && (
            <PanelCard title="Recomendaciones" subtitle="Insights basados en datos del semestre">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {RECOMMENDATIONS.map((r, i) => (
                  <div key={i} style={{ padding: '16px 20px', borderRadius: '12px', background: r.gradient, border: `1px solid ${CARD_BORDER}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i], display: 'inline-block' }} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{r.title}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: TEXT_SEC, margin: '0 0 8px 0', lineHeight: 1.6 }}>{r.insight}</p>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#34d399' }}>{r.impact}</div>
                  </div>
                ))}
              </div>
            </PanelCard>
          )}

        </div>

        {/* Desktop sidebar */}
        {!isMobile && (
          <div style={{
            width: `${SIDEBAR_W}px`, flexShrink: 0, position: 'sticky', top: 0,
            height: '100vh', borderLeft: `1px solid ${CARD_BORDER}`,
            background: '#0d0d14', display: 'flex', flexDirection: 'column', overflowY: 'auto',
          }}>
            <div style={{ padding: '20px 16px 8px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: TEXT_MUTED }}>
              Panel
            </div>
            {sidebar}
          </div>
        )}
      </div>
    </div>
  );
}
