"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function CalculatorHero() {
  return (
    <section
      className="bg-surface-dark relative overflow-hidden"
      style={{
        paddingTop: "120px",
        paddingBottom: "56px",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(181,138,82,0.08) 0%, transparent 60%)",
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

      <div className="container relative z-10">
        <div style={{ maxWidth: "640px" }}>
          {/* Breadcrumb */}
          <FadeIn>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-on-dark-muted"
              style={{ gap: "10px", marginBottom: "28px" }}
            >
              <Link
                href="/"
                className="hover:text-ink-on-dark"
                style={{ transition: "color 0.3s" }}
              >
                Home
              </Link>
              <ChevronRight size={10} aria-hidden="true" />
              <span className="text-ink-on-dark-light">Calculator</span>
            </nav>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.05}>
            <h1
              className="font-serif font-light text-ink-on-dark"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Tile{" "}
              <span className="italic text-accent-light">Calculator</span>
            </h1>
          </FadeIn>

          {/* One-line description */}
          <FadeIn delay={0.1}>
            <p
              className="text-ink-on-dark-light font-light"
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "480px",
              }}
            >
              Estimate the exact number of tiles and boxes needed for your
              project — with built-in wastage allowance.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Bottom gold gradient border */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 5%, rgba(181,138,82,0.2) 30%, rgba(181,138,82,0.2) 70%, transparent 95%)",
        }}
      />
    </section>
  );
}
