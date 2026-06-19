'use client';

import Link from 'next/link';
import { useState } from 'react';

const accent = '#ea580c';
const accentLight = '#f97316';
const accentDark = '#c2410c';

const CATEGORIES = [
  { id: 'burgers', name: 'Hamburguesas', emoji: '🍔' },
  { id: 'pizzas', name: 'Pizzas', emoji: '🍕' },
  { id: 'salads', name: 'Ensaladas', emoji: '🥗' },
  { id: 'drinks', name: 'Bebidas', emoji: '🥤' },
  { id: 'desserts', name: 'Postres', emoji: '🍰' },
];

interface Item {
  id: string; name: string; desc: string; price: number;
  category: string; image: string; badge?: string;
}

const MENU: Item[] = [
  { id: 's001', name: 'Sabor Burger', desc: 'Doble carne, cheddar, bacon, cebolla caramelizada y salsa especial', price: 4200, category: 'burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', badge: 'Mas pedido' },
  { id: 's002', name: 'Veggie Burger', desc: 'Medallon de lentejas y quinoa, palta, tomate y mayonesa vegana', price: 3600, category: 'burgers', image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&q=80' },
  { id: 's003', name: 'Cheddar Crunch', desc: 'Carne smash, cheddar fundido, cebolla crispy y salsa BBQ', price: 3900, category: 'burgers', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80', badge: 'Nuevo' },
  { id: 's004', name: 'Muzza Clasica', desc: 'Mozzarella, oregano, salsa de tomate artesanal', price: 3800, category: 'pizzas', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
  { id: 's005', name: 'Napolitana', desc: 'Mozzarella, rodajas de tomate, ajo y albahaca fresca', price: 4200, category: 'pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', badge: 'Popular' },
  { id: 's006', name: 'Rucula & Crudo', desc: 'Mozzarella, rucula, jamon crudo y parmesano en escamas', price: 4800, category: 'pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
  { id: 's007', name: 'Caesar Bowl', desc: 'Lechuga fresca, pollo grillado, croutons, parmesano y aderezo Caesar', price: 3200, category: 'salads', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80' },
  { id: 's008', name: 'Bowl Mediterraneo', desc: 'Quinoa, hummus, pepino, tomate cherry, aceitunas y falafel', price: 3600, category: 'salads', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', badge: 'Vegano' },
  { id: 's009', name: 'Limonada Natural', desc: 'Limonada exprimida con menta y jengibre. Sin azucar anadida', price: 1800, category: 'drinks', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80' },
  { id: 's010', name: 'Cerveza Artesanal', desc: 'IPA dorada 473ml. Cerveza local de la casa', price: 2200, category: 'drinks', image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=400&q=80' },
  { id: 's011', name: 'Cheesecake de la Casa', desc: 'Cheesecake cremoso con salsa de frutos rojos', price: 2800, category: 'desserts', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80', badge: 'Casero' },
  { id: 's012', name: 'Brownie con Helado', desc: 'Brownie de chocolate belga con helado de crema americana', price: 3200, category: 'desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80' },
];

const DELIVERY_FEE = 600;
const MIN_ORDER = 2000;

export default function DeliveryHome() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ item: MENU.find((m) => m.id === id)!, qty }))
    .filter((e) => e.item);

  const subtotal = cartItems.reduce((a, e) => a + e.item.price * e.qty, 0);
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  function addItem(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const item = MENU.find((m) => m.id === id);
    if (item) {
      setToast(item.name);
      setTimeout(() => setToast(null), 2000);
    }
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) => {
      const next = { ...prev };
      const qty = (next[id] || 0) + delta;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }

  const filtered = MENU.filter((m) => m.category === activeCat);

  return (
    <div className="se-full">
      <style>{`
        .se-full {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: var(--se-bg);
          color: var(--se-text);
          min-height: 100dvh;
        }
        :root {
          --se-bg: #fafaf9;
          --se-surface: #fff;
          --se-surface-2: #f5f5f4;
          --se-text: #1c1917;
          --se-text-secondary: #78716c;
          --se-border: #e7e5e4;
          color-scheme: light dark;
        }
        .se-dark {
          --se-bg: #0f0d0c;
          --se-surface: #1c1917;
          --se-surface-2: #292524;
          --se-text: #e7e5e4;
          --se-text-secondary: #a8a29e;
          --se-border: #44403c;
          color-scheme: dark;
        }
        .se-header {
          position: sticky; top: 0; z-index: 100;
          background: var(--se-surface);
          border-bottom: 1px solid var(--se-border);
        }
        .se-cat-scroll {
          display: flex; gap: 8px; overflow-x: auto;
          scrollbar-width: none; padding: 0 24px 12px;
          -ms-overflow-style: none;
        }
        .se-cat-scroll::-webkit-scrollbar { display: none; }
        .se-cat-pill {
          flex-shrink: 0; padding: 8px 18px; border-radius: 50px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          border: 1px solid var(--se-border);
          background: var(--se-surface); color: var(--se-text-secondary);
          transition: all 0.2s;
          white-space: nowrap;
        }
        .se-cat-pill.active {
          background: ${accent}; color: #fff; border-color: ${accent};
        }
        .se-menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .se-card {
          background: var(--se-surface);
          border-radius: 14px; overflow: hidden;
          border: 1px solid var(--se-border);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .se-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(234,88,12,0.06);
        }
        .se-cart-dialog {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(400px, 100vw); margin: 0; margin-left: auto;
          border: none; border-left: 1px solid var(--se-border);
          background: var(--se-surface); color: var(--se-text);
          padding: 0;
          box-shadow: -8px 0 32px rgba(0,0,0,0.08);
        }
        .se-cart-dialog::backdrop {
          background: rgba(0,0,0,0.3);
        }
        .se-toast {
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          z-index: 300; padding: 12px 24px; border-radius: 12px;
          background: ${accent}; color: #fff; font-size: 14px; font-weight: 600;
          box-shadow: 0 4px 20px rgba(234,88,12,0.3);
          transition: opacity 0.3s; border: none;
        }
        @media (max-width: 640px) {
          .se-menu-grid { grid-template-columns: 1fr; }
          .se-cat-scroll { padding-left: 16px; padding-right: 16px; }
          .se-cat-pill { padding: 6px 14px; font-size: 12px; }
          .se-cart-dialog { width: calc(100vw - 48px); }
        }
      `}</style>

      {/* ─── Header ─── */}
      <header className="se-header">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: '56px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link href="/servicios" style={{
                fontSize: '12px', color: 'var(--se-text-secondary)', textDecoration: 'none', fontWeight: 500,
              }}>
                &larr; Servicios
              </Link>
              <span style={{ fontSize: '20px', fontWeight: 800, color: accent, letterSpacing: '-0.02em' }}>
                Sabor Express
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link href="/ejemplos/delivery/admin" style={{
                fontSize: '12px', fontWeight: 600, color: accent, textDecoration: 'none',
                padding: '6px 14px', borderRadius: '6px', border: `1px solid ${accent}22`,
                background: `${accent}0d`,
              }}>
                Admin
              </Link>
              <button
                id="se-dark-toggle"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--se-text-secondary)', fontSize: '18px', padding: '4px',
                }}
                aria-label="Cambiar modo oscuro"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setShowCart(true)}
                style={{
                  background: accent, border: 'none', borderRadius: '50px',
                  padding: '6px 16px', color: '#fff', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                  position: 'relative',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {cartCount > 0 ? `$${subtotal.toLocaleString()}` : '0'}
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#fff', color: accent, fontSize: '10px',
                    fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ─── Category Pills ─── */}
          <div className="se-cat-scroll">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`se-cat-pill${activeCat === c.id ? ' active' : ''}`}
                onClick={() => setActiveCat(c.id)}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>

        {/* ─── Hero Banner ─── */}
        <section style={{
          background: `linear-gradient(135deg, ${accentDark} 0%, ${accent} 50%, ${accentLight} 100%)`,
          borderRadius: '20px', padding: 'clamp(32px, 5vw, 56px)',
          color: '#fff', marginBottom: '32px',
        }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Pedi sin moverte del sillon
          </h1>
          <p style={{ fontSize: '15px', opacity: 0.9, margin: '0 0 20px 0', maxWidth: '480px' }}>
            Hamburguesas, pizzas, ensaladas y mas. Delivery gratis en pedidos mayores a ${MIN_ORDER.toLocaleString()}.
          </p>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            <span>🕐 {new Date().getHours() < 23 ? 'Abierto ahora' : 'Cerrado'}</span>
            <span>📍 Chascomus, zona centro</span>
          </div>
        </section>

        {/* ─── Menu Grid ─── */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--se-text)' }}>
              {CATEGORIES.find((c) => c.id === activeCat)?.emoji}{' '}
              {CATEGORIES.find((c) => c.id === activeCat)?.name}
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--se-text-secondary)' }}>
              {filtered.length} items
            </span>
          </div>
          <div className="se-menu-grid">
            {filtered.map((item) => (
              <Link key={item.id} href={`/ejemplos/delivery/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article className="se-card">
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      width="400"
                      height="225"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {item.badge && (
                      <span style={{
                        position: 'absolute', top: '10px', left: '10px',
                        padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 600,
                        background: accent, color: '#fff',
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--se-text)' }}>
                        {item.name}
                      </h3>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: accent, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                        ${item.price.toLocaleString()}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '12px', color: 'var(--se-text-secondary)', margin: '0 0 12px 0',
                      lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {item.desc}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(item.id); }}
                      style={{
                        width: '100%', padding: '9px', borderRadius: '8px', border: 'none',
                        background: accent, color: '#fff', fontSize: '13px', fontWeight: 600,
                        cursor: 'pointer', transition: 'opacity 0.2s',
                      }}
                    >
                      Agregar ${item.price.toLocaleString()}
                    </button>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── How it Works ─── */}
        <section style={{ margin: '64px 0', padding: '40px 0', borderTop: '1px solid var(--se-border)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 700, margin: '0 0 40px 0', color: 'var(--se-text)' }}>
            Como funciona
          </h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
            maxWidth: '720px', margin: '0 auto',
          }}>
            {[
              { step: '1', title: 'Elegi', desc: 'Navega el menu y agregá lo que mas te guste al carrito' },
              { step: '2', title: 'Pedí', desc: 'Completa tus datos, elegí metodo de pago y confirmá' },
              { step: '3', title: 'Recibi', desc: 'Te llevamos el pedido a tu casa en menos de 40 min' },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: accent, color: '#fff', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: 700, margin: '0 auto 12px',
                }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--se-text)' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--se-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ─── Footer ─── */}
      <footer style={{
        borderTop: '1px solid var(--se-border)', padding: '40px 24px',
        background: 'var(--se-surface-2)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          <div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: accent }}>Sabor Express</span>
            <p style={{ fontSize: '13px', color: 'var(--se-text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>
              Comida rapida saludable en Chascomus. Delivery de lunes a sabados.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--se-text)' }}>Horarios</h4>
            <div style={{ fontSize: '13px', color: 'var(--se-text-secondary)', lineHeight: 1.8 }}>
              Lun - Sab: 11:00 - 23:00<br />
              Domingos: 18:00 - 23:00
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--se-text)' }}>Contacto</h4>
            <div style={{ fontSize: '13px', color: 'var(--se-text-secondary)', lineHeight: 1.8 }}>
              (02241) 15-6789<br />
              hola@saborexpress.com.ar<br />
              Av. Lastra 320, Chascomus
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--se-text)' }}>Redes</h4>
            <div style={{ fontSize: '13px', color: 'var(--se-text-secondary)', lineHeight: 1.8 }}>
              Instagram<br />WhatsApp<br />Facebook
            </div>
          </div>
        </div>
        <div style={{
          textAlign: 'center', fontSize: '12px', color: 'var(--se-text-secondary)',
          marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--se-border)',
        }}>
          &copy; 2026 Sabor Express. Simulacion con fines demostrativos.
        </div>
      </footer>

      {/* ─── Cart Dialog ─── */}
      {showCart && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 199, background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setShowCart(false)}
        />
      )}
      <dialog open={showCart} className="se-cart-dialog" onClose={() => setShowCart(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 24px', borderBottom: '1px solid var(--se-border)',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--se-text)' }}>
              Tu pedido ({cartCount})
            </h3>
            <button
              type="button"
              onClick={() => setShowCart(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '20px', color: 'var(--se-text-secondary)', padding: '4px',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {cartItems.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--se-text-secondary)', marginTop: '60px', fontSize: '14px' }}>
                Tu carrito esta vacio
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cartItems.map((e) => (
                  <div key={e.item.id} style={{
                    display: 'flex', gap: '12px', alignItems: 'center',
                    paddingBottom: '16px', borderBottom: '1px solid var(--se-border)',
                  }}>
                    <img src={e.item.image} alt={e.item.name}
                      width="64" height="48"
                      style={{ borderRadius: '8px', objectFit: 'cover', width: '64px', height: '48px', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--se-text)' }}>{e.item.name}</div>
                      <div style={{ fontSize: '13px', color: accent, fontWeight: 700 }}>
                        ${(e.item.price * e.qty).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button type="button" onClick={() => updateQty(e.item.id, -1)} style={{
                        width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--se-border)',
                        background: 'var(--se-surface)', cursor: 'pointer', fontSize: '16px', color: 'var(--se-text)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        −
                      </button>
                      <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--se-text)', minWidth: '20px', textAlign: 'center' }}>
                        {e.qty}
                      </span>
                      <button type="button" onClick={() => updateQty(e.item.id, 1)} style={{
                        width: '30px', height: '30px', borderRadius: '50%', border: 'none',
                        background: accent, color: '#fff', cursor: 'pointer', fontSize: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div style={{
              padding: '20px 24px', borderTop: '1px solid var(--se-border)',
              background: 'var(--se-surface-2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--se-text-secondary)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--se-text-secondary)' }}>
                <span>Envio</span>
                <span>{subtotal >= MIN_ORDER ? 'Gratis' : `$${DELIVERY_FEE.toLocaleString()}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700, color: 'var(--se-text)', marginBottom: '16px' }}>
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <Link
                href="/ejemplos/delivery/checkout"
                style={{
                  display: 'block', textAlign: 'center', padding: '14px', borderRadius: '10px',
                  background: accent, color: '#fff', fontSize: '14px', fontWeight: 700,
                  textDecoration: 'none',
                }}
                onClick={() => setShowCart(false)}
              >
                Confirmar pedido
              </Link>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                style={{
                  width: '100%', textAlign: 'center', padding: '10px', borderRadius: '8px',
                  border: `1px solid var(--se-border)`, background: 'transparent',
                  color: 'var(--se-text)', fontSize: '13px', fontWeight: 500,
                  cursor: 'pointer', marginTop: '8px',
                }}
              >
                Seguir comprando
              </button>
              <p style={{ fontSize: '11px', color: 'var(--se-text-secondary)', textAlign: 'center', marginTop: '8px' }}>
                Minimo de compra: ${MIN_ORDER.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </dialog>

      {/* ─── Toast ─── */}
      {toast && (
        <div className="se-toast" role="status" aria-live="polite">
          {toast} agregado al carrito
        </div>
      )}

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var toggle = document.getElementById('se-dark-toggle');
          if (toggle) {
            toggle.addEventListener('click', function() {
              document.documentElement.classList.toggle('se-dark');
              var isDark = document.documentElement.classList.contains('se-dark');
              toggle.innerHTML = isDark
                ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
                : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
              try { localStorage.setItem('sabor-theme', isDark ? 'dark' : 'light'); } catch(e) {}
            });
            try {
              if (localStorage.getItem('sabor-theme') === 'dark') {
                document.documentElement.classList.add('se-dark');
                toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
              }
            } catch(e) {}
          }
        })();
      `}} />
    </div>
  );
}
