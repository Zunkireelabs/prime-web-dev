import type { Collection, ProductCategory, BrowseData } from "./types";

// ── Collections (used in CollectionsGrid, CollectionsStrip marquee) ──

export const collections: Collection[] = [
  { name: "Carrara White", slug: "carrara-white", category: "Porcelain", sizes: ["600×1200 mm"], image: "/images/tiles/carrara-white.webp" },
  { name: "Bottichino", slug: "bottichino", category: "Vitrified", sizes: ["600×600 mm"], image: "/images/tiles/bottichino.webp" },
  { name: "Driftwood", slug: "driftwood", category: "Wood Look", sizes: ["200×1200 mm"], image: "/images/tiles/driftwood.webp" },
  { name: "Armani Bianca", slug: "armani-bianca", category: "Large Format", sizes: ["600×1200 mm"], image: "/images/tiles/armani-bianca.webp" },
  { name: "Breccia", slug: "breccia", category: "Porcelain", sizes: ["600×600 mm"], image: "/images/tiles/breccia.webp" },
  { name: "Smoky Grey", slug: "smoky-grey", category: "Ceramic", sizes: ["300×600 mm"], image: "/images/tiles/smoky-grey.webp" },
  { name: "Sand Beige", slug: "sand-beige", category: "Ceramic", sizes: ["300×450 mm"], image: "/images/tiles/sand-beige.webp" },
  { name: "Atlantic", slug: "atlantic", category: "Wall Tile", sizes: ["300×450 mm"], image: "/images/tiles/atlantic.webp" },
  { name: "Spirit of Nepal", slug: "spirit-of-nepal", category: "Special Edition", sizes: ["600×600 mm"], image: "/images/tiles/spirit-of-nepal.webp" },
  { name: "Onyx", slug: "onyx", category: "Porcelain", sizes: ["600×600 mm"], image: "/images/tiles/onyx.webp" },
  { name: "Blossom", slug: "blossom", category: "Wall Tile", sizes: ["300×450 mm"], image: "/images/tiles/blossom.webp" },
  { name: "Antique White", slug: "antique-white", category: "Ceramic", sizes: ["300×600 mm"], image: "/images/tiles/antique-white.webp" },
  { name: "Armani Sun", slug: "armani-sun", category: "Vitrified", sizes: ["600×600 mm"], image: "/images/tiles/armani-sun.webp" },
  { name: "Vinyl Grey", slug: "vinyl-grey", category: "Vitrified", sizes: ["600×600 mm"], image: "/images/tiles/vinyl-grey.webp" },
  { name: "3D Glass", slug: "3d-glass", category: "Ceramic", sizes: ["300×450 mm"], image: "/images/tiles/3d-glass.webp" },
];

// ── Product Categories (used in ProductShowcase sticky cards) ──

export const productCategories: ProductCategory[] = [
  {
    label: "Premium",
    name: "Porcelain",
    description: "Unmatched elegance with near-zero water absorption. Crafted for modern living spaces and commercial environments where beauty meets endurance.",
    image: "/images/products/porcelain.jpg",
  },
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
  },
  {
    label: "Enduring",
    name: "Outdoor",
    description: "Anti-skid, frost-resistant, and built for Nepal\u2019s diverse climate. From patios to pool decks \u2014 surfaces that perform under every condition.",
    image: "/images/products/outdoor.jpg",
  },
];

// ── Browse By Data (used in BrowseBy tabs) ──

export const browseData: BrowseData = {
  Finishes: [
    { name: "Matt", image: "/images/browse/finish-matt.webp", slug: "komo-grid" },
    { name: "Glossy", image: "/images/browse/finish-glossy.webp", slug: "angel-hl" },
    { name: "High Gloss", image: "/images/browse/finish-high-gloss.webp", slug: "amazonite-blue" },
    { name: "Polished", image: "/images/browse/finish-polished.webp", slug: "botticino" },
    { name: "Satin", image: "/images/browse/finish-satin.webp", slug: "silken-gris" },
    { name: "Rustic", image: "/images/browse/finish-rustic.webp", slug: "kavre-slate" },
    { name: "Carving", image: "/images/browse/finish-carving.webp", slug: "canterbury-beige" },
  ],
  Sizes: [
    { name: "300×600 mm", image: "/images/browse/size-300x600.webp", slug: "desert-marble-hl" },
    { name: "400×400 mm", image: "/images/browse/size-400x400.webp", slug: "cassion-velvet" },
    { name: "600×600 mm", image: "/images/browse/size-600x600.webp", slug: "driftwood-ash" },
    { name: "600×1200 mm", image: "/images/browse/size-600x1200.webp", slug: "nero-marquina" },
  ],
  Colors: [
    { name: "White", image: "/images/browse/color-white.webp", slug: "sanibell-white" },
    { name: "Beige", image: "/images/browse/color-beige.webp", slug: "castle-beige" },
    { name: "Grey", image: "/images/browse/color-grey.webp", slug: "antiquity-grey" },
    { name: "Brown", image: "/images/browse/color-brown.webp", slug: "bedrock-brown" },
    { name: "Blue", image: "/images/browse/color-blue.webp", slug: "obsidian-blue" },
    { name: "Gold", image: "/images/browse/color-gold.webp", slug: "sigma-gold" },
  ],
  Types: [
    { name: "Ceramic", image: "/images/browse/type-ceramic.webp", slug: "classy-beige-hl" },
    { name: "Vitrified", image: "/images/browse/type-vitrified.webp", slug: "earthen-light-grey" },
    { name: "Glazed Vitrified", image: "/images/browse/type-glazed.webp", slug: "helix-marble-brown" },
    { name: "Wood Look", image: "/images/browse/type-wood.webp", slug: "woody-teak" },
    { name: "Stone Look", image: "/images/browse/type-stone.webp", slug: "stonelo-brown" },
    { name: "Art", image: "/images/browse/type-art.webp", slug: "mithila-art-buddha" },
  ],
};

