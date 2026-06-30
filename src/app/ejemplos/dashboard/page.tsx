'use client';

import { useMemo, useState, useEffect } from 'react';
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
const CARD_BG = 'rgba(255,255,255,0.03)';
const CARD_BORDER = 'rgba(255,255,255,0.06)';
const TEXT_SEC = 'rgba(255,255,255,0.5)';
const TEXT_MUTED = 'rgba(255,255,255,0.3)';
const COLORS = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', '#fb923c'];
const REGION_COLORS = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', 'rgba(255,255,255,0.2)'];

const cardBase = {
  background: CARD_BG,
  border: `1px solid ${CARD_BORDER}`,
  borderRadius: '16px',
};

function AnimatedKPICard({ label, value, suffix, gradient, subtitle }: {
  label: string; value: string; suffix?: string; gradient: string; subtitle?: string;
}) {
  return (
    <div style={{ ...cardBase, padding: 'clamp(16px, 2vw, 24px)', background: gradient, flex: '1 1 180px', minWidth: '140px' }}>
      <div style={{ fontSize: '11px', fontWeight: 500, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
        {value}{suffix && <span style={{ fontSize: '14px', fontWeight: 400, color: TEXT_SEC, marginLeft: '4px' }}>{suffix}</span>}
      </div>
      {subtitle && <div style={{ fontSize: '12px', color: '#34d399', marginTop: '6px' }}>{subtitle}</div>}
    </div>
  );
}

function ChartCard({ title, subtitle, children, style, isMobile }: { title: string; subtitle?: string; children: React.ReactNode; style?: React.CSSProperties; isMobile?: boolean }) {
  return (
    <div style={{ ...cardBase, padding: 'clamp(16px, 2vw, 24px)', flex: '1 1 300px', minWidth: isMobile ? '100%' : '280px', ...style }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '12px', color: TEXT_SEC, marginTop: '2px' }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

const tooltipStyle = {
  background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', padding: '12px 16px', fontSize: '13px',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ color: '#fff', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color, fontSize: '12px', display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
          <span>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{p.name === 'orders' ? p.value : `$${p.value.toLocaleString()}`}</span>
        </div>
      ))}
    </div>
  );
};

const formatCurrency = (v: number) => `$${v.toLocaleString()}`;

export default function DashboardPage() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const isMobile = width > 0 && width < 640;
  const yAxisWidth = isMobile ? 45 : 60;
  const pieRadius = isMobile ? { inner: 35, outer: 55 } : { inner: 55, outer: 80 };
  const chartHeight = isMobile ? 200 : 260;
  const smallChartHeight = isMobile ? 180 : 220;

  const totalByCategory = useMemo(() => {
    return [
      { name: 'Remeras', value: MONTHLY_DATA.reduce((s, m) => s + m.remeras, 0) },
      { name: 'Jeans', value: MONTHLY_DATA.reduce((s, m) => s + m.jeans, 0) },
      { name: 'Vestidos', value: MONTHLY_DATA.reduce((s, m) => s + m.vestidos, 0) },
      { name: 'Abrigos', value: MONTHLY_DATA.reduce((s, m) => s + m.abrigos, 0) },
      { name: 'Calzado', value: MONTHLY_DATA.reduce((s, m) => s + m.calzado, 0) },
    ];
  }, []);

  const projData = useMemo(() => PROJECTION.map((d) => ({
    month: d.month,
    actual: d.actual ?? null,
    projected: d.projected,
  })), []);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#fff', fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>
      <div className="section-container" style={{ paddingTop: 'clamp(80px, 12vh, 120px)', paddingBottom: 'clamp(60px, 8vh, 100px)' }}>
        <Link href="/servicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: TEXT_SEC, textDecoration: 'none', marginBottom: '12px' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 12L6 8l4-4" /></svg>
          Volver al catalogo
        </Link>

        <div className="section-divider" style={{ marginBottom: '32px' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '999px', background: 'rgba(129,140,248,0.1)', color: ACCENT, border: '1px solid rgba(129,140,248,0.2)', display: 'inline-block', marginBottom: '12px' }}>
              Dashboards / BI
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, margin: '0 0 4px 0', lineHeight: 1.2 }}>Dashboard Atelier</h1>
            <p style={{ fontSize: '14px', color: TEXT_SEC, margin: 0 }}>Panel de control de tienda de ropa — Enero a Junio 2026</p>
          </div>
          <div style={{ fontSize: '12px', color: TEXT_MUTED, padding: '8px 14px', borderRadius: '8px', border: `1px solid ${CARD_BORDER}`, background: CARD_BG }}>
            Ultima actualizacion: 30 Jun 2026
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <AnimatedKPICard
            label="Ingresos totales"
            value={`$${(TOTAL_REVENUE / 1000).toFixed(0)}K`}
            gradient="linear-gradient(135deg, rgba(99,102,241,0.12), transparent)"
            subtitle={`+${GROWTH}% vs semestre anterior`}
          />
          <AnimatedKPICard
            label="Pedidos"
            value={TOTAL_ORDERS.toLocaleString()}
            gradient="linear-gradient(135deg, rgba(244,114,182,0.12), transparent)"
          />
          <AnimatedKPICard
            label="Ticket promedio"
            value={`$${AVG_TICKET}`}
            gradient="linear-gradient(135deg, rgba(52,211,153,0.12), transparent)"
            subtitle="+8% vs semestre anterior"
          />
          <AnimatedKPICard
            label="Conversion rate"
            value="3.2"
            suffix="%"
            gradient="linear-gradient(135deg, rgba(251,191,36,0.12), transparent)"
            subtitle="+0.4pp vs semestre anterior"
          />
        </div>

        {/* Fila 2: Ventas mensuales + Categorias */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <ChartCard title="Ventas mensuales" subtitle="Ingresos por mes en los ultimos 6 meses" isMobile={isMobile}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <LineChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: TEXT_SEC, fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={formatCurrency} tick={{ fill: TEXT_SEC, fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} width={yAxisWidth} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="revenue" stroke={ACCENT} strokeWidth={2.5} dot={{ fill: ACCENT, r: isMobile ? 2 : 4 }} activeDot={{ r: isMobile ? 4 : 6 }} name="revenue" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Ventas por categoria" subtitle="Acumulado Enero-Junio 2026" isMobile={isMobile}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={totalByCategory} barCategoryGap={isMobile ? '10%' : '20%'}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: TEXT_SEC, fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={formatCurrency} tick={{ fill: TEXT_SEC, fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} width={yAxisWidth} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {totalByCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Fila 3: Top productos + Region + Dia semana */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <ChartCard title="Top 5 productos" subtitle="Unidades vendidas en el semestre" isMobile={isMobile}>
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
                      <div style={{ height: '100%', width: `${pct}%`, borderRadius: '99px', background: COLORS[i], opacity: 0.7, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          <ChartCard title="Distribucion por region" subtitle="% de ingresos por provincia" isMobile={isMobile} style={{ flex: '1 1 200px', minWidth: isMobile ? '100%' : '200px' }}>
            <ResponsiveContainer width="100%" height={smallChartHeight}>
              <PieChart>
                <Pie data={REGION_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={pieRadius.inner} outerRadius={pieRadius.outer} paddingAngle={3}>
                  {REGION_DATA.map((_, i) => (
                    <Cell key={i} fill={REGION_COLORS[i]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => active && payload?.[0] ? (
                  <div style={tooltipStyle}>
                    <div style={{ color: payload[0].color, fontWeight: 600, fontSize: '13px' }}>{payload[0].name}</div>
                    <div style={{ fontSize: '12px', color: TEXT_SEC }}>{payload[0].value}% de ingresos</div>
                  </div>
                ) : null} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
              {REGION_DATA.map((r, i) => (
                <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: TEXT_SEC }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: REGION_COLORS[i], display: 'inline-block' }} />
                  {r.name} {r.value}%
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Ventas por dia" subtitle="Pedidos promedio por dia de la semana" isMobile={isMobile}>
            <ResponsiveContainer width="100%" height={smallChartHeight}>
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
          </ChartCard>
        </div>

        {/* Fila 4: Proyeccion + Recomendaciones */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <ChartCard title="Proyeccion Julio-Diciembre" subtitle="Estimacion basada en tendencia del semestre + estacionalidad" isMobile={isMobile}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <ComposedChart data={projData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: TEXT_SEC, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={formatCurrency} tick={{ fill: TEXT_SEC, fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} width={yAxisWidth} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="actual" fill={ACCENT} fillOpacity={0.6} radius={[4, 4, 0, 0]} name="actual" />
                <Line type="monotone" dataKey="projected" stroke={ACCENT2} strokeWidth={2} strokeDasharray="6 4" dot={{ fill: ACCENT2, r: 3 }} name="projected" />
                <Legend
                  formatter={(value: string) => <span style={{ color: TEXT_SEC, fontSize: '12px' }}>{value === 'actual' ? 'Real' : 'Proyeccion'}</span>}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Recomendaciones" subtitle="Insights basados en datos del semestre" isMobile={isMobile}>
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
        </div>

        {/* CTA */}
        <div style={{ ...cardBase, padding: 'clamp(28px, 4vw, 40px)', textAlign: 'center', marginTop: '48px' }}>
          <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 700, margin: '0 0 10px 0', color: '#fff' }}>
            Necesitas un dashboard para tu negocio?
          </h2>
          <p style={{ fontSize: '14px', color: TEXT_SEC, margin: '0 0 24px 0', maxWidth: '440px', marginInline: 'auto' }}>
            Conectamos tus fuentes de datos y creamos un tablero a medida con las metricas que realmente importan.
          </p>
          <a href="https://wa.me/5492241567142" target="_blank" rel="noopener noreferrer" className="cta-button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '10px', background: ACCENT, color: '#000', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
            Quiero mi dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
