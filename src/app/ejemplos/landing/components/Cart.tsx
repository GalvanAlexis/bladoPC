'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../hooks/useAdmin';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Cart({ open, onClose }: Props) {
  const { mainPrice, addonPrice } = useAdmin();
  const [qty, setQty] = useState(1);
  const [hasAddon, setHasAddon] = useState(false);
  const [status, setStatus] = useState<'idle' | 'paying' | 'success'>('idle');

  const ADDON = { name: 'Protector Solar SPF 50+', price: addonPrice };
  const unitPrice = mainPrice;
  const subtotal = unitPrice * qty;
  const hasDiscount = qty >= 2;
  const discount = hasDiscount ? Math.round(subtotal * 0.2) : 0;
  const addonTotal = hasAddon ? ADDON.price : 0;
  const total = subtotal - discount + addonTotal;

  const handleCheckout = () => {
    setStatus('paying');
    setTimeout(() => setStatus('success'), 2000);
  };

  const handleReset = () => {
    setStatus('idle');
    setQty(1);
    setHasAddon(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={status === 'success' ? undefined : onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            }}
          />
          <motion.aside
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(85vw, 400px)',
              zIndex: 201,
              background: 'var(--lum-bg)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
            }}
          >
            {status === 'success' ? (
              <div className="lum-cart-success">
                <div className="lum-cart-check">&#10003;</div>
                <h2 className="lum-cart-success-title">Pago exitoso</h2>
                <p className="lum-cart-success-desc">
                  Gracias por tu compra. Tu pedido sera procesado en las proximas 24hs.
                </p>
                <div className="lum-cart-success-details">
                  <span>Pago ID: MP-{String(Math.floor(Math.random() * 90000000) + 10000000)}</span>
                  <span>Medio: Mercado Pago</span>
                  <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--lum-primary)' }}>
                    Total: ${total.toLocaleString('es-AR')}
                  </span>
                </div>
                <button className="lum-btn lum-btn-primary" onClick={handleReset}>
                  Seguir comprando
                </button>
              </div>
            ) : status === 'paying' ? (
              <div className="lum-cart-paying">
                <div className="lum-cart-spinner" />
                <p>Procesando pago con Mercado Pago...</p>
                <p style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>
                  No cierres esta ventana
                </p>
              </div>
            ) : (
              <div className="lum-cart-layout">
                <div className="lum-cart-header">
                  <h2 className="lum-cart-title">
                    Carrito
                    <span className="lum-cart-close" onClick={onClose}>&times;</span>
                  </h2>
                </div>

                <div className="lum-cart-body">
                  <div className="lum-cart-item">
                    <div className="lum-cart-item-img-wrap">
                      <img
                        src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=120&q=80"
                        alt="Lumina Serum"
                        width="64"
                        height="90"
                        className="lum-cart-item-img"
                      />
                    </div>
                    <div className="lum-cart-item-info">
                      <p className="lum-cart-item-name">Lumina Serum Facial</p>
                      <p className="lum-cart-item-price">$ {unitPrice.toLocaleString('es-AR')} c/u</p>
                      <div className="lum-cart-qty">
                        <button className="lum-cart-qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                        <span>{qty}</span>
                        <button className="lum-cart-qty-btn" onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
                      </div>
                    </div>
                  </div>

                  {hasDiscount && (
                    <div className="lum-cart-promo">
                      <span className="lum-cart-promo-icon">&#9733;</span>
                      <div>
                        <p className="lum-cart-promo-title">Oferta 2 unidades</p>
                        <p className="lum-cart-promo-desc">Ahorras ${discount.toLocaleString('es-AR')} (20% OFF)</p>
                      </div>
                    </div>
                  )}

                  <label className="lum-cart-addon">
                    <input
                      type="checkbox"
                      checked={hasAddon}
                      onChange={() => setHasAddon(!hasAddon)}
                      className="lum-cart-checkbox"
                    />
                    <div>
                      <p className="lum-cart-addon-name">{ADDON.name}</p>
                      <p className="lum-cart-addon-price">$ {ADDON.price.toLocaleString('es-AR')}</p>
                    </div>
                  </label>
                </div>

                <div className="lum-cart-footer">
                  <div className="lum-cart-summary">
                    <div className="lum-cart-row">
                      <span>Subtotal ({qty} uds)</span>
                      <span>$ {subtotal.toLocaleString('es-AR')}</span>
                    </div>
                    {hasDiscount && (
                      <div className="lum-cart-row lum-cart-row-discount">
                        <span>Descuento 20%</span>
                        <span>- $ {discount.toLocaleString('es-AR')}</span>
                      </div>
                    )}
                    {hasAddon && (
                      <div className="lum-cart-row">
                        <span>{ADDON.name}</span>
                        <span>$ {ADDON.price.toLocaleString('es-AR')}</span>
                      </div>
                    )}
                    <div className="lum-cart-divider" />
                    <div className="lum-cart-row lum-cart-row-total">
                      <span>Total</span>
                      <span>$ {total.toLocaleString('es-AR')}</span>
                    </div>
                  </div>

                  <button
                    className="lum-btn lum-btn-primary lum-cart-checkout"
                    onClick={handleCheckout}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Pagar con Mercado Pago
                  </button>

                  <p className="lum-cart-footer-note">
                    Mercado Pago acepta tarjetas de credito, debito y efectivo
                  </p>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
