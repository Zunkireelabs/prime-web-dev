"use client";

import Image from "next/image";
import { ShieldCheck, Leaf, BadgeCheck, Cog } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { certifications } from "@/data/about";
import { clients } from "@/data/clients";

const iconMap: Record<string, any> = { ShieldCheck, Leaf, BadgeCheck, Cog };

export default function TrustSignals() {
  const logoSet = clients.map((c) => (
    <div
      key={c.name}
      className="flex items-center justify-center flex-shrink-0 w-[180px] md:w-[220px] h-[80px] md:h-[100px] group"
    >
      <div className="relative grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <Image
          src={c.logo}
          alt={c.name}
          width={c.width}
          height={c.height}
          className="object-contain max-h-[50px] md:max-h-[60px] w-auto"
          unoptimized
        />
      </div>
    </div>
  ));

  return (
    <section className="bg-[var(--bg-alt)] section-pad-sm overflow-hidden">
      {/* Centered eyebrow */}
      <FadeIn direction="up" distance={30}>
        <div className="text-center mb-4">
          <span className="eyebrow text-[var(--ink-muted)]">
            Trusted By Industry Leaders
          </span>
        </div>
      </FadeIn>

      {/* ── TOP HALF — Certifications ── */}
      <div className="max-w-[var(--max-w)] mx-auto px-[var(--gutter)] mb-12 md:mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon];
            return (
              <FadeIn
                key={cert.name}
                direction="up"
                distance={30}
                delay={i * 0.1}
              >
                <div className="text-center p-6 border border-[var(--ink)]/8 hover:border-[var(--accent)]/25 transition-colors duration-300">
                  <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center text-[var(--accent)]">
                    {Icon && <Icon size={24} />}
                  </div>
                  <p className="body-sm font-medium text-[var(--ink)] mb-1">
                    {cert.name}
                  </p>
                  <p className="text-[0.7rem] text-[var(--ink-muted)]">
                    {cert.label}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-[var(--max-w)] mx-auto px-[var(--gutter)]">
        <div className="h-px bg-[var(--ink)]/8 mb-12 md:mb-16" />
      </div>

      {/* ── BOTTOM HALF — Client logos marquee ── */}
      <FadeIn direction="none" delay={0.2}>
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[var(--bg-alt)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[var(--bg-alt)] to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-8 md:gap-14 animate-trust-marquee">
            {logoSet}
            {logoSet}
            {logoSet}
          </div>
        </div>
      </FadeIn>

      <style jsx>{`
        @keyframes trustMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-trust-marquee {
          animation: trustMarquee 25s linear infinite;
          width: max-content;
        }
        .animate-trust-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
