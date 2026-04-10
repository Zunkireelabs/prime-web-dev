"use client";

import type { CatalogProduct } from "@/data/catalog";

function tileHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return 25 + (Math.abs(h) % 25);
}

export default function TileCard({ product }: { product: CatalogProduct }) {
  const hue = tileHue(product.name);

  return (
    <div className="group">
      {/* Swatch — 4:5, labeled sample */}
      <div className="relative aspect-[4/5] overflow-hidden" style={{ marginBottom: "16px" }}>
        {product.image && product.image.startsWith("http") ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            <div className="absolute inset-0 flex items-center justify-center px-4">
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
          className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[0.45rem] font-medium tracking-[0.12em] uppercase"
          style={{ background: `hsl(${hue}, 6%, 95%)`, color: `hsl(${hue}, 8%, 48%)` }}
        >
          {product.finish}
        </span>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />
      </div>

      {/* Info */}
      <p className="text-[0.5rem] font-medium tracking-[0.18em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
        {product.size.replace(" mm", "")} / {product.series}
      </p>
      <h3 className="font-serif font-light text-ink group-hover:text-accent transition-colors duration-500 text-[0.95rem] leading-snug">
        {product.name}
      </h3>
    </div>
  );
}
