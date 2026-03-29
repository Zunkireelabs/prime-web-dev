---
name: deploy
description: Deploy Prime Ceramics website to dev or prod. Use when the user says deploy, push live, go live, ship it, or update the site. Runs build checks before deploying.
---

# Deploy Skill — Prime Ceramics

## Pre-deployment Checklist
Before deploying, always verify:

1. **Build passes**: Run `npm run build` and ensure zero errors
2. **No TypeScript errors**: Build includes type checking
3. **Static export exists**: Confirm `out/` directory was created
4. **Container health**: Verify Docker is running

## Deployment Commands

### Dev deployment (default)
```bash
./deploy.sh dev
```
- Deploys to: `https://dev-primetiles.zunkireelabs.com`
- Container: `prime-web-dev`
- Compose file: `docker-compose.dev.yml`
- No confirmation needed

### Production deployment (requires explicit user request)
```bash
./deploy.sh prod
```
- Deploys to: `https://prime-tiles.zunkireelabs.com`
- Container: `prime-web-prod`
- Compose file: `docker-compose.yml`
- CRITICAL: NEVER deploy to production unless the user explicitly asks

## Post-deployment Verification
After deploying, verify the site is serving correctly:
```bash
curl -sk https://dev-primetiles.zunkireelabs.com/ -o /dev/null -w "%{http_code}"
```
Should return `200`.

## Troubleshooting
- If 404: Check if another container is using the same Traefik host rule
- If build fails: Check TypeScript errors, missing imports, or deleted components
- If container won't start: Check Docker network `hosting` exists, check Traefik is running

## Important Rules
- ALWAYS deploy to dev only, unless user explicitly says "production" or "prod"
- ALWAYS run build first to catch errors before Docker build
- NEVER force push or skip the build step
