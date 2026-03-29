---
name: final-review
description: Pre-deployment final review — responsive edge cases, button states, loading/empty states, overflow, touch targets, polish details. Use as the last check before deploying any page.
---

# Final Review Skill — Prime Ceramics

## Pre-Deploy Checklist

Run through ALL of these before deploying. Every item must pass.

### 1. Responsive Breakpoints
Test at these exact widths:
```
375px    — iPhone SE (smallest target)
390px    — iPhone 14
430px    — iPhone 14 Pro Max
768px    — iPad portrait
1024px   — iPad landscape / small laptop
1280px   — Standard desktop
1440px   — Large desktop
1536px   — Wide monitor
```

At each breakpoint, check:
- [ ] No horizontal overflow (no horizontal scrollbar)
- [ ] Text is readable (body ≥ 14px visual size)
- [ ] Grids collapse correctly (4→3→2 cols)
- [ ] Images maintain aspect ratio
- [ ] Padding doesn't look too large on mobile or too small on desktop
- [ ] Filter bar is usable (not crammed, tabs scrollable on mobile)
- [ ] No content clipping or overflow: hidden cutting off text

### 2. Button States
Every interactive element must have ALL of these states:

```
Default:       Base appearance
Hover:         Color change, 0.3s linear transition
Active:        Slightly darker/pressed (for buttons)
Focus-visible: 1.5px solid var(--accent), 3px offset (built into globals.css)
Disabled:      opacity-50, cursor-not-allowed (if applicable)
```

Check specifically:
- [ ] `btn-fill` hover changes bg to accent
- [ ] `btn-line` hover changes border color
- [ ] `link-arrow` hover changes color + arrow translates 4px right
- [ ] Tab buttons have clear active vs inactive states
- [ ] Dropdown selects are clickable with proper cursor
- [ ] Filter bar mobile "Filters" button has visible feedback
- [ ] "Load More" button has hover state
- [ ] "Clear Filters" link has hover state

### 3. Touch Targets
Every interactive element must be at minimum 44×44px touch area.

Common failures:
- [ ] Filter tabs — ensure py-2 minimum (py-5 preferred)
- [ ] Mobile filter pills — px-4 py-2 minimum
- [ ] Download PDF icon links — wrap in enough padding
- [ ] Close buttons (X) — at least w-10 h-10
- [ ] Select dropdowns — full height clickable
- [ ] Scroll indicator buttons — if any

### 4. Empty & Edge States
- [ ] Grid with 0 results: shows clear empty state with reset action
- [ ] Search with no match: same empty state
- [ ] All filters active at once: still works, shows count correctly
- [ ] Very long tile name: doesn't overflow card, truncates or wraps properly
- [ ] Single result: grid still looks intentional, not broken
- [ ] "Coming Soon" items: clearly distinguished from active items

### 5. Typography & Text
- [ ] No orphan words on headings (single word on last line)
- [ ] Body text has max-width set (max-w-lg or max-w-xl)
- [ ] Eyebrow is always mb-4 from heading
- [ ] No raw font-size values — only design system classes
- [ ] Heading hierarchy makes sense (only one h1 per page)
- [ ] All text uses design system colors, no hardcoded hex

### 6. Transitions & Animations
- [ ] All CSS transitions are 0.3s linear (per design system)
- [ ] No bouncy/elastic easing anywhere
- [ ] FadeIn animations trigger once (not re-triggering on scroll back)
- [ ] No GSAP Club plugins used
- [ ] Hover transitions don't cause layout shift
- [ ] Page doesn't jump on load (no CLS from lazy content)

### 7. Image & Media
- [ ] All images have alt text (decorative images: alt="" aria-hidden)
- [ ] .img-gs class used for grayscale→color hover (not inline JS)
- [ ] Images have explicit aspect ratio (via aspect-[] class)
- [ ] No broken image references (check /public/ paths)
- [ ] Images don't cause layout shift on load

### 8. Accessibility Quick Check
- [ ] Page has one h1
- [ ] Heading levels don't skip (h1 → h3 without h2)
- [ ] All buttons have visible text or aria-label
- [ ] Focus-visible outline is visible on all interactive elements
- [ ] Color is not the only indicator (links have underline or icon too)
- [ ] Select dropdowns are keyboard navigable

### 9. Performance Quick Check
- [ ] No unnecessary client-side JS (use SSR where possible)
- [ ] Images are appropriately sized (not 4000px wide for a 300px card)
- [ ] No blocking scripts in head
- [ ] Bundle size is reasonable (<20kB for page-specific JS)
- [ ] No console errors or warnings

### 10. Content & Copy
- [ ] All placeholder text is replaced with real copy
- [ ] No "Lorem ipsum" or "TODO" anywhere
- [ ] Spelling and grammar correct
- [ ] Brand voice is consistent (not switching between formal/casual)
- [ ] CTAs are specific ("Request a Quote" not "Click Here")

## Output Format

```
FINAL REVIEW: /catalog
══════════════════════

Responsive:      ✅ / ❌ (list failures)
Button States:   ✅ / ❌
Touch Targets:   ✅ / ❌
Empty States:    ✅ / ❌
Typography:      ✅ / ❌
Transitions:     ✅ / ❌
Images:          ✅ / ❌
Accessibility:   ✅ / ❌
Performance:     ✅ / ❌
Content:         ✅ / ❌

SHIP: YES / NO
Blockers: ...
```
