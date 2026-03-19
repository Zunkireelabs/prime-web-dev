"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function SpaEtiquette() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
            Guidelines
          </p>
        </ScrollReveal>

        <TextReveal
          as="h2"
          className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)] mb-8"
        >
          Etiquette
        </TextReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Placeholder for etiquette or guidelines content.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
