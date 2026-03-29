"use client";

import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--bg-dark)] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/about-factory.jpg"
        alt="Prime Ceramics factory aerial view"
        fill
        className="object-cover"
        priority
        unoptimized
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <FadeIn delay={0.3}>
          <p className="eyebrow text-[var(--accent-light)] mb-4">
            About Prime Ceramics
          </p>
        </FadeIn>

        {/* Heading */}
        <SplitHeading
          as="h1"
          className="display text-[var(--ink-on-dark)]"
        >
          Nepal&apos;s First Tile Manufacturer
        </SplitHeading>

        {/* Accent line */}
        <FadeIn delay={0.5}>
          <div
            className="mx-auto my-6 bg-[var(--accent)]"
            style={{ width: 48, height: 1.5 }}
          />
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.6}>
          <p className="body-lg text-[var(--ink-on-dark-light)] max-w-lg text-center">
            Where Italian precision meets Nepali ambition.
          </p>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.7}>
          <a href="#craft" className="link-arrow mt-8 inline-flex items-center gap-2">
            Explore Our Craft
            <ArrowRight size={16} />
          </a>
        </FadeIn>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#craft"
          aria-label="Scroll down"
          className="scroll-cue inline-block text-[var(--ink-on-dark-light)]"
        >
          <ChevronDown size={28} />
        </a>
      </div>

      {/* Scroll cue bounce animation */}
      <style jsx>{`
        @keyframes scrollBounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }
        .scroll-cue {
          animation: scrollBounce 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
