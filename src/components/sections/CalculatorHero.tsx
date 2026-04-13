"use client";

import Link from "next/link";
import { ChevronRight, Calculator } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function CalculatorHero() {
  return (
    <section
      className="bg-surface-dark relative overflow-hidden"
      style={{ paddingTop: "clamp(120px, 14vw, 180px)", paddingBottom: "clamp(64px, 8vw, 100px)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(181,138,82,0.1) 0%, transparent 65%)" }}
      />

      <div className="container relative z-10">
        <div style={{ maxWidth: "640px" }}>
          <FadeIn>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-on-dark-muted"
              style={{ gap: "10px", marginBottom: "32px" }}
            >
              <Link href="/" className="hover:text-ink-on-dark" style={{ transition: "color 0.3s" }}>
                Home
              </Link>
              <ChevronRight size={10} aria-hidden="true" />
              <span className="text-ink-on-dark-light">Calculator</span>
            </nav>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="flex items-center" style={{ gap: "12px", marginBottom: "20px" }}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(181,138,82,0.25)",
                }}
              >
                <Calculator size={18} style={{ color: "var(--color-accent-light)" }} />
              </div>
              <p className="text-[0.65rem] font-medium tracking-[0.22em] uppercase text-accent-light">
                Tile Calculator
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="font-serif font-light text-ink-on-dark"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                marginBottom: "24px",
              }}
            >
              Calculate Your{" "}
              <span className="italic text-accent-light">Tile Needs</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p
              className="text-ink-on-dark-light font-light"
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "480px",
              }}
            >
              Enter your room dimensions and tile preference. Get an instant
              estimate of how many tiles and boxes you need — including wastage
              allowance for cuts and layout.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/15" />
    </section>
  );
}
