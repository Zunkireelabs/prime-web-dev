"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section id="about-cta" className="bg-surface-red section-pad-lg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(253, 224, 219, 0.06) 0%, transparent 60%)" }} />
      {/* Pulsing rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-ink-on-red/[0.04] pointer-events-none animate-cta-ring-1" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-ink-on-red/[0.06] pointer-events-none animate-cta-ring-2" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="container relative z-10" style={{ textAlign: "center" }}>
        <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
          <div className="flex items-center justify-center gap-4" style={{ marginBottom: "16px" }}>
            <div className="w-8 h-px bg-ink-on-red/30" />
            <p className="eyebrow text-ink-on-red/70">Get Started</p>
            <div className="w-8 h-px bg-ink-on-red/30" />
          </div>
        </ScrollReveal>
        <ScrollReveal from={{ y: 40, opacity: 0, scale: 0.95 }} to={{ y: 0, opacity: 1, scale: 1 }}>
          <p className="display text-ink-on-red" style={{ marginBottom: "24px" }}>Tiles with Stile.</p>
        </ScrollReveal>
        <ScrollReveal from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
          <p className="body-lg text-ink-on-red-muted" style={{ maxWidth: "448px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px" }}>
            Visit our showrooms or connect with a dealer near you.
          </p>
        </ScrollReveal>
        <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "24px" }}>
            <a href="/dealers" className="btn-on-red group">
              Visit Showroom
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
        @keyframes ctaRing1 { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.04; } 50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.02; } }
        @keyframes ctaRing2 { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.06; } 50% { transform: translate(-50%, -50%) scale(1.06); opacity: 0.03; } }
        .animate-cta-ring-1 { animation: ctaRing1 4s linear infinite; }
        .animate-cta-ring-2 { animation: ctaRing2 4s linear infinite 2s; }
      `}</style>
    </section>
  );
}
