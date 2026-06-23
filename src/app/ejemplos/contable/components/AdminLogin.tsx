'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const GRANATE = '#7a1a1a';

export default function AdminLogin({ open, onClose, onSuccess }: Props) {
  const [user, setUser] = useState('admin');
  const [pass, setPass] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin123') {
      setError('');
      setUser('');
      setPass('');
      onSuccess();
    } else {
      setError('Usuario o contrasena incorrectos');
    }
  };

  const handleClose = () => {
    setError('');
    setUser('');
    setPass('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="login-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
            }}
          >
            <motion.form
              key="login-dialog"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onSubmit={handleSubmit}
              style={{
                pointerEvents: 'auto',
                width: 'min(90vw, 360px)',
                borderRadius: 20,
                background: '#f5f3f0',
                boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
                padding: '32px 28px',
                color: '#1a1a1a',
              }}
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar"
                style={{
                  position: 'absolute', top: 12, right: 16,
                  background: 'none', border: 'none', fontSize: 26,
                  color: '#5a5550', cursor: 'pointer', lineHeight: 1,
                }}
              >
                &times;
              </button>
              <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700 }}>
                Acceso administrativo
              </h2>
              <p style={{ margin: '0 0 20px', fontSize: 13, color: '#5a5550' }}>
                Ingresa con tus credenciales
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input
                  type="text"
                  placeholder="Usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  style={{
                    padding: '12px 16px', borderRadius: 10,
                    border: '1px solid rgba(122,26,26,0.2)',
                    background: 'transparent', color: '#1a1a1a', fontSize: 14, outline: 'none',
                  }}
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="Contrasena"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  style={{
                    padding: '12px 16px', borderRadius: 10,
                    border: '1px solid rgba(122,26,26,0.2)',
                    background: 'transparent', color: '#1a1a1a', fontSize: 14, outline: 'none',
                  }}
                />
                {error && (
                  <p style={{ margin: 0, fontSize: 12, color: '#c0392b' }}>{error}</p>
                )}
                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '12px 24px', borderRadius: 10,
                    background: GRANATE, color: '#fff', border: 'none',
                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'inherit', marginTop: 4,
                  }}
                >
                  Ingresar
                </button>
              </div>
            </motion.form>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
