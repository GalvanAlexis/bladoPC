'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRANATE = '#7a1a1a';
const BG_WARM = '#f5f3f0';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  label?: string;
  btnStyle?: React.CSSProperties;
}

export default function PresupuestoForm({ label = 'Solicitar presupuesto', btnStyle }: Props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [nombre] = useState('Juan Perez');
  const [contacto] = useState('juan@ejemplo.com');
  const [mensaje] = useState('Hola, quiero saber mas sobre sus servicios contables para mi negocio.');

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setState('success');
  }

  const handleClose = useCallback(() => {
    setOpen(false);
    setState('idle');
  }, []);

  const defaultBtn: React.CSSProperties = {
    display: 'inline-block', padding: '14px 36px', borderRadius: 6,
    background: '#fff', color: GRANATE, fontSize: 14, fontWeight: 600,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ ...defaultBtn, ...btnStyle }}
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.45)',
              padding: 24, boxSizing: 'border-box',
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 12,
                width: '100%', maxWidth: 440,
                boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 32, height: 32, borderRadius: '50%',
                  border: 'none', background: BG_WARM,
                  cursor: 'pointer', fontSize: 16, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: TEXT_SEC, fontFamily: 'inherit',
                }}
              >
                &#10005;
              </button>

              {state === 'success' ? (
                <div style={{ padding: 48, textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 16, color: GRANATE }}>&#10003;</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0', color: TEXT_PRIMARY }}>
                    Consulta enviada
                  </h3>
                  <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.5, margin: '0 0 24px 0' }}>
                    Gracias por tu consulta. Te contactaremos en menos de 24h.
                  </p>
                  <button
                    onClick={handleClose}
                    style={{
                      padding: '12px 32px', borderRadius: 6,
                      background: GRANATE, color: '#fff', fontSize: 14,
                      fontWeight: 600, border: 'none', cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ padding: 32 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px 0', color: TEXT_PRIMARY }}>
                    Solicitar presupuesto
                  </h2>
                  <p style={{ fontSize: 13, color: TEXT_SEC, margin: '0 0 24px 0', lineHeight: 1.5 }}>
                    Dejanos tus datos y te llamamos en menos de 24h.
                  </p>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                      Nombre
                    </label>
                    <input
                      required
                      readOnly
                      value={nombre}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: 6,
                        border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
                        background: '#f0ede8', boxSizing: 'border-box', cursor: 'default',
                        color: TEXT_PRIMARY,
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                      Email o telefono
                    </label>
                    <input
                      required
                      readOnly
                      value={contacto}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: 6,
                        border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
                        background: '#f0ede8', boxSizing: 'border-box', cursor: 'default',
                        color: TEXT_PRIMARY,
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                      Mensaje
                    </label>
                    <textarea
                      required
                      readOnly
                      value={mensaje}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: 6,
                        border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
                        background: '#f0ede8', boxSizing: 'border-box', cursor: 'default',
                        resize: 'vertical', minHeight: 80, color: TEXT_PRIMARY,
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      width: '100%', padding: '12px 24px', borderRadius: 6,
                      background: GRANATE, color: '#fff', fontSize: 14, fontWeight: 600,
                      border: 'none', cursor: state === 'loading' ? 'not-allowed' : 'pointer',
                      opacity: state === 'loading' ? 0.7 : 1,
                      fontFamily: 'inherit',
                    }}
                  >
                    {state === 'loading' ? 'Enviando...' : 'Enviar consulta'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
