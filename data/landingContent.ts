import burguerImage from "@/app/assets/burguer.webp";
import petImage from "@/app/assets/juicy-pet.webp";
import logoImage from "@/app/assets/logo.webp";
import type {
  FooterContent,
  HeroContent,
  InstagramPlaceholderItem,
  LandingAssets,
  LocationsContent,
  MenuShowcaseContent,
  PhilosophyContent,
  SocialProofContent,
  VibeContent,
} from "@/types/landing";

export const landingAssets: LandingAssets = {
  burger: burguerImage,
  logo: logoImage,
  pet: petImage,
};

export const heroContent: HeroContent = {
  kicker: "Villa Carlos Paz / Buenos Aires next",
  eyebrow: "Premium retro-american burgers",
  titleTop: "Taste The",
  titleBottom: "Difference",
  accent: "Hecha para entrar por los ojos antes del primer mordisco.",
  description:
    "Juicy mezcla actitud de diner clásico, producto protagonista y una identidad roja que no pide permiso. Dos spots en Villa Carlos Paz. Buenos Aires en camino.",
  tag: "Feelin' it",
  primaryCta: {
    href: "#locations",
    label: "Encontrá tu Juicy",
    helper: "Bajá directo a sucursales y lista de espera BA.",
  },
  secondaryCta: {
    href: "#philosophy",
    label: "Ver la filosofía",
  },
  heroImageAlt:
    "Hamburguesa premium de Juicy con pan brioche, doble carne y capas de ingredientes frescos",
  logoAlt: "Logo de Juicy Hamburgers",
};

export const philosophyContent: PhilosophyContent = {
  kicker: "What we do",
  eyebrow: "Brand before decoration",
  title: "Burgers que se sienten.",
  description:
    "No vendemos una burger apurada. Vendemos textura, humo, jugo y memoria. Cada capa responde a una idea simple: si no genera deseo real, no sale de cocina.",
  mascotAlt: "Mascota Juicy Dog en rojo, usada como firma visual de la marca",
  pillars: [
    {
      id: "meat",
      title: "Carne propia",
      label: "01",
      description:
        "Blend pensado para sostener jugosidad, costra y mordida sin perder identidad.",
    },
    {
      id: "craft",
      title: "Sin atajos",
      label: "02",
      description:
        "Pan, salsas y armado al servicio del sabor. Menos relleno, más criterio.",
    },
    {
      id: "fire",
      title: "Cocción perfecta",
      label: "03",
      description:
        "Plancha, calor y timing calibrados para que el producto llegue con presencia.",
    },
  ],
};

export const menuShowcaseContent: MenuShowcaseContent = {
  // ── Header ───────────────────────────────────────────────────
  kicker: "Lo que pedís siempre",
  eyebrow: "Nuestra carta · ",

  titleLine1: "Una mordida",
  titleLine2: "y chau",
  titleLine3: "dieta.",

  localQuote: "LA mejor p*ta hamburguesa",
  localQuoteCite: "Cliente de siempre, Carlos Paz",

  description:
    "Carne 100% de ternera argentina, pan brioche artesanal horneado esa mañana y salsas que no encontrás en ningún otro lado. Así de simple, así de bueno.",

  // ── Stats ────────────────────────────────────────────────────
  stats: [
    { value: "100%", label: "Ternera arg." },
    { value: "+5", label: "Años abiertos" },
    { value: "0", label: "Congelados" },
  ],

  // ── Cards ────────────────────────────────────────────────────
  items: [
    {
      id: "la-juicy",
      assetKey: "burger", // ← key real en landingAssets
      menuNumber: 1,
      isBestSeller: true,
      label: "La emblema",
      qualityTag: "100% RES",
      name: "La Juicy",
      description: "La que le da nombre al lugar. No hay más nada que decir.",
      price: "$6.800",
      priceNote: "sola",
      detail:
        "Medallón de 200g, cheddar fundido, cebolla caramelizada, panceta crocante y nuestra salsa secreta Juicy.",
      ingredients: ["Cheddar", "Panceta", "Caramelizada", "Salsa Juicy"],
      placeholderNote: "La más pedida",
      imageAlt:
        "La Juicy — hamburguesa emblema de Juicy Carlos Paz con cheddar y panceta",
    },
    {
      id: "la-cordobesa",
      assetKey: "burger", // misma imagen hasta tener assets propios
      menuNumber: 2,
      isBestSeller: false,
      label: "Edición Córdoba",
      qualityTag: null,
      name: "La Cordobesa",
      description:
        "Para los que dicen que acá se come distinto. Y tienen razón.",
      price: "$7.200",
      priceNote: "sola",
      detail:
        "Doble medallón, queso azul, rúcula, tomate confitado y alioli de ajo negro.",
      ingredients: ["Q. Azul", "Rúcula", "Alioli"],
      placeholderNote: "Edición limitada",
      imageAlt:
        "La Cordobesa — hamburguesa con queso azul y alioli de ajo negro",
    },
    {
      id: "la-serrana",
      assetKey: "burger",
      menuNumber: 3,
      isBestSeller: false,
      label: "De las sierras",
      qualityTag: null,
      name: "La Serrana",
      description: "Inspirada en el sabor de las sierras de Córdoba.",
      price: "$6.500",
      priceNote: "sola",
      detail:
        "Medallón 180g, provoleta grillada, chimichurri de la casa, pepino y crispy onions.",
      ingredients: ["Provoleta", "Chimichurri", "Crispy"],
      placeholderNote: "Fan favourite",
      imageAlt: "La Serrana — hamburguesa con provoleta grillada y chimichurri",
    },
  ],

  // ── Panel rojo ───────────────────────────────────────────────
  panelTitle: "Todo el menú te espera.",
  panelDescription:
    "Entradas, hamburguesas, combos, papas y bebidas. Todo hecho con el mismo amor con el que empezamos en 2025.",

  cta: {
    label: "Ver menú completo",
    href: "/menu",
    whatsapp:
      "https://wa.me/543541000000?text=Hola!%20Quiero%20hacer%20un%20pedido%20%F0%9F%94%A5",
    helper: "También podés pedir por WhatsApp",
  },

  // ── Marquee ──────────────────────────────────────────────────
  marqueeItems: [
    "Sabor irresistible",
    "Pan brioche artesanal",
    "Carlos Paz · Córdoba",
    "Buenos Aires · Proximamente",
    "Salsas de la casa",
    "Desde 2025",
    "Papas con sazonador",
    "Hecho con amor",
  ],
};

export const vibeContent: VibeContent = {
  kicker: "The vibe",
  eyebrow: "Immersive gallery",
  title: "Mas que una burger.",
  description:
    "La galeria ya queda preparada como cinta inmersiva premium. Hoy muestra placeholders nobles y assets existentes; manana recibe fotos del local, cocina y equipo sin cambiar la direccion visual.",
  note: "Marquee continuo en loop infinito. Reduced motion deja una version estatica accesible.",
  items: [
    {
      id: "vibe-burger-hero",
      eyebrow: "Product hero",
      title: "Portada de sabor",
      caption:
        "El producto sigue siendo el centro, incluso dentro de la seccion atmosferica.",
      placeholder: "Aca entra fotografia real de burger con styling editorial.",
      assetKey: "burger",
      accent: "rotate-[-2deg]",
    },
    {
      id: "vibe-logo-sign",
      eyebrow: "Brand detail",
      title: "Logo como neon de diner",
      caption:
        "Sirve para detalles de local, packaging o carteleria cuando llegue el material final.",
      placeholder: "Placeholder para close-ups de branding y senaletica.",
      assetKey: "logo",
      accent: "rotate-[2deg]",
    },
    {
      id: "vibe-pet-corner",
      eyebrow: "Mascot moment",
      title: "Juicy Dog en escena",
      caption:
        "La mascota sostiene identidad y juego visual en placas, menus o murales.",
      placeholder: "Reservado para fotos reales del personaje aplicado en el local.",
      assetKey: "pet",
      accent: "rotate-[-3deg]",
    },
    {
      id: "vibe-kitchen",
      eyebrow: "Kitchen heat",
      title: "Plancha, fuego, ritmo",
      caption: "Card placeholder lista para reemplazar por cocina, proceso y humo real.",
      placeholder: "Falta asset del cliente: cocina / equipo / backstage.",
      assetKey: "burger",
      accent: "rotate-[1.5deg]",
    },
    {
      id: "vibe-counter",
      eyebrow: "Counter culture",
      title: "La barra como escenario",
      caption: "Espacio reservado para ambiente, detalles y textura del local.",
      placeholder: "Falta asset del cliente: interior, barra o mesas.",
      assetKey: "logo",
      accent: "rotate-[2.5deg]",
    },
    {
      id: "vibe-service",
      eyebrow: "Service energy",
      title: "Equipo con actitud",
      caption:
        "La secuencia esta pensada para rostros, manos, delantales y energia humana.",
      placeholder: "Falta asset del cliente: staff y servicio.",
      assetKey: "pet",
      accent: "rotate-[-2deg]",
    },
    {
      id: "vibe-delivery",
      eyebrow: "Delivery cue",
      title: "Packaging y salida",
      caption:
        "Deja espacio para bolsas, stickers y ecosistema de marca fuera del local.",
      placeholder: "Falta asset del cliente: packaging / entrega / takeaway.",
      assetKey: "burger",
      accent: "rotate-[3deg]",
    },
    {
      id: "vibe-night",
      eyebrow: "Late-night mood",
      title: "Noche roja, hambre real",
      caption: "Cierre visual para fotos nocturnas, reflejos y tomas con atmosfera.",
      placeholder: "Falta asset del cliente: exterior nocturno o ambiente con publico.",
      assetKey: "logo",
      accent: "rotate-[-1.5deg]",
    },
  ],
};

const instagramPlaceholderItems: InstagramPlaceholderItem[] = [
  {
    id: "ig-burger-hero",
    title: "Close-up burger",
    caption: "Plano detalle de producto para feed premium.",
    placeholderNote: "Falta asset real del cliente para IG post hero.",
    assetKey: "burger",
  },
  {
    id: "ig-logo-moment",
    title: "Brand frame",
    caption: "Cartelería, packaging o señalética de local.",
    placeholderNote: "Reservado para contenido real de marca en local.",
    assetKey: "logo",
  },
  {
    id: "ig-pet-story",
    title: "Mascot post",
    caption: "Juicy Dog como recurso social y de campaña.",
    placeholderNote: "Falta asset de mascota aplicado en piezas reales.",
    assetKey: "pet",
  },
  {
    id: "ig-night-vibe",
    title: "Night vibe",
    caption: "Ambiente nocturno, barra y energía del local.",
    placeholderNote: "Falta asset de ambiente real / servicio en hora pico.",
    assetKey: "burger",
  },
  {
    id: "ig-team-shot",
    title: "Team shot",
    caption: "Equipo y operación con foco humano.",
    placeholderNote: "Falta asset del equipo en producción real.",
    assetKey: "logo",
  },
  {
    id: "ig-packaging",
    title: "Delivery cue",
    caption: "Packaging y salida para reforzar conversión delivery.",
    placeholderNote: "Falta asset real de packaging/takeaway.",
    assetKey: "pet",
  },
];

export const socialProofContent: SocialProofContent = {
  kicker: "Lo que dicen",
  eyebrow: "Social proof",
  title: "La gente habla y nosotros escuchamos.",
  description:
    "Esta sección está lista para reviews reales de Google e Instagram. Mientras tanto, usamos contenido editorial seguro para sostener credibilidad sin inventar métricas falsas.",
  reviews: [
    {
      id: "review-1",
      author: "Martina R.",
      source: "Google",
      sourceHandle: "Reseña verificada",
      rating: 5,
      date: "Hace 2 semanas",
      quote:
        "El pan llega impecable, la carne con costra real y el sabor no se cae en ningún bocado.",
      note: "Placeholder basado en tono esperado de reviews reales.",
    },
    {
      id: "review-2",
      author: "Lucas G.",
      source: "Instagram",
      sourceHandle: "@lucascome",
      rating: 5,
      date: "Hace 6 días",
      quote:
        "Fui por recomendación y terminé volviendo a la semana. Tiene identidad, no copia a nadie.",
      note: "Reemplazar por testimonial real cuando cliente lo comparta.",
    },
    {
      id: "review-3",
      author: "Valen C.",
      source: "Google",
      sourceHandle: "Local guide",
      rating: 5,
      date: "Hace 1 mes",
      quote:
        "La atención va al mismo ritmo que la cocina. Todo sale prolijo y con hambre de volver.",
      note: "Placeholder curado para mantener narrativa de marca.",
    },
    {
      id: "review-4",
      author: "Santi M.",
      source: "Instagram",
      sourceHandle: "@santimvcp",
      rating: 4,
      date: "Hace 10 días",
      quote:
        "Gran spot para noche en Carlos Paz. Pedís una vez y ya sabés qué volver a pedir.",
      note: "Pendiente de review real de cliente para reemplazo final.",
    },
  ],
  trustMetrics: [
    {
      id: "metric-google",
      label: "Google rating",
      value: "4.8",
      helper: "Placeholder hasta conexión con puntaje real.",
    },
    {
      id: "metric-served",
      label: "Burgers servidas",
      value: "10k+",
      helper: "Reemplazar por cifra validada por operación.",
    },
    {
      id: "metric-locations",
      label: "Sucursales VCP",
      value: "2",
      helper: "Valor real actual.",
    },
  ],
  instagramTitle: "Instagram wall",
  instagramDescription:
    "Grid visual listo para posts reales. El layout sostiene identidad hasta recibir media final del cliente.",
  instagramItems: instagramPlaceholderItems,
};

export const locationsContent: LocationsContent = {
  kicker: "Encontranos",
  eyebrow: "Villa Carlos Paz + Buenos Aires next",
  title: "Dos sucursales activas y una ciudad por encender.",
  description:
    "Las cards ya quedan conectadas a un mapa visual de marca para guiar intención de visita. Buenos Aires suma su waitlist sin romper la narrativa ni inventar datos productivos.",
  mapTitle: "Mapa visual de Juicy",
  mapNote:
    "Placeholder estilizado de mapa. El embed real entra cuando definamos proveedor y coordenadas finales.",
  mapPlaceholder: "Panel cartográfico conceptual, no geolocalización real.",
  locations: [
    {
      id: "vcp-centro",
      city: "Villa Carlos Paz",
      zone: "Centro",
      address: "Placeholder dirección exacta · Av. principal",
      hours: "Lun a Dom · 12:00 a 00:00",
      phone: "+54 3541 000000",
      mapsHref: "#",
      status: "open",
      badge: "Abierto",
      blurb: "Primer spot de Juicy. Alto flujo peatonal y salida rápida para takeaway.",
      mapPoint: { x: 45, y: 52 },
      placeholderNote: "Falta dirección final validada por cliente.",
    },
    {
      id: "vcp-oeste",
      city: "Villa Carlos Paz",
      zone: "Zona Oeste",
      address: "Placeholder segunda sucursal · Barrio comercial",
      hours: "Lun a Dom · 18:00 a 01:00",
      phone: "+54 3541 000001",
      mapsHref: "#",
      status: "open",
      badge: "Abierto",
      blurb: "Segunda base para cubrir noche y delivery en radio extendido.",
      mapPoint: { x: 62, y: 45 },
      placeholderNote: "Falta nombre de zona oficial.",
    },
    {
      id: "ba-launch",
      city: "Buenos Aires",
      zone: "Launch pending",
      address: "Dirección a confirmar",
      hours: "Fecha estimada pendiente",
      phone: "Canal de contacto pendiente",
      mapsHref: "#",
      status: "soon",
      badge: "Próximamente",
      blurb: "Bloque de captación temprana para abrir comunidad antes del lanzamiento.",
      mapPoint: { x: 76, y: 68 },
      placeholderNote: "Falta fecha y barrio de apertura.",
    },
  ],
  waitlist: {
    title: "Waitlist Buenos Aires",
    description:
      "Dejanos tu contacto y te avisamos antes que a nadie cuando abramos el primer Juicy en CABA.",
    checkboxLabel: "Quiero ser de los primeros en enterarme del lanzamiento.",
    submitLabel: "Anotarme",
    successTitle: "Ya estás en la lista.",
    successBody:
      "Te vamos a escribir apenas tengamos barrio, fecha y primeras aperturas para BA.",
    privacyHint: "Placeholder: sumar texto legal y política de datos cuando esté definido.",
  },
};

export const footerContent: FooterContent = {
  brandTitle: "Juicy Burguers",
  brandDescription:
    "Taste the Difference desde Villa Carlos Paz. Producto protagonista, actitud roja y una marca que se reconoce al primer scroll.",
  navigation: [
    { id: "nav-hero", label: "Inicio", href: "#hero" },
    { id: "nav-philosophy", label: "Filosofía", href: "#philosophy" },
    { id: "nav-menu", label: "Menú", href: "#menu-showcase" },
    { id: "nav-vibe", label: "The Vibe", href: "#the-vibe" },
    { id: "nav-locations", label: "Sucursales", href: "#locations" },
    { id: "nav-reviews", label: "Reviews", href: "#reviews" },
  ],
  socialLinks: [
    { id: "social-ig", label: "Instagram", href: "#" },
    { id: "social-tiktok", label: "TikTok", href: "#" },
    { id: "social-whatsapp", label: "WhatsApp", href: "#" },
  ],
  locations: [
    {
      id: "footer-vcp-centro",
      name: "VCP Centro",
      address: "Dirección final pendiente de validación",
      hours: "Lun a Dom · 12:00 a 00:00",
      note: "Placeholder de dirección hasta confirmación oficial.",
    },
    {
      id: "footer-vcp-oeste",
      name: "VCP Zona Oeste",
      address: "Nombre de zona y dirección pendiente",
      hours: "Lun a Dom · 18:00 a 01:00",
      note: "Placeholder de ubicación exacta.",
    },
    {
      id: "footer-ba",
      name: "Buenos Aires",
      address: "Barrio y dirección a confirmar",
      hours: "Próximamente",
      note: "Pendiente fecha oficial de apertura.",
    },
  ],
  scheduleTitle: "Horarios",
  scheduleSummary:
    "Atención sujeta a eventos locales y temporada. Confirmar horarios finales cuando estén publicados por operación.",
  legalLine:
    "© 2026 Juicy Hamburgers · Villa Carlos Paz · Buenos Aires (próximamente). Placeholder legal hasta datos fiscales finales.",
};
