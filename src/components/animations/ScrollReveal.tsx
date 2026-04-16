"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  from = { y: 50, opacity: 0 },
  to = { y: 0, opacity: 1 },
  scrub = true,
  start = "top 85%",
  end = "top 40%",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety fallback: ensure content is visible even if ScrollTrigger fails
    const fallback = setTimeout(() => {
      if (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    }, 4000);

    const tween = gsap.fromTo(el, from, {
      ...to,
      delay,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        toggleActions: scrub ? undefined : "play none none none",
      },
    });

    return () => {
      clearTimeout(fallback);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [from, to, scrub, start, end, delay]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
