"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.5 = slower than scroll, 1.5 = faster
  direction?: "vertical" | "horizontal";
}

export default function ParallaxLayer({
  children,
  className = "",
  speed = 0.5,
  direction = "vertical",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const distance = (speed - 1) * 100;
    const prop = direction === "vertical" ? "y" : "x";

    const tween = gsap.fromTo(
      el,
      { [prop]: -distance },
      {
        [prop]: distance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
