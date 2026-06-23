'use client';

import { useRef, useCallback } from 'react';

const PRODUCT = {
  name: 'Lumina Serum Facial',
  desc: 'Serum facial organico con acido hialuronico, vitamina C y aceite de rosa mosqueta. Hidratacion profunda sin quimicos agresivos.',
  price: 24990,
  image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80',
  benefits: ['Hidratacion 24h', '100% Natural', 'Antioxidante Potente'],
  ingredients: ['Acido Hialuronico', 'Vitamina C', 'Rosa Mosqueta', 'Aloe Vera', 'Colageno Vegetal', 'Aceite de Jojoba'],
};

export default function Hero() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <>
      <section id="hero" className="lum-section lum-hero">
        <div className="lum-hero-divider" />
        <div className="lum-hero-content">
          <p className="lum-badge">Nueva formula 2026</p>
          <h1 className="lum-hero-title">
            Tu piel merece <span className="lum-accent">lo natural</span>
          </h1>
          <p className="lum-hero-desc">{PRODUCT.desc}</p>
          <div className="lum-hero-actions">
            <span className="lum-price">$24.990</span>
            <button onClick={openDialog} className="lum-btn lum-btn-primary">
              Comprar ahora
            </button>
          </div>
          <p className="lum-hero-footnote">Envio gratis a todo Argentina &middot; Paga en hasta 6 cuotas</p>
        </div>
        <div className="lum-hero-visual">
          <div className="lum-hero-glow" />
          <div className="lum-hero-img-wrap">
            <img
              src={PRODUCT.image}
              alt="Lumina Serum Facial"
              fetchPriority="high"
              width="320"
              height="460"
              className="lum-hero-img"
            />
          </div>
        </div>
      </section>

      <dialog ref={dialogRef} id="lum-quickview" className="lum-dialog" closedby="any">
        <form method="dialog" className="lum-dialog-form">
          <button type="submit" className="lum-dialog-close" aria-label="Cerrar">&times;</button>
          <div className="lum-dialog-grid">
            <div className="lum-dialog-img-wrap">
              <img src={PRODUCT.image} alt={PRODUCT.name} width="280" height="400" className="lum-dialog-img" />
            </div>
            <div className="lum-dialog-info">
              <h2 className="lum-dialog-title">{PRODUCT.name}</h2>
              <p className="lum-dialog-desc">{PRODUCT.desc}</p>
              <div className="lum-dialog-benefits">
                {PRODUCT.benefits.map((b) => (
                  <span key={b} className="lum-dialog-badge">{b}</span>
                ))}
              </div>
              <p className="lum-dialog-price">$ {PRODUCT.price.toLocaleString('es-AR')}</p>
              <label className="lum-dialog-qty-label">
                Cantidad
                <input type="number" defaultValue={1} min={1} max={10} className="lum-dialog-qty" />
              </label>
              <button
                type="button"
                className="lum-btn lum-btn-primary lum-dialog-cta"
                onClick={() => {
                  const toast = document.getElementById('lum-toast');
                  if (toast) {
                    (toast as HTMLDivElement).showPopover();
                    setTimeout(() => (toast as HTMLDivElement).hidePopover(), 2500);
                  }
                  dialogRef.current?.close();
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}
