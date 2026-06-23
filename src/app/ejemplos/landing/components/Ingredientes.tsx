'use client';

import { motion } from 'framer-motion';

const INGREDIENTS = [
  { name: 'Acido Hialuronico', desc: 'Hidratacion profunda y relleno de arrugas', detail: 'El acido hialuronico de triple peso molecular hidrata desde la superficie hasta las capas mas profundas de la piel, reduciendo visiblemente las lineas de expresion y aportando volumen natural.', color: '#b87676', potency: 95 },
  { name: 'Vitamina C', desc: 'Antioxidante que ilumina y unifica el tono', detail: 'La vitamina C estabilizada ilumina el cutis, reduce manchas oscuras, unifica el tono y protege contra el dano de los radicales libres y la contaminacion.', color: '#d4a84b', potency: 85 },
  { name: 'Rosa Mosqueta', desc: 'Regenera la piel y reduce cicatrices', detail: 'El aceite de rosa mosqueta es rico en acidos grasos esenciales y vitamina A, que estimulan la regeneracion celular, mejoran la textura de la piel y reducen cicatrices y marcas.', color: '#8faa7a', potency: 78 },
  { name: 'Aloe Vera', desc: 'Calma la irritacion y aporta frescura', detail: 'El aloe vera puro tiene propiedades antiinflamatorias y calmantes que alivian la irritacion, las rojeces y las quemaduras solares, mientras aporta una sensacion de frescura inmediata.', color: '#7a9e9e', potency: 70 },
  { name: 'Colageno Vegetal', desc: 'Mejora la elasticidad y firmeza', detail: 'El colageno vegetal de origen sostenible estimula la produccion natural de colageno en la piel, mejorando su elasticidad, firmeza y reduciendo la flacidez.', color: '#b87676', potency: 88 },
  { name: 'Aceite de Jojoba', desc: 'Regula la produccion de sebo natural', detail: 'El aceite de jojoba es estructuralmente similar al sebo humano, por lo que equilibra la produccion de grasa natural, hidrata sin obstruir poros y es ideal para pieles mixtas y grasas.', color: '#d4a84b', potency: 72 },
];

export default function Ingredientes() {
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
                popoverTarget={`pop-ing-${ing.name.toLowerCase().replace(/\s+/g, '-')}`}
                popoverTargetAction="toggle"
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
              <div
                id={`pop-ing-${ing.name.toLowerCase().replace(/\s+/g, '-')}`}
                popover="auto"
                className="lum-popover"
              >
                <button
                  popoverTarget={`pop-ing-${ing.name.toLowerCase().replace(/\s+/g, '-')}`}
                  popoverTargetAction="hide"
                  className="lum-popover-close"
                  aria-label="Cerrar"
                >
                  &times;
                </button>
                <h3 className="lum-popover-title" style={{ color: ing.color }}>{ing.name}</h3>
                <p className="lum-popover-text">{ing.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
