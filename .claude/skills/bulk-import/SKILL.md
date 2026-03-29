---
name: bulk-import
description: Import bulk content into the data layer — tiles, collections, projects, testimonials from lists or spreadsheet-like formats. Use when user provides a list of items to add or says bulk import/add multiple.
---

# Bulk Import Skill — Prime Ceramics

## Supported Import Formats

### 1. Comma/Line Separated List
```
Carrara White, Porcelain, 600x1200mm
Bottichino, Vitrified, 600x600mm
Driftwood, Wood Look, 200x1200mm
```

### 2. Table Format
```
Name          | Category    | Size        | Finish
Carrara White | Porcelain   | 600×1200mm  | Polished
Bottichino    | Vitrified   | 600×600mm   | Glossy
```

### 3. Natural Language
"Add these tiles: Carrara White porcelain in 600x1200, Bottichino vitrified in 600x600"

### 4. JSON/Object Format
```json
[
  { "name": "Carrara White", "category": "Porcelain", "sizes": ["600×1200 mm"] }
]
```

## Import Workflow

### Step 1: Parse Input
- Identify the data type (collections, projects, clients, etc.)
- Extract fields from whatever format the user provides
- Normalize values (e.g., "600x1200" → "600×1200 mm", "porcelain" → "Porcelain")

### Step 2: Generate Slugs
For collections, auto-generate slugs:
```
"Carrara White" → "carrara-white"
"Spirit of Nepal" → "spirit-of-nepal"
```

### Step 3: Validate
- Check all required fields are present per `types.ts` interface
- Check for duplicates against existing data
- Check image paths exist (or flag as missing)
- Validate category/finish/size values against allowed types

### Step 4: Fill Defaults
If fields are missing, use sensible defaults:
- `slug`: auto-generated from name
- `image`: `/images/tiles/{slug}.png` (flag if doesn't exist)
- `sizes`: empty array (flag as incomplete)

### Step 5: Preview
Show the user a table of what will be added:
```
✅ Carrara White (Porcelain) — 600×1200 mm — /images/tiles/carrara-white.png
✅ Bottichino (Vitrified) — 600×600 mm — /images/tiles/bottichino.png
⚠️  Driftwood (Wood Look) — image missing: /images/tiles/driftwood.png
```

### Step 6: Write
- Read the target data file
- Append new entries to the array
- Write the updated file
- Run type check

## Normalization Rules

### Categories
```
"porcelain" → "Porcelain"
"ceramic" → "Ceramic"
"vitrified" → "Vitrified"
"large format" / "large-format" → "Large Format"
"wood look" / "wood" / "wooden" → "Wood Look"
"outdoor" / "exterior" → "Outdoor"
"natural stone" / "stone" → "Natural Stone"
"mosaic" / "mosaics" → "Mosaics"
"wall" / "wall tile" → "Wall Tile"
```

### Sizes
```
"600x1200" / "600×1200" / "60x120cm" → "600×1200 mm"
"300x300" / "30x30cm" → "300×300 mm"
```
Always use `×` (multiplication sign), always append ` mm`.

### Finishes
```
"matt" / "matte" → "Matt"
"glossy" / "gloss" → "Glossy"
"polished" → "Polished"
"hd polished" → "HD Polished"
```

## Bulk Operations

### Add Multiple Collections
```
User: Add these tiles: Marble White porcelain 600x1200, Oak Natural wood look 200x1200
→ Parse → Validate → Preview → Write to collections.ts
```

### Add Multiple Clients
```
User: Add clients: ABC Corp (logo: abc.png, 120x40), XYZ Ltd (logo: xyz.png, 100x60)
→ Parse → Validate → Write to clients.ts
```

### Add Multiple Testimonials
```
User: Add testimonial from "John Doe, Architect at Studio X" for project "Villa Maya": "Great tiles..."
→ Parse → Write to testimonials.ts
```

## Post-Import

After bulk import:
1. Show summary: X added, Y skipped (duplicates), Z warnings
2. List any missing images that need to be added
3. Run `npm run build` to verify types
4. Suggest running `/data-sync` to validate everything

## Rules
- ALWAYS preview before writing — show the user what will be added
- ALWAYS check for duplicates before adding
- ALWAYS normalize values to match TypeScript types
- NEVER overwrite existing entries — only append
- NEVER skip validation — flag incomplete entries as warnings
- Flag missing images but don't block the import
