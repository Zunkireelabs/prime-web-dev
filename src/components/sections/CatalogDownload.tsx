"use client";

import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import { Download, FileText } from "lucide-react";
import { catalogEntries } from "@/data/catalogs";

export default function CatalogDownload() {
  return (
    <section className="bg-[var(--bg-alt)] section-pad">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <FadeIn>
            <p className="eyebrow text-[var(--accent)] mb-4">Downloads</p>
          </FadeIn>
          <SplitHeading as="h2" className="h2 mb-6">
            Download Our Catalogs
          </SplitHeading>
          <FadeIn delay={0.15}>
            <p className="body-lg max-w-lg mx-auto">
              Get the complete product catalog with detailed specifications,
              room scenes, and design inspiration.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {catalogEntries.map((cat, i) => {
            const isComingSoon = !cat.pdf;

            return (
              <FadeIn key={cat.name} delay={0.1 + i * 0.06} direction="up" distance={20}>
                {isComingSoon ? (
                  <div className="group block p-6 md:p-8 bg-[var(--bg)] border border-[var(--ink-faint)]/30 opacity-70 h-full">
                    <div className="flex items-start justify-between mb-5">
                      <FileText
                        size={24}
                        strokeWidth={1}
                        className="text-[var(--accent)] opacity-40"
                      />
                      <span className="text-[0.5rem] tracking-[0.15em] uppercase text-[var(--ink-muted)] bg-[var(--bg-alt)] px-2 py-0.5">
                        Soon
                      </span>
                    </div>

                    <h3 className="font-serif font-light text-[var(--ink)] text-lg mb-1">
                      {cat.name}
                    </h3>

                    <p className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
                      {cat.size}
                      <span className="mx-2 text-[var(--ink-faint)]">|</span>
                      {cat.count}
                    </p>

                    <p className="body-sm">{cat.description}</p>
                  </div>
                ) : (
                  <a
                    href={cat.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 md:p-8 bg-[var(--bg)] border border-[var(--ink-faint)]/30 hover:border-[var(--accent)]/30 transition-all duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <FileText
                        size={24}
                        strokeWidth={1}
                        className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <Download
                        size={16}
                        className="text-[var(--ink-muted)] group-hover:text-[var(--accent)] transition-colors duration-300"
                      />
                    </div>

                    <h3 className="font-serif font-light text-[var(--ink)] text-lg mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
                      {cat.name}
                    </h3>

                    <p className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
                      {cat.size}
                      <span className="mx-2 text-[var(--ink-faint)]">|</span>
                      {cat.count}
                    </p>

                    <p className="body-sm">{cat.description}</p>
                  </a>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
