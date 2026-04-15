"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, Ruler, LayoutGrid, Zap } from "lucide-react";

// ── Animated Tile Grid ──
function TileGridVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  const rows = 3;
  const cols = 4;
  const totalTiles = rows * cols;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!isVisible) return;
    const delay = setTimeout(() => {
      const duration = 800;
      const steps = 20;
      const stepTime = duration / steps;
      let current = 0;
      const interval = setInterval(() => {
        current++;
        setCount(Math.round((current / steps) * totalTiles));
        if (current >= steps) clearInterval(interval);
      }, stepTime);
      return () => clearInterval(interval);
    }, totalTiles * 100 + 300);
    return () => clearTimeout(delay);
  }, [isVisible, totalTiles]);

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <div className="relative">
        {/* Glow behind grid */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            width: "140%",
            height: "140%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(181,138,82,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Tile Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "10px",
            position: "relative",
          }}
        >
          {Array.from({ length: totalTiles }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const delayMs = (row * cols + col) * 100;

            return (
              <div
                key={i}
                style={{
                  width: "clamp(56px, 7vw, 92px)",
                  height: "clamp(56px, 7vw, 92px)",
                  background: isVisible
                    ? "rgba(181,138,82,0.07)"
                    : "transparent",
                  border: `1px solid ${isVisible ? "rgba(181,138,82,0.18)" : "transparent"}`,
                  borderRadius: "3px",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0.8)",
                  transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
                }}
              />
            );
          })}
        </div>

        {/* Dimension label — bottom (width) */}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${totalTiles * 100 + 100}ms`,
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(215,185,138,0.3))",
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "0.65rem",
              color: "var(--color-accent-light)",
              opacity: 0.6,
              letterSpacing: "0.05em",
            }}
          >
            3.6m
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(215,185,138,0.3), transparent)",
            }}
          />
        </div>

        {/* Dimension label — right side (height) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "-40px",
            bottom: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${totalTiles * 100 + 200}ms`,
          }}
        >
          <div
            style={{
              flex: 1,
              width: "1px",
              background:
                "linear-gradient(180deg, transparent, rgba(215,185,138,0.3))",
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "0.65rem",
              color: "var(--color-accent-light)",
              opacity: 0.6,
              letterSpacing: "0.05em",
              writingMode: "vertical-rl",
            }}
          >
            4.2m
          </span>
          <div
            style={{
              flex: 1,
              width: "1px",
              background:
                "linear-gradient(180deg, rgba(215,185,138,0.3), transparent)",
            }}
          />
        </div>

        {/* Counter badge */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "-56px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.85)",
            transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${totalTiles * 100 + 400}ms`,
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              background: "rgba(181,138,82,0.1)",
              border: "1px solid rgba(181,138,82,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                color: "var(--color-accent-light)",
                opacity: 0.5,
              }}
            >
              =
            </span>
            <span
              className="font-serif"
              style={{
                fontSize: "0.95rem",
                color: "var(--color-accent-light)",
                fontWeight: 300,
              }}
            >
              {count}
            </span>
            <span
              style={{
                fontSize: "0.6rem",
                color: "var(--color-accent-light)",
                opacity: 0.5,
                letterSpacing: "0.05em",
              }}
            >
              tiles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Feature Items ──
const features = [
  { icon: Ruler, label: "Instant Results" },
  { icon: LayoutGrid, label: "6 Tile Sizes" },
  { icon: Zap, label: "Free to Use" },
];

// ── Main Component ──
export default function CalculatorCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(100px, 12vw, 180px) 0",
        background:
          "linear-gradient(175deg, var(--color-surface-dark) 0%, var(--color-surface-dark-warm) 100%)",
      }}
    >
      {/* Radial glow — centered behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 55% 45%, rgba(181,138,82,0.14) 0%, transparent 60%)",
        }}
      />

      {/* Secondary glow — bottom left warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 25% 80%, rgba(181,138,82,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top accent line — full-width */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 5%, rgba(181,138,82,0.12) 30%, rgba(181,138,82,0.12) 70%, transparent 95%)",
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: "clamp(36px, 4.5vw, 64px)",
          left: "clamp(48px, 6vw, 96px)",
          width: "28px",
          height: "28px",
          borderTop: "1.5px solid rgba(181,138,82,0.18)",
          borderLeft: "1.5px solid rgba(181,138,82,0.18)",
        }}
      />
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          bottom: "clamp(36px, 4.5vw, 64px)",
          right: "clamp(48px, 6vw, 96px)",
          width: "28px",
          height: "28px",
          borderBottom: "1.5px solid rgba(181,138,82,0.18)",
          borderRight: "1.5px solid rgba(181,138,82,0.18)",
        }}
      />

      {/* ── Content ── */}
      <div className="container relative z-10">
        <div
          className="flex flex-col lg:flex-row items-center justify-center"
          style={{ gap: "clamp(48px, 5vw, 72px)" }}
        >
          {/* Left Column — Text + CTA */}
          <div className="flex-1 lg:max-w-[55%]">
            {/* Eyebrow */}
            <FadeIn>
              <p
                className="text-[0.7rem] font-medium tracking-[0.22em] uppercase"
                style={{
                  marginBottom: "28px",
                  color: "var(--color-accent-light)",
                }}
              >
                Planning Your Project?
              </p>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={0.06}>
              <h2
                className="font-serif font-light"
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  marginBottom: "28px",
                  textWrap: "balance",
                  color: "var(--color-ink-on-dark)",
                }}
              >
                Not Sure How Many{" "}
                <br className="hidden sm:block" />
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
                  width: "clamp(56px, 7vw, 80px)",
                  height: "1.5px",
                  marginBottom: "32px",
                  background:
                    "linear-gradient(90deg, var(--color-accent) 0%, transparent 100%)",
                }}
              />
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.14}>
              <p
                style={{
                  maxWidth: "480px",
                  marginBottom: "44px",
                  textWrap: "balance",
                  color: "var(--color-ink-on-dark-light)",
                  fontSize: "clamp(0.92rem, 1.15vw, 1.06rem)",
                  lineHeight: 1.8,
                }}
              >
                Use our free tile calculator to get an instant estimate. Just
                enter your room dimensions, pick a tile size, and know exactly
                what you need — including wastage allowance.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.2}>
              <div
                className="flex flex-col sm:flex-row items-start"
                style={{ gap: "20px" }}
              >
                <a
                  href="/calculator"
                  className="btn-gold group"
                  style={{
                    padding: "16px 40px",
                    fontSize: "0.7rem",
                  }}
                >
                  Calculate Now
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="/calculator"
                  className="group flex items-center"
                  style={{
                    gap: "6px",
                    padding: "16px 0",
                    fontSize: "0.72rem",
                    fontWeight: 400,
                    letterSpacing: "0.06em",
                    color: "var(--color-accent-light)",
                    opacity: 0.6,
                    transition: "opacity 0.3s linear",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                  }}
                >
                  See how it works
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column — Tile Grid Visual */}
          <div className="flex-1 flex items-center justify-center">
            <FadeIn delay={0.1} direction="none">
              <TileGridVisual />
            </FadeIn>
          </div>
        </div>

        {/* ── Feature Strip ── */}
        <FadeIn delay={0.3}>
          <div
            style={{
              marginTop: "clamp(56px, 7vw, 88px)",
              paddingTop: "clamp(32px, 4vw, 48px)",
              borderTop: "1px solid rgba(181,138,82,0.08)",
            }}
          >
            <div
              className="flex flex-col sm:flex-row items-center justify-center"
              style={{ gap: "0" }}
            >
              {features.map((feature, i) => (
                <div
                  key={feature.label}
                  className="flex items-center"
                  style={{
                    gap: "12px",
                    padding: "12px clamp(20px, 3vw, 40px)",
                    borderRight:
                      i < features.length - 1
                        ? "1px solid rgba(181,138,82,0.12)"
                        : "none",
                  }}
                >
                  <feature.icon
                    size={15}
                    style={{
                      color: "var(--color-accent)",
                      opacity: 0.5,
                      strokeWidth: 1.5,
                    }}
                  />
                  <span
                    className="text-[0.68rem] font-medium tracking-[0.14em] uppercase"
                    style={{ color: "var(--color-ink-on-dark-muted)" }}
                  >
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
