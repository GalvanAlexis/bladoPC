'use client';

const TESTIMONIALS = [
  {
    name: 'Carolina M.',
    text: 'Desde que uso Lumina mi piel se ve mas luminosa y las lineas de expresion se notan mucho menos. Lo recomiendo 100%.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    name: 'Valentina R.',
    text: 'Habia probado mil serums y ninguno me habia funcionado como este. En dos semanas note la diferencia.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
  {
    name: 'Camila L.',
    text: 'Me encanta que sea natural y que realmente funcione. La textura es super suave y huele increible.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=120&q=80',
  },
];

export default function Testimonios() {
  return (
    <section id="testimonios" className="lum-section lum-testimonios">
      <div className="lum-container">
        <h2 className="lum-section-title">Lo que dicen nuestras clientas</h2>
        <p className="lum-section-sub">Resultados reales de mujeres como vos</p>
        <div className="lum-testimonial-hscroll">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="lum-card lum-testimonial-card lum-testimonial-reveal"
              style={{ ['--t-delay' as string]: `${i * 0.15}s` }}
            >
              <div className="lum-testimonial-header">
                <div className="lum-testimonial-avatar">
                  <img src={t.img} alt={t.name} loading="lazy" width="44" height="44" className="lum-avatar-img" />
                </div>
                <div>
                  <div className="lum-stars">{'★'.repeat(t.rating)}</div>
                  <span className="lum-testimonial-name">{t.name}</span>
                </div>
              </div>
              <p className="lum-testimonial-text">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .lum-testimonial-hscroll {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 16px;
          scrollbar-width: thin;
        }
        .lum-testimonial-hscroll > .lum-card {
          flex: 0 0 320px;
          scroll-snap-align: start;
        }
        .lum-testimonial-reveal {
          view-timeline-name: --testimonial;
          view-timeline-axis: block;
          animation: lum-testimonial-entry both;
          animation-timeline: view(block);
          animation-range: entry 0% entry 100%;
        }
        @keyframes lum-testimonial-entry {
          entry 0% { opacity: 0.1; transform: translateY(30px) scale(0.97); }
          entry 100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
