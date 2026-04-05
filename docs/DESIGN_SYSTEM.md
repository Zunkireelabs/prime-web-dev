# Prime Ceramics — Design System

## Color Palette

### Surfaces

| Token | Value | Usage |
|-------|-------|-------|
| Surface (light) | `#f7f4ef` | Primary background |
| Surface Alt | `#ebe4d8` | Alternate sections |
| Surface Dark | `#0f0c09` | Dark sections |
| Surface Red | `#6f1014` | Brand accent sections (Spirit of Nepal, CTA) |

### Ink (Text)

| Token | Value | Usage |
|-------|-------|-------|
| Ink | `#2b241c` | Primary text (never pure black) |
| Ink Light | `#5e5650` | Secondary text |
| Ink Muted | `#6f6254` | Tertiary text, labels |
| Ink Faint | `#d5cfc6` | Dividers, borders |
| Ink on Dark | `#e8dcc8` | Text on dark backgrounds |
| Ink on Red | `#FDE0DB` | Text on red backgrounds |

### Accent

| Token | Value | Usage |
|-------|-------|-------|
| Accent | `#b58a52` | Warm gold — primary brand color, used sparingly |
| Accent Light | `#d7b98a` | Lighter gold for hover and highlights |
| Accent Hover | `#c9a06a` | Button hover states |

---

## Typography

### Fonts

- **Headings:** Cormorant Garamond (serif, weight 300 light)
- **Body:** Inter (sans-serif, weight 300–400)

### Scale

All heading sizes use `clamp()` for fluid, responsive sizing.

| Class | Size | Usage |
|-------|------|-------|
| `.display` | `clamp(2.8rem, 6vw, 5.5rem)` | Hero headlines |
| `.h1` | `clamp(2.2rem, 4.5vw, 4rem)` | Page titles |
| `.h2` | `clamp(1.8rem, 3.5vw, 3rem)` | Section headings |
| `.h3` | `clamp(1.3rem, 2.2vw, 1.85rem)` | Sub-headings |
| `.eyebrow` | `0.7rem`, tracking `0.18em`, uppercase | Section labels |
| `.body-lg` | `clamp(1rem, 1.15vw, 1.15rem)` | Lead paragraphs |
| `.body-sm` | `0.9rem` | Standard body text |

---

## Spacing System

Base unit: 8pt grid. All spacing values must be applied via inline styles, not Tailwind utility classes.

### Section Padding

```
Section: clamp(100px, 12vw, 180px) 0
Hero bottom: clamp(80px, 8vw, 120px)
```

### Element Spacing

| Value | Usage |
|-------|-------|
| `8px` | Tight — label gaps, small margins |
| `16px` | Standard — eyebrow to heading, icon gaps |
| `24px` | Medium — heading to description, card gaps |
| `32px` | Generous — description to buttons, grid gaps |
| `48px` | Spacious — description to content, section header to body |
| `64px` | Section header blocks |
| `80px` | Between major content blocks |

---

## Buttons

All buttons share a base spec:

- **Min-height:** 52px
- **Padding:** 18px 36px (desktop: 18px 44px)
- **Font size:** 0.72rem
- **Font weight:** 600
- **Letter-spacing:** 0.16em

| Class | Description |
|-------|-------------|
| `.btn-fill` | Solid dark fill, white text |
| `.btn-line` | Outlined, dark border |
| `.btn-gold` | Gold fill, white text — primary CTA |
| `.btn-red` | Red fill, for use on light backgrounds |
| `.btn-on-red` | Light fill, for use on red backgrounds |
| `.btn-on-red-outline` | Outlined, for use on red backgrounds |
| `.link-arrow` | Text link with trailing arrow icon |

---

## Cards

| Class | Description |
|-------|-------------|
| `.luxury-card` | Light background, subtle border, hover `translateY(-2px)` |
| `.luxury-card-dark` | Dark background, gold border accent |

---

## Transitions

- **Standard duration:** 0.3s
- **Emphasis duration:** 0.5s
- **Slow reveal duration:** 0.7s
- **Easing:** `linear` — no bouncy or spring easing anywhere
- **Images:** Grayscale to color on hover via `.img-gs` class
- **Cards:** `translateY(-2px)` on hover

---

## Dividers

| Class | Description |
|-------|-------------|
| `.accent-line` | 48px gold horizontal line |
| `.gold-divider` | 48px wide, 2px tall gold line |
| `.gold-divider-center` | Centered variant of `.gold-divider` |
| `.gold-divider-full` | Full-width, 1px gold line |
