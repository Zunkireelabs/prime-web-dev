"use client";

import { useEffect, useMemo } from "react";
import { X, ArrowRight, Calculator } from "lucide-react";
import type { CatalogProduct } from "@/data/catalog";
import { allProducts } from "@/data/catalog";
import { tileVisualRatio, tileImageCropStyle, tileImageFrameStyle, tileShowcaseFrameStyle, tilePickerSize, ALL_TILE_SIZES } from "@/lib/utils";
import TileLens from "@/components/ui/TileLens";
import { getSpecsBySize } from "@/data/catalog/tile-specs";

interface Props {
  product: CatalogProduct | null;
  onClose: () => void;
  onProductChange: (product: CatalogProduct) => void;
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.55rem] font-medium tracking-[0.12em] uppercase text-ink-muted" style={{ marginBottom: "2px" }}>
        {label}
      </p>
      <p className="text-[0.82rem] text-ink" style={{ fontWeight: 400 }}>
        {value}
      </p>
    </div>
  );
}

/**
 * Mini tile-shape icon for the size picker. Width and height both derive
 * from physical mm via `tilePickerSize` (1200 mm → 48 px), so picker icons
 * stay consistent with the rest of the tile sizing system.
 */
function TileShape({ size, active }: { size: string; active: boolean }) {
  const { w, h } = tilePickerSize(size, 48);

  return (
    <div
      style={{
        width: `${w}px`,
        height: `${h}px`,
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

        {/* Left — product image, showcase fit (each tile fills the panel
            uniformly while keeping its own aspect ratio). */}
        <div
          className="hidden md:flex shrink-0 items-center justify-center"
          style={{
            width: "50%",
            minHeight: "620px",
            position: "relative",
            overflow: "hidden",
            background: "var(--color-surface-alt)",
            // Showcase base — longest physical side renders at 80% of this.
            ["--tile-base" as never]: "clamp(440px, 50vw, 580px)",
          }}
        >
          {hasImage && product.image ? (
            <div
              style={{
                ...tileShowcaseFrameStyle(product.size, 85, 40),
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <TileLens src={product.image} alt={product.name} />
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{
                ...tileShowcaseFrameStyle(product.size, 85, 40),
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
          style={{ padding: "clamp(16px, 3vw, 48px)" }}
        >
          {/* Mobile-only image — showcase fit, centered on cream stage */}
          <div
            className="md:hidden flex items-center justify-center bg-surface-card"
            style={{
              marginBottom: "12px",
              padding: "12px",
              borderRadius: "8px",
              // Showcase base for phone — longest side renders at 80% of this.
              ["--tile-base" as never]: "clamp(220px, 70vw, 320px)",
            }}
          >
            {hasImage ? (
              <div style={{ ...tileShowcaseFrameStyle(product.size, 85, 40), borderRadius: "4px", overflow: "hidden" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={tileImageCropStyle}
                />
              </div>
            ) : (
              <div
                className="flex items-center justify-center"
                style={{
                  ...tileShowcaseFrameStyle(product.size, 85, 40),
                  borderRadius: "4px",
                  background: "linear-gradient(155deg, hsl(35,12%,89%), hsl(35,8%,83%), hsl(35,5%,79%))",
                }}
              >
                <p className="font-serif font-light text-ink-muted text-base text-center" style={{ padding: "0 16px" }}>
                  {product.name}
                </p>
              </div>
            )}
          </div>

          {/* Eyebrow */}
          <p className="eyebrow" style={{ marginBottom: "6px" }}>
            {product.category}
          </p>

          {/* Product name */}
          <h2
            className="font-serif font-light text-ink"
            style={{
              fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)",
              lineHeight: 1.15,
              marginBottom: "10px",
            }}
          >
            {product.name}
          </h2>

          {/* Accent line */}
          <div className="accent-line" style={{ marginBottom: "12px" }} />

          {/* Specs grid */}
          <div
            className="grid grid-cols-2 lg:grid-cols-3"
            style={{ gap: "8px 12px", marginBottom: "16px" }}
          >
            {specs.map((s) => (
              <SpecItem key={s.label} label={s.label} value={s.value} />
            ))}
          </div>

          {/* Technical Specifications */}
          {(() => {
            const tileSpecs = getSpecsBySize(product.size);
            if (!tileSpecs) return null;
            const techSpecs = [
              { label: "Thickness", value: tileSpecs.thickness },
              { label: "Weight / Box", value: `${tileSpecs.weightPerBox} kg` },
              { label: "Tiles / Box", value: `${tileSpecs.tilesPerBox}` },
              { label: "Area / Box", value: tileSpecs.areaPerBox },
              { label: "Water Absorption", value: tileSpecs.waterAbsorption },
              { label: "Breaking Strength", value: tileSpecs.breakingStrength },
              { label: "Scratch Hardness", value: tileSpecs.scratchHardness },
              { label: "Standard", value: tileSpecs.standard },
            ];
            return (
              <div style={{ marginBottom: "16px" }}>
                <p
                  className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted"
                  style={{ marginBottom: "6px" }}
                >
                  Technical Specifications
                </p>
                <div
                  className="grid grid-cols-4"
                  style={{
                    gap: "1px",
                    background: "rgba(43,36,28,0.06)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  {techSpecs.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        padding: "8px 10px",
                        background: "var(--color-surface-card)",
                      }}
                    >
                      <p
                        className="text-[0.45rem] font-medium tracking-[0.1em] uppercase text-ink-muted"
                        style={{ marginBottom: "2px" }}
                      >
                        {s.label}
                      </p>
                      <p className="text-[0.72rem] text-ink" style={{ fontWeight: 400 }}>
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Available Sizes */}
          <div style={{ marginBottom: "16px" }}>
            <p
              className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted"
              style={{ marginBottom: "6px" }}
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
                    <div
                      className="flex items-end justify-center"
                      style={{ height: "52px", marginBottom: "6px" }}
                    >
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
          <div className="gold-divider-full" style={{ marginBottom: "16px" }} />

          {/* Similar tiles */}
          {similar.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <p
                className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted"
                style={{ marginBottom: "8px" }}
              >
                Similar Tiles
              </p>
              <div
                className="flex"
                style={{
                  gap: "16px",
                  alignItems: "flex-end",
                  // Picker base — 1200mm reads ~100px tall; 600mm is half that.
                  ["--tile-base" as never]: "100px",
                }}
              >
                {similar.map((tile) => (
                  <button
                    key={tile.slug}
                    type="button"
                    onClick={() => onProductChange(tile)}
                    className="group/sim shrink-0"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
                  >
                    <div
                      className="overflow-hidden bg-surface-card"
                      style={{ ...tileImageFrameStyle(tile.size), borderRadius: "4px" }}
                    >
                      {tile.image && tile.image.startsWith("http") ? (
                        <img
                          src={tile.image}
                          alt={tile.name}
                          loading="lazy"
                          className="block group-hover/sim:scale-[1.03]"
                          style={{ ...tileImageCropStyle, transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
                        />
                      ) : (
                        <div className="absolute inset-0" style={{ background: "hsl(35,10%,85%)" }} />
                      )}
                    </div>
                    <p
                      className="text-[0.6rem] text-ink-light group-hover/sim:text-accent text-center truncate"
                      style={{ transition: "color 0.3s", maxWidth: "84px" }}
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
