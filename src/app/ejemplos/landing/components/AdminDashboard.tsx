'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin, Testimonial } from '../hooks/useAdmin';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = 'images' | 'prices' | 'testimonials';

export default function AdminDashboard({ open, onClose }: Props) {
  const { galleryImages, mainPrice, addonPrice, testimonials, update, updateImage, addTestimonial, updateTestimonial, deleteTestimonial, reset } = useAdmin();
  const [tab, setTab] = useState<Tab>('images');

  const [newTName, setNewTName] = useState('');
  const [newTText, setNewTText] = useState('');
  const [newTRating, setNewTRating] = useState(5);
  const [editTId, setEditTId] = useState<string | null>(null);

  const handleAddOrEditTestimonial = () => {
    if (!newTName.trim() || !newTText.trim()) return;
    if (editTId) {
      updateTestimonial(editTId, { name: newTName.trim(), text: newTText.trim(), rating: newTRating });
    } else {
      addTestimonial({ name: newTName.trim(), text: newTText.trim(), rating: newTRating });
    }
    setNewTName('');
    setNewTText('');
    setNewTRating(5);
    setEditTId(null);
  };

  const startEdit = (t: Testimonial) => {
    setNewTName(t.name);
    setNewTText(t.text);
    setNewTRating(t.rating);
    setEditTId(t.id);
  };

  const cancelEdit = () => {
    setNewTName('');
    setNewTText('');
    setNewTRating(5);
    setEditTId(null);
  };

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
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            }}
          />
          <motion.aside
            key="dash-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(85vw, 420px)',
              zIndex: 301,
              background: 'var(--lum-bg)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
            }}
          >
            <div className="lum-dash-header">
              <h2 className="lum-dash-title">
                Panel de control
                <span className="lum-cart-close" onClick={onClose}>&times;</span>
              </h2>
            </div>

            <div className="lum-dash-tabs">
              {(['images', 'prices', 'testimonials'] as Tab[]).map((t) => (
                <button
                  key={t}
                  className={`lum-dash-tab ${tab === t ? 'lum-dash-tab-active' : ''}`}
                  onClick={() => setTab(t)}
                >
                  {t === 'images' ? 'Imagenes' : t === 'prices' ? 'Precios' : 'Recomendados'}
                </button>
              ))}
            </div>

            <div className="lum-dash-body">
              {tab === 'images' && (
                <div className="lum-dash-section">
                  <p className="lum-dash-label">URLs de las imagenes de galeria</p>
                  {galleryImages.map((src, i) => (
                    <div key={i} className="lum-dash-field">
                      <label className="lum-dash-field-label">Imagen {i + 1}</label>
                      <input
                        className="lum-dash-input"
                        value={src}
                        onChange={(e) => updateImage(i, e.target.value)}
                      />
                      <img src={src} alt="" className="lum-dash-preview" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  ))}
                </div>
              )}

              {tab === 'prices' && (
                <div className="lum-dash-section">
                  <p className="lum-dash-label">Precios del producto</p>
                  <div className="lum-dash-field">
                    <label className="lum-dash-field-label">Lumina Serum Facial ($)</label>
                    <input
                      className="lum-dash-input"
                      type="number"
                      min={0}
                      value={mainPrice}
                      onChange={(e) => update({ mainPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div className="lum-dash-field">
                    <label className="lum-dash-field-label">Protector Solar SPF 50+ ($)</label>
                    <input
                      className="lum-dash-input"
                      type="number"
                      min={0}
                      value={addonPrice}
                      onChange={(e) => update({ addonPrice: Number(e.target.value) })}
                    />
                  </div>
                </div>
              )}

              {tab === 'testimonials' && (
                <div className="lum-dash-section">
                  <p className="lum-dash-label">Agregar / editar recomendado</p>
                  <div className="lum-dash-field">
                    <input
                      className="lum-dash-input"
                      placeholder="Nombre"
                      value={newTName}
                      onChange={(e) => setNewTName(e.target.value)}
                    />
                  </div>
                  <div className="lum-dash-field">
                    <textarea
                      className="lum-dash-input lum-dash-textarea"
                      placeholder="Texto del testimonio"
                      value={newTText}
                      onChange={(e) => setNewTText(e.target.value)}
                    />
                  </div>
                  <div className="lum-dash-field">
                    <label className="lum-dash-field-label">Rating: {newTRating} estrella(s)</label>
                    <input
                      className="lum-dash-input"
                      type="range"
                      min={1}
                      max={5}
                      value={newTRating}
                      onChange={(e) => setNewTRating(Number(e.target.value))}
                    />
                  </div>
                  <div className="lum-dash-rowbtns">
                    <button className="lum-btn lum-btn-primary" onClick={handleAddOrEditTestimonial}>
                      {editTId ? 'Guardar cambios' : 'Agregar'}
                    </button>
                    {editTId && (
                      <button className="lum-btn" style={{ background: 'rgba(184,118,118,0.1)', color: 'var(--lum-muted)' }} onClick={cancelEdit}>
                        Cancelar
                      </button>
                    )}
                  </div>

                  <div className="lum-dash-list">
                    {testimonials.map((t) => (
                      <div key={t.id} className="lum-dash-list-item">
                        <div className="lum-dash-list-info">
                          <strong>{t.name}</strong>
                          <p className="lum-dash-list-text">{t.text.slice(0, 80)}...</p>
                          <span className="lum-dash-list-rating">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
                        </div>
                        <div className="lum-dash-list-actions">
                          <button className="lum-dash-list-btn" onClick={() => startEdit(t)} title="Editar">&#9998;</button>
                          <button className="lum-dash-list-btn lum-dash-list-del" onClick={() => deleteTestimonial(t.id)} title="Eliminar">&times;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lum-dash-footer">
              <button className="lum-btn" style={{ background: 'rgba(184,118,118,0.1)', color: 'var(--lum-muted)', width: '100%' }} onClick={reset}>
                Restaurar valores predeterminados
              </button>
              <button className="lum-btn lum-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={onClose}>
                Cerrar panel
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
