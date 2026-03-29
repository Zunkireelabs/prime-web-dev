import type { Collection, ProductCategory, BrowseData, CategoryStrip } from "./types";

// ── Collections (used in CollectionsGrid, CollectionsStrip marquee) ──

export const collections: Collection[] = [
  { name: "Carrara White", slug: "carrara-white", category: "Porcelain", sizes: ["600×1200 mm"], image: "/images/tiles/carrara-white.png" },
  { name: "Bottichino", slug: "bottichino", category: "Vitrified", sizes: ["600×600 mm"], image: "/images/tiles/bottichino.png" },
  { name: "Driftwood", slug: "driftwood", category: "Wood Look", sizes: ["200×1200 mm"], image: "/images/tiles/driftwood.png" },
  { name: "Armani Bianca", slug: "armani-bianca", category: "Large Format", sizes: ["600×1200 mm"], image: "/images/tiles/armani-bianca.png" },
  { name: "Breccia", slug: "breccia", category: "Porcelain", sizes: ["600×600 mm"], image: "/images/tiles/breccia.png" },
  { name: "Smoky Grey", slug: "smoky-grey", category: "Ceramic", sizes: ["300×600 mm"], image: "/images/tiles/smoky-grey.png" },
  { name: "Sand Beige", slug: "sand-beige", category: "Ceramic", sizes: ["300×450 mm"], image: "/images/tiles/sand-beige.png" },
  { name: "Atlantic", slug: "atlantic", category: "Wall Tile", sizes: ["300×450 mm"], image: "/images/tiles/atlantic.png" },
  { name: "Spirit of Nepal", slug: "spirit-of-nepal", category: "Special Edition", sizes: ["600×600 mm"], image: "/images/tiles/spirit-of-nepal.png" },
  { name: "Onyx", slug: "onyx", category: "Porcelain", sizes: ["600×600 mm"], image: "/images/tiles/onyx.png" },
  { name: "Blossom", slug: "blossom", category: "Wall Tile", sizes: ["300×450 mm"], image: "/images/tiles/blossom.png" },
  { name: "Antique White", slug: "antique-white", category: "Ceramic", sizes: ["300×600 mm"], image: "/images/tiles/antique-white.png" },
  { name: "Armani Sun", slug: "armani-sun", category: "Vitrified", sizes: ["600×600 mm"], image: "/images/tiles/armani-sun.png" },
  { name: "Vinyl Grey", slug: "vinyl-grey", category: "Vitrified", sizes: ["600×600 mm"], image: "/images/tiles/vinyl-grey.png" },
  { name: "3D Glass", slug: "3d-glass", category: "Ceramic", sizes: ["300×450 mm"], image: "/images/tiles/3d-glass.png" },
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
    { name: "Matt", image: "/images/tiles/sand-beige.png" },
    { name: "Glossy", image: "/images/tiles/carrara-white.png" },
    { name: "HD Polished", image: "/images/tiles/armani-bianca.png" },
    { name: "Super Glossy", image: "/images/tiles/antique-white.png" },
    { name: "Polished", image: "/images/tiles/bottichino.png" },
    { name: "Rustic", image: "/images/tiles/driftwood.png" },
    { name: "Satin", image: "/images/tiles/smoky-grey.png" },
    { name: "Carving", image: "/images/tiles/3d-glass.png" },
  ],
  Sizes: [
    { name: "300×300 mm", image: "/images/tiles/breccia.png" },
    { name: "300×450 mm", image: "/images/tiles/atlantic.png" },
    { name: "300×600 mm", image: "/images/tiles/blossom.png" },
    { name: "400×400 mm", image: "/images/tiles/armani-sun.png" },
    { name: "600×600 mm", image: "/images/tiles/bottichino.png" },
    { name: "600×1200 mm", image: "/images/tiles/carrara-white.png" },
  ],
  Colors: [
    { name: "White", image: "/images/tiles/carrara-white.png" },
    { name: "Beige", image: "/images/tiles/sand-beige.png" },
    { name: "Grey", image: "/images/tiles/smoky-grey.png" },
    { name: "Brown", image: "/images/tiles/driftwood.png" },
    { name: "Black", image: "/images/tiles/vinyl-grey.png" },
    { name: "Cream", image: "/images/tiles/antique-white.png" },
  ],
  Types: [
    { name: "Wall Tiles", image: "/images/tiles/blossom.png" },
    { name: "Floor Tiles", image: "/images/tiles/bottichino.png" },
    { name: "Porcelain", image: "/images/tiles/armani-bianca.png" },
    { name: "Ceramic", image: "/images/tiles/atlantic.png" },
    { name: "Vitrified", image: "/images/tiles/breccia.png" },
    { name: "Large Format", image: "/images/tiles/carrara-white.png" },
  ],
};

// ── Category Strip (used in CollectionStrip) ──

export const categoryStrips: CategoryStrip[] = [
  { name: "Porcelain", count: "48 designs", image: "/images/services/service-1.jpg" },
  { name: "Natural Stone", count: "32 designs", image: "/images/services/service-2.jpg" },
  { name: "Wood Effect", count: "24 designs", image: "/images/services/service-3.jpg" },
  { name: "Concrete Effect", count: "18 designs", image: "/images/services/service-4.jpg" },
  { name: "Large Format", count: "36 designs", image: "/images/services/service-5.jpg" },
  { name: "Mosaics", count: "28 designs", image: "/images/services/service-6.jpg" },
];
