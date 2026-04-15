"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";

export default function CalculatorCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(100px, 12vw, 180px) 0",
        background: "var(--color-surface-dark)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(181,138,82,0.1) 0%, transparent 60%)",
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative tile grid — right side */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: "50%",
          right: "clamp(40px, 6vw, 120px)",
          transform: "translateY(-50%)",
          width: "200px",
          height: "200px",
          opacity: 0.04,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={col * 50 + 2}
                y={row * 50 + 2}
                width="46"
                height="46"
                rx="2"
                stroke="var(--color-accent-light)"
                strokeWidth="1"
                fill="none"
              />
            ))
          )}
        </svg>
      </div>

      {/* Corner accents */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: "clamp(40px, 5vw, 72px)",
          left: "clamp(48px, 6vw, 96px)",
          width: "24px",
          height: "24px",
          borderTop: "1.5px solid rgba(181,138,82,0.15)",
          borderLeft: "1.5px solid rgba(181,138,82,0.15)",
        }}
      />
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          bottom: "clamp(40px, 5vw, 72px)",
          right: "clamp(48px, 6vw, 96px)",
          width: "24px",
          height: "24px",
          borderBottom: "1.5px solid rgba(181,138,82,0.15)",
          borderRight: "1.5px solid rgba(181,138,82,0.15)",
        }}
      />

      <div className="container relative z-10">
        <div
          style={{
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <FadeIn>
            <p
              className="text-[0.65rem] font-medium tracking-[0.22em] uppercase"
              style={{ marginBottom: "24px", color: "var(--color-accent-light)" }}
            >
              Planning Your Project?
            </p>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.06}>
            <h2
              className="font-serif font-light"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                marginBottom: "24px",
                textWrap: "balance",
                color: "var(--color-ink-on-dark)",
              }}
            >
              Not Sure How Many{" "}
              <span
                className="italic"
                style={{ color: "var(--color-accent-light)" }}
              >
                Tiles You Need?
              </span>
            </h2>
          </FadeIn>

          {/* Gold divider */}
          <FadeIn delay={0.1}>
            <div
              style={{
                width: "clamp(48px, 6vw, 72px)",
                height: "1.5px",
                margin: "0 auto 28px",
                background:
                  "linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent) 70%, transparent)",
              }}
            />
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.14}>
            <p
              style={{
                maxWidth: "460px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "40px",
                textWrap: "balance",
                color: "var(--color-ink-on-dark-light)",
                fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)",
                lineHeight: 1.75,
              }}
            >
              Use our free tile calculator to get an instant estimate.
              Just enter your room dimensions, pick a tile size, and
              know exactly what you need — including wastage allowance.
            </p>
          </FadeIn>

          {/* CTA Button */}
          <FadeIn delay={0.2}>
            <a href="/calculator" className="btn-gold group">
              Calculate Now
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </FadeIn>

          {/* Feature pills */}
          <FadeIn delay={0.26}>
            <div
              className="flex flex-wrap items-center justify-center"
              style={{ gap: "24px", marginTop: "48px" }}
            >
              {["Instant Results", "6 Tile Sizes", "Free to Use"].map(
                (feature) => (
                  <div
                    key={feature}
                    className="flex items-center"
                    style={{ gap: "8px" }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--color-accent)",
                        opacity: 0.5,
                      }}
                    />
                    <span className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ink-on-dark-muted">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
