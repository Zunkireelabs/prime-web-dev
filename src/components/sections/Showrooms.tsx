"use client";

import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import { MapPin, ArrowRight } from "lucide-react";
import { locations } from "@/data/showrooms";

export default function Showrooms() {
  return (
    <section id="showrooms" className="bg-[var(--bg-dark)] pt-16 md:pt-24 pb-6">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <FadeIn><p className="eyebrow text-[var(--accent-light)] mb-4 tracking-[0.35em]">Where to Buy</p></FadeIn>
            <SplitHeading as="h2" className="h2 text-[var(--ink-on-dark)]">
              Visit Our Showrooms
            </SplitHeading>
          </div>
          <FadeIn delay={0.1}>
            <a href="/dealers" className="link-arrow text-[var(--ink-on-dark-light)] hover:text-[var(--ink-on-dark)] text-[0.65rem]">
              Find a Store <ArrowRight size={12} />
            </a>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {locations.map((l, i) => (
            <FadeIn key={l.name} delay={i * 0.08}>
              <a href="/dealers" className="block group">
                <div className="aspect-[4/3] img-gs mb-4 relative overflow-hidden">
                  <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                  {/* Hover overlay with pin */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <MapPin size={16} className="text-[var(--accent)]" />
                    </div>
                  </div>
                </div>
                <h3 className="text-base font-serif text-[var(--ink-on-dark)] group-hover:text-[var(--accent-light)] transition-colors duration-300 mb-1">
                  {l.name}
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-[var(--ink-on-dark-muted)] tracking-wider">
                  <MapPin size={10} className="text-[var(--accent)] shrink-0" />
                  {l.city}
                </p>
                <p className="body-sm text-[var(--ink-on-dark-light)] mt-1">{l.address}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
