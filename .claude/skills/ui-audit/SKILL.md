---
name: ui-audit
description: Audit the UI for visual consistency, spacing, hierarchy, and polish. Use when user asks to check the UI, fix visual issues, audit design, or improve the look and feel.
---

# UI Audit Skill — Prime Ceramics

## Visual Consistency Checks

### 1. Spacing Rhythm
Verify consistent spacing throughout:
- Section padding uses `section-pad` (var(--section-gap): clamp 80px–140px)
- Container gutter uses `var(--gutter)`: clamp 20px–48px
- Between eyebrow and heading: `mb-4` (16px)
- Between heading and body text: `mb-6` to `mb-12` depending on section
- Grid gaps: `gap-3` to `gap-5` for cards, `gap-10` to `gap-20` for content blocks
- **Flag**: Any section using inconsistent padding or arbitrary pixel values

### 2. Typography Hierarchy
Verify every page has correct hierarchy:
- Only ONE `.display` per page (hero or major statement)
- `.h1` for primary section headings
- `.h2` for secondary headings
- `.h3` for card titles
- `.eyebrow` always above its heading with `mb-4`
- `.body-lg` for primary paragraphs, `.body-sm` for secondary
- **Flag**: Any raw font-size values, any heading class used at wrong level

### 3. Color Consistency
Scan all components for:
- Light sections: text uses `var(--ink)`, `var(--ink-light)`, `var(--ink-muted)`
- Dark sections: text uses `var(--ink-on-dark)`, `var(--ink-on-dark-light)`
- Eyebrow on light: `text-[var(--accent)]`
- Eyebrow on dark: `text-[var(--accent-light)]`
- **Flag**: Any hardcoded hex colors in components

### 4. Visual Weight Balance
Check each section for:
- Text blocks balanced with imagery (not text-heavy or image-heavy)
- Whitespace is generous but intentional
- No orphan headings (heading too far from its content)
- Grid items are visually balanced (no single item dramatically different)

### 5. Hover States
Verify all interactive elements have hover feedback:
- Links: color transition or underline animation
- Cards with images: `.img-gs` (grayscale→color) applied
- Buttons: `.link-arrow`, `.btn-fill`, or `.btn-line` with proper hover
- Nav items: color transition to `var(--ink)` or `var(--accent)`
- **Flag**: Any clickable element without a hover state

### 6. Dark/Light Section Transitions
Check the flow between sections:
- Dark→Light: Should feel natural, no jarring contrast
- Consecutive same-bg sections: Need a `.divider` between them
- Alternating rhythm should be intentional, not random

### 7. Mobile Layout
Check every section at 375px (iPhone SE) and 768px (iPad):
- No horizontal overflow
- Text is readable (min 14px for body)
- Touch targets ≥ 44x44px
- Grids collapse properly (1 column on mobile)
- Images maintain aspect ratio
- Padding/margins aren't too large on mobile

## How to Audit
1. Read every section component in `src/components/sections/`
2. For each, check against the rules above
3. Read Header and Footer for consistency
4. Report findings grouped by severity
5. Auto-fix critical and moderate issues
