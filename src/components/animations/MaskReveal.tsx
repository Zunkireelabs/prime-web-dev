"use client";

import { useEffect, useRef, useState } from "react";

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
  threshold?: number;
}

export default function MaskReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.2,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const revealClass =
    direction === "up"
      ? "reveal-up"
      : direction === "left"
        ? "reveal-left"
        : "reveal-right";

  return (
    <div
      ref={ref}
      className={`${revealClass} ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
