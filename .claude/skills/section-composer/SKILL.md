---
name: section-composer
description: Define how to structure page sections — header anatomy, content flow, section adjacency rules, CTA placement. Use when planning page layout, adding sections, or reviewing page flow.
---

# Section Composer Skill — Prime Ceramics

## Core Principle
Every section has ONE job. If you can't explain what a section does in 5 words, it's doing too much.

## Section Anatomy

Every section follows this structure (items are optional but order is fixed):

```
1. Eyebrow       — .eyebrow + text-[var(--accent)], always mb-4
2. Heading        — .h1 or .h2, the main statement
3. Description    — .body-lg, max-w-lg, explains the heading
4. Divider        — optional accent-line or h-px divider
5. Content        — the actual stuff (grid, cards, media, etc.)
6. CTA            — link-arrow or btn-fill, one per section max
```

Never put CTA before content. Never skip heading. Eyebrow is optional but if present, it's always first.

## Section Header Patterns

### Pattern A: Left-aligned (default)
```
Eyebrow
Heading
Description (max-w-lg)
```
Use for: most sections. Simple, clear.

### Pattern B: Split (heading left, description right)
```
Eyebrow
Heading          Description (max-w-md, right-aligned)
─────────────────────────────── divider
```
Use for: sections where heading and description serve different purposes.

### Pattern C: Centered
```
           Eyebrow
           Heading
        Description (max-w-xl)
```
Use for: CTA sections, testimonials, standalone statements. Rarely for content sections.

## Section Spacing

### Between sections
- Always use `section-pad` (clamp 80-140px) for standard sections
- Use `section-pad-lg` for CTA/closing sections only
- NEVER use raw py-20, py-24, etc.

### Header to content
- After heading (no description): `mb-10 md:mb-14`
- After description: `mb-12 md:mb-16`
- After divider: `mt-8` then normal content spacing

### Within sections
- Eyebrow → Heading: `mb-4` (16px) — ALWAYS
- Heading → Description: `mb-6` (24px)
- Description → Content: `mb-10 md:mb-14`
- Content → CTA: `mt-12 md:mt-16`

## Section Adjacency Rules

### Background alternation
```
✅ Light → Alt → Light → Dark (CTA)
✅ Light → Light (if separated by divider)
✅ Dark (hero) → Light → Alt → Dark (CTA)

❌ Dark → Dark (monotone, no contrast)
❌ Three same-bg sections in a row
❌ Alt → Alt without a light break
```

### Transitions
- Use SectionTransition ONLY when going from light→dark or dark→light
- Maximum ONE transition per page for functional pages (catalog, products)
- Homepage can have 2-3 transitions (it's a mood page)
- NEVER use transitions between two sections of the same lightness

### Section types by background

**Light (`--bg`):** Informational, browsing, reading
- Heroes (heading-only), product cards, text content, about sections

**Alt (`--bg-alt`):** Visual break, secondary browsing
- Product grids, alternate info sections, testimonials

**Dark (`--bg-dark`):** Mood, impact, conversion
- Homepage hero, CTA, Spirit of Nepal showcase, factory banner
- MAXIMUM ONE dark section on non-homepage pages (the CTA)

## Page Flow Templates

### Catalog/Product Page
```
Light heading → Light cards → Alt grid → Dark CTA
```

### About/Story Page
```
Dark hero → Light content → Alt stats → Light content → Dark CTA
```

### Homepage
```
Dark hero → Light intro → Light browse → Dark factory → Light browse → Dark showcase → Light clients → Dark CTA
```

## Anti-Patterns
- Section with no heading (just content floating)
- Eyebrow without a heading below it
- Two CTAs in the same section
- Description wider than max-w-lg (too wide to read)
- Section that's just a heading (no content — what's the point?)
- Dark section for browsing/filtering (save dark for mood)
