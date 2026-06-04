import type { NavItem, FooterColumn, FooterLink } from "./types";

// ── Header Nav ──

export const navItems: NavItem[] = [
  { label: "Home", href: "/", hasMega: false },
  { label: "Tiles", href: "/products", hasMega: true },
  { label: "Catalogue", href: "/catalog", hasMega: false },
  // { label: "Projects", href: "#projects", hasMega: false },
  {
    label: "About",
    href: "/about",
    hasMega: false,
    dropdown: [
      { label: "Company Information", href: "/about" },
      { label: "Awards & Certification", href: "/about/awards" },
      { label: "Projects", href: "/projects" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "CSR", href: "/csr" },
      { label: "News & Media", href: "/news" },
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
  "Matt", "Glossy", "Polished", "Satin", "Carving",
];

export const megaSizes = [
  "600×1200 mm", "600×600 mm", "400×400 mm",
  "300×600 mm", "300×450 mm", "300×300 mm",
];

// ── Footer ──

export const footerColumns: FooterColumn[] = [
  {
    title: "Collections",
    links: [
      { label: "Ceramic", href: "/products?category=Ceramic" },
      { label: "Natural Stone", href: "/products?category=Stone+Look" },
      { label: "Large Format", href: "/products?size=600%C3%971200%20mm" },
      { label: "Vitrified", href: "/products?category=Vitrified" },
      { label: "Outdoor", href: "/products?size=400%C3%97400%20mm&outdoor=1" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Company Information", href: "/about" },
      { label: "Awards & Certification", href: "/about/awards" },
      { label: "Projects", href: "/projects" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "CSR", href: "/csr" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Find a Dealer", href: "/dealers" },
      { label: "Request Samples", href: "https://wa.me/9779802310000?text=Hi%2C%20I%27d%20like%20to%20request%20tile%20samples.%20Can%20you%20help%3F" },
      { label: "Technical Specs", href: "/catalog" },
      { label: "Installation Guide", href: "/services" },
      { label: "FAQ", href: "/#contact" },
    ],
  },
];
