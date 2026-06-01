import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Crimson_Text } from "next/font/google";
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

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  preload: false,
});

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Blado_Cavern — Portafolio Interactivo",
  description: "Visual Novel RPG oscuro del conocimiento de Alexis Galvan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${crimsonText.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
