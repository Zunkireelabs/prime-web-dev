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
