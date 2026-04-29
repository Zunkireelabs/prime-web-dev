import type { CSSProperties } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Tile sizing — true physical scale.
 *
 * The reference dimension is 1200 mm (the longest standard side, e.g. 600×1200).
 * A CSS variable `--tile-base` defines what 1200 mm looks like in pixels for
 * a given context. Each tile's inner frame derives both its width and height
 * from physical mm:
 *
 *   width  = var(--tile-base) × (physicalWidth  / 1200)
 *   height = var(--tile-base) × (physicalHeight / 1200)
 *
 * Result: every standard size is visually distinct and physically correct.
 *   - 600×600  → 0.5 × 0.5  (medium square)
 *   - 300×600  → 0.25 × 0.5 (half the width of 600×600, same height)
 *   - 600×1200 → 0.5 × 1.0  (same width as 600×600, twice the height)
 *   - 400×400  → 0.33 × 0.33
 *   - 300×450  → 0.25 × 0.375
 *   - 300×300  → 0.25 × 0.25 (smallest)
 */

const REF_DIM_MM = 1200;

const TILE_DIMS: Record<string, { w: number; h: number }> = {
  "300×300 mm": { w: 300, h: 300 },
  "300×450 mm": { w: 300, h: 450 },
  "300×600 mm": { w: 300, h: 600 },
  "400×400 mm": { w: 400, h: 400 },
  "600×600 mm": { w: 600, h: 600 },
  "600×1200 mm": { w: 600, h: 1200 },
};

function parseTileDims(size: string): { w: number; h: number } {
  if (TILE_DIMS[size]) return TILE_DIMS[size];
  const m = size.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (m) return { w: parseInt(m[1], 10), h: parseInt(m[2], 10) };
  return { w: 600, h: 600 };
}

/**
 * CSS aspect-ratio string ("w / h") — kept for callers that still need a raw ratio.
 */
export function tileAspectRatio(size: string): string {
  const { w, h } = parseTileDims(size);
  return `${w} / ${h}`;
}

export function tileVisualRatio(size: string): string {
  return tileAspectRatio(size);
}

/**
 * Width of the inner image frame as a CSS expression.
 * Resolves against `--tile-base` on the nearest ancestor (with a sensible
 * fallback so callers that forget to set it still render reasonably).
 */
export function tileContainerWidth(size: string): string {
  const { w } = parseTileDims(size);
  return `calc(var(--tile-base, clamp(280px, 30vw, 380px)) * ${w / REF_DIM_MM})`;
}

/**
 * Height of the inner image frame as a CSS expression.
 * Pairs with `tileContainerWidth` for true physical scaling.
 */
export function tileContainerHeight(size: string): string {
  const { h } = parseTileDims(size);
  return `calc(var(--tile-base, clamp(280px, 30vw, 380px)) * ${h / REF_DIM_MM})`;
}

/**
 * Grid column span based on tile physical width.
 * 600 mm tiles span 2 columns so wider tiles read as wider in dense grids.
 */
export function tileGridColSpan(size: string): number {
  const { w } = parseTileDims(size);
  return w >= 600 ? 2 : 1;
}

/**
 * Card outer-frame height. Sized to fit a 1200 mm tile (tallest) plus
 * breathing room above/below for badges and centering.
 *
 * Pair this with `tileCardCSSVars()` on the same element so child frames
 * resolve `--tile-base` correctly.
 */
export function tileCardHeight(_size?: string): string {
  return "clamp(360px, 32vw, 460px)";
}

/**
 * CSS variable bundle for card outer frames.
 * `--tile-base` defines the visual size in px corresponding to a 1200 mm tile.
 * Apply via `style={{ ...tileCardCSSVars() }}` on the card's outer image div.
 */
export function tileCardCSSVars(): CSSProperties {
  return {
    // 1200 mm reference. Slightly smaller than card height so the tallest
    // tile has padding above/below.
    ["--tile-base" as never]: "clamp(310px, 28vw, 400px)",
  };
}

/**
 * Inline style for the inner image container. Width and height both scale
 * from physical mm via `--tile-base`. Pair this with a flex-centered parent
 * so the image sits centered with proportional negative space around it.
 */
export function tileImageFrameStyle(size: string): CSSProperties {
  return {
    width: tileContainerWidth(size),
    height: tileContainerHeight(size),
    position: "relative",
    overflow: "hidden",
  };
}

/**
 * "Showcase" sizing — for views that display a single tile at large scale
 * (e.g. product detail modal). The longest physical side maps to a percentage
 * of `--tile-base` between `longestPctMin` (300 mm tile) and `longestPctMax`
 * (1200 mm tile); the shorter side scales proportionally so each tile's own
 * w:h is preserved.
 *
 * - With `longestPctMin === longestPctMax` (default): every tile fills the
 *   panel uniformly. Same-ratio tiles render identically.
 * - With `longestPctMin < longestPctMax`: a soft physical scale — smaller
 *   tiles render visibly smaller, but with a higher floor than the strict
 *   physical scale used by `tileImageFrameStyle`. Use this for showcases
 *   that need *some* size differentiation without making 300 mm tiles tiny.
 *
 * `tileImageFrameStyle` (strict cross-tile physical truth) is the right
 * call for catalog/grid views where size comparison is the point.
 */
export function tileShowcaseFrameStyle(
  size: string,
  longestPctMax = 80,
  longestPctMin = longestPctMax,
): CSSProperties {
  const { w, h } = parseTileDims(size);
  const longest = Math.max(w, h);
  // Map longest physical dim (300–1200 mm) to a pct between min..max.
  const t = Math.max(0, Math.min(1, (longest - 300) / 900));
  const longestPct = longestPctMin + t * (longestPctMax - longestPctMin);
  const wPct = (w / longest) * (longestPct / 100);
  const hPct = (h / longest) * (longestPct / 100);
  const base = "var(--tile-base, clamp(280px, 30vw, 380px))";
  return {
    width: `calc(${base} * ${wPct})`,
    height: `calc(${base} * ${hPct})`,
    position: "relative",
    overflow: "hidden",
  };
}

/**
 * Pixel dimensions for a small tile-shape icon (size-picker, mini reference).
 * Uses the same physical-mm → px rule as the main image frame, so picker
 * icons stay consistent with how the actual tile cards render.
 *
 * `basePx` is the visual size in px corresponding to a 1200 mm tile.
 * Default 48 keeps icons compact for inline pickers; pass a larger value
 * for callers that want more visual weight.
 */
export function tilePickerSize(size: string, basePx = 48): { w: number; h: number } {
  const { w, h } = parseTileDims(size);
  return {
    w: (w / REF_DIM_MM) * basePx,
    h: (h / REF_DIM_MM) * basePx,
  };
}

/**
 * Catalog tile photos often have manufacturer artifacts baked in: a black
 * brand banner / product label at the bottom (~10% of image height) and
 * thin frame edges. `tileImageCropStyle` overscales the inner <img> and
 * offsets it upward so those artifacts fall outside the parent's
 * `overflow: hidden` area.
 *
 * Apply to a positioned `<img>` inside a `position: relative; overflow: hidden`
 * parent. Pair with `TILE_IMAGE_CROP` when you also need to drive zoom-lens
 * background math (see TileLens).
 */
export const TILE_IMAGE_CROP = {
  top: 0.03,
  bottom: 0.10,
  left: 0.04,
  right: 0.04,
} as const;

export const tileImageCropStyle: CSSProperties = {
  position: "absolute",
  // Overscale = 100% + (cropOpposite + cropThis), offset = -cropThis
  width: `${(1 + TILE_IMAGE_CROP.left + TILE_IMAGE_CROP.right) * 100}%`,
  height: `${(1 + TILE_IMAGE_CROP.top + TILE_IMAGE_CROP.bottom) * 100}%`,
  left: `${-TILE_IMAGE_CROP.left * 100}%`,
  top: `${-TILE_IMAGE_CROP.top * 100}%`,
  objectFit: "cover",
};

/** All standard tile sizes in order */
export const ALL_TILE_SIZES = [
  "300×300 mm",
  "300×450 mm",
  "300×600 mm",
  "400×400 mm",
  "600×600 mm",
  "600×1200 mm",
];
