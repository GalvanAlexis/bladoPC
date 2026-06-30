import { notFound } from 'next/navigation';
import Link from 'next/link';
import { findProfessionalById, PROFESSIONALS } from '@/lib/marketplace-data';

const S = {
  section: { minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-sans)' },
  container: { paddingTop: 'clamp(100px, 15vh, 160px)', paddingBottom: 'clamp(80px, 12vh, 140px)' },
  back: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px' },
  card: { borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', padding: 'clamp(24px, 4vw, 40px)' },
  label: { fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '6px' },
};

export function generateStaticParams() {
  return PROFESSIONALS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pro = findProfessionalById(slug);
  if (!pro) return { title: 'Profesional no encontrado' };
  return { title: `${pro.name} - ${pro.subcategory} | Profesional a Domicilio`, description: pro.bio };
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < full ? '#eab308' : 'var(--border)'} stroke={i < full ? '#eab308' : 'var(--border)'} strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    );
  }
  return <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>{stars}</div>;
}

export default async function ProfessionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pro = findProfessionalById(slug);
  if (!pro) notFound();

  const ratingBg = pro.rating >= 4.8 ? 'rgba(34,197,94,0.1)' : pro.rating >= 4.5 ? 'rgba(234,179,8,0.1)' : 'rgba(239,68,68,0.1)';
  const ratingColor = pro.rating >= 4.8 ? '#22c55e' : pro.rating >= 4.5 ? '#eab308' : '#ef4444';

  const whatsappMsg = encodeURIComponent(
    `Hola ${pro.name.split(' ')[0]}! Te contacto desde Profesional a Domicilio. Vi tu perfil y me interesa contratar tu servicio de ${pro.subcategory.toLowerCase()}. Podemos coordinar?`
  );

  return (
    <div style={S.section}>
      <div className="section-container" style={S.container}>
        <Link href="/ejemplos/marketplace" style={S.back}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 12L6 8l4-4" /></svg>
          Volver al directorio
        </Link>

        <div style={S.card}>
          <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 28px)', flexDirection: 'row', flexWrap: 'wrap' }}>
            <div style={{ width: 'clamp(80px, 12vw, 120px)', height: 'clamp(80px, 12vw, 120px)', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, flexShrink: 0 }}>
              {pro.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <h1 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, margin: 0 }}>{pro.name}</h1>
                {pro.featured && <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '3px 10px', borderRadius: '999px', background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Destacado</span>}
              </div>
              <div style={{ fontSize: '15px', color: 'var(--accent)', fontWeight: 500, marginBottom: '8px' }}>{pro.subcategory}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--muted)' }}>
                <span>{pro.location}</span>
                <span>-</span>
                <span>{pro.experience} de experiencia</span>
                <span>-</span>
                <span>{pro.availability}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, padding: '4px 12px', borderRadius: '8px', background: ratingBg, color: ratingColor, display: 'inline-block', marginBottom: '4px' }}>
                {pro.rating.toFixed(1)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4px' }}><StarRating rating={pro.rating} /></div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{pro.reviewCount} resenas</div>
            </div>
          </div>

          <div className="section-divider" style={{ marginTop: '28px', marginBottom: '28px' }} />

          <div style={{ maxWidth: '680px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 6px 0' }}>Sobre mi</h2>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--foreground-2)', margin: '0 0 32px 0' }}>{pro.bio}</p>
          </div>

          <h2 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 16px 0' }}>Servicios y precios</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px', marginBottom: '32px' }}>
            {pro.services.map((svc) => (
              <div key={svc.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{svc.name}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>{svc.price}</span>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 16px 0' }}>Resenas de clientes ({pro.reviewCount})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
            {pro.reviews.map((rev, i) => (
              <div key={i} style={{ padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{rev.client}</span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{rev.date}</span>
                </div>
                <StarRating rating={rev.rating} />
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--foreground-2)', margin: '8px 0 0 0' }}>{rev.comment}</p>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${pro.phone}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', borderRadius: '12px', background: '#25D366', color: '#fff', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contactar por WhatsApp
          </a>
          <p style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center', marginTop: '8px' }}>
            Te abrira WhatsApp con un mensaje pre-armado. Puedes editarlo antes de enviar.
          </p>
        </div>
      </div>
    </div>
  );
}
