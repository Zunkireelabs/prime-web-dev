"use client";

import { useState, useMemo, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import TileCard from "@/components/ui/TileCard";
import ProductDetailPanel from "./ProductDetailPanel";
import type { CatalogProduct } from "@/data/catalog";
import { allProducts } from "@/data/catalog";

const SERIES_ORDER = ["Thangka Art", "Mithila Art", "Palpali Dhaka", "Flagstone", "Godawari Marble"];

const SERIES_DESCRIPTIONS: Record<string, string> = {
  "Thangka Art": "Sacred Buddhist scroll paintings rendered across 12-tile art panels. Each panel is a 4x3 grid of 300x600mm tiles forming a complete artwork.",
  "Mithila Art": "Ancient folk art from the Mithila region of Nepal, brought to life across 12-tile art panels. Vibrant colours and mythological narratives.",
  "Palpali Dhaka": "The iconic handwoven Dhaka fabric of Palpa district, reimagined as ceramic wall tiles. Available in Light, Dark, and Highlighter variants.",
  "Flagstone": "Natural stone-inspired tiles capturing the rugged beauty of Nepal\u2019s landscapes. Ideal for both walls and floors.",
  "Godawari Marble": "Elegant marble-look floor tiles inspired by Godawari\u2019s natural stone formations.",
};

function ArtPanelCard({
  product,
  onClick,
}: {
  product: CatalogProduct;
  onClick: (p: CatalogProduct) => void;
}) {
  const hasImage = product.image && product.image.startsWith("http");

  return (
    <article
      className="group"
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(product);
        }
      }}
      style={{ cursor: "pointer" }}
    >
      {/* Image — taller to showcase the art */}
      <div
        className="relative overflow-hidden flex items-center justify-center bg-surface-card"
        style={{
          height: "clamp(420px, 38vw, 540px)",
          borderRadius: "4px 4px 0 0",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {hasImage ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-[85%] w-auto object-contain group-hover:scale-[1.03]"
            style={{
              filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.12))",
              transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        ) : (
          <div
            className="flex items-center justify-center"
            style={{
              width: "60%",
              height: "80%",
              background: "linear-gradient(155deg, hsl(35,12%,89%), hsl(35,8%,83%), hsl(35,5%,79%))",
              borderRadius: "4px",
            }}
          >
            <p className="font-serif font-light text-ink-muted text-center px-4" style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}>
              {product.name}
            </p>
          </div>
        )}

        {/* Finish badge */}
        <span
          className="absolute text-[0.45rem] font-medium tracking-[0.12em] uppercase"
          style={{
            top: "12px",
            right: "12px",
            padding: "4px 10px",
            background: "var(--color-surface-card)",
            color: "var(--color-ink-muted)",
            borderRadius: "4px",
          }}
        >
          {product.finish}
        </span>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          style={{
            background: "rgba(15,12,9,0.35)",
            transition: "opacity 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span
            className="text-[0.65rem] font-medium tracking-[0.16em] uppercase"
            style={{
              color: "#fff",
              padding: "10px 24px",
              border: "1px solid rgba(255,255,255,0.5)",
              backdropFilter: "blur(4px)",
              borderRadius: "2px",
            }}
          >
            View Details
          </span>
        </div>

        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />
      </div>

      {/* Art Panel info bar */}
      <div
        className="flex items-center justify-between"
        style={{
          background: "var(--color-ink)",
          padding: "10px 16px",
          borderRadius: "0 0 4px 4px",
        }}
      >
        <span className="text-[0.42rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
          Art Panel — <span style={{ color: "var(--color-accent)" }}>12 Tiles</span> (4x3)
        </span>
        <span className="text-[0.42rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
          Each 300x600mm
        </span>
      </div>

      {/* Meta */}
      <div style={{ marginTop: "12px" }}>
        <p className="text-[0.5rem] font-medium tracking-[0.18em] uppercase text-ink-muted" style={{ marginBottom: "6px" }}>
          {product.series}
        </p>
        <h3 className="font-serif font-light text-ink text-[0.95rem] leading-snug group-hover:text-accent" style={{ transition: "color 0.3s" }}>
          {product.name}
        </h3>
        <p className="text-[0.6rem] tracking-[0.1em] text-ink-muted" style={{ marginTop: "4px" }}>
          {product.category}
        </p>
      </div>
    </article>
  );
}

export default function SpiritOfNepalShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  const spiritProducts = useMemo(
    () => allProducts.filter((p) => p.catalog === "spirit-of-nepal"),
    []
  );

  // Group by series, excluding HL tiles from grid (shown in detail panel)
  const seriesGroups = useMemo(() => {
    const groups: { series: string; products: CatalogProduct[] }[] = [];
    for (const series of SERIES_ORDER) {
      const products = spiritProducts
        .filter((p) => p.series === series && !/\bHL\b/i.test(p.name))
        .sort((a, b) => a.name.localeCompare(b.name));
      if (products.length > 0) {
        groups.push({ series, products });
      }
    }
    return groups;
  }, [spiritProducts]);

  const handleClick = useCallback((product: CatalogProduct) => {
    setSelectedProduct(product);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <>
      <section
        className="bg-surface"
        style={{ paddingTop: "clamp(56px, 6vw, 80px)", paddingBottom: "clamp(80px, 10vw, 140px)" }}
      >
        <div className="container">
          {seriesGroups.map(({ series, products }, gi) => {
            const isArtPanel = products[0]?.application === "Art Panel";
            return (
              <div key={series} style={{ marginBottom: gi < seriesGroups.length - 1 ? "clamp(72px, 8vw, 120px)" : undefined }}>
                {/* Series header */}
                <div style={{ marginBottom: "clamp(32px, 4vw, 48px)" }}>
                  <FadeIn>
                    <div className="flex items-center" style={{ gap: "16px", marginBottom: "12px" }}>
                      <div className="w-10 h-px bg-accent" />
                      <p className="eyebrow text-accent">{series}</p>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.06}>
                    <p className="body-sm text-ink-light max-w-lg" style={{ lineHeight: "1.7" }}>
                      {SERIES_DESCRIPTIONS[series] || ""}
                    </p>
                  </FadeIn>
                </div>

                {/* Product grid */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ gap: "clamp(24px, 3vw, 32px)" }}
                >
                  {products.map((product, i) => (
                    <FadeIn key={product.slug} delay={i * 0.06} direction="up" distance={20}>
                      {isArtPanel ? (
                        <ArtPanelCard product={product} onClick={handleClick} />
                      ) : (
                        <TileCard product={product} onClick={handleClick} />
                      )}
                    </FadeIn>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ProductDetailPanel
        product={selectedProduct}
        onClose={handleClose}
        onProductChange={setSelectedProduct}
      />
    </>
  );
}
