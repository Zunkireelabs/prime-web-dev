---
name: luxury-ecommerce
description: Premium e-commerce patterns for product pages, catalog layouts, browse/filter UX, and card design for physical products like tiles. Use when building catalog, product, collection, or shopping pages.
---

# Luxury E-Commerce Skill — Prime Ceramics

## Core Principle
The product is the hero. UI is invisible. The user should feel like they're in a showroom, not using software.

## Page Types

### Catalog Page (browse all catalogs)
- Light background throughout — dark only for final CTA
- Hero: simple heading area (h1 + description), NOT full-viewport cinematic
- Catalog cards: 3-col grid, each card = image + info below (never overlay text on image for functional cards)
- Each card: `.img-gs` hover, `.h3` title, `body-sm` description, two CTAs (View + Download)
- No dark showcase sections for browsing pages — dark = mood, light = shopping

### Collection Page (single catalog's tiles)
- Filter bar: tab-style primary (size), dropdown secondary (finish/series)
- Grid: 4-col desktop, 3-col tablet, 2-col mobile
- Cards: 4:5 aspect ratio minimum, warm neutral placeholders until images exist
- Load More: centered `btn-line`, shows remaining count

### Product Detail (single tile)
- Hero image: large, left side (60%), info right (40%)
- Specs table: clean, alternating rows
- Related tiles: horizontal scroll or 4-col grid

## Card Design Rules

### Catalog Card (browsing catalogs)
```
┌──────────────────┐
│                  │
│  Image (4:3)     │  ← .img-gs class, grayscale→color
│  .img-gs         │
│                  │
│  [Count badge]   │  ← bottom-left on image
├──────────────────┤
│  Title (.h3)     │  ← font-serif, hover→accent
│  Types (eyebrow) │  ← size, muted
│  Description     │  ← body-sm, 2 lines max
│                  │
│  [View] [↓ PDF]  │  ← link-arrow + icon link
└──────────────────┘
```
- Never put description ON the image — save overlays for hero/mood sections
- Always have two distinct actions: primary (View) + secondary (Download)
- Gap between cards: `gap-6 md:gap-8`

### Tile Card (browsing individual tiles)
```
┌──────────────────┐
│                  │
│  Swatch (4:5)    │  ← warm neutral gradient + noise texture
│                  │     if no image available
│  [Finish badge]  │  ← top-right, small
│  ──── hover bar  │  ← accent line at bottom, scale-x on hover
├──────────────────┤
│  Size / Series   │  ← eyebrow-style, muted
│  Tile Name       │  ← serif, hover→accent
└──────────────────┘
```
- Aspect 4:5 — taller than wide, feels like a physical tile sample
- Warm neutrals only (hue 20-50) for placeholders — real tiles don't come in neon
- ONE badge maximum on the card (finish). Don't clutter with series+finish+arrow
- Hover: accent underline draws in, name color shifts. Nothing else.

## Filter UX Rules

### Layout
- Primary filter (size tabs): top row, full width, generous padding (px-6 py-5)
- Secondary filters (finish, series): right-aligned on same row as tabs, or second row
- Search: always visible on desktop, in expandable on mobile
- Count: always visible ("24 of 395")
- NEVER cram all controls into one thin row

### Tab Design
- Active: text color `var(--ink)`, bottom border `var(--accent)` 2px
- Inactive: text color `var(--ink-muted)`, no border, hover→lighter text
- NOT filled pills — underline tabs are cleaner for product browsing

### Dropdown Design
- No visible border — just text + chevron
- On focus: subtle underline appears
- Uppercase, small tracking, muted color

### Mobile
- Size tabs: horizontal scroll, pill-style (filled active, outlined inactive)
- "Filters" button with active-filter badge dot
- Expanded: search + 2-col dropdowns

## Section Flow for E-Commerce Pages
```
1. Light heading (what is this page)
2. Light product cards (browse/select)
3. Alt-bg product grid (explore deeper)
4. Single transition → Dark CTA (convert)
```
- Maximum ONE dark section per e-commerce page (the CTA)
- Maximum ONE transition effect per page
- No SVG diagonal/wave transitions between browsing sections — just bg color change

## Anti-Patterns (NEVER do these)
- Dark background for product browsing sections
- Full-viewport hero for a functional page (save for homepage)
- "Editorial" oversized numbers/watermarks on catalog pages
- Image overlays with text for functional product cards
- 5+ columns in a product grid
- Multiple SVG shape transitions on one page
- CountUp animation for small numbers (< 10)
- MagneticButton on standard navigation links
