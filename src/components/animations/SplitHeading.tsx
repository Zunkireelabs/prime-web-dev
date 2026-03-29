"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitHeadingProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  stagger?: number;
}

export default function SplitHeading({
  children,
  as: Tag = "h2",
  className = "",
  stagger = 0.08,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll(".split-word");

    gsap.fromTo(
      words,
      {
        y: "110%",
        rotateX: -40,
        opacity: 0,
      },
      {
        y: "0%",
        rotateX: 0,
        opacity: 1,
        duration: 1,
        stagger,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, stagger]);

  const words = children.split(" ");

  return (
    <Tag ref={ref as any} className={className} style={{ perspective: "600px" }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: "0.28em" }}>
          <span
            className="split-word inline-block will-change-transform"
            style={{ transformOrigin: "center bottom" }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
