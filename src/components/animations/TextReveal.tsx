"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  direction?: "up" | "side" | "fade";
  stagger?: number;
  delay?: number;
}

export default function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  direction = "up",
  stagger = 0.02,
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".char");

    const fromVars =
      direction === "up"
        ? { y: 40, opacity: 0 }
        : direction === "side"
          ? { x: 20, opacity: 0 }
          : { opacity: 0 };

    gsap.fromTo(chars, fromVars, {
      y: 0,
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, direction, stagger, delay]);

  const words = children.split(" ");

  return (
    <Tag ref={containerRef as any} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
