"use client";

import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";
import { aboutStats } from "@/data/about";

export default function AboutStats() {
  return (
    <section className="bg-[var(--bg-alt)]">
      <div className="container">
        <div className="py-14 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
            {aboutStats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="lg:px-8 first:lg:pl-0 last:lg:pr-0 lg:border-r lg:border-[var(--ink)]/8 last:lg:border-0 text-center lg:text-left">
                  <p className="text-4xl md:text-5xl font-serif font-light text-[var(--ink)] leading-none mb-2">
                    {s.prefix && (
                      <span className="text-2xl md:text-3xl text-[var(--ink-muted)]">
                        {s.prefix}
                      </span>
                    )}
                    <CountUp target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[var(--ink-light)] mt-3 mb-1">
                    {s.label}
                  </p>
                  <p className="text-[0.55rem] text-[var(--ink-muted)] tracking-wider">
                    {s.sub}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
