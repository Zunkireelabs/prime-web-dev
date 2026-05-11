"use client";

import { ALL_TILE_SIZES, tileImageFrameStyle } from "@/lib/utils";

export default function TileScaleDemo() {
  return (
    <main className="min-h-screen bg-surface-base" style={{ padding: "48px 24px" }}>
      <div className="container">
        <header style={{ marginBottom: "48px" }}>
          <p className="eyebrow text-accent" style={{ marginBottom: "12px" }}>
            V2 — Tile Aspect Ratio Verification
          </p>
          <h1 className="font-serif font-light text-ink" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "12px" }}>
            True Physical Scale
          </h1>
          <p className="body-sm text-ink-light max-w-xl">
            Every tile renders at its real proportions relative to a 1200&nbsp;mm
            reference. A 300×600 is exactly half the width of a 600×600. A
            600×1200 is exactly twice the height. Squares look square.
          </p>
        </header>

        {/* Side-by-side, bottom-aligned so heights are directly comparable */}
        <section
          className="bg-surface-alt"
          style={{
            padding: "32px",
            borderRadius: "8px",
            // Big base so the demo is generous and readable.
            ["--tile-base" as never]: "320px",
            marginBottom: "48px",
          }}
        >
          <h2 className="text-ink" style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "24px", letterSpacing: "0.04em" }}>
            All sizes, bottom-aligned
          </h2>
          <div
            className="flex items-end overflow-x-auto"
            style={{ gap: "32px", paddingBottom: "8px" }}
          >
            {ALL_TILE_SIZES.map((size) => (
              <TileBox key={size} size={size} />
            ))}
          </div>
        </section>

        {/* Pairwise comparisons matching the bug-fix invariants */}
        <section style={{ marginBottom: "48px" }}>
          <h2 className="text-ink" style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "24px", letterSpacing: "0.04em" }}>
            Pairwise comparisons
          </h2>

          <Comparison
            title="600×600  vs  300×600"
            note="Same height. 300×600 is exactly half the width."
            sizes={["600×600 mm", "300×600 mm"]}
          />
          <Comparison
            title="600×600  vs  600×1200"
            note="Same width. 600×1200 is exactly twice the height."
            sizes={["600×600 mm", "600×1200 mm"]}
          />
          <Comparison
            title="300×300  vs  300×600"
            note="Same width (both 300mm wide). 300×600 is exactly twice the height."
            sizes={["300×300 mm", "300×600 mm"]}
          />
          <Comparison
            title="300×300  vs  600×600"
            note="600×600 is exactly 2× wider AND 2× taller (4× the area)."
            sizes={["300×300 mm", "600×600 mm"]}
          />
        </section>
      </div>
    </main>
  );
}

function TileBox({ size }: { size: string }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: "12px" }}>
      <div className="bg-surface-card flex items-center justify-center" style={{ ...tileImageFrameStyle(size), boxShadow: "var(--shadow-sm)" }}>
        <TileTexture size={size} />
      </div>
      <p className="text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-muted whitespace-nowrap">
        {size}
      </p>
    </div>
  );
}

function Comparison({ title, note, sizes }: { title: string; note: string; sizes: string[] }) {
  return (
    <div
      className="bg-surface-card"
      style={{
        padding: "24px",
        marginBottom: "20px",
        borderRadius: "6px",
        border: "1px solid var(--color-ink-faint)",
        ["--tile-base" as never]: "260px",
      }}
    >
      <p className="text-ink" style={{ fontSize: "0.85rem", fontWeight: 500, marginBottom: "4px" }}>
        {title}
      </p>
      <p className="text-ink-light" style={{ fontSize: "0.7rem", marginBottom: "20px" }}>
        {note}
      </p>
      <div className="flex items-end" style={{ gap: "32px" }}>
        {sizes.map((size) => (
          <TileBox key={size} size={size} />
        ))}
      </div>
    </div>
  );
}

/**
 * Subtle tile-like texture so each box reads as a tile, not just a rectangle.
 * Uses a hash of the size string so each tile gets a distinct (but related) hue.
 */
function TileTexture({ size }: { size: string }) {
  let h = 0;
  for (let i = 0; i < size.length; i++) h = size.charCodeAt(i) + ((h << 5) - h);
  const hue = 25 + (Math.abs(h) % 18);
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(155deg, hsl(${hue}, 14%, 88%), hsl(${hue}, 10%, 80%), hsl(${hue}, 7%, 74%))`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif font-light text-ink-muted" style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.8rem)", letterSpacing: "0.08em" }}>
          {size.replace(" mm", "")}
        </span>
      </div>
    </>
  );
}
