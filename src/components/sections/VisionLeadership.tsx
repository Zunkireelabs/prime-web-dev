"use client";

import FadeIn from "@/components/animations/FadeIn";
import { visionQuote, promoters } from "@/data/about";

export default function VisionLeadership() {
  return (
    <section className="bg-[var(--bg)] section-pad">
      <div className="container">
        {/* ── Pattern A Header ── */}
        <FadeIn direction="up">
          <p className="eyebrow text-[var(--accent)] mb-4">The Vision</p>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <h2 className="h2 text-[var(--ink)] mb-6">
            Building Nepal&rsquo;s Tile Legacy
          </h2>
        </FadeIn>
        <FadeIn direction="up" delay={0.15}>
          <div className="h-px bg-[var(--ink)]/10 mb-12 md:mb-16" />
        </FadeIn>

        {/* ── Vision Quote ── */}
        <FadeIn direction="up" delay={0.2}>
          <blockquote className="border-l-2 border-[var(--accent)]/30 pl-8 md:pl-12">
            <p className="h3 font-serif italic text-[var(--ink)] max-w-3xl">
              &ldquo;{visionQuote}&rdquo;
            </p>
          </blockquote>
        </FadeIn>

        {/* ── Promoter Cards ── */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {promoters.map((promoter, index) => (
            <FadeIn key={promoter.name} direction="up" delay={0.1 * index}>
              <div className="border border-[var(--ink)]/8 p-8 hover:border-[var(--accent)]/25 transition-colors duration-300">
                <div className="w-10 h-[1.5px] bg-[var(--accent)] mb-6" />
                <h3 className="h3 text-[var(--ink)] mb-1">{promoter.name}</h3>
                <p className="eyebrow text-[var(--ink-muted)] mb-4">
                  {promoter.role}
                </p>
                <p className="body-sm text-[var(--ink-light)] max-w-sm">
                  {promoter.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
