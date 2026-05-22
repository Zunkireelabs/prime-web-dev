"use client";

import { memo, useCallback, useRef } from "react";
import type { CatalogProduct } from "@/data/catalog";
import { parseTileDims, tileAspectRatio } from "@/lib/utils";

/** Card aspect ratio — landscape for rectangular tiles, square for square.
 *  300×300→1:1, 300×450→3:2, 300×600→2:1, 400×400→1:1, 600×600→1:1, 600×1200→2:1 */
function cardAspectRatio(tileSize: string): string {
  const { w, h } = parseTileDims(tileSize);
  if (w === h) return "1 / 1";
  const long = Math.max(w, h);
  const short = Math.min(w, h);
  return `${long} / ${short}`;
}
import { prewarmTileZoomImage } from "@/components/ui/TileZoom";

const HOVER_PREWARM_DELAY_MS = 100;

interface TileCardProps {
  product: CatalogProduct;
  onClick?: (product: CatalogProduct) => void;
}

function tileHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return 25 + (Math.abs(h) % 25);
}

function TileCard({ product, onClick }: TileCardProps) {
  const hue = tileHue(product.name);
  const hasImage = product.image && product.image.startsWith("http");
  const hasGallery = product.hasGallery && product.gallery && product.gallery.length > 0;
  // Show first gallery image or product image based on editor's choice
  const gridImage = (hasGallery && product.showFirst === "gallery" && product.gallery![0].url)
    ? product.gallery![0].url
    : product.image;
  const dwellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerEnter = useCallback((e: React.PointerEvent) => {
    // Skip on touch/pen — mobile/tablet has no zoom panel, so prewarming
    // the hi-res variant would just waste bandwidth.
    if (e.pointerType !== "mouse") return;
    if (!hasImage || !product.image) return;
    if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
    dwellTimerRef.current = setTimeout(() => {
      const dims = parseTileDims(product.size);
      const cropAspect = dims.w === dims.h ? dims : undefined;
      prewarmTileZoomImage(product.image!, cropAspect);
      dwellTimerRef.current = null;
    }, HOVER_PREWARM_DELAY_MS);
  }, [hasImage, product.image, product.size]);

  const handlePointerLeave = useCallback(() => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
  }, []);

  return (
    <article
      className="group"
      onClick={() => onClick?.(product)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
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
      {/* Tile image — aspect ratio from actual image dimensions */}
      <div
        className="relative overflow-hidden bg-surface-card"
        style={{
          aspectRatio: cardAspectRatio(product.size),
          marginBottom: "16px",
          borderRadius: "4px",
          boxShadow: "var(--shadow-sm)",
          transition: "box-shadow 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
          {(hasImage || hasGallery) ? (
            (hasGallery && product.showFirst === "gallery") ? (
              /* Show gallery image — displayed as-is, no rotation */
              <img
                src={gridImage}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover group-hover:scale-[1.03]"
                style={{
                  transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            ) : product.imageRotation ? (() => {
              const dims = parseTileDims(product.size);
              const imgAR = `${dims.h} / ${dims.w}`;
              const imgWPct = (dims.h / dims.w) * 100;
              return (
                <div
                  className="absolute overflow-hidden"
                  style={{
                    top: "50%",
                    left: "50%",
                    width: `${imgWPct}%`,
                    aspectRatio: imgAR,
                    transform: `rotate(${product.imageRotation}deg) translate(-50%, -50%)`,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-full object-cover"
                  />
                </div>
              );
            })() : (
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover group-hover:scale-[1.03]"
                style={{
                  transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            )
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(155deg, hsl(${hue}, 12%, 89%), hsl(${hue}, 8%, 83%), hsl(${hue}, 5%, 79%))` }}
            >
              <p
                className="font-serif font-light text-center leading-tight select-none px-4"
                style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)", color: `hsl(${hue}, 6%, 62%)` }}
              >
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

        {/* "View Details" hover overlay */}
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

      {/* Meta */}
      <p className="text-[0.5rem] font-medium tracking-[0.18em] uppercase text-ink-muted" style={{ marginBottom: "6px" }}>
        {product.size.replace(" mm", "")} — {product.series}
      </p>

      {/* Name */}
      <h3 className="font-serif font-light text-ink group-hover:text-accent text-[0.95rem] leading-snug truncate" style={{ transition: "color 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
        {product.name}
      </h3>

      {/* Category */}
      <p className="text-[0.6rem] tracking-[0.1em] text-ink-muted" style={{ marginTop: "4px" }}>
        {product.category}
      </p>
    </article>
  );
}

export default memo(TileCard);
