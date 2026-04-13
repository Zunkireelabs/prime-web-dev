import type { NavItem, FooterColumn, FooterLink } from "./types";

// ── Header Nav ──

export const navItems: NavItem[] = [
  { label: "Tiles", href: "/products", hasMega: true },
  { label: "Catalog", href: "/catalog", hasMega: false },
  { label: "Projects", href: "#projects", hasMega: false },
  { label: "Dealers", href: "/dealers", hasMega: false },
  { label: "Calculator", href: "/calculator", hasMega: false },
  {
    label: "About",
    href: "/about",
    hasMega: false,
    dropdown: [
      { label: "Company Information", href: "/about" },
      { label: "Awards & Certification", href: "/about/awards" },
    ],
  },
  { label: "Contact", href: "#contact", hasMega: false },
];

// ── Mega Menu Data ──

export const megaSpaces = [
  "Living Room", "Bathroom", "Kitchen", "Bedroom",
  "Outdoor", "Commercial", "Staircase", "Elevation",
];

export const megaCollections = [
  "Carrara White", "Bottichino", "Onyx",
  "Spirit of Nepal", "Breccia", "Driftwood",
];

export const megaFinishes = [
  "Matt", "Glossy", "Polished", "Rustic", "Satin", "Carving",
];

export const megaSizes = [
  "300×300 mm", "300×450 mm", "300×600 mm",
  "400×400 mm", "600×600 mm", "600×1200 mm",
];

// ── Footer ──

export const footerColumns: FooterColumn[] = [
  {
    title: "Collections",
    links: [
      { label: "Porcelain", href: "/catalog?type=porcelain" },
      { label: "Ceramic", href: "/catalog?type=ceramic" },
      { label: "Natural Stone", href: "/catalog?type=natural-stone" },
      { label: "Large Format", href: "/catalog?type=large-format" },
      { label: "Mosaics", href: "/catalog?type=mosaics" },
      { label: "Outdoor", href: "/catalog?type=outdoor" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Company Information", href: "/about" },
      { label: "Awards & Certification", href: "/about/awards" },
      { label: "Craftsmanship", href: "/#craft" },
      { label: "Projects", href: "/#projects" },
      { label: "Careers", href: "mailto:info@primeceramics.com.np?subject=Careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Find a Showroom", href: "/dealers" },
      { label: "Request Samples", href: "mailto:sales@primeceramics.com.np?subject=Sample%20Request" },
      { label: "Tile Calculator", href: "/calculator" },
      { label: "Technical Specs", href: "/catalog" },
      { label: "Installation Guide", href: "/services" },
      { label: "FAQ", href: "/#contact" },
    ],
  },
];
