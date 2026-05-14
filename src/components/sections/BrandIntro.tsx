"use client";

import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";
import { ArrowRight, Factory, Users, Award, Leaf } from "lucide-react";

const highlights = [
  { icon: Factory, value: 4, suffix: "M", label: "Sq.m Annual Capacity" },
  { icon: Users, value: 120, suffix: "+", label: "Dealers Nationwide" },
  { icon: Award, value: 600, suffix: "+", label: "Tile Designs" },
  { icon: Leaf, value: 16000, suffix: "", label: "Tons CO\u2082 Saved/Year" },
];

export default function BrandIntro() {
  return (
    <section className="bg-surface" style={{ paddingTop: "clamp(80px, 10vw, 120px)", paddingBottom: 0 }}>
      <div className="container">
        {/* ── Top: Two-column layout ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "clamp(40px, 5vw, 64px)", marginBottom: "clamp(56px, 7vw, 80px)" }}
        >
          {/* Left — Content */}
          <div>
            <FadeIn>
              <div className="flex items-center" style={{ gap: "16px", marginBottom: "20px" }}>
                <div className="w-10 h-px bg-accent" />
                <p className="eyebrow text-accent">About Prime Ceramics</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.06}>
              <h2
                className="font-serif font-light text-ink"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  lineHeight: 1.12,
                  marginBottom: "24px",
                }}
              >
                Nepal&apos;s First Manufacturer of Both Wall &amp; Floor Tiles
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="w-12 h-[1.5px] bg-accent" style={{ marginBottom: "24px" }} />
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="body-lg text-ink-light" style={{ marginBottom: "20px", lineHeight: 1.85, maxWidth: "520px" }}>
                Established in 2021, Prime Ceramics operates a state-of-the-art
                production facility in Brindavan Municipality, Rautahat &mdash; powered
                by Italian SACMI HD printing technology with an annual capacity
                of 4 million square meters.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="body-sm text-ink-muted" style={{ marginBottom: "32px", lineHeight: 1.85, maxWidth: "520px" }}>
                Promoted by CMS and Fortune Ventures &mdash; two of Nepal&apos;s
                most respected business houses with over two decades of
                excellence in construction materials.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <a href="/about" className="btn-fill group">
                Our Story
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </FadeIn>
          </div>

          {/* Right — Factory image */}
          <div>
            <FadeIn delay={0.1} direction="left" distance={30}>
              <div className="relative overflow-hidden group" style={{ borderRadius: "4px" }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/about-factory.jpg"
                    alt="Prime Ceramics Production Facility"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>

                {/* SACMI badge */}
                <div
                  className="absolute bg-ink text-white flex flex-col items-center justify-center"
                  style={{
                    width: "clamp(88px, 12vw, 120px)",
                    height: "clamp(88px, 12vw, 120px)",
                    borderRadius: "50%",
                    bottom: "-16px",
                    left: "20px",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                    zIndex: 2,
                  }}
                >
                  <p className="text-[0.4rem] font-semibold tracking-[0.2em] uppercase text-accent" style={{ marginBottom: "2px" }}>
                    Powered by
                  </p>
                  <p className="font-serif font-light text-white" style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)", lineHeight: 1 }}>
                    SACMI
                  </p>
                  <p className="text-[0.4rem] tracking-[0.12em] uppercase text-white/50" style={{ marginTop: "2px" }}>
                    Italy
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Bottom: Stats bar (full width, dark) ── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{
          background: "var(--color-ink)",
        }}
      >
        {highlights.map((item, i) => (
          <FadeIn key={item.label} delay={0.1 + i * 0.06} direction="up" distance={10}>
            <div
              className="flex flex-col items-center text-center"
              style={{
                padding: "clamp(24px, 3.5vw, 36px) 16px",
                borderRight: i < highlights.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <item.icon size={16} className="text-accent" style={{ marginBottom: "8px", opacity: 0.6 }} />
              <p className="font-serif font-light text-white" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", lineHeight: 1, marginBottom: "6px" }}>
                <CountUp target={item.value} suffix={item.suffix} />
              </p>
              <p className="text-[0.45rem] font-semibold tracking-[0.14em] uppercase text-white/40">
                {item.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
