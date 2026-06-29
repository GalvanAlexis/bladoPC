import React from 'react';
import { FAQ_DATA } from '@/data/faq-data';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-label="Preguntas frecuentes sobre servicios IT en Chascomus"
      className="section-padding"
      style={{ position: 'relative' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="section-container">
        <div className="section-divider reveal" />
        <p
          className="reveal"
          style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: '12px',
          }}
        >
          FAQ
        </p>
        <h2
          className="reveal"
          style={{
            fontSize: 'clamp(26px, 4vw, 44px)',
            fontWeight: 700,
            color: 'var(--foreground)',
            margin: '0 0 48px 0',
          }}
        >
          Preguntas frecuentes
        </h2>

        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {FAQ_DATA.map((item, index) => (
            <details
              key={index}
              className="reveal"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <summary
                style={{
                  padding: '20px 24px',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  userSelect: 'none',
                }}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--accent)',
                    transition: 'transform 0.2s',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <div
                style={{
                  padding: '0 24px 20px',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--foreground-2)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '16px',
                  marginTop: '0',
                }}
              >
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
