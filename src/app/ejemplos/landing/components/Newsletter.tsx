export default function Newsletter() {
  return (
    <section id="newsletter" className="lum-section lum-newsletter">
      <div className="lum-container">
        <div className="lum-newsletter-box">
          <h2 className="lum-newsletter-title">Recibi un 10% OFF en tu primera compra</h2>
          <p className="lum-newsletter-desc">
            Suscribite a nuestro newsletter y recibi consejos de cuidado facial, lanzamientos exclusivos y descuentos especiales.
          </p>
          <div className="lum-newsletter-form">
            <input type="email" placeholder="tu@email.com" readOnly className="lum-newsletter-input" />
            <button
              type="button"
              className="lum-newsletter-btn"
              onClick={() => {
                const toast = document.getElementById('lum-toast');
                if (toast) {
                  (toast as HTMLDivElement).showPopover();
                  setTimeout(() => (toast as HTMLDivElement).hidePopover(), 2500);
                }
              }}
            >
              Quiero mi descuento
            </button>
          </div>
          <p className="lum-newsletter-footnote">Sin spam. Puedes darte de baja en cualquier momento.</p>
        </div>
      </div>
    </section>
  );
}
