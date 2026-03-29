"use client";

import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";
import { Layers, Ruler, Store, Award } from "lucide-react";
import { stats as statsData } from "@/data/stats";

const iconMap: Record<string, typeof Layers> = { Layers, Ruler, Store, Award };
const stats = statsData.map((s) => ({
  v: s.value, s: s.suffix, l: s.label, sub: s.sub, icon: iconMap[s.icon] || Layers,
}));

export default function StatsBar() {
  return (
    <section className="bg-[var(--bg-dark)]">
      <div className="container">
        <div className="border-t border-[var(--ink-on-dark)]/8 py-14 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeIn key={s.l} delay={i * 0.08}>
                  <div className="lg:px-8 first:lg:pl-0 last:lg:pr-0 lg:border-r lg:border-[var(--ink-on-dark)]/8 last:lg:border-0">
                    {/* Icon */}
                    <Icon size={20} className="text-[var(--accent-light)] mb-4 opacity-60" strokeWidth={1.5} />
                    {/* Number */}
                    <p className="text-4xl md:text-5xl font-serif font-light text-[var(--accent-light)] leading-none mb-2">
                      <CountUp target={s.v} suffix={s.s} />
                    </p>
                    {/* Label */}
                    <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[var(--ink-on-dark)] mt-3 mb-1">
                      {s.l}
                    </p>
                    {/* Sub */}
                    <p className="text-[0.55rem] text-[var(--ink-on-dark-muted)] tracking-wider">
                      {s.sub}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
