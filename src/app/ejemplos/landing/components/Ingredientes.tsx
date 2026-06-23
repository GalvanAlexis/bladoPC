'use client';

const INGREDIENTS = [
  { name: 'Acido Hialuronico', desc: 'Hidratacion profunda y relleno de arrugas', detail: 'El acido hialuronico de triple peso molecular hidrata desde la superficie hasta las capas mas profundas de la piel, reduciendo visiblemente las lineas de expresion y aportando volumen natural.', color: '#b87676' },
  { name: 'Vitamina C', desc: 'Antioxidante que ilumina y unifica el tono', detail: 'La vitamina C estabilizada ilumina el cutis, reduce manchas oscuras, unifica el tono y protege contra el dano de los radicales libres y la contaminacion.', color: '#d4a84b' },
  { name: 'Rosa Mosqueta', desc: 'Regenera la piel y reduce cicatrices', detail: 'El aceite de rosa mosqueta es rico en acidos grasos esenciales y vitamina A, que estimulan la regeneracion celular, mejoran la textura de la piel y reducen cicatrices y marcas.', color: '#8faa7a' },
  { name: 'Aloe Vera', desc: 'Calma la irritacion y aporta frescura', detail: 'El aloe vera puro tiene propiedades antiinflamatorias y calmantes que alivian la irritacion, las rojeces y las quemaduras solares, mientras aporta una sensacion de frescura inmediata.', color: '#7a9e9e' },
  { name: 'Colageno Vegetal', desc: 'Mejora la elasticidad y firmeza', detail: 'El colageno vegetal de origen sostenible estimula la produccion natural de colageno en la piel, mejorando su elasticidad, firmeza y reduciendo la flacidez.', color: '#b87676' },
  { name: 'Aceite de Jojoba', desc: 'Regula la produccion de sebo natural', detail: 'El aceite de jojoba es estructuralmente similar al sebo humano, por lo que equilibra la produccion de grasa natural, hidrata sin obstruir poros y es ideal para pieles mixtas y grasas.', color: '#d4a84b' },
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
          {INGREDIENTS.map((ing) => (
            <div key={ing.name} className="lum-ing-card" style={{ borderLeftColor: ing.color }}>
              <button
                popoverTarget={`pop-ing-${ing.name.toLowerCase().replace(/\s+/g, '-')}`}
                popoverTargetAction="toggle"
                className="lum-ing-btn"
              >
                <h3 className="lum-ing-name">{ing.name}</h3>
                <p className="lum-ing-desc">{ing.desc}</p>
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
