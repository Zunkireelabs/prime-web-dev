# Contributing — Prime Ceramics Web Project

Code conventions and patterns for the Prime Ceramics website. Read before writing any component.

---

## Spacing Rules (CRITICAL)

The number one rule: **ALL spacing — padding, margin, gap, centering, maxWidth, textAlign — MUST use inline styles, NOT Tailwind classes.**

Tailwind spacing classes repeatedly failed to render on the deployed static site. Inline styles work every time.

**Do this:**

```tsx
<p style={{ marginBottom: "16px" }}>Text</p>
<div style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
<div style={{ gap: "24px", textAlign: "center", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}>
```

**NOT this:**

```tsx
<p className="mb-4">Text</p>
<div className="section-pad">
<div className="gap-6 text-center max-w-lg mx-auto">
```

**Tailwind IS used for:** colors, fonts, hover states, transitions, responsive grid columns, flex utilities, overflow, positioning (relative/absolute), z-index, border colors, opacity.

---

## Standard Spacing Values

| Element                    | Value                          |
|----------------------------|--------------------------------|
| Eyebrow → Heading          | 16px                           |
| Heading → Description      | 24px                           |
| Description → Content      | 48px                           |
| Header block → Content     | 56–64px                        |
| Section vertical padding   | clamp(100px, 12vw, 180px) 0    |
| Hero bottom padding        | clamp(80px, 8vw, 120px)        |
| Grid card gaps             | 24–32px                        |
| Column gaps                | 40–56px                        |
| Card internal padding      | 28px (light), 56px 40px (dark) |

---

## Section Header Pattern

Every section follows this anatomy:

```
Eyebrow (decorative line + label)   ↕ 16px
Heading (h2/h3)                      ↕ 24px
Description (body-lg, max-width)     ↕ 48px
Content (grid, cards, etc.)
```

Example implementation:

```tsx
<div style={{ textAlign: "center", marginBottom: "64px" }}>
  <span className="eyebrow" style={{ marginBottom: "16px", display: "block" }}>
    Label
  </span>
  <h2 className="h2" style={{ marginBottom: "24px" }}>
    Section Heading
  </h2>
  <p className="body-lg" style={{ maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
    Supporting description text here.
  </p>
</div>
```

---

## Component Conventions

- Import all content from `src/data/` — never hardcode data in components
- Use `FadeIn` for scroll-triggered animations (prefer over raw GSAP for simple reveals)
- Use `clamp()` for responsive sizing instead of breakpoint-specific Tailwind classes
- Colors via CSS variables only — never hardcoded hex or rgba values
- Transitions: `0.3s linear` only — no bouncy or spring easing
- GSAP: FREE tier only — no Club plugins (ScrollSmoother, SplitText, etc.)

---

## File Organization

```
src/components/sections/   — Page sections, one per file, default export
src/components/ui/         — Reusable UI primitives (FadeIn, BackToTop, etc.)
src/components/animations/ — Animation utilities and wrappers
src/components/layout/     — Header, Footer, global layout shells
src/data/                  — All site content and data
```

One section component per file. Default exports only for section/page components.

---

## CSS Variables

Defined in `src/app/globals.css`. Always use these — never hardcode colors.

**Surfaces:**
- `--color-surface` — base background (#FAFAF8)
- `--color-surface-alt` — alternate background (#F2F0EC)
- `--color-surface-dark` — dark background (#1A1815)

**Ink (text):**
- `--color-ink` — primary text (#3D3A36)
- `--color-ink-light` — secondary text (#7A7670)
- `--color-ink-muted` — muted text (#B0ACA6)

**Accent:**
- `--color-accent` — warm gold (#b58a52), use sparingly on hover/lines
- `--color-accent-light` — lighter gold variant

**Typography classes:** `.display`, `.h1`, `.h2`, `.h3`, `.eyebrow`, `.body-lg`, `.body-sm`

**Button classes:** `.btn-fill`, `.btn-line`, `.btn-gold`, `.btn-red`, `.btn-on-red`

---

## Git Conventions

- Conventional commit prefixes: `feat:`, `fix:`, `style:`, `perf:`, `docs:`
- Run `npm run build` and confirm zero errors before every commit

---

## Deployment

```bash
./deploy.sh    # Deploy to dev-primetiles.zunkireelabs.com
```

Build must pass with zero errors and zero TypeScript warnings before deploying.
