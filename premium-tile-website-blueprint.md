# Prime Tiles Website Blueprint

> The single source of truth for design, spacing, typography, and component specs.
> Every change must follow this document. No exceptions.

---

## 1. Brand Identity

- **Brand**: Prime Tiles Industries Pvt. Ltd.
- **Tagline**: "Tiles with Stile"
- **Tone**: Premium, confident, warm. Not flashy. Let the product speak.
- **Audience**: Architects, builders, developers, homeowners (Nepal)
- **Competitors**: Simpolo (minimalism), Jaquar (typography/showcase), Kajaria (structure/browsing)

---

## 2. Color System

### Surfaces (Backgrounds)
| Token | Hex | Usage |
|-------|-----|-------|
| `surface` | `#f7f4ef` | Default light background |
| `surface-alt` | `#ebe4d8` | Alternating light sections (must be visibly different from surface) |
| `surface-dark` | `#0f0c09` | Dark sections |
| `surface-dark-alt` | `#17120e` | Dark cards/elevated |
| `surface-card` | `#faf8f4` | Card backgrounds on light |
| `surface-red` | `#7A1518` | Brand red sections |

### Ink (Text)
| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#2b241c` | Primary text on light |
| `ink-light` | `#5e5650` | Body text on light |
| `ink-muted` | `#6f6254` | Secondary/label text on light |
| `ink-faint` | `#d5cfc6` | Borders, dividers on light |
| `ink-on-dark` | `#e8dcc8` | Primary text on dark |
| `ink-on-dark-light` | `#a89d8e` | Body text on dark |
| `ink-on-dark-muted` | `#5a5347` | Tertiary text on dark |
| `ink-on-red` | `#F5DDD5` | Primary text on red |
| `ink-on-red-muted` | `rgba(245,221,213,0.72)` | Body text on red |

### Accent
| Token | Hex | Usage |
|-------|-----|-------|
| `accent` | `#b58a52` | Gold accent - CTAs, hover, dividers |
| `accent-light` | `#d7b98a` | Lighter gold - eyebrows on dark |
| `accent-hover` | `#c9a06a` | Hover state for gold buttons |

### Brand Red
| Token | Hex | Usage |
|-------|-----|-------|
| `red` | `#9B1B20` | Primary red |
| `red-light` | `#C4363C` | Hover state |
| `red-deep` | `#6B1216` | Darker variant |

### Rules
- Never use pure black (`#000`) for text. Always use `ink` tokens.
- Never use pure white (`#fff`) for backgrounds. Always use `surface` tokens.
- Accent gold is used SPARINGLY: CTAs, hover states, dividers, eyebrows. Not on every element.
- Every text color must have minimum 4.5:1 contrast ratio against its background (WCAG AA).

---

## 3. Typography

### Font Stack
- **Headings**: Cormorant Garamond (serif) via `--font-display`
- **Body**: Inter (sans-serif) via `--font-body`

### Scale
| Class | Size | Weight | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `.display` | clamp(2.8rem, 6vw, 5.5rem) | 300 | 0.95 | -0.025em | Hero headlines only |
| `.h1` | clamp(2.2rem, 4.5vw, 4rem) | 300 | 1.05 | -0.015em | Page titles |
| `.h2` | clamp(1.8rem, 3.5vw, 3rem) | 400 | 1.12 | -0.01em | Section headings |
| `.h3` | clamp(1.3rem, 2.2vw, 1.85rem) | 400 | 1.25 | - | Card titles, sub-headings |
| `.eyebrow` | 0.7rem | 600 | - | 0.18em | Section labels, uppercase |
| `.body-lg` | clamp(1rem, 1.15vw, 1.15rem) | 300 | 1.65 | - | Primary body text |
| `.body-sm` | 0.9rem | 300 | 1.6 | - | Secondary body text |

### Rules
- Headings on dark backgrounds use weight 400 minimum (300 is too thin for light-on-dark).
- Minimum readable font size: **0.7rem (11.2px)** on desktop, **0.75rem (12px)** on mobile.
- Never use `text-[0.55rem]` or `text-[0.5rem]` — these are unreadable.
- All clamp() values must have a mobile minimum that's readable on 375px screens.
- Uppercase text reduces readability — use sparingly and only with increased letter-spacing.

---

## 4. Spacing System

### Global Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-gutter` | clamp(24px, 5vw, 56px) | Container horizontal padding |
| `--spacing-section` | clamp(100px, 12vw, 160px) | Vertical space between sections |
| `--max-w` | 1360px | Container max-width |

### Section Padding Classes
| Class | Value |
|-------|-------|
| `.section-pad` | padding: var(--section-gap) 0 |
| `.section-pad-sm` | padding: calc(var(--section-gap) * 0.6) 0 |
| `.section-pad-lg` | padding: calc(var(--section-gap) * 1.3) 0 |

### Content Spacing Rules

**Inside cards/panels** (content must never touch its container border):
| Breakpoint | Minimum Padding |
|------------|----------------|
| Mobile (< 768px) | `p-8` (32px) minimum |
| Tablet (768px+) | `p-10` to `p-12` (40-48px) |
| Desktop (1024px+) | `p-12` to `p-16` (48-64px) |

**Between elements inside a section:**
| Element Pair | Minimum Gap |
|-------------|-------------|
| Eyebrow → Heading | `mb-5` to `mb-6` (20-24px) |
| Heading → Divider/Body | `mb-6` to `mb-8` (24-32px) |
| Body → CTA | `mb-10` to `mb-12` (40-48px) |
| Section header → Content | `mb-14` to `mb-20` (56-80px) |
| Card → Card | `mb-8` minimum (32px) |

**Grid gaps:**
| Context | Minimum Gap |
|---------|-------------|
| Card grids | `gap-5` (20px) mobile, `gap-6` to `gap-8` (24-32px) desktop |
| Content grids (2-col layouts) | `gap-14` (56px) mobile, `gap-20` to `gap-24` (80-96px) desktop |
| Marquee/scroll items | `gap-8` to `gap-10` (32-40px) |

### Rules
- Every section MUST wrap content in `.container` for consistent gutters.
- Content inside a bordered card must have VISIBLE padding from all edges — minimum 32px on mobile.
- Never use `gap-0` between grid columns that contain text — minimum `gap-4` (16px).
- The 8px grid: all spacing values should be multiples of 8 (8, 16, 24, 32, 40, 48, 56, 64, 80, 96).

---

## 5. Layout

### Container
```css
.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 var(--gutter); /* clamp(24px, 5vw, 56px) */
}
```

### Page Structure (Homepage)
```
Hero (dark, full-screen)
  ↓
BrandIntro (light, section-pad)
  ↓
FindBySpace (light, custom padding)
  ↓
ProductShowcase (light, section-pad, sticky cards)
  ↓
FactoryBanner (dark, parallax, custom height)
  ↓
StatsBar (red, py-20 md:py-28)
  ↓ diagonal transition
BrowseBy (light, section-pad)
  ↓
CollectionsGrid (light-alt, py-24 md:py-32 lg:py-40)
  ↓ diagonal transition
SpiritSection (red, custom padding)
  ↓ wave transition
VirtualShowroom (dark, section-pad)
  ↓ wave transition
ClientsSection (light-alt, section-pad)
  ↓ wave transition
DealerNetwork (dark, section-pad)
  ↓ diagonal transition
CTASection (red, py-24 md:py-32 lg:py-36)
  ↓
Footer (dark)
```

### Section Color Rhythm
The page alternates between surfaces to create visual rhythm:
- **Light → Dark/Red → Light → Red → Dark → Light → Dark → Red → Dark**
- Adjacent same-color sections are allowed IF they serve different purposes.
- SectionTransition components bridge color changes (6 total, don't add more).

---

## 6. Component Specs

### Header
- **Height**: 72px mobile, 80px desktop
- **Position**: Fixed, z-50
- **Scrolled state**: Light background with blur + shadow
- **Unscrolled**: Transparent with gradient overlay
- **Mobile menu**: Full-screen overlay, surface-dark, close button top-left
- **Desktop nav**: 0.7rem, weight 500, tracking 0.18em, uppercase

### Hero (HeroMain)
- **Height**: 100vh
- **Slides**: 4, auto-rotate every 6s, pause on hover
- **Gradient overlays**: 2 maximum (top + radial vignette)
- **Content**: Centered, eyebrow + heading + body + CTA
- **Bottom tabs**: Collection names, active underline with accent
- **No decorative elements**: No grain, no side text, no large index numbers

### ProductShowcase (Sticky Cards)
- **Grid**: 12 columns, image 6 + content 6
- **Sticky offset**: 70px + (index * 14px)
- **Card gap**: mb-8
- **Image**: min-h 260px mobile, 380px desktop, max-h 460px
- **Content padding**: px-8 py-12 (mobile) / md:px-16 md:py-16 / lg:px-24 lg:py-20
- **Heading**: clamp(2rem, 3.5vw, 3.2rem), uppercase, letter-spacing 0.06em
- **Alternating**: Even cards = image left, odd = image right (via direction:rtl)
- **No decorative elements**: No grid textures, no corner accents

### FactoryBanner
- **Height**: h-[60vh] md:h-[70vh] lg:h-[75vh], min 450px, max 700px
- **Content**: Bottom-aligned, inside .container
- **Bottom padding**: pb-16 md:pb-20 lg:pb-24
- **Parallax**: Subtle translateY based on scroll position
- **No decorative elements**: No grain, no side text

### StatsBar
- **Background**: surface-red
- **Padding**: py-20 md:py-28
- **Grid**: 2 cols mobile, 4 cols desktop
- **Stat spacing**: icon mb-6, number mb-4, divider mb-4, label mb-2
- **Min text sizes**: Label 0.7rem, sub-label 0.65rem

### SectionTransition
- **Variants**: diagonal, wave, mosaic
- **Height**: clamp(30-80px) depending on variant
- **Max count**: 6 per page
- **Colors**: Uses `--color-surface-*` tokens in SVG fills

### Buttons
| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `.btn-fill` | ink | surface | ink | accent bg, lift -1px, glow shadow |
| `.btn-line` | transparent | ink | ink-faint | accent border+text, lift -1px |
| `.btn-gold` | accent | surface-dark | accent | accent-hover, lift -1px, gold shadow |
| `.btn-gold-outline` | transparent | accent | accent/30 | accent border, accent-subtle bg |
| `.btn-red` | red | white | red | red-light, lift -1px, red glow |
| `.btn-on-red` | ink-on-red | surface-red | ink-on-red | white bg, lift -1px |
| `.btn-on-red-outline` | transparent | ink-on-red | ink-on-red/30 | ink-on-red border |

**All buttons**: min-height 52px, 44px minimum touch target on mobile.

### Link Arrow (.link-arrow)
- Font: 0.8rem, weight 500, tracking 0.12em, uppercase
- Min-height: 44px (touch target)
- Hover: color accent, gap increases 10px → 14px, arrow translates right

---

## 7. Image Treatment

### Aspect Ratios (Standardized)
| Context | Ratio |
|---------|-------|
| Hero slides | Full viewport (h-screen) |
| Product cards (portrait) | 3:4 |
| Product cards (landscape) | 16:10 |
| Factory/banner | Viewport height based |
| Collection marquee | 3:4 |

### Hover Effect (Unified)
- **Scale**: 1.03x over 0.7s with ease-out
- **Easing**: cubic-bezier(0.22, 1, 0.36, 1)
- **No filter changes on hover** (no grayscale toggle, no brightness shift)

### Rules
- All images use `loading="lazy"` except hero slides.
- All images use `object-cover` to prevent distortion.
- Never set both min-height and max-height on image containers (causes squeeze).

---

## 8. Animation & Motion

### Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | All transitions |
| `--duration-fast` | 0.2s | Hover states |
| `--duration-base` | 0.35s | Standard transitions |
| `--duration-slow` | 0.6s | Page-level reveals |

### FadeIn Stagger Pattern
For grouped elements (eyebrow, heading, body, CTA):
- Element 1: delay 0s
- Element 2: delay 0.08s
- Element 3: delay 0.15s
- Element 4: delay 0.22s
- Element 5: delay 0.30s

### Rules
- Use `--ease-out` for ALL transitions. No other easing.
- Use `--duration-base` for hover states. Use `--duration-slow` for reveals.
- No film grain textures. No noise overlays. They add clutter.
- No spinning/rotating decorative elements.
- `prefers-reduced-motion: reduce` must disable all animations.

---

## 9. Mobile Rules

### Breakpoints
| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Ultra-wide |

### Touch Targets
- Minimum 44px x 44px for all interactive elements.
- Buttons: min-height 52px.
- Link text: min-height 44px (via padding).

### Typography
- Minimum font size: 12px (0.75rem) on any screen.
- Never use `text-[0.55rem]`, `text-[0.5rem]`, or `text-[0.6rem]` on mobile.

### Layout
- Mobile gutter: minimum 24px.
- Card padding: minimum 32px (p-8) on mobile.
- No sticky card behavior on screens < 768px (use normal flow instead).

---

## 10. What NOT to Do

- Do NOT add film grain/noise texture overlays.
- Do NOT add decorative corner L-shapes or accent lines that serve no purpose.
- Do NOT add spinning/rotating SVG elements.
- Do NOT add vertical side text ("Prime Ceramics", "Rautahat, Nepal").
- Do NOT use `gap-0` between content columns.
- Do NOT hardcode colors — always use design tokens.
- Do NOT use inline `style={{}}` for colors — use Tailwind token classes.
- Do NOT add more than 6 SectionTransitions on a single page.
- Do NOT add a loading screen that delays content visibility.
- Do NOT use `text-white/20` or `text-white/30` for text that needs to be read.
- Do NOT use font-weight 300 for text on dark backgrounds.

---

## 11. File Architecture

```
src/
  app/
    globals.css          — Design tokens, typography, buttons, utilities
    layout.tsx           — Root layout, fonts, metadata, structured data
    page.tsx             — Homepage section composition
    about/               — About page
    catalog/             — Catalog/browse page
    dealers/             — Dealer directory
    services/            — Services page
  components/
    layout/
      Header.tsx         — Fixed header with mega menu
      Footer.tsx         — Site footer
      Providers.tsx      — Context providers
      SmoothScroll.tsx   — Lenis smooth scroll wrapper
    sections/            — Page sections (one per file)
    ui/                  — Reusable UI components
    animations/          — FadeIn, CountUp, SplitHeading, MaskReveal
  data/                  — All site content (never hardcode in components)
    types.ts             — TypeScript interfaces
    collections.ts       — Tile data
    hero.ts              — Hero slides
    navigation.ts        — Nav items, footer columns
    ...
```

### Rules
- All content lives in `src/data/`. Components import from there.
- One section = one file in `src/components/sections/`.
- Use `dynamic()` with `{ ssr: false }` for browser-only components.
- CSS classes go in `globals.css`. No `<style jsx>` blocks in components.

---

## 12. Deployment

- **Production**: push to `main` → GitHub Actions builds and publishes to https://primeceramics.com.np
- **Build**: `npm run build` → static export to `./out/`
- Always verify build passes before deploying.
