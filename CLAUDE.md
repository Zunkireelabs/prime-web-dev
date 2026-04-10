# Prime Ceramics — Web Project

## Overview
Premium tile brand website. Static Next.js 14 export with dark luxury aesthetic.
Design inspired by: Simpolo (minimalism) + Jaquar (typography/showcase) + Kajaria (structure/browsing).

## Tech Stack
- **Framework:** Next.js 14 (static export, `output: "export"`)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animation:** GSAP 3.12 (FREE tier only) + Lenis smooth scroll
- **Icons:** Lucide React
- **Utilities:** clsx + tailwind-merge

## Design System
- **Light-first**: Base bg `#FAFAF8`, alt `#F2F0EC`, dark `#1A1815`
- **Ink**: Primary `#3D3A36`, light `#7A7670`, muted `#B0ACA6` (never pure black)
- **Accent**: Warm sienna `#96704C` — used sparingly on hover/lines only
- **Type**: Cormorant Garamond (headings, weight 300) + Inter (body, weight 300)
- **Images**: Grayscale→color on hover (`.img-gs` class)
- **Transitions**: 0.3s linear, no bouncy easing
- **Buttons**: Text-link style CTAs (`.link-arrow`), filled buttons used sparingly

## Architecture
- Static export — no Node.js server at runtime
- Client-side only interactives (smooth scroll, animations)
- Lenis + GSAP ScrollTrigger for smooth scroll
- Intersection Observer (via FadeIn) preferred over GSAP for simple animations
- Dynamic imports with `ssr: false` for browser-only components

## Commands
```bash
npm run dev          # Local dev server
npm run build        # Static export → ./out/
npm run lint         # ESLint
./deploy.sh          # Deploy to dev-primetiles.zunkireelabs.com
```

## URLs
- **Dev:** https://dev-primetiles.zunkireelabs.com

## Skills (27 Custom Skills)
All in `.claude/skills/`:

### Core Workflow
- **deploy** — Build & deploy with pre-flight checks (dev/prod)
- **build-check** — Full build verification pipeline (types, bundle, export)
- **commit** — Smart conventional git commits from current diff
- **review** — Code review against project standards (7-point checklist)
- **simplify** — Reduce complexity, ensure consistency, auto-fix

### Design & UI
- **component** — Create components following design system (templates, tokens, rules)
- **ui-audit** — Visual consistency, spacing, hierarchy, hover states, transitions
- **design-check** — Frontend designer eye: spacing, typography, hierarchy, placement, micro-details
- **responsive** — Mobile-first audit across all breakpoints (375px → 1536px)
- **animate** — Create & audit GSAP animations (free tier, linear easing, cleanup)

### Premium Design (opinionated standards)
- **luxury-ecommerce** — Premium e-commerce patterns: catalog layouts, card design, filter UX, product browsing
- **section-composer** — Section structure rules: header anatomy, content flow, adjacency, CTA placement
- **product-grid-master** — Grid layouts: card ratios, columns per breakpoint, load-more, empty states
- **spacing-rhythm** — 8pt grid enforcement: section gaps, element spacing, breathing room
- **page-audit** — Full UX audit: user flow, hierarchy scoring, 3-second test, conversion path
- **final-review** — Pre-deploy checklist: responsive edge cases, button states, touch targets, polish

### Quality & Performance
- **optimize** — Full audit: bundle, images, CSS, a11y, SEO, code
- **performance** — Core Web Vitals, bundle analysis, runtime perf, caching
- **accessibility** — WCAG 2.1 AA compliance (contrast, keyboard, ARIA, focus)
- **seo** — Meta tags, structured data (JSON-LD), semantic HTML, sitemap, robots.txt

### Content & Data
- **content** — Brand voice, copy templates, tile terminology, content audit
- **image-ops** — Image optimization, sizing, WebP conversion, placeholder generation
- **catalog** — Tile data management (collections, sizes, finishes, categories, specs)
- **data-sync** — Centralized data management (add/update/remove entries in src/data/)
- **bulk-import** — Import bulk content from lists, tables, or natural language

### Architecture
- **page-builder** — Create new pages following the architecture (templates, routing, metadata)

## Data Layer
All site content is centralized in `src/data/`:
```
src/data/
├── types.ts          — TypeScript interfaces for all data
├── collections.ts    — Tile collections, product categories, browse data
├── spaces.ts         — Room/application types
├── hero.ts           — Hero slides
├── projects.ts       — Project case studies
├── showrooms.ts      — Showroom locations
├── clients.ts        — Client logos
├── testimonials.ts   — Customer testimonials
├── stats.ts          — Company statistics
├── craft.ts          — Manufacturing process steps
├── spirit.ts         — Spirit of Nepal collection
├── navigation.ts     — Nav items, mega menu, footer
└── index.ts          — Re-exports everything
```
**Rule:** Never hardcode data in components. Always import from `src/data/`.

## Important Rules
- GSAP: FREE tier only — no Club plugins
- Images: unoptimized (static export) — use pre-optimized assets
- NEVER deploy to production unless explicitly asked
- NEVER hardcode colors — always use CSS variables
- Transitions: 0.3s linear only
