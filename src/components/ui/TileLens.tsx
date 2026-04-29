"use client";

import { useCallback, useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import { TILE_IMAGE_CROP, tileImageCropStyle } from "@/lib/utils";

interface TileLensProps {
  src: string;
  alt: string;
  /** Zoom factor inside the lens. 2.5 reads grain clearly without pixelating tile photos. */
  zoom?: number;
  /** Lens diameter in pixels. */
  lensSize?: number;
  /** Show the small magnifier hint badge in the top-left corner when idle. */
  showHint?: boolean;
}

/**
 * Circle loupe that follows the cursor over a tile image. The lens shows
 * a zoomed-in slice of the image at `zoom`× the rendered source size.
 *
 * The visible image is cropped via `tileImageCropStyle` to hide manufacturer
 * watermarks/banners. The loupe applies the same crop math so the magnified
 * view stays in the cropped pattern area and never reveals the banner.
 *
 * Touch devices receive no mouse events, so the lens stays hidden — the
 * underlying image still renders normally (cropped).
 */
export default function TileLens({
  src,
  alt,
  zoom = 2.5,
  lensSize = 130,
  showHint = true,
}: TileLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: 0, h: 0 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (size.w !== rect.width || size.h !== rect.height) {
      setSize({ w: rect.width, h: rect.height });
    }
  }, [size.w, size.h]);

  // Cursor coords as fractions of the visible (cropped) area
  const xPct = size.w > 0 ? pos.x / size.w : 0;
  const yPct = size.h > 0 ? pos.y / size.h : 0;

  // Visible window covers (1 - left - right) horizontally and similar vertically
  // of the source image. Map cursor coords back into source-image coords.
  const visW = 1 - TILE_IMAGE_CROP.left - TILE_IMAGE_CROP.right;
  const visH = 1 - TILE_IMAGE_CROP.top - TILE_IMAGE_CROP.bottom;
  const sourceXPct = TILE_IMAGE_CROP.left + xPct * visW;
  const sourceYPct = TILE_IMAGE_CROP.top + yPct * visH;

  // The full source image, if rendered at the same scale as the cropped view,
  // would occupy size.w / visW × size.h / visH px.
  const sourceFullW = size.w / visW;
  const sourceFullH = size.h / visH;
  const zoomedW = sourceFullW * zoom;
  const zoomedH = sourceFullH * zoom;
  const bgX = lensSize / 2 - sourceXPct * zoomedW;
  const bgY = lensSize / 2 - sourceYPct * zoomedH;

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

      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: `${lensSize}px`,
          height: `${lensSize}px`,
          left: `${pos.x - lensSize / 2}px`,
          top: `${pos.y - lensSize / 2}px`,
          borderRadius: "50%",
          border: "1px solid var(--color-accent)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.22)",
          backgroundImage: `url(${src})`,
          backgroundSize: `${zoomedW}px ${zoomedH}px`,
          backgroundPosition: `${bgX}px ${bgY}px`,
          backgroundRepeat: "no-repeat",
          opacity: active && size.w > 0 ? 1 : 0,
          transition: "opacity 0.3s linear",
          zIndex: 3,
        }}
      />
    </div>
  );
}
