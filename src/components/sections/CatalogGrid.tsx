"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import CatalogFilter from "./CatalogFilter";
import { allProducts } from "@/data/catalog";
import type { CatalogProduct } from "@/data/catalog";

const BATCH = 24;

function tileHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return 25 + (Math.abs(h) % 25);
}

function TileCard({ product }: { product: CatalogProduct }) {
  const hue = tileHue(product.name);

  return (
    <div className="group">
      {/* Swatch — 4:5, labeled sample */}
      <div className="relative aspect-[4/5] overflow-hidden mb-4">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(155deg, hsl(${hue}, 12%, 89%), hsl(${hue}, 8%, 83%), hsl(${hue}, 5%, 79%))` }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Tile name centered on swatch — labeled sample style */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <p
            className="font-serif font-light text-center leading-tight select-none"
            style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)", color: `hsl(${hue}, 6%, 62%)` }}
          >
            {product.name}
          </p>
        </div>

        {/* Finish badge */}
        <span
          className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[0.45rem] font-medium tracking-[0.12em] uppercase"
          style={{ background: `hsl(${hue}, 6%, 95%)`, color: `hsl(${hue}, 8%, 48%)` }}
        >
          {product.finish}
        </span>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />
      </div>

      {/* Info */}
      <p className="text-[0.5rem] font-medium tracking-[0.18em] uppercase text-[var(--ink-muted)] mb-1">
        {product.size.replace(" mm", "")} / {product.series}
      </p>
      <h3 className="font-serif font-light text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-500 text-[0.95rem] leading-snug">
        {product.name}
      </h3>
    </div>
  );
}

export default function CatalogGrid({ initialSize = "all" }: { initialSize?: string }) {
  const [size, setSize] = useState(initialSize);

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
      <section className="bg-[var(--bg-alt)] pt-[var(--section-gap)]">
        <div className="container">
          <FadeIn>
            <p className="eyebrow text-[var(--accent)] mb-4">All Products</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="h2 mb-6">Explore Every Tile</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body-lg max-w-lg">
              {filtered.length} tiles available. Filter by size, finish, or search by name.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Spacing: description → content = mb-10 md:mb-14 per spacing-rhythm */}
      <div className="bg-[var(--bg-alt)] h-10 md:h-14" aria-hidden="true" />

      {/* Filter */}
      <CatalogFilter
        activeSize={size} activeFinish={finish} searchQuery={search}
        totalShowing={visible.length} totalFiltered={filtered.length}
        seriesList={seriesList} activeSeries={series}
        onSizeChange={onSize} onFinishChange={onFinish}
        onSeriesChange={onSeries} onSearchChange={onSearch}
      />

      {/* Grid — per product-grid-master: 4/3/2 cols, gap-x-5 gap-y-8 min */}
      <section className="bg-[var(--bg-alt)] section-pad">
        <div className="container">
          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 md:gap-x-6 md:gap-y-10">
                {visible.map((p, i) => (
                  <FadeIn key={p.slug} delay={Math.min(i * 0.02, 0.2)} direction="up" distance={12}>
                    <TileCard product={p} />
                  </FadeIn>
                ))}
              </div>

              {/* Load More — per product-grid-master: centered, btn-line, mt-16 */}
              {more && (
                <div className="mt-16 text-center">
                  <button onClick={() => setCount((c) => c + BATCH)} className="btn-line">
                    Show More ({filtered.length - count})
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty state — per product-grid-master */
            <div className="py-24 text-center">
              <p className="h3 text-[var(--ink-muted)] mb-3">No tiles found</p>
              <p className="body-sm mb-8 max-w-xs mx-auto">
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
    </div>
  );
}
