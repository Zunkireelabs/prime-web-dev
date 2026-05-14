import type { Project, FeaturedProjectData } from "./types";

// ── Project Highlights (from TILESCAPE 2024) ──

export interface ProjectHighlight {
  id: number;
  title: string;
  location: string;
  type: string;
  tile: string;
  size: string;
  area: string;
  image: string;
}

// ── Load Sanity data if available ──

let sanityProjects: ProjectHighlight[] | null = null;
try {
  sanityProjects = require("./sanity-projects.json") as ProjectHighlight[];
} catch {
  // sanity-projects.json not generated yet — using local data
}

const localProjectHighlights: ProjectHighlight[] = [
  {
    id: 1,
    title: "Kamal Pokhari Commercial Complex",
    location: "Kathmandu",
    type: "Commercial",
    tile: "Pleasant White / Faith",
    size: "600×600 mm",
    area: "10,000 sq.ft",
    image: "/images/projects/kamal-pokhari.jpg",
  },
  {
    id: 2,
    title: "Nepal Music School",
    location: "Kathmandu",
    type: "Institutional",
    tile: "Smoky Blue",
    size: "600×600 mm",
    area: "5,000 sq.ft",
    image: "/images/projects/nepal-music-school.jpg",
  },
  {
    id: 3,
    title: "Sagacity Apartment",
    location: "Maharajgunj, Kathmandu",
    type: "Residential",
    tile: "Earthen Light Grey",
    size: "400×400 mm",
    area: "9,000 sq.ft",
    image: "/images/projects/sagacity-apartment.jpg",
  },
  {
    id: 4,
    title: "Nana Hotel & Resort",
    location: "Pokhara",
    type: "Hospitality",
    tile: "Mirage Dark",
    size: "300×450 mm",
    area: "8,000 sq.ft",
    image: "/images/projects/nana-hotel.jpg",
  },
  {
    id: 5,
    title: "Dhumbarahi Commercial Complex",
    location: "Kathmandu",
    type: "Commercial",
    tile: "Venise",
    size: "600×600 mm",
    area: "22,000 sq.ft",
    image: "/images/projects/dhumbarahi-complex.jpg",
  },
  {
    id: 6,
    title: "S.R Complex",
    location: "Bhairahawa",
    type: "Commercial",
    tile: "Lenox Grey",
    size: "600×600 mm",
    area: "56,000 sq.ft",
    image: "/images/projects/sr-complex.jpg",
  },
  {
    id: 7,
    title: "Helios Hospital",
    location: "Kathmandu",
    type: "Healthcare",
    tile: "Greige Grey",
    size: "600×600 mm",
    area: "2,000 sq.ft",
    image: "/images/projects/helios-hospital.jpg",
  },
  {
    id: 8,
    title: "Hotel Nagarjun Palace",
    location: "Kathmandu",
    type: "Hospitality",
    tile: "Windy Smug",
    size: "600×600 mm",
    area: "10,000 sq.ft",
    image: "/images/projects/hotel-nagarjun.jpg",
  },
  {
    id: 9,
    title: "CG Motors",
    location: "Nepal",
    type: "Commercial",
    tile: "Sand Beige",
    size: "600×600 mm",
    area: "4,000 sq.ft",
    image: "/images/projects/cg-motors.jpg",
  },
  {
    id: 10,
    title: "Godavari Valley Housing",
    location: "Kathmandu",
    type: "Residential",
    tile: "Elite Light",
    size: "400×400 mm",
    area: "5,000 sq.ft",
    image: "/images/projects/godavari-valley.jpg",
  },
  {
    id: 11,
    title: "BYD Showroom",
    location: "Nepal",
    type: "Commercial",
    tile: "Sand Beige",
    size: "600×600 mm",
    area: "30,000 sq.ft",
    image: "/images/projects/byd-showroom.jpg",
  },
  {
    id: 12,
    title: "Alpha Capital",
    location: "Kathmandu",
    type: "Commercial",
    tile: "",
    size: "",
    area: "",
    image: "/images/projects/alpha-capital.jpg",
  },
  {
    id: 13,
    title: "Mercure Hotel",
    location: "Kathmandu",
    type: "Hospitality",
    tile: "",
    size: "",
    area: "",
    image: "/images/projects/mercure-hotel.jpg",
  },
  {
    id: 14,
    title: "Karnali Stadium",
    location: "Karnali",
    type: "Infrastructure",
    tile: "",
    size: "",
    area: "",
    image: "/images/projects/karnali-stadium.jpg",
  },
  {
    id: 15,
    title: "Krishi Bikash Bank",
    location: "Nepal",
    type: "Commercial",
    tile: "",
    size: "",
    area: "",
    image: "/images/projects/krishi-bikash-bank.jpg",
  },
  {
    id: 16,
    title: "Pokhara Event Center",
    location: "Pokhara",
    type: "Commercial",
    tile: "",
    size: "",
    area: "",
    image: "/images/projects/pokhara-event-center.jpg",
  },
  {
    id: 17,
    title: "Manipal International Teaching Hospital",
    location: "Pokhara",
    type: "Healthcare",
    tile: "",
    size: "",
    area: "",
    image: "/images/projects/manipal-hospital.jpg",
  },
];

const validSanityProjects = sanityProjects?.filter((p) => p.image && p.image.startsWith("http"));

export const projectHighlights: ProjectHighlight[] =
  validSanityProjects && validSanityProjects.length > 0 ? validSanityProjects : localProjectHighlights;

// ── Legacy data (used by homepage sections) ──

export const projects: Project[] = [
  {
    title: "Lakeside Villa",
    type: "Residential",
    tile: "Nordic Wood",
    image: "/images/gallery/gallery-2.jpg",
  },
  {
    title: "Azure Spa & Wellness",
    type: "Hospitality",
    tile: "Sahara Gold",
    image: "/images/gallery/gallery-3.jpg",
  },
  {
    title: "Metropolitan Tower",
    type: "Commercial",
    tile: "Urban Concrete",
    image: "/images/gallery/gallery-4.jpg",
  },
  {
    title: "Heritage Kitchen Studio",
    type: "Residential",
    tile: "Calacatta Luxe",
    image: "/images/gallery/gallery-5.jpg",
  },
  {
    title: "Summit Hotel & Resort",
    type: "Hospitality",
    tile: "Terra Nova",
    image: "/images/gallery/gallery-6.jpg",
  },
];

export const featuredProject: FeaturedProjectData = {
  title: "The Grand Atrium",
  collection: "Calacatta Luxe",
  area: "5,000",
  year: "2024",
  description: "5,000 sq ft of Calacatta Luxe porcelain transforming Kathmandu's most prestigious commercial lobby.",
  image: "/images/gallery/gallery-1.jpg",
};
