---
name: optimize
description: Audit and optimize Prime Ceramics website for performance, accessibility, SEO, and code quality. Use when user asks to optimize, audit, improve performance, check accessibility, or clean up code.
---

# Optimize Skill — Prime Ceramics

## Performance Audit

### 1. Bundle Size Check
```bash
npm run build 2>&1 | grep -A 20 "Route (app)"
```
- First Load JS should be under 200KB per route
- Shared chunks should be under 100KB
- If oversized: check for unnecessary dependencies, use dynamic imports

### 2. Image Optimization
Check all images in `public/images/`:
- Convert to WebP format where possible
- Ensure images are appropriately sized (not serving 4000px images in 400px containers)
- Add `loading="lazy"` to below-fold images
- Use Next.js `<Image>` component where possible (but note: static export uses unoptimized)

### 3. CSS Audit
- Check `globals.css` for unused styles
- Verify Tailwind CSS purging is working (check final CSS size in `out/_next/static/css/`)
- Remove duplicate utility classes

### 4. JavaScript Audit
- Ensure dynamic imports with `{ ssr: false }` for client-only components
- Check for unnecessary re-renders in components with state
- Verify GSAP ScrollTrigger instances are properly cleaned up in useEffect return

## Accessibility Audit

### Checklist
- All images have meaningful `alt` text
- Buttons have `aria-label` when icon-only
- Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- Focus states are visible on interactive elements
- Heading hierarchy is correct (h1 → h2 → h3, no skipping)
- Links are distinguishable from surrounding text

### Color Contrast Check (project palette)
| Pair | Ratio | Pass? |
|------|-------|-------|
| --ink (#3d3a36) on --bg (#fafaf8) | ~10:1 | AA ✓ |
| --ink-light (#7a7670) on --bg (#fafaf8) | ~4.5:1 | AA ✓ |
| --ink-muted (#b0aca6) on --bg (#fafaf8) | ~2.5:1 | AA ✗ — use only for decorative |
| --ink-on-dark (#eae7e2) on --bg-dark (#1a1815) | ~12:1 | AA ✓ |
| --accent (#96704c) on --bg (#fafaf8) | ~4.2:1 | AA (large text only) |

## SEO Audit

### Checklist
- `<title>` is set and under 60 characters
- `<meta name="description">` is set and under 160 characters
- Open Graph tags present (og:title, og:description, og:type)
- `robots` meta allows indexing
- All pages have unique titles
- Heading hierarchy is semantic
- Images have alt text

### Technical SEO
- `next.config.mjs` has `trailingSlash: true` ✓
- Static export generates clean HTML ✓
- Nginx config has proper cache headers ✓

## Code Quality Audit

### Patterns to Check
- Components follow project naming conventions (PascalCase files, kebab-case CSS)
- All useEffect hooks have proper cleanup
- No inline styles except for dynamic values
- Consistent use of design tokens (never hardcode colors)
- Props interfaces defined for all components
- No `any` types unless absolutely necessary

### Run Lint
```bash
npm run lint
```

## Optimization Actions
When optimizing, apply fixes in this priority order:
1. Fix build errors/warnings
2. Fix accessibility issues (alt text, aria-labels, contrast)
3. Fix SEO issues
4. Optimize bundle size
5. Optimize images
6. Clean up code patterns
