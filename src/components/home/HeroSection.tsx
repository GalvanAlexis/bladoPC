import React from "react";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Presentación"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Fondo: Video Meme ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-parallax"
        style={{
          position: "absolute",
          top: "-20%",
          left: 0,
          width: "100%",
          height: "140%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        <source src="/video/bad-day.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay oscuro para legibilidad ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.95) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Contenido ── */}
      <div
        className="section-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Label superior */}
        <p
          className="animate-fade-in"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 600,
            marginBottom: "24px",
            animationDelay: "0.1s",
          }}
        >
          Soporte IT · Soluciones Digitales · Ciencia de Datos
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in"
          style={{
            fontSize: "clamp(40px, 7vw, 88px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--foreground)",
            margin: "0 0 16px",
            animationDelay: "0.15s",
            textWrap: "balance",
          }}
        >
          ¿La PC no anda bien? <br className="hidden sm:block" />
          <span style={{ color: "var(--foreground-2)" }}>
            ¿Cansado de tareas repetitivas?
          </span>
        </h1>

        {/* Tagline / Sub-headline */}
        <p
          className="animate-fade-in"
          style={{
            fontSize: "clamp(18px, 2vw, 24px)",
            color: "var(--foreground-2)",
            maxWidth: "640px",
            lineHeight: 1.5,
            margin: "0 0 48px",
            animationDelay: "0.25s",
            textWrap: "pretty",
          }}
        >
          Contactá con Blado para una solución{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>
            sin vueltas
          </span>
          . Dejá de pelear con la tecnología y empezá a aprovecharla.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            animationDelay: "0.35s",
          }}
        >
          <Link href="/servicios" className="btn-primary">
            Ver servicios
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 2v12M2 8l6 6 6-6" />
            </svg>
          </Link>
          <Link href="/chat" className="btn-secondary">
            Hablar con Blado
          </Link>
        </div>
      </div>
    </section>
  );
}
