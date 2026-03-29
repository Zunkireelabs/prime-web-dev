"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[data-hover]")
      ) {
        setHovering(true);
      }
    };

    const onOut = () => setHovering(false);

    const raf = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9998] pointer-events-none hidden lg:block mix-blend-difference"
      aria-hidden="true"
    >
      <div
        className="rounded-full bg-white transition-[width,height] duration-300 ease-out"
        style={{
          width: hovering ? 64 : 12,
          height: hovering ? 64 : 12,
          marginLeft: hovering ? -32 : -6,
          marginTop: hovering ? -32 : -6,
        }}
      />
    </div>
  );
}
