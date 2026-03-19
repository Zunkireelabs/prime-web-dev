"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

const stats = [
  { number: "10+", label: "Years of Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "50+", label: "Projects Completed" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-navy)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
              Our Track Record
            </p>
          </ScrollReveal>

          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)]"
          >
            Experience That Speaks
          </TextReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif gold-gradient-text mb-2">
                  {stat.number}
                </p>
                <p className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
