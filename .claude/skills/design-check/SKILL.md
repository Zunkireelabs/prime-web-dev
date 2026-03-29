---
name: design-check
description: Audit UI/UX like a frontend designer — spacing, typography, hierarchy, placement, and micro-details. Use when user asks to check design, fix layout, audit spacing, review typography, or improve visual polish.
---

# Design Check Skill — Prime Ceramics

## How to Audit
1. Read the target component(s) or page
2. Run through each checklist section below
3. Report findings grouped by severity: Critical / Moderate / Polish
4. Auto-fix Critical and Moderate issues
5. Suggest Polish fixes for user approval

---

## 1. Spacing & Rhythm

### Section Spacing
- Every section must use `section-pad` class (applies `var(--section-gap)`: clamp 80px–140px)
- If a section needs different padding, it must be intentional and documented
- **Flag**: Raw `py-20`, `py-32`, or arbitrary padding on sections

### Container & Gutters
- Content must be inside `container` class (max-width with auto margins)
- Side padding via `var(--gutter)`: clamp 20px–48px
- **Flag**: Content touching screen edges, missing container

### Internal Spacing Scale
Follow Tailwind's 4px base consistently:
```
Between eyebrow → heading:     mb-4  (16px)
Between heading → subtext:     mb-6  (24px)
Between subtext → content:     mb-10 to mb-12 (40–48px)
Between content → CTA:         mt-8  to mt-10 (32–40px)
Grid gaps (cards):              gap-3 to gap-5 (12–20px)
Grid gaps (content blocks):    gap-10 to gap-20 (40–80px)
```
- **Flag**: Inconsistent spacing within a section (e.g., mb-4 and mb-7 mixed)
- **Flag**: Arbitrary values like `p-[13px]`, `mt-[7px]` — must snap to 4px grid

### Vertical Rhythm
- Sections should alternate visual density: spacious → dense → spacious
- No two text-heavy sections back-to-back without a visual break
- **Flag**: Three or more same-density sections in a row

---

## 2. Typography

### Font Usage
```
Headings:   font-[var(--font-heading)] — Cormorant Garamond, weight 300
Body:       font-[var(--font-body)] — Inter, weight 300
Eyebrows:   font-[var(--font-body)] — Inter, weight 500, uppercase
```
- **Flag**: Wrong font family on any element
- **Flag**: Weight other than 300 on body, or heavy weights on headings (except .h3 at 400)

### Type Scale (use classes, not raw sizes)
```
.display    — clamp(2.8rem, 5vw, 5.5rem)   — ONE per page max
.h1         — clamp(2.2rem, 4vw, 4rem)      — Section headings
.h2         — clamp(1.8rem, 3vw, 3rem)      — Sub-headings
.h3         — clamp(1.25rem, 1.5vw, 1.75rem) — Card/item titles
.eyebrow    — 0.65rem, uppercase, tracking 0.3em
.body-lg    — clamp(1rem, 1vw, 1.15rem)
.body-sm    — 0.875rem
```
- **Flag**: Raw `text-4xl`, `text-2xl` instead of design system classes
- **Flag**: More than one `.display` on a page

### Letter Spacing
```
Eyebrows:       tracking-[0.3em] (built into .eyebrow class)
Headings:       default tracking (no extra needed)
Body:           default tracking
Nav links:      tracking-wide or tracking-[0.15em]
Buttons:        tracking-wide on .btn-fill, .btn-line
```
- **Flag**: Missing letter-spacing on eyebrows
- **Flag**: Excessive letter-spacing on body text

### Line Height
```
Headings:   leading-[1.1] to leading-[1.2]
Body text:  leading-relaxed (1.625) minimum
Eyebrows:   leading-none (1)
```
- **Flag**: Headings with body-level line-height (too loose)
- **Flag**: Body text below 1.5 line-height (too tight)

### Text Wrapping
- Headings should use `text-balance` or `max-w-[...]` to prevent awkward breaks
- Body text: `max-w-2xl` or `max-w-3xl` for comfortable reading (65–80 chars/line)
- **Flag**: Body text running full container width (too wide to read)
- **Flag**: Single orphan word on a heading line

---

## 3. Visual Hierarchy & Composition

### Content Order per Section
Standard section anatomy:
```
1. Eyebrow (optional) — small, accented, uppercase
2. Heading — large, serif, commanding
3. Subtext (optional) — body-lg, muted color
4. Content — grid, cards, media, text blocks
5. CTA (optional) — link-arrow or btn-fill
```
- **Flag**: CTA before content, heading without eyebrow where one would help

### Whitespace
- Sections should "breathe" — no cramped layouts
- Between major content blocks: generous gap (gap-10+)
- Inside cards: consistent internal padding (p-5 to p-8)
- **Flag**: Content touching container edges
- **Flag**: Cards with inconsistent internal padding

### Image-Text Balance
- Sections with images: minimum 40% image, 60% text (or vice versa)
- Full-bleed image sections should have overlay text with proper contrast
- **Flag**: Sections that are 90%+ text with no visual relief
- **Flag**: Image sections with unreadable overlay text

### Focal Points
- Each viewport height should have ONE clear focal point
- The eye should flow: Hero → first section naturally
- **Flag**: Competing elements fighting for attention at same visual level

---

## 4. Color & Contrast

### Light Sections
```
Background:  bg-[var(--bg)] or bg-[var(--bg-alt)]
Heading:     text-[var(--ink)]
Body:        text-[var(--ink-light)]
Muted:       text-[var(--ink-muted)]
Eyebrow:     text-[var(--accent)]
```

### Dark Sections
```
Background:  bg-[var(--bg-dark)] or bg-[var(--bg-dark-alt)]
Heading:     text-[var(--ink-on-dark)]
Body:        text-[var(--ink-on-dark-light)]
Eyebrow:     text-[var(--accent-light)]
```

- **Flag**: Hardcoded hex colors (never use raw #hex in components)
- **Flag**: Wrong text color for section background
- **Flag**: Accent color overused (should be sparingly — eyebrows, hover lines, small details)

### Contrast Requirements
- Body text on light bg: minimum 4.5:1 ratio
- Heading text: minimum 3:1 ratio (large text exception)
- **Flag**: Light gray text on light background (var(--ink-muted) on var(--bg) is borderline — use only for captions)

---

## 5. Interactive Elements

### Hover States — Every interactive element needs one
```
Links:       Color transition to var(--accent) or underline animation
Cards:       .img-gs (grayscale→color) + subtle lift or border change
Buttons:     Built into .link-arrow, .btn-fill, .btn-line classes
Nav items:   Color transition, 0.3s linear
```
- **Flag**: Any clickable element without hover feedback
- **Flag**: Hover transition not 0.3s linear

### Touch Targets
- Minimum 44x44px for all interactive elements
- Adequate spacing between clickable items (min 8px gap)
- **Flag**: Small links or buttons below 44px touch area
- **Flag**: Clickable items too close together on mobile

### Cursor
- `cursor-pointer` on all clickable non-link elements
- Custom cursor via Cursor component on desktop
- **Flag**: Missing cursor-pointer on interactive divs/buttons

---

## 6. Responsive Design Quick Check

### Breakpoints to verify
```
375px   — iPhone SE (smallest target)
430px   — iPhone Pro Max
768px   — iPad
1024px  — iPad landscape / small laptop
1280px  — Desktop
1536px  — Large desktop
```

### Common Issues to Flag
- Text overflow or horizontal scroll at any breakpoint
- Grid not collapsing (3-col → 1-col on mobile)
- Padding too large on mobile (e.g., py-32 stays same)
- Images breaking aspect ratio or overflowing
- Fixed heights causing content clipping
- Font sizes not scaling (should use clamp)

---

## 7. Micro-Details & Polish

### Borders & Dividers
```
Standard:    border-[var(--ink-muted)]/20 or border-[var(--ink)]/10
On dark:     border-[var(--ink-on-dark)]/10
Thickness:   border (1px) — never thicker unless intentional
```
- **Flag**: Inconsistent border colors or thicknesses

### Icon Sizing
- Icons should be proportional to adjacent text
- Inline with text: `w-4 h-4` or `w-5 h-5`
- Standalone: `w-6 h-6` to `w-8 h-8`
- **Flag**: Oversized or undersized icons relative to context

### Image Treatment
- All showcase images should have `.img-gs` class (grayscale→color on hover)
- Aspect ratios should be consistent within a grid
- **Flag**: Missing img-gs on hoverable images
- **Flag**: Mixed aspect ratios in a card grid

### Loading & Empty States
- Images should have appropriate aspect-ratio set to prevent layout shift
- Skeleton or placeholder for lazy-loaded content
- **Flag**: Layout shift on image load (missing dimensions/aspect-ratio)

---

## Severity Levels

### Critical (Auto-fix)
- Hardcoded colors
- Missing container/section-pad
- Wrong font usage
- Broken responsive layout
- Missing hover states on primary CTAs

### Moderate (Auto-fix)
- Inconsistent spacing
- Wrong type scale class
- Missing letter-spacing on eyebrows
- Body text too wide (no max-width)
- Incorrect line-height

### Polish (Suggest)
- Orphan words in headings
- Suboptimal whitespace rhythm
- Minor icon sizing
- Border inconsistencies
- Could benefit from text-balance
