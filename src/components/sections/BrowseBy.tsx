"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import { browseData as data } from "@/data/collections";

const tabs = Object.keys(data) as (keyof typeof data)[];

export default function BrowseBy() {
  const [active, setActive] = useState<keyof typeof data>(tabs[0]);
  const [animKey, setAnimKey] = useState(0);
  const switchTab = (tab: keyof typeof data) => {
    if (tab === active) return;
    setActive(tab);
    setAnimKey((k) => k + 1);
  };

  const items = data[active];

  return (
    <section className="bg-surface" style={{ padding: "clamp(64px, 8vw, 112px) 0" }}>
      <div className="container">
        {/* Header + Pill tabs in one row */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: "24px", marginBottom: "48px" }}>
            <div>
              <p className="eyebrow text-accent" style={{ marginBottom: "16px" }}>Browse Tiles</p>
              <h2 className="h2">Explore By Category</h2>
            </div>

            {/* Pill tabs */}
            <div className="flex flex-wrap" style={{ gap: "16px" }}>
              {tabs.map((tab) => {
                const isActive = tab === active;
                return (
                  <button
                    key={tab}
                    onClick={() => switchTab(tab)}
                    className={`px-5 py-2.5 text-[0.65rem] font-medium tracking-[0.12em] uppercase transition-all duration-500 border ${
                      isActive
                        ? "bg-ink text-surface border-ink shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
                        : "bg-transparent text-ink-muted border-ink-faint"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ─── Marquee tile strip ─── */}
        <div key={animKey} className="group/marquee overflow-hidden" style={{ margin: "0 calc(-1 * var(--spacing-gutter))" }}>
          <div
            className="flex animate-marquee"
            style={{ animationDuration: "35s", width: "max-content" }}
          >
            {[...items, ...items].map((item, i) => (
              <a
                key={`${item.name}-${i}`}
                href={`/catalog?${active.toLowerCase()}=${encodeURIComponent(item.name.toLowerCase())}`}
                className="shrink-0 group block"
                style={{ width: "280px", padding: "0 12px" }}
              >
                <div className="relative overflow-hidden bg-surface-alt transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Accent corner on hover */}
                  <div
                    className="absolute top-0 left-0 w-0 h-0 transition-all duration-500 group-hover:w-8 group-hover:h-8"
                    style={{ background: "linear-gradient(135deg, var(--color-accent) 50%, transparent 50%)" }}
                  />
                </div>
                <div className="flex items-center justify-between" style={{ marginTop: "14px" }}>
                  <div>
                    <p className="text-[0.8rem] text-ink group-hover:text-accent transition-colors duration-300">{item.name}</p>
                    <p className="text-[0.6rem] text-ink-muted tracking-[0.1em] uppercase" style={{ marginTop: "4px" }}>{active}</p>
                  </div>
                  <ArrowRight size={11} className="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-between" style={{ marginTop: "clamp(64px, 8vw, 80px)" }}>
            <div className="h-[1px] flex-1 bg-ink-faint" />
            <a href="/catalog" className="link-arrow text-[0.65rem]" style={{ marginLeft: "24px", marginRight: "24px" }}>
              View Full Catalogue <ArrowRight size={12} />
            </a>
            <div className="h-[1px] flex-1 bg-ink-faint" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
