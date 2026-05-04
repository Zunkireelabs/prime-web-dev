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
 * Sanity CDN serves on-the-fly resizing via the `w` query param. The catalog
 * stores small variants (`?w=800`) for fast catalog/modal loads. The zoom
 * panel needs more pixels to stay sharp under magnification, so it requests a
 * larger variant from the same source URL only on demand.
 */
function highResVariant(src: string, w = 2000): string {
  if (!src || !src.includes("cdn.sanity.io")) return src;
  try {
    const u = new URL(src);
    u.searchParams.set("w", String(w));
    return u.toString();
  } catch {
    return src;
  }
}

interface ZoomContextValue {
  src: string;
  zoom: number;
  active: boolean;
  pos: { x: number; y: number };
  size: { w: number; h: number };
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
}: {
  children: React.ReactNode;
  src: string;
  zoom?: number;
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
    const hiRes = highResVariant(src, 2000);
    if (hiRes === src) return;
    const img = new Image();
    img.src = hiRes;
  }, [src]);

  return (
    <Ctx.Provider
      value={{ src, zoom, active, pos, size, setActive, setPos, setSize }}
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

  const lensW = size.w / zoom;
  const lensH = size.h / zoom;
  const lensX = Math.max(0, Math.min(size.w - lensW, pos.x - lensW / 2));
  const lensY = Math.max(0, Math.min(size.h - lensH, pos.y - lensH / 2));

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

      {/* Square lens region indicator — Amazon-style */}
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
  const { src, zoom, active, pos, size } = useZoomCtx();
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelSize, setPanelSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      setPanelSize((prev) =>
        prev.w === rect.width && prev.h === rect.height
          ? prev
          : { w: rect.width, h: rect.height },
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const lensW = size.w / zoom;
  const lensH = size.h / zoom;
  const cx = Math.max(lensW / 2, Math.min(size.w - lensW / 2, pos.x));
  const cy = Math.max(lensH / 2, Math.min(size.h - lensH / 2, pos.y));

  // Uniform scale chosen so the lens region fits fully within the panel along
  // its binding dimension; the other dimension shows surrounding source
  // context. Using min() keeps the source's aspect ratio intact — without it,
  // tall tiles get stretched into the squarer panel rectangle.
  const scale =
    lensW > 0 && lensH > 0
      ? Math.min(panelSize.w / lensW, panelSize.h / lensH)
      : 0;
  const bgW = size.w * scale;
  const bgH = size.h * scale;
  const bgX = panelSize.w / 2 - cx * scale;
  const bgY = panelSize.h / 2 - cy * scale;

  const hiResSrc = highResVariant(src, 2000);
  const sizingStyle: CSSProperties = tileSize
    ? tileImageFrameStyle(tileSize)
    : { position: "absolute", inset: 0 };

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{
        ...sizingStyle,
        backgroundImage: hiResSrc ? `url(${hiResSrc})` : undefined,
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "var(--color-surface)",
        opacity: active && size.w > 0 ? 1 : 0,
        transition: "opacity 0.3s linear",
        ...style,
      }}
    />
  );
}
