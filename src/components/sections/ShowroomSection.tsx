"use client";

import FadeIn from "@/components/animations/FadeIn";
import MaskReveal from "@/components/animations/MaskReveal";
import SplitHeading from "@/components/animations/SplitHeading";
import { MapPin, Clock } from "lucide-react";
import { showrooms } from "@/data/showrooms";

export default function ShowroomSection() {
  return (
    <section id="showrooms" className="surface-dark section-padding">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <FadeIn>
            <p className="eyebrow text-[var(--accent-light)] mb-5">Showrooms</p>
          </FadeIn>
          <SplitHeading as="h2" className="h2 text-[var(--ink-on-dark)] mb-6">
            Experience in Person
          </SplitHeading>
          <FadeIn delay={0.2}>
            <p className="body-lg text-[var(--ink-on-dark-secondary)] max-w-lg">
              Visit us to see, touch, and feel the full range of Prime Ceramics
              surfaces before you decide.
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {showrooms.map((s, i) => (
            <MaskReveal key={s.name} direction="up" delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] img-zoom mb-5 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-serif text-[var(--ink-on-dark)] mb-3 group-hover:text-[var(--accent-light)] transition-colors">
                  {s.name}
                </h3>
                <div className="space-y-2">
                  <p className="flex items-start gap-2 body-sm text-[var(--ink-on-dark-secondary)]">
                    <MapPin size={14} className="mt-0.5 text-[var(--accent)] shrink-0" />
                    {s.address}
                  </p>
                  <p className="flex items-start gap-2 body-sm text-[var(--ink-on-dark-secondary)]">
                    <Clock size={14} className="mt-0.5 text-[var(--accent)] shrink-0" />
                    {s.hours}
                  </p>
                </div>
              </div>
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
