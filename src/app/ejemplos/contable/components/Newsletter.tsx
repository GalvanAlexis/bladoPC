'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const GRANATE = '#7a1a1a';
const GRANATE_LIGHT = '#9a2a2a';
const BG_WARM = '#f5f3f0';

export default function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="newsletter"
      style={{
        padding: 'clamp(60px, 10vh, 100px) 24px',
        background: `linear-gradient(135deg, ${GRANATE} 0%, ${GRANATE_LIGHT} 100%)`,
        color: '#fff',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div
              style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', fontSize: 24,
              }}
            >
              &#10003;
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, margin: '0 0 8px' }}>
              Suscripcion confirmada
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 24px', opacity: 0.85 }}>
              Gracias por suscribirte. Vas a recibir novedades impositivas, guias y recursos exclusivos directamente en tu correo.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              style={{
                padding: '10px 28px', borderRadius: 6,
                background: '#fff', color: GRANATE, border: 'none',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Volver
            </button>
          </motion.div>
        ) : (
          <>
            <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, margin: '0 0 8px' }}>
              Recibi novedades y recursos exclusivos
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 24px', opacity: 0.85 }}>
              Suscribite a nuestro newsletter y recibi guias impositivas, calendarios de vencimientos y consejos para tu negocio.
            </p>
            <div
              style={{
                display: 'flex', gap: 10, maxWidth: 440,
                margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center',
              }}
            >
              <input
                type="email"
                defaultValue="ejemplo@correo.com"
                onFocus={(e) => {
                  if (e.target.value === 'ejemplo@correo.com') e.target.select();
                }}
                style={{
                  flex: '1 1 200px', padding: '12px 16px', borderRadius: 6,
                  border: 'none', fontSize: 14,
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff', fontFamily: 'inherit', outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setSent(true)}
                style={{
                  padding: '12px 28px', borderRadius: 6,
                  background: '#fff', color: GRANATE, border: 'none',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', whiteSpace: 'nowrap',
                }}
              >
                Suscribirme
              </button>
            </div>
            <p style={{ fontSize: 11, marginTop: 16, opacity: 0.6 }}>
              Sin spam. Puedes darte de baja en cualquier momento.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
