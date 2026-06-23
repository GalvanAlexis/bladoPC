'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';

export const GALERIA_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80', alt: 'Lumina Serum Frontal' },
  { src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', alt: 'Lumina Serum Botella' },
  { src: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38e34?w=600&q=80', alt: 'Lumina Serum Aplicacion' },
];

interface Props {
  rotateX: number;
  rotateY: number;
}

export default function Galeria({ rotateX, rotateY }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (isHovering || !emblaApi) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovering, emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div
      className="lum-galeria"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="lum-glow-global"
        style={{
          position: 'absolute', inset: -40,
          background: 'radial-gradient(ellipse at center, rgba(184,118,118,0.15), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      <div className="lum-gar-embla" ref={emblaRef}>
        <div className="lum-gar-container">
          {GALERIA_IMAGES.map((img, i) => (
            <div className="lum-gar-slide" key={i}>
              <motion.div
                className="lum-gar-img-wrap"
                style={{ perspective: 1000 }}
                animate={{ rotateX, rotateY }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width="320"
                  height="460"
                  className="lum-gar-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="lum-gar-arrow lum-gar-prev"
        onClick={scrollPrev}
        aria-label="Imagen anterior"
      >
        &#9664;
      </button>
      <button
        className="lum-gar-arrow lum-gar-next"
        onClick={scrollNext}
        aria-label="Imagen siguiente"
      >
        &#9654;
      </button>

      <div className="lum-gar-dots">
        {GALERIA_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`lum-gar-dot ${i === selectedIndex ? 'lum-gar-dot-active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
      <style>{`
        .lum-galeria {
          position: relative;
          width: 320px;
          margin: 0 auto;
          user-select: none;
        }
        .lum-gar-embla {
          overflow: hidden;
          border-radius: 20px;
        }
        .lum-gar-container {
          display: flex;
        }
        .lum-gar-slide {
          flex: 0 0 100%;
          min-width: 0;
        }
        .lum-gar-img-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px;
        }
        .lum-gar-img {
          width: 100%;
          height: auto;
          max-height: 460px;
          object-fit: contain;
          border-radius: 16px;
        }
        .lum-gar-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(4px);
          border: none;
          color: #fff;
          font-size: 13px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.25s ease;
          z-index: 5;
          line-height: 1;
        }
        .lum-gar-arrow:hover {
          background: rgba(0,0,0,0.55);
          transform: translateY(-50%) scale(1.1);
        }
        .lum-galeria:hover .lum-gar-arrow {
          opacity: 1;
        }
        .lum-gar-prev { left: 6px; }
        .lum-gar-next { right: 6px; }
        .lum-gar-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
        }
        .lum-gar-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(184,118,118,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .lum-gar-dot-active {
          background: var(--lum-primary, #b87676);
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(184,118,118,0.5);
        }
        @media (max-width: 480px) {
          .lum-gar-arrow {
            opacity: 1;
            width: 32px;
            height: 32px;
            font-size: 11px;
          }
          .lum-gar-prev { left: 4px; }
          .lum-gar-next { right: 4px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lum-gar-arrow { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
