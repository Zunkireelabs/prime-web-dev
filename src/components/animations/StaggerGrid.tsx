"use client";

import { useEffect, useRef, useState, type ReactNode, type Key } from "react";

interface StaggerGridProps {
  children: ReactNode[];
  keys?: Key[];
  className?: string;
  style?: React.CSSProperties;
  staggerMs?: number;
  maxDelayMs?: number;
}

export default function StaggerGrid({
  children,
  keys,
  className,
  style,
  staggerMs = 60,
  maxDelayMs = 600,
}: StaggerGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setTriggered(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { rootMargin: "60px 0px", threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [children.length]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children.map((child, i) => {
        const delay = Math.min(i * staggerMs, maxDelayMs);
        return (
          <div
            key={keys?.[i] ?? i}
            style={{
              opacity: triggered ? 1 : 0,
              transform: triggered ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
              willChange: !triggered ? "opacity, transform" : "auto",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
