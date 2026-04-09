"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealByWordProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

export default function TextRevealByWord({
  children,
  as: Tag = "h2",
  className = "",
  stagger = 0.06,
  scrub = true,
  start = "top 85%",
  end = "top 45%",
}: TextRevealByWordProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll(".tw-word");
    if (!words.length) return;

    const tween = gsap.fromTo(
      words,
      {
        y: "110%",
        rotateX: -30,
        opacity: 0,
      },
      {
        y: "0%",
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children, stagger, scrub, start, end]);

  const words = children.split(" ");

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{ perspective: "600px" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.28em" }}
        >
          <span
            className="tw-word inline-block will-change-transform"
            style={{ transformOrigin: "center bottom" }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
