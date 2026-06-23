'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { FAQItem } from '../hooks/useAdmin';

const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';
const GRANATE = '#7a1a1a';

interface Props {
  faq: FAQItem[];
}

export default function FAQ({ faq }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="faq"
      style={{
        padding: 'clamp(60px, 10vh, 100px) 24px',
        background: BG_SECTION,
      }}
    >
      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: GRANATE, fontWeight: 700, margin: '0 0 8px 0' }}>
            FAQ
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', color: TEXT_PRIMARY }}>
            Preguntas frecuentes
          </h2>
          <p style={{ fontSize: 15, color: TEXT_SEC, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Las dudas mas comunes que recibimos. Si tenes otra, consultanos sin compromiso.
          </p>
        </motion.div>

        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {faq.length === 0 && (
            <p style={{ fontSize: 13, color: TEXT_SEC, textAlign: 'center' }}>
              No hay preguntas frecuentes cargadas.
            </p>
          )}
          {faq.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
            >
              <details
                name="con-faq"
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  marginBottom: 8,
                  border: '1px solid rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    padding: '16px 20px',
                    fontSize: 14,
                    fontWeight: 600,
                    color: TEXT_PRIMARY,
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    userSelect: 'none',
                  }}
                >
                  {item.q}
                  <span
                    className="con-faq-icon"
                    style={{
                      fontSize: 16,
                      color: GRANATE,
                      transition: 'transform 0.2s',
                      display: 'inline-block',
                    }}
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    padding: '0 20px 16px',
                    fontSize: 13,
                    color: TEXT_SEC,
                    lineHeight: 1.6,
                  }}
                >
                  {item.a}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `{
  document.querySelectorAll('details[name="con-faq"]').forEach(function(d){
    d.addEventListener('toggle', function(){
      var icon = d.querySelector('.con-faq-icon');
      if (icon) icon.style.transform = d.open ? 'rotate(45deg)' : 'rotate(0deg)';
    });
  });
}()`,
        }}
      />
    </section>
  );
}
