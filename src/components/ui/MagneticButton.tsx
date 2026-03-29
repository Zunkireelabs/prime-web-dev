"use client";

import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setTransform(`translate(${x}px, ${y}px)`);
  };

  const onLeave = () => setTransform("translate(0px, 0px)");

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref as any}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform,
        transition: "transform 0.3s linear",
      }}
      data-hover
    >
      {children}
    </Tag>
  );
}
