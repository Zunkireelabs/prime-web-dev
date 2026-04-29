"use client";

import { useCallback, useRef, useState } from "react";
import { ZoomIn } from "lucide-react";

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
 * Touch devices receive no mouse events, so the lens stays hidden — the
 * underlying image still renders normally.
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

  const xPct = size.w > 0 ? pos.x / size.w : 0;
  const yPct = size.h > 0 ? pos.y / size.h : 0;
  const zoomedW = size.w * zoom;
  const zoomedH = size.h * zoom;
  const bgX = lensSize / 2 - xPct * zoomedW;
  const bgY = lensSize / 2 - yPct * zoomedH;

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
        className="w-full h-full object-cover block"
        style={{ pointerEvents: "none" }}
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
        }}
      />
    </div>
  );
}
