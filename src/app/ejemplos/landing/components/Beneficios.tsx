'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BENEFITS = [
  {
    icon: '\u{1F4A7}',
    title: 'Hidratacion 24h',
    desc: 'Acido hialuronico de triple peso molecular que retiene la humedad en todas las capas de la piel.',
    detail: 'Nuestra formula con acido hialuronico de triple peso molecular penetra en las capas superficial, media y profunda de la piel, garantizando hidratacion continua durante 24 horas. Ideal para pieles secas y deshidratadas.',
  },
  {
    icon: '\u{1F33F}',
    title: '100% Natural',
    desc: 'Formula vegana, libre de parabenos, sulfatos, siliconas y fragancias sinteticas.',
    detail: 'Todos nuestros ingredientes son de origen vegetal y certificados libres de crueldad animal. No utilizamos parabenos, sulfatos, siliconas, ftalatos ni fragancias sinteticas. Hipoalergenico y apto para pieles sensibles.',
  },
  {
    icon: '\u2728',
    title: 'Antioxidante Potente',
    desc: 'Vitamina C estabilizada que ilumina, unifica el tono y combate los radicales libres.',
    detail: 'La vitamina C estabilizada (ascorbyl tetraisopalmitate) penetra rapidamente y se convierte en vitamina C pura en la piel. Ilumina el cutis, unifica el tono, reduce manchas y protege contra el dano oxidativo.',
  },
];

export default function Beneficios() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="beneficios" className="lum-section lum-beneficios">
      <div className="lum-container">
        <h2 className="lum-section-title">
          Por que elegir <span className="lum-accent">Lumina</span>
        </h2>
        <div className="lum-card-grid">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="lum-card lum-card-reveal"
              style={{ ['--card-delay' as string]: `${i * 0.15}s` }}
            >
              <button
                onClick={() => setSelected(b.title)}
                className="lum-card-btn"
              >
                <div className="lum-card-icon">{b.icon}</div>
                <h3 className="lum-card-title">{b.title}</h3>
                <p className="lum-card-desc">{b.desc}</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="ben-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 150,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
              }}
            />
            <div
              style={{
                position: 'fixed', inset: 0, zIndex: 151,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              {(() => {
                const b = BENEFITS.find(x => x.title === selected);
                if (!b) return null;
                return (
                  <motion.article
                    key="ben-modal"
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 20 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    style={{
                      pointerEvents: 'auto',
                      width: 'min(92vw, 480px)',
                      maxHeight: '80dvh',
                      overflow: 'auto',
                      margin: 16,
                      background: 'var(--lum-bg)',
                      borderRadius: 20,
                      padding: 32,
                      boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
                      color: 'var(--lum-text)',
                      textAlign: 'center',
                    }}
                  >
                    <button
                      onClick={() => setSelected(null)}
                      style={{
                        position: 'absolute', top: 12, right: 16,
                        background: 'none', border: 'none', fontSize: 28,
                        color: 'var(--lum-muted)', cursor: 'pointer', lineHeight: 1,
                      }}
                    >
                      &times;
                    </button>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>{b.icon}</div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>{b.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--lum-muted)', margin: 0 }}>{b.detail}</p>
                  </motion.article>
                );
              })()}
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .lum-card-reveal {
          view-timeline-name: --card;
          view-timeline-axis: block;
          animation: lum-card-entry both;
          animation-timeline: view(block);
          animation-range: entry 0% entry 100%;
        }
        @media (prefers-reduced-motion: no-preference) {
          .lum-card {
            perspective: 800px;
            transform-style: preserve-3d;
          }
          .lum-card:hover {
            transform: translateY(-6px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
            transition: transform 0.3s ease-out;
          }
        }
        @keyframes lum-card-entry {
          entry 0% { opacity: 0.1; transform: translateY(40px) scale(0.95); }
          entry 100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `{
  var cards = document.querySelectorAll('.lum-card');
  cards.forEach(function(c) {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    c.addEventListener('mousemove', function(e) {
      var r = c.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      c.style.setProperty('--tilt-x', (-y * 8) + 'deg');
      c.style.setProperty('--tilt-y', (x * 8) + 'deg');
    });
    c.addEventListener('mouseleave', function() {
      c.style.setProperty('--tilt-x', '0deg');
      c.style.setProperty('--tilt-y', '0deg');
    });
  });
}`,
        }}
      />
    </section>
  );
}
