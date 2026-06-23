'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin, Miembro, ServicioItem, FAQItem, RecursoItem } from '../hooks/useAdmin';

interface Props {
  open: boolean;
  onClose: () => void;
}

const GRANATE = '#7a1a1a';
const BG_WARM = '#f5f3f0';
const BG_SECTION = '#edeae5';
const TEXT_SEC = '#5a5550';

const TABS = ['Hero', 'Equipo', 'Servicios', 'FAQ', 'Recursos'] as const;

export default function AdminDashboard({ open, onClose }: Props) {
  const admin = useAdmin();
  const [tab, setTab] = useState<(typeof TABS)[number]>('Hero');

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="dash-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
            }}
          />
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 301,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
              padding: 24,
            }}
          >
            <motion.div
              key="dash-panel"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{
                pointerEvents: 'auto',
                width: 'min(95vw, 700px)',
                maxHeight: '90vh',
                borderRadius: 16,
                background: BG_WARM,
                boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px 0',
                }}
              >
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Panel de administracion</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar"
                  style={{
                    background: 'none', border: 'none', fontSize: 24,
                    color: TEXT_SEC, cursor: 'pointer', lineHeight: 1,
                    padding: '4px 8px',
                  }}
                >
                  &times;
                </button>
              </div>

              <div
                style={{
                  display: 'flex', gap: 4, padding: '16px 24px 0',
                  overflowX: 'auto', flexShrink: 0,
                }}
              >
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    style={{
                      padding: '8px 18px', borderRadius: '8px 8px 0 0',
                      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                      fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                      background: tab === t ? '#fff' : 'transparent',
                      color: tab === t ? GRANATE : TEXT_SEC,
                      boxShadow: tab === t ? '0 -1px 4px rgba(0,0,0,0.04)' : 'none',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div style={{ flex: 1, overflow: 'auto', padding: 20, background: '#fff', borderRadius: '0 12px 12px 12px' }}>
                {tab === 'Hero' && <HeroTab admin={admin} />}
                {tab === 'Equipo' && <EquipoTab admin={admin} />}
                {tab === 'Servicios' && <ServiciosTab admin={admin} />}
                {tab === 'FAQ' && <FAQTab admin={admin} />}
                {tab === 'Recursos' && <RecursosTab admin={admin} />}
              </div>

              <div
                style={{
                  padding: '12px 20px', borderTop: '1px solid rgba(0,0,0,0.04)',
                  display: 'flex', justifyContent: 'flex-end', gap: 8, flexShrink: 0,
                }}
              >
                <button
                  type="button"
                  onClick={admin.reset}
                  style={{
                    padding: '8px 16px', borderRadius: 6,
                    border: '1px solid rgba(0,0,0,0.1)',
                    background: '#fff', color: TEXT_SEC, fontSize: 12,
                    cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
                  }}
                >
                  Restaurar defaults
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '8px 20px', borderRadius: 6,
                    border: 'none', background: GRANATE, color: '#fff',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Hero Tab ─── */
function HeroTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#1a1a1a' }}>
          Tagline del Hero
        </label>
        <input
          value={admin.heroTagline}
          onChange={(e) => admin.update({ heroTagline: e.target.value })}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 6,
            border: '1px solid rgba(0,0,0,0.08)', fontSize: 14,
            background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#1a1a1a' }}>
          Descripcion del Hero
        </label>
        <textarea
          value={admin.heroDesc}
          onChange={(e) => admin.update({ heroDesc: e.target.value })}
          rows={3}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 6,
            border: '1px solid rgba(0,0,0,0.08)', fontSize: 14,
            background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
            resize: 'vertical',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Generic CRUD List ─── */
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
            padding: '14px 16px', borderRadius: 8,
            background: BG_WARM, border: '1px solid rgba(0,0,0,0.04)',
          }}
        >
          {editing === item.id ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {fields.map((f) => (
                <div key={String(f)}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 2, color: TEXT_SEC }}>
                    {fieldLabel(f)}
                  </label>
                  <input
                    value={String((item as any)[f] ?? '')}
                    onChange={(e) => onUpdate(item.id, { [f]: e.target.value } as Partial<T>)}
                    style={{
                      width: '100%', padding: '8px 12px', borderRadius: 4,
                      border: '1px solid rgba(0,0,0,0.08)', fontSize: 13,
                      background: '#fff', fontFamily: 'inherit', boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  style={{
                    padding: '6px 14px', borderRadius: 4, border: '1px solid rgba(0,0,0,0.1)',
                    background: '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ flex: 1, fontSize: 13, lineHeight: 1.5, color: '#1a1a1a' }}>
                {fields.map((f, i) => (
                  <span key={String(f)}>
                    {i > 0 && <span style={{ color: TEXT_SEC }}> &mdash; </span>}
                    <strong>{fieldLabel(f)}:</strong> {String((item as any)[f] ?? '')}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                <button type="button" onClick={() => setEditing(item.id)}
                  style={{ padding: '4px 10px', borderRadius: 4, border: 'none', background: 'rgba(122,26,26,0.08)', color: GRANATE, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(item.id)}
                  style={{ padding: '4px 10px', borderRadius: 4, border: 'none', background: 'rgba(192,57,43,0.08)', color: '#c0392b', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {adding && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderRadius: 8, border: '2px dashed rgba(122,26,26,0.2)', background: '#fff' }}>
          {fields.map((f) => (
            <div key={String(f)}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 2, color: TEXT_SEC }}>
                {fieldLabel(f)}
              </label>
              <input
                value={String((draft as any)[f] ?? '')}
                onChange={(e) => setDraft({ ...draft, [f]: e.target.value } as Omit<T, 'id'>)}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.08)', fontSize: 13,
                  background: BG_WARM, fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => { setAdding(false); setDraft(newItem); }}
              style={{ padding: '6px 14px', borderRadius: 4, border: '1px solid rgba(0,0,0,0.1)', background: '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
              Cancelar
            </button>
            <button type="button" onClick={() => { onAdd(draft); setAdding(false); setDraft(newItem); }}
              style={{ padding: '6px 14px', borderRadius: 4, border: 'none', background: GRANATE, color: '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
              Agregar
            </button>
          </div>
        </div>
      )}

      {!adding && (
        <button type="button" onClick={() => setAdding(true)}
          style={{ padding: '10px', borderRadius: 6, border: '2px dashed rgba(122,26,26,0.15)', background: 'transparent', color: GRANATE, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          + Agregar nuevo
        </button>
      )}
    </div>
  );
}

/* ─── Tab wrappers ─── */
function EquipoTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <CrudList<Miembro>
      items={admin.equipo}
      fields={['nombre', 'rol', 'bio']}
      onAdd={admin.addMiembro}
      onUpdate={admin.updateMiembro}
      onDelete={admin.deleteMiembro}
      newItem={{ nombre: '', rol: '', bio: '' }}
      labels={{ nombre: 'Nombre', rol: 'Rol', bio: 'Bio' }}
    />
  );
}

function ServiciosTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <CrudList<ServicioItem>
      items={admin.servicios}
      fields={['titulo', 'desc', 'publico', 'precio']}
      onAdd={admin.addServicio}
      onUpdate={admin.updateServicio}
      onDelete={admin.deleteServicio}
      newItem={{ titulo: '', desc: '', publico: '', precio: '' }}
      labels={{ titulo: 'Titulo', desc: 'Descripcion', publico: 'Publico', precio: 'Precio' }}
    />
  );
}

function FAQTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <CrudList<FAQItem>
      items={admin.faq}
      fields={['q', 'a']}
      onAdd={admin.addFAQ}
      onUpdate={admin.updateFAQ}
      onDelete={admin.deleteFAQ}
      newItem={{ q: '', a: '' }}
      labels={{ q: 'Pregunta', a: 'Respuesta' }}
    />
  );
}

function RecursosTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <CrudList<RecursoItem>
      items={admin.recursos}
      fields={['titulo', 'desc', 'popoverContent']}
      onAdd={admin.addRecurso}
      onUpdate={admin.updateRecurso}
      onDelete={admin.deleteRecurso}
      newItem={{ titulo: '', desc: '', popoverContent: '' }}
      labels={{ titulo: 'Titulo', desc: 'Descripcion', popoverContent: 'Contenido completo' }}
    />
  );
}
