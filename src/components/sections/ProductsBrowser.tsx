"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { allProducts } from "@/data/catalog";
import ProductsFilterSidebar from "./ProductsFilterSidebar";
import ProductsGrid from "./ProductsGrid";

export type SortKey = "name-asc" | "name-desc" | "size-asc" | "size-desc";

export interface ProductFilters {
  category: string[];
  collection: string[];
  size: string[];
  finish: string[];
  application: string[];
  series: string[];
  search: string;
  sort: SortKey;
  page: number;
}

export type FilterKey = Exclude<keyof ProductFilters, "search" | "sort" | "page">;

const DEFAULT_SIZE = "600×1200 mm";

const EMPTY_FILTERS: ProductFilters = {
  category: [],
  collection: [],
  size: [DEFAULT_SIZE],
  finish: [],
  application: [],
  series: [],
  search: "",
  sort: "name-asc",
  page: 1,
};

const MULTI_KEYS: FilterKey[] = ["category", "collection", "size", "finish", "application", "series"];

function parseMulti(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

function isSortKey(v: string | null): v is SortKey {
  return v === "name-asc" || v === "name-desc" || v === "size-asc" || v === "size-desc";
}

function parsePage(value: string | null): number {
  if (!value) return 1;
  const n = parseInt(value, 10);
  return Number.isNaN(n) || n < 1 ? 1 : n;
}

function sizeToNumber(size: string): number {
  const match = size.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function ProductsBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── Hydrate filters from URL on mount / URL change ──
  const initial = useMemo<ProductFilters>(() => {
    const sort = searchParams.get("sort");
    const sizeParam = parseMulti(searchParams.get("size"));
    return {
      category: parseMulti(searchParams.get("category")),
      collection: parseMulti(searchParams.get("collection")),
      // Default to 600×1200 mm if no size specified
      size: sizeParam.length > 0 ? sizeParam : ["600×1200 mm"],
      finish: parseMulti(searchParams.get("finish")),
      application: parseMulti(searchParams.get("application")),
      series: parseMulti(searchParams.get("series")),
      search: searchParams.get("search") ?? "",
      sort: isSortKey(sort) ? sort : "name-asc",
      page: parsePage(searchParams.get("page")),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filters, setFilters] = useState<ProductFilters>(initial);

  // ── Sync filters → URL (replace, no history spam) ──
  useEffect(() => {
    const params = new URLSearchParams();
    MULTI_KEYS.forEach((k) => {
      if (filters[k].length > 0) params.set(k, filters[k].join(","));
    });
    if (filters.search.trim()) params.set("search", filters.search.trim());
    if (filters.sort !== "name-asc") params.set("sort", filters.sort);
    if (filters.page > 1) params.set("page", String(filters.page));
    const qs = params.toString();
    const next = qs ? `/products?${qs}` : "/products";
    router.replace(next, { scroll: false });
  }, [filters, router]);

  // ── All available sizes (static, never filtered) ──
  const allSizes = useMemo(() => {
    const base = allProducts.filter((p) => p.application !== "Art Panel");
    return [...new Set(base.map((p) => p.size))].sort();
  }, []);

  // ── Products in current size (for computing available filter options) ──
  const productsInCurrentSize = useMemo(() => {
    const currentSize = filters.size[0] || DEFAULT_SIZE;
    return allProducts.filter(
      (p) => p.application !== "Art Panel" && p.size === currentSize
    );
  }, [filters.size]);

  // ── Available options (scoped to current size so irrelevant options are hidden) ──
  const options = useMemo(() => {
    const sorted = <T extends string>(arr: T[]): T[] => [...new Set(arr)].sort();
    return {
      category: sorted(productsInCurrentSize.map((p) => p.category)),
      collection: sorted(productsInCurrentSize.map((p) => p.collection).filter((c): c is string => !!c)),
      size: allSizes,
      finish: sorted(productsInCurrentSize.map((p) => p.finish)),
      application: sorted(productsInCurrentSize.map((p) => p.application)),
      series: sorted(productsInCurrentSize.map((p) => p.series)),
    };
  }, [productsInCurrentSize, allSizes]);

  // ── Filter WITHOUT size (for counting products per size) ──
  const filteredWithoutSize = useMemo(() => {
    let r = allProducts.filter((p) => p.application !== "Art Panel");
    if (filters.category.length) r = r.filter((p) => filters.category.includes(p.category));
    if (filters.collection.length) r = r.filter((p) => p.collection && filters.collection.includes(p.collection));
    if (filters.finish.length) r = r.filter((p) => filters.finish.includes(p.finish));
    if (filters.application.length) r = r.filter((p) => filters.application.includes(p.application));
    if (filters.series.length) r = r.filter((p) => filters.series.includes(p.series));
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      r = r.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q) ||
        (p.collection?.toLowerCase().includes(q) ?? false)
      );
    }
    return r;
  }, [filters]);

  // ── Count products per size (for smart filter) ──
  const sizeCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    options.size.forEach((s) => {
      map[s] = filteredWithoutSize.filter((p) => p.size === s).length;
    });
    return map;
  }, [filteredWithoutSize, options.size]);

  // ── Auto-switch size when current has zero results ──
  useEffect(() => {
    const currentSize = filters.size[0];
    if (currentSize && sizeCountMap[currentSize] === 0) {
      const SIZE_ORDER = ["600×1200 mm", "600×600 mm", "400×400 mm", "300×600 mm", "300×450 mm", "300×300 mm"];
      const firstAvailable = SIZE_ORDER.find((s) => (sizeCountMap[s] || 0) > 0);
      if (firstAvailable) {
        setFilters((f) => ({ ...f, size: [firstAvailable], page: 1 }));
      }
    }
  }, [sizeCountMap, filters.size]);

  // ── Filter + sort ──
  const filtered = useMemo(() => {
    let r = filteredWithoutSize;
    if (filters.size.length) r = r.filter((p) => filters.size.includes(p.size));

    const sorted = [...r];
    switch (filters.sort) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "size-asc":
        sorted.sort((a, b) => sizeToNumber(a.size) - sizeToNumber(b.size));
        break;
      case "size-desc":
        sorted.sort((a, b) => sizeToNumber(b.size) - sizeToNumber(a.size));
        break;
    }
    return sorted;
  }, [filteredWithoutSize, filters.size, filters.sort]);

  // ── Handlers ──
  const toggleMulti = useCallback((key: FilterKey, value: string) => {
    setFilters((f) => {
      // Size is single-select: clicking selects that size, can't deselect to "all"
      if (key === "size") {
        return { ...f, size: [value], page: 1 };
      }
      const current = f[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...f, [key]: next, page: 1 };
    });
  }, []);

  const clearGroup = useCallback((key: FilterKey) => {
    // Size always falls back to default, never empty
    if (key === "size") {
      setFilters((f) => ({ ...f, size: [DEFAULT_SIZE], page: 1 }));
      return;
    }
    setFilters((f) => ({ ...f, [key]: [], page: 1 }));
  }, []);

  const clearAll = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((f) => ({ ...f, search, page: 1 }));
  }, []);

  const setSort = useCallback((sort: SortKey) => {
    setFilters((f) => ({ ...f, sort, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((f) => ({ ...f, page }));
  }, []);

  // Don't count default size as an active filter
  const isDefaultSize = filters.size.length === 1 && filters.size[0] === DEFAULT_SIZE;
  const activeCount = MULTI_KEYS.reduce((sum, k) => {
    if (k === "size" && isDefaultSize) return sum;
    return sum + filters[k].length;
  }, 0) + (filters.search ? 1 : 0);

  return (
    <section
      className="bg-surface-alt"
      style={{ paddingTop: "clamp(32px, 4vw, 48px)", paddingBottom: "clamp(100px, 12vw, 160px)" }}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row" style={{ gap: "clamp(32px, 4vw, 56px)" }}>
          <ProductsFilterSidebar
            filters={filters}
            options={options}
            activeCount={activeCount}
            sizeCountMap={sizeCountMap}
            onToggle={toggleMulti}
            onClearGroup={clearGroup}
            onClearAll={clearAll}
            totalResults={filtered.length}
          />
          <ProductsGrid
            products={filtered}
            filters={filters}
            activeCount={activeCount}
            onToggle={toggleMulti}
            onClearAll={clearAll}
            onSearchChange={setSearch}
            onSortChange={setSort}
            onPageChange={setPage}
          />
        </div>
      </div>
    </section>
  );
}
