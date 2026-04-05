# Prime Ceramics — Technical Architecture

## Static Export Architecture

Prime Ceramics is a Next.js 14 application compiled to a fully static site.

- `output: "export"` in `next.config.js` — produces static HTML/CSS/JS in `./out/`
- No Node.js server at runtime — the `./out/` directory is served by Nginx inside Docker
- All pages are pre-rendered at build time (9 routes total)
- Client-side interactives (animations, smooth scroll, catalog filters) hydrate after load
- Images use `unoptimized: true` — assets must be pre-optimized before adding to the project

Because there is no server, there are no API routes, no server components with data fetching, and no ISR. All content comes from `src/data/` files compiled into the JavaScript bundle.

---

## Page Architecture

Every page follows this wrapper pattern:

```
SmoothScroll
  └── Header (sticky, transparent → filled on scroll)
      └── <main>
              Section A
              SectionTransition (from="X" to="Y" variant="Z")
              Section B
              SectionTransition
              Section C
              ...
      </main>
      Footer
```

### Page Routes and Section Order

**Homepage (`/`)**
`VideoOverlay` → `HeroMain` → `BrandIntro` → `FindBySpace` → `ProductShowcase` → `FactoryBanner` → `StatsBar` → `BrowseBy` → `CollectionsGrid` → `SpiritSection` → `VirtualShowroom` → `ClientsSection` → `DealerNetwork` → `CTASection`

**Catalog (`/catalog`)**
`CatalogHero` → `CatalogShowcase` → `CatalogStats` → `CatalogGrid` (with `CatalogFilter`) → `CTASection`

**Dealers (`/dealers`)**
`DealersHero` → `NepalMap` → `DealersGrid` → `DealerNetwork` → `CTASection`

**About (`/about`)**
`AboutHero` → `AboutNarrative` → `AboutStats` → `AboutPurpose` → `AboutTimeline` → `AboutCraft` → `AboutCertifications` → `AboutClients` → `AboutCTA`

**Awards (`/about/awards`)**
Single long page — award hero, featured award, quality standards, brand sections, trust numbers, CTA.

**Services (`/services`)**
Service hero + service cards.

**404 (`/not-found`)**
Simple branded 404 page — no sections, no Footer dependency.

---

## Section Transition System

`SectionTransition` renders a decorative SVG or CSS shape between sections to visually blend background color changes. It is imported with `dynamic(..., { ssr: false })` because it references browser APIs.

**Props:**

| Prop | Values |
|------|--------|
| `from` | `light`, `light-alt`, `dark`, `red` |
| `to` | `light`, `light-alt`, `dark`, `red` |
| `variant` | `wave`, `diagonal`, `mosaic` |

Usage:
```tsx
<SectionTransition from="dark" to="light" variant="wave" />
```

Each combination maps to a unique SVG clip path or CSS mask so the transition matches both the outgoing and incoming background color.

---

## Animation System

Three layers, ordered by complexity:

### 1. FadeIn (Intersection Observer)
- Lives in `src/components/ui/FadeIn.tsx`
- Uses native `IntersectionObserver` — no GSAP dependency
- Preferred for simple reveal animations (opacity + translate)
- Zero JS overhead when off-screen

### 2. ScrollReveal / TextRevealByWord (GSAP ScrollTrigger)
- Lives in `src/components/ui/`
- Uses `gsap.to()` + `ScrollTrigger.create()` synced to Lenis
- Used for line-by-line text reveals and element scrubs
- Must clean up triggers in `useEffect` return

### 3. Custom GSAP (in-component)
- Used in `SpiritSection`, `CollectionsGrid`, and hero components
- Direct GSAP timelines with `ScrollTrigger`
- Must use `gsap.context()` or manual cleanup to avoid memory leaks
- FREE tier only — no Club GSAP plugins (no SplitText, no MorphSVG, etc.)

### 4. Lenis (global smooth scroll)
- `SmoothScroll.tsx` provider wraps the entire app
- Lenis RAF loop is synced to GSAP ticker via `gsap.ticker.add()`
- `ScrollTrigger.scrollerProxy()` is not used — Lenis native integration handles sync
- All scroll-linked animations reference the Lenis instance

**Easing rule:** `linear` only. No `bounce`, `elastic`, or spring easings anywhere.

---

## Data Layer

All site content is centralized in `src/data/`. Components must import from data files — no hardcoded content in JSX.

```
src/data/
├── types.ts          TypeScript interfaces for every data shape
├── collections.ts    15+ tile collections, browse categories, product categories
├── catalog.ts        395 individual tile products (size, finish, series, catalog ref)
├── dealers.ts        120+ dealer entries (province, city, phone, contact name)
├── nepal-map.ts      SVG path data for 7 provinces (used by NepalMap interactive)
├── hero.ts           Hero carousel slides
├── projects.ts       Project case studies
├── showrooms.ts      Showroom locations
├── clients.ts        Client logos
├── testimonials.ts   Customer testimonials
├── stats.ts          Company statistics
├── craft.ts          Manufacturing process steps
├── spirit.ts         Spirit of Nepal collection data
├── navigation.ts     Nav items, mega menu structure, footer links
└── index.ts          Re-exports everything
```

`types.ts` defines all interfaces. When adding new data files, add the TypeScript interface there first.

---

## Smooth Scroll Setup

`src/components/layout/SmoothScroll.tsx` is a client component that:

1. Initializes a `Lenis` instance on mount
2. Registers Lenis with `gsap.ticker` so GSAP animations stay in sync
3. Wraps `children` in a context provider (Lenis instance is accessible via hook)
4. Destroys the Lenis instance on unmount

All GSAP `ScrollTrigger` animations work correctly without `scrollerProxy` because Lenis uses native scroll position under the hood.

---

## Styling Architecture

### Tailwind CSS v4
Used for: colors, fonts, flex/grid layout, hover states, responsive variants, transitions.

### CSS Custom Properties (`globals.css`)
Design tokens defined as CSS variables — never use hardcoded color values in components:

```css
--color-ink-primary: #3D3A36;
--color-ink-light:   #7A7670;
--color-ink-muted:   #B0ACA6;
--color-accent:      #96704C;
--color-bg:          #FAFAF8;
--color-bg-alt:      #F2F0EC;
--color-dark:        #1A1815;
```

### Inline Styles for Spacing (Mandatory)
All `padding`, `margin`, `gap`, and centering values use inline styles — not Tailwind spacing classes. This is required because Tailwind's JIT-purged spacing classes can be unreliable in the static export / Nginx deploy pipeline.

```tsx
// Correct
<section style={{ padding: '96px 0' }}>

// Wrong
<section className="py-24">
```

### Premium Utility Classes (`globals.css`)
Reusable luxury-specific classes defined globally:

| Class | Purpose |
|-------|---------|
| `.btn-primary` | Filled CTA button |
| `.btn-outline` | Outlined CTA button |
| `.link-arrow` | Text-link with arrow icon |
| `.luxury-card` | Card with hover border + shadow |
| `.eyebrow` | Small uppercase label above headings |
| `.img-gs` | Grayscale image, color on hover |

---

## Dynamic Imports

Browser-only components are loaded with `dynamic(() => import(...), { ssr: false })` to prevent SSR errors during static generation:

| Component | Reason |
|-----------|--------|
| `SectionTransition` | Uses browser APIs for SVG rendering |
| `SmoothScroll` | Lenis requires `window` |
| `SoundToggle` / `SoundInvitation` | Web Audio API |
| All heavy GSAP sections | `ScrollTrigger` requires DOM |
| `NepalMap` | SVG interaction requires browser |

Pattern:
```tsx
const SectionTransition = dynamic(
  () => import('@/components/sections/SectionTransition'),
  { ssr: false }
);
```

---

## Docker and Deployment

### Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage: build Next.js, copy `./out/` into Nginx Alpine |
| `docker-compose.yml` | Production container config |
| `docker-compose.dev.yml` | Dev container config |
| `nginx/static.conf` | Nginx config — serves static files, rewrites `/page` → `/page.html` |

### Build Pipeline

```
npm run build
  └── next build
        └── Static export → ./out/
              └── Docker COPY ./out/ /usr/share/nginx/html/
                    └── Nginx serves on port 80
```

### Deploy Targets

| Environment | URL | Command |
|-------------|-----|---------|
| Dev | https://dev-primetiles.zunkireelabs.com | `./deploy.sh dev` |
| Production | https://prime-tiles.zunkireelabs.com | `./deploy.sh prod` (requires confirmation) |

Production deploys require explicit user confirmation. Never deploy to production automatically.

---

## Directory Structure (Key Paths)

```
src/
├── app/
│   ├── layout.tsx              Root layout — fonts, globals, SmoothScroll, Header, Footer
│   ├── page.tsx                Homepage
│   ├── catalog/page.tsx        Catalog page
│   ├── dealers/page.tsx        Dealers page
│   ├── about/page.tsx          About page
│   ├── about/awards/page.tsx   Awards page
│   ├── services/page.tsx       Services page
│   ├── globals.css             Design tokens, utility classes, resets
│   └── not-found.tsx           404 page
├── components/
│   ├── layout/
│   │   ├── Header.tsx          Sticky nav with mega menu
│   │   ├── Footer.tsx          Full footer with links and contact
│   │   └── SmoothScroll.tsx    Lenis + GSAP sync provider
│   ├── sections/               One file per page section
│   └── ui/
│       ├── FadeIn.tsx          Intersection Observer reveal wrapper
│       ├── ScrollReveal.tsx    GSAP scroll-linked reveal
│       ├── TextRevealByWord.tsx GSAP word-by-word reveal
│       ├── SectionTransition.tsx Visual section dividers
│       ├── BackToTop.tsx
│       ├── FloatingEnquiry.tsx
│       └── LoadingScreen.tsx
├── data/                       All site content (see Data Layer above)
└── lib/                        Shared utilities and helpers
```

---

## Constraints and Rules

- GSAP: FREE tier only. No Club plugins (SplitText, MorphSVG, DrawSVG, etc.)
- Images: `unoptimized: true` — all images must be pre-optimized before import
- Colors: CSS variables only — never hex literals in component files
- Spacing: Inline styles for all padding/margin/gap — no Tailwind spacing classes
- Transitions: `0.3s linear` everywhere — no ease-in-out, no bounce, no spring
- Data: Import from `src/data/` — never hardcode content in components
- Deployment: Never deploy to production without explicit user instruction
