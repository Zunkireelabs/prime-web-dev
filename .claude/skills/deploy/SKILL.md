---
name: deploy
description: Deploy Prime Ceramics website to production. Use when the user says deploy, push live, go live, ship it, or update the site. Runs build checks before deploying.
---

# Deploy Skill — Prime Ceramics

## Pre-deployment Checklist
Before deploying, always verify:

1. **Build passes**: Run `npm run build` and ensure zero errors
2. **No TypeScript errors**: Build includes type checking
3. **Static export exists**: Confirm `out/` directory was created

## Deployment Command

Push to `main` (or `gh workflow run deploy-prod.yml`). GitHub Actions builds the static export and force-pushes it to the `prod-dist` branch. An on-box cron on the cPanel host (`*/10 * * * *`) pulls `prod-dist` and publishes it — allow up to ~10 min for the live site to update.

Manual force-pull: `ssh primeceramics@27.111.18.110 'bash ~/deploy/cpanel-pull.sh'`

## Post-deployment Verification
After deploying, verify the site is serving correctly:
```bash
curl -sk https://primeceramics.com.np/ -o /dev/null -w "%{http_code}"
```
Should return `200`.

## Troubleshooting
- If stale content: cron hasn't pulled yet — check timing or force-pull manually
- If build fails: Check TypeScript errors, missing imports, or deleted components

## Important Rules
- ALWAYS run build first to catch errors before deploying
- NEVER force push or skip the build step
