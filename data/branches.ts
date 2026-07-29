import bannerComboImage from "@/app/assets/banners/banner-combo.webp";
import bannerEnvioImage from "@/app/assets/banners/banner-envio.webp";
import { locationsContent } from "@/data/landingContent";
import type { Branch, PaymentMethod, Promotion } from "@/types/ordering";

// Demo payment methods — the branch confirms the actual method by WhatsApp.
export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "efectivo", name: "Efectivo", enabled: true, requiresCashAmount: true },
  { id: "transferencia", name: "Transferencia", enabled: true },
  { id: "coordinar", name: "A coordinar por WhatsApp", enabled: true },
];

// Demo promotions — replace with each branch's real, date-bound deals.
// Mixes both slide kinds the banner supports: plain icon+text and full banner images.
export const DEFAULT_PROMOTIONS: Promotion[] = [
  {
    kind: "text",
    id: "promo-delivery",
    title: "Envío gratis",
    description: "En pedidos desde $20.000",
    icon: "delivery",
  },
  {
    kind: "text",
    id: "promo-combo-day",
    title: "Martes de combos",
    description: "10% off en todos los combos",
    icon: "discount",
  },
  {
    kind: "image",
    id: "promo-banner-envio",
    image: bannerEnvioImage,
    alt: "Envío gratis en pedidos desde $20.000",
  },
  {
    kind: "image",
    id: "promo-banner-combo",
    image: bannerComboImage,
    alt: "Martes de combos: 10% off en todos los combos",
  },
];

// Demo scheduling slots — replace with each branch's real availability.
export const SCHEDULE_SLOTS: string[] = [
  "12:00 a 12:30",
  "12:30 a 13:00",
  "13:00 a 13:30",
  "20:00 a 20:30",
  "20:30 a 21:00",
  "21:00 a 21:30",
];

const DIACRITICS_PATTERN = /[̀-ͯ]/g;

function slugifyCity(city: string) {
  return city
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_PATTERN, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Ordering-specific branch data, layered on top of the real location data in
// landingContent.ts so address/city/phone never drift out of sync between the
// homepage and the ordering flow.
export const BRANCHES: Branch[] = locationsContent.locations
  .filter((location) => location.menuAvailable && location.slug)
  .map((location) => ({
    id: location.id,
    slug: location.slug as string,
    city: location.city,
    citySlug: slugifyCity(location.city),
    zone: location.zone,
    name: `${location.city} ${location.zone}`,
    address: location.address,
    whatsappNumber: location.phone.replace(/\D/g, ""),
    deliveryEnabled: true,
    pickupEnabled: true,
    deliveryFee: 1500,
    estimatedDeliveryTime: "35 a 50 min",
    estimatedPickupTime: "15 a 20 min",
    schedulingEnabled: true,
    paymentMethods: PAYMENT_METHODS,
    promotions: DEFAULT_PROMOTIONS,
  }));

export function getBranchBySlug(slug: string): Branch | undefined {
  return BRANCHES.find((branch) => branch.slug === slug);
}
