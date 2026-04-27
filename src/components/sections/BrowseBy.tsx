"use client";

import { useState, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import { tileCardHeight, tileImageFrameStyle } from "@/lib/utils";
import { browseData as data } from "@/data/collections";
import { allProducts } from "@/data/catalog";
import type { CatalogProduct } from "@/data/catalog";
import ProductDetailPanel from "@/components/sections/ProductDetailPanel";

const tabs = Object.keys(data) as (keyof typeof data)[];

export default function BrowseBy() {
  const [active, setActive] = useState<keyof typeof data>(tabs[0]);
  const [animKey, setAnimKey] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  const switchTab = (tab: keyof typeof data) => {
    if (tab === active) return;
    setActive(tab);
    setAnimKey((k) => k + 1);
  };

  const handleTileClick = useCallback((slug: string) => {
    const product = allProducts.find((p) => p.slug === slug);
    if (product) setSelectedProduct(product);
  }, []);

  const items = data[active];

  return (
    <section className="bg-surface" style={{ padding: "clamp(64px, 8vw, 112px) 0" }}>
      <div className="container">
        {/* Header + Pill tabs in one row */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between" style={{ gap: "24px", marginBottom: "48px" }}>
            <div>
              <p className="eyebrow text-accent" style={{ marginBottom: "16px" }}>Browse Tiles</p>
              <h2 className="h2">Explore By Category</h2>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap" style={{ gap: "8px" }}>
              {tabs.map((tab) => {
                const isActive = tab === active;
                return (
                  <button
                    key={tab}
                    onClick={() => switchTab(tab)}
                    style={{
                      padding: "8px 18px",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      borderRadius: "100px",
                      border: "1px solid",
                      borderColor: isActive ? "var(--color-accent)" : "rgba(61, 58, 54, 0.15)",
                      background: isActive ? "var(--color-accent)" : "transparent",
                      color: isActive ? "#fff" : "var(--color-ink-light)",
                      transition: "all 0.3s linear",
                      cursor: "pointer",
                    }}
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
            {[...items, ...items].map((item, i) => {
              const product = allProducts.find((pr) => pr.slug === item.slug);
              const tileSize = product?.size ?? "300×450 mm";
              return (
              <button
                key={`${item.name}-${i}`}
                type="button"
                onClick={() => handleTileClick(item.slug)}
                className="shrink-0 group block text-left cursor-pointer"
                style={{ width: "clamp(200px, 55vw, 280px)", padding: "0 8px", background: "none", border: "none" }}
              >
                <div className="relative overflow-hidden bg-surface-card flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]" style={{ height: tileCardHeight() }}>
                  <div style={tileImageFrameStyle(tileSize)}>
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
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
              </button>
              );
            })}
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

      {/* Product detail modal */}
      <ProductDetailPanel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onProductChange={setSelectedProduct}
      />
    </section>
  );
}
