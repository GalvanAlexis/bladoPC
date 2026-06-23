'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin, Miembro, ServicioItem, FAQItem, HistoriaItem } from '../hooks/useAdmin';

interface Props {
  open: boolean;
  onClose: () => void;
}

const GRANATE = '#7a1a1a';
const GRANATE_LIGHT = '#9a2a2a';
const BG_WARM = '#f5f3f0';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

const TABS = [
  { key: 'Equipo', icon: 'U' },
  { key: 'Servicios', icon: 'S' },
  { key: 'FAQ', icon: '?' },
  { key: 'Historia', icon: 'T' },
  { key: 'Metricas', icon: 'M' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function AdminDashboard({ open, onClose }: Props) {
  const admin = useAdmin();
  const [tab, setTab] = useState<TabKey>('Equipo');

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="dash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: '#fff',
            display: 'flex', fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          <motion.aside
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            style={{
              width: 220, flexShrink: 0,
              background: '#1a1a1a',
              display: 'flex', flexDirection: 'column',
              color: '#fff', overflow: 'hidden',
            }}
          >
            <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GRANATE_LIGHT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                M&A Estudio
              </div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Panel de Admin</div>
            </div>

            <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 12px', borderRadius: 8,
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 13, fontWeight: tab === t.key ? 600 : 400,
                    background: tab === t.key ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: tab === t.key ? '#fff' : 'rgba(255,255,255,0.55)',
                    transition: 'background 0.15s, color 0.15s',
                    textAlign: 'left', width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    if (tab !== t.key) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    if (tab !== t.key) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{
                    width: 28, height: 28, borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                    background: tab === t.key ? GRANATE : 'rgba(255,255,255,0.08)',
                    color: '#fff',
                  }}>
                    {t.icon}
                  </span>
                  {t.key}
                </button>
              ))}
            </nav>

            <div style={{ padding: '12px 10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button
                type="button"
                onClick={admin.reset}
                style={{
                  padding: '8px 12px', borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent', color: 'rgba(255,255,255,0.5)',
                  fontSize: 11, fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'inherit', textAlign: 'left',
                }}
              >
                Restaurar defaults
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '8px 12px', borderRadius: 6,
                  border: 'none', background: GRANATE, color: '#fff',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', textAlign: 'left',
                }}
              >
                Volver al sitio
              </button>
            </div>
          </motion.aside>

          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ flex: 1, overflow: 'auto', background: BG_WARM, padding: '32px 40px' }}
          >
            <div style={{ maxWidth: 800 }}>
              {tab === 'Equipo' && <EquipoTab admin={admin} />}
              {tab === 'Servicios' && <ServiciosTab admin={admin} />}
              {tab === 'FAQ' && <FAQTab admin={admin} />}
              {tab === 'Historia' && <HistoriaTab admin={admin} />}
              {tab === 'Metricas' && <MetricasTab />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --- Section wrapper --- */
function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px 0', color: TEXT_PRIMARY }}>{title}</h2>
      {desc && <p style={{ fontSize: 13, color: TEXT_SEC, margin: '0 0 24px 0' }}>{desc}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {children}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 6,
  border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
  background: '#fff', boxSizing: 'border-box',
};

/* --- Generic CRUD List (add button at top) --- */
function CrudList<T extends { id: string }>({
  items,
  fields,
  onAdd,
  onUpdate,
  onDelete,
  newItem,
  labels,
}: {
  items: T[];
  fields: (keyof T)[];
  onAdd: (item: Omit<T, 'id'>) => void;
  onUpdate: (id: string, data: Partial<T>) => void;
  onDelete: (id: string) => void;
  newItem: Omit<T, 'id'>;
  labels: Partial<Record<keyof T, string>>;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<T, 'id'>>(newItem);

  const fieldLabel = (f: keyof T) => labels[f] ?? (f as string);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {adding ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 10, border: '2px dashed rgba(122,26,26,0.2)', background: '#fff' }}>
          {fields.map((f) => (
            <div key={String(f)}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 4, color: TEXT_SEC }}>
                {fieldLabel(f)}
              </label>
              <input
                value={String((draft as any)[f] ?? '')}
                onChange={(e) => setDraft({ ...draft, [f]: e.target.value } as Omit<T, 'id'>)}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid rgba(0,0,0,0.08)', fontSize: 13,
                  background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => { setAdding(false); setDraft(newItem); }}
              style={chipBtn}>
              Cancelar
            </button>
            <button type="button" onClick={() => { onAdd(draft); setAdding(false); setDraft(newItem); }}
              style={{ ...chipBtn, background: GRANATE, color: '#fff', fontWeight: 600, border: 'none' }}>
              Agregar
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setAdding(true)}
          style={{
            padding: '12px', borderRadius: 8, border: '2px dashed rgba(122,26,26,0.15)',
            background: 'transparent', color: GRANATE, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
          + Agregar nuevo
        </button>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: '16px 20px', borderRadius: 10,
            background: '#fff', border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
          }}
        >
          {editing === item.id ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {fields.map((f) => (
                <div key={String(f)}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 4, color: TEXT_SEC }}>
                    {fieldLabel(f)}
                  </label>
                  <input
                    value={String((item as any)[f] ?? '')}
                    onChange={(e) => onUpdate(item.id, { [f]: e.target.value } as Partial<T>)}
                    style={{
                      width: '100%', padding: '8px 12px', borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.08)', fontSize: 13,
                      background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setEditing(null)}
                  style={chipBtn}>
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flex: 1, fontSize: 13, lineHeight: 1.6, color: TEXT_PRIMARY }}>
                {fields.map((f, i) => (
                  <span key={String(f)}>
                    {i > 0 && <span style={{ color: TEXT_SEC }}> &middot; </span>}
                    <strong>{fieldLabel(f)}:</strong> {String((item as any)[f] ?? '')}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                <button type="button" onClick={() => setEditing(item.id)}
                  style={{ ...chipBtn, background: 'rgba(122,26,26,0.08)', color: GRANATE, fontWeight: 600 }}>
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(item.id)}
                  style={{ ...chipBtn, background: 'rgba(192,57,43,0.08)', color: '#c0392b', fontWeight: 600 }}>
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const chipBtn: React.CSSProperties = {
  padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)',
  background: '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
  color: TEXT_SEC,
};

/* --- Tab wrappers --- */
function EquipoTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="Equipo" desc="Miembros del estudio contable.">
      <CrudList<Miembro>
        items={admin.equipo}
        fields={['nombre', 'rol', 'bio']}
        onAdd={admin.addMiembro}
        onUpdate={admin.updateMiembro}
        onDelete={admin.deleteMiembro}
        newItem={{ nombre: '', rol: '', bio: '' }}
        labels={{ nombre: 'Nombre', rol: 'Rol', bio: 'Bio' }}
      />
    </Section>
  );
}

function ServiciosTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="Servicios" desc="Servicios que se muestran en la pagina.">
      <CrudList<ServicioItem>
        items={admin.servicios}
        fields={['titulo', 'desc', 'detalle', 'publico', 'precio']}
        onAdd={admin.addServicio}
        onUpdate={admin.updateServicio}
        onDelete={admin.deleteServicio}
        newItem={{ titulo: '', desc: '', detalle: '', publico: '', precio: '' }}
        labels={{ titulo: 'Titulo', desc: 'Descripcion', detalle: 'Detalle', publico: 'Publico', precio: 'Precio' }}
      />
    </Section>
  );
}

function FAQTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="FAQ" desc="Preguntas frecuentes.">
      <CrudList<FAQItem>
        items={admin.faq}
        fields={['q', 'a']}
        onAdd={admin.addFAQ}
        onUpdate={admin.updateFAQ}
        onDelete={admin.deleteFAQ}
        newItem={{ q: '', a: '' }}
        labels={{ q: 'Pregunta', a: 'Respuesta' }}
      />
    </Section>
  );
}

function HistoriaTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="Historia" desc="Eventos de la linea de tiempo.">
      <CrudList<HistoriaItem>
        items={admin.historia}
        fields={['year', 'event']}
        onAdd={admin.addHistoria}
        onUpdate={admin.updateHistoria}
        onDelete={admin.deleteHistoria}
        newItem={{ year: '', event: '' }}
        labels={{ year: 'Ano', event: 'Evento' }}
      />
    </Section>
  );
}

/* --- Metricas Tab: simulated charts --- */
const METRICS = [
  { label: 'Clientes activos', value: 350, pct: 100, color: GRANATE },
  { label: 'Declaraciones anuales', value: 2000, pct: 85, color: '#2e7d32' },
  { label: 'Tasa de retencion', value: '98%', pct: 98, color: '#1565c0' },
  { label: 'Profesionales en equipo', value: 8, pct: 40, color: '#e65100' },
];

function MetricasTab() {
  return (
    <Section title="Metricas" desc="Indicadores clave del estudio (simulados).">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {METRICS.map((m) => (
          <div key={m.label} style={{
            background: '#fff', borderRadius: 10, padding: 24,
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: m.color, marginBottom: 4 }}>
              {m.value}
            </div>
            <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 16 }}>
              {m.label}
            </div>
            <div style={{
              height: 6, borderRadius: 3, background: BG_WARM, overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                style={{ height: '100%', borderRadius: 3, background: m.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px 0', color: TEXT_PRIMARY }}>
          Distribucion de servicios
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Liquidacion de Sueldos', pct: 35 },
            { label: 'Impuestos', pct: 25 },
            { label: 'Contabilidad General', pct: 20 },
            { label: 'Monotributo', pct: 12 },
            { label: 'Sociedades', pct: 5 },
            { label: 'Auditoria', pct: 3 },
          ].map((d) => (
            <div key={d.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4, color: TEXT_SEC }}>
                <span>{d.label}</span>
                <span style={{ fontWeight: 600, color: TEXT_PRIMARY }}>{d.pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: BG_WARM, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.pct}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ height: '100%', borderRadius: 4, background: GRANATE }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
