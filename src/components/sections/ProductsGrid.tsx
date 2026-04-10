"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import TileCard from "@/components/ui/TileCard";
import type { CatalogProduct } from "@/data/catalog";
import type { FilterKey, ProductFilters, SortKey } from "./ProductsBrowser";

const BATCH = 24;

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "size-asc", label: "Size (small→large)" },
  { value: "size-desc", label: "Size (large→small)" },
];

const CHIP_GROUPS: { key: FilterKey; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "collection", label: "Collection" },
  { key: "size", label: "Size" },
  { key: "finish", label: "Finish" },
  { key: "application", label: "Application" },
  { key: "series", label: "Series" },
];

interface Props {
  products: CatalogProduct[];
  filters: ProductFilters;
  activeCount: number;
  onToggle: (key: FilterKey, value: string) => void;
  onClearAll: () => void;
  onSearchChange: (q: string) => void;
  onSortChange: (s: SortKey) => void;
}

export default function ProductsGrid({
  products,
  filters,
  activeCount,
  onToggle,
  onClearAll,
  onSearchChange,
  onSortChange,
}: Props) {
  const [count, setCount] = useState(BATCH);

  // Reset page when filter result set changes
  useEffect(() => {
    setCount(BATCH);
  }, [products.length, filters.sort, filters.search]);

  const visible = products.slice(0, count);
  const hasMore = count < products.length;

  const chips: { key: FilterKey; value: string; label: string }[] = [];
  CHIP_GROUPS.forEach(({ key, label }) => {
    filters[key].forEach((v) => {
      chips.push({
        key,
        value: v,
        label: `${label}: ${key === "size" ? v.replace(" mm", "") : v}`,
      });
    });
  });

  return (
    <div className="flex-1 min-w-0">
      {/* Toolbar — search + sort */}
      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between"
        style={{
          gap: "16px",
          paddingBottom: "20px",
          borderBottom: "1px solid rgba(43,36,28,0.1)",
          marginBottom: "24px",
        }}
      >
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search
            size={14}
            className="absolute top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
            style={{ left: "14px" }}
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tiles..."
            className="w-full text-sm bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2 transition-colors"
            style={{
              padding: "10px 40px 10px 40px",
              border: "1px solid rgba(43,36,28,0.12)",
            }}
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-ink-muted hover:text-ink transition-colors duration-300"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Count + sort */}
        <div className="flex items-center justify-between md:justify-end" style={{ gap: "24px" }}>
          <span className="text-[0.65rem] font-medium tracking-[0.12em] uppercase text-ink-muted tabular-nums whitespace-nowrap">
            {visible.length} / {products.length}
          </span>
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              className="appearance-none pr-6 text-[0.7rem] font-medium tracking-[0.1em] uppercase bg-transparent text-ink-light hover:text-ink focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer transition-colors"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center" style={{ gap: "8px", marginBottom: "28px" }}>
          {chips.map((c) => (
            <button
              key={`${c.key}:${c.value}`}
              type="button"
              onClick={() => onToggle(c.key, c.value)}
              className="inline-flex items-center text-[0.6rem] font-medium tracking-[0.1em] uppercase text-ink hover:border-accent hover:text-accent transition-colors duration-300"
              style={{
                gap: "8px",
                padding: "6px 12px",
                border: "1px solid rgba(43,36,28,0.2)",
              }}
            >
              {c.label}
              <X size={11} />
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ink-muted hover:text-accent transition-colors duration-300"
            style={{ padding: "6px 4px" }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Grid or empty state */}
      {products.length > 0 ? (
        <>
          <div
            className="grid grid-cols-2 md:grid-cols-3"
            style={{
              columnGap: "clamp(20px, 2.5vw, 24px)",
              rowGap: "clamp(32px, 4vw, 40px)",
            }}
          >
            {visible.map((p, i) => (
              <FadeIn key={p.slug} delay={Math.min(i * 0.02, 0.2)} direction="up" distance={12}>
                <TileCard product={p} />
              </FadeIn>
            ))}
          </div>

          {hasMore && (
            <div style={{ marginTop: "64px", textAlign: "center" }}>
              <button
                type="button"
                onClick={() => setCount((c) => c + BATCH)}
                className="btn-line"
              >
                Show More ({products.length - count})
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ padding: "96px 0", textAlign: "center" }}>
          <p className="h3 text-ink-muted" style={{ marginBottom: "16px" }}>
            No tiles found
          </p>
          <p
            className="body-sm"
            style={{
              marginBottom: "32px",
              maxWidth: "320px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Try loosening your filters or searching for a different term.
          </p>
          {activeCount > 0 && (
            <button type="button" onClick={onClearAll} className="link-arrow">
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
