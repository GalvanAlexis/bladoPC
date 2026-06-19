'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const accent = '#ea580c';

interface Item {
  id: string; name: string; desc: string; price: number;
  category: string; image: string; badge?: string;
  details?: string; ingredients?: string[]; extras?: { name: string; price: number }[];
}

const MENU: Item[] = [
  { id: 's001', name: 'Sabor Burger', desc: 'Doble carne, cheddar, bacon, cebolla caramelizada y salsa especial', price: 4200, category: 'burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', badge: 'Mas pedido', details: 'Nuestra burger estrella. 250g de carne angus, doble cheddar fundido, bacon ahumado, cebolla caramelizada, lechuga fresca y nuestra salsa secreta Sabor. Viene con papas fritas.', ingredients: ['Pan brioche artesanal', 'Doble carne angus 250g', 'Cheddar', 'Bacon ahumado', 'Cebolla caramelizada', 'Lechuga', 'Salsa secreta', 'Papas fritas'] },
  { id: 's002', name: 'Veggie Burger', desc: 'Medallon de lentejas y quinoa, palta, tomate y mayonesa vegana', price: 3600, category: 'burgers', image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=800&q=80', details: 'Una opcion fresh y saludable. Medallon hecho con lentejas, quinoa y especias, palta fresca en rodajas, tomate perita y mayonesa vegana. Servida en pan integral con brotes.', ingredients: ['Pan integral', 'Medallon lentejas y quinoa', 'Palta', 'Tomate perita', 'Mayonesa vegana', 'Brotes de alfalfa'] },
  { id: 's003', name: 'Cheddar Crunch', desc: 'Carne smash, cheddar fundido, cebolla crispy y salsa BBQ', price: 3900, category: 'burgers', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80', badge: 'Nuevo', details: 'La nueva sensacion. Carne smash de 180g con bordes crocantes, cheddar fundido doble, cebolla crispy, pepinos pickles y salsa BBQ ahumada. Pan negro de carbon activado.', ingredients: ['Pan negro carbon', 'Carne smash 180g', 'Doble cheddar', 'Cebolla crispy', 'Pepinos pickles', 'Salsa BBQ'], extras: [{name: 'Papas cheddar y bacon', price: 800}, {name: 'Aros de cebolla', price: 600}] },
  { id: 's004', name: 'Muzza Clasica', desc: 'Mozzarella, oregano, salsa de tomate artesanal', price: 3800, category: 'pizzas', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', details: 'La pizza de siempre, pero mejor. Masa madre de 48hs, salsa de tomate San Marzano, mozzarella fresca y oregano silvestre. Horneada en horno de piedra.', ingredients: ['Masa madre 48hs', 'Salsa San Marzano', 'Mozzarella fresca', 'Oregano silvestre', 'Aceite de oliva'] },
  { id: 's005', name: 'Napolitana', desc: 'Mozzarella, rodajas de tomate, ajo y albahaca fresca', price: 4200, category: 'pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80', badge: 'Popular', details: 'Un clasico napolitano. Misma masa madre, mozzarella fresca, rodajas de tomate perita, ajo laminado y albahaca fresca de nuestra huerta. Lleva un hilo de aceite de oliva extra virgen.', ingredients: ['Masa madre 48hs', 'Mozzarella fresca', 'Tomate perita', 'Ajo laminado', 'Albahaca fresca', 'Aceite de oliva EV'] },
  { id: 's006', name: 'Rucula & Crudo', desc: 'Mozzarella, rucula, jamon crudo y parmesano en escamas', price: 4800, category: 'pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80', details: 'Pizza gourmet con base de mozzarella, rucula fresca, jamon crudo de parma y escamas de parmesano de 18 meses. Terminada con reduccion de aceto balsamico.', ingredients: ['Masa madre', 'Mozzarella', 'Rucula fresca', 'Jamon crudo de Parma', 'Parmesano 18 meses', 'Reduccion de aceto'], extras: [{name: 'Huevo a la copa', price: 300}] },
  { id: 's007', name: 'Caesar Bowl', desc: 'Lechuga fresca, pollo grillado, croutons, parmesano y aderezo Caesar', price: 3200, category: 'salads', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80', details: 'Bowl generoso con lechuga capuchina y romana, pechuga de pollo grillada marinada en limon, croutons caseros de pan de masa madre, parmesano en lascas y aderezo Caesar de la casa.', ingredients: ['Lechuga capuchina y romana', 'Pollo grillado', 'Croutons caseros', 'Parmesano en lascas', 'Aderezo Caesar'] },
  { id: 's008', name: 'Bowl Mediterraneo', desc: 'Quinoa, hummus, pepino, tomate cherry, aceitunas y falafel', price: 3600, category: 'salads', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', badge: 'Vegano', details: 'Bowl vegano completo: quinoa, hummus cremoso, pepino, tomate cherry, aceitunas negras, falafel crocante, cebolla morada y vinagreta de limon y tahini.', ingredients: ['Quinoa', 'Hummus', 'Pepino', 'Tomate cherry', 'Aceitunas negras', 'Falafel', 'Cebolla morada', 'Vinagreta limon y tahini'] },
  { id: 's009', name: 'Limonada Natural', desc: 'Limonada exprimida con menta y jengibre. Sin azucar anadida', price: 1800, category: 'drinks', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80', details: 'Limonada natural exprimida al momento, con hojas de menta fresca y jengibre rallado. Endulzada con stevia. Servida en jarra de 500ml.', ingredients: ['Limon natural', 'Menta fresca', 'Jengibre', 'Stevia', 'Agua mineral'] },
  { id: 's010', name: 'Cerveza Artesanal', desc: 'IPA dorada 473ml. Cerveza local de la casa', price: 2200, category: 'drinks', image: 'https://images.unsplash.com/photo-1608270586620-8d6bc0e6c01e?w=800&q=80', details: 'IPA dorada estilo americano. 6.2% ABV. Notas citricas y florales gracias al dry-hopping con luppolo cascade. Cerveza local de Chascomus.', ingredients: ['Malta pale ale', 'Luppolo cascade', 'Levadura americana'] },
  { id: 's011', name: 'Cheesecake de la Casa', desc: 'Cheesecake cremoso con salsa de frutos rojos', price: 2800, category: 'desserts', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80', badge: 'Casero', details: 'Cheesecake horneado estilo New York, base de galleta de vainilla, relleno cremoso de queso crema y crema de leche, cubierto con salsa casera de frutos rojos (frambuesa, mora y arandano).', ingredients: ['Queso crema', 'Crema de leche', 'Galleta vainilla', 'Frutos rojos', 'Azucar impalpable'] },
  { id: 's012', name: 'Brownie con Helado', desc: 'Brownie de chocolate belga con helado de crema americana', price: 3200, category: 'desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', details: 'Brownie denso y humedo con chocolate belga 70% cocoa, nueces pecanas, servido caliente con bocha de helado de crema americana y dulce de leche.', ingredients: ['Chocolate belga 70%', 'Nueces pecanas', 'Helado crema americana', 'Dulce de leche', 'Manteca', 'Azucar mascabo'] },
];

export default function ProductDetail() {
  const params = useParams();
  const item = MENU.find((m) => m.id === params.itemId);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!item) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Item no encontrado</h1>
        <Link href="/ejemplos/delivery" style={{ color: accent, textDecoration: 'none', fontSize: '14px' }}>
          &larr; Volver al menu
        </Link>
      </div>
    );
  }

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="se-detail">
      <style>{`
        .se-detail {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: var(--se-bg, #fafaf9);
          color: var(--se-text, #1c1917);
          min-height: 100dvh;
        }
        .se-detail :root {
          --se-bg: #fafaf9;
          --se-surface: #fff;
          --se-text: #1c1917;
          --se-text-secondary: #78716c;
          --se-border: #e7e5e4;
        }
      `}</style>

      <header style={{
        borderBottom: '1px solid var(--se-border, #e7e5e4)',
        background: 'var(--se-surface, #fff)',
        padding: '16px 24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/ejemplos/delivery" style={{
            fontSize: '13px', fontWeight: 600, color: 'var(--se-text-secondary, #78716c)',
            textDecoration: 'none',
          }}>
            &larr; Volver al menu
          </Link>
          <span style={{ fontSize: '18px', fontWeight: 800, color: accent }}>Sabor Express</span>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px',
          alignItems: 'start',
        }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--se-border, #e7e5e4)' }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {item.badge && (
              <span style={{
                display: 'inline-block', margin: '12px 0 0 16px',
                padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 600,
                background: accent, color: '#fff',
              }}>
                {item.badge}
              </span>
            )}
          </div>

          <div>
            <span style={{
              fontSize: '12px', color: 'var(--se-text-secondary, #78716c)',
              fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              {item.category}
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 12px', lineHeight: 1.2, color: 'var(--se-text, #1c1917)' }}>
              {item.name}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--se-text-secondary, #78716c)', lineHeight: 1.7, marginBottom: '20px' }}>
              {item.details}
            </p>

            <div style={{ fontSize: '32px', fontWeight: 800, color: accent, marginBottom: '24px' }}>
              ${item.price.toLocaleString()}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--se-border, #e7e5e4)',
                  background: 'var(--se-surface, #fff)', cursor: 'pointer', fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                −
              </button>
              <span style={{ fontSize: '18px', fontWeight: 700, minWidth: '28px', textAlign: 'center' }}>{qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                  background: accent, color: '#fff', cursor: 'pointer', fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              style={{
                width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                background: added ? '#16a34a' : accent, color: '#fff',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {added ? 'Agregado al carrito!' : `Agregar $${(item.price * qty).toLocaleString()}`}
            </button>

            <div style={{ marginTop: '28px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--se-text, #1c1917)' }}>
                Ingredientes
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.ingredients?.map((ing) => (
                  <span key={ing} style={{
                    padding: '4px 12px', borderRadius: '50px', fontSize: '12px',
                    background: 'var(--se-surface-2, #f5f5f4)', color: 'var(--se-text-secondary, #78716c)',
                    border: '1px solid var(--se-border, #e7e5e4)',
                  }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
