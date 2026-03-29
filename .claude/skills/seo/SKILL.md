---
name: seo
description: Optimize SEO for Prime Ceramics including meta tags, structured data, Open Graph, semantic HTML, and tile-industry-specific SEO. Use when user asks about SEO, search rankings, meta tags, or discoverability.
---

# SEO Skill — Prime Ceramics

## Meta Tags (in layout.tsx)

### Required Meta
```tsx
title: "Prime Ceramics — Premium Tiles & Surfaces"  // <60 chars
description: "..."  // <160 chars, include key terms
keywords: ["premium tiles", "ceramics", "porcelain tiles", ...]
```

### Open Graph
```tsx
og:title, og:description, og:type: "website", og:locale, og:siteName, og:image
```

### Twitter Card
```tsx
twitter:card: "summary_large_image", twitter:title, twitter:description, twitter:image
```

## Structured Data (JSON-LD)
Add to layout.tsx for rich search results:

### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Prime Ceramics",
  "url": "https://prime-tiles.zunkireelabs.com",
  "logo": "https://prime-tiles.zunkireelabs.com/images/logo.png",
  "description": "Premium porcelain, ceramic, and natural stone tiles",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kathmandu",
    "addressCountry": "NP"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+977-1-XXXXXXX",
    "contactType": "sales"
  }
}
```

### LocalBusiness Schema (for each showroom)
```json
{
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  "name": "Prime Ceramics Flagship",
  "address": { ... },
  "openingHours": "Su-Fr 10:00-19:00"
}
```

### Product Schema (for collection pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Calacatta Luxe Porcelain Tile",
  "category": "Porcelain Tiles",
  "brand": { "@type": "Brand", "name": "Prime Ceramics" },
  "material": "Porcelain"
}
```

## Semantic HTML Checklist
- `<header>` for site header
- `<nav>` for navigation
- `<main>` for page content
- `<section>` for content sections (with descriptive id)
- `<article>` for standalone content (blog posts, project cards)
- `<footer>` for site footer
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- `<img>` with descriptive alt text

## Tile-Industry SEO Keywords
Primary: premium tiles, ceramic tiles, porcelain tiles, floor tiles, wall tiles
Secondary: tile showroom Nepal, bathroom tiles, kitchen tiles, natural stone tiles
Long-tail: best tile company Nepal, large format porcelain tiles, marble effect tiles
Location: tiles Kathmandu, tile shop Nepal, ceramic tiles Pokhara

## Page-Level SEO
Each page should have:
- Unique `<title>` with primary keyword
- Unique `<meta description>` with call-to-action
- One `<h1>` containing primary keyword
- Alt text on all images describing the tile/space
- Internal links to other sections/pages

## Technical SEO
- Static export generates clean HTML ✓
- `trailingSlash: true` for consistent URLs ✓
- Nginx caching: HTML no-cache, assets 1-year ✓
- Gzip compression enabled ✓
- Add `robots.txt` to public/
- Add `sitemap.xml` to public/

## robots.txt
```
User-agent: *
Allow: /
Sitemap: https://prime-tiles.zunkireelabs.com/sitemap.xml
```

## sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://prime-tiles.zunkireelabs.com/</loc><priority>1.0</priority></url>
  <url><loc>https://prime-tiles.zunkireelabs.com/services/</loc><priority>0.8</priority></url>
</urlset>
```
