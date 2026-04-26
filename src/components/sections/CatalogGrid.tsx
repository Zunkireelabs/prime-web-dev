"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import CatalogFilter from "./CatalogFilter";
import ProductDetailPanel from "./ProductDetailPanel";
import { allProducts } from "@/data/catalog";
import type { CatalogProduct } from "@/data/catalog";
import { tileAspectRatio, tileGridColSpan } from "@/lib/utils";

const BATCH = 24;

function tileHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return 25 + (Math.abs(h) % 25);
}

function TileCard({ product, onClick }: { product: CatalogProduct; onClick?: (p: CatalogProduct) => void }) {
  const hue = tileHue(product.name);

  return (
    <article
      className="group"
      onClick={() => onClick?.(product)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick(product);
        }
      }}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Swatch — proportional to real tile dimensions */}
      <div className="relative overflow-hidden" style={{ aspectRatio: tileAspectRatio(product.size), marginBottom: "16px" }}>
        {product.image && product.image.startsWith("http") ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(155deg, hsl(${hue}, 12%, 89%), hsl(${hue}, 8%, 83%), hsl(${hue}, 5%, 79%))` }}
            >
              <div
                className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <p
                className="font-serif font-light text-center leading-tight select-none"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)", color: `hsl(${hue}, 6%, 62%)` }}
              >
                {product.name}
              </p>
            </div>
          </>
        )}

        {/* Finish badge */}
        <span
          className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[0.45rem] font-medium tracking-[0.12em] uppercase"
          style={{ background: `hsl(${hue}, 6%, 95%)`, color: `hsl(${hue}, 8%, 48%)` }}
        >
          {product.finish}
        </span>

        {/* View Details hover overlay */}
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

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />
      </div>

      {/* Info */}
      <p className="text-[0.5rem] font-medium tracking-[0.18em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
        {product.size.replace(" mm", "")} / {product.series}
      </p>
      <h3 className="font-serif font-light text-ink group-hover:text-accent transition-colors duration-500 text-[0.95rem] leading-snug">
        {product.name}
      </h3>
    </article>
  );
}

export default function CatalogGrid({ initialSize = "all" }: { initialSize?: string }) {
  const [size, setSize] = useState(initialSize);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  useEffect(() => {
    setSize(initialSize);
    setSeries("all");
    setFinish("all");
    setSearch("");
    setCount(BATCH);
  }, [initialSize]);
  const [finish, setFinish] = useState("all");
  const [series, setSeries] = useState("all");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(BATCH);

  const filtered = useMemo(() => {
    let r = allProducts;
    if (size === "spirit") r = r.filter((p) => p.catalog === "spirit-of-nepal");
    else if (size !== "all") r = r.filter((p) => p.size === size);
    if (finish !== "all") r = r.filter((p) => p.finish === finish);
    if (series !== "all") r = r.filter((p) => p.series === series);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter((p) => p.name.toLowerCase().includes(q) || p.series.toLowerCase().includes(q) || (p.collection?.toLowerCase().includes(q)));
    }
    return r;
  }, [size, finish, series, search]);

  const seriesList = useMemo(() => {
    let pool = allProducts;
    if (size === "spirit") pool = pool.filter((p) => p.catalog === "spirit-of-nepal");
    else if (size !== "all") pool = pool.filter((p) => p.size === size);
    return [...new Set(pool.map((p) => p.series))].sort();
  }, [size]);

  const visible = filtered.slice(0, count);
  const more = count < filtered.length;

  const onSize = useCallback((s: string) => { setSize(s); setSeries("all"); setCount(BATCH); }, []);
  const onFinish = useCallback((f: string) => { setFinish(f); setCount(BATCH); }, []);
  const onSeries = useCallback((s: string) => { setSeries(s); setCount(BATCH); }, []);
  const onSearch = useCallback((q: string) => { setSearch(q); setCount(BATCH); }, []);

  return (
    <div id="explorer">
      {/* Section header — per section-composer: eyebrow→heading→description */}
      <section className="bg-surface-alt" style={{ paddingTop: "clamp(80px, 10vw, 140px)" }}>
        <div className="container">
          <FadeIn>
            <p className="eyebrow text-accent" style={{ marginBottom: "16px" }}>All Products</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="h2" style={{ marginBottom: "24px" }}>Explore Every Tile</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body-lg max-w-lg">
              {filtered.length} tiles available. Filter by size, finish, or search by name.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Spacing: description → content = mb-10 md:mb-14 per spacing-rhythm */}
      <div className="bg-surface-alt" style={{ height: "clamp(40px, 5vw, 56px)" }} aria-hidden="true" />

      {/* Filter */}
      <CatalogFilter
        activeSize={size} activeFinish={finish} searchQuery={search}
        totalShowing={visible.length} totalFiltered={filtered.length}
        seriesList={seriesList} activeSeries={series}
        onSizeChange={onSize} onFinishChange={onFinish}
        onSeriesChange={onSeries} onSearchChange={onSearch}
      />

      {/* Grid — per product-grid-master: 4/3/2 cols, gap-x-5 gap-y-8 min */}
      <section className="bg-surface-alt" style={{ padding: "clamp(48px, 6vw, 80px) 0 clamp(100px, 12vw, 180px)" }}>
        <div className="container">
          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ columnGap: "clamp(20px, 3vw, 24px)", rowGap: "clamp(32px, 4vw, 40px)" }}>
                {visible.map((p, i) => {
                  const colSpan = tileGridColSpan(p.size);
                  return (
                    <div
                      key={p.slug}
                      style={colSpan === 2 ? { gridColumn: "span 2" } : undefined}
                    >
                      <FadeIn
                        delay={Math.min(i * 0.02, 0.2)}
                        direction="up"
                        distance={12}
                      >
                        <TileCard product={p} onClick={setSelectedProduct} />
                      </FadeIn>
                    </div>
                  );
                })}
              </div>

              {/* Load More — per product-grid-master: centered, btn-line, mt-16 */}
              {more && (
                <div style={{ marginTop: "64px", textAlign: "center" }}>
                  <button onClick={() => setCount((c) => c + BATCH)} className="btn-line">
                    Show More ({filtered.length - count})
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty state — per product-grid-master */
            <div style={{ padding: "96px 0", textAlign: "center" }}>
              <p className="h3 text-ink-muted" style={{ marginBottom: "16px" }}>No tiles found</p>
              <p className="body-sm" style={{ marginBottom: "32px", maxWidth: "280px", marginLeft: "auto", marginRight: "auto" }}>
                Adjust your filters or search to discover more surfaces.
              </p>
              <button
                onClick={() => { setSize("all"); setFinish("all"); setSeries("all"); setSearch(""); setCount(BATCH); }}
                className="link-arrow"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <ProductDetailPanel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onProductChange={setSelectedProduct}
      />
    </div>
  );
}
