// ─── Prime Ceramics — Centralized Data Types ───

// ── Tile & Catalog ──

export type TileCategory =
  | "Porcelain"
  | "Ceramic"
  | "Vitrified"
  | "Glazed Vitrified"
  | "Large Format"
  | "Wood Look"
  | "Stone Look"
  | "Marble Look"
  | "Outdoor"
  | "Natural Stone"
  | "Mosaics"
  | "Art"
  | "Cultural Heritage";

export type TileFinish =
  | "Matt"
  | "Glossy"
  | "HD Polished"
  | "Super Glossy"
  | "Polished"

  | "Satin"
  | "Carving"
  | "Lappato"
  | "Structured";

export type TileSize =
  | "300×300 mm"
  | "300×450 mm"
  | "300×600 mm"
  | "400×400 mm"
  | "600×600 mm"
  | "600×1200 mm"
  | "200×1200 mm"
  | "800×800 mm"
  | "800×1600 mm"
  | "1200×1200 mm"
  | "1200×2400 mm";

export type TileColor =
  | "White"
  | "Beige"
  | "Grey"
  | "Brown"
  | "Black"
  | "Cream";

export type TileApplication =
  | "Living Room"
  | "Bathroom"
  | "Kitchen"
  | "Bedroom"
  | "Outdoor"
  | "Commercial"
  | "Staircase"
  | "Elevation"
  | "Countertop";

export type TileType =
  | "Wall Tiles"
  | "Floor Tiles"
  | "Porcelain"
  | "Ceramic"
  | "Vitrified"
  | "Large Format";

export interface Collection {
  name: string;
  slug: string;
  category: TileCategory | "Wall Tile" | "Special Edition";
  description?: string;
  sizes: string[];
  finishes?: TileFinish[];
  colors?: TileColor[];
  thickness?: string;
  application?: TileApplication[];
  image: string;
  gallery?: string[];
  features?: string[];
  specs?: {
    waterAbsorption?: string;
    breakingStrength?: string;
    slipResistance?: string;
    peiRating?: string;
  };
}

export interface ProductCategory {
  label: string;
  name: string;
  description: string;
  image: string;
}

// ── Browse/Filter ──

export interface BrowseItem {
  name: string;
  image: string;
  slug: string;
}

export interface BrowseData {
  Finishes: BrowseItem[];
  Sizes: BrowseItem[];
  Colors: BrowseItem[];
  Types: BrowseItem[];
}

// ── Spaces ──

export interface Space {
  name: string;
  short: string;
  subtitle: string;
  image: string;
}

// ── Hero ──

export interface HeroSlide {
  image: string;
  collection: string;
  tagline: string;
  cta: string;
}

export interface HeroCarouselSlide {
  image: string;
  label: string;
  subtitle: string;
}

// ── Projects ──

export interface Project {
  title: string;
  type: string;
  tile: string;
  image: string;
  area?: string;
  year?: string;
  description?: string;
}

export interface FeaturedProjectData {
  title: string;
  collection: string;
  area: string;
  year: string;
  description: string;
  image: string;
}

// ── Showrooms & Locations ──

export interface Showroom {
  name: string;
  city: string;
  address: string;
  hours?: string;
  image: string;
  phone?: string;
  mapUrl?: string;
}

// ── Clients ──

export interface Client {
  name: string;
  logo: string;
  width: number;
  height: number;
}

// ── Testimonials ──

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  project: string;
  image?: string;
}

// ── Stats ──

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  icon: string;
}

// ── Craft Process ──

export interface CraftStep {
  num: string;
  title: string;
  text: string;
}

// ── Spirit Collection ──

export interface SpiritItem {
  name: string;
  type: string;
  size: string;
  image: string;
  desc: string;
}

// ── Navigation ──

export interface NavDropdownLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasMega: boolean;
  dropdown?: NavDropdownLink[];
}

// ── Nepal Map ──

export interface ProvinceMapPath {
  id: number;
  province: string;
  d: string;
  labelX: number;
  labelY: number;
}

// ── Dealers ──

export interface Dealer {
  name: string;
  city: string;
  province: string;
  address: string;
  phone?: string;
  contactPerson?: string;
}

// ── Catalog Downloads ──

export interface CatalogEntry {
  name: string;
  slug: string;
  size: string;
  filterValue: string;
  count: string;
  types: string;
  description: string;
  image: string;
  pdf: string;
  featured?: boolean;
}

// ── Footer ──

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
