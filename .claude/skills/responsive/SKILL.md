---
name: responsive
description: Audit and fix responsive design across all breakpoints. Use when user mentions mobile, responsive, tablet, breakpoints, or layout issues on different screen sizes.
---

# Responsive Design Skill — Prime Ceramics

## Breakpoint System (Tailwind defaults)
```
sm:  640px   — Large phones landscape
md:  768px   — Tablets
lg:  1024px  — Small laptops
xl:  1280px  — Desktops
2xl: 1536px  — Large screens
```

## Mobile-First Rules
All base styles target mobile (375px). Larger screens add complexity.

### Layout Patterns
```
Grid:     grid-cols-1 → md:grid-cols-2 → lg:grid-cols-3 (or lg:grid-cols-12)
Flex:     flex-col → md:flex-row
Padding:  px-5 → md:px-8 → lg:px-12 (handled by var(--gutter))
Gap:      gap-3 → md:gap-4 → lg:gap-5
```

### Typography Scaling
Already handled by clamp() in typography classes:
- `.display`: 2.8rem → 5.5rem
- `.h1`: 2.2rem → 4rem
- `.h2`: 1.8rem → 3rem
- No additional responsive font overrides needed

### Image Handling
- Aspect ratios should be maintained at all sizes
- On mobile: full-width images (col-span-1)
- Horizontal scroll containers: `overflow-x-auto no-scrollbar`
- Hero: `h-[85vh] lg:h-screen`

## Section-by-Section Responsive Checklist

### Header
- Desktop: horizontal nav + search + "Where to Buy"
- Mobile: logo + hamburger only, full-screen overlay menu
- Logo visible at both states

### Hero Carousel
- Full-bleed at all sizes
- Floating label: bottom-left at all sizes
- Dot indicators: bottom-right

### Brand Intro
- Mobile: single column (text stacks above supporting text)
- Desktop: 8/4 grid

### Find By Space
- Mobile: 2 columns
- Desktop: 3 columns
- All cards maintain 4:3 aspect ratio

### Collections Strip
- Horizontal scroll at all sizes
- Card width: 260px mobile, 300px desktop

### Browse By Tabs
- Tabs: horizontal scroll if many
- Grid: 2 cols mobile → 3 cols tablet → 6 cols desktop

### Featured Project
- Full-bleed at all sizes
- Height: 70vh mobile, 85vh desktop
- Text overlay at bottom-left

### Craft Process
- Mobile: steps stack vertically
- Desktop: 4-column grid with border dividers

### Stats Bar
- Mobile: 2x2 grid
- Desktop: 4 columns with dividers

### Testimonials
- Single column centered at all sizes
- Quote text scales with h3 clamp

### Showrooms
- Mobile: single column
- Desktop: 3 columns

### CTA
- Mobile: single column
- Desktop: 2-column grid

### Footer
- Mobile: single column, sections stack
- Desktop: 12-column grid

## Testing Commands
After fixing responsive issues, build and test:
```bash
npm run build
```
Then check the deployed site at different viewport widths.

## Common Mobile Issues to Fix
- Horizontal overflow from fixed-width elements
- Text too small (below 14px)
- Touch targets too small (below 44px)
- Images not scaling (missing w-full or object-cover)
- Grid items not collapsing to single column
- Excessive padding eating into content space on small screens
