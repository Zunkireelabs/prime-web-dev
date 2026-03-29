---
name: Auto-deploy to dev after changes
description: Always deploy to dev automatically after making changes — never ask for confirmation
type: feedback
---

Always deploy to dev immediately after making changes without asking the user for confirmation.

**Why:** User got frustrated being asked repeatedly whether to deploy to dev. They consider it implied.

**How to apply:** After any code change, run `./deploy.sh dev` automatically. Only ask for confirmation when deploying to **production**.
