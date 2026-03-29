---
name: simplify
description: Review changed code for reuse, quality, efficiency, and design system compliance, then fix any issues found. Use after writing or modifying code to ensure it meets project standards.
---

# Simplify Skill — Prime Ceramics

## What to Check

### 1. Duplicate Code
- Look for repeated patterns across section components
- Extract shared patterns into reusable components or utilities
- Check if a new component duplicates logic from an existing one

### 2. Unnecessary Complexity
- Remove unused props, state, or variables
- Simplify conditional rendering
- Replace verbose patterns with existing utility classes
- Remove over-engineering (don't abstract single-use patterns)

### 3. Design System Adherence
- Replace any hardcoded colors with CSS variables
- Replace custom typography with established classes
- Replace custom button styles with .link-arrow, .btn-fill, or .btn-line
- Replace custom spacing with section-pad, container, var(--gutter)

### 4. Performance
- Remove unused imports
- Check if GSAP is needed or if FadeIn (CSS-based) suffices
- Ensure useEffect has proper cleanup
- Check for unnecessary re-renders from state

### 5. Consistency
- Ensure naming follows project conventions
- Ensure file is in the correct directory
- Ensure consistent prop patterns with other components

## Action
After reviewing, automatically fix all issues found. Don't just report — fix them.
