'use client';

import Link from 'next/link';
import { useState } from 'react';

const accent = '#ea580c';

interface FormData {
  name: string; address: string; phone: string; notes: string;
  payment: 'cash' | 'debit' | 'credit' | 'transfer';
}

export default function CheckoutPage() {
  const [form, setForm] = useState<FormData>({
    name: '', address: '', phone: '', notes: '',
    payment: 'cash',
  });
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#fafaf9' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px', color: '#fff' }}>
            ✓
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', color: '#1c1917' }}>
            Pedido confirmado!
          </h1>
          <p style={{ fontSize: '14px', color: '#78716c', lineHeight: 1.7, margin: '0 0 24px 0' }}>
            Gracias por tu pedido, {form.name}. Te llegara un mensaje de confirmacion a tu WhatsApp.
          </p>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4', marginBottom: '16px', textAlign: 'left', fontSize: '13px', color: '#78716c' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Direccion</span>
              <span style={{ color: '#1c1917', fontWeight: 600 }}>{form.address}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Pago</span>
              <span style={{ color: '#1c1917', fontWeight: 600, textTransform: 'capitalize' }}>
                {form.payment === 'cash' ? 'Efectivo' : form.payment === 'debit' ? 'Debito' : form.payment === 'credit' ? 'Credito' : 'Transferencia'}
              </span>
            </div>
            {form.notes && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Notas</span>
                <span style={{ color: '#1c1917', fontWeight: 600, maxWidth: '160px', textAlign: 'right' }}>{form.notes}</span>
              </div>
            )}
          </div>
          <Link href="/ejemplos/delivery" style={{
            display: 'inline-block', padding: '12px 32px', borderRadius: '10px',
            background: accent, color: '#fff', fontWeight: 700, fontSize: '14px',
            textDecoration: 'none',
          }}>
            Seguir viendo el menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="se-checkout">
      <style>{`
        .se-checkout {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #fafaf9;
          color: #1c1917;
          min-height: 100dvh;
        }
      `}</style>

      <header style={{
        borderBottom: '1px solid #e7e5e4', background: '#fff',
        padding: '16px 24px',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <Link href="/ejemplos/delivery" style={{
            fontSize: '13px', fontWeight: 600, color: '#78716c', textDecoration: 'none',
          }}>
            &larr; Volver al menu
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px 0' }}>Checkout</h1>
        <p style={{ fontSize: '14px', color: '#78716c', margin: '0 0 28px 0' }}>
          Completa tus datos para recibir el pedido
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #e7e5e4', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 20px 0' }}>Datos de entrega</h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>
                Nombre completo *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Ej: Juan Perez"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4',
                  fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>
                Direccion *
              </label>
              <input
                required
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                placeholder="Calle, numero, piso, depto"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4',
                  fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '0' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#1c1917' }}>
                Telefono / WhatsApp *
              </label>
              <input
                required
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="02241 15-6789"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4',
                  fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #e7e5e4', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 20px 0' }}>Notas (opcional)</h2>
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Ej: Sin cebolla, extra salsa, etc."
              rows={3}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4',
                fontSize: '14px', background: '#fafaf9', outline: 'none', boxSizing: 'border-box',
                resize: 'vertical', fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #e7e5e4', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0' }}>Metodo de pago</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { value: 'cash', label: 'Efectivo' },
                { value: 'debit', label: 'Tarjeta de debito' },
                { value: 'credit', label: 'Tarjeta de credito' },
                { value: 'transfer', label: 'Transferencia / Mercado Pago' },
              ].map((opt) => (
                <label key={opt.value} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '10px',
                  border: `1px solid ${form.payment === opt.value ? accent : '#e7e5e4'}`,
                  background: form.payment === opt.value ? `${accent}08` : '#fafaf9',
                  cursor: 'pointer',
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={form.payment === opt.value}
                    onChange={(e) => update('payment', e.target.value as FormData['payment'])}
                    style={{ accentColor: accent }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: form.payment === opt.value ? 600 : 400, color: '#1c1917' }}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
              background: accent, color: '#fff', fontSize: '15px', fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Confirmar pedido
          </button>
        </form>
      </main>
    </div>
  );
}
