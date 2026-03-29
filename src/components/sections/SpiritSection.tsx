"use client";

import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import MaskReveal from "@/components/animations/MaskReveal";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { spiritItems } from "@/data/spirit";

export default function SpiritSection() {
  return (
    <section className="bg-[var(--bg-dark)] relative overflow-hidden">
      {/* ── Hero Block — full-width cinematic ── */}
      <div className="relative min-h-[70vh] flex items-center">
        {/* Background: Spirit of Nepal tile as texture */}
        <div className="absolute inset-0">
          <img
            src="/images/tiles/spirit-of-nepal.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-dark)] via-[var(--bg-dark)]/85 to-[var(--bg-dark)]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-transparent to-[var(--bg-dark)]/40" />
        </div>

        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="eyebrow text-[var(--accent-light)] mb-5">
                Exclusive Series
              </p>
            </FadeIn>

            <SplitHeading as="h2" className="display text-white mb-4">
              Spirit of Nepal
            </SplitHeading>

            <FadeIn delay={0.15}>
              <div className="w-16 h-[1.5px] bg-[var(--accent)] mb-8" />
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="body-lg text-white/50 max-w-lg mb-10 leading-relaxed">
                Heritage forged in fire. From the serene plains of Lumbini to the
                rugged peaks of the Himalayas — surfaces that carry the soul of our land.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <a
                href="/catalog?collection=spirit-of-nepal"
                className="link-arrow text-white/60 hover:text-[var(--accent-light)]"
              >
                Explore Collection
                <ArrowRight size={14} />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Tile Cards Grid ── */}
      <div className="container pb-20 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {spiritItems.map((item, i) => (
            <FadeIn key={item.name} delay={0.1 + i * 0.12} direction="up" distance={30}>
              <a
                href={`/catalog?collection=spirit-of-nepal`}
                className="group block relative overflow-hidden"
              >
                {/* Tile texture image — portrait ratio */}
                <div className="aspect-[3/4] overflow-hidden bg-[#1a1815]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content — always visible, bottom-aligned */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-[var(--accent-light)] mb-2">
                    {item.type} · {item.size}
                  </p>
                  <h3 className="text-white font-serif text-xl md:text-2xl font-light mb-2">
                    {item.name}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-[240px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow icon — top right */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/30 group-hover:text-white group-hover:bg-[var(--accent)]/80 transition-all duration-500">
                  <MoveUpRight size={16} />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
    </section>
  );
}
