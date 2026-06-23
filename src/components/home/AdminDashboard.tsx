'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin, HeroContent, ServiceItem, SkillItem, AboutItem } from '@/components/home/hooks/useAdmin';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabId = 'hero' | 'services' | 'skills' | 'about';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'hero', label: 'Hero', icon: 'H' },
  { id: 'services', label: 'Servicios', icon: 'S' },
  { id: 'skills', label: 'Skills', icon: 'K' },
  { id: 'about', label: 'About', icon: 'A' },
];

function HeroTab({ hero, onUpdate }: { hero: HeroContent; onUpdate: (h: Partial<HeroContent>) => void }) {
  const [local, setLocal] = useState(hero);
  useEffect(() => { setLocal(hero); }, [hero]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['tagline', 'headline1', 'headline2', 'description'] as const).map(field => (
        <div key={field}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
            {field === 'tagline' ? 'Tagline' : field === 'headline1' ? 'Headline 1' : field === 'headline2' ? 'Headline 2' : 'Descripcion'}
          </label>
          {field === 'description' ? (
            <textarea
              value={local[field]}
              onChange={e => { setLocal({ ...local, [field]: e.target.value }); onUpdate({ [field]: e.target.value }); }}
              rows={3}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          ) : (
            <input
              value={local[field]}
              onChange={e => { setLocal({ ...local, [field]: e.target.value }); onUpdate({ [field]: e.target.value }); }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function CrudList<T extends { id: string }>({
  items, fields, onUpdate, onDelete, onAdd, newItem, labels,
}: {
  items: T[];
  fields: { key: keyof T; label: string; type?: 'text' | 'textarea' | 'number' }[];
  onUpdate: (id: string, data: Partial<T>) => void;
  onDelete: (id: string) => void;
  onAdd: (item: T) => void;
  newItem: () => T;
  labels: { title: string; add: string };
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<T>>({});
  const [adding, setAdding] = useState(false);
  const [addData, setAddData] = useState<Partial<T>>({});

  const startEdit = (item: T) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const saveEdit = () => {
    if (editingId && editData) onUpdate(editingId, editData);
    setEditingId(null);
    setEditData({});
  };

  const startAdd = () => {
    setAdding(true);
    setAddData(newItem() as unknown as Partial<T>);
  };

  const saveAdd = () => {
    onAdd(addData as T);
    setAdding(false);
    setAddData({});
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>{labels.title}</h3>
        <button
          onClick={startAdd}
          style={{ padding: '6px 14px', borderRadius: '8px', border: '1px dashed var(--border)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: '12px', fontWeight: 500, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
        >
          + {labels.add}
        </button>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', marginBottom: '12px' }}
          >
            <div style={{ padding: '16px', background: 'var(--surface-2)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              {fields.map(f => (
                <div key={String(f.key)} style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', marginBottom: '4px', display: 'block' }}>{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={String(addData[f.key] ?? '')}
                      onChange={e => setAddData({ ...addData, [f.key]: e.target.value })}
                      rows={2}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  ) : (
                    <input
                      value={String(addData[f.key] ?? '')}
                      onChange={e => setAddData({ ...addData, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={saveAdd} style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Guardar</button>
                <button onClick={() => setAdding(false)} style={{ padding: '6px 14px', borderRadius: '6px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '12px' }}>Cancelar</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'var(--background)',
              border: editingId === item.id ? '1px solid var(--accent)' : '1px solid var(--border)',
              transition: 'border-color 0.2s',
            }}
          >
            {editingId === item.id ? (
              <div>
                {fields.map(f => (
                  <div key={String(f.key)} style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', marginBottom: '4px', display: 'block' }}>{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        value={String((editData as any)[f.key] ?? '')}
                        onChange={e => setEditData({ ...editData, [f.key]: e.target.value })}
                        rows={2}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--foreground)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    ) : (
                      <input
                        value={String((editData as any)[f.key] ?? '')}
                        onChange={e => setEditData({ ...editData, [f.key]: e.target.value })}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--foreground)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    )}
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button onClick={saveEdit} style={{ padding: '5px 12px', borderRadius: '6px', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Guardar</button>
                  <button onClick={() => setEditingId(null)} style={{ padding: '5px 12px', borderRadius: '6px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '12px' }}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  {fields.map(f => (
                    <div key={String(f.key)} style={{ fontSize: '13px', color: 'var(--foreground-2)', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--muted)', fontSize: '11px', marginRight: '6px' }}>{f.label}:</span>
                      {String(item[f.key] ?? '')}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button onClick={() => startEdit(item)} style={{ padding: '4px 10px', borderRadius: '6px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '11px', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
                  >Editar</button>
                  <button onClick={() => onDelete(item.id)} style={{ padding: '4px 10px', borderRadius: '6px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '11px', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
                  >Eliminar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('hero');
  const admin = useAdmin();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroTab hero={admin.hero} onUpdate={admin.updateHero} />;
      case 'services':
        return (
          <CrudList
            items={admin.services}
            fields={[
              { key: 'title', label: 'Titulo' },
              { key: 'subtitle', label: 'Subtitulo' },
              { key: 'desc', label: 'Descripcion', type: 'textarea' },
              { key: 'details', label: 'Detalle', type: 'textarea' },
            ]}
            onUpdate={(id, data) => admin.updateService(id, data)}
            onDelete={admin.deleteService}
            onAdd={admin.addService}
            newItem={() => ({
              id: `srv-${Date.now()}`,
              title: '', subtitle: '', desc: '', details: '',
              tags: [], localOnly: false,
            })}
            labels={{ title: 'Servicios', add: 'Agregar servicio' }}
          />
        );
      case 'skills':
        return (
          <CrudList
            items={admin.skills}
            fields={[
              { key: 'title', label: 'Titulo' },
              { key: 'desc', label: 'Descripcion', type: 'textarea' },
              { key: 'potency', label: 'Potencia (0-100)', type: 'number' },
              { key: 'color', label: 'Color (hex)' },
            ]}
            onUpdate={(id, data) => admin.updateSkill(id, data)}
            onDelete={admin.deleteSkill}
            onAdd={admin.addSkill}
            newItem={() => ({
              id: `sk-${Date.now()}`,
              icon: '⬡', title: '', desc: '', details: '',
              tags: [], potency: 80, color: '#e11d48',
            })}
            labels={{ title: 'Skills', add: 'Agregar skill' }}
          />
        );
      case 'about':
        return (
          <CrudList
            items={admin.about}
            fields={[
              { key: 'title', label: 'Titulo' },
              { key: 'desc', label: 'Descripcion', type: 'textarea' },
              { key: 'details', label: 'Detalle', type: 'textarea' },
            ]}
            onUpdate={(id, data) => admin.updateAbout(id, data)}
            onDelete={admin.deleteAbout}
            onAdd={admin.addAbout}
            newItem={() => ({
              id: `ab-${Date.now()}`,
              title: '', desc: '', details: '',
              tags: [],
            })}
            labels={{ title: 'Biografia', add: 'Agregar capitulo' }}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'var(--background)',
        display: 'flex',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '200px',
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--foreground)', margin: 0, letterSpacing: '-0.02em' }}>
            Panel
          </h2>
          <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '2px 0 0' }}>Portfolio Blado</p>
        </div>

        <nav style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'var(--accent-dim)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--muted)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: activeTab === tab.id ? 600 : 400,
                transition: 'all 0.15s',
                textAlign: 'left',
                width: '100%',
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--foreground)'; } }}
              onMouseLeave={e => { if (activeTab !== tab.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; } }}
            >
              <span style={{ width: '22px', height: '22px', borderRadius: '6px', background: activeTab === tab.id ? 'var(--accent)' : 'var(--surface-2)', color: activeTab === tab.id ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={admin.reset}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: '12px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            Restaurar defaults
          </button>
          <button
            onClick={onClose}
            style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
          >
            Volver al sitio
          </button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, overflow: 'auto', padding: '32px', background: 'var(--background)' }}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ maxWidth: '700px' }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </motion.div>
  );
}
