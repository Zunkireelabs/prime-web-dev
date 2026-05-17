"use client";

import { useState, useRef, useEffect, useMemo, useCallback, KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/animations/FadeIn";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import { ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";
import { collections, browseData } from "@/data/collections";
import { allProducts } from "@/data/catalog";
import type { CatalogProduct } from "@/data/catalog";
import ProductDetailPanel from "@/components/sections/ProductDetailPanel";

gsap.registerPlugin(ScrollTrigger);

const productBySlug = new Map(allProducts.map((p) => [p.slug, p]));

const ALL = "All";

type Tab = "Finishes" | "Sizes" | "Colors" | "Types";
const tabs: Tab[] = ["Finishes", "Sizes", "Colors", "Types"];

const uniqueCategories = Array.from(new Set(collections.map((c) => c.category)));
// All sizes carried on the site (curated collections + full catalog), in canonical order.
const STANDARD_SIZES = [
  "300×300 mm",
  "300×450 mm",
  "300×600 mm",
  "400×400 mm",
  "600×600 mm",
  "600×1200 mm",
];
const catalogSizes = new Set(allProducts.map((p) => p.size));
const collectionSizes = new Set(collections.flatMap((c) => c.sizes));
const allSizes = STANDARD_SIZES.filter((s) => collectionSizes.has(s) || catalogSizes.has(s));

const optionsByTab: Record<Tab, string[]> = {
  Finishes: [ALL, ...uniqueCategories],
  Sizes: [...allSizes],
  Colors: [ALL, ...browseData.Colors.map((c) => c.name)],
  Types: [ALL, ...browseData.Types.map((t) => t.name)],
};

type StripItem = {
  name: string;
  slug: string;
  badge: string;
  meta: string;
  /** Physical tile size (e.g. "600×1200 mm") used by tileImageFrameStyle so the
   *  inner frame's aspect ratio matches the real tile shape. */
  size: string;
  image: string;
  product: CatalogProduct | null;
};

export default function CollectionsGrid() {
  const [activeTab, setActiveTab] = useState<Tab>("Sizes");
  const [activeOption, setActiveOption] = useState<string>("600\u00d71200 mm");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  const stripRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const dragMovedRef = useRef(false);

  const baseItems: StripItem[] = useMemo(() => {
    // Resolve image preferring the product's image (so card matches what the modal opens)
    const resolveImage = (product: CatalogProduct | undefined, fallback: string) => {
      if (product?.image) return product.image;
      return fallback;
    };
    // Default size for swatch-only entries (color/type) when no product is matched.
    const FALLBACK_SIZE = "600×600 mm";

    // Round-robin interleave across sizes, in canonical order
    // (300×300 → 300×450 → 300×600 → 400×400 → 600×600 → 600×1200, repeat).
    // Cards visibly cycle through all available dimensions instead of clumping
    // by size.
    const SIZE_ORDER = [
      "300×300 mm",
      "300×450 mm",
      "300×600 mm",
      "400×400 mm",
      "600×600 mm",
      "600×1200 mm",
    ];
    const interleaveBySize = (list: StripItem[]): StripItem[] => {
      if (list.length <= 2) return list;
      const buckets = new Map<string, StripItem[]>();
      for (const item of list) {
        const bucket = buckets.get(item.size) ?? [];
        bucket.push(item);
        buckets.set(item.size, bucket);
      }
      if (buckets.size <= 1) return list;
      // Walk sizes in canonical order; any unknown size gets appended last
      // so we still emit it.
      const order = [
        ...SIZE_ORDER.filter((s) => buckets.has(s)),
        ...[...buckets.keys()].filter((s) => !SIZE_ORDER.includes(s)),
      ];
      const result: StripItem[] = [];
      let added = true;
      while (added) {
        added = false;
        for (const size of order) {
          const next = buckets.get(size)!.shift();
          if (next) {
            result.push(next);
            added = true;
          }
        }
      }
      return result;
    };

    // Pull 2 catalog products at each standard size that isn't already in
    // the curated 15 collections — this lets the strip rotate through all
    // six dimensions (300×300, 300×450, …) instead of just the four the
    // collections cover.
    const enrichWithAllSizes = (current: StripItem[]): StripItem[] => {
      const presentSizes = new Set(current.map((i) => i.size));
      const usedSlugs = new Set(current.map((i) => i.slug));
      const additions: StripItem[] = [];
      for (const size of SIZE_ORDER) {
        if (presentSizes.has(size)) continue;
        const fill = allProducts
          .filter((p) => p.size === size && !usedSlugs.has(p.slug))
          .slice(0, 2);
        for (const p of fill) {
          additions.push({
            name: p.name,
            slug: p.slug,
            badge: p.category,
            meta: p.size,
            size: p.size,
            image: p.image,
            product: p,
          });
          usedSlugs.add(p.slug);
        }
      }
      return [...current, ...additions];
    };

    if (activeTab === "Finishes") {
      const filtered = activeOption === ALL
        ? collections
        : collections.filter((c) => c.category === activeOption);
      const built = filtered.map<StripItem>((c) => {
        const product = productBySlug.get(c.slug);
        const size = c.sizes[0] || product?.size || FALLBACK_SIZE;
        return {
          name: c.name,
          slug: c.slug,
          badge: c.category,
          meta: size,
          size,
          image: resolveImage(product, c.image),
          product: product ?? null,
        };
      });
      const enriched = activeOption === ALL ? enrichWithAllSizes(built) : built;
      return interleaveBySize(enriched);
    }

    if (activeTab === "Sizes") {
      // Curated first: matching collections render the handpicked tiles.
      const fromCollections = activeOption === ALL
        ? collections
        : collections.filter((c) => c.sizes.includes(activeOption));
      const usedSlugs = new Set(fromCollections.map((c) => c.slug));

      const collectionItems: StripItem[] = fromCollections.map((c) => {
        const product = productBySlug.get(c.slug);
        const size = c.sizes[0] || product?.size || FALLBACK_SIZE;
        return {
          name: c.name,
          slug: c.slug,
          badge: size,
          meta: c.category,
          size,
          image: resolveImage(product, c.image),
          product: product ?? null,
        };
      });

      // For specific size selections, top up with catalog products at that size
      // so even sizes the curated list misses (e.g. 300×300, 300×450) show real tiles.
      if (activeOption !== ALL && collectionItems.length < 12) {
        const need = 12 - collectionItems.length;
        const catalogFill = allProducts
          .filter((p) => p.size === activeOption && !usedSlugs.has(p.slug))
          .slice(0, need)
          .map<StripItem>((p) => ({
            name: p.name,
            slug: p.slug,
            badge: p.size,
            meta: p.category,
            size: p.size,
            image: p.image,
            product: p,
          }));
        return interleaveBySize([...collectionItems, ...catalogFill]);
      }
      // ALL → enrich with the missing standard sizes (300×300, 300×450)
      const enriched = activeOption === ALL ? enrichWithAllSizes(collectionItems) : collectionItems;
      return interleaveBySize(enriched);
    }

    if (activeTab === "Colors") {
      const colorEntries = activeOption === ALL
        ? browseData.Colors
        : browseData.Colors.filter((c) => c.name === activeOption);
      const built = colorEntries.map<StripItem>((c) => {
        const product = productBySlug.get(c.slug);
        const size = product?.size || FALLBACK_SIZE;
        return {
          name: product?.name ?? c.name,
          slug: c.slug,
          badge: c.name,
          meta: product?.size ?? c.name,
          size,
          image: resolveImage(product, c.image),
          product: product ?? null,
        };
      });
      return interleaveBySize(built);
    }

    // Types
    const typeEntries = activeOption === ALL
      ? browseData.Types
      : browseData.Types.filter((t) => t.name === activeOption);
    const built = typeEntries.map<StripItem>((t) => {
      const product = productBySlug.get(t.slug);
      const size = product?.size || FALLBACK_SIZE;
      return {
        name: product?.name ?? t.name,
        slug: t.slug,
        badge: t.name,
        meta: product?.size ?? t.name,
        size,
        image: resolveImage(product, t.image),
        product: product ?? null,
      };
    });
    return interleaveBySize(built);
  }, [activeTab, activeOption]);

  const items = baseItems;
  const hasActiveFilter = activeOption !== ALL;

  // Stagger sub-options when tab changes
  useEffect(() => {
    const opts = optionsRef.current?.querySelectorAll<HTMLElement>("[data-option]");
    if (opts && opts.length) {
      gsap.fromTo(
        opts,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out", stagger: 0.03, overwrite: true }
      );
    }
  }, [activeTab]);

  // Stagger cards on filter / search change
  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".tile-card");
    if (cards && cards.length) {
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.05,
          overwrite: true,
        }
      );
    }
  }, [activeTab, activeOption]);

  // Marquee auto-scroll (pauses on hover and during drag); items rendered in duplicate so wrapping is seamless
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const SPEED = 0.4; // px per frame at 60fps ≈ 24px/s

    const tick = () => {
      if (strip && !isDraggingRef.current && !isHoveringRef.current) {
        const halfWidth = strip.scrollWidth / 2;
        let next = strip.scrollLeft + SPEED;
        if (next >= halfWidth) next -= halfWidth;
        strip.scrollLeft = next;
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [items.length]);

  // Pointer drag-to-slide. We only setPointerCapture AFTER the user crosses a
  // small movement threshold, so a plain click is never captured and the
  // card's click handler runs normally.
  const DRAG_THRESHOLD = 8;
  const capturedRef = useRef(false);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const strip = stripRef.current;
    if (!strip) return;
    // ignore right/middle mouse buttons
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    capturedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = strip.scrollLeft;
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const strip = stripRef.current;
    if (!strip) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) <= DRAG_THRESHOLD) return; // ignore jitter, let click pass through
    if (!capturedRef.current) {
      dragMovedRef.current = true;
      capturedRef.current = true;
      try { strip.setPointerCapture(e.pointerId); } catch {}
    }
    let next = dragStartScrollRef.current - delta;
    const halfWidth = strip.scrollWidth / 2;
    if (next < 0) next += halfWidth;
    if (next >= halfWidth) next -= halfWidth;
    strip.scrollLeft = next;
  }, []);

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    const strip = stripRef.current;
    if (strip && capturedRef.current) {
      try { strip.releasePointerCapture(e.pointerId); } catch {}
    }
    capturedRef.current = false;
  }, []);

  const onMouseEnter = useCallback(() => { isHoveringRef.current = true; }, []);
  const onMouseLeave = useCallback(() => { isHoveringRef.current = false; }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const strip = stripRef.current;
    if (!strip) return;
    const firstCard = strip.querySelector<HTMLElement>(".tile-card");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? strip.clientWidth * 0.6;
    const gap = 20;
    const step = cardWidth + gap;
    const halfWidth = strip.scrollWidth / 2;
    let next = strip.scrollLeft + (dir === "left" ? -step : step);
    if (next < 0) next += halfWidth;
    if (next >= halfWidth) next -= halfWidth;
    strip.scrollLeft = next;
  }, []);

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setActiveOption(ALL);
  };

  const pickOption = (opt: string) => setActiveOption(opt);

  const clearAll = () => {
    setActiveOption(ALL);
  };

  const handleArrowKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const target = e.target as HTMLElement;
    if (target.tagName !== "BUTTON") return;
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const idx = buttons.indexOf(target as HTMLButtonElement);
    if (idx === -1) return;
    e.preventDefault();
    const next = e.key === "ArrowRight"
      ? buttons[Math.min(buttons.length - 1, idx + 1)]
      : buttons[Math.max(0, idx - 1)];
    next?.focus();
  };

  return (
    <section
      id="collections"
      className="bg-surface-alt relative overflow-hidden"
      style={{ padding: "clamp(64px, 8vw, 112px) 0" }}
    >
      <div className="container">
        {/* ── Header: title left, arrows + View All right ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: "24px", marginBottom: "48px" }}>
          <div>
            <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 90%" end="top 65%">
              <div className="flex items-center" style={{ gap: "16px", marginBottom: "16px" }}>
                <div className="w-10 h-px bg-accent" />
                <p className="eyebrow text-accent">Collections</p>
              </div>
            </ScrollReveal>
            <ScrollReveal from={{ y: 25, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 88%" end="top 62%">
              <h2 className="h2 text-ink" style={{ marginBottom: "16px" }}>Curated for Every Vision</h2>
              <p className="body-sm text-ink-light max-w-md">
                Explore our premium collections — crafted for spaces that demand
                distinction.
              </p>
            </ScrollReveal>
          </div>

          <FadeIn delay={0.2}>
            <div className="flex items-center" style={{ gap: "16px" }}>
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 border border-ink-faint flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-accent hover:text-accent"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 border border-ink-faint flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-accent hover:text-accent"
              >
                <ArrowRight size={14} />
              </button>
              <div className="w-px h-6 bg-ink-faint" style={{ marginLeft: "4px", marginRight: "4px" }} />
              <a href="/products" className="link-arrow text-[0.65rem]">
                View All <ArrowUpRight size={12} />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* ── Divider ── */}
        <FadeIn delay={0.12}>
          <div className="h-[1px] bg-ink-faint" style={{ marginBottom: "clamp(28px, 3.5vw, 36px)" }} />
        </FadeIn>

        {/* ── Row 1: Dimension tabs (right-aligned) ── */}
        <FadeIn delay={0.14}>
          <div
            role="tablist"
            aria-label="Filter dimension"
            onKeyDown={handleArrowKeys}
            className="flex items-center flex-wrap justify-end"
            style={{ gap: "8px", marginBottom: "clamp(20px, 2.5vw, 28px)" }}
          >
            {tabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => switchTab(tab)}
                  style={{
                    padding: "9px 22px",
                    fontSize: "0.62rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    borderRadius: "100px",
                    border: "1px solid",
                    borderColor: isActive ? "var(--color-accent)" : "rgba(61, 58, 54, 0.16)",
                    background: isActive ? "var(--color-accent)" : "transparent",
                    color: isActive ? "#fff" : "var(--color-ink-light)",
                    transition: "all 0.3s linear",
                    cursor: "pointer",
                    boxShadow: isActive ? "0 4px 14px rgba(181, 138, 82, 0.22)" : "none",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* ── Row 2: Sub-options (left-aligned) ── */}
        <div
          ref={optionsRef}
          role="radiogroup"
          aria-label={`${activeTab} options`}
          onKeyDown={handleArrowKeys}
          className="flex items-center flex-wrap justify-start"
          style={{ gap: "8px", marginBottom: "clamp(20px, 2.5vw, 28px)" }}
        >
          {optionsByTab[activeTab].map((opt) => {
            const isActive = opt === activeOption;
            return (
              <button
                key={`${activeTab}-${opt}`}
                data-option
                role="radio"
                aria-checked={isActive}
                onClick={() => pickOption(opt)}
                className={`text-[0.55rem] md:text-[0.6rem] font-medium tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer border rounded-full ${
                  isActive
                    ? "bg-ink text-white border-ink"
                    : "bg-transparent text-ink-muted border-ink-faint hover:border-accent hover:text-ink"
                }`}
                style={{ padding: "7px 16px" }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }} />

        {/* ── Horizontal Scroll Strip ── */}
        {items.length > 0 ? (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-surface-alt to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-surface-alt to-transparent z-10 pointer-events-none" />

            <div
              ref={stripRef}
              className="flex overflow-x-auto no-scrollbar select-none"
              style={{ gap: "20px", padding: "8px", cursor: "grab", touchAction: "pan-y" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onMouseEnter={onMouseEnter}
              onMouseLeave={() => { onMouseLeave(); setHoveredIdx(null); }}
            >
              <div ref={cardsRef} className="flex" style={{ gap: "20px" }}>
                {[...items, ...items].map((item, i) => {
                  const realIdx = i % items.length;
                  const product = item.product;
                  return (
                    <div
                      key={`${activeTab}-${activeOption}-${item.slug}-${i}`}
                      className="tile-card flex-shrink-0"
                      style={{
                        // Width proportional to physical tile width:
                        // 300mm = base, 400mm = 1.33×, 600mm = 2×
                        width: (() => {
                          const w = parseInt(item.size.match(/(\d+)/)?.[1] ?? "600", 10);
                          if (w <= 300) return "clamp(120px, 18vw, 160px)";
                          if (w <= 400) return "clamp(160px, 24vw, 220px)";
                          return "clamp(200px, 30vw, 320px)"; // 600mm
                        })(),
                      }}
                      onMouseEnter={() => setHoveredIdx(realIdx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <TiltCard intensity={0} className="h-full">
                        <button
                          type="button"
                          onClick={(e) => {
                            if (dragMovedRef.current) { e.preventDefault(); return; }
                            if (product) setSelectedProduct(product);
                          }}
                          className="group block h-full w-full text-left cursor-pointer"
                          style={{ background: "none", border: "none", padding: 0 }}
                        >
                          <div className="relative overflow-hidden" style={{
                            aspectRatio: (() => {
                              const m = item.size.match(/(\d+)\s*[×x]\s*(\d+)/);
                              return m ? `${m[1]} / ${m[2]}` : "1 / 1";
                            })(),
                            marginBottom: "16px",
                            borderRadius: "4px",
                          }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                draggable={false}
                                className={`block w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                  hoveredIdx === realIdx
                                    ? "scale-[1.06]"
                                    : hoveredIdx !== null
                                      ? "scale-[0.98] brightness-[0.85]"
                                      : ""
                                }`}
                              />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute bg-white/90 backdrop-blur-sm" style={{ top: "12px", left: "12px", padding: "4px 10px" }}>
                              <p className="text-[0.45rem] font-semibold tracking-[0.2em] uppercase text-ink">{item.badge}</p>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" style={{ padding: "16px" }}>
                              <p className="font-serif font-light text-white text-lg leading-tight" style={{ marginBottom: "4px" }}>{item.name}</p>
                              {item.meta && (
                                <p className="text-[0.5rem] font-medium tracking-[0.15em] uppercase text-white/60">{item.meta}</p>
                              )}
                            </div>

                            <div className="absolute w-8 h-8 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 bg-white/5 backdrop-blur-sm" style={{ top: "12px", right: "12px" }}>
                              <ArrowUpRight size={12} className="text-white" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </div>

                          <div className="group-hover:opacity-0 transition-opacity duration-300">
                            <h3 className="font-serif font-light text-ink text-[0.95rem] truncate" style={{ marginBottom: "4px" }}>{item.name}</h3>
                            {item.meta && (
                              <p className="text-[0.5rem] font-medium tracking-[0.15em] uppercase text-ink-muted">{item.meta}</p>
                            )}
                          </div>
                        </button>
                      </TiltCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{ padding: "64px 24px", border: "1px dashed rgba(43,36,28,0.18)", borderRadius: "4px" }}
          >
            <p className="body-sm text-ink-muted" style={{ marginBottom: "12px" }}>
              No collections match this filter.
            </p>
            <button onClick={clearAll} className="link-arrow text-[0.65rem] inline-flex">
              Clear filters <ArrowUpRight size={12} />
            </button>
          </div>
        )}

        {/* ── Footer count ── */}
        <div className="flex items-center justify-between flex-wrap" style={{ marginTop: "clamp(28px, 3.5vw, 40px)", gap: "16px" }}>
          <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-ink-muted">
            Showing {items.length} of {baseItems.length}
            {hasActiveFilter && (
              <>
                <span className="text-accent" style={{ marginLeft: "8px" }}>
                  · {activeOption}
                </span>
                <button
                  onClick={clearAll}
                  className="text-ink hover:text-accent transition-colors duration-300 cursor-pointer underline-offset-4 hover:underline"
                  style={{ marginLeft: "12px" }}
                >
                  clear all
                </button>
              </>
            )}
          </p>

          <a href="/catalog" className="link-arrow text-[0.6rem] sm:hidden">
            View All <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      <ProductDetailPanel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onProductChange={setSelectedProduct}
      />
    </section>
  );
}
