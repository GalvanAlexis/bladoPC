'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin, Miembro, ServicioItem, FAQItem, RecursoItem } from '../hooks/useAdmin';

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
  { key: 'Hero', icon: 'H' },
  { key: 'Equipo', icon: 'U' },
  { key: 'Servicios', icon: 'S' },
  { key: 'FAQ', icon: '?' },
  { key: 'Recursos', icon: 'R' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function AdminDashboard({ open, onClose }: Props) {
  const admin = useAdmin();
  const [tab, setTab] = useState<TabKey>('Hero');

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
          {/* --- Sidebar --- */}
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

          {/* --- Content --- */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ flex: 1, overflow: 'auto', background: BG_WARM, padding: '32px 40px' }}
          >
            <div style={{ maxWidth: 800 }}>
              {tab === 'Hero' && <HeroTab admin={admin} />}
              {tab === 'Equipo' && <EquipoTab admin={admin} />}
              {tab === 'Servicios' && <ServiciosTab admin={admin} />}
              {tab === 'FAQ' && <FAQTab admin={admin} />}
              {tab === 'Recursos' && <RecursosTab admin={admin} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --- Hero Tab --- */
function HeroTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="Hero" desc="Texto principal que se ve arriba de todo.">
      <Field label="Tagline del Hero">
        <input
          value={admin.heroTagline}
          onChange={(e) => admin.update({ heroTagline: e.target.value })}
          style={inputStyle}
        />
      </Field>
      <Field label="Descripcion del Hero">
        <textarea
          value={admin.heroDesc}
          onChange={(e) => admin.update({ heroDesc: e.target.value })}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </Field>
    </Section>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: TEXT_PRIMARY }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 6,
  border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
  background: '#fff', boxSizing: 'border-box',
};

/* --- Generic CRUD List --- */
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

      {adding && (
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
      )}

      {!adding && (
        <button type="button" onClick={() => setAdding(true)}
          style={{
            padding: '12px', borderRadius: 8, border: '2px dashed rgba(122,26,26,0.15)',
            background: 'transparent', color: GRANATE, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
          + Agregar nuevo
        </button>
      )}
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

function RecursosTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="Recursos" desc="Recursos y guias descargables.">
      <CrudList<RecursoItem>
        items={admin.recursos}
        fields={['titulo', 'desc', 'popoverContent']}
        onAdd={admin.addRecurso}
        onUpdate={admin.updateRecurso}
        onDelete={admin.deleteRecurso}
        newItem={{ titulo: '', desc: '', popoverContent: '' }}
        labels={{ titulo: 'Titulo', desc: 'Descripcion', popoverContent: 'Contenido completo' }}
      />
    </Section>
  );
}
