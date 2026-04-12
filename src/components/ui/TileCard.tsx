"use client";

import type { CatalogProduct } from "@/data/catalog";

interface TileCardProps {
  product: CatalogProduct;
  onClick?: (product: CatalogProduct) => void;
}

function tileHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return 25 + (Math.abs(h) % 25);
}

export default function TileCard({ product, onClick }: TileCardProps) {
  const hue = tileHue(product.name);
  const hasImage = product.image && product.image.startsWith("http");

  return (
    <article
      className="group"
      onClick={() => onClick?.(product)}
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
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "4/5",
          marginBottom: "16px",
          borderRadius: "0",
          boxShadow: "var(--shadow-sm)",
          transition: "box-shadow 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {hasImage ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03]"
            style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(155deg, hsl(${hue}, 12%, 89%), hsl(${hue}, 8%, 83%), hsl(${hue}, 5%, 79%))` }}
            >
              <div
                className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <p
                className="font-serif font-light text-center leading-tight select-none"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)", color: `hsl(${hue}, 6%, 62%)` }}
              >
                {product.name}
              </p>
            </div>
          </>
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
            borderRadius: "0",
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
      <h3 className="font-serif font-light text-ink group-hover:text-accent text-[0.95rem] leading-snug" style={{ transition: "color 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
        {product.name}
      </h3>

      {/* Category */}
      <p className="text-[0.6rem] tracking-[0.1em] text-ink-muted" style={{ marginTop: "4px" }}>
        {product.category}
      </p>
    </article>
  );
}
