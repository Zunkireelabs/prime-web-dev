---
name: deploy-workflow
description: Project has only a dev deployment target — there is no production target
type: feedback
---

This project deploys only to dev (`dev-primetiles.zunkireelabs.com`) via `./deploy.sh`. There is no production deployment target — the prod URL, prod compose file, and prod branch in deploy.sh were removed on 2026-04-10 at the user's request.

**Why:** User explicitly removed all prod-deploy capability from this repo. Any future "deploy to prod" request should prompt for clarification about where prod even is.
**How to apply:** When asked to deploy, use `./deploy.sh` (no args). If the user mentions production, ask where the prod target is — the old prod URL was deliberately retired and should not be reintroduced.
