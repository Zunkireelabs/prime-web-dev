"use client";

import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import CountUp from "@/components/animations/CountUp";
import { MapPin, ArrowRight, Globe, Users } from "lucide-react";
import { dealers, dealerProvinces } from "@/data/dealers";

const provinceCount = dealerProvinces.filter((p) => p !== "All").length;

export default function DealerNetwork() {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--bg-dark)", color: "var(--ink-on-dark)" }}
    >
      <div className="container">

        {/* ── Header ── */}
        <div className="text-center mb-16 md:mb-20">
          <FadeIn>
            <p className="eyebrow text-[var(--accent-light)] mb-4">
              Dealer Network
            </p>
          </FadeIn>
          <SplitHeading as="h2" className="h1 text-white mb-6">
            Find a Dealer Near You
          </SplitHeading>
          <FadeIn delay={0.2}>
            <p className="body-lg text-white/50 max-w-xl mx-auto">
              Our authorized dealers bring Prime Ceramics to every corner
              of Nepal — {provinceCount} provinces, one standard of excellence.
            </p>
          </FadeIn>
        </div>

        {/* ── Stats Strip ── */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 border-y border-white/10 py-10 md:py-12 mb-16 md:mb-20">
            {[
              { value: dealers.length, suffix: "+", label: "Authorized Dealers", icon: Users },
              { value: provinceCount, suffix: "", label: "Provinces Covered", icon: Globe },
              { value: dealers.length, suffix: "+", label: "Cities & Towns", icon: MapPin },
              { value: 100, suffix: "%", label: "Nationwide Reach", icon: ArrowRight },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`text-center md:px-8 ${
                    i < 3 ? "md:border-r md:border-white/10" : ""
                  }`}
                >
                  <Icon
                    size={20}
                    className="text-[var(--accent)] mx-auto mb-4"
                    strokeWidth={1.5}
                  />
                  <p className="text-3xl md:text-4xl font-serif font-light text-white leading-none mb-2">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-white/40">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* ── Province Grid ── */}
        <FadeIn delay={0.4}>
          <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-white/30 mb-6 text-center">
            Browse by Province
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 md:mb-20">
          {dealerProvinces
            .filter((p) => p !== "All")
            .map((province, i) => {
              const count = dealers.filter(
                (d) => d.province === province
              ).length;
              return (
                <FadeIn key={province} delay={0.4 + i * 0.06} direction="up" distance={20}>
                  <a
                    href={`/dealers?province=${province}`}
                    className="group block p-6 md:p-8 border border-white/8 hover:border-[var(--accent)]/40 hover:bg-white/[0.03] transition-all duration-500 text-center"
                  >
                    <MapPin
                      size={22}
                      className="text-[var(--accent)] mx-auto mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-[1rem] md:text-[1.1rem] font-serif font-light text-white group-hover:text-[var(--accent-light)] transition-colors duration-300 mb-2">
                      {province}
                    </h3>
                    <p className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-white/35 group-hover:text-white/60 transition-colors duration-300">
                      {count} Dealers
                    </p>
                  </a>
                </FadeIn>
              );
            })}
        </div>

        {/* ── CTA ── */}
        <FadeIn delay={0.7}>
          <div className="text-center">
            <a
              href="/dealers"
              className="inline-flex items-center gap-3 px-10 py-4 text-[0.7rem] font-medium tracking-[0.2em] uppercase bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all duration-500 hover:shadow-[0_4px_20px_rgba(139,101,66,0.3)]"
            >
              View All Dealers <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
