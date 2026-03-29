"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import { browseData as data } from "@/data/collections";

const tabs = Object.keys(data) as (keyof typeof data)[];

export default function BrowseBy() {
  const [active, setActive] = useState<keyof typeof data>(tabs[0]);
  const [animKey, setAnimKey] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const switchTab = (tab: keyof typeof data) => {
    if (tab === active) return;
    setActive(tab);
    setAnimKey((k) => k + 1);
    setHoveredIdx(null);
  };

  const items = data[active];
  const featured = hoveredIdx !== null ? items[hoveredIdx] : items[0];

  return (
    <section className="bg-[var(--bg)] section-pad">
      <div className="container">
        {/* Header + Pill tabs in one row */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p className="eyebrow text-[var(--accent)] mb-4">Browse Tiles</p>
              <h2 className="h2">Explore By Category</h2>
            </div>

            {/* Pill tabs */}
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => {
                const isActive = tab === active;
                return (
                  <button
                    key={tab}
                    onClick={() => switchTab(tab)}
                    className="px-5 py-2.5 text-[0.65rem] font-medium tracking-[0.12em] uppercase transition-all duration-500"
                    style={{
                      background: isActive ? "var(--ink)" : "transparent",
                      color: isActive ? "var(--bg)" : "var(--ink-muted)",
                      border: isActive ? "1px solid var(--ink)" : "1px solid var(--ink-faint)",
                      boxShadow: isActive ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ─── Desktop: Featured + Grid layout ─── */}
        <div key={animKey} className="hidden lg:grid lg:grid-cols-12 gap-5">
          {/* LEFT — Featured large tile (5 cols) */}
          <div className="col-span-5 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]">
            <div className="relative h-full min-h-[480px] overflow-hidden bg-[var(--bg-alt)] group">
              <img
                src={featured.image}
                alt={featured.name}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                key={featured.name}
                style={{ animation: "fadeSlideUp 0.4s ease forwards" }}
              />
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-[0.5rem] font-medium tracking-[0.3em] uppercase text-[var(--accent-light)] mb-2">
                  {active}
                </p>
                <h3
                  className="font-serif font-light text-white leading-[1.1] mb-3"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                >
                  {featured.name}
                </h3>
                <a href={`/catalog?${active.toLowerCase()}=${encodeURIComponent(featured.name.toLowerCase())}`} className="link-arrow text-white/70 hover:text-white text-[0.6rem]">
                  View Collection <ArrowRight size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Small tile grid (7 cols) */}
          <div className="col-span-7 grid grid-cols-3 gap-4 auto-rows-min">
            {items.map((item, i) => (
              <div
                key={item.name}
                className="opacity-0 animate-[fadeSlideUp_0.4s_ease_forwards]"
                style={{ animationDelay: `${(i + 1) * 50}ms` }}
              >
                <a
                  href={`/catalog?${active.toLowerCase()}=${encodeURIComponent(item.name.toLowerCase())}`}
                  className="block group"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className="relative overflow-hidden bg-[var(--bg-alt)] transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                    style={{ aspectRatio: i < 3 ? "1" : "4/3" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[0.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    {/* Accent corner on hover */}
                    <div
                      className="absolute top-0 left-0 w-0 h-0 transition-all duration-500 group-hover:w-8 group-hover:h-8"
                      style={{
                        background: "linear-gradient(135deg, var(--accent) 50%, transparent 50%)",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2.5">
                    <p className="text-[0.8rem] text-[var(--ink-light)] group-hover:text-[var(--ink)] transition-colors duration-300">
                      {item.name}
                    </p>
                    <ArrowRight
                      size={11}
                      className="text-[var(--accent)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Mobile: Simple grid ─── */}
        <div key={`m-${animKey}`} className="lg:hidden grid grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="opacity-0 animate-[fadeSlideUp_0.4s_ease_forwards]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <a href={`/catalog?${active.toLowerCase()}=${encodeURIComponent(item.name.toLowerCase())}`} className="block group">
                <div className="relative aspect-square overflow-hidden bg-[var(--bg-alt)]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <p className="text-[0.8rem] text-[var(--ink-light)] mt-2.5">
                  {item.name}
                </p>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <FadeIn delay={0.2}>
          <div className="mt-12 md:mt-14 flex items-center justify-between">
            <div className="h-[1px] flex-1 bg-[var(--ink-faint)]" />
            <a href="/catalog" className="link-arrow text-[0.65rem] mx-6">
              View Full Catalogue <ArrowRight size={12} />
            </a>
            <div className="h-[1px] flex-1 bg-[var(--ink-faint)]" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
