"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import TextRevealByWord from "@/components/animations/TextRevealByWord";
import { Eye, Target, Check } from "lucide-react";
import { visionStatement, missionStatements } from "@/data/about";

export default function AboutPurpose() {
  return (
    <section
      id="about-purpose"
      className="relative overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      {/* Marble texture background */}
      <img
        src="/images/tiles/onyx.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.12) saturate(0.3)" }}
      />

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(26,24,21,0.92) 0%, rgba(26,24,21,0.88) 50%, rgba(26,24,21,0.94) 100%)" }}
      />

      {/* Subtle accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(181,138,82,0.04) 0%, transparent 60%)" }}
      />

      <div className="container relative z-10">
        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 85%" end="top 60%">
            <div className="flex items-center justify-center gap-4" style={{ marginBottom: "20px" }}>
              <div className="w-10 h-px bg-accent/40" />
              <p className="eyebrow text-accent-light">Our Purpose</p>
              <div className="w-10 h-px bg-accent/40" />
            </div>
          </ScrollReveal>
          <TextRevealByWord
            as="h2"
            className="font-serif font-light text-white leading-[1.1]"
            start="top 80%"
            end="top 55%"
          >
            What Drives Us Forward
          </TextRevealByWord>
          <ScrollReveal from={{ scaleX: 0 }} to={{ scaleX: 1 }} start="top 75%" end="top 55%">
            <div className="w-14 h-[1.5px] bg-accent mx-auto origin-center" style={{ marginTop: "24px" }} />
          </ScrollReveal>
        </div>

        {/* ── Vision + Mission ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px, 6vw, 80px)", marginBottom: "clamp(64px, 8vw, 100px)" }}>
          {/* Vision */}
          <ScrollReveal from={{ x: -40, opacity: 0 }} to={{ x: 0, opacity: 1 }} start="top 80%" end="top 50%">
            <div
              className="relative rounded-sm"
              style={{
                padding: "clamp(32px, 4vw, 48px)",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "24px" }}>
                <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/[0.06] flex items-center justify-center">
                  <Eye size={20} strokeWidth={1.5} className="text-accent-light" />
                </div>
                <div>
                  <p className="eyebrow text-accent-light" style={{ marginBottom: "2px" }}>Our Vision</p>
                  <div className="w-6 h-[1px] bg-accent/30" />
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/[0.06]" style={{ marginBottom: "24px" }} />
              <blockquote
                className="font-serif text-ink-on-dark leading-[1.7]"
                style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)" }}
              >
                {visionStatement}
              </blockquote>
            </div>
          </ScrollReveal>

          {/* Mission */}
          <ScrollReveal from={{ x: 40, opacity: 0 }} to={{ x: 0, opacity: 1 }} start="top 80%" end="top 50%">
            <div
              className="relative rounded-sm"
              style={{
                padding: "clamp(32px, 4vw, 48px)",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "24px" }}>
                <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/[0.06] flex items-center justify-center">
                  <Target size={20} strokeWidth={1.5} className="text-accent-light" />
                </div>
                <div>
                  <p className="eyebrow text-accent-light" style={{ marginBottom: "2px" }}>Our Mission</p>
                  <div className="w-6 h-[1px] bg-accent/30" />
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/[0.06]" style={{ marginBottom: "24px" }} />
              <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {missionStatements.map((m, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full border border-accent/20 bg-accent/[0.06] flex items-center justify-center shrink-0" style={{ marginTop: "2px" }}>
                      <Check size={12} className="text-accent-light" strokeWidth={2} />
                    </div>
                    <p className="text-ink-on-dark-light leading-[1.8]" style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)" }}>
                      {m}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Values Strip ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "clamp(48px, 6vw, 72px)" }}>
          <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 56px)" }}>
              <p className="text-[0.55rem] font-medium tracking-[0.35em] uppercase text-accent-light/50" style={{ marginBottom: "12px" }}>
                Our Promise
              </p>
              <h3
                className="font-serif font-light text-white leading-[1.15]"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                Built on Principles That Matter
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
            {[
              { num: "01", title: "Innovation", desc: "Continuous advancement in manufacturing technology and tile design." },
              { num: "02", title: "Transparency", desc: "Ethical business practices and honest partnerships with every stakeholder." },
              { num: "03", title: "Sustainability", desc: "Environmentally responsible manufacturing that leads by example." },
              { num: "04", title: "Excellence", desc: "Uncompromising quality in every tile that leaves our facility." },
            ].map((item) => (
              <ScrollReveal key={item.title} from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 88%" end="top 60%">
                <div
                  className="relative rounded-sm h-full"
                  style={{
                    padding: "clamp(28px, 3.5vw, 40px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.025)",
                  }}
                >
                  <span
                    className="font-serif font-light text-accent/25 leading-none block"
                    style={{ fontSize: "clamp(1.6rem, 2.2vw, 2rem)", marginBottom: "16px" }}
                  >
                    {item.num}
                  </span>
                  <div className="w-6 h-[1px] bg-accent/25" style={{ marginBottom: "16px" }} />
                  <p
                    className="font-semibold tracking-[0.2em] uppercase text-white"
                    style={{ fontSize: "0.65rem", marginBottom: "12px" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-ink-on-dark-light leading-[1.75]" style={{ fontSize: "0.85rem" }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
