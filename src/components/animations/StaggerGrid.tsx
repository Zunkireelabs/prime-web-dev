"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface StaggerGridProps {
  children: ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  staggerMs?: number;
  maxDelayMs?: number;
}

export default function StaggerGrid({
  children,
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
            key={i}
            style={{
              opacity: triggered ? 1 : 0,
              transform: triggered ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
              transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
              willChange: triggered ? "auto" : "opacity, transform",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
