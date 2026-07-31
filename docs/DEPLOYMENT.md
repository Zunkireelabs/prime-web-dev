# Prime Ceramics — Deployment Guide

## Prerequisites

- Node.js 18+
- Push access to `main`

---

## Development

```bash
npm install
npm run dev          # Starts local dev server at http://localhost:3000
```

---

## Build

```bash
npm run build        # Generates static files in ./out/
```

The build must complete with zero errors before deploying. Do not deploy from a failed or partial build.

---

## Deploy to Production

Push to `main` (or run `deploy-prod.yml` via `workflow_dispatch`). GitHub Actions builds the static export and force-pushes it to the `prod-dist` branch. An on-box cron on the cPanel host (`*/10 * * * *`) pulls `prod-dist` and publishes it — cPanel blocks inbound SSH from datacenter IPs, so GitHub Actions can't push directly. Expect up to ~10 min between the workflow finishing and the live site updating.

Manual force-pull: `ssh primeceramics@27.111.18.110 'bash ~/deploy/cpanel-pull.sh'`

---

## URLs

| Environment | URL |
|-------------|-----|
| Production | https://primeceramics.com.np |

---

## Troubleshooting

**Build fails with ENOENT**
Delete the `.next/` directory and rebuild from scratch.

**Styles not rendering correctly**
This is expected when Tailwind utility classes are used for spacing. Spacing and layout must use inline styles — this is why inline styles are mandatory for padding, margin, and centering.

**Images not loading**
Check the `public/images/` directory. Images must be pre-optimized before committing. The static export does not support `next/image` optimization at runtime — all images must be served as-is.
