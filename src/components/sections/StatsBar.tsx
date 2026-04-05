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
    <section className="bg-surface-red relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(253, 224, 219, 0.06) 0%, transparent 70%)" }}
      />

      <div className="container relative z-10">
        <div className="border-t border-ink-on-red/10" style={{ padding: "clamp(28px, 3vw, 40px) 0" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeIn key={s.l} delay={i * 0.08}>
                  <div className="lg:px-6 first:lg:pl-0 last:lg:pr-0 lg:border-r lg:border-ink-on-red/10 last:lg:border-0 group">
                    {/* Icon with circle bg */}
                    <div className="w-8 h-8 rounded-full border border-ink-on-red/15 bg-ink-on-red/[0.06] flex items-center justify-center group-hover:border-ink-on-red/30 group-hover:bg-ink-on-red/[0.1] transition-all duration-500" style={{ marginBottom: "10px" }}>
                      <Icon size={15} className="text-ink-on-red" strokeWidth={1.5} />
                    </div>
                    {/* Number */}
                    <p className="text-2xl md:text-3xl font-serif font-light text-ink-on-red leading-none group-hover:text-white transition-colors duration-500" style={{ marginBottom: "8px" }}>
                      <CountUp target={s.v} suffix={s.s} />
                    </p>
                    {/* Divider */}
                    <div className="w-5 h-[1px] bg-ink-on-red/20 group-hover:w-8 transition-all duration-500" style={{ marginBottom: "8px" }} />
                    {/* Label */}
                    <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-ink-on-red/80" style={{ marginBottom: "2px" }}>
                      {s.l}
                    </p>
                    {/* Sub */}
                    <p className="text-[0.55rem] text-ink-on-red-muted tracking-wider">
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
