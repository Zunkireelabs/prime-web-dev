"use client";

import { useState, useMemo, useCallback } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const TILE_DATA = [
  { size: "300×300 mm", label: "300×300", dimMm: [300, 300], tilesPerBox: 10, sqmPerTile: 0.09 },
  { size: "300×450 mm", label: "300×450", dimMm: [300, 450], tilesPerBox: 8, sqmPerTile: 0.135 },
  { size: "300×600 mm", label: "300×600", dimMm: [300, 600], tilesPerBox: 6, sqmPerTile: 0.18 },
  { size: "400×400 mm", label: "400×400", dimMm: [400, 400], tilesPerBox: 6, sqmPerTile: 0.16 },
  { size: "600×600 mm", label: "600×600", dimMm: [600, 600], tilesPerBox: 4, sqmPerTile: 0.36 },
  { size: "600×1200 mm", label: "600×1200", dimMm: [600, 1200], tilesPerBox: 2, sqmPerTile: 0.72 },
];

const WASTAGE_OPTIONS = [
  { value: 5, label: "5%", desc: "Simple layout" },
  { value: 10, label: "10%", desc: "Standard" },
  { value: 15, label: "15%", desc: "Diagonal / cuts" },
];

const SQM_TO_SQFT = 10.7639;

function NumberInput({
  label,
  value,
  onChange,
  unit,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        className="text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-muted block"
        style={{ marginBottom: "8px" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "0"}
          className="w-full text-ink text-[1rem] font-light bg-surface focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
          style={{
            padding: "14px 60px 14px 16px",
            border: "1px solid rgba(43,36,28,0.12)",
            borderRadius: "8px",
            transition: "border-color 0.3s",
          }}
          min="0"
          step="any"
        />
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.7rem] font-medium tracking-[0.1em] uppercase text-ink-muted"
        >
          {unit}
        </span>
      </div>
    </div>
  );
}

export default function CalculatorForm() {
  const [unit, setUnit] = useState<"ft" | "m">("ft");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [directArea, setDirectArea] = useState("");
  const [selectedTile, setSelectedTile] = useState(0);
  const [wastage, setWastage] = useState(10);
  const [copied, setCopied] = useState(false);

  const tile = TILE_DATA[selectedTile];

  const results = useMemo(() => {
    let areaSqm = 0;

    if (directArea && parseFloat(directArea) > 0) {
      const val = parseFloat(directArea);
      areaSqm = unit === "ft" ? val / SQM_TO_SQFT : val;
    } else if (length && width && parseFloat(length) > 0 && parseFloat(width) > 0) {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const areaInUnit = l * w;
      areaSqm = unit === "ft" ? areaInUnit / SQM_TO_SQFT : areaInUnit;
    }

    if (areaSqm <= 0) return null;

    const areaSqft = areaSqm * SQM_TO_SQFT;
    const tilesNeeded = Math.ceil(areaSqm / tile.sqmPerTile);
    const wastageExtra = Math.ceil(tilesNeeded * (wastage / 100));
    const totalTiles = tilesNeeded + wastageExtra;
    const boxesNeeded = Math.ceil(totalTiles / tile.tilesPerBox);

    return {
      areaSqm: Math.round(areaSqm * 100) / 100,
      areaSqft: Math.round(areaSqft * 100) / 100,
      tilesNeeded,
      wastageExtra,
      totalTiles,
      boxesNeeded,
      tilesPerBox: tile.tilesPerBox,
    };
  }, [length, width, directArea, unit, selectedTile, wastage, tile]);

  const handleCopy = useCallback(() => {
    if (!results) return;
    const text = [
      `Prime Tiles Calculator Results`,
      `───────────────────────────`,
      `Room Area: ${results.areaSqft} sq ft (${results.areaSqm} sq m)`,
      `Tile Size: ${tile.size}`,
      `Tiles Needed: ${results.tilesNeeded}`,
      `Wastage (${wastage}%): +${results.wastageExtra} tiles`,
      `Total: ${results.totalTiles} tiles`,
      `Boxes: ${results.boxesNeeded} (${results.tilesPerBox} tiles/box)`,
      ``,
      `www.primeceramics.com.np`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [results, tile, wastage]);

  const quoteBody = results
    ? `Hi, I need tiles for my project:\n\nRoom Area: ${results.areaSqft} sq ft\nTile Size: ${tile.size}\nTotal Tiles: ${results.totalTiles}\nBoxes: ${results.boxesNeeded}\n\nPlease send me a quotation.`
    : "";

  return (
    <section
      className="bg-surface-alt"
      style={{ padding: "clamp(48px, 6vw, 80px) 0 clamp(80px, 10vw, 140px)" }}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row" style={{ gap: "clamp(32px, 4vw, 64px)" }}>

          {/* Left — Inputs */}
          <FadeIn>
            <div
              className="lg:w-[420px] shrink-0"
              style={{
                padding: "clamp(24px, 3vw, 40px)",
                background: "var(--color-surface)",
                borderRadius: "12px",
                border: "1px solid rgba(43,36,28,0.06)",
              }}
            >
              {/* Unit toggle */}
              <div style={{ marginBottom: "28px" }}>
                <p
                  className="text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-muted"
                  style={{ marginBottom: "10px" }}
                >
                  Unit
                </p>
                <div className="flex" style={{ gap: "8px" }}>
                  {(["ft", "m"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className="text-[0.7rem] font-medium tracking-[0.12em] uppercase"
                      style={{
                        padding: "10px 24px",
                        borderRadius: "6px",
                        border: `1px solid ${unit === u ? "var(--color-accent)" : "rgba(43,36,28,0.12)"}`,
                        background: unit === u ? "var(--color-accent-subtle)" : "transparent",
                        color: unit === u ? "var(--color-accent)" : "var(--color-ink-muted)",
                        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                        cursor: "pointer",
                      }}
                    >
                      {u === "ft" ? "Feet" : "Meters"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2" style={{ gap: "16px", marginBottom: "20px" }}>
                <NumberInput label="Length" value={length} onChange={setLength} unit={unit} placeholder="12" />
                <NumberInput label="Width" value={width} onChange={setWidth} unit={unit} placeholder="10" />
              </div>

              {/* OR divider */}
              <div className="flex items-center" style={{ gap: "12px", marginBottom: "20px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(43,36,28,0.08)" }} />
                <span className="text-[0.6rem] font-medium tracking-[0.14em] uppercase text-ink-muted">
                  or enter area
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(43,36,28,0.08)" }} />
              </div>

              {/* Direct area */}
              <div style={{ marginBottom: "32px" }}>
                <NumberInput
                  label="Total Area"
                  value={directArea}
                  onChange={(v) => {
                    setDirectArea(v);
                    setLength("");
                    setWidth("");
                  }}
                  unit={unit === "ft" ? "sq ft" : "sq m"}
                  placeholder="120"
                />
              </div>

              {/* Tile size */}
              <div style={{ marginBottom: "28px" }}>
                <p
                  className="text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-muted"
                  style={{ marginBottom: "12px" }}
                >
                  Tile Size
                </p>
                <div className="grid grid-cols-3" style={{ gap: "8px" }}>
                  {TILE_DATA.map((t, i) => (
                    <button
                      key={t.size}
                      type="button"
                      onClick={() => setSelectedTile(i)}
                      className="text-center"
                      style={{
                        padding: "12px 8px",
                        borderRadius: "8px",
                        border: `1px solid ${selectedTile === i ? "var(--color-accent)" : "rgba(43,36,28,0.1)"}`,
                        background: selectedTile === i ? "var(--color-accent-subtle)" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      <p
                        className="font-medium"
                        style={{
                          fontSize: "0.8rem",
                          color: selectedTile === i ? "var(--color-accent)" : "var(--color-ink)",
                          transition: "color 0.3s",
                        }}
                      >
                        {t.label}
                      </p>
                      <p className="text-[0.55rem] text-ink-muted" style={{ marginTop: "2px" }}>
                        mm
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wastage */}
              <div>
                <p
                  className="text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-muted"
                  style={{ marginBottom: "10px" }}
                >
                  Wastage Allowance
                </p>
                <div className="flex" style={{ gap: "8px" }}>
                  {WASTAGE_OPTIONS.map((w) => (
                    <button
                      key={w.value}
                      type="button"
                      onClick={() => setWastage(w.value)}
                      className="flex-1 text-center"
                      style={{
                        padding: "10px 8px",
                        borderRadius: "6px",
                        border: `1px solid ${wastage === w.value ? "var(--color-accent)" : "rgba(43,36,28,0.1)"}`,
                        background: wastage === w.value ? "var(--color-accent-subtle)" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      <p
                        className="font-medium"
                        style={{
                          fontSize: "0.8rem",
                          color: wastage === w.value ? "var(--color-accent)" : "var(--color-ink)",
                          transition: "color 0.3s",
                        }}
                      >
                        {w.label}
                      </p>
                      <p className="text-[0.5rem] text-ink-muted" style={{ marginTop: "2px" }}>
                        {w.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — Results */}
          <FadeIn delay={0.1}>
            <div className="flex-1">
              {results ? (
                <div>
                  {/* Room area */}
                  <div style={{ marginBottom: "32px" }}>
                    <p
                      className="text-[0.6rem] font-medium tracking-[0.18em] uppercase text-ink-muted"
                      style={{ marginBottom: "8px" }}
                    >
                      Room Area
                    </p>
                    <p className="font-serif font-light text-ink" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}>
                      {results.areaSqft} <span className="text-ink-muted text-[0.8rem]">sq ft</span>
                      <span className="text-ink-muted text-[0.75rem]"> ({results.areaSqm} sq m)</span>
                    </p>
                  </div>

                  {/* Main result — tiles needed */}
                  <div
                    style={{
                      padding: "clamp(24px, 3vw, 40px)",
                      background: "var(--color-surface)",
                      borderRadius: "12px",
                      border: "1px solid rgba(43,36,28,0.06)",
                      marginBottom: "24px",
                    }}
                  >
                    <p
                      className="text-[0.6rem] font-medium tracking-[0.18em] uppercase text-ink-muted"
                      style={{ marginBottom: "12px" }}
                    >
                      Tiles Needed
                    </p>
                    <p
                      className="font-display font-light"
                      style={{
                        fontSize: "clamp(3rem, 6vw, 4.5rem)",
                        lineHeight: 1,
                        color: "var(--color-accent)",
                        marginBottom: "16px",
                      }}
                    >
                      {results.totalTiles}
                    </p>
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3"
                      style={{ gap: "16px" }}
                    >
                      <div>
                        <p className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                          Base Tiles
                        </p>
                        <p className="text-[1rem] text-ink font-light">{results.tilesNeeded}</p>
                      </div>
                      <div>
                        <p className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                          Wastage ({wastage}%)
                        </p>
                        <p className="text-[1rem] text-ink font-light">+{results.wastageExtra}</p>
                      </div>
                      <div>
                        <p className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                          Tile Size
                        </p>
                        <p className="text-[1rem] text-ink font-light">{tile.size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Boxes */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      padding: "20px 24px",
                      background: "var(--color-surface)",
                      borderRadius: "10px",
                      border: "1px solid rgba(43,36,28,0.06)",
                      marginBottom: "32px",
                    }}
                  >
                    <div>
                      <p className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                        Boxes to Buy
                      </p>
                      <p className="font-display font-light text-ink" style={{ fontSize: "1.8rem", lineHeight: 1 }}>
                        {results.boxesNeeded}
                      </p>
                    </div>
                    <p className="text-[0.7rem] text-ink-muted">
                      {tile.tilesPerBox} tiles per box
                    </p>
                  </div>

                  {/* Gold divider */}
                  <div
                    style={{
                      width: "clamp(60px, 10vw, 100px)",
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent) 70%, transparent)",
                      marginBottom: "32px",
                    }}
                  />

                  {/* Actions */}
                  <div className="flex flex-wrap items-center" style={{ gap: "16px" }}>
                    <a
                      href={`mailto:sales@primeceramics.com.np?subject=Tile%20Quote%20Request&body=${encodeURIComponent(quoteBody)}`}
                      className="btn-gold group"
                    >
                      Request a Quote
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="btn-line group"
                      style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied!" : "Copy Result"}
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty state — no input yet */
                <div
                  className="flex flex-col items-center justify-center text-center"
                  style={{
                    padding: "clamp(60px, 8vw, 100px) 24px",
                    background: "var(--color-surface)",
                    borderRadius: "12px",
                    border: "1px solid rgba(43,36,28,0.06)",
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      border: "1px solid rgba(181,138,82,0.2)",
                      marginBottom: "24px",
                    }}
                  >
                    <p className="font-display font-light text-accent" style={{ fontSize: "1.4rem" }}>?</p>
                  </div>
                  <p
                    className="font-serif font-light text-ink-muted"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", marginBottom: "12px" }}
                  >
                    Enter your room dimensions
                  </p>
                  <p className="text-[0.8rem] text-ink-muted" style={{ maxWidth: "320px", lineHeight: 1.6 }}>
                    Fill in the length and width — or enter total area directly.
                    Results will appear here instantly.
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
