"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[var(--bg-amber)]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/images/hero/cta-bg.jpg')" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
            Get Started
          </p>
        </ScrollReveal>

        <TextReveal
          as="h2"
          className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)] mb-6"
        >
          Ready to Begin?
        </TextReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-lg text-[var(--text-secondary)] mb-10">
            Take the first step towards an exceptional experience. We&apos;re
            here to help you every step of the way.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-[var(--gold)] text-black text-sm uppercase tracking-[0.2em] font-medium hover:bg-[var(--gold-light)] transition-colors duration-500"
          >
            Contact Us
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
