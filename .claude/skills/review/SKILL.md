---
name: review
description: Review code quality, design consistency, and best practices for Prime Ceramics. Use when user asks to review code, check quality, audit components, or find issues.
---

# Code Review Skill — Prime Ceramics

## Review Checklist

### 1. Design System Compliance
- [ ] No hardcoded colors — all use CSS variables from globals.css
- [ ] Typography uses established classes (.display, .h1, .h2, .h3, .eyebrow, .body-lg, .body-sm)
- [ ] Buttons use .link-arrow, .btn-fill, or .btn-line — not custom styles
- [ ] Images use .img-gs for grayscale→color hover effect where appropriate
- [ ] Spacing uses .section-pad or var(--section-gap), var(--gutter)
- [ ] Container uses .container class (max-width: var(--max-w))

### 2. Architecture Patterns
- [ ] Section components in `src/components/sections/`
- [ ] UI components in `src/components/ui/`
- [ ] Animation components in `src/components/animations/`
- [ ] Layout components in `src/components/layout/`
- [ ] Client components have "use client" directive
- [ ] Dynamic imports with `{ ssr: false }` for browser-only components

### 3. Animation Quality
- [ ] Transitions are 0.3s linear (not bouncy easing)
- [ ] FadeIn used for scroll reveals (not raw GSAP unless needed)
- [ ] GSAP ScrollTrigger instances cleaned up in useEffect return
- [ ] Stagger delays are subtle (0.04–0.08s between items)
- [ ] No animation on mobile for performance (check with media queries)

### 4. Responsive Design
- [ ] Mobile-first approach (base styles for mobile, md: and lg: for larger)
- [ ] Text uses clamp() for fluid sizing (already in typography classes)
- [ ] Grid layouts collapse properly (grid-cols-1 → md:grid-cols-2 → lg:grid-cols-3)
- [ ] Touch targets are at least 44x44px on mobile
- [ ] No horizontal overflow on any viewport

### 5. Performance
- [ ] Images have appropriate dimensions (not oversized)
- [ ] Below-fold images have loading="lazy"
- [ ] No unused imports
- [ ] No unnecessary state causing re-renders
- [ ] Dynamic imports for heavy components

### 6. Accessibility
- [ ] All images have alt text
- [ ] Interactive elements have aria-labels
- [ ] Heading hierarchy is correct
- [ ] Color contrast meets WCAG AA

### 7. SEO
- [ ] Page has unique title and meta description
- [ ] Semantic HTML (section, nav, main, footer, article)
- [ ] Proper heading hierarchy

## Common Issues to Flag
- Hardcoded color values (#hex in className or style)
- Missing "use client" on components using hooks
- GSAP without cleanup in useEffect
- Inconsistent spacing (mixing px values with design tokens)
- Non-semantic HTML (div where section/article should be used)
- Missing key prop in .map() iterations
- Unused variables or imports

## How to Report
Structure findings as:
```
## Review Summary
- X issues found (Y critical, Z minor)

### Critical
1. [File:Line] Issue description → Fix suggestion

### Minor
1. [File:Line] Issue description → Fix suggestion

### Recommendations
- Enhancement suggestions (not blocking)
```
