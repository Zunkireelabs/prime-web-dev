---
name: product-grid-master
description: Product grid layouts — card proportions, columns per breakpoint, load-more patterns, empty states, filter-grid interaction. Use when building any product listing, tile grid, or filterable collection.
---

# Product Grid Master Skill — Prime Ceramics

## Grid Specifications

### Column Count (non-negotiable)
```
375px   (mobile):    2 columns
640px   (sm):        2 columns
768px   (md):        3 columns
1024px  (lg):        4 columns
1280px  (xl):        4 columns (NOT 5 — tiles need presence)
1536px  (2xl):       4 columns
```

### Gap Sizes
```
Horizontal:  gap-x-5 (20px) min, gap-x-6 (24px) preferred
Vertical:    gap-y-8 (32px) min, gap-y-10 (40px) preferred
```
Never less than 20px horizontal, 32px vertical. Products need breathing room.

### Card Aspect Ratios
```
Tile swatch:     aspect-[4/5]  — taller than wide, like a real tile
Catalog cover:   aspect-[4/3]  — landscape, shows room scene
Project photo:   aspect-[16/9] — cinematic
Square product:  aspect-square  — only for uniform grids (patio, mosaic)
```

## Tile Card Template
```tsx
<div className="group">
  {/* Swatch — 4:5 ratio */}
  <div className="relative aspect-[4/5] overflow-hidden mb-4">
    {/* Background (placeholder or real image) */}
    {/* Finish badge — top right, small */}
    {/* Hover accent line — bottom, scale-x animation */}
  </div>

  {/* Text — minimal */}
  <p className="text-[0.5rem] font-medium tracking-[0.18em] uppercase text-[var(--ink-muted)] mb-1">
    {size} / {series}
  </p>
  <h3 className="font-serif font-light text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300 text-[0.95rem] leading-snug">
    {name}
  </h3>
</div>
```

### Card Rules
- ONE badge maximum (finish type)
- Text below image, never overlaid
- Hover: accent underline + name color change only. No lift, no shadow, no zoom
- Info hierarchy: size/series (eyebrow) → name (serif). That's it.
- No arrows, no "view" buttons on individual tile cards

## Placeholder Swatches (when images don't exist)

### Color Generation
- Use deterministic hue from tile name (hash function)
- RESTRICT to warm neutrals: hue 20-50, saturation 5-12%, lightness 78-89%
- Real tiles are beige/grey/taupe — never generate blue/green/pink placeholders

### Texture
- SVG fractalNoise at 0.8 baseFrequency, 4 octaves
- `mix-blend-multiply`, opacity 0.12
- Simulates ceramic/stone grain

### Badge on placeholder
- Background: `hsl(hue, 6%, 95%)`
- Text: `hsl(hue, 8%, 48%)`
- Small, top-right, no border

## Load More Pattern
```tsx
<div className="mt-16 text-center">
  <button className="btn-line">
    Show More ({remaining})
  </button>
</div>
```
- Centered, single button
- `btn-line` class (outlined)
- Shows remaining count in parentheses
- `mt-16` spacing from last grid row
- NO flanking lines, NO animated decorations

## Empty State
```tsx
<div className="py-24 text-center">
  <p className="h3 text-[var(--ink-muted)] mb-3">No tiles found</p>
  <p className="body-sm mb-8 max-w-xs mx-auto">
    Adjust your filters or search to discover more surfaces.
  </p>
  <button className="link-arrow">Clear Filters</button>
</div>
```
- Centered, generous vertical padding (py-24)
- No icons, no illustrations — just clear text
- `link-arrow` for the action, not `btn-fill`
- Copy: helpful, not cute

## Filter-Grid Interaction

### Layout
```
Section heading (with eyebrow + h2 + description)
    ↓ spacer (h-12 md:h-16)
Sticky filter bar
    ↓ section-pad top
Product grid
    ↓ Load More
    ↓ section-pad bottom
```

### Filter Bar Position
- Sticky at `top-[72px] md:top-20` (below header)
- Background: `bg-[var(--bg-alt)]/98 backdrop-blur-lg`
- Border: bottom only, `border-[var(--ink)]/6`

### When filters change
- Reset visible count to BATCH_SIZE (24)
- Reset series when size changes
- Grid re-renders with FadeIn animation

## Anti-Patterns
- 5+ columns at any breakpoint
- Less than 20px horizontal gap
- Shadow on hover (this isn't a SaaS dashboard)
- Card lift on hover (translateY negative)
- Multiple badges per card
- "View Details" button on every card in a grid
- Skeleton loaders for client-side filtered content
- Infinite scroll (prefer explicit Load More)
