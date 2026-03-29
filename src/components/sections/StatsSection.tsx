"use client";

import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 200, suffix: "+", label: "Unique Designs" },
  { value: 5000, suffix: "+", label: "Projects Completed" },
  { value: 12, suffix: "", label: "Showrooms" },
];

export default function StatsSection() {
  return (
    <section className="surface-dark py-20 md:py-28">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08} className="text-center lg:text-left">
              <p className="display text-[var(--accent-light)] leading-none mb-3">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="eyebrow text-[var(--ink-on-dark-muted)]">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
