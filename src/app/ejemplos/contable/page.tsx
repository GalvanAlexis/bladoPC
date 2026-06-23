'use client';

import Nav from './components/Nav';
import Hero from './components/Hero';
import Contadores from './components/Contadores';
import Proceso from './components/Proceso';
import Timeline from './components/Timeline';
import Servicios from './components/Servicios';
import Diferenciales from './components/Diferenciales';
import Equipo from './components/Equipo';
import Recursos from './components/Recursos';
import FAQ from './components/FAQ';
import Contacto from './components/Contacto';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { useAdmin } from './hooks/useAdmin';

export default function ContablePage() {
  const admin = useAdmin();

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: '#f5f3f0',
        color: '#1a1a1a',
        minHeight: '100dvh',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .con-card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
          .con-card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(122,26,26,0.08); }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <Nav />
      <Hero tagline={admin.heroTagline} desc={admin.heroDesc} />
      <Contadores />
      <Proceso />
      <Timeline />
      <Servicios servicios={admin.servicios} />
      <Diferenciales />
      <Equipo equipo={admin.equipo} />
      <Recursos recursos={admin.recursos} />
      <FAQ faq={admin.faq} />
      <Contacto />
      <Newsletter />
      <Footer />
    </div>
  );
}
