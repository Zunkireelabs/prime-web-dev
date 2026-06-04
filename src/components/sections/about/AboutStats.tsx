"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";
import { aboutStats } from "@/data/about";

export default function AboutStats() {
  return (
    <section id="about-stats" className="bg-surface-red relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(253, 224, 219, 0.06) 0%, transparent 70%)" }} />

      <div className="container relative z-10">
        <div className="stat-bar" style={{ borderColor: "rgba(253, 224, 219, 0.12)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {aboutStats.map((stat, i) => (
              <ScrollReveal key={stat.label} from={{ y: 40, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 90%" end="top 50%">
                <div className={`${i > 0 ? "border-l border-ink-on-red/10" : ""} group`} style={{ textAlign: "center", padding: "clamp(48px, 6vw, 80px) 0" }}>
                  <p className="font-serif font-light text-ink-on-red leading-none group-hover:text-white transition-colors duration-300" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", marginBottom: "16px" }}>
                    {stat.prefix && <span className="text-white/80" style={{ fontSize: "55%" }}>{stat.prefix}</span>}
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <div className="w-5 h-px bg-ink-on-red/20 mx-auto" style={{ marginBottom: "16px" }} />
                  <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-ink-on-red/80">{stat.label}</p>
                  <p className="text-[0.55rem] text-ink-on-red-muted" style={{ marginTop: "8px" }}>{stat.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
