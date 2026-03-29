"use client";

import FadeIn from "@/components/animations/FadeIn";
import MaskReveal from "@/components/animations/MaskReveal";
import { craftSteps } from "@/data/craft";

export default function ManufacturingCraft() {
  return (
    <section className="bg-[var(--bg)] section-pad">
      <div className="container">
        {/* Pattern B Header — split */}
        <p className="eyebrow text-[var(--accent)] mb-4">The Prime Process</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-6">
          <h2 className="h2 text-[var(--ink)]">
            The Art &amp; Science Behind Every Tile
          </h2>
          <p className="body-lg text-[var(--ink-light)] max-w-md lg:text-right">
            Italian SACMI technology. 1200°C+ precision firing. Every surface
            engineered for permanence.
          </p>
        </div>
        <div className="h-px bg-[var(--ink)]/10 mb-12 md:mb-16" />

        {/* Content — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT — factory image */}
          <MaskReveal direction="up">
            <div className="aspect-[4/3] overflow-hidden img-gs">
              <img
                src="/images/about-factory.jpg"
                alt="Prime Ceramics factory aerial view"
                className="w-full h-full object-cover"
              />
            </div>
          </MaskReveal>

          {/* RIGHT — craft steps */}
          <div>
            {craftSteps.map((step, index) => (
              <FadeIn key={step.num} direction="up" delay={0.1 * index}>
                <div className="flex items-start">
                  <span className="font-serif text-[4rem] md:text-[5rem] leading-none text-[var(--ink)]/[0.06] font-light">
                    {step.num}
                  </span>
                  <div className="ml-6">
                    <h3 className="h3 text-[var(--ink)] mb-2">{step.title}</h3>
                    <p className="body-sm text-[var(--ink-light)] max-w-sm">
                      {step.text}
                    </p>
                  </div>
                </div>
                {index < craftSteps.length - 1 && (
                  <div className="h-px bg-[var(--ink)]/8 my-6" />
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
