---
name: animate
description: Create and audit GSAP animations following project rules. Use when user asks to add animation, check animations, or mentions GSAP, scroll effects, or motion.
---

# Animation Skill — Prime Ceramics

## Project Animation Stack
- **GSAP 3.12** — FREE tier only
- **Lenis** — Smooth scroll (integrated via SmoothScroll provider)
- **ScrollTrigger** — GSAP plugin for scroll-based animations
- **Intersection Observer** — Via FadeIn component (preferred for simple reveals)

## BANNED — Do NOT Use
These are GSAP Club/paid plugins. Using them will break the build:
```
SplitText, MorphSVG, DrawSVG, MotionPath, ScrollSmoother,
Flip, CustomEase, CustomBounce, CustomWiggle, ScrambleText,
Inertia, Physics2D, PhysicsProps, SplitText
```

## BANNED Easing
Never use bouncy/elastic easing. This project uses minimal, linear motion:
```
Bounce, Elastic, Back, rough(), slow()
```

## Allowed Easing
```
"none"           — Linear (DEFAULT, use this most of the time)
"power1.out"     — Subtle decel (use sparingly for natural feel)
"power1.inOut"   — Subtle ease both (use for opacity fades)
```

## Duration Rules
- Default duration: `0.3s` (matches CSS transition standard)
- Maximum duration: `0.8s` (for hero/statement animations only)
- Stagger: `0.05s` to `0.1s` between items
- ScrollTrigger scrub: `true` or `0.5` (not higher)

## Existing Animation Components

### FadeIn (Preferred for simple reveals)
```tsx
import FadeIn from "@/components/animations/FadeIn";

<FadeIn direction="up" delay={0.1} distance={30}>
  <div>Content</div>
</FadeIn>
```
- Uses Intersection Observer, NOT GSAP
- Directions: `up`, `down`, `left`, `right`
- Use this for 90% of scroll reveals

### MaskReveal (For dramatic image reveals)
```tsx
import MaskReveal from "@/components/animations/MaskReveal";

<MaskReveal direction="up">
  <img src="..." alt="..." />
</MaskReveal>
```
- Uses clip-path animation
- Directions: `up`, `left`, `right`

### SplitHeading (For section headings)
```tsx
import SplitHeading from "@/components/animations/SplitHeading";

<SplitHeading as="h2" className="h2">
  Heading Text
</SplitHeading>
```
- Word-by-word GSAP animation
- Uses `useGSAP` hook with proper cleanup

### CountUp (For statistics)
```tsx
import CountUp from "@/components/animations/CountUp";

<CountUp end={500} suffix="+" duration={2} />
```

## Creating New GSAP Animations

### Template — GSAP with useGSAP Hook
```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>Content</div>;
}
```

### Template — Dynamic Import (for browser-only)
```tsx
import dynamic from "next/dynamic";

const AnimatedSection = dynamic(() => import("@/components/sections/AnimatedSection"), {
  ssr: false,
});
```

### Template — Staggered Children
```tsx
useGSAP(() => {
  const items = containerRef.current?.querySelectorAll(".stagger-item");
  if (!items?.length) return;

  gsap.from(items, {
    y: 20,
    opacity: 0,
    duration: 0.3,
    ease: "none",
    stagger: 0.08,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 85%",
    },
  });
}, { scope: containerRef });
```

## Audit Checklist
When auditing existing animations, check:

1. **No paid plugins** — grep for banned plugin names
2. **No banned easing** — grep for Bounce, Elastic, Back
3. **Duration ≤ 0.8s** — flag anything longer
4. **Proper cleanup** — must use `useGSAP` hook (auto-cleanup) or manual `ctx.revert()`
5. **ScrollTrigger kills** — no orphan ScrollTriggers on unmount
6. **SSR safe** — browser APIs wrapped in `useEffect`/`useGSAP`, or component uses `ssr: false`
7. **Lenis compatibility** — ScrollTrigger should work with Lenis (no `scroll` event conflicts)
8. **FadeIn preferred** — if animation is just fade+translate, use FadeIn instead of raw GSAP

## Rules
- ALWAYS use `useGSAP` hook — never raw `useEffect` for GSAP
- ALWAYS register plugins: `gsap.registerPlugin(ScrollTrigger)`
- ALWAYS use `"none"` ease unless there's a specific reason
- ALWAYS keep duration at 0.3s unless it's a hero/statement moment
- NEVER import paid/Club plugins
- NEVER use bouncy easing (Bounce, Elastic, Back)
- Prefer FadeIn component over raw GSAP for simple scroll reveals
- Use `ssr: false` dynamic import for any component using `window` or `document`
