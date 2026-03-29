"use client";

import FadeIn from "@/components/animations/FadeIn";
import MaskReveal from "@/components/animations/MaskReveal";
import SplitHeading from "@/components/animations/SplitHeading";

import { craftSteps as steps } from "@/data/craft";

export default function CraftSection() {
  return (
    <section id="craft" className="surface-cream section-padding">
      <div className="container">
        {/* Top: Title + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20 lg:mb-28">
          {/* Title side */}
          <div>
            <FadeIn>
              <p className="eyebrow text-[var(--accent)] mb-6">Craftsmanship</p>
            </FadeIn>
            <SplitHeading as="h2" className="h2 text-[var(--ink-primary)] mb-8">
              The Art Behind Every Tile
            </SplitHeading>
            <FadeIn delay={0.3}>
              <p className="body-lg text-[var(--ink-secondary)] max-w-lg">
                From raw earth to polished surface, every Prime tile passes
                through a meticulous process that blends centuries-old ceramic
                traditions with cutting-edge technology.
              </p>
            </FadeIn>
          </div>

          {/* Image side */}
          <MaskReveal direction="right" delay={0.2}>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/factory.jpg"
                alt="Prime Ceramics kiln process"
                className="w-full h-full object-cover"
              />
            </div>
          </MaskReveal>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[var(--ink-primary)]/8">
          {steps.map((step, i) => (
            <FadeIn
              key={step.num}
              delay={i * 0.1}
              className="py-10 pr-8 border-b lg:border-b-0 lg:border-r border-[var(--ink-primary)]/8 last:border-0"
            >
              <span className="text-5xl font-serif font-light text-[var(--accent)] opacity-30">
                {step.num}
              </span>
              <h3 className="text-lg font-serif text-[var(--ink-primary)] mt-4 mb-3">
                {step.title}
              </h3>
              <p className="body-sm text-[var(--ink-secondary)]">{step.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
