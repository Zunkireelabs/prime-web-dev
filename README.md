# Prime Ceramics

Premium ceramic tile brand website for Prime Ceramics Pvt. Ltd. — a luxury tile brand based in Nepal. Built as a fully static Next.js 14 export with a dark luxury aesthetic, warm gold accents, and cinematic section design.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (static export) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + PostCSS |
| Animation | GSAP 3.12 (FREE tier) + Lenis smooth scroll |
| Icons | Lucide React |
| Utilities | clsx + tailwind-merge |

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Static export → ./out/
npm run lint       # ESLint
```

---

## Deployment

Deployments use Docker Compose with Nginx to serve the static `./out/` directory.

```bash
./deploy.sh dev    # Deploy to dev-primetiles.zunkireelabs.com
./deploy.sh prod   # Deploy to prime-tiles.zunkireelabs.com (requires confirmation)
```

| Environment | URL |
|---|---|
| Dev | https://dev-primetiles.zunkireelabs.com |
| Prod | https://prime-tiles.zunkireelabs.com |

> Never deploy to production unless explicitly requested.

---

## Project Structure

```
src/
├── app/                      # Pages (Next.js App Router)
│   ├── page.tsx             # Homepage
│   ├── catalog/page.tsx     # Tile catalog with filters
│   ├── dealers/page.tsx     # Dealer network + Nepal map
│   ├── about/page.tsx       # Company story (cinematic)
│   ├── about/awards/        # Awards & certifications
│   ├── services/page.tsx    # Services offered
│   ├── not-found.tsx        # 404 page
│   ├── layout.tsx           # Root layout + fonts
│   └── globals.css          # Design tokens + utilities
│
├── components/
│   ├── layout/              # Header, Footer, Providers, SmoothScroll
│   ├── sections/            # Page sections (25+ components)
│   │   └── about/           # About page sub-sections (9 components)
│   ├── ui/                  # Reusable UI (BackToTop, FloatingEnquiry, etc.)
│   └── animations/          # FadeIn, ScrollReveal, CountUp, etc.
│
├── data/                    # All site content (centralized, 13 files)
│   ├── types.ts             # TypeScript interfaces
│   ├── collections.ts       # Tile collections, browse data
│   ├── catalog.ts           # All 395 tile products
│   ├── dealers.ts           # 120+ dealer entries
│   ├── nepal-map.ts         # SVG province paths for interactive map
│   └── ...
│
└── lib/
    └── utils.ts             # cn() helper (clsx + twMerge)
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#FAFAF8` (base), `#F2F0EC` (alt), `#1A1815` (dark) |
| Ink | `#3D3A36` (primary), `#7A7670` (light), `#B0ACA6` (muted) |
| Accent | `#96704C` — warm gold, used sparingly on hover/lines |
| Heading font | Cormorant Garamond, weight 300 |
| Body font | Inter, weight 300 |
| Spacing | 8pt grid, section padding via `clamp()` |
| Transitions | `0.3s linear` — no bouncy easing |
| Image hover | Grayscale to color via `.img-gs` class |

Full reference: `docs/DESIGN_SYSTEM.md`

---

## Key Rules

**1. Inline styles for spacing**
All padding, margin, gap, and centering must use inline styles — not Tailwind utility classes. Tailwind spacing classes do not render reliably on deploy.

**2. GSAP FREE tier only**
No Club GSAP plugins. Only publicly available GSAP 3.12 features.

**3. Never hardcode data in components**
All content must be imported from `src/data/`. No strings, arrays, or objects defined inline in component files.

**4. Never hardcode colors**
Use CSS custom properties defined in `globals.css`. No hex values in component files.

**5. Static export constraints**
No API routes, no server-side rendering, no middleware. This is a fully static site (`output: "export"`).

**6. Images unoptimized**
Use `next/image` with the `unoptimized` flag. Pre-optimize all assets before adding to the project.

---

## Documentation

| File | Description |
|---|---|
| `CLAUDE.md` | AI assistant instructions and project rules |
| `SESSION_LOG.md` | Work session history |
| `docs/ARCHITECTURE.md` | Technical architecture deep dive |
| `docs/DESIGN_SYSTEM.md` | Colors, typography, spacing reference |
| `docs/DEPLOYMENT.md` | Deploy guide and Docker setup |
| `CONTRIBUTING.md` | Code conventions for contributors |

---

## Built By

[Zunkiee Labs](https://zunkireelabs.com)
