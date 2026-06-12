import type { Collection, ProductCategory, BrowseData } from "./types";

// ── Collections (used in CollectionsGrid, CollectionsStrip marquee) ──

export const collections: Collection[] = [
  { name: "Botticino", slug: "botticino", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "" },
  { name: "Nero Marquina", slug: "nero-marquina", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "" },
  { name: "Amazonite Blue", slug: "amazonite-blue", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "" },
  { name: "Cantebury Beige", slug: "cantebury-beige", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "" },
  { name: "Driftwood Ash", slug: "driftwood-ash", category: "Wood Look", sizes: ["600×600 mm"], image: "" },
  { name: "Marvel Bright", slug: "marvel-bright", category: "Marble Look", sizes: ["600×600 mm"], image: "" },
  { name: "Antiquity Grey", slug: "antiquity-grey", category: "Stone Look", sizes: ["600×600 mm"], image: "" },
  { name: "Desert Marble Dark", slug: "desert-marble-dark", category: "Ceramic", sizes: ["300×600 mm"], image: "" },
  { name: "Angel HL", slug: "angel-hl", category: "Ceramic", sizes: ["300×600 mm"], image: "" },
  { name: "Marble Grid", slug: "marble-grid", category: "Wood Look", sizes: ["600×600 mm"], image: "" },
  { name: "Cassion Velvet", slug: "cassion-velvet", category: "Vitrified", sizes: ["400×400 mm"], image: "" },
  { name: "Mithila Art - Buddha", slug: "mithila-art-buddha", category: "Art", sizes: ["300×600 mm"], image: "" },
  { name: "Aqua Dhaka Dark", slug: "aqua-dhaka-dark", category: "Cultural Heritage", sizes: ["300×600 mm"], image: "" },
  { name: "Kavre Slate", slug: "kavre-slate", category: "Stone Look", sizes: ["300×600 mm"], image: "" },
  { name: "Bedrock Light", slug: "bedrock-light", category: "Glazed Vitrified", sizes: ["600×1200 mm"], image: "" },
];

// ── Product Categories (used in ProductShowcase sticky cards) ──

export const productCategories: ProductCategory[] = [
  {
    label: "Versatile",
    name: "Ceramic",
    description: "The foundation of timeless design. Available in an extensive palette of colours, patterns, and textures — perfect for walls and creative accents.",
    image: "/images/products/ceramic.jpg",
  },
  {
    label: "Engineered",
    name: "Vitrified",
    description: "Superior strength and stain resistance through advanced vitrification. The ideal choice for high-traffic floors that demand both form and function.",
    image: "/images/products/vitrified.jpg",
  },
  {
    label: "Statement",
    name: "Large Format",
    description: "Fewer joints, grander impact. Our large-format slabs up to 1200mm create seamless surfaces that transform any space into a visual masterpiece.",
    image: "/images/products/large-format.jpg",
  },
  {
    label: "Natural",
    name: "Wood Look",
    description: "The warmth of timber with the resilience of tile. Authentic grain textures in plank formats — no maintenance, no compromise.",
    image: "/images/products/wood-look.jpg",
    seriesFilter: "Wooden",
  },
  {
    label: "Enduring",
    name: "Outdoor",
    description: "Anti-skid, frost-resistant, and built for Nepal\u2019s diverse climate. From patios to pool decks \u2014 surfaces that perform under every condition.",
    image: "/images/products/outdoor.jpg",
    seriesFilter: "Patio Series",
  },
];

// ── Browse By Data (used in BrowseBy tabs) ──

export const browseData: BrowseData = {
  Finishes: [
    { name: "Matt", image: "/images/browse/finish-matt.webp", slug: "marble-grid" },
    { name: "Glossy", image: "/images/browse/finish-glossy.webp", slug: "angel-hl" },
    { name: "High Gloss", image: "/images/browse/finish-high-gloss.webp", slug: "amazonite-blue" },
    { name: "Polished", image: "/images/browse/finish-polished.webp", slug: "botticino" },
    { name: "Satin", image: "/images/browse/finish-satin.webp", slug: "silken-gris" },

    { name: "Carving", image: "/images/browse/finish-carving.webp", slug: "cantebury-beige" },
  ],
  Sizes: [
    { name: "300×300 mm", image: "/images/browse/size-300x600.webp", slug: "alcazar-300x300" },
    { name: "300×450 mm", image: "/images/browse/size-300x600.webp", slug: "atlantica-light" },
    { name: "300×600 mm", image: "/images/browse/size-300x600.webp", slug: "desert-marble-hl" },
    { name: "400×400 mm", image: "/images/browse/size-400x400.webp", slug: "cassion-velvet" },
    { name: "600×600 mm", image: "/images/browse/size-600x600.webp", slug: "driftwood-ash" },
    { name: "600×1200 mm", image: "/images/browse/size-600x1200.webp", slug: "nero-marquina" },
  ],
  Colors: [
    { name: "White", image: "/images/browse/color-white.webp", slug: "sanibell-white" },
    { name: "Beige", image: "/images/browse/color-beige.webp", slug: "castle-beige" },
    { name: "Grey", image: "/images/browse/color-grey.webp", slug: "antiquity-grey" },
    { name: "Brown", image: "/images/browse/color-brown.webp", slug: "bedrock-light" },
    { name: "Blue", image: "/images/browse/color-blue.webp", slug: "obsidian-blue" },
    { name: "Gold", image: "/images/browse/color-gold.webp", slug: "sigma-gold" },
  ],
  Types: [
    { name: "Ceramic", image: "/images/browse/type-ceramic.webp", slug: "classy-beige-hl" },
    { name: "Vitrified", image: "/images/browse/type-vitrified.webp", slug: "earthen-light-grey" },
    { name: "Glazed Vitrified", image: "/images/browse/type-glazed.webp", slug: "helix-marble-brown" },
    { name: "Marble Look", image: "/images/browse/type-glazed.webp", slug: "godawari-marble-beige" },
    { name: "Wood Look", image: "/images/browse/type-wood.webp", slug: "woody-teak" },
    { name: "Stone Look", image: "/images/browse/type-stone.webp", slug: "stonelo-brown" },
    { name: "Monochrome", image: "/images/browse/color-white.webp", slug: "pleasant-white" },
    { name: "Cultural Heritage", image: "/images/browse/type-art.webp", slug: "sunaulo-dhaka" },
    { name: "Patio", image: "/images/browse/type-stone.webp", slug: "citrine-slate" },
    { name: "Driveway", image: "/images/browse/type-stone.webp", slug: "intex-grey" },
    { name: "Art", image: "/images/browse/type-art.webp", slug: "mithila-art-buddha" },
  ],
};

