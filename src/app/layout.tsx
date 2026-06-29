import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { allStructuredData } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bladopc.vercel.app"),
  title: {
    template: "%s | Alexis Galvan",
    default: "Alexis Galvan | Desarrollador Full-Stack en Chascomus",
  },
  description:
    "Portfolio de Alexis Galvan, desarrollador Full-Stack, Data Scientist y lider tecnico en Chascomus, Buenos Aires. Desarrollo web, automatizaciones con IA, ciencia de datos y soporte IT.",
  keywords: [
    "desarrollador web Chascomus",
    "desarrollo web Argentina",
    "automatizaciones IA",
    "ciencia de datos",
    "Next.js",
    "React",
    "full-stack developer",
    "Python",
    "Django",
    "TypeScript",
    "reparacion de PC Chascomus",
    "desarrollo software a medida",
  ],
  authors: [{ name: "Alexis Galvan", url: "https://github.com/GalvanAlexis" }],
  creator: "Alexis Galvan",
  publisher: "Alexis Galvan",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "BladoPC - Alexis Galvan",
    title: "Alexis Galvan | Desarrollador Full-Stack en Chascomus",
    description:
      "Portfolio profesional de Alexis Galvan. Desarrollo web, automatizaciones con IA, ciencia de datos y soporte IT en Chascomus.",
    url: "https://bladopc.vercel.app",
    images: [
      {
        url: "https://bladopc.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alexis Galvan - BladoPC Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis Galvan | Desarrollador Full-Stack en Chascomus",
    description:
      "Portfolio profesional de Alexis Galvan. Desarrollo web, automatizaciones con IA, ciencia de datos y soporte IT.",
    images: ["https://bladopc.vercel.app/og-image.png"],
  },
  verification: {
    google: "PENDIENTE-REEMPLAZAR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = allStructuredData();

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/video/bad-day-poster.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('blado-theme');if(t==='light'){document.documentElement.classList.add('blado-light')}}catch(e){}})()`
        }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
