---
name: page-builder
description: Create new pages for Prime Ceramics following the established architecture. Use when user asks to add a new page like About, Contact, individual collection pages, or any new route.
---

# Page Builder Skill — Prime Ceramics

## Page Architecture

### File Location
All pages go in `src/app/[route]/page.tsx`
```
src/app/
├── page.tsx              — Homepage
├── services/page.tsx     — Services/Collections listing
├── about/page.tsx        — About/Company page
├── contact/page.tsx      — Contact page
├── collections/
│   └── [slug]/page.tsx   — Individual collection pages
└── projects/
    └── [slug]/page.tsx   — Individual project pages
```

### Page Template
```tsx
"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// Import section components...

export default function PageName() {
  return (
    <SmoothScroll>
      <Header />
      <main className="pt-20">
        {/* Page sections */}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
```

### Page Metadata
For static export, metadata is in layout.tsx (shared) or page-level:
```tsx
// For client components, use Head from next/head or
// add metadata to the page's parent layout
```

## Common Page Types for Tile Websites

### Collections Listing Page
Sections: PageHero → FilterBar → ProductGrid → CTABanner
- Grid of all collections with filter by category/finish/size/color
- Links to individual collection pages

### Individual Collection Page
Sections: CollectionHero → ProductDetails → Specifications → RelatedCollections → CTA
- Large hero image of the collection
- Available sizes, finishes, colors
- Technical specifications table
- Related/similar collections

### About/Company Page
Sections: PageHero → BrandStory → Timeline → Team → Values → CTA
- Company history and mission
- Manufacturing process (can reuse CraftProcess)
- Team/leadership section

### Contact Page
Sections: PageHero → ContactForm → ShowroomMap → FAQ
- Enquiry form with fields: Name, Email, Phone, Type (Architect/Designer/Homeowner/Other), Message
- Map integration for showroom locations
- FAQ accordion

### Projects/Portfolio Page
Sections: PageHero → FilterBar → ProjectGrid → FeaturedTestimonial → CTA
- Grid of completed projects
- Filter by type (Residential/Commercial/Hospitality)
- Click to individual project detail

## Rules
- Every page wraps in SmoothScroll + Header + Footer
- Main content has `pt-20` to clear fixed header
- Every page should end with a CTA section
- Maintain consistent section rhythm (light/dark alternation)
- Add page to Header navigation if it's a primary page
- Add page to Footer links
- Update sitemap.xml in public/
