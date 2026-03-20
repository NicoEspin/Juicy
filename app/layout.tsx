import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Bebas_Neue,
  DM_Sans,
  Pacifico,
  Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const pacifico = Pacifico({
  variable: "--font-display-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
});

const siteUrl = "https://juicy-burguers.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c41e1e",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Juicy Hamburgers | Taste the Difference",
    template: "%s | Juicy Hamburgers",
  },
  description:
    "Landing editorial de Juicy Hamburgers: burgers premium, actitud retro americana y dos spots en Villa Carlos Paz con Buenos Aires en camino.",
  keywords: [
    "Juicy Hamburgers",
    "hamburguesas Villa Carlos Paz",
    "burger premium Cordoba",
    "Buenos Aires waitlist burgers",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Juicy Hamburgers",
    title: "Juicy Hamburgers | Taste the Difference",
    description:
      "Burgers premium, identidad retro americana y una experiencia pensada para abrir el apetito antes del primer scroll.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Juicy Hamburgers | Taste the Difference",
    description:
      "Burgers premium, identidad retro americana y una experiencia pensada para abrir el apetito antes del primer scroll.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(pacifico.variable, bebasNeue.variable, dmSans.variable, playfairDisplay.variable, "font-sans", geist.variable)}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
