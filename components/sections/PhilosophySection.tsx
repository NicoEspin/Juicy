import { PhilosophyMotion } from "@/components/animations/PhilosophyMotion";
import { JuicyDog } from "@/components/ui/JuicyDog";
import { landingAssets, philosophyContent } from "@/data/landingContent";

const philosophyId = "philosophy";

function renderAnimatedTitle(text: string) {
  return text.split("").map((character, index) => (
    <span
      key={`${character}-${index}`}
      data-philosophy-char
      className="ph-char"
    >
      {character === " " ? "\u00A0" : character}
    </span>
  ));
}

export function PhilosophySection() {
  return (
    <section
      id={philosophyId}
      aria-labelledby="philosophy-title"
      className="ph-root"
    >
      {/* Grain overlay */}
      <div aria-hidden="true" className="ph-grain" />

      {/* Decorative vertical lines */}
      <div aria-hidden="true" className="ph-vline ph-vline--left" />
      <div aria-hidden="true" className="ph-vline ph-vline--right" />

      {/* Red horizontal rule that bleeds full width */}
      <div aria-hidden="true" className="ph-hrule" />

      <div className="ph-shell">
        {/* ─── SECTION HEADER ─── */}
        <div className="ph-header">
          <div className="ph-kicker">
            <span className="ph-kicker-dot" />
            <span>{philosophyContent.kicker}</span>
          </div>
          <p className="ph-eyebrow">{philosophyContent.eyebrow}</p>
        </div>

        {/* ─── MAIN GRID ─── */}
        <div className="ph-grid">
          {/* LEFT — Dog visual */}
          <div className="ph-dog-col">
            {/* Big red number watermark */}
            <div aria-hidden="true" className="ph-bg-number">
              J
            </div>

            {/* Red arc glow */}
            <div aria-hidden="true" className="ph-dog-glow" />

            {/* Dog framed in an editorial box */}
            <div className="ph-dog-frame" data-philosophy-dog>
              {/* Corner brackets */}
              <span aria-hidden="true" className="ph-corner ph-corner--tl" />
              <span aria-hidden="true" className="ph-corner ph-corner--tr" />
              <span aria-hidden="true" className="ph-corner ph-corner--bl" />
              <span aria-hidden="true" className="ph-corner ph-corner--br" />

              <JuicyDog
                alt={philosophyContent.mascotAlt}
                className="ph-dog-img"
                priority
                src={landingAssets.pet}
              />

              {/* Floating label on the dog */}
              <div className="ph-dog-label">
                <span className="ph-dog-label-text">Juicy Dog™</span>
              </div>
            </div>

            {/* Slanted tagline under dog */}
            <p className="ph-dog-tagline" aria-hidden="true">
              Since always.
            </p>
          </div>

          {/* RIGHT — Copy + Pillars */}
          <div className="ph-copy-col">
            {/* Mega headline */}
            <h2 id="philosophy-title" className="ph-headline">
              {renderAnimatedTitle(philosophyContent.title)}
            </h2>

            {/* Body copy with red left rule */}
            <p className="ph-body" data-philosophy-copy>
              {philosophyContent.description}
            </p>

            {/* ─── PILLARS ─── */}
            <ul className="ph-pillars" role="list">
              {philosophyContent.pillars.map((pillar, i) => (
                <li
                  key={pillar.id}
                  className="ph-pillar"
                  data-philosophy-pillar
                  style={{ "--pillar-index": i } as React.CSSProperties}
                >
                  {/* Number — huge, positioned behind */}
                  <div aria-hidden="true" className="ph-pillar-num">
                    {pillar.label}
                  </div>

                  {/* Content */}
                  <div className="ph-pillar-content">
                    <h3 className="ph-pillar-title">{pillar.title}</h3>
                    <p className="ph-pillar-desc">{pillar.description}</p>
                  </div>

                  {/* Bottom red bar that fills on hover */}
                  <div aria-hidden="true" className="ph-pillar-bar" />
                </li>
              ))}
            </ul>

            {/* Manifesto closing line */}
            <div className="ph-manifesto" data-philosophy-manifesto>
              <span className="ph-manifesto-line" />
              <span className="ph-manifesto-text">
                Si no genera deseo real, no sale de cocina.
              </span>
              <span className="ph-manifesto-line" />
            </div>
          </div>
        </div>
      </div>

      <PhilosophyMotion targetId={philosophyId} />

      <style>{`
        /* ──────────────────────────────────────────────
           TOKENS
        ────────────────────────────────────────────── */
        .ph-root {
          --ph-red:     #C41E1E;
          --ph-red-dim: rgba(196,30,30,0.18);
          --ph-black:   #0D0806;
          --ph-surface: #111009;
          --ph-paper:   #1A1510;
          --ph-cream:   #F7F0E6;
          --ph-gray:    #8A7E72;
          --ph-border:  rgba(247,240,230,0.08);
          --ph-border-red: rgba(196,30,30,0.3);
          --font-display: 'Anton', 'Impact', ui-serif, sans-serif;
          --font-accent:  'Playfair Display', Georgia, serif;
          --font-body:    'DM Sans', 'Helvetica Neue', sans-serif;

          position: relative;
          overflow: hidden;
          background: var(--ph-black);
          font-family: var(--font-body);
        }

        /* ──────────────────────────────────────────────
           TEXTURE + STRUCTURE
        ────────────────────────────────────────────── */
        .ph-grain {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px;
        }

        .ph-vline {
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: var(--ph-border);
          z-index: 2;
          pointer-events: none;
        }
        .ph-vline--left  { left: 11%; }
        .ph-vline--right { right: 11%; }

        .ph-hrule {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--ph-red);
          z-index: 4;
        }

        /* ──────────────────────────────────────────────
           SHELL
        ────────────────────────────────────────────── */
        .ph-shell {
          position: relative;
          z-index: 3;
          max-width: 1440px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* ──────────────────────────────────────────────
           SECTION HEADER
        ────────────────────────────────────────────── */
        .ph-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          border-bottom: 1px solid var(--ph-border);
          padding-bottom: 1.5rem;
        }

        .ph-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ph-red);
        }

        .ph-kicker-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--ph-red);
        }

        .ph-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ph-gray);
          margin: 0;
        }

        /* ──────────────────────────────────────────────
           MAIN GRID
        ────────────────────────────────────────────── */
        .ph-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (min-width: 1024px) {
          .ph-grid {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 4rem;
            align-items: center;
          }
        }

        /* ──────────────────────────────────────────────
           DOG COLUMN
        ────────────────────────────────────────────── */
        .ph-dog-col {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        /* Giant "J" watermark */
        .ph-bg-number {
          position: absolute;
          top: -5%;
          left: -8%;
          font-family: var(--font-display);
          font-size: clamp(12rem, 28vw, 22rem);
          color: var(--ph-red);
          opacity: 0.04;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
        }

        .ph-dog-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 70%; height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,30,30,0.16) 0%, transparent 72%);
          filter: blur(32px);
          pointer-events: none;
        }

        /* Framing box with corner brackets */
        .ph-dog-frame {
          position: relative;
          width: 100%;
          max-width: 360px;
          padding: 2rem;
          will-change: transform;
        }

        .ph-corner {
          position: absolute;
          width: 20px; height: 20px;
          border-color: var(--ph-red);
          border-style: solid;
          opacity: 0.6;
        }
        .ph-corner--tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .ph-corner--tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .ph-corner--bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .ph-corner--br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        .ph-dog-img {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 24px 48px rgba(196,30,30,0.22));
          will-change: transform;
        }

        /* Floating label */
        .ph-dog-label {
          position: absolute;
          bottom: 0.5rem;
          right: -0.75rem;
          background: var(--ph-red);
          padding: 0.3rem 0.75rem;
          transform: rotate(2.5deg);
        }

        .ph-dog-label-text {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fff;
          white-space: nowrap;
        }

        .ph-dog-tagline {
          font-family: var(--font-accent);
          font-style: italic;
          font-size: 0.9rem;
          color: var(--ph-gray);
          margin: 0;
          opacity: 0.6;
          letter-spacing: 0.06em;
          align-self: flex-end;
          padding-right: 1rem;
        }

        /* ──────────────────────────────────────────────
           COPY COLUMN
        ────────────────────────────────────────────── */
        .ph-copy-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* ──────────────────────────────────────────────
           HEADLINE
        ────────────────────────────────────────────── */
        .ph-headline {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(3.4rem, 9vw, 7.5rem);
          text-transform: uppercase;
          line-height: 0.9;
          letter-spacing: -0.01em;
          color: var(--ph-cream);
          /* Red underline on last word effect via gradient */
          background: linear-gradient(to right, var(--ph-cream) 70%, var(--ph-red) 70%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .ph-char {
          display: inline-block;
          will-change: transform, opacity;
        }

        /* ──────────────────────────────────────────────
           BODY
        ────────────────────────────────────────────── */
        .ph-body {
          margin: 0;
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          line-height: 1.8;
          color: var(--ph-gray);
          max-width: 52ch;
          border-left: 2px solid var(--ph-red);
          padding-left: 1.25rem;
        }

        /* ──────────────────────────────────────────────
           PILLARS
        ────────────────────────────────────────────── */
        .ph-pillars {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          list-style: none;
          margin: 0;
          padding: 0;
          border: 1px solid var(--ph-border);
          background: var(--ph-border);
        }

        @media (min-width: 640px) {
          .ph-pillars { grid-template-columns: repeat(3, 1fr); }
        }

        .ph-pillar {
          position: relative;
          background: var(--ph-paper);
          padding: 1.75rem 1.5rem 2rem;
          overflow: hidden;
          cursor: default;
          transition: background 0.3s;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ph-pillar:hover {
          background: #1f1810;
        }

        /* Giant number watermark inside each pillar */
        .ph-pillar-num {
          position: absolute;
          top: -0.5rem;
          right: -0.25rem;
          font-family: var(--font-display);
          font-size: 5.5rem;
          line-height: 1;
          color: var(--ph-red);
          opacity: 0.07;
          user-select: none;
          letter-spacing: -0.03em;
          transition: opacity 0.3s;
        }

        .ph-pillar:hover .ph-pillar-num { opacity: 0.14; }

        .ph-pillar-content {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ph-pillar-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          text-transform: uppercase;
          color: var(--ph-cream);
          letter-spacing: 0.04em;
          margin: 0;
          line-height: 1.1;
        }

        .ph-pillar-desc {
          font-size: 0.82rem;
          line-height: 1.7;
          color: var(--ph-gray);
          margin: 0;
        }

        /* Red fill bar on hover */
        .ph-pillar-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--ph-red);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }

        .ph-pillar:hover .ph-pillar-bar { transform: scaleX(1); }

        /* ──────────────────────────────────────────────
           MANIFESTO LINE
        ────────────────────────────────────────────── */
        .ph-manifesto {
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          transform: translateY(12px);
        }

        /* Revealed by JS */
        .ph-manifesto.is-visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .ph-manifesto-line {
          flex: 1;
          height: 1px;
          background: var(--ph-border-red);
        }

        .ph-manifesto-text {
          font-family: var(--font-accent);
          font-style: italic;
          font-size: 0.82rem;
          color: var(--ph-red);
          letter-spacing: 0.04em;
          white-space: nowrap;
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
}
