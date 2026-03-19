"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function PhilosophySection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-forest)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
            Our Philosophy
          </p>
        </ScrollReveal>

        <TextReveal
          as="h2"
          className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)] mb-8"
        >
          Crafted with Purpose
        </TextReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            We believe that excellence is not a destination but a journey. Every
            choice we make, every path we take, is guided by an unwavering
            commitment to quality and authenticity.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Quality",
                desc: "Uncompromising standards in everything we do",
              },
              {
                title: "Integrity",
                desc: "Honest, transparent, and true to our word",
              },
              {
                title: "Innovation",
                desc: "Constantly evolving while respecting tradition",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-xl font-serif text-[var(--gold)] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
