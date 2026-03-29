---
name: image-ops
description: Manage, optimize, and validate images for Prime Ceramics. Use when user mentions images, photos, placeholders, image optimization, WebP conversion, or missing images.
---

# Image Operations Skill — Prime Ceramics

## Image Directory Structure
```
public/images/
├── hero/           — Hero carousel backgrounds (3+ images)
│   ├── hero-bg.jpg
│   └── cta-bg.jpg
├── services/       — Tile collection product shots (6+ images)
│   ├── service-1.jpg through service-6.jpg
├── gallery/        — Project/installation photos (6+ images)
│   ├── gallery-1.jpg through gallery-6.jpg
├── locations/      — Showroom photos (3+ images)
│   ├── location-1.jpg through location-3.jpg
└── logo.png        — Brand logo
```

## Image Requirements

### Hero Images
- Minimum: 1920x1080px (16:9)
- Format: JPG or WebP
- Subject: Lifestyle shots showing tiles installed in beautiful spaces
- Style: High-end interior photography, well-lit, warm tones
- NO text overlays (text is added via code)

### Collection/Service Images
- Minimum: 800x1000px (4:5 portrait) for main grid
- Minimum: 800x600px (4:3 landscape) for secondary
- Subject: Close-up tile textures, patterns, surfaces
- Style: Clean studio shots or in-situ installations
- Show tile texture/detail clearly

### Gallery/Project Images
- Minimum: 1200x800px (3:2)
- Subject: Completed installations in real spaces
- Style: Architectural photography, show the space + tiles
- Include variety: residential, commercial, hospitality

### Showroom Images
- Minimum: 800x600px (4:3)
- Subject: Showroom interiors, tile displays
- Style: Well-lit, inviting, show product range

## Optimization Guidelines

### Before Adding Images
1. Resize to max 2x display size (e.g., 1200px wide card → max 2400px image)
2. Compress JPG to quality 80-85 (balance quality/size)
3. Target file size: < 200KB for cards, < 500KB for hero
4. Use WebP where browser support allows

### Optimization Commands
Convert to WebP (if cwebp is available):
```bash
cwebp -q 82 input.jpg -o output.webp
```

Resize with ImageMagick (if available):
```bash
convert input.jpg -resize 1920x1080 -quality 82 output.jpg
```

Check image sizes:
```bash
find public/images -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) -exec ls -lh {} \; | awk '{print $5, $9}'
```

## Placeholder Generation
When real images aren't available, create CSS gradient placeholders:
```css
background: linear-gradient(135deg, var(--bg-alt) 0%, var(--ink-faint) 100%);
```

## Image Audit
Check for:
- Missing images referenced in components
- Oversized images (> 500KB for non-hero)
- Images without alt text in components
- Wrong aspect ratios causing layout shift
- Images not using object-cover

## Grayscale Hover Effect
All product/collection images should use the `.img-gs` class:
```html
<div className="img-gs">
  <img src="..." alt="..." className="w-full h-full object-cover" />
</div>
```
This applies grayscale(1) by default and transitions to grayscale(0) on hover.
