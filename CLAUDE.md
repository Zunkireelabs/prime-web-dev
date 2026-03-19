# Prime Web Dev

## Project Overview
Premium Next.js 14 static website with dark luxury aesthetic.

## Tech Stack
- **Framework:** Next.js 14 (static export)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animation:** GSAP 3.12 (FREE tier only) + Framer Motion 11 + Lenis smooth scroll
- **Icons:** Lucide React
- **Utilities:** clsx + tailwind-merge

## Architecture
- Static export (`output: "export"`) — no Node.js server at runtime
- Client-side only interactive features (audio, cursor, scroll)
- Lenis + GSAP ScrollTrigger for smooth scroll
- Dynamic imports with `ssr: false` for client-only components

## Design System
- Dark luxury theme with gold (#C9A96E) accents
- Fonts: Cormorant Garamond (headings) + Inter (body)
- Section tonal backgrounds with gradient bridges
- Film grain overlay (SVG-based, CSS animated)

## Commands
```bash
npm run dev          # Local dev server
npm run build        # Static export → ./out/
npm run lint         # ESLint
./deploy.sh dev      # Deploy dev
./deploy.sh prod     # Deploy production
```

## Deployment
- Docker + Nginx Alpine + Traefik (SSL via Let's Encrypt)
- Static assets cached 1 year, HTML never cached
- Update domains in docker-compose files before deploying

## Important Notes
- GSAP: FREE tier only — no Club plugins (SplitText, DrawSVG, etc.)
- Images: unoptimized (static export) — use pre-optimized assets
- Audio: requires user interaction to start (browser policy)
- Scroll restoration: manually controlled (scrolls to top on load)
