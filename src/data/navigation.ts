import type { NavItem, FooterColumn, FooterLink } from "./types";
import { allProducts } from "./catalog";
import { CANONICAL_SPACES } from "./catalog/types";

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
// "By Space", "Collections", and "By Finish" are derived from live Sanity
// product data (via src/data/catalog) so the menu only ever links to values
// that actually have products behind them.

const browsableProducts = allProducts.filter((p) => p.application !== "Art Panel");

export const megaSpaces = (() => {
  const counts = new Map<string, number>();
  for (const p of browsableProducts) {
    for (const s of p.spaces ?? []) {
      if ((CANONICAL_SPACES as readonly string[]).includes(s)) counts.set(s, (counts.get(s) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([space]) => space);
})();

export const megaCollections = [
  "Spirit of Nepal", // dedicated page — not a product `collection` field value
  ...new Set(browsableProducts.map((p) => p.collection).filter((c): c is string => !!c)),
].sort((a, b) => (a === "Spirit of Nepal" ? -1 : b === "Spirit of Nepal" ? 1 : a.localeCompare(b)));

// Wall / Floor browse links → products page `application` filter. "Wall & Floor"
// tiles (large-format 600×1200) legitimately belong under both, so each link
// selects its own value plus the shared one via the comma-multi `?application=`.
export const megaCategories = [
  { label: "Wall Tiles", applications: ["Wall", "Wall & Floor"] },
  { label: "Floor Tiles", applications: ["Floor", "Wall & Floor"] },
]
  .filter((c) => c.applications.some((a) => browsableProducts.some((p) => p.application === a)))
  .map((c) => ({
    label: c.label,
    href: `/products?application=${c.applications.map(encodeURIComponent).join(",")}`,
  }));

// Fixed schema enum order (see `finish` field), filtered to values in use.
const FINISH_ENUM_ORDER = ["Matt", "Glossy", "High Gloss", "Carving", "Satin", "Polished"];

export const megaFinishes = FINISH_ENUM_ORDER.filter((f) =>
  browsableProducts.some((p) => p.finish === f)
);

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
      { label: "Installation Guide", href: "/resources/installation" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
];
