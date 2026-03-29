---
name: page-audit
description: Full-page UX audit — user flow, visual hierarchy, 3-second scannability, conversion path, section purpose validation. Use before deploying any page or after major changes.
---

# Page Audit Skill — Prime Ceramics

## Audit Framework

Run these 7 checks in order. Each produces a PASS/FAIL/WARN result.

### 1. Three-Second Test
Open the page. Look for 3 seconds. Then answer:
- **What is this page?** (if unclear → FAIL)
- **What should I do first?** (if unclear → WARN)
- **Who is this for?** (if unclear → WARN)

If any FAIL: the hero/header section needs rework.

### 2. Section Purpose Check
For EVERY section on the page, write its purpose in ≤5 words:
```
Example:
- Hero: "Show what this page is"
- Showcase: "Browse the 5 catalogs"
- Explorer: "Filter and find tiles"
- CTA: "Request a quote"
```

If any section's purpose overlaps with another → one of them is redundant, remove it.
If any section takes >5 words to explain → it's doing too much, simplify it.

### 3. Visual Hierarchy Scoring
At each viewport height (scroll position), there should be exactly ONE focal point.

Check each viewport-height "frame":
- **1 focal point:** PASS
- **0 focal points (everything is equal):** FAIL — nothing grabs attention
- **2+ competing focal points:** FAIL — elements fight for attention

Common failures:
- Stats competing with heading in hero
- Two CTAs with equal visual weight
- Badge overlays competing with card title

### 4. User Flow Analysis
Map the intended user journey:
```
Land → Understand → Browse → Explore → Act
```

For each step, identify which section serves it:
- **Land:** Hero (do they know where they are?)
- **Understand:** Hero description (do they know what's available?)
- **Browse:** Catalog cards (can they find their catalog?)
- **Explore:** Product grid (can they find their tile?)
- **Act:** CTA (can they take the next step?)

If any step has no corresponding section → FAIL
If any step has 2+ sections → redundancy, merge them

### 5. Dead End Check
Look for states where the user is stuck:
- Filter combination that returns 0 results → needs empty state with clear reset
- "Coming Soon" items with no alternative action → needs "notify me" or at least context
- Links to # → either remove or make functional
- Download links to files that don't exist → flag as broken

### 6. Background Flow Check
Map the background colors top to bottom:
```
Example: light → light → alt → dark
```

Check against rules:
- ❌ Two dark sections adjacent
- ❌ Three same-bg sections without a divider
- ❌ More than 2 transition effects per page
- ✅ Light for browsing, dark for CTA
- ✅ Alt bg to create visual break between similar sections

### 7. Conversion Path
The page should have exactly ONE primary conversion goal.

Check:
- Is there a clear CTA section? (usually last before footer)
- Does every section subtly point toward the CTA?
- Are there "escape hatches" (download PDF, view collection) that don't abandon the page?
- Is the CTA copy specific? ("Request a Quote" not "Contact Us")

## Output Format

```
PAGE AUDIT: /catalog
═══════════════════════

1. Three-Second Test:     PASS / FAIL / WARN
   Notes: ...

2. Section Purpose:       PASS / FAIL
   - Hero: "..."
   - Showcase: "..."
   ...

3. Visual Hierarchy:      PASS / FAIL
   Notes: ...

4. User Flow:             PASS / FAIL
   Missing steps: ...

5. Dead Ends:             PASS / FAIL
   Issues: ...

6. Background Flow:       PASS / FAIL
   Sequence: light → light → alt → dark
   Issues: ...

7. Conversion Path:       PASS / FAIL
   Primary CTA: ...
   Issues: ...

OVERALL: PASS / NEEDS WORK
Priority fixes: ...
```
