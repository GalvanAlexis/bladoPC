'use client';

import { useState } from 'react';
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setState('success');
  }

  function handleClose() {
    setOpen(false);
    setState('idle');
  }

  const defaultBtn: React.CSSProperties = {
    display: 'inline-block', padding: '14px 36px', borderRadius: 6,
    background: '#fff', color: GRANATE, fontSize: 14, fontWeight: 600,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <button
        onClick={() => { setOpen(!open); setState('idle'); }}
        style={{ ...defaultBtn, ...btnStyle }}
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', marginTop: 12 }}
          >
            {state === 'success' ? (
              <div style={{
                background: '#fff', borderRadius: 10, padding: 32,
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 40, marginBottom: 12, color: GRANATE }}>&#10003;</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px 0', color: TEXT_PRIMARY }}>
                  Consulta enviada
                </h3>
                <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  Gracias por tu consulta. Te contactaremos en menos de 24h.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    padding: '10px 24px', borderRadius: 6,
                    border: '1px solid rgba(0,0,0,0.08)', background: '#fff',
                    color: TEXT_SEC, fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background: '#fff', borderRadius: 10, padding: 24,
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                    Nombre
                  </label>
                  <input
                    required
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
                      background: BG_WARM, boxSizing: 'border-box',
                    }}
                    placeholder="Tu nombre"
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                    Email o telefono
                  </label>
                  <input
                    required
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
                      background: BG_WARM, boxSizing: 'border-box',
                    }}
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                    Mensaje
                  </label>
                  <textarea
                    required
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
                      background: BG_WARM, boxSizing: 'border-box',
                      resize: 'vertical', minHeight: 80,
                    }}
                    placeholder="Contame de tu negocio y en que necesitas ayuda..."
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
        )}
      </AnimatePresence>
    </div>
  );
}
