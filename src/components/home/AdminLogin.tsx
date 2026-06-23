'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLogin({ isOpen, onClose, onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setError('');
      setUsername('');
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError('Usuario o contrasena incorrectos');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 200,
            }}
          />
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 201,
              padding: '20px',
              pointerEvents: 'none',
            }}
          >
            <motion.form
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onSubmit={handleSubmit}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderTop: '2px solid var(--accent)',
                borderRadius: '14px',
                padding: '32px',
                width: '100%',
                maxWidth: '360px',
                pointerEvents: 'auto',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  padding: '8px',
                  fontSize: '14px',
                  lineHeight: 1,
                  borderRadius: '4px',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
              >
                {'\u2715'}
              </button>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--foreground)', margin: '0 0 4px' }}>
                Acceso Administrador
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 24px' }}>
                Ingresá tus credenciales para gestionar el portfolio
              </p>

              {error && (
                <div
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(225,29,72,0.1)',
                    border: '1px solid rgba(225,29,72,0.3)',
                    borderRadius: '8px',
                    color: 'var(--accent)',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(''); }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '14px',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                />
                <input
                  type="password"
                  placeholder="Contrasena"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '14px',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '4px',
                    border: 'none',
                    cursor: 'pointer',
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
