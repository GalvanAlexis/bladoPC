'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import Galeria, { GALERIA_IMAGES } from './Galeria';

export const PRODUCT = {
  name: 'Lumina Serum Facial',
  desc: 'Serum facial organico con acido hialuronico, vitamina C y aceite de rosa mosqueta. Hidratacion profunda sin quimicos agresivos.',
  price: 24990,
  benefits: ['Hidratacion 24h', '100% Natural', 'Antioxidante Potente'],
  ingredients: ['Acido Hialuronico', 'Vitamina C', 'Rosa Mosqueta', 'Aloe Vera', 'Colageno Vegetal', 'Aceite de Jojoba'],
};

export default function Hero() {
  const [showDialog, setShowDialog] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(sectionRef);

  const rotateX = mouse.isWithin ? (mouse.progressY - 0.5) * -10 : 0;
  const rotateY = mouse.isWithin ? (mouse.progressX - 0.5) * 10 : 0;

  const openDialog = useCallback(() => setShowDialog(true), []);
  const closeDialog = useCallback(() => setShowDialog(false), []);

  const handleAddToCart = useCallback(() => {
    toastRef.current?.showPopover();
    setTimeout(() => toastRef.current?.hidePopover(), 2500);
    closeDialog();
  }, [closeDialog]);

  return (
    <>
      <section id="hero" ref={sectionRef} className="lum-section lum-hero">
        <div className="lum-hero-divider" />
        <div className="lum-hero-content">
          <motion.p
            className="lum-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nueva formula 2026
          </motion.p>
          <motion.h1
            className="lum-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tu piel merece <span className="lum-accent">lo natural</span>
          </motion.h1>
          <motion.p
            className="lum-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {PRODUCT.desc}
          </motion.p>
          <motion.div
            className="lum-hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.span
              className="lum-price"
              layoutId="lum-product-price"
            >
              ${PRODUCT.price.toLocaleString('es-AR')}
            </motion.span>
            <motion.button
              onClick={openDialog}
              className="lum-btn lum-btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              layoutId="lum-product-cta"
            >
              Comprar ahora
            </motion.button>
          </motion.div>
          <motion.p
            className="lum-hero-footnote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.65 }}
          >
            Envio gratis a todo Argentina · Paga en hasta 6 cuotas
          </motion.p>
        </div>
        <div className="lum-hero-visual">
          <div className="lum-hero-glow" />
          <Galeria rotateX={rotateX} rotateY={rotateY} />
        </div>
      </section>

      <AnimatePresence>
        {showDialog && (
          <>
            <motion.div
              key="lum-dialog-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)', zIndex: 150,
              }}
            />
            <div
              style={{
                position: 'fixed', inset: 0, zIndex: 151,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <motion.article
                key="lum-dialog"
                layoutId="lum-product-card"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="lum-dialog"
                style={{
                  pointerEvents: 'auto',
                  width: 'min(92vw, 680px)',
                  maxHeight: '85dvh',
                  overflow: 'auto',
                  margin: 16,
                  borderRadius: 20,
                  background: 'var(--lum-bg)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
                  color: 'var(--lum-text)',
                }}
              >
                <button
                  onClick={closeDialog}
                  aria-label="Cerrar"
                  style={{
                    position: 'absolute', top: 12, right: 16,
                    background: 'none', border: 'none', fontSize: 28,
                    color: 'var(--lum-muted)', cursor: 'pointer', zIndex: 2, lineHeight: 1,
                  }}
                >
                  &times;
                </button>
                <div className="lum-dialog-grid">
                  <div className="lum-dialog-img-wrap">
                    <motion.img
                      src={GALERIA_IMAGES[0].src}
                      alt={PRODUCT.name}
                      width="280"
                      height="400"
                      className="lum-dialog-img"
                      layoutId="lum-product-image"
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    />
                  </div>
                  <div className="lum-dialog-info">
                    <h2 className="lum-dialog-title">{PRODUCT.name}</h2>
                    <p className="lum-dialog-desc">{PRODUCT.desc}</p>
                    <div className="lum-dialog-benefits">
                      {PRODUCT.benefits.map((b) => (
                        <span key={b} className="lum-dialog-badge">{b}</span>
                      ))}
                    </div>
                    <motion.p
                      className="lum-dialog-price"
                      layoutId="lum-product-price"
                    >
                      $ {PRODUCT.price.toLocaleString('es-AR')}
                    </motion.p>
                    <label className="lum-dialog-qty-label">
                      Cantidad
                      <input type="number" defaultValue={1} min={1} max={10} className="lum-dialog-qty" />
                    </label>
                    <motion.button
                      type="button"
                      className="lum-btn lum-btn-primary lum-dialog-cta"
                      onClick={handleAddToCart}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      layoutId="lum-product-cta"
                    >
                      Agregar al carrito
                    </motion.button>
                  </div>
              </div>
            </motion.article>
            </div>
          </>
        )}
      </AnimatePresence>

      <div ref={toastRef} id="lum-toast" popover="manual" role="status">
        Agregado al carrito correctamente
      </div>
    </>
  );
}
