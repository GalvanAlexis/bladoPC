'use client';

const LAYERS = [
  { size: 300, blur: 120, color: 'rgba(184,118,118,0.04)', speed: 10, left: '5%', top: '15%' },
  { size: 200, blur: 80, color: 'rgba(212,168,75,0.03)', speed: 25, left: '80%', top: '40%' },
  { size: 250, blur: 100, color: 'rgba(143,170,122,0.03)', speed: 18, left: '10%', top: '70%' },
  { size: 180, blur: 60, color: 'rgba(122,158,158,0.03)', speed: 35, left: '75%', top: '80%' },
];

export default function ParallaxDecor() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <style>{`
        @supports (animation-timeline: scroll()) {
          @media (prefers-reduced-motion: no-preference) {
            .lum-parallax-layer {
              animation: lum-parallax linear both;
              animation-timeline: scroll(root block);
            }
          }
        }
        @keyframes lum-parallax {
          from { transform: translateY(0); }
          to { transform: translateY(var(--speed, 20%)); }
        }
      `}</style>
      {LAYERS.map((l, i) => (
        <div
          key={i}
          className="lum-parallax-layer"
          style={{
            position: 'absolute',
            width: l.size,
            height: l.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${l.color} 0%, transparent 70%)`,
            filter: `blur(${l.blur}px)`,
            left: l.left,
            top: l.top,
            ['--speed' as string]: `${l.speed}%`,
          }}
        />
      ))}
    </div>
  );
}
