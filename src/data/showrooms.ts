import type { Showroom } from "./types";

// ── Showrooms with full details (ShowroomSection) ──

export const showrooms: Showroom[] = [
  {
    name: "Prime Flagship",
    city: "Kathmandu",
    address: "New Baneshwor, Kathmandu, Nepal",
    hours: "Sun–Fri: 10 AM – 7 PM",
    image: "/images/locations/location-1.jpg",
  },
  {
    name: "Prime Lalitpur",
    city: "Lalitpur",
    address: "Kupondole, Lalitpur, Nepal",
    hours: "Sun–Fri: 10 AM – 6 PM",
    image: "/images/locations/location-2.jpg",
  },
  {
    name: "Prime Pokhara",
    city: "Pokhara",
    address: "Lakeside Road, Pokhara, Nepal",
    hours: "Sun–Fri: 10 AM – 6 PM",
    image: "/images/locations/location-3.jpg",
  },
];

// ── Locations (Showrooms component — office, factory, dealers) ──

export const locations: Showroom[] = [
  {
    name: "Corporate Office",
    city: "Kathmandu",
    address: "Level 4, Saket Complex, Tripureshwor",
    image: "/images/locations/location-1.jpg",
  },
  {
    name: "Factory",
    city: "Rautahat",
    address: "Sakhuwa Dhamaura, Brindavan Municipality-6",
    image: "/images/locations/location-2.jpg",
  },
  {
    name: "Dealer Network",
    city: "Nationwide",
    address: "Authorized dealers across Nepal",
    image: "/images/locations/location-3.jpg",
  },
];
