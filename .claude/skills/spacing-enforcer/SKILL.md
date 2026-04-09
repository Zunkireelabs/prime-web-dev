---
name: spacing-enforcer
description: Audit and fix spacing violations across all sections. Catches compact content, tight grids, missing breathing room, CTA-touching-content, and visual balance issues. Run after writing or modifying any section.
---

# Spacing Enforcer — Prime Ceramics

## Purpose
This skill catches the #1 recurring design failure: **content compressed into a tight block while the section has generous padding around it**. Premium luxury design requires content to BREATHE — not just the section, but every element within it.

## Mandatory Post-Edit Audit

After writing or editing ANY section component, run through this checklist. Every violation must be fixed before deployment.

---

## CHECK 1: Section Padding
Every `<section>` must use a section-pad class. No exceptions.

```
✅ section-pad         → clamp(64px, 8vw, 112px)
✅ section-pad-lg      → clamp(104px, 13vw, 182px)  ← CTA, hero, showcase
✅ section-pad-sm      → clamp(48px, 6vw, 84px)     ← stats bars, thin strips

❌ py-20, py-24, py-28, py-32, py-36, py-40  ← NEVER raw py on sections
```

## CHECK 2: Section Header Rhythm
Exact spacing — no negotiation:

```
Eyebrow → Heading:       mb-4     (16px)  ALWAYS
Heading → Description:   mb-6     (24px)  ALWAYS
Description → Content:   mb-12 md:mb-16  (48-64px)
Header block → Content:  mb-14 md:mb-20  (56-80px) for spacious sections
```

**Violation pattern:** `mb-8` or `mb-10` between heading and description (too much). `mb-6` or `mb-8` between description and content (too little).

## CHECK 3: Card Grid Gaps (CRITICAL)
This is the most common failure. Card grids must have generous gaps:

```
MINIMUM gaps (never go below):
  Horizontal:  gap-x-6    (24px)
  Vertical:    gap-y-8    (32px)

PREFERRED gaps (use these by default):
  Horizontal:  gap-x-8    (32px)
  Vertical:    gap-y-10   (40px)

SPACIOUS gaps (for sections with lots of empty space):
  Horizontal:  gap-x-8    (32px)
  Vertical:    gap-y-12   (48px)
```

**Violation patterns:**
- `gap-4`, `gap-5`, `gap-6` as single gap value on card grids (vertical is too tight)
- Using same gap for x and y (vertical always needs more)
- Flexbox `gap-5` or `gap-6` without separate vertical control

**Fix:** Always use split gaps: `gap-x-8 gap-y-10` (or gap-y-12 for dark sections with lots of space)

## CHECK 4: Card Internal Padding
Cards must have generous internal padding proportional to the section:

```
Compact cards (light sections, many items):
  py-8 px-6       (32px × 24px)

Standard cards (most sections):
  py-10 px-8      (40px × 32px)

Spacious cards (dark sections, few items, lots of empty space):
  py-14 md:py-16 px-8 md:px-10    (56-64px × 32-40px)
```

**Rule of thumb:** If the section has `section-pad-lg` and fewer than 10 cards, use SPACIOUS card padding.

**Violation pattern:** `py-10 px-6` in a dark section-pad-lg section with 7 cards = content island in empty space.

## CHECK 5: Content-to-CTA Separation (CRITICAL)
The gap between the last content element and the CTA button must be LARGE:

```
Grid/Cards → CTA button:    mt-16 md:mt-20    (64-80px) MINIMUM
Content → CTA button:       mt-12 md:mt-16    (48-64px) for text-heavy sections
```

**Violation pattern:** `mt-12` alone = only 48px on mobile. CTA appears to touch the content above.

**Rule:** For dark sections, ALWAYS use `mt-16 md:mt-20`. The extra space is a luxury signal.

## CHECK 6: CTA Button Breathing Room
The CTA button area needs its own breathing zone:

```
Above CTA:       mt-16 md:mt-20 (the gap from content)
CTA → subtext:   mt-6           (24px below button to helper text)
Below CTA:       handled by section-pad
```

**Add a visual separator** before the CTA if the section has more than 6 items:
```jsx
<div className="gold-divider-center mt-16 md:mt-20 mb-10 md:mb-12" />
```

## CHECK 7: Visual Balance — Content vs Empty Space
**The "Squint Test":** Blur your eyes and look at the section. Does the content form a dense cluster in the middle surrounded by empty space? If yes, the content is too compact.

**Fix:** Increase card gaps, card padding, and header-to-content spacing until the content fills ~60-70% of the section's visual area.

**Dark section rule:** Dark sections amplify the perception of empty space. Compensate by using:
- Larger card padding (SPACIOUS tier)
- Larger grid gaps (gap-x-8 gap-y-12)
- Larger header-to-content spacing (mb-14 md:mb-20)
- Dividers before CTA

## CHECK 8: Flexbox vs Grid for Card Layouts
**Prefer CSS Grid** for card layouts because it gives separate gap-x/gap-y control:

```
✅ grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10
❌ flex flex-wrap justify-center gap-6
```

If flexbox is needed for centering incomplete rows, use **row-gap and column-gap** utilities:
```
✅ flex flex-wrap justify-center gap-x-8 gap-y-10
❌ flex flex-wrap justify-center gap-6
```

## CHECK 9: Text Spacing Within Cards
Inside each card, text elements need proper micro-spacing:

```
Title → Subtitle/Count:     mb-3 or mb-4    (12-16px)
NOT mb-1 or mb-2 (too tight for readability)
```

## CHECK 10: Border/Divider Clearance
When using borders (cards, strips, sections), ensure content doesn't touch the border:

```
Content → Border:     p-8 minimum inside bordered elements
Border → Next element: mt-8 minimum after bordered groups
```

---

## Section-Specific Rules

### Dark sections (bg-surface-dark)
Dark backgrounds amplify empty space perception. USE:
- `section-pad-lg` (not section-pad)
- SPACIOUS card padding
- `gap-x-8 gap-y-12` on card grids
- `mb-14 md:mb-20` header → content
- `mt-16 md:mt-20` content → CTA
- Gold divider before CTA if >6 items

### Red sections (bg-surface-red)
- `section-pad-lg`
- `section-mid` or `section-narrow` for centered content
- Generous spacing throughout — this is the conversion section

### Light sections (bg-surface, bg-surface-alt)
- `section-pad` is usually sufficient
- Standard card padding and gaps
- Content can fill more of the visual area

---

## Violation Severity

### CRITICAL (must fix before deploy)
- Raw py values on sections
- gap < 24px vertical on card grids
- CTA touching content (mt < 48px)
- Cards with py < 32px in dark sections

### MODERATE (fix in same session)
- gap-x and gap-y using same value
- mb < 48px between header and content
- Missing divider before CTA in long sections

### MINOR (fix when touching the file)
- Suboptimal card padding (functional but not premium)
- Could use larger header-to-content spacing

---

## Quick Fix Reference

When you find a tight section, apply these in order:
1. Split the gap: `gap-6` → `gap-x-8 gap-y-10`
2. Increase card padding: `py-10 px-6` → `py-14 px-8`
3. Increase header→content: `mb-12` → `mb-14 md:mb-20`
4. Increase content→CTA: `mt-12` → `mt-16 md:mt-20`
5. Add divider before CTA if needed
6. Re-check: does content fill 60-70% of visual area?
