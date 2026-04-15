"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section id="about-cta" className="bg-surface-red section-pad-lg relative overflow-hidden">
      {/* Bottom glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(253, 224, 219, 0.08) 0%, transparent 60%)" }} />
      {/* Top glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 20%, rgba(253, 224, 219, 0.05) 0%, transparent 60%)" }} />

      {/* Pulsing rings — larger, more visible */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-ink-on-red/[0.05] pointer-events-none animate-cta-ring-1" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-ink-on-red/[0.07] pointer-events-none animate-cta-ring-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-ink-on-red/[0.04] pointer-events-none animate-cta-ring-3" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="container relative z-10" style={{ textAlign: "center" }}>
        <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
          <div className="flex items-center justify-center gap-4" style={{ marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "1px", background: "rgba(253,224,219,0.25)" }} />
            <p className="text-[0.65rem] font-medium tracking-[0.22em] uppercase text-ink-on-red/70">Get Started</p>
            <div style={{ width: "40px", height: "1px", background: "rgba(253,224,219,0.25)" }} />
          </div>
        </ScrollReveal>

        <ScrollReveal from={{ y: 40, opacity: 0, scale: 0.95 }} to={{ y: 0, opacity: 1, scale: 1 }}>
          <p
            className="font-serif font-light text-ink-on-red"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              marginBottom: "28px",
            }}
          >
            Tiles with <span className="italic">Stile.</span>
          </p>
        </ScrollReveal>

        <ScrollReveal from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
          <p
            className="text-ink-on-red-muted"
            style={{
              maxWidth: "460px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "52px",
              fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)",
              lineHeight: 1.7,
            }}
          >
            Visit our showrooms or connect with a dealer near you.
            Every surface tells a story — let us help you find yours.
          </p>
        </ScrollReveal>

        <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "20px" }}>
            <a href="/dealers" className="btn-on-red group">
              Find a Dealer
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="/catalog" className="btn-on-red-outline group">
              Explore Catalog
              <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style jsx>{`
        @keyframes ctaRing1 { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.05; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.02; } }
        @keyframes ctaRing2 { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.07; } 50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.03; } }
        @keyframes ctaRing3 { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.04; } 50% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.07; } }
        .animate-cta-ring-1 { animation: ctaRing1 5s linear infinite; }
        .animate-cta-ring-2 { animation: ctaRing2 5s linear infinite 1.5s; }
        .animate-cta-ring-3 { animation: ctaRing3 6s linear infinite 3s; }
      `}</style>
    </section>
  );
}
