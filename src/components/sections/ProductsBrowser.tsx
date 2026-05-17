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

  // ── Available options (from full catalog, not filtered pool) ──
  const options = useMemo(() => {
    const sorted = <T extends string>(arr: T[]): T[] => [...new Set(arr)].sort();
    return {
      category: sorted(allProducts.map((p) => p.category)),
      collection: sorted(allProducts.map((p) => p.collection).filter((c): c is string => !!c)),
      size: sorted(allProducts.map((p) => p.size)),
      finish: sorted(allProducts.map((p) => p.finish)),
      application: sorted(allProducts.map((p) => p.application)),
      series: sorted(allProducts.map((p) => p.series)),
    };
  }, []);

  // ── Filter + sort ──
  const filtered = useMemo(() => {
    // Hide HL (highlighter) tiles and Art Panel tiles (Thangka/Mithila Art)
    let r = allProducts.filter(
      (p) => !/\bHL\b/i.test(p.name) && p.application !== "Art Panel"
    );

    if (filters.category.length) r = r.filter((p) => filters.category.includes(p.category));
    if (filters.collection.length) r = r.filter((p) => p.collection && filters.collection.includes(p.collection));
    if (filters.size.length) r = r.filter((p) => filters.size.includes(p.size));
    if (filters.finish.length) r = r.filter((p) => filters.finish.includes(p.finish));
    if (filters.application.length) r = r.filter((p) => filters.application.includes(p.application));
    if (filters.series.length) r = r.filter((p) => filters.series.includes(p.series));

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      r = r.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          (p.collection?.toLowerCase().includes(q) ?? false)
      );
    }

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
  }, [filters]);

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
