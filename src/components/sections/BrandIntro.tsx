"use client";

import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: 4, suffix: "M", label: "Sq.m Annual Capacity", accent: true },
  { value: 120, suffix: "+", label: "Dealers Nationwide", accent: false },
  { value: 600, suffix: "+", label: "Tile Designs", accent: false },
  { value: 16000, suffix: "", label: "Tons CO\u2082 Saved", accent: false },
];

export default function BrandIntro() {
  return (
    <section className="bg-surface" style={{ padding: "clamp(80px, 10vw, 120px) 0" }}>
      <div className="container">
        {/* ── Centered header ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 64px)" }}>
          <FadeIn>
            <div className="flex items-center justify-center" style={{ gap: "16px", marginBottom: "20px" }}>
              <div className="w-10 h-px bg-accent" />
              <p className="eyebrow text-accent">About Prime Ceramics</p>
              <div className="w-10 h-px bg-accent" />
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h2
              className="font-serif font-light text-ink mx-auto"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                lineHeight: 1.1,
                marginBottom: "24px",
                maxWidth: "700px",
              }}
            >
              Nepal&apos;s First Manufacturer of Both Wall &amp; Floor Tiles
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="w-12 h-[1.5px] bg-accent mx-auto" style={{ marginBottom: "24px" }} />
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="body-lg text-ink-light mx-auto" style={{ maxWidth: "600px", lineHeight: 1.85 }}>
              Established in 2021, powered by Italian SACMI HD technology with
              an annual capacity of 4 million square meters. Promoted by CMS and
              Fortune Ventures.
            </p>
          </FadeIn>
        </div>

        {/* ── Stats row with left accent borders ── */}
        <FadeIn delay={0.2}>
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "clamp(20px, 3vw, 28px) clamp(16px, 2.5vw, 32px)",
                  borderLeft: `2px solid ${i === 0 ? "var(--color-accent)" : "rgba(150,112,76,0.25)"}`,
                }}
              >
                <p
                  className="font-serif font-light"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                    lineHeight: 1,
                    marginBottom: "6px",
                    color: s.accent ? "var(--color-accent)" : "var(--color-ink)",
                  }}
                >
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[0.5rem] font-semibold tracking-[0.16em] uppercase text-ink-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Quote + Promoters + CTA ── */}
        <FadeIn delay={0.25}>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{
              gap: "clamp(40px, 5vw, 64px)",
              alignItems: "center",
              paddingTop: "clamp(40px, 5vw, 56px)",
              borderTop: "1px solid rgba(43,36,28,0.08)",
            }}
          >
            {/* Left — Quote */}
            <div className="relative" style={{ paddingLeft: "28px", borderLeft: "2px solid rgba(150,112,76,0.3)" }}>
              <span
                className="absolute font-serif text-accent/[0.08] leading-none select-none pointer-events-none"
                style={{ top: "-16px", left: "-10px", fontSize: "5rem" }}
              >
                &ldquo;
              </span>
              <p
                className="font-serif font-light text-ink italic"
                style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.6 }}
              >
                We envisioned a Nepal that doesn&rsquo;t just import excellence
                &mdash; but creates it. Every tile we craft carries that ambition.
              </p>
            </div>

            {/* Right — Promoters + CTA */}
            <div>
              {/* SACMI */}
              <div className="flex items-center" style={{ gap: "12px", marginBottom: "16px" }}>
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(150,112,76,0.08)",
                    border: "1px solid rgba(150,112,76,0.15)",
                  }}
                >
                  <span className="font-serif text-accent text-[0.7rem] font-medium">S</span>
                </div>
                <div>
                  <p className="text-[0.75rem] font-medium text-ink">SACMI Technology</p>
                  <p className="text-[0.55rem] text-ink-muted">Italian HD Printing</p>
                </div>
              </div>

              {/* Promoters */}
              <div className="flex items-center" style={{ gap: "12px", marginBottom: "28px" }}>
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(150,112,76,0.08)",
                    border: "1px solid rgba(150,112,76,0.15)",
                  }}
                >
                  <span className="font-serif text-accent text-[0.7rem] font-medium">P</span>
                </div>
                <div>
                  <p className="text-[0.75rem] font-medium text-ink">CMS &amp; Fortune Ventures</p>
                  <p className="text-[0.55rem] text-ink-muted">Promoted by industry leaders</p>
                </div>
              </div>

              {/* CTA */}
              <a href="/about" className="btn-fill group">
                Our Story
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
