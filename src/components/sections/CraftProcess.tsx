"use client";

import FadeIn from "@/components/animations/FadeIn";
import MaskReveal from "@/components/animations/MaskReveal";
import SplitHeading from "@/components/animations/SplitHeading";

import { craftSteps } from "@/data/craft";

const steps = craftSteps.map((s) => ({ n: s.num, title: s.title, text: s.text }));

export default function CraftProcess() {
  return (
    <section id="craft" className="section-pad">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 mb-16">
          <div>
            <FadeIn><p className="eyebrow text-[var(--accent)] mb-4 tracking-[0.35em]">Craftsmanship</p></FadeIn>
            <SplitHeading as="h2" className="h2 mb-6">The Art Behind Every Tile</SplitHeading>
            <FadeIn delay={0.2}>
              <p className="body-lg max-w-md">
                From raw earth to polished surface — a meticulous process blending
                centuries-old ceramic tradition with cutting-edge technology.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="accent-line mt-8" />
            </FadeIn>
          </div>
          <MaskReveal direction="right" delay={0.15}>
            <div className="aspect-[4/3] overflow-hidden bg-[var(--bg-alt)]">
              <img src="/images/factory.jpg" alt="Kiln process" className="w-full h-full object-cover" />
            </div>
          </MaskReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-[var(--ink-faint)]">
          {steps.map((s, i) => (
            <FadeIn
              key={s.n}
              delay={i * 0.08}
              className="group py-8 md:py-10 pr-8 border-b md:border-b-0 md:border-r border-[var(--ink-faint)] last:border-0 cursor-default"
            >
              <span className="text-4xl font-serif font-light text-[var(--accent)] opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                {s.n}
              </span>
              <h3 className="text-base font-serif mt-4 mb-2 text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="body-sm">{s.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
