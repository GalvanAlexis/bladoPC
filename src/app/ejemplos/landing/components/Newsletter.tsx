'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section id="newsletter" className="lum-section lum-newsletter">
      <div className="lum-container">
        <div className="lum-newsletter-box">
          {sent ? (
            <div className="lum-newsletter-success">
              <div className="lum-newsletter-check">&#10003;</div>
              <h2 className="lum-newsletter-title">Beneficio enviado</h2>
              <p className="lum-newsletter-desc">
                Revisa tu bandeja de entrada. Te enviamos un cupon con el 10% OFF para tu primera compra.
              </p>
              <p className="lum-newsletter-code">
                LUMINA10
              </p>
              <button
                type="button"
                className="lum-newsletter-btn"
                onClick={() => setSent(false)}
              >
                Volver
              </button>
            </div>
          ) : (
            <>
              <h2 className="lum-newsletter-title">Recibi un 10% OFF en tu primera compra</h2>
              <p className="lum-newsletter-desc">
                Suscribite a nuestro newsletter y recibi consejos de cuidado facial, lanzamientos exclusivos y descuentos especiales.
              </p>
              <div className="lum-newsletter-form">
                <input
                  type="email"
                  defaultValue="ejemplo@correo.com"
                  className="lum-newsletter-input"
                  onFocus={(e) => {
                    if (e.target.value === 'ejemplo@correo.com') e.target.select();
                  }}
                />
                <button
                  type="button"
                  className="lum-newsletter-btn"
                  onClick={() => setSent(true)}
                >
                  Quiero mi descuento
                </button>
              </div>
              <p className="lum-newsletter-footnote">Sin spam. Puedes darte de baja en cualquier momento.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
