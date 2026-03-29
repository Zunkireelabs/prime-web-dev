"use client";

import { useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import MaskReveal from "@/components/animations/MaskReveal";

import { ArrowRight, MoveUpRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { spiritItems } from "@/data/spirit";

export default function SpiritSection() {
  return (
    <section className="bg-[var(--bg-dark)] section-pad relative overflow-hidden">
      {/* Subtle Background Pattern (Mandala-inspired geometry) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="spiritGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="1" fill="var(--accent)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#spiritGrid)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-20">
          <div className="lg:col-span-6">
            <FadeIn>
              <p className="eyebrow text-[var(--accent-light)] mb-4">
                Exclusive Series
              </p>
            </FadeIn>
            <SplitHeading as="h2" className="display text-white mb-2">
              Spirit of Nepal
            </SplitHeading>
            <FadeIn delay={0.2}>
              <p className="text-[var(--accent-light)] font-serif italic text-lg mb-8 opacity-80">
                Heritage forged in fire.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="body-lg text-white/50 max-w-lg mb-10">
                A collection that transcends boundaries. We&apos;ve taken the essence of 
                Nepali heritage—from the serene plains of Lumbini to the rugged peaks 
                of the Himalayas—and forged it into surfaces that define modern luxury.
              </p>
              <a href="/catalog?collection=spirit-of-nepal" className="btn-line border-white/15 text-white/80 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white transition-all duration-500">
                Explore the Narrative <ArrowRight size={14} className="ml-2" />
              </a>
            </FadeIn>
          </div>

          <div className="lg:col-span-6">
            <MaskReveal direction="right" delay={0.2}>
              <div className="relative aspect-[16/10] img-gs">
                <img
                  src="/images/hero/slide-2.jpg"
                  alt="Spirit of Nepal Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white font-serif text-2xl italic">"Where culture meets craft."</p>
                </div>
              </div>
            </MaskReveal>
          </div>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spiritItems.map((item, i) => (
            <FadeIn key={item.name} delay={0.2 + i * 0.1} direction="up" distance={30}>
              <div className="group cursor-pointer h-full">
                <div className="bg-[var(--bg-dark-alt)] border border-white/5 p-6 h-full flex flex-col hover:border-[var(--accent)]/25 transition-all duration-500 hover:bg-[var(--bg-dark-alt)]/80">
                  <div className="aspect-square overflow-hidden mb-6 relative img-gs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                      <MoveUpRight size={16} />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-[var(--accent-light)] mb-2">
                      {item.type}
                    </p>
                    <h3 className="h3 text-white mb-3 group-hover:text-[var(--accent-light)] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Artisanal Stone Divider (SVG texture) */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-[var(--accent)]" />
    </section>
  );
}
