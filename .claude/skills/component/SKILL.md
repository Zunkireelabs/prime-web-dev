---
name: component
description: Create new components for Prime Ceramics following the established design system and architecture. Use when user asks to add a new section, component, or UI element.
---

# Component Creation Skill — Prime Ceramics

## Design System Reference

### Colors (use CSS variables, NEVER hardcode)
```
Light surfaces:  var(--bg), var(--bg-alt), var(--bg-card)
Dark surfaces:   var(--bg-dark), var(--bg-dark-alt)
Text on light:   var(--ink), var(--ink-light), var(--ink-muted)
Text on dark:    var(--ink-on-dark), var(--ink-on-dark-light)
Accent:          var(--accent), var(--accent-light)
```

### Typography Classes
```
.display  — Hero-level (clamp 2.8rem–5.5rem), serif, weight 300
.h1       — Section headers (clamp 2.2rem–4rem), serif, weight 300
.h2       — Sub-headers (clamp 1.8rem–3rem), serif, weight 300
.h3       — Card titles (clamp 1.25rem–1.75rem), serif, weight 400
.eyebrow  — Labels (0.65rem, weight 500, uppercase, letter-spacing 0.3em)
.body-lg  — Large body (clamp 1rem–1.15rem), weight 300
.body-sm  — Small body (0.875rem), weight 300
```

### Button/Link Classes
```
.link-arrow     — Text link with arrow, for secondary CTAs (Simpolo style)
.btn-fill       — Filled button, dark bg, for primary CTAs (use sparingly)
.btn-line       — Outlined button, for secondary actions
.tab-btn        — Tab button with bottom border
```

### Image Treatment
```
.img-gs         — Grayscale→color hover effect (Jaquar pattern)
```

### Animation Components
```
<FadeIn>        — Intersection-based fade+translate (direction, delay, distance)
<MaskReveal>    — Clip-path reveal (direction: up/left/right)
<SplitHeading>  — Word-by-word GSAP heading animation
<CountUp>       — Animated number counter
```

## Component Template

### Section Component
```tsx
"use client";

import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";

export default function SectionName() {
  return (
    <section className="section-pad">
      <div className="container">
        <FadeIn>
          <p className="eyebrow text-[var(--accent)] mb-4">Section Label</p>
        </FadeIn>
        <SplitHeading as="h2" className="h2 mb-12">
          Section Heading
        </SplitHeading>

        {/* Section content */}
      </div>
    </section>
  );
}
```

### Dark Section
Add `bg-[var(--bg-dark)]` to section, use `text-[var(--ink-on-dark)]` classes, and `text-[var(--accent-light)]` for eyebrow.

## File Organization
```
src/components/
├── sections/     — Full-width page sections (HeroCarousel, FindBySpace, etc.)
├── animations/   — Reusable animation wrappers (FadeIn, MaskReveal, etc.)
├── ui/           — Small UI elements (BackToTop, FloatingEnquiry, etc.)
├── layout/       — Structural components (Header, Footer, Providers, SmoothScroll)
```

## Rules
- ALWAYS use design tokens from globals.css — never hardcode colors
- ALWAYS use "use client" directive for components with hooks or browser APIs
- ALWAYS add proper TypeScript types
- Use FadeIn for scroll-triggered reveals (preferred over GSAP for simple animations)
- Use MaskReveal for image reveals (clip-path based)
- Use SplitHeading for section headings (GSAP word-by-word)
- Use img-gs class for image hover effects (grayscale→color)
- Keep components focused — one section per file
- Use Intersection Observer (via FadeIn) over GSAP ScrollTrigger when possible
- Transitions should be 0.3s linear (Jaquar pattern), NOT bouncy
