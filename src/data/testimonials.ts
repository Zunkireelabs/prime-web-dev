import type { Testimonial } from "./types";

// ── Load Sanity data if available ──

let sanityTestimonials: Testimonial[] | null = null;
try {
  sanityTestimonials = require("./sanity-testimonials.json") as Testimonial[];
} catch {
  // sanity-testimonials.json not generated yet — using local data
}

const localTestimonials: Testimonial[] = [
  {
    quote: "Prime Ceramics transformed our vision into reality. The quality of their porcelain is unmatched — every surface speaks of luxury and permanence.",
    author: "Rajesh Sharma",
    role: "Principal Architect, Sharma & Associates",
    project: "The Grand Atrium, Kathmandu",
  },
  {
    quote: "As an interior designer, I need tiles that deliver both beauty and performance. Prime consistently exceeds on both. Their Nordic Wood range is a game-changer.",
    author: "Anita Gurung",
    role: "Lead Designer, Aura Interiors",
    project: "Lakeside Villa, Pokhara",
  },
  {
    quote: "We've sourced from Prime for over 8 years. Their consistency, range, and technical support make them indispensable.",
    author: "Bikram Thapa",
    role: "Director, Thapa Construction Group",
    project: "Metropolitan Tower, Lalitpur",
  },
];

export const testimonials: Testimonial[] =
  sanityTestimonials && sanityTestimonials.length > 0 ? sanityTestimonials : localTestimonials;

// ── Project Testimonials (from TILESCAPE 2024) ──

export interface ProjectTestimonial {
  id: number;
  project: string;
  location: string;
  type: string;
  tile?: string;
  size?: string;
  area?: string;
  image: string;
}

let sanityProjectTestimonials: ProjectTestimonial[] | null = null;
try {
  sanityProjectTestimonials = require("./sanity-project-testimonials.json") as ProjectTestimonial[];
} catch {
  // sanity-project-testimonials.json not generated yet — using local data
}

const localProjectTestimonials: ProjectTestimonial[] = [
  {
    id: 1,
    project: "Nepalgunj Airport",
    location: "Nepalgunj",
    type: "Infrastructure",
    image: "/images/testimonials/nepalgunj-airport.jpg",
  },
  {
    id: 2,
    project: "Aadhar Mall",
    location: "Nepal",
    type: "Commercial",
    image: "/images/testimonials/aadhar-mall.jpg",
  },
  {
    id: 3,
    project: "Kathmandu Metropolitan Ward Office",
    location: "Kathmandu",
    type: "Government",
    image: "/images/testimonials/kathmandu-metro-ward.jpg",
  },
  {
    id: 4,
    project: "Durbarmarg Commercial Building",
    location: "Kathmandu",
    type: "Commercial",
    image: "/images/testimonials/durbarmarg-commercial.jpg",
  },
  {
    id: 5,
    project: "Sagacity Apartment",
    location: "Maharajgunj, Kathmandu",
    type: "Residential",
    tile: "Earthen Light Grey",
    size: "400×400 mm",
    area: "9,000 sq.ft",
    image: "/images/testimonials/sagacity-apartment.jpg",
  },
  {
    id: 6,
    project: "Karnali Province Stadium",
    location: "Karnali",
    type: "Infrastructure",
    image: "/images/testimonials/karnali-stadium.jpg",
  },
  {
    id: 7,
    project: "S.R Complex",
    location: "Bhairahawa",
    type: "Commercial",
    tile: "Lenox Grey",
    size: "600×600 mm",
    area: "56,000 sq.ft",
    image: "/images/testimonials/sr-complex.jpg",
  },
  {
    id: 8,
    project: "Manipal International Teaching Hospital",
    location: "Pokhara",
    type: "Healthcare",
    image: "/images/testimonials/manipal-hospital.jpg",
  },
  {
    id: 9,
    project: "Godawari Valley Housing",
    location: "Kathmandu",
    type: "Residential",
    tile: "Elite Light",
    size: "400×400 mm",
    area: "5,000 sq.ft",
    image: "/images/testimonials/godawari-valley.jpg",
  },
  {
    id: 10,
    project: "Suryabinayak Municipality Office",
    location: "Bhaktapur",
    type: "Government",
    image: "/images/testimonials/suryabinayak-municipality.jpg",
  },
  {
    id: 11,
    project: "Agriculture Development Bank",
    location: "Nepal",
    type: "Commercial",
    image: "/images/testimonials/agriculture-dev-bank.jpg",
  },
  {
    id: 12,
    project: "Durbarmarg Commercial Building",
    location: "Kathmandu",
    type: "Commercial",
    image: "/images/testimonials/durbarmarg-commercial-2.jpg",
  },
];

const validSanityProjectTestimonials = sanityProjectTestimonials?.filter(
  (t) => t.image && t.image.startsWith("http")
);

export const projectTestimonials: ProjectTestimonial[] =
  validSanityProjectTestimonials && validSanityProjectTestimonials.length > 0
    ? validSanityProjectTestimonials
    : localProjectTestimonials;
