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
 * Width percentage for the image container based on physical tile width.
 * 300mm tiles = 55%, 400mm = 70%, 600mm = 90%.
 * Creates visual size difference between same-ratio tiles.
 */
const TILE_WIDTH_SCALE: Record<string, string> = {
  "300×300 mm": "55%",
  "300×450 mm": "55%",
  "300×600 mm": "55%",
  "400×400 mm": "70%",
  "600×600 mm": "90%",
  "600×1200 mm": "70%",
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
 * Fixed card height per tile size — ensures every size looks visually distinct.
 * Heights scale proportionally to real physical dimensions.
 * Used in grids where aspect-ratio alone can't differentiate same-ratio tiles.
 */
const TILE_CARD_HEIGHT: Record<string, string> = {
  "300×300 mm": "200px",
  "300×450 mm": "280px",
  "300×600 mm": "380px",
  "400×400 mm": "260px",
  "600×600 mm": "380px",
  "600×1200 mm": "520px",
};

export function tileCardHeight(size: string): string {
  return TILE_CARD_HEIGHT[size] || "260px";
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
