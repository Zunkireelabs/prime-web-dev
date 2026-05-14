"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import TextRevealByWord from "@/components/animations/TextRevealByWord";
import CountUp from "@/components/animations/CountUp";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, Factory, Award } from "lucide-react";
import { promoters } from "@/data/about";

export default function AboutNarrative() {
  return (
    <section id="narrative" className="relative overflow-hidden">
      {/* ── Hero narrative: factory background + content overlay ── */}
      <div className="relative" style={{ minHeight: "clamp(600px, 80vh, 900px)" }}>
        {/* Factory background image */}
        <img
          src="/images/factory-aerial.jpg"
          alt="Prime Ceramics manufacturing facility"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(15,12,9,0.88) 0%, rgba(15,12,9,0.7) 50%, rgba(15,12,9,0.85) 100%)" }}
        />

        {/* Content */}
        <div className="relative z-10 container flex items-center" style={{ minHeight: "clamp(600px, 80vh, 900px)", paddingTop: "clamp(80px, 10vw, 120px)", paddingBottom: "clamp(80px, 10vw, 120px)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px, 6vw, 80px)" }}>
            {/* Left — Story */}
            <div>
              <ScrollReveal from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 85%" end="top 60%">
                <div className="flex items-center gap-4" style={{ marginBottom: "20px" }}>
                  <div className="w-10 h-px bg-accent" />
                  <p className="text-[0.55rem] font-semibold tracking-[0.25em] uppercase text-accent">Our Story</p>
                </div>
              </ScrollReveal>

              <div style={{ marginBottom: "28px" }}>
                <TextRevealByWord as="h2" className="font-serif font-light text-white leading-[1.08] text-[clamp(2rem,4vw,3.2rem)]" start="top 82%" end="top 55%">
                  Nepal&apos;s First. Nepal&apos;s Finest.
                </TextRevealByWord>
              </div>

              <ScrollReveal from={{ y: 35, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 75%" end="top 48%">
                <p className="text-white/70 font-light" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: 1.85, marginBottom: "24px", maxWidth: "520px" }}>
                  Prime Ceramics Private Limited was born from a bold vision &mdash;
                  to build a world-class manufacturing enterprise on Nepalese
                  soil. Established in 2021 with an NPR 3 billion investment,
                  our facility is the only plant in Nepal equipped to manufacture
                  both floor and wall tiles.
                </p>
              </ScrollReveal>

              <ScrollReveal from={{ y: 35, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 70%" end="top 43%">
                <p className="text-white/55 font-light" style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", lineHeight: 1.85, marginBottom: "36px", maxWidth: "520px" }}>
                  Powered by Italian SACMI technology, we achieved the highest
                  sales volume among all tile manufacturers in Nepal for
                  FY 2023&ndash;24 &mdash; in just our second year of full operation.
                </p>
              </ScrollReveal>

              {/* Quote */}
              <ScrollReveal from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 65%" end="top 38%">
                <blockquote className="relative pl-6 border-l-2 border-accent/40" style={{ marginBottom: "40px" }}>
                  <p className="font-serif italic text-white/90 leading-[1.6]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.2rem)" }}>
                    &ldquo;We envisioned a Nepal that doesn&rsquo;t just import excellence
                    &mdash; but creates it. Every tile we craft carries that ambition.&rdquo;
                  </p>
                </blockquote>
              </ScrollReveal>

              <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 55%" end="top 32%">
                <a href="#journey" className="link-arrow text-accent hover:text-white">
                  See Our Journey <ArrowRight size={14} />
                </a>
              </ScrollReveal>
            </div>

            {/* Right — Stats + Promoters */}
            <div>
              {/* Stats grid */}
              <ScrollReveal from={{ y: 25, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 80%" end="top 55%">
                <div
                  className="grid grid-cols-3"
                  style={{
                    gap: "1px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "clamp(40px, 5vw, 56px)",
                  }}
                >
                  {[
                    { value: 4, suffix: "M", label: "Sq m / Year" },
                    { value: 200, suffix: "+", label: "Dealers" },
                    { value: 3, suffix: "B", prefix: "NPR ", label: "Investment" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center"
                      style={{ padding: "clamp(24px, 3vw, 32px) 12px", background: "rgba(255,255,255,0.03)" }}
                    >
                      <p className="font-serif font-light text-white leading-none" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", marginBottom: "8px" }}>
                        {s.prefix}<CountUp target={s.value} suffix={s.suffix} />
                      </p>
                      <p className="text-[0.5rem] font-semibold tracking-[0.16em] uppercase text-white/40">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Promoters */}
              <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
                <div className="flex items-center gap-3" style={{ marginBottom: "24px" }}>
                  <div className="w-8 h-px bg-accent/40" />
                  <p className="text-[0.55rem] font-semibold tracking-[0.3em] uppercase text-white/40">Promoted By</p>
                </div>
              </ScrollReveal>

              <div className="flex flex-col" style={{ gap: "16px" }}>
                {promoters.map((p, i) => (
                  <ScrollReveal key={p.name} from={{ y: 25, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 80%" end="top 55%">
                    <div
                      className="group"
                      style={{
                        padding: "clamp(20px, 3vw, 28px)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "8px",
                        transition: "border-color 0.3s",
                      }}
                    >
                      <div className="flex items-center gap-4" style={{ marginBottom: "12px" }}>
                        <div className="w-9 h-9 rounded-full border border-accent/25 bg-accent/[0.08] flex items-center justify-center text-accent">
                          {i === 0 ? <Factory size={14} strokeWidth={1.5} /> : <Award size={14} strokeWidth={1.5} />}
                        </div>
                        <div>
                          <p className="text-[0.7rem] font-medium tracking-[0.1em] uppercase text-white/90">
                            {p.name}
                          </p>
                          <p className="text-[0.5rem] font-medium tracking-[0.15em] uppercase text-accent/60">{p.role}</p>
                        </div>
                      </div>
                      <p className="text-[0.78rem] text-white/50 font-light" style={{ lineHeight: 1.8 }}>{p.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
