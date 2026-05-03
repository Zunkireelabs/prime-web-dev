"use client";

import { ArrowDown } from "lucide-react";

export default function CareersHero() {
  return (
    <section
      className="relative bg-surface-dark overflow-hidden"
      style={{
        paddingTop: "clamp(140px, 18vw, 200px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        minHeight: "clamp(560px, 72vh, 760px)",
      }}
    >
      {/* Marble texture background */}
      <img
        src="/images/tiles/onyx.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.18) saturate(0.4)" }}
      />

      {/* Dark gradient overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,24,21,0.92) 0%, rgba(26,24,21,0.78) 60%, rgba(26,24,21,0.96) 100%)",
        }}
      />

      {/* Subtle accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(181,138,82,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <div
          className="max-w-3xl"
          style={{ display: "flex", flexDirection: "column", gap: "28px" }}
        >
          <p className="eyebrow text-accent">Careers</p>

          <h1
            className="font-serif font-light text-white"
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
            }}
          >
            Build with us.
          </h1>

          <div
            className="bg-accent"
            style={{ width: "64px", height: "1.5px" }}
          />

          <p
            className="font-light text-white/75"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              lineHeight: 1.7,
              maxWidth: "640px",
            }}
          >
            We&apos;re building Nepal&apos;s first NS-certified tile manufacturer
            from the ground up — Italian engineering, Nepali craftsmanship,
            global ambition. If that sounds like a place you&apos;d want to spend
            a decade, we should talk.
          </p>

          <a
            href="#openings"
            className="inline-flex items-center text-[0.7rem] font-medium tracking-[0.22em] uppercase text-white/85 hover:text-accent"
            style={{ gap: "10px", marginTop: "12px", transition: "color 0.3s linear" }}
          >
            See open roles
            <ArrowDown size={14} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  );
}
