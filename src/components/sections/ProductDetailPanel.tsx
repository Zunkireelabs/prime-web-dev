"use client";

import { useEffect, useMemo } from "react";
import { X, ArrowRight } from "lucide-react";
import type { CatalogProduct } from "@/data/catalog";
import { allProducts } from "@/data/catalog";

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

  if (!product) return null;

  const hasImage = product.image && product.image.startsWith("http");
  const needsCrop = product.size === "300×600 mm" || product.size === "600×1200 mm";

  const specs = [
    { label: "Size", value: product.size },
    { label: "Finish", value: product.finish },
    { label: "Series", value: product.series },
    { label: "Application", value: product.application },
    ...(product.collection ? [{ label: "Collection", value: product.collection }] : []),
    ...(product.hasMatchingFloor ? [{ label: "Matching Floor", value: product.hasMatchingFloor }] : []),
  ];

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={product.name}>
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15,12,9,0.6)" }}
        onClick={onClose}
      />

      {/* Modal container — centered, max dimensions */}
      <div
        className="absolute bg-surface overflow-hidden"
        data-lenis-prevent
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(1200px, 92vw)",
          height: "min(720px, 88vh)",
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

        {/* Left — full-height product image */}
        <div
          className="hidden md:block shrink-0"
          style={{
            width: "50%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {hasImage ? (
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", transform: needsCrop ? "scale(1.12)" : "none" }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "linear-gradient(155deg, hsl(35,12%,89%), hsl(35,8%,83%), hsl(35,5%,79%))" }}
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
        </div>

        {/* Right — details (scrollable only if needed on mobile) */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "clamp(24px, 4vw, 48px)" }}
        >
          {/* Mobile-only image */}
          <div className="md:hidden" style={{ marginBottom: "24px" }}>
            {hasImage ? (
              <div style={{ aspectRatio: "4/5", borderRadius: "12px", overflow: "hidden" }}>
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
                  aspectRatio: "4/5",
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

          {/* Specs grid — 2 or 3 columns */}
          <div
            className="grid grid-cols-2 lg:grid-cols-3"
            style={{ gap: "16px", marginBottom: "28px" }}
          >
            {specs.map((s) => (
              <SpecItem key={s.label} label={s.label} value={s.value} />
            ))}
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
                      style={{ aspectRatio: "1", borderRadius: "8px", marginBottom: "6px" }}
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

          {/* CTA */}
          <a
            href={`mailto:sales@primeceramics.com.np?subject=Enquiry: ${encodeURIComponent(product.name)}&body=${encodeURIComponent(`Hi, I'm interested in the ${product.name} (${product.size}, ${product.finish}).`)}`}
            className="link-arrow"
          >
            Enquire About This Tile
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
