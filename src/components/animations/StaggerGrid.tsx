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

interface StaggerItemProps {
  children: ReactNode;
  delay: number;
  enabled: boolean;
}

function StaggerItem({ children, delay, enabled }: StaggerItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || visible) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [enabled, visible]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: !visible ? "opacity, transform" : "auto",
      }}
    >
      {children}
    </div>
  );
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
  const [intersected, setIntersected] = useState(false);
  const prevCountRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: "60px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const prevCount = prevCountRef.current;
  useEffect(() => {
    prevCountRef.current = children.length;
  });

  return (
    <div ref={containerRef} className={className} style={style}>
      {children.map((child, i) => {
        const localIndex = i < prevCount ? i : i - prevCount;
        const delay = Math.min(localIndex * staggerMs, maxDelayMs);
        return (
          <StaggerItem
            key={keys?.[i] ?? i}
            delay={delay}
            enabled={intersected}
          >
            {child}
          </StaggerItem>
        );
      })}
    </div>
  );
}
