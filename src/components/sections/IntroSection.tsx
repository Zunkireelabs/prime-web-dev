"use client";

import SplitHeading from "@/components/animations/SplitHeading";
import FadeIn from "@/components/animations/FadeIn";

export default function IntroSection() {
  return (
    <section className="surface-light section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — Large editorial statement */}
          <div className="lg:col-span-8">
            <FadeIn>
              <p className="eyebrow text-[var(--accent)] mb-8">
                About Prime Ceramics
              </p>
            </FadeIn>

            <SplitHeading as="h2" className="h1 text-[var(--ink-primary)] mb-0">
              We believe every surface is a canvas — every tile a story of earth, fire, and human craft.
            </SplitHeading>
          </div>

          {/* Right — Supporting text */}
          <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-end">
            <FadeIn delay={0.3}>
              <div className="divider-accent mb-8" />
              <p className="body-lg text-[var(--ink-secondary)]">
                For over a decade, Prime Ceramics has been the choice of
                architects, designers, and homeowners who refuse to compromise.
                Our collections span porcelain, ceramic, natural stone, and
                large-format surfaces — all fired to perfection.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
