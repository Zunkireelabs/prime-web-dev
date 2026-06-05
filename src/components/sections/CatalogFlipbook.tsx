"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  slug: string;
  pages: number;
  name: string;
}

const pageSrc = (slug: string, n: number) => `/catalogs/pages/${slug}/${n}.webp`;

export default function CatalogFlipbook({ slug, pages, name }: Props) {
  // Page aspect ratio (height / width) detected from the first page image.
  const [ratio, setRatio] = useState(1.414); // default A4 portrait
  const [current, setCurrent] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 0) setRatio(img.naturalHeight / img.naturalWidth);
    };
    img.src = pageSrc(slug, 1);
  }, [slug]);

  const BASE_WIDTH = 550;
  const flip = (dir: -1 | 1) => {
    const api = bookRef.current?.pageFlip?.();
    if (!api) return;
    if (dir === 1) api.flipNext();
    else api.flipPrev();
  };

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{ padding: "clamp(16px, 3vw, 40px) var(--spacing-gutter)" }}
    >
      <div className="w-full" style={{ maxWidth: "1100px" }}>
        <HTMLFlipBook
          ref={bookRef}
          width={BASE_WIDTH}
          height={Math.round(BASE_WIDTH * ratio)}
          size="stretch"
          minWidth={300}
          maxWidth={550}
          minHeight={420}
          maxHeight={Math.round(550 * ratio)}
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={700}
          useMouseEvents={true}
          className="mx-auto"
          style={{}}
          startPage={0}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={(e: { data: number }) => setCurrent(e.data)}
        >
          {Array.from({ length: pages }, (_, i) => (
            <div
              key={i}
              className="bg-white overflow-hidden"
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={pageSrc(slug, i + 1)}
                alt={`${name} — page ${i + 1}`}
                loading={i < 4 ? "eager" : "lazy"}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div className="flex items-center" style={{ gap: "24px", marginTop: "clamp(20px, 3vw, 32px)" }}>
        <button
          onClick={() => flip(-1)}
          aria-label="Previous page"
          className="flex items-center justify-center text-ink-on-dark-muted hover:text-accent-light transition-colors disabled:opacity-30"
          disabled={current === 0}
          style={{ width: "40px", height: "40px", border: "1px solid rgba(181,138,82,0.25)", borderRadius: "50%" }}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-[0.7rem] tracking-[0.14em] uppercase text-ink-on-dark-muted tabular-nums">
          {Math.min(current + 1, pages)} / {pages}
        </span>
        <button
          onClick={() => flip(1)}
          aria-label="Next page"
          className="flex items-center justify-center text-ink-on-dark-muted hover:text-accent-light transition-colors disabled:opacity-30"
          disabled={current >= pages - 1}
          style={{ width: "40px", height: "40px", border: "1px solid rgba(181,138,82,0.25)", borderRadius: "50%" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
