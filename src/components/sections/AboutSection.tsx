"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ParallaxImage from "@/components/animations/ParallaxImage";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-[var(--bg-warm)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <ScrollReveal>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
                Our Story
              </p>
            </ScrollReveal>

            <TextReveal
              as="h2"
              className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)] mb-6"
            >
              About Prime
            </TextReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                A story of dedication and excellence. Our journey began with a
                simple vision — to create something truly remarkable that stands
                the test of time.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Every detail is carefully considered, every experience
                thoughtfully crafted. We believe in the power of quality and the
                beauty of simplicity.
              </p>
            </ScrollReveal>
          </div>

          {/* Image */}
          <ScrollReveal direction="right">
            <ParallaxImage
              src="/images/about-1.jpg"
              alt="About Prime"
              className="aspect-[4/5] rounded-sm"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
