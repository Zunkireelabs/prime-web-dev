"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import StaggerGrid from "@/components/animations/StaggerGrid";
import TileCard from "@/components/ui/TileCard";
import Pagination from "@/components/ui/Pagination";
import ProductDetailPanel from "./ProductDetailPanel";
import type { CatalogProduct } from "@/data/catalog";
import type { FilterKey, ProductFilters, SortKey } from "./ProductsBrowser";

const BATCH = 24;
const SEARCH_DEBOUNCE_MS = 200;

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name-asc", label: "Name A\u2013Z" },
  { value: "name-desc", label: "Name Z\u2013A" },
  { value: "size-asc", label: "Size (small\u2192large)" },
  { value: "size-desc", label: "Size (large\u2192small)" },
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
  onPageChange: (page: number) => void;
}

export default function ProductsGrid({
  products,
  filters,
  activeCount,
  onToggle,
  onClearAll,
  onSearchChange,
  onSortChange,
  onPageChange,
}: Props) {
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [searchInput, setSearchInput] = useState(filters.search);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isFirstPageRender = useRef(true);

  // Sync external resets (clearAll, chip removal) into the local input
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  // Debounce input → upstream filter
  useEffect(() => {
    if (searchInput === filters.search) return;
    const id = setTimeout(() => onSearchChange(searchInput), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [searchInput, filters.search, onSearchChange]);

  const totalPages = Math.max(1, Math.ceil(products.length / BATCH));
  const safePage = Math.min(Math.max(1, filters.page), totalPages);
  const sliceStart = (safePage - 1) * BATCH;
  const sliceEnd = Math.min(sliceStart + BATCH, products.length);
  const visible = products.slice(sliceStart, sliceEnd);
  const rangeStart = products.length === 0 ? 0 : sliceStart + 1;
  const rangeEnd = sliceEnd;

  // Smooth-scroll back to the toolbar on page change (skip initial mount)
  useEffect(() => {
    if (isFirstPageRender.current) {
      isFirstPageRender.current = false;
      return;
    }
    toolbarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [filters.page]);

  const chips = useMemo(() => {
    const out: { key: FilterKey; value: string; label: string }[] = [];
    CHIP_GROUPS.forEach(({ key, label }) => {
      // Size is sidebar-controlled (single-select, always active) — no chips
      if (key === "size") return;
      filters[key].forEach((v) => {
        out.push({
          key,
          value: v,
          label: `${label}: ${v}`,
        });
      });
    });
    return out;
  }, [filters]);

  // Grid columns based on physical tile WIDTH so proportions are exact:
  // 300mm-wide tiles → 6 cols, 600mm-wide → 3 cols (cards are exactly 2× wider)
  // 400mm-wide → 4 cols (close to 4/3 ratio vs 300mm)
  // Aspect ratio on the card handles the height proportions.
  const gridCols = useMemo(() => {
    const size = filters.size[0] || "600\u00d71200 mm";
    switch (size) {
      // 300mm width tiles — 6 cols (smallest cards)
      case "300\u00d7300 mm":
      case "300\u00d7450 mm":
      case "300\u00d7600 mm":
        return "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6";
      // 400mm width tiles — 4 cols
      case "400\u00d7400 mm":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4";
      // 600mm width tiles — 3 cols (largest cards, exactly 2× the 300mm cards)
      case "600\u00d7600 mm":
      case "600\u00d71200 mm":
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  }, [filters.size]);

  const handleCardClick = useCallback((product: CatalogProduct) => {
    setSelectedProduct(product);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    onSearchChange("");
  }, [onSearchChange]);

  const staggerKey = useMemo(
    () => `${products.length}-${filters.sort}-${filters.search}`,
    [products.length, filters.sort, filters.search]
  );

  return (
    <div className="flex-1 min-w-0" style={{ background: "#fff", padding: "clamp(24px, 3vw, 40px)", borderRadius: "4px" }}>
      {/* Toolbar — search + sort */}
      <div
        ref={toolbarRef}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
        style={{
          gap: "16px",
          paddingBottom: "24px",
          borderBottom: "1px solid rgba(43,36,28,0.06)",
          marginBottom: "28px",
          scrollMarginTop: "120px",
        }}
      >
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search
            size={14}
            className="absolute top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
            style={{ left: "16px" }}
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search tiles..."
            className="w-full text-sm text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
            style={{
              padding: "12px 40px 12px 42px",
              border: "1px solid rgba(43,36,28,0.1)",
              borderRadius: "28px",
              background: "var(--color-surface-card)",
              transition: "border-color 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-ink-muted hover:text-ink"
              style={{ transition: "color 0.3s" }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Count + sort */}
        <div className="flex items-center justify-between md:justify-end" style={{ gap: "20px" }}>
          <span className="text-[0.6rem] font-medium tracking-[0.14em] uppercase text-ink-muted tabular-nums whitespace-nowrap">
            {products.length === 0
              ? "0 of 0"
              : `${rangeStart}\u2013${rangeEnd} of ${products.length}`}
          </span>
          <div
            className="relative"
            style={{
              background: "var(--color-surface-card)",
              borderRadius: "20px",
              padding: "8px 16px",
            }}
          >
            <select
              value={filters.sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              className="appearance-none pr-5 text-[0.65rem] font-medium tracking-[0.1em] uppercase bg-transparent text-ink-light hover:text-ink focus:outline-none cursor-pointer"
              style={{ transition: "color 0.3s" }}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
            <ChevronDown size={11} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center" style={{ gap: "8px", marginBottom: "32px" }}>
          {chips.map((c) => (
            <button
              key={`${c.key}:${c.value}`}
              type="button"
              onClick={() => onToggle(c.key, c.value)}
              className="inline-flex items-center text-[0.55rem] font-medium tracking-[0.12em] uppercase text-ink hover:text-accent"
              style={{
                gap: "8px",
                padding: "7px 14px",
                border: "1px solid rgba(43,36,28,0.15)",
                borderRadius: "20px",
                transition: "color 0.3s, border-color 0.3s",
              }}
            >
              {c.label}
              <X size={10} />
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted hover:text-accent"
            style={{ padding: "7px 6px", transition: "color 0.3s" }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Grid */}
      {products.length > 0 ? (
        <>
          <StaggerGrid
            key={staggerKey}
            keys={visible.map((p) => p.slug)}
            className={`grid items-start ${gridCols}`}
            style={{
              columnGap: "clamp(20px, 2.5vw, 28px)",
              rowGap: "clamp(32px, 4vw, 48px)",
            }}
          >
            {visible.map((p) => (
              <div key={p.slug}>
                <TileCard product={p} onClick={handleCardClick} />
              </div>
            ))}
          </StaggerGrid>

          {totalPages > 1 && (
            <div style={{ marginTop: "72px" }}>
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div style={{ padding: "clamp(80px, 12vw, 160px) 0", textAlign: "center" }}>
          <p className="font-serif font-light text-ink-muted" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", marginBottom: "16px" }}>
            No tiles match your filters
          </p>
          <p className="text-sm text-ink-light" style={{ marginBottom: "32px", maxWidth: "340px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            Try loosening your filters or searching for a different term.
          </p>
          {activeCount > 0 && (
            <button type="button" onClick={onClearAll} className="link-arrow">
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Detail panel */}
      <ProductDetailPanel
        product={selectedProduct}
        onClose={handleClosePanel}
        onProductChange={setSelectedProduct}
      />
    </div>
  );
}
