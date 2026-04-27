import type { CSSProperties } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse a tile size string like "300×600 mm" and return
 * the CSS aspect-ratio value as "width / height" (e.g. "1 / 2").
 * Falls back to "4 / 5" if parsing fails.
 */
export function tileAspectRatio(size: string): string {
  const match = size.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (!match) return "4 / 5";
  const w = parseInt(match[1], 10);
  const h = parseInt(match[2], 10);
  return `${w} / ${h}`;
}

/**
 * Real physical aspect ratio per tile size.
 */
export function tileVisualRatio(size: string): string {
  return tileAspectRatio(size);
}

/**
 * Width percentage for the image container based on physical tile dimensions.
 * Tuned so every standard size has a visually distinct footprint inside a fixed-width card.
 * Hierarchy goes 300×300 (smallest) → 600×600 (largest square).
 */
const TILE_WIDTH_SCALE: Record<string, string> = {
  "300×300 mm": "44%",
  "300×450 mm": "50%",
  "300×600 mm": "54%",
  "400×400 mm": "64%",
  "600×600 mm": "92%",
  "600×1200 mm": "60%",
};

export function tileContainerWidth(size: string): string {
  return TILE_WIDTH_SCALE[size] || "70%";
}

/**
 * Grid column span based on tile physical width.
 * Makes each size visually distinct in the grid:
 * - 300mm tiles: 1 column (small)
 * - 400mm tiles: 1 column (medium — differentiated by aspect ratio)
 * - 600mm tiles: 2 columns (large — visually bigger)
 */
export function tileGridColSpan(size: string): number {
  const match = size.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (!match) return 1;
  const w = parseInt(match[1], 10);
  return w >= 600 ? 2 : 1;
}

/**
 * Card outer-frame height. Uniform across sizes so cards align in grids and
 * marquees; the inner image varies by `tileVisualRatio` + `tileContainerWidth`
 * to communicate the tile's real proportions and physical scale.
 *
 * The legacy size-keyed argument is accepted but ignored.
 */
export function tileCardHeight(_size?: string): string {
  return "clamp(320px, 30vw, 420px)";
}

/**
 * Inline style for the inner image container inside a fixed-frame card.
 * - aspectRatio = real tile shape (e.g. 1/1, 1/2, 2/3)
 * - width      = physical-size scale (% of frame width)
 * - maxHeight  = keeps image inside the frame for portrait tiles
 *
 * Use inside a `flex items-center justify-center` parent so the image centers
 * with proportional negative space around it.
 */
export function tileImageFrameStyle(size: string): CSSProperties {
  return {
    width: tileContainerWidth(size),
    aspectRatio: tileVisualRatio(size),
    maxHeight: "92%",
    position: "relative",
    overflow: "hidden",
  };
}

/** All standard tile sizes in order */
export const ALL_TILE_SIZES = [
  "300×300 mm",
  "300×450 mm",
  "300×600 mm",
  "400×400 mm",
  "600×600 mm",
  "600×1200 mm",
];
