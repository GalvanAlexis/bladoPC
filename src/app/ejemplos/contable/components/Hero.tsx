'use client';

import { motion } from 'framer-motion';
import PresupuestoForm from './PresupuestoForm';

const GRANATE = '#7a1a1a';
const GRANATE_DARK = '#5a1010';
const GRANATE_LIGHT = '#9a2a2a';

interface Props {
  tagline: string;
  desc: string;
}

export default function Hero({ tagline, desc }: Props) {
  return (
    <section
      id="hero"
      style={{
        minHeight: '85dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: `linear-gradient(135deg, ${GRANATE_DARK} 0%, ${GRANATE} 50%, ${GRANATE_LIGHT} 100%)`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'overlay',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '120px 24px 80px',
          maxWidth: 720,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            fontSize: 12,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 600,
            margin: '0 0 16px 0',
          }}
        >
          {tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{
            fontSize: 'clamp(30px, 5vw, 50px)',
            fontWeight: 700,
            lineHeight: 1.12,
            margin: '0 0 20px 0',
            color: '#fff',
          }}
        >
          Tu contador de confianza,
          <br />
          <span style={{ borderBottom: '2px solid rgba(255,255,255,0.3)' }}>siempre cerca</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 32px 0',
            maxWidth: 540,
            marginInline: 'auto',
          }}
        >
          {desc}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <PresupuestoForm label="Solicitar presupuesto" />
          <a
            href="#servicios"
            style={{
              display: 'inline-block', padding: '14px 36px', borderRadius: 6,
              background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff', fontSize: 14, fontWeight: 600,
              textDecoration: 'none', cursor: 'pointer',
            }}
          >
            Conocer servicios
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
