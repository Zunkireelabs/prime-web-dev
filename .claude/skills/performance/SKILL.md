---
name: performance
description: Audit and optimize website performance including Core Web Vitals, bundle size, loading speed, and runtime performance. Use when user asks about speed, performance, loading time, lighthouse score, or core web vitals.
---

# Performance Skill — Prime Ceramics

## Core Web Vitals Targets
| Metric | Target | What It Measures |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | How fast the main content loads |
| FID (First Input Delay) | < 100ms | How fast the site responds to clicks |
| CLS (Cumulative Layout Shift) | < 0.1 | How much the page layout shifts |

## Performance Audit

### 1. Bundle Analysis
```bash
npm run build 2>&1 | grep -A 20 "Route (app)"
```
**Limits:**
- First Load JS per route: < 200KB
- Shared chunks: < 100KB
- Total homepage: < 250KB

**If over limits:**
- Check for large dependencies (GSAP is ~60KB, Framer Motion ~130KB)
- Use dynamic imports for heavy components
- Tree-shake unused exports
- Consider removing Framer Motion if only used minimally

### 2. Image Performance
Images are the #1 performance bottleneck for tile websites.

**Check sizes:**
```bash
find public/images -type f \( -name "*.jpg" -o -name "*.png" \) -size +300k | while read f; do echo "$(du -h "$f" | cut -f1) $f"; done
```

**Optimize:**
- Hero images: max 400KB, 1920px wide
- Card images: max 150KB, 800px wide
- Use WebP format where possible
- Consider lazy loading (`loading="lazy"`) for below-fold images

### 3. CSS Performance
```bash
ls -lh out/_next/static/css/
```
- Total CSS should be < 50KB
- Check for unused styles in globals.css
- Tailwind CSS purges unused classes automatically

### 4. Font Loading
Fonts are loaded via `next/font/google` with `display: "swap"` — this is optimal.
- Cormorant Garamond: ~30KB (5 weights)
- Inter: ~40KB (5 weights)
- Subset to Latin only ✓

### 5. Third-Party Scripts
Currently none — keep it that way.
When adding analytics later:
- Use `next/script` with `strategy="lazyOnload"`
- Never block rendering for analytics

### 6. Runtime Performance

**Animation performance:**
- FadeIn uses CSS transitions (GPU-accelerated) ✓
- MaskReveal uses clip-path (GPU-accelerated) ✓
- SplitHeading uses GSAP (efficient) ✓
- Ensure `will-change` is used sparingly (only during animation)
- Check for excessive Intersection Observers (one per animated element is fine)

**Scroll performance:**
- Lenis handles smooth scrolling ✓
- GSAP ScrollTrigger synced with Lenis ✓
- Avoid scroll event listeners without `{ passive: true }`

**Re-render prevention:**
- State updates should be minimal
- Use `useCallback` for functions passed as props
- Avoid creating objects/arrays inline in JSX

### 7. Caching Strategy (Nginx)
Already configured in `nginx/static.conf`:
- HTML: no-cache ✓
- Static assets (JS/CSS/images): 1 year cache ✓
- Gzip enabled ✓

### 8. Preloading Critical Resources
In layout.tsx, Next.js auto-preloads fonts. For hero image:
```html
<link rel="preload" as="image" href="/images/hero/hero-bg.jpg" />
```

## Performance Checklist
- [ ] Build passes with acceptable bundle sizes
- [ ] No images over 500KB
- [ ] Lazy loading on below-fold images
- [ ] No render-blocking scripts
- [ ] CSS is minimal and purged
- [ ] Fonts use display:swap
- [ ] Animations use GPU-accelerated properties
- [ ] No excessive re-renders
- [ ] Gzip enabled on server
- [ ] Proper cache headers set

## Quick Wins (if performance is poor)
1. Compress images (biggest impact)
2. Remove unused npm packages
3. Dynamic import heavy components
4. Reduce GSAP usage (replace with CSS where possible)
5. Minimize state in components
