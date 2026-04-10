# Prime Ceramics — Deployment Guide

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Access to the deployment server

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

## Deploy to Dev

```bash
./deploy.sh
```

This will:

1. Run `npm install`
2. Build the static site (`npm run build`)
3. Build a Docker image (Nginx Alpine + `./out/`)
4. Restart the container
5. Serve the site at: https://dev-primetiles.zunkireelabs.com

---

## Docker Architecture

| File | Purpose |
|------|---------|
| `Dockerfile` | Copies `./out/` into an Nginx Alpine container |
| `nginx/static.conf` | Handles SPA routing, caching headers, and gzip compression |
| `docker-compose.dev.yml` | Dev container configuration |

---

## URLs

| Environment | URL | Compose File |
|-------------|-----|--------------|
| Development | dev-primetiles.zunkireelabs.com | docker-compose.dev.yml |

---

## Troubleshooting

**Build fails with ENOENT**
Delete the `.next/` directory and rebuild from scratch.

**Styles not rendering correctly**
This is expected when Tailwind utility classes are used for spacing. Spacing and layout must use inline styles — this is why inline styles are mandatory for padding, margin, and centering.

**Images not loading**
Check the `public/images/` directory. Images must be pre-optimized before committing. The static export does not support `next/image` optimization at runtime — all images must be served as-is.
