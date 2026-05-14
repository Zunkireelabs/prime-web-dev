import type { HeroSlide, HeroCarouselSlide } from "./types";

// ── Load Sanity data if available, otherwise use local ──

let sanityHeroes: HeroSlide[] | null = null;
try {
  sanityHeroes = require("./sanity-heroes.json") as HeroSlide[];
} catch {
  // sanity-heroes.json not generated yet — using local data
}

// ── HeroMain slides ──

const localHeroSlides: HeroSlide[] = [
  {
    image: "/images/hero/slide-1.jpg",
    collection: "Carrara White",
    tagline: "Timeless Italian Elegance",
    cta: "Discover More",
  },
  {
    image: "/images/hero/slide-2.jpg",
    collection: "Spirit of Nepal",
    tagline: "Culture Meets Craftsmanship",
    cta: "Explore Collection",
  },
  {
    image: "/images/hero/slide-3.jpg",
    collection: "Bottichino",
    tagline: "Make Your Space Luxurious",
    cta: "View Collection",
  },
  {
    image: "/images/hero/slide-4.jpg",
    collection: "Onyx",
    tagline: "The Art of Living Well",
    cta: "Discover More",
  },
];

const validSanityHeroes = sanityHeroes?.filter((h) => h.image && h.image.startsWith("http"));

export const heroSlides: HeroSlide[] =
  validSanityHeroes && validSanityHeroes.length > 0 ? validSanityHeroes : localHeroSlides;

// ── HeroCarousel slides (alternate hero) ──

export const heroCarouselSlides: HeroCarouselSlide[] = [
  {
    image: "/images/hero/hero-bg.jpg",
    label: "Living Room Tiles",
    subtitle: "Calacatta Luxe Collection",
  },
  {
    image: "/images/gallery/gallery-1.jpg",
    label: "Bathroom Surfaces",
    subtitle: "Terra Nova Collection",
  },
  {
    image: "/images/gallery/gallery-2.jpg",
    label: "Kitchen Tiles",
    subtitle: "Nordic Wood Collection",
  },
];
