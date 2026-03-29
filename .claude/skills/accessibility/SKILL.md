---
name: accessibility
description: Audit and fix accessibility issues to meet WCAG 2.1 AA standards. Use when user mentions accessibility, a11y, screen readers, keyboard navigation, contrast, or inclusive design.
---

# Accessibility Skill — Prime Ceramics

## WCAG 2.1 AA Compliance Audit

### 1. Perceivable

#### Color Contrast (1.4.3)
Minimum ratios:
- Normal text (< 24px): 4.5:1
- Large text (≥ 24px or bold ≥ 18.5px): 3:1
- UI components: 3:1

Project palette compliance:
| Pair | Ratio | Status |
|------|-------|--------|
| var(--ink) on var(--bg) | ~10:1 | PASS |
| var(--ink-light) on var(--bg) | ~4.5:1 | PASS |
| var(--ink-muted) on var(--bg) | ~2.5:1 | FAIL — decorative only |
| var(--ink-on-dark) on var(--bg-dark) | ~12:1 | PASS |
| var(--accent) on var(--bg) | ~4.2:1 | PASS for large text only |
| White on image overlays | Varies | CHECK each instance |

**Action**: Ensure body text never uses `var(--ink-muted)`. Only for decorative/non-essential.

#### Images (1.1.1)
- ALL `<img>` must have `alt` attribute
- Decorative images: `alt=""`
- Product images: Describe the tile ("Calacatta Luxe porcelain tile with grey veining")
- Background images in CSS: Ensure text overlay has sufficient contrast

#### Video/Audio (1.2)
- Not applicable currently (no video/audio content)

### 2. Operable

#### Keyboard Navigation (2.1.1)
- All interactive elements reachable via Tab key
- Focus order follows visual reading order
- No keyboard traps
- Custom components (carousel, tabs) must handle arrow keys

Specific checks:
- Hero carousel: Can navigate slides with keyboard
- Browse By tabs: Can switch tabs with arrow keys
- Mobile menu: Can open/close with Enter/Space
- Testimonial nav: Buttons are focusable
- All links and buttons: Focusable and activatable

#### Focus Visible (2.4.7)
Add focus styles to globals.css:
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

#### Skip Navigation (2.4.1)
Add skip-to-content link as first element in body:
```html
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[var(--accent)] focus:text-white focus:px-4 focus:py-2">
  Skip to content
</a>
```

#### Page Titles (2.4.2)
Each page must have unique, descriptive `<title>`.

### 3. Understandable

#### Language (3.1.1)
`<html lang="en">` — already set ✓

#### Consistent Navigation (3.2.3)
Navigation must be consistent across all pages ✓

#### Error Prevention (3.3)
Forms (future enquiry form):
- Clear labels
- Input validation with helpful messages
- Confirm before destructive actions

### 4. Robust

#### Valid HTML (4.1.1)
- No duplicate IDs
- Proper nesting of elements
- All ARIA attributes are valid

#### ARIA (4.1.2)
Required ARIA:
- Carousel: `role="region"`, `aria-label="Hero slideshow"`, `aria-roledescription="carousel"`
- Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`
- Mobile menu: `aria-expanded`, `aria-controls`
- Modals: `role="dialog"`, `aria-modal="true"`

## Implementation Fixes

### Add to globals.css
```css
/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Automated Testing
After fixes, check:
```bash
npm run build  # Ensure no errors
```
Then manually verify:
1. Tab through the entire page — can you reach everything?
2. Use only keyboard to navigate carousel and tabs
3. Check all images have alt text
4. Verify no color-only information (everything has text labels too)
