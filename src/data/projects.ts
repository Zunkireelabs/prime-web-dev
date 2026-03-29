import type { Project, FeaturedProjectData } from "./types";

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
