"use client";

import FadeIn from "@/components/animations/FadeIn";

export default function CatalogStats() {
  return (
    <section className="bg-[var(--bg-dark)] py-8 md:py-10">
      <div className="container">
        <FadeIn>
          <p className="text-center text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.3em] uppercase text-[var(--ink-on-dark-light)]">
            <span className="text-[var(--accent-light)]">395</span> designs
            <span className="mx-3 text-[var(--ink-on-dark-muted)]">·</span>
            <span className="text-[var(--accent-light)]">5</span> catalogs
            <span className="mx-3 text-[var(--ink-on-dark-muted)]">·</span>
            <span className="text-[var(--accent-light)]">4</span> sizes
            <span className="mx-3 text-[var(--ink-on-dark-muted)]">·</span>
            <span className="text-[var(--accent-light)]">5</span> finishes
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
