import Image from "next/image";
import { HeroMotion } from "@/components/animations/HeroMotion";
import { CheckerBorder } from "@/components/ui/CheckerBorder";
import { heroContent, landingAssets } from "@/data/landingContent";

const heroId = "hero";

export function HeroSection() {
  return (
    <section id={heroId} aria-labelledby="hero-title" className="hero-root">
      {/* ─── Ambient noise + grain layer ─── */}
      <div aria-hidden="true" className="hero-grain" />

      {/* ─── Vertical red rule — left editorial accent ─── */}
      <div aria-hidden="true" className="hero-rule" />

      {/* ─── Rotating stamp watermark ─── */}
      <div aria-hidden="true" className="hero-stamp">
        <span>JUICY · PREMIUM · BURGERS · VCP ·&nbsp;</span>
        <span>JUICY · PREMIUM · BURGERS · VCP ·&nbsp;</span>
      </div>

      <CheckerBorder position="top" />

      <div className="hero-shell">
        {/* ════════════ TOP BAR ════════════ */}
        <header className="hero-topbar">
          {/* Logo pill */}
          <div data-hero-logo className="hero-logo-pill">
            <Image
              alt={heroContent.logoAlt}
              className="hero-logo-img"
              priority
              sizes="72px"
              src={landingAssets.logo}
            />
            <div className="hero-logo-text">
              <span className="hero-logo-name">Juicy</span>
              <span className="hero-logo-sub">Burgers</span>
            </div>
          </div>

          {/* Nav chips */}
          <nav className="hero-nav" aria-label="Secciones principales">
            <a href="#philosophy" className="hero-nav-link">
              Filosofía
            </a>
            <a href="#menu" className="hero-nav-link">
              Menú
            </a>
            <a href="#locations" className="hero-nav-link hero-nav-cta">
              Encontrá tu Juicy
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </nav>
        </header>

        {/* ════════════ MAIN GRID ════════════ */}
        <div className="hero-grid">
          {/* ── LEFT: Copy column ── */}
          <div className="hero-copy">
            {/* Eyebrow */}
            <div data-hero-eyebrow className="hero-eyebrow">
              <span className="hero-dot" />
              <span>{heroContent.eyebrow}</span>
            </div>

            {/* Mega headline */}
            <h1 id="hero-title" className="hero-headline" data-hero-headline>
              <span className="hero-hl-line hero-hl-black">
                <span data-hero-word className="hero-hl-inner">
                  {heroContent.titleTop}
                </span>
              </span>
              <span className="hero-hl-line hero-hl-red">
                <span data-hero-word className="hero-hl-inner">
                  {heroContent.titleBottom}
                </span>
              </span>
            </h1>

            {/* Italic accent */}
            <p data-hero-accent className="hero-accent">
              {heroContent.accent}
            </p>

            {/* Body */}
            <p data-hero-body className="hero-body">
              {heroContent.description}
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <a
                className="hero-cta-primary"
                data-hero-cta
                href={heroContent.primaryCta.href}
              >
                <span>{heroContent.primaryCta.label}</span>
                <svg
                  className="hero-cta-arrow"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10h12M12 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                className="hero-cta-secondary"
                data-hero-cta
                href={heroContent.secondaryCta.href}
              >
                {heroContent.secondaryCta.label}
              </a>
            </div>

            {/* Location badges */}
            <div data-hero-badges className="hero-badges">
              <span className="hero-badge">
                <span className="hero-badge-dot" />2 spots · Villa Carlos Paz
              </span>
              <span className="hero-badge">
                <span className="hero-badge-dot hero-badge-dot--dim" />
                Buenos Aires · próximamente
              </span>
            </div>
          </div>

          {/* ── RIGHT: Burger visual ── */}
          <div className="hero-visual">
            {/* Red arc blob */}
            <div aria-hidden="true" className="hero-blob" />

            {/* "Feelin' it" rotated tag */}
            <div data-hero-tag className="hero-tag">
              {heroContent.tag}
            </div>

            {/* Checker strip under burger */}
            <div aria-hidden="true" className="hero-checker-strip" />

            {/* The burger */}
            <div className="hero-burger-wrap">
              <Image
                alt={heroContent.heroImageAlt}
                className="hero-burger-img"
                data-hero-burger
                priority
                sizes="(max-width: 1024px) 88vw, 52vw"
                src={landingAssets.burger}
              />
            </div>

            {/* Floating stat cards */}
            <div data-hero-card className="hero-stat hero-stat--top">
              <span className="hero-stat-num">100%</span>
              <span className="hero-stat-label">Carne propia</span>
            </div>

            <div data-hero-card className="hero-stat hero-stat--bottom">
              <span className="hero-stat-num">#1</span>
              <span className="hero-stat-label">VCP 2025</span>
            </div>
          </div>
        </div>

        {/* ════════════ BOTTOM TICKER ════════════ */}
        <div aria-hidden="true" className="hero-ticker-wrap">
          <div data-hero-marquee className="hero-ticker-track" data-no-js>
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                aria-hidden={i >= 6 ? "true" : undefined}
                className="hero-ticker-item"
              >
                Premium Burgers&nbsp;<em>·</em>&nbsp;Sin Atajos&nbsp;<em>·</em>
                &nbsp;Villa Carlos Paz&nbsp;<em>·</em>&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      <CheckerBorder position="bottom" />
      <HeroMotion targetId={heroId} />

      {/* ─── All styles scoped inside this component ─── */}
      <style>{`
        /* ──────────────────────────────────────────────
           TOKENS
        ────────────────────────────────────────────── */
        .hero-root {
          --red:        #C41E1E;
          --red-deep:   #8B0000;
          --red-glow:   rgba(196, 30, 30, 0.22);
          --cream:      #F7F0E6;
          --paper:      #FAF5EC;
          --black:      #120C06;
          --gray:       #6B6359;
          --border:     rgba(18, 12, 6, 0.10);
          --font-display: 'Anton', 'Impact', ui-serif, sans-serif;
          --font-accent:  'Playfair Display', Georgia, serif;
          --font-body:    'DM Sans', 'Helvetica Neue', sans-serif;

          position: relative;
          overflow: hidden;
          background: var(--cream);
          font-family: var(--font-body);
        }

        /* ──────────────────────────────────────────────
           TEXTURE OVERLAYS
        ────────────────────────────────────────────── */
        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          background-size: 256px;
        }

        .hero-rule {
          position: absolute;
          top: 0; bottom: 0; left: 11.5%;
          width: 1px;
          background: var(--border);
          z-index: 2;
          pointer-events: none;
        }

        /* ──────────────────────────────────────────────
           ROTATING STAMP
        ────────────────────────────────────────────── */
        .hero-stamp {
          position: absolute;
          top: 50%; right: -2.5%;
          transform: translateY(-50%) rotate(90deg);
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--red);
          opacity: 0.22;
          white-space: nowrap;
          z-index: 2;
          pointer-events: none;
          display: flex;
        }

        /* ──────────────────────────────────────────────
           CHECKER BORDERS
        ────────────────────────────────────────────── */
        .checker-border {
          position: relative;
          z-index: 10;
          height: 14px;
          background-image: repeating-linear-gradient(
            90deg,
            var(--black) 0px,
            var(--black) 14px,
            var(--cream) 14px,
            var(--cream) 28px
          );
        }
        .checker-border--top { border-bottom: 1px solid var(--border); }
        .checker-border--bottom { border-top: 1px solid var(--border); }

        /* ──────────────────────────────────────────────
           SHELL
        ────────────────────────────────────────────── */
        .hero-shell {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          min-height: 100svh;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3.5rem);
        }

        /* ──────────────────────────────────────────────
           TOP BAR
        ────────────────────────────────────────────── */
        .hero-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-logo-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.72);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 0.45rem 1.1rem 0.45rem 0.45rem;
          backdrop-filter: blur(8px);
          box-shadow: 0 8px 28px rgba(18,12,6,0.08);
          will-change: transform;
        }

        .hero-logo-img {
          width: 48px;
          height: auto;
          display: block;
        }

        .hero-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .hero-logo-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--red);
          letter-spacing: 0.04em;
        }

        .hero-logo-sub {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gray);
        }

        .hero-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .hero-nav-link {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--black);
          text-decoration: none;
          padding: 0.5rem 0.9rem;
          border-radius: 100px;
          transition: background 0.18s, color 0.18s;
        }

        .hero-nav-link:hover {
          background: rgba(18,12,6,0.06);
        }

        .hero-nav-cta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--black);
          color: var(--cream);
          padding: 0.5rem 1.1rem;
        }

        .hero-nav-cta:hover {
          background: var(--red);
          color: #fff;
        }

        /* ──────────────────────────────────────────────
           MAIN GRID
        ────────────────────────────────────────────── */
        .hero-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 2rem 0 3rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.05fr 0.95fr;
            gap: 3rem;
            padding: 1rem 0 2rem;
          }
        }

        /* ──────────────────────────────────────────────
           COPY COLUMN
        ────────────────────────────────────────────── */
        .hero-copy {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gray);
        }

        .hero-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--red);
        }

        /* MEGA HEADLINE */
        .hero-headline {
          margin: 0;
          display: flex;
          flex-direction: column;
          line-height: 0.87;
          letter-spacing: -0.01em;
        }

        .hero-hl-line {
          display: block;
          overflow: hidden;
        }

        .hero-hl-inner {
          display: inline-block;
          font-family: var(--font-display);
          font-size: clamp(5.2rem, 14vw, 11rem);
          text-transform: uppercase;
          will-change: transform;
        }

        .hero-hl-black { color: var(--black); }
        .hero-hl-red   { color: var(--red); }

        /* Red outline on hover effect */
        .hero-hl-red .hero-hl-inner {
          -webkit-text-stroke: 2px var(--red);
          transition: color 0.3s;
        }
        .hero-headline:hover .hero-hl-red .hero-hl-inner {
          color: transparent;
        }

        .hero-accent {
          font-family: var(--font-accent);
          font-style: italic;
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--red);
          margin: 0;
          border-left: 3px solid var(--red);
          padding-left: 1rem;
          line-height: 1.5;
        }

        .hero-body {
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
          line-height: 1.75;
          color: var(--gray);
          margin: 0;
          max-width: 46ch;
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: center;
        }

        .hero-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--red);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.85rem 1.75rem;
          border-radius: 0;
          border: 2px solid var(--red);
          position: relative;
          overflow: hidden;
          transition: background 0.22s, color 0.22s, transform 0.18s;
        }

        .hero-cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--black);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s cubic-bezier(0.77,0,0.18,1);
          z-index: 0;
        }

        .hero-cta-primary:hover::after { transform: scaleX(1); }

        .hero-cta-primary span,
        .hero-cta-primary svg { position: relative; z-index: 1; }

        .hero-cta-primary:hover { transform: translateY(-2px); }

        .hero-cta-arrow {
          transition: transform 0.2s;
        }
        .hero-cta-primary:hover .hero-cta-arrow {
          transform: translateX(4px);
        }

        .hero-cta-secondary {
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--black);
          text-decoration: none;
          padding: 0.85rem 1.5rem;
          border: 2px solid var(--black);
          transition: background 0.2s, color 0.2s;
        }
        .hero-cta-secondary:hover {
          background: var(--black);
          color: var(--cream);
        }

        /* Badges */
        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--gray);
          background: rgba(255,255,255,0.6);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 0.35rem 0.85rem;
        }

        .hero-badge-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--red);
        }

        .hero-badge-dot--dim { background: var(--gray); opacity: 0.45; }

        /* ──────────────────────────────────────────────
           VISUAL COLUMN
        ────────────────────────────────────────────── */
        .hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 0 5rem;
        }

        /* Red atmospheric blob */
        .hero-blob {
          position: absolute;
          inset: 10% 8%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,30,30,0.18) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        /* Rotating "Feelin' it" tag */
        .hero-tag {
          position: absolute;
          top: 2rem; right: 0;
          z-index: 20;
          font-family: var(--font-accent);
          font-style: italic;
          font-size: 1.25rem;
          color: var(--red);
          background: #fff;
          border: 1px solid var(--border);
          padding: 0.65rem 1.25rem;
          border-radius: 0;
          box-shadow: 4px 4px 0 var(--black);
          rotate: -8deg;
          will-change: transform;
        }

        .hero-checker-strip {
          position: absolute;
          bottom: 18%;
          left: 50%;
          transform: translateX(-50%);
          width: 78%;
          height: 14px;
          background-image: repeating-linear-gradient(
            90deg,
            var(--black) 0, var(--black) 14px,
            transparent 14px, transparent 28px
          );
          opacity: 0.85;
          z-index: 8;
        }

        /* Drop shadow behind burger */
        .hero-burger-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 580px;
        }

        .hero-burger-wrap::before {
          content: '';
          position: absolute;
          bottom: -2%;
          left: 50%;
          transform: translateX(-50%);
          width: 68%;
          height: 12px;
          border-radius: 50%;
          background: rgba(18,12,6,0.20);
          filter: blur(20px);
          z-index: -1;
        }

        .hero-burger-img {
          width: 100%;
          height: auto;
          display: block;
          will-change: transform;
          filter: drop-shadow(0 40px 80px rgba(18,12,6,0.25));
        }

        /* Floating stat cards */
        .hero-stat {
          position: absolute;
          z-index: 20;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--border);
          padding: 0.65rem 1rem;
          box-shadow: 4px 4px 0 var(--red);
          will-change: transform;
        }

        .hero-stat--top  { top: 4rem;    left: -1rem; rotate: 3deg; }
        .hero-stat--bottom { bottom: 4rem; right: -1rem; rotate: -4deg; }

        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 1.8rem;
          line-height: 1;
          color: var(--red);
          letter-spacing: 0.02em;
        }

        .hero-stat-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gray);
          margin-top: 0.1rem;
        }

        /* ──────────────────────────────────────────────
           BOTTOM TICKER
        ────────────────────────────────────────────── */
        .hero-ticker-wrap {
          position: relative;
          z-index: 4;
          overflow: hidden;
          background: var(--red);
          padding: 0.6rem 0;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
        }

        .hero-ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }

        @media (prefers-reduced-motion: no-preference) {
          .hero-ticker-track[data-no-js] {
            animation: ticker 22s linear infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-ticker-track[data-no-js] {
            animation: none;
          }
        }

        .hero-ticker-item {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
          white-space: nowrap;
          padding: 0 0.25rem;
        }

        .hero-ticker-item em {
          font-style: normal;
          color: rgba(255,255,255,0.45);
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
