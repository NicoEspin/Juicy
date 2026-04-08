import type { StaticImageData } from "next/image";

// ─── Assets ──────────────────────────────────────────────────────────────────

export interface LandingAssets {
  burger: StaticImageData;
  logo: StaticImageData;
  pet: StaticImageData;
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroContent {
  kicker: string;
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  accent: string;
  description: string;
  tag: string;
  primaryCta: { href: string; label: string; helper: string };
  secondaryCta: { href: string; label: string };
  heroImageAlt: string;
  logoAlt: string;
}

// ─── Philosophy ──────────────────────────────────────────────────────────────

export interface PhilosophyPillar {
  id: string;
  title: string;
  label: string;
  description: string;
}

export interface PhilosophyContent {
  kicker: string;
  eyebrow: string;
  title: string;
  description: string;
  mascotAlt: string;
  pillars: PhilosophyPillar[];
}

// ─── Menu Showcase ───────────────────────────────────────────────────────────

export interface MenuStat {
  value: string;
  label: string;
}

export interface MenuBurgerItem {
  id: string;
  /** Key into landingAssets: "burger" | "logo" | "pet" */
  assetKey: keyof LandingAssets;
  menuNumber?: number;
  isBestSeller?: boolean;
  label: string;
  /** Diagonal corner ribbon text — null hides the ribbon */
  qualityTag: string | null;
  name: string;
  description: string;
  price: string;
  /** Small sub-label under price e.g. "sola" */
  priceNote?: string;
  detail: string;
  ingredients?: string[];
  placeholderNote: string;
  imageAlt: string;
}

export interface MenuShowcaseContent {
  kicker: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  localQuote: string;
  localQuoteCite: string;
  description: string;
  stats: MenuStat[];
  items: MenuBurgerItem[];
  panelTitle: string;
  panelDescription: string;
  cta: {
    label: string;
    href: string;
    whatsapp: string;
    helper: string;
  };
  marqueeItems: string[];
}

// ─── Vibe ────────────────────────────────────────────────────────────────────

export interface VibeCard {
  id: string;
  eyebrow: string;
  title: string;
  caption: string;
  placeholder: string;
  assetKey: keyof LandingAssets;
  accent: string;
}

// Backward-compatible alias used by existing components
export type VibeGalleryItem = VibeCard;

export interface VibeContent {
  kicker: string;
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  items: VibeCard[];
}

// ─── Locations ───────────────────────────────────────────────────────────────

export type LocationStatus = "open" | "soon";

export interface LocationPoint {
  x: number;
  y: number;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface LocationItem {
  id: string;
  city: string;
  zone: string;
  address: string;
  hours: string;
  phone: string;
  whatsappHref?: string;
  mapsHref: string;
  status: LocationStatus;
  badge: string;
  blurb: string;
  mapPoint: LocationPoint;
  coordinates?: GeoPoint;
  placeholderNote?: string;
}

export interface WaitlistContent {
  title: string;
  description: string;
  checkboxLabel: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  privacyHint: string;
}

export interface LocationsContent {
  kicker: string;
  eyebrow: string;
  title: string;
  description: string;
  mapTitle: string;
  mapNote: string;
  mapPlaceholder: string;
  locations: LocationItem[];
  waitlist: WaitlistContent;
}

// ─── Social proof ────────────────────────────────────────────────────────────

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  quote: string;
  note?: string;
}

export interface TrustMetric {
  id: string;
  label: string;
  value: string;
  helper: string;
}

export interface InstagramPlaceholderItem {
  id: string;
  title: string;
  caption: string;
  placeholderNote: string;
  assetKey: keyof LandingAssets;
}

export interface SocialProofContent {
  kicker: string;
  eyebrow: string;
  title: string;
  description: string;
  reviews: ReviewItem[];
  trustMetrics: TrustMetric[];
  instagramTitle: string;
  instagramDescription: string;
  instagramItems: InstagramPlaceholderItem[];
}

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterLocationSummary {
  id: string;
  name: string;
  address: string;
  hours: string;
  note?: string;
}

export interface FooterContent {
  brandTitle: string;
  brandDescription: string;
  navigation: FooterLink[];
  socialLinks: FooterLink[];
  locations: FooterLocationSummary[];
  scheduleTitle: string;
  scheduleSummary: string;
  legalLine: string;
}
