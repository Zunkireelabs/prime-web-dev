---
name: build-check
description: Run full build verification for Prime Ceramics. Use before deploying, after major changes, or when user asks to verify, check, or test the build.
---

# Build Check Skill — Prime Ceramics

## Full Verification Pipeline

### Step 1: TypeScript + Build
```bash
npm run build 2>&1
```
- Must compile successfully
- Must pass type checking
- Must generate `out/` directory
- Check route sizes in output

### Step 2: Bundle Size Limits
After build, verify:
- Homepage (/) First Load JS < 200KB
- Shared chunks < 100KB
- Total page size < 250KB

### Step 3: Static Export Verification
```bash
ls out/index.html out/_next/static/css/ out/_next/static/chunks/
```
- `out/index.html` must exist
- CSS files must exist
- JS chunks must exist

### Step 4: HTML Validation
```bash
head -20 out/index.html
```
- Check `<title>` is set correctly
- Check `<meta name="description">` is present
- Check font preloads are present

### Step 5: Image Assets
```bash
ls public/images/hero/ public/images/services/ public/images/gallery/ public/images/locations/ 2>/dev/null
```
- Verify expected image directories exist
- Note any missing placeholder images

## Pass/Fail Criteria
- Build MUST compile with zero errors
- Types MUST pass
- Static export MUST generate out/ directory
- Bundle size MUST be under limits

## On Failure
- If TypeScript error: Fix the type issue, don't use `any` unless absolutely necessary
- If import error: Check if component was deleted or renamed
- If build error: Read the full error message and fix the root cause
- NEVER skip type checking or use `eslint: { ignoreDuringBuilds: true }` to mask issues
