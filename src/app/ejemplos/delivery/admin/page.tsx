'use client';

import { useState } from 'react';

const accent = '#ea580c';
const accentLight = '#f97316';

const FAKE_USER = { email: 'admin@sabor.com', password: 'admin123' };

interface Order {
  id: string; client: string; items: string; total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  address: string; payment: string; date: string;
}

interface Product {
  id: string; name: string; category: string; price: number;
  desc: string; active: boolean;
}

function initOrders(): Order[] {
  return [
    { id: 'ORD-001', client: 'Lucia Fernandez', items: 'Sabor Burger x2, Papas cheddar', total: 9200, status: 'pending', address: 'Av. Lastra 450', payment: 'Efectivo', date: '19/06 20:30' },
    { id: 'ORD-002', client: 'Martin Gomez', items: 'Napolitana x1, Cerveza x2', total: 8400, status: 'preparing', address: 'Sarmiento 120', payment: 'Mercado Pago', date: '19/06 20:15' },
    { id: 'ORD-003', client: 'Sofia Martinez', items: 'Caesar Bowl x1, Limonada x1', total: 5000, status: 'ready', address: 'Belgrano 890', payment: 'Debito', date: '19/06 19:50' },
    { id: 'ORD-004', client: 'Jose Ramirez', items: 'Veggie Burger x1, Bowl Mediterraneo x1', total: 7200, status: 'delivered', address: 'Mitre 234', payment: 'Credito', date: '19/06 19:00' },
    { id: 'ORD-005', client: 'Carla Lopez', items: 'Cheesecake x2, Brownie x1', total: 8800, status: 'cancelled', address: 'Alvear 567', payment: 'Efectivo', date: '19/06 18:30' },
  ];
}

function initProducts(): Product[] {
  return [
    { id: 's001', name: 'Sabor Burger', category: 'burgers', price: 4200, desc: 'Doble carne, cheddar, bacon, cebolla caramelizada y salsa especial', active: true },
    { id: 's002', name: 'Veggie Burger', category: 'burgers', price: 3600, desc: 'Medallon de lentejas y quinoa, palta, tomate y mayonesa vegana', active: true },
    { id: 's003', name: 'Cheddar Crunch', category: 'burgers', price: 3900, desc: 'Carne smash, cheddar fundido, cebolla crispy y salsa BBQ', active: true },
    { id: 's004', name: 'Muzza Clasica', category: 'pizzas', price: 3800, desc: 'Mozzarella, oregano, salsa de tomate artesanal', active: true },
    { id: 's005', name: 'Napolitana', category: 'pizzas', price: 4200, desc: 'Mozzarella, rodajas de tomate, ajo y albahaca fresca', active: true },
    { id: 's006', name: 'Rucula & Crudo', category: 'pizzas', price: 4800, desc: 'Mozzarella, rucula, jamon crudo y parmesano en escamas', active: false },
  ];
}

type View = 'dashboard' | 'orders' | 'products';

const STATUS_MAP: Record<string, string> = {
  pending: 'Pendiente',
  preparing: 'Preparando',
  ready: 'Listo',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

const STATUS_COLOR: Record<string, string> = {
  pending: '#f59e0b',
  preparing: '#3b82f6',
  ready: '#16a34a',
  delivered: '#78716c',
  cancelled: '#ef4444',
};

export default function AdminPage() {
  const [email, setEmail] = useState('admin@sabor.com');
  const [password, setPassword] = useState('admin123');
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState<View>('dashboard');
  const [orders, setOrders] = useState(initOrders);
  const [products, setProducts] = useState(initProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({ name: '', category: 'burgers', price: 0, desc: '', active: true });
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  }

  function updateOrderStatus(id: string, status: Order['status']) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  }

  function openNewProduct() {
    setEditingProduct(null);
    setProductForm({ name: '', category: 'burgers', price: 0, desc: '', active: true });
    setShowProductModal(true);
  }

  function openEditProduct(p: Product) {
    setEditingProduct(p);
    setProductForm({ name: p.name, category: p.category, price: p.price, desc: p.desc, active: p.active });
    setShowProductModal(true);
  }

  function saveProduct() {
    if (!productForm.name || productForm.price <= 0) return;
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? { ...p, ...productForm } : p));
    } else {
      const id = `p${Date.now()}`;
      setProducts((prev) => [...prev, { id, ...productForm }]);
    }
    setShowProductModal(false);
  }

  function toggleProductActive(id: string) {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));
  }

  if (!loggedIn) {
    return (
      <div className="se-admin-login" style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf9', padding: '24px' }}>
        <div style={{ width: '360px', maxWidth: '100%' }}>
                      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: accent }}>Sabor Express</div>
            <div style={{ fontSize: '13px', color: '#78716c', marginTop: '4px' }}>Panel de administracion</div>
            <a href="/ejemplos/delivery" style={{
              display: 'inline-block', marginTop: '12px', fontSize: '12px',
              color: accent, textDecoration: 'none', fontWeight: 500,
            }}>
              &larr; Volver a la tienda
            </a>
          </div>
          <form onSubmit={handleLogin} style={{ background: '#fff', borderRadius: '14px', padding: '28px', border: '1px solid #e7e5e4' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sabor.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>Contrasena</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: '13px', margin: '0 0 12px 0' }}>{error}</p>}
            <button type="submit" style={{
              width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
              background: accent, color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
            }}>
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const salesTotal = orders.filter((o) => o.status !== 'cancelled').reduce((a, o) => a + o.total, 0);
  const activeOrders = orders.filter((o) => o.status === 'pending' || o.status === 'preparing');
  const completedToday = orders.filter((o) => o.status === 'delivered').length;

  const CAT_ORDER = ['pending', 'preparing', 'ready', 'delivered', 'cancelled'];

  return (
    <div className="se-admin" style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100dvh', background: '#fafaf9', color: '#1c1917' }}>
      <style>{`
        @media (max-width: 640px) {
          .se-admin-nav { flex-wrap: wrap; gap: 4px; }
          .se-admin-table { font-size: 12px; }
          .se-admin-table td, .se-admin-table th { padding: 8px 6px; }
        }
      `}</style>

      <header style={{
        background: '#fff', borderBottom: '1px solid #e7e5e4',
        padding: '16px 24px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="/ejemplos/delivery" style={{ fontSize: '12px', color: '#78716c', textDecoration: 'none', fontWeight: 500 }}>
              &larr; Tienda
            </a>
            <span style={{ fontSize: '18px', fontWeight: 800, color: accent }}>Admin Sabor</span>
          </div>
          <button type="button" onClick={() => setLoggedIn(false)} style={{
            background: 'none', border: '1px solid #e7e5e4', padding: '6px 14px',
            borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#78716c', cursor: 'pointer',
          }}>
            Cerrar sesion
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
        {/* ─── Nav ─── */}
        <nav className="se-admin-nav" style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {([
            ['dashboard', 'Dashboard'],
            ['orders', 'Pedidos'],
            ['products', 'Productos'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setView(key)}
              style={{
                padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                border: `1px solid ${view === key ? accent : '#e7e5e4'}`,
                background: view === key ? accent : '#fff',
                color: view === key ? '#fff' : '#1c1917',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ─── Dashboard ─── */}
        {view === 'dashboard' && (
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 20px 0' }}>Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Ventas totales', value: `$${salesTotal.toLocaleString()}`, icon: '$' },
                { label: 'Pedidos activos', value: activeOrders.length, icon: '🕐' },
                { label: 'Completados hoy', value: completedToday, icon: '✓' },
                { label: 'Productos activos', value: products.filter((p) => p.active).length, icon: '🍽' },
              ].map((card) => (
                <div key={card.label} style={{
                  background: '#fff', borderRadius: '12px', padding: '20px',
                  border: '1px solid #e7e5e4',
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: accent }}>{card.value}</div>
                  <div style={{ fontSize: '12px', color: '#78716c', fontWeight: 500 }}>{card.label}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0' }}>Pedidos recientes</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="se-admin-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e7e5e4', fontSize: '13px' }}>
                <thead style={{ background: '#f5f5f4' }}>
                  <tr>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Cliente</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Items</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Total</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600 }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} style={{ borderTop: '1px solid #e7e5e4' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600 }}>{o.id}</td>
                      <td style={{ padding: '10px 14px' }}>{o.client}</td>
                      <td style={{ padding: '10px 14px', color: '#78716c', fontSize: '12px' }}>{o.items}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>${o.total.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 600,
                          background: `${STATUS_COLOR[o.status]}18`, color: STATUS_COLOR[o.status],
                        }}>
                          {STATUS_MAP[o.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── Orders ─── */}
        {view === 'orders' && (
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 20px 0' }}>Pedidos</h1>
            <div style={{ overflowX: 'auto' }}>
              <table className="se-admin-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e7e5e4', fontSize: '13px' }}>
                <thead style={{ background: '#f5f5f4' }}>
                  <tr>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Cliente</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Direccion</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Pago</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Total</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Fecha</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600 }}>Estado</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600 }}>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {CAT_ORDER.flatMap((status) =>
                    orders.filter((o) => o.status === status).map((o) => (
                      <tr key={o.id} style={{ borderTop: '1px solid #e7e5e4' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 600 }}>{o.id}</td>
                        <td style={{ padding: '10px 14px' }}>{o.client}</td>
                        <td style={{ padding: '10px 14px', fontSize: '12px', color: '#78716c' }}>{o.address}</td>
                        <td style={{ padding: '10px 14px', fontSize: '12px' }}>{o.payment}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>${o.total.toLocaleString()}</td>
                        <td style={{ padding: '10px 14px', fontSize: '12px', color: '#78716c' }}>{o.date}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 600,
                            background: `${STATUS_COLOR[o.status]}18`, color: STATUS_COLOR[o.status],
                          }}>
                            {STATUS_MAP[o.status]}
                          </span>
                        </td>
                        <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as Order['status'])}
                            style={{
                              padding: '5px 8px', borderRadius: '6px', border: '1px solid #e7e5e4',
                              fontSize: '11px', background: '#fff', cursor: 'pointer',
                            }}
                          >
                            <option value="pending">Pendiente</option>
                            <option value="preparing">Preparando</option>
                            <option value="ready">Listo</option>
                            <option value="delivered">Entregado</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── Products ─── */}
        {view === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Productos</h1>
              <button type="button" onClick={openNewProduct} style={{
                padding: '9px 20px', borderRadius: '8px', border: 'none',
                background: accent, color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              }}>
                + Nuevo producto
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="se-admin-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e7e5e4', fontSize: '13px' }}>
                <thead style={{ background: '#f5f5f4' }}>
                  <tr>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Nombre</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Categoria</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Precio</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600 }}>Activo</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderTop: '1px solid #e7e5e4' }}>
                      <td style={{ padding: '10px 14px', fontSize: '12px', color: '#78716c' }}>{p.id}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: '10px 14px', fontSize: '12px', color: '#78716c', textTransform: 'capitalize' }}>{p.category}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>${p.price.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => toggleProductActive(p.id)}
                          style={{
                            padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 600,
                            border: 'none', cursor: 'pointer',
                            background: p.active ? '#16a34a18' : '#ef444418',
                            color: p.active ? '#16a34a' : '#ef4444',
                          }}
                        >
                          {p.active ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => openEditProduct(p)}
                          style={{
                            padding: '5px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                            border: '1px solid #e7e5e4', background: '#fff', cursor: 'pointer', color: '#1c1917',
                          }}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ─── Product Modal ─── */}
      {showProductModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '28px',
            width: '480px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
                {editingProduct ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button type="button" onClick={() => setShowProductModal(false)} style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#78716c', padding: '4px',
              }}>
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>Nombre</label>
              <input value={productForm.name} onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>Categoria</label>
              <select value={productForm.category} onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box' }}
              >
                <option value="burgers">Hamburguesas</option>
                <option value="pizzas">Pizzas</option>
                <option value="salads">Ensaladas</option>
                <option value="drinks">Bebidas</option>
                <option value="desserts">Postres</option>
              </select>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>Precio ($)</label>
              <input type="number" min={0} value={productForm.price || ''} onChange={(e) => setProductForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>Descripcion</label>
              <textarea value={productForm.desc} onChange={(e) => setProductForm((prev) => ({ ...prev, desc: e.target.value }))} rows={3}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="checkbox" checked={productForm.active} onChange={(e) => setProductForm((prev) => ({ ...prev, active: e.target.checked }))} style={{ accentColor: accent }} />
              Producto activo
            </label>

            <button type="button" onClick={saveProduct} style={{
              width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
              background: accent, color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
            }}>
              {editingProduct ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
