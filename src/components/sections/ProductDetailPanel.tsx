"use client";

import { useEffect, useMemo } from "react";
import { X, ArrowRight, Calculator } from "lucide-react";
import type { CatalogProduct } from "@/data/catalog";
import { allProducts } from "@/data/catalog";
import { tileVisualRatio, tileContainerWidth, ALL_TILE_SIZES } from "@/lib/utils";

interface Props {
  product: CatalogProduct | null;
  onClose: () => void;
  onProductChange: (product: CatalogProduct) => void;
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
        {label}
      </p>
      <p className="text-[0.85rem] text-ink" style={{ fontWeight: 400 }}>
        {value}
      </p>
    </div>
  );
}

/** Mini tile shape at the custom visual ratio */
/** Pixel dimensions per tile — scaled from real mm (÷15), width also reflects physical size */
const TILE_SHAPE_SIZES: Record<string, { w: number; h: number }> = {
  "300×300 mm": { w: 20, h: 20 },
  "300×450 mm": { w: 20, h: 30 },
  "300×600 mm": { w: 16, h: 32 },
  "400×400 mm": { w: 26, h: 26 },
  "600×600 mm": { w: 32, h: 32 },
  "600×1200 mm": { w: 22, h: 44 },
};

function TileShape({ size, active }: { size: string; active: boolean }) {
  const dims = TILE_SHAPE_SIZES[size] || { w: 22, h: 22 };

  return (
    <div
      style={{
        width: `${dims.w}px`,
        height: `${dims.h}px`,
        border: `1.5px solid ${active ? "var(--color-accent)" : "rgba(43,36,28,0.2)"}`,
        background: active ? "rgba(181,138,82,0.08)" : "transparent",
        borderRadius: "2px",
        transition: "all 0.3s",
      }}
    />
  );
}

export default function ProductDetailPanel({ product, onClose, onProductChange }: Props) {
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [product, onClose]);

  const similar = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(
        (p) =>
          p.slug !== product.slug &&
          p.image &&
          p.image.startsWith("http") &&
          (p.series === product.series ||
            p.category === product.category ||
            p.finish === product.finish)
      )
      .slice(0, 4);
  }, [product]);

  // Find same design in other sizes by stripping name suffixes
  const sizeVariants = useMemo(() => {
    if (!product) return new Map<string, CatalogProduct>();

    // Strip suffixes to get base design name
    const stripName = (name: string) =>
      name
        .replace(/\s*(Dark|Light|HL\s*\d*|HL\d*|Floor|Wall|Matt|Base)\s*/gi, "")
        .replace(/\s+\d+$/, "")
        .toLowerCase()
        .trim();

    const baseName = stripName(product.name);
    if (!baseName) return new Map<string, CatalogProduct>();

    const map = new Map<string, CatalogProduct>();
    map.set(product.size, product);

    allProducts.forEach((p) => {
      if (map.has(p.size) || p.slug === product.slug) return;
      if (stripName(p.name) === baseName) {
        map.set(p.size, p);
      }
    });

    return map;
  }, [product]);

  if (!product) return null;

  const hasImage = product.image && product.image.startsWith("http");

  const specs = [
    { label: "Size", value: product.size },
    { label: "Finish", value: product.finish },
    { label: "Series", value: product.series },
    { label: "Application", value: product.application },
    ...(product.collection ? [{ label: "Collection", value: product.collection }] : []),
    ...(product.hasMatchingFloor ? [{ label: "Matching Floor", value: product.hasMatchingFloor }] : []),
  ];

  // Build calculator URL with size param
  const sizeParam = product.size.match(/(\d+)\s*[×x]\s*(\d+)/);
  const calcUrl = sizeParam
    ? `/calculator?size=${sizeParam[1]}x${sizeParam[2]}`
    : "/calculator";

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={product.name}>
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15,12,9,0.6)" }}
        onClick={onClose}
      />

      {/* Modal container */}
      <div
        className="absolute bg-surface overflow-hidden"
        data-lenis-prevent
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(1200px, 92vw)",
          maxHeight: "92vh",
          borderRadius: "16px",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute z-10 flex items-center justify-center text-ink-muted hover:text-ink"
          style={{
            top: "16px",
            right: "16px",
            width: "40px",
            height: "40px",
            background: "var(--color-surface-elevated)",
            borderRadius: "50%",
            transition: "color 0.3s",
          }}
        >
          <X size={18} />
        </button>

        {/* Left — product image with custom visual ratio */}
        <div
          className="hidden md:flex shrink-0 items-center justify-center"
          style={{
            width: "50%",
            minHeight: "500px",
            position: "relative",
            overflow: "hidden",
            background: "var(--color-surface-alt)",
          }}
        >
          {hasImage ? (
            <div
              style={{
                width: tileContainerWidth(product.size),
                maxHeight: "90%",
                aspectRatio: tileVisualRatio(product.size),
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                loading="eager"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{
                width: tileContainerWidth(product.size),
                maxHeight: "90%",
                aspectRatio: tileVisualRatio(product.size),
                background: "linear-gradient(155deg, hsl(35,12%,89%), hsl(35,8%,83%), hsl(35,5%,79%))",
              }}
            >
              <p className="font-serif font-light text-ink-muted text-2xl text-center" style={{ padding: "0 32px" }}>
                {product.name}
              </p>
            </div>
          )}

          {/* Finish badge */}
          <span
            className="absolute text-[0.55rem] font-medium tracking-[0.14em] uppercase"
            style={{
              bottom: "20px",
              left: "20px",
              padding: "6px 14px",
              background: "var(--color-surface-elevated)",
              color: "var(--color-ink-muted)",
              borderRadius: "4px",
              backdropFilter: "blur(8px)",
            }}
          >
            {product.finish}
          </span>

          {/* Size label */}
          <span
            className="absolute text-[0.55rem] font-medium tracking-[0.14em] uppercase"
            style={{
              bottom: "20px",
              right: "20px",
              padding: "6px 14px",
              background: "var(--color-surface-elevated)",
              color: "var(--color-accent)",
              borderRadius: "4px",
              backdropFilter: "blur(8px)",
            }}
          >
            {product.size}
          </span>
        </div>

        {/* Right — details */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "clamp(24px, 4vw, 48px)" }}
        >
          {/* Mobile-only image */}
          <div className="md:hidden" style={{ marginBottom: "24px" }}>
            {hasImage ? (
              <div style={{ aspectRatio: tileVisualRatio(product.size), borderRadius: "12px", overflow: "hidden" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ) : (
              <div
                className="flex items-center justify-center"
                style={{
                  aspectRatio: tileVisualRatio(product.size),
                  borderRadius: "12px",
                  background: "linear-gradient(155deg, hsl(35,12%,89%), hsl(35,8%,83%), hsl(35,5%,79%))",
                }}
              >
                <p className="font-serif font-light text-ink-muted text-xl text-center" style={{ padding: "0 24px" }}>
                  {product.name}
                </p>
              </div>
            )}
          </div>

          {/* Eyebrow */}
          <p className="eyebrow" style={{ marginBottom: "12px" }}>
            {product.category}
          </p>

          {/* Product name */}
          <h2
            className="font-serif font-light text-ink"
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              lineHeight: 1.15,
              marginBottom: "20px",
            }}
          >
            {product.name}
          </h2>

          {/* Accent line */}
          <div className="accent-line" style={{ marginBottom: "24px" }} />

          {/* Specs grid */}
          <div
            className="grid grid-cols-2 lg:grid-cols-3"
            style={{ gap: "16px", marginBottom: "24px" }}
          >
            {specs.map((s) => (
              <SpecItem key={s.label} label={s.label} value={s.value} />
            ))}
          </div>

          {/* Available Sizes */}
          <div style={{ marginBottom: "24px" }}>
            <p
              className="text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-muted"
              style={{ marginBottom: "12px" }}
            >
              Available Sizes
            </p>
            <div className="flex flex-wrap" style={{ gap: "8px" }}>
              {ALL_TILE_SIZES.map((size) => {
                const isActive = size === product.size;
                const variant = sizeVariants.get(size);
                const isAvailable = !!variant;

                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      if (variant && !isActive) onProductChange(variant);
                    }}
                    className="flex flex-col items-center text-center"
                    style={{
                      padding: "10px 12px 8px",
                      borderRadius: "8px",
                      border: `1px solid ${isActive ? "var(--color-accent)" : isAvailable ? "rgba(43,36,28,0.12)" : "rgba(43,36,28,0.05)"}`,
                      background: isActive ? "rgba(181,138,82,0.06)" : "transparent",
                      opacity: isAvailable ? 1 : 0.3,
                      cursor: isAvailable && !isActive ? "pointer" : "default",
                      transition: "all 0.3s",
                      minWidth: "64px",
                    }}
                  >
                    <div style={{ marginBottom: "6px" }}>
                      <TileShape size={size} active={isActive} />
                    </div>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        color: isActive ? "var(--color-accent)" : "var(--color-ink-muted)",
                        transition: "color 0.3s",
                        lineHeight: 1.2,
                      }}
                    >
                      {size.replace(" mm", "")}
                    </p>
                  </button>
                );
              })}
              </div>
            </div>

          {/* Gold divider */}
          <div className="gold-divider-full" style={{ marginBottom: "24px" }} />

          {/* Similar tiles */}
          {similar.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <p
                className="text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-muted"
                style={{ marginBottom: "12px" }}
              >
                Similar Tiles
              </p>
              <div className="flex" style={{ gap: "12px" }}>
                {similar.map((tile) => (
                  <button
                    key={tile.slug}
                    type="button"
                    onClick={() => onProductChange(tile)}
                    className="group/sim text-left shrink-0"
                    style={{ width: "80px" }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{ aspectRatio: tileVisualRatio(tile.size), borderRadius: "8px", marginBottom: "6px" }}
                    >
                      {tile.image && tile.image.startsWith("http") ? (
                        <img
                          src={tile.image}
                          alt={tile.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover/sim:scale-[1.03]"
                          style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
                        />
                      ) : (
                        <div className="w-full h-full" style={{ background: "hsl(35,10%,85%)" }} />
                      )}
                    </div>
                    <p
                      className="text-[0.6rem] text-ink-light group-hover/sim:text-accent truncate"
                      style={{ transition: "color 0.3s" }}
                    >
                      {tile.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap items-center" style={{ gap: "16px" }}>
            <a
              href={`https://wa.me/9779802310000?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name} (${product.size}, ${product.finish}). Can you share more details?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              Enquire About This Tile
              <ArrowRight size={14} />
            </a>
            <a
              href={calcUrl}
              className="flex items-center text-[0.7rem] font-medium tracking-[0.1em] uppercase text-accent hover:text-accent-hover"
              style={{
                gap: "8px",
                padding: "8px 16px",
                border: "1px solid rgba(181,138,82,0.2)",
                borderRadius: "4px",
                transition: "all 0.3s",
              }}
            >
              <Calculator size={14} />
              Calculate Tiles Needed
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
