# PRD — Juicy Hamburgers Landing Page
**Versión:** 1.0  
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + GSAP  
**Objetivo:** Landing page award-worthy para la hamburguesería Juicy, con presencia en Villa Carlos Paz (2 sucursales) y próximo lanzamiento en Buenos Aires.

---

## 1. Visión y Objetivos

### Propósito
Crear una landing page que funcione como la cara digital de Juicy: captura la esencia retro-americana de la marca, genera deseo por el producto, y convierte visitantes en clientes que visiten las sucursales o pidan delivery.

### Metas de negocio
- Comunicar el slogan "Taste the Difference" como experiencia visual, no solo texto
- Generar awareness del próximo lanzamiento en Buenos Aires
- Dirigir tráfico a las ubicaciones físicas
- Construir base de contactos para comunicaciones futuras

### KPIs de éxito
- Tiempo en página > 2 minutos
- Tasa de rebote < 40%
- Click-through a mapa/sucursales > 15%
- Registro en lista de espera Buenos Aires

---

## 2. Identidad Visual — Design System

### Paleta de colores
```
--juicy-red:       #C41E1E   /* Rojo corporativo principal */
--juicy-red-dark:  #8B1010   /* Hover, sombras */
--juicy-red-light: #E84040   /* Acentos, highlights */
--juicy-cream:     #FAF7F0   /* Fondo principal (off-white cálido) */
--juicy-cream-dark:#F0EBE0   /* Fondo secundario */
--juicy-black:     #1A1008   /* Tipografía principal */
--juicy-gray:      #8A8070   /* Texto secundario, subtítulos */
--juicy-white:     #FFFFFF   /* Contrastes */
--juicy-checker:   repeating-conic-gradient(--juicy-red 0% 25%, transparent 0% 50%)
```

### Tipografía
- **Display / Hero:** Fuente script personalizada (simular "Juicy" script) → usar `Pacifico` o `Satisfy` desde Google Fonts para headings grandes
- **Headlines:** `Bebas Neue` — bold, impactante, americano
- **Body / UI:** `DM Sans` — clean, moderno, legible
- **Acentos / Taglines:** `Playfair Display Italic` — elegancia en frases clave

### Texturas y patrones
- Tablero de ajedrez rojo/blanco (checkerboard) como border decorativo y elemento de sección
- Papel de carne (textura sutil de papel kraft) como background en algunas secciones
- Líneas diagonales rojas para separadores
- Ruido de grano muy sutil (3–5% opacity) sobre fondos claros para evitar que se vean plásticos

### Mascota
El perro "Juicy Dog" es un asset clave:
- Aparece en 3+ secciones con diferentes poses/contextos
- Se anima con GSAP (entrada, idle wobble, reacción al hover)
- Siempre en rojo sobre fondo claro (estilo ilustración monocolor)

---

## 3. Arquitectura de Secciones

### Sección 1 — Hero (Full viewport)
**Concepto:** "La hamburguesa entra antes que el texto"

**Layout:**
- Fondo crema cálido (`--juicy-cream`)
- Hamburguesa hero en el centro, fotografía real con efecto de profundidad (drop-shadow cinematográfico)
- Logo "Juicy" script en rojo arriba a la izquierda, grande y orgulloso
- Slogan "TASTE THE DIFFERENCE" en `Bebas Neue` enorme, dividido en dos líneas, a la derecha
- Border superior e inferior: franja de checkerboard rojo/blanco de 20px
- CTA: botón rojo "Encontrá tu Juicy" con arrow → smooth scroll a sucursales

**Animaciones GSAP (Timeline en onLoad):**
1. `fromTo` hamburguesa: escala 0.8→1 + opacity 0→1, ease: "power4.out", duration: 1s
2. `from` logo Juicy: x: -80, opacity: 0, duration: 0.8s, delay: 0.3s
3. `from` slogan: cada palabra por separado, y: 60, stagger: 0.12s, ease: "expo.out"
4. `from` CTA button: y: 20, opacity: 0, delay: 1.2s
5. GSAP ScrollTrigger: hamburguesa hace parallax leve (y: +30) al hacer scroll

**Elementos especiales:**
- Tag flotante animado: `"Feelin' it"` en tipografía manuscrita, rotado -8°, entra desde la derecha con un `rotation: 15°` bounce
- Paño de cuadros rojo/blanco en el borde inferior de la foto de hamburguesa (detalle de marca)

---

### Sección 2 — "What We Do" / La Filosofía
**Concepto:** Minimal, impactante, una sola verdad

**Layout:**
- Fondo `--juicy-cream-dark`
- Una sola frase enorme centrada: *"Burgers que se sienten."*
- Subtexto en DM Sans: párrafo corto sobre la filosofía (calidad, ingredientes, experiencia)
- A la izquierda: el Juicy Dog en grande, ilustración roja, con animación idle (slight rotation en loop)
- Tres "pillars" en fila horizontal: iconos minimalistas + etiqueta
  - 🥩 Carne propia 
  - 🧀 Sin atajos
  - 🔥 Cocción perfecta

**Animaciones GSAP:**
- ScrollTrigger: el texto entra con `splitText` por caracteres, stagger 0.02s
- Juicy Dog: entra desde fuera de pantalla izquierda, bounce final
- Pillars: stagger de fade+y desde abajo, delay escalonado

---

### Sección 3 — Menu Showcase / "Las Estrellas"
**Concepto:** Editorial de moda aplicado a hamburguesas. Cada burger tiene su momento.

**Layout:**
- Fondo blanco puro
- Grid asimétrico de 3 burgers hero:
  - Burger 1 (grande, izquierda): nombre en Bebas Neue grande, descripción corta, precio
  - Burger 2 (centro, más pequeña y elevada): efecto hover = zoom + glow rojo
  - Burger 3 (derecha, misma altura que 1): foto desde arriba (top shot)
- Tag de "Bestseller" en forma de sello circular rojo
- Fondo rojo en un panel lateral (1/3 del ancho) con texto blanco

**Animaciones GSAP:**
- ScrollTrigger: las burgers entran desde diferentes posiciones y ángulos
- Hover: GSAP scale(1.05) + drop shadow + pequeño wobble rotacional
- Título de sección: entra con clip-path `polygon(0 0, 0 0, 0 100%, 0 100%)` → `(0 0, 100% 0, 100% 100%, 0 100%)`

**Nota de contenido:** Las fotos del menú deben provenir del cliente. El layout está preparado para 3 hero cards + link "Ver menú completo" que abre un modal o redirige a página secundaria.

---

### Sección 4 — "The Vibe" / Galería Inmersiva
**Concepto:** El ambiente es parte de la experiencia. Mostrar el local, el equipo, los detalles.

**Layout:**
- Marquee horizontal infinito (GSAP ticker) con fotos del local, comida, y detalles
- Velocidad lenta, pausa al hover
- Dos filas: primera va a la derecha, segunda a la izquierda (efecto cinta)
- Fondo `--juicy-red` (sección roja, cambio de tono dramático)
- Título en blanco: "Más que una burger"

**Animaciones GSAP:**
```js
gsap.to(".marquee-row-1", { xPercent: -50, duration: 30, ease: "none", repeat: -1 })
gsap.to(".marquee-row-2", { xPercent: 50, duration: 25, ease: "none", repeat: -1 })
```
- Hover pausa con `tl.pause()` / `tl.resume()`
- Cada foto tiene border-radius 12px, slight rotation aleatoria (-3° a +3°)
- Al entrar la sección: el fondo hace reveal con clip-path desde el centro

---

### Sección 5 — Ubicaciones / "Encontranos"
**Concepto:** Mapa como elemento de diseño, no solo funcional

**Layout:**
- Fondo crema, diseño de dos columnas
- Columna izquierda: Listado de sucursales con cards elegantes
  - **Sucursal 1 — VCP Centro:** dirección, horarios, teléfono, link a Google Maps
  - **Sucursal 2 — VCP [nombre zona]:** ídem
  - **Sucursal 3 — Buenos Aires:** card diferenciada con badge "Próximamente" en rojo animado, formulario de lista de espera integrado
- Columna derecha: Mapa embedido (Mapbox GL JS o Google Maps API) estilizado en paleta roja/crema
- Selector de sucursal en el mapa: al clickar una card, el mapa hace fly-to con animación

**Componente especial — Lista de Espera Buenos Aires:**
```
Formulario inline en la card:
- Input: Nombre
- Input: Email
- Checkbox: "Quiero ser de los primeros"
- Button: "Anotarme"
→ Submit → animación de éxito con el Juicy Dog celebrando (GSAP bounce)
```

**Animaciones GSAP:**
- Cards entran desde la izquierda con stagger
- Mapa hace reveal con scale desde 0.9→1 + opacity
- Badge "Próximamente": pulso animado en rojo

---

### Sección 6 — Social Proof / "Lo que dicen"
**Concepto:** Reviews reales, presentación no-genérica

**Layout:**
- Fondo checkerboard (cuadros pequeños rojo/crema, opacity 15%) sobre fondo blanco
- Título: "La gente habla" en Bebas Neue
- Carousel horizontal de reviews de Google / Instagram
  - Cada card: foto de perfil (avatar), nombre, estrellas (★★★★★ en rojo), texto del review, fecha
  - Cards en off-white con borde rojo sutil
- Feed de Instagram embebido (últimas 6 fotos) — grid 3×2 con hover efecto rojo overlay

**Métricas de confianza (pequeñas, discretas):**
- "⭐ 4.8 en Google"
- "10,000+ burgers servidas"
- "2 sucursales en VCP"

---

### Sección 7 — Footer
**Concepto:** Footer como extensión de marca, no como afterthought

**Layout:**
- Fondo `--juicy-black`
- Logo Juicy en blanco, grande
- Columnas: Menú de links | Sucursales | Redes sociales | Horarios
- Juicy Dog pequeño en la esquina, guiñando (animación loop sutil)
- Línea final: "© 2025 Juicy Hamburgers · Villa Carlos Paz · Buenos Aires"
- Checkerboard como separador superior del footer

---

## 4. Animaciones — Guía GSAP Completa

### Principios de animación para Juicy
1. **Energía controlada**: Las animaciones deben sentirse juguetonas pero no caóticas. Refleja la personalidad de la marca.
2. **Las hamburguesas siempre brillan**: El producto (fotos de burgers) tiene las animaciones más espectaculares.
3. **El perro reacciona**: La mascota responde a interacciones del usuario.

### ScrollTrigger — Configuración base
```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Config global
ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  start: "top 80%",
})
```

### Timeline Hero (onMount / useEffect)
```typescript
const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } })

heroTimeline
  .fromTo(".hero-burger", 
    { scale: 0.85, y: 30, opacity: 0 }, 
    { scale: 1, y: 0, opacity: 1, duration: 1.2 })
  .fromTo(".hero-logo", 
    { x: -100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 0.9 }, "-=0.8")
  .fromTo(".hero-slogan-word", 
    { y: 80, opacity: 0 }, 
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 }, "-=0.6")
  .fromTo(".hero-cta", 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
  .fromTo(".hero-tag", 
    { rotation: 30, scale: 0, opacity: 0 }, 
    { rotation: -8, scale: 1, opacity: 1, ease: "back.out(2)", duration: 0.6 }, "-=0.4")
```

### Hover en burger cards
```typescript
const burgerCards = document.querySelectorAll('.burger-card')

burgerCards.forEach(card => {
  const img = card.querySelector('img')
  
  card.addEventListener('mouseenter', () => {
    gsap.to(img, { 
      scale: 1.08, 
      rotation: 2,
      duration: 0.4, 
      ease: "power2.out" 
    })
  })
  
  card.addEventListener('mouseleave', () => {
    gsap.to(img, { 
      scale: 1, 
      rotation: 0,
      duration: 0.4, 
      ease: "power2.inOut" 
    })
  })
})
```

### Juicy Dog — Animación idle
```typescript
// Idle floating animation (loop infinito)
gsap.to(".juicy-dog", {
  y: -12,
  rotation: 3,
  duration: 2.5,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
})

// Reacción a hover sobre cualquier burger
document.querySelectorAll('.burger-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(".juicy-dog", {
      rotation: 15,
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(3)"
    })
  })
})
```

---

## 5. Estructura de Archivos — Next.js

```
juicy-web/
├── app/
│   ├── layout.tsx              # Root layout con fonts y metadata
│   ├── page.tsx                # Landing page (compone todas las secciones)
│   └── globals.css             # CSS variables + Tailwind base
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── PhilosophySection.tsx
│   │   ├── MenuSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── LocationsSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── CheckerBorder.tsx   # Franja de tablero decorativa
│   │   ├── JuicyDog.tsx        # Mascota con sus variantes
│   │   ├── BurgerCard.tsx      # Card de producto
│   │   ├── LocationCard.tsx    # Card de sucursal
│   │   ├── ReviewCard.tsx      # Card de review
│   │   └── WaitlistForm.tsx    # Formulario BA
│   └── animations/
│       ├── useHeroAnimation.ts  # Hook para animación hero
│       ├── useScrollReveal.ts   # Hook para reveals on scroll
│       └── useDogAnimation.ts   # Hook para la mascota
├── lib/
│   ├── gsap-config.ts          # Setup GSAP + plugins
│   └── constants.ts            # Datos de sucursales, menú
├── public/
│   ├── images/
│   │   ├── burgers/            # Fotos de productos
│   │   ├── locations/          # Fotos de sucursales
│   │   └── branding/           # Logo, dog assets
│   └── fonts/                  # Fuentes custom si aplica
└── tailwind.config.ts          # Config con colores Juicy
```

---

## 6. Tailwind Config — Extensiones de Marca

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        juicy: {
          red:        '#C41E1E',
          'red-dark': '#8B1010',
          'red-light':'#E84040',
          cream:      '#FAF7F0',
          'cream-dark':'#F0EBE0',
          black:      '#1A1008',
          gray:       '#8A8070',
        }
      },
      fontFamily: {
        display: ['Satisfy', 'cursive'],         // Logo style
        headline: ['Bebas Neue', 'sans-serif'],  // Big headings
        body: ['DM Sans', 'sans-serif'],          // Body text
        serif: ['Playfair Display', 'serif'],     // Elegant accents
      },
      backgroundImage: {
        'checker': `repeating-conic-gradient(#C41E1E 0% 25%, transparent 0% 50%)`,
      },
      animation: {
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(196, 30, 30, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(196, 30, 30, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}

export default config
```

---

## 7. Metadata y SEO

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Juicy Hamburgers — Taste the Difference | Villa Carlos Paz',
  description: 'Las mejores hamburguesas de Villa Carlos Paz. Ingredientes premium, sabor inigualable. 2 sucursales en VCP y próximamente en Buenos Aires.',
  keywords: ['hamburguesas Villa Carlos Paz', 'Juicy burgers', 'comida VCP', 'hamburguesería artesanal'],
  openGraph: {
    title: 'Juicy Hamburgers — Taste the Difference',
    description: 'Las mejores hamburguesas de Villa Carlos Paz',
    images: ['/images/branding/og-image.jpg'],
    locale: 'es_AR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}
```

---

## 8. Performance y Accesibilidad

### Performance
- Next.js Image component para todas las fotos (WebP, lazy load, blur placeholder)
- GSAP solo se inicializa client-side (`'use client'` + `useEffect`)
- Fonts: Google Fonts con `display: swap` + preconnect
- Marquee gallery: IntersectionObserver para pausar animaciones fuera del viewport
- `will-change: transform` solo en elementos que realmente se mueven

### Accesibilidad
- `prefers-reduced-motion`: todos los `gsap.to()` tienen un check
  ```typescript
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReducedMotion) { /* animaciones */ }
  ```
- Imágenes con `alt` descriptivo
- Contraste: texto rojo sobre blanco → verificar WCAG AA (mínimo 4.5:1)
- Focus states visibles en todos los elementos interactivos

### Responsividad
- Mobile first: layout en columna única, hamburguesas grandes
- Breakpoints clave: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Hero: en mobile la hamburguesa ocupa 80% del viewport, texto debajo
- Menú showcase: en mobile, una burger por vez con swipe gesture (Embla Carousel)
- Marquee gallery: misma velocidad, fotos más pequeñas
- Mapa + locations: stack vertical en mobile

---

## 9. Datos / Contenido Necesario del Cliente

Para completar la landing, se necesita del cliente:
- [ ] Fotos de alta resolución de las burgers (mínimo 5, formato PNG/JPG, fondo neutro)
- [ ] Fotos del local (ambiente, cocina, equipo)
- [ ] Dirección exacta y horarios de ambas sucursales VCP
- [ ] Teléfono de cada sucursal (WhatsApp preferible)
- [ ] Asset vectorial del Juicy Dog en SVG (para animaciones)
- [ ] Reviews reales de Google para mostrar (mínimo 6)
- [ ] Nombre del responsable para el formulario de BA (recibe los emails)
- [ ] ¿Tienen menú digital? ¿Link o PDF?
- [ ] ¿Usan PedidosYa / Rappi? Links a las apps
- [ ] Fecha estimada de apertura Buenos Aires

---

## 10. Fases de Desarrollo

### Fase 1 — Setup + Hero (1 semana)
- Setup Next.js + TS + Tailwind + GSAP
- Design system y variables CSS
- HeroSection con todas las animaciones

### Fase 2 — Secciones de contenido (1.5 semanas)
- Philosophy, Menu Showcase, Gallery Marquee

### Fase 3 — Interactividad + Locations (1 semana)
- Sección de sucursales con mapa
- Formulario lista de espera BA
- Reviews section

### Fase 4 — Polish + Deploy (0.5 semanas)
- Optimización de performance
- SEO final
- Deploy en Vercel
- Pruebas cross-browser y mobile

**Total estimado: 4 semanas**

---

*Documento preparado para el proyecto Juicy Hamburgers — Villa Carlos Paz / Buenos Aires*
*Stack: Next.js 14 + TypeScript + Tailwind CSS + GSAP*
