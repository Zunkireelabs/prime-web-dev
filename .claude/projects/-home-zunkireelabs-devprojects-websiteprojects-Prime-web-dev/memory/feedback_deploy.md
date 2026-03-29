---
name: deploy-workflow
description: Only deploy to dev during development phase — never deploy to production unless explicitly asked
type: feedback
---

Only deploy to dev (dev-primeapp.zunkireelabs.com) during the development phase. Do NOT deploy to production (prime-tiles.zunkireelabs.com) unless the user explicitly asks for it.

**Why:** User wants to finish development first before pushing anything to production.
**How to apply:** When building/testing changes, always use `./deploy.sh dev` only. Never auto-deploy to prod.
