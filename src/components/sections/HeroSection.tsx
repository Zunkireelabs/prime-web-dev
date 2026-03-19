"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <TextReveal
          as="h1"
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-[var(--text-primary)] mb-6"
          direction="up"
        >
          Prime
        </TextReveal>

        <ScrollReveal delay={0.5}>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light tracking-wide max-w-2xl mx-auto mb-8">
            Premium experience crafted with care and attention to detail
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <a
            href="#about"
            className="inline-block px-8 py-3 border border-[var(--gold)] text-[var(--gold)] text-sm uppercase tracking-[0.2em] hover:bg-[var(--gold)] hover:text-black transition-all duration-500"
          >
            Discover More
          </a>
        </ScrollReveal>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--gold)] to-transparent animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}
