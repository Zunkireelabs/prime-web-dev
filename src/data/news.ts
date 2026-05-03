// ─── Prime Ceramics — Press Coverage ───
//
// Curated list of real press coverage about Prime Ceramics / Prime Tiles.
// Each entry links out to the original article (target="_blank" in UI).
//
// To add a new article:
//   1. Append to the `news` array
//   2. If it should be the homepage hero, set `featured: true`
//      (only ONE entry should be featured at a time)

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string; // YYYY-MM-DD
  url: string;
  summary: string;
  image: string;
  /** "cover" (default) crops to fill; "contain" shows the whole image (use for panoramic / unusual ratios). */
  imageFit?: "cover" | "contain";
  /** CSS object-position value (e.g. "left center", "top", "30% 50%") to control crop anchor. Defaults to "center". */
  imagePosition?: string;
  featured?: boolean;
}

export const news: NewsItem[] = [
  {
    id: "ns-certified-2026",
    title:
      "Prime Tiles Becomes Nepal's First and Only NS-Certified Tile Manufacturer",
    source: "Aarthik News",
    date: "2026-01-29",
    url: "https://english.aarthiknews.com/news/detail/19343/",
    summary:
      "Prime Tiles is awarded NS 617 certification by the Nepal Bureau of Standards and Metrology — establishing it as the country's sole NS-certified manufacturer in the wall and floor tile sector.",
    image: "/images/services/service-1.jpg",
  },
  {
    id: "sacmi-on-top-of-the-world",
    title: "Prime (Nepal), on top of the world with SACMI technology",
    source: "SACMI",
    date: "2024-03-15",
    url: "https://sacmi.com/en-US/ceramics/news/17924/Prime-Nepal,-on-top-of-the-world-with-SACMI-technology",
    summary:
      "SACMI profiles its turnkey partnership with Prime Ceramics — the first plant in Nepal to produce both wall and floor tiles, with a 4 million sq m annual capacity built on Italian technology.",
    image: "/images/news/sacmi-on-top-of-the-world.jpg",
    imagePosition: "left center",
    featured: true,
  },
  {
    id: "ceramic-world-factory-opening",
    title:
      "Prime Ceramics opens new factory in Nepal designed in collaboration with Sacmi",
    source: "Ceramic World Web",
    date: "2023-09-04",
    url: "https://ceramicworldweb.com/en/news/prime-ceramics-opens-new-factory-nepal-designed-collaboration-sacmi",
    summary:
      "International coverage of the new Rautahat plant — 70,000 sq m facility built with SACMI Italian engineering, projected to meet a quarter of Nepal's national tile demand.",
    image: "/images/locations/location-1.jpg",
  },
  {
    id: "kathmandu-post-launch",
    title: "Prime Tiles hit the market",
    source: "The Kathmandu Post",
    date: "2023-06-30",
    url: "https://kathmandupost.com/miscellaneous/2023/06/30/prime-tiles-hit-the-market",
    summary:
      "The Kathmandu Post reports on the official launch of 'Prime — Tiles with Stile' in the Nepali market, backed by CMS Group and Fortune Ventures with over Rs 2 billion in investment.",
    image: "/images/gallery/gallery-1.jpg",
  },
  {
    id: "nepal-press-tiles-with-stile",
    title: "Prime — Tiles with Stile enters Nepali Homes",
    source: "Nepal Press",
    date: "2023-06-29",
    url: "https://english.nepalpress.com/2023/06/29/prime-tiles-with-stile-enters-nepali-homes/",
    summary:
      "Nepal Press covers the launch — Nepal's first and largest producer of all kinds of wall and floor tiles, made entirely on home soil with Italian SACMI technology.",
    image: "/images/news/nepal-press-tiles-with-stile.jpg",
  },
  {
    id: "b360-commences-sale",
    title:
      "Prime Ceramics commences sale of 'Prime — Tiles with Stile' in Nepali market",
    source: "Business 360",
    date: "2023-06-30",
    url: "https://www.b360nepal.com/detail/218/prime-ceramics-commences-sale-of-prime-tiles-with-stile-in-nepali-market",
    summary:
      "Business 360 reports on the commencement of sales — domestic production aimed at import substitution, reducing foreign currency outflow, and creating local employment.",
    image: "/images/news/b360-commences-sale.jpg",
  },
  {
    id: "corporate-nepal-production-start",
    title:
      "Nepali tiles in 'Prime' brand starts production with two billion investments",
    source: "Corporate Nepal",
    date: "2023-06-29",
    url: "https://english.corporatenepal.com/news/detail/22206/",
    summary:
      "Corporate Nepal details the Rs 2 billion investment, the 70,000 sq m Brindavan Municipality plant, and the 300+ jobs created in the Rautahat district.",
    image: "/images/locations/location-2.jpg",
  },
  {
    id: "b360-revolutionising-industry",
    title:
      "Prime Ceramics revolutionising tile industry; prioritises community, aims for affordable tiles",
    source: "Business 360",
    date: "2023-08-20",
    url: "https://www.b360nepal.com/detail/150/prime-ceramics-revolutionising-tile-industry-prioritises-community-aims-for-affordable-tiles",
    summary:
      "An in-depth feature on Prime's mission — community-first manufacturing, affordable pricing for Nepali consumers, and the long-term strategy behind the SACMI partnership.",
    image: "/images/news/b360-revolutionising-industry.jpg",
  },
];

export const featuredNews: NewsItem | undefined = news.find(
  (n) => n.featured
);

export const otherNews: NewsItem[] = news.filter((n) => !n.featured);
