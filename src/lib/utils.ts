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

/** All standard tile sizes in order */
export const ALL_TILE_SIZES = [
  "300×300 mm",
  "300×450 mm",
  "300×600 mm",
  "400×400 mm",
  "600×600 mm",
  "600×1200 mm",
];
