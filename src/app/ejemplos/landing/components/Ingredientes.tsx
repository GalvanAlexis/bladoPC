'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INGREDIENTS = [
  { name: 'Acido Hialuronico', desc: 'Hidratacion profunda y relleno de arrugas', detail: 'El acido hialuronico de triple peso molecular hidrata desde la superficie hasta las capas mas profundas de la piel, reduciendo visiblemente las lineas de expresion y aportando volumen natural.', color: '#b87676', potency: 95 },
  { name: 'Vitamina C', desc: 'Antioxidante que ilumina y unifica el tono', detail: 'La vitamina C estabilizada ilumina el cutis, reduce manchas oscuras, unifica el tono y protege contra el dano de los radicales libres y la contaminacion.', color: '#d4a84b', potency: 85 },
  { name: 'Rosa Mosqueta', desc: 'Regenera la piel y reduce cicatrices', detail: 'El aceite de rosa mosqueta es rico en acidos grasos esenciales y vitamina A, que estimulan la regeneracion celular, mejoran la textura de la piel y reducen cicatrices y marcas.', color: '#8faa7a', potency: 78 },
  { name: 'Aloe Vera', desc: 'Calma la irritacion y aporta frescura', detail: 'El aloe vera puro tiene propiedades antiinflamatorias y calmantes que alivian la irritacion, las rojeces y las quemaduras solares, mientras aporta una sensacion de frescura inmediata.', color: '#7a9e9e', potency: 70 },
  { name: 'Colageno Vegetal', desc: 'Mejora la elasticidad y firmeza', detail: 'El colageno vegetal de origen sostenible estimula la produccion natural de colageno en la piel, mejorando su elasticidad, firmeza y reduciendo la flacidez.', color: '#b87676', potency: 88 },
  { name: 'Aceite de Jojoba', desc: 'Regula la produccion de sebo natural', detail: 'El aceite de jojoba es estructuralmente similar al sebo humano, por lo que equilibra la produccion de grasa natural, hidrata sin obstruir poros y es ideal para pieles mixtas y grasas.', color: '#d4a84b', potency: 72 },
];

export default function Ingredientes() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="ingredientes" className="lum-section lum-ingredientes">
      <div className="lum-container">
        <h2 className="lum-section-title">Ingredientes que importan</h2>
        <p className="lum-section-sub">
          Cada componente fue seleccionado por su eficacia comprobada y su origen sostenible.
        </p>
        <div className="lum-ing-grid">
          {INGREDIENTS.map((ing, i) => (
            <div key={ing.name} className="lum-ing-card" style={{ borderLeftColor: ing.color }}>
              <button
                onClick={() => setSelected(ing.name)}
                className="lum-ing-btn"
              >
                <h3 className="lum-ing-name">{ing.name}</h3>
                <p className="lum-ing-desc">{ing.desc}</p>
                <div
                  style={{
                    marginTop: 12,
                    height: 6,
                    borderRadius: 3,
                    background: 'rgba(184,118,118,0.12)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${ing.potency}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }}
                    style={{
                      height: '100%',
                      borderRadius: 3,
                      background: `linear-gradient(90deg, ${ing.color}, ${ing.color}88)`,
                    }}
                  />
                </div>
                <span
                  style={{
                    display: 'block',
                    marginTop: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    color: ing.color,
                    textAlign: 'right',
                  }}
                >
                  {ing.potency}%
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="ing-backdrop"
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
                const ing = INGREDIENTS.find(x => x.name === selected);
                if (!ing) return null;
                return (
                  <motion.article
                    key="ing-modal"
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
                    <div
                      style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: `${ing.color}20`,
                        margin: '0 auto 16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <span style={{ color: ing.color, fontSize: 22, fontWeight: 700 }}>{ing.potency}%</span>
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: ing.color }}>{ing.name}</h3>
                    <div
                      style={{
                        height: 4, borderRadius: 2, margin: '0 auto 16px',
                        maxWidth: 200,
                        background: `linear-gradient(90deg, ${ing.color}, ${ing.color}44)`,
                      }}
                    />
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--lum-muted)', margin: 0 }}>{ing.detail}</p>
                  </motion.article>
                );
              })()}
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
