"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import { ZoomIn } from "lucide-react";
import { tileImageCropStyle, tileImageFrameStyle } from "@/lib/utils";

/**
 * Hi-res panel target width. The panel renders at ~580 px on desktop with up
 * to 2.25× zoom → effective max resolution ~1305 px. 1400 gives a small
 * safety margin without paying for pixels the screen can't show.
 */
const HI_RES_W = 1400;

/**
 * Sanity CDN serves on-the-fly resizing via the `w` query param. The catalog
 * stores small variants (`?w=800`) for fast catalog/modal loads. The zoom
 * panel needs more pixels to stay sharp under magnification, so it requests a
 * larger variant from the same source URL only on demand.
 *
 * When `aspect` is provided, the URL also asks Sanity to crop to that ratio
 * (`fit=crop`). This matches the thumbnail's `object-fit: cover` semantics so
 * the zoom panel doesn't stretch a non-square photo into a square footprint.
 */
function highResVariant(
  src: string,
  w = HI_RES_W,
  aspect?: { w: number; h: number },
): string {
  if (!src || !src.includes("cdn.sanity.io")) return src;
  try {
    const u = new URL(src);
    u.searchParams.set("w", String(w));
    if (aspect && aspect.w > 0 && aspect.h > 0) {
      const h = Math.round((w * aspect.h) / aspect.w);
      u.searchParams.set("h", String(h));
      u.searchParams.set("fit", "crop");
    }
    return u.toString();
  } catch {
    return src;
  }
}

/**
 * Fire-and-forget pre-fetch of the hi-res zoom variant. Call this when the
 * user expresses intent to view a tile (e.g. hovering its card) so the image
 * is already in browser cache by the time the modal opens. Cheap to call
 * repeatedly — browsers dedupe identical URLs.
 */
export function prewarmTileZoomImage(
  src: string,
  cropAspect?: { w: number; h: number },
): void {
  if (!src) return;
  const hiRes = highResVariant(src, HI_RES_W, cropAspect);
  if (hiRes === src) return;
  const img = new Image();
  img.src = hiRes;
}

interface ZoomContextValue {
  src: string;
  zoom: number;
  active: boolean;
  pos: { x: number; y: number };
  size: { w: number; h: number };
  cropAspect?: { w: number; h: number };
  setActive: (a: boolean) => void;
  setPos: (p: { x: number; y: number }) => void;
  setSize: (s: { w: number; h: number }) => void;
}

const Ctx = createContext<ZoomContextValue | null>(null);

// Smaller tiles take less zoom (source pixels show through sooner); large-format
// tiles can hold more zoom because their pattern repeats stay readable.
const TILE_ZOOM: Record<string, number> = {
  "300×300 mm": 2.0,
  "300×450 mm": 2.0,
  "300×600 mm": 2.0,
  "400×400 mm": 2.25,
  "600×600 mm": 2.25,
  "600×1200 mm": 2.5,
};

export function zoomForTileSize(size: string): number {
  return TILE_ZOOM[size] ?? 2.25;
}

export function TileZoomProvider({
  children,
  src,
  zoom = 3,
  cropAspect,
}: {
  children: React.ReactNode;
  src: string;
  zoom?: number;
  /**
   * When set, the hi-res panel variant is requested cropped to this aspect
   * ratio. This keeps the zoom view aligned with the thumbnail's
   * `object-fit: cover` for tiles whose source photo isn't already in the
   * tile's physical aspect ratio (e.g. square 600×600 tiles served from
   * non-square photos).
   */
  cropAspect?: { w: number; h: number };
}) {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Reset hover when the underlying tile swaps (e.g. user picks a similar tile)
  useEffect(() => {
    setActive(false);
  }, [src]);

  // Pre-load the hi-res panel variant so the first hover is instant — no
  // blank/loading flash while the larger image fetches from the CDN.
  useEffect(() => {
    if (!src) return;
    const hiRes = highResVariant(src, HI_RES_W, cropAspect);
    if (hiRes === src) return;
    const img = new Image();
    img.src = hiRes;
  }, [src, cropAspect?.w, cropAspect?.h]);

  return (
    <Ctx.Provider
      value={{ src, zoom, active, pos, size, cropAspect, setActive, setPos, setSize }}
    >
      {children}
    </Ctx.Provider>
  );
}

function useZoomCtx() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Tile zoom requires <TileZoomProvider>");
  return ctx;
}

export function useTileZoomActive() {
  return useZoomCtx().active;
}

export function TileZoomSource({
  alt,
  showHint = true,
}: {
  alt: string;
  showHint?: boolean;
}) {
  const { src, zoom, active, pos, size, setActive, setPos, setSize } =
    useZoomCtx();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      if (size.w !== rect.width || size.h !== rect.height) {
        setSize({ w: rect.width, h: rect.height });
      }
    },
    [size.w, size.h, setPos, setSize],
  );

  // Lens is ALWAYS square so it maps cleanly into the always-square panel.
  // Side = the source's smaller dimension. For square tiles this means the
  // lens covers the entire source (panel shows the full tile). For rectangles
  // (e.g. 600×1200 = 1:2 portrait) the lens covers half the tile by area,
  // and the cursor picks which half is shown.
  const lensSide = size.w > 0 && size.h > 0 ? Math.min(size.w, size.h) : 0;
  const lensW = lensSide;
  const lensH = lensSide;
  const lensX = Math.max(0, Math.min(size.w - lensW, pos.x - lensW / 2));
  const lensY = Math.max(0, Math.min(size.h - lensH, pos.y - lensH / 2));
  const lensCoversSource = size.w > 0 && size.h > 0 && lensW >= size.w - 0.5 && lensH >= size.h - 0.5;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ cursor: "zoom-in" }}
      onMouseEnter={() => setActive(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => setActive(false)}
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="block"
        style={{ ...tileImageCropStyle, pointerEvents: "none" }}
      />

      {showHint && (
        <div
          aria-hidden="true"
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "12px",
            left: "12px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            opacity: active ? 0 : 1,
            transition: "opacity 0.3s linear",
            zIndex: 2,
          }}
        >
          <ZoomIn size={14} className="text-accent" />
        </div>
      )}

      {/* Square lens region indicator — only shown for rectangular tiles where
          moving the cursor changes which half of the tile is magnified. For
          square tiles the lens already covers the whole source, so no marker. */}
      {!lensCoversSource && (
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: `${lensW}px`,
            height: `${lensH}px`,
            left: `${lensX}px`,
            top: `${lensY}px`,
            background: "rgba(255,255,255,0.28)",
            border: "1.5px solid var(--color-accent)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.18)",
            opacity: active && size.w > 0 ? 1 : 0,
            transition: "opacity 0.18s linear",
            zIndex: 3,
          }}
        />
      )}
    </div>
  );
}

/**
 * Fades in over a region (typically the right details column) while the user
 * is hovering the source image. Hides whatever is underneath so the zoom panel
 * reads as a clean preview surface, not a card pasted on top of content.
 */
export function TileZoomBackdrop({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { active, size } = useZoomCtx();
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        background: "var(--color-surface)",
        opacity: active && size.w > 0 ? 1 : 0,
        transition: "opacity 0.25s linear",
        ...style,
      }}
    />
  );
}

interface PanelProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * When provided, the panel sizes itself to match this tile's physical aspect
   * ratio via `tileImageFrameStyle` (resolves against `--tile-base` on the
   * nearest ancestor). When omitted, the panel falls back to filling its
   * parent via `position: absolute; inset: 0`.
   */
  tileSize?: string;
}

export function TileZoomPanel({ className = "", style, tileSize }: PanelProps) {
  const { src, active, pos, size, cropAspect } = useZoomCtx();
  const parentRef = useRef<HTMLDivElement>(null);
  const [squareSide, setSquareSide] = useState(0);

  // Measure the parent to compute the largest square that fits inside it.
  useLayoutEffect(() => {
    const node = parentRef.current?.parentElement;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      const side = Math.min(rect.width, rect.height);
      setSquareSide((prev) => (prev === side ? prev : side));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  // Lens is always square: side = source's smaller dimension.
  const lensSide = size.w > 0 && size.h > 0 ? Math.min(size.w, size.h) : 0;
  const cx = Math.max(lensSide / 2, Math.min(size.w - lensSide / 2, pos.x));
  const cy = Math.max(lensSide / 2, Math.min(size.h - lensSide / 2, pos.y));

  // Scale the source into the square panel.
  const panelSide = squareSide > 32 ? squareSide - 32 : squareSide; // 16px padding
  const scale = lensSide > 0 ? panelSide / lensSide : 0;
  const bgW = size.w * scale;
  const bgH = size.h * scale;
  const bgX = panelSide / 2 - cx * scale;
  const bgY = panelSide / 2 - cy * scale;

  const hiResSrc = highResVariant(src, HI_RES_W, cropAspect);

  return (
    <div
      ref={parentRef}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{
        position: "relative",
        width: `${panelSide}px`,
        height: `${panelSide}px`,
        flexShrink: 0,
        backgroundImage: hiResSrc ? `url(${hiResSrc})` : undefined,
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "var(--color-surface-alt)",
        borderRadius: "8px",
        opacity: active && size.w > 0 && panelSide > 0 ? 1 : 0,
        transition: "opacity 0.3s linear",
        ...style,
      }}
    />
  );
}
