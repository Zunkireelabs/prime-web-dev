---
name: spacing-rhythm
description: 8pt grid enforcement, section gaps, element spacing rules, breathing room calculations. Use when checking spacing, building layouts, or reviewing visual rhythm.
---

# Spacing Rhythm Skill — Prime Ceramics

## Base Unit
All spacing follows an **8px base grid**. Tailwind values that align:

```
8px   = p-2, m-2, gap-2
16px  = p-4, m-4, gap-4     ← eyebrow → heading
24px  = p-6, m-6, gap-6     ← heading → description
32px  = p-8, m-8, gap-8     ← card grid vertical gap (min)
40px  = p-10, m-10, gap-10  ← content block gaps
48px  = p-12, m-12           ← heading → content
64px  = p-16, m-16           ← section header → content
80px  = p-20, m-20           ← section-pad minimum
```

**Forbidden values:** p-3 (12px), p-5 (20px), p-7 (28px), p-9 (36px), p-11 (44px) — these break the 8pt grid. Exception: 20px is acceptable for small gaps (gap-5).

## Section Spacing

### Section padding
```
Standard section:  section-pad     → clamp(80px, 10vw, 140px)
Large section:     section-pad-lg  → clamp(104px, 13vw, 182px)
Small section:     section-pad-sm  → clamp(48px, 6vw, 84px)
```
ALWAYS use these classes. NEVER use raw py-20, py-24, etc.

### Between adjacent sections (no transition)
- Same bg → bg-alt: no extra spacing, section-pad handles it
- Same bg → same bg: add a divider (`h-px bg-[var(--ink-faint)]`)
- With SectionTransition: transition element sits between, no extra spacing needed

## Element Spacing Cheatsheet

### Section Header
```
Eyebrow → Heading:          mb-4    (16px)  — ALWAYS 16px, never more
Heading → Description:      mb-6    (24px)
Description → Divider:      mt-8    (32px)
Description → Content:      mb-10 md:mb-14  (40-56px)
Header block → Content:     mb-12 md:mb-16  (48-64px)
```

### Cards
```
Image → Text below:         mb-4    (16px)  for tile cards
                            mb-5    (20px)  for catalog cards
Eyebrow → Title:            mb-1    (4px)
Title → Description:        mb-3    (12px)
Description → Buttons:      mb-6    (24px)
Between buttons:            gap-6   (24px)
```

### Grid
```
Card horizontal gap:        gap-x-5 (20px) min, gap-x-6 (24px) preferred
Card vertical gap:          gap-y-8 (32px) min, gap-y-10 (40px) preferred
Grid → Load More:           mt-16   (64px)
```

### Filter Bar
```
Tab padding:                px-6 py-5  (24px horizontal, 20px vertical)
Between tab groups:         gap-2     (8px) between individual tabs
Tab row → Controls row:     border separation (no padding gap)
Controls inner gap:         gap-5     (20px) between dropdowns
Filter bar → Grid:          section-pad top portion
```

### Buttons
```
btn-fill padding:           15px 36px  (defined in globals.css)
btn-line padding:           15px 36px
link-arrow gap:             8px between text and arrow
Between primary + secondary: gap-6 (24px)
```

### Typography Line Heights
```
.display:     leading-none    (1.0)
.h1:          leading-[1.05]
.h2:          leading-[1.1]
.h3:          leading-[1.2]
.body-lg:     leading-[1.8]
.body-sm:     leading-[1.65]
.eyebrow:     leading-none    (1.0)
```

### Max Widths (readability)
```
Body text:      max-w-lg (32rem / 512px)  — 65 chars per line
Description:    max-w-xl (36rem / 576px)  — for wider layouts
Heading:        max-w-3xl or max-w-4xl    — for display headings
```

## Audit Process

When checking spacing:

1. **Section-level:** Does every section use `section-pad`? Flag raw py values.
2. **Header-level:** Is eyebrow→heading always mb-4? Heading→description always mb-6?
3. **Grid-level:** Are gaps at minimum gap-x-5 gap-y-8?
4. **Card-level:** Is image→text mb-4? Is info hierarchy consistent?
5. **Button-level:** Are CTAs using proper classes? Proper gap between them?
6. **Overall rhythm:** Squint at the page — do sections have consistent weight and breathing?

## Common Mistakes to Catch
- `mb-8` on eyebrow (too much — always mb-4)
- `gap-3` or `gap-4` on product grids (too tight)
- Missing `max-w-lg` on body text (lines too wide)
- Raw `py-32` instead of `section-pad-lg`
- `mb-2` between heading and description (too tight — needs mb-6)
- Inconsistent button gaps within same page
