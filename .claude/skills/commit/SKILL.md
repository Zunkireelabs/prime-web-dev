---
name: commit
description: Generate clean conventional git commits from current changes. Use when user says commit, save changes, checkpoint, or after completing a task.
---

# Commit Skill — Prime Ceramics

## Workflow

### Step 1: Check Status
```bash
git status
git diff --stat
```
If nothing to commit, inform the user and stop.

### Step 2: Analyze Changes
Read the full diff to understand what changed:
```bash
git diff
git diff --cached
```
Group changes by intent — what feature, fix, or improvement do they represent?

### Step 3: Generate Commit Message
Follow **Conventional Commits** format:

```
<type>(<scope>): <short description>

- Detail 1
- Detail 2
```

### Types
| Type | When |
|------|------|
| `feat` | New component, section, page, or feature |
| `fix` | Bug fix, layout fix, broken import |
| `style` | Visual changes — spacing, colors, typography, hover states |
| `refactor` | Code restructure without visual change |
| `perf` | Performance improvement (bundle, images, lazy load) |
| `a11y` | Accessibility improvement |
| `seo` | SEO-related changes (meta, structured data, semantic HTML) |
| `chore` | Config, deps, build, deploy scripts |
| `content` | Copy/text changes only |

### Scopes (use the most specific)
```
sections    — Section components (HeroCarousel, FindBySpace, etc.)
animations  — Animation components (FadeIn, MaskReveal, etc.)
ui          — UI components (Header, Footer, BackToTop, etc.)
layout      — Layout/structural (Providers, SmoothScroll)
pages       — Page files (app/page.tsx, app/services/page.tsx)
styles      — Global CSS, design tokens
config      — next.config, tailwind, tsconfig
deploy      — Docker, deploy scripts
assets      — Images, fonts, public files
catalog     — Tile data, collections
```

### Step 4: Stage & Commit
```bash
# Stage all changes (or specific files if user specifies)
git add -A

# Commit with generated message
git commit -m "<message>"
```

### Step 5: Confirm
Show the user:
- Commit hash
- Files changed count
- Short summary of what was committed

## Rules
- ALWAYS show the proposed commit message and ask for confirmation before committing
- ALWAYS read the diff — never guess what changed
- Keep the subject line under 72 characters
- Use imperative mood ("add", "fix", "update" — not "added", "fixes", "updated")
- If changes span multiple intents, suggest splitting into multiple commits
- If there are unrelated changes mixed in, flag them to the user
- NEVER use `--no-verify` or skip pre-commit hooks
- NEVER amend or force-push without explicit user request
