import type { CatalogProduct } from "./types";

// ─── Spirit of Nepal Collection 2025 ───
// Special heritage collection celebrating Nepali culture
// Mixed sizes: 300×600mm, 300×450mm, 600×600mm

const C = "spirit-of-nepal" as const;

// ── KASTHAMANDAP COLLECTION (Brick-inspired) ──

const kasthamandap: CatalogProduct[] = [
  { name: "Bhaktapur Itta", slug: "bhaktapur-itta", catalog: C, category: "Cultural Heritage", series: "Kasthamandap", collection: "Kasthamandap", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/bhaktapur-itta.jpg" },
  { name: "Patan Rato", slug: "patan-rato", catalog: C, category: "Cultural Heritage", series: "Kasthamandap", collection: "Kasthamandap", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/patan-rato.jpg" },
  { name: "Dachi Appa Red Matt", slug: "dachi-appa-red-matt", catalog: C, category: "Cultural Heritage", series: "Kasthamandap", collection: "Kasthamandap", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/dachi-appa-red-matt.jpg" },
  { name: "Dachi Appa Red Glossy", slug: "dachi-appa-red-glossy", catalog: C, category: "Cultural Heritage", series: "Kasthamandap", collection: "Kasthamandap", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/dachi-appa-red-glossy.jpg" },
  { name: "Chinese Itta", slug: "chinese-itta", catalog: C, category: "Cultural Heritage", series: "Kasthamandap", collection: "Kasthamandap", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/chinese-itta.jpg" },
  { name: "Terracotta Gold", slug: "terracotta-gold", catalog: C, category: "Cultural Heritage", series: "Kasthamandap", collection: "Kasthamandap", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/terracotta-gold.jpg" },
  { name: "Lalitpur Red", slug: "lalitpur-red", catalog: C, category: "Cultural Heritage", series: "Kasthamandap", collection: "Kasthamandap", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/lalitpur-red.jpg" },
];

// ── POKHARELI COLLECTION (Stone-inspired) ──

const pokhareli: CatalogProduct[] = [
  { name: "Pokhareli Grey", slug: "pokhareli-grey", catalog: C, category: "Stone Look", series: "Pokhareli", collection: "Pokhareli", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/pokhareli-grey.jpg" },
  { name: "Kaski Ash", slug: "kaski-ash", catalog: C, category: "Stone Look", series: "Pokhareli", collection: "Pokhareli", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/kaski-ash.jpg" },
  { name: "Lamjung Gold", slug: "lamjung-gold", catalog: C, category: "Stone Look", series: "Pokhareli", collection: "Pokhareli", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/lamjung-gold.jpg" },
  { name: "Gandaki Pattern", slug: "gandaki-pattern", catalog: C, category: "Stone Look", series: "Pokhareli", collection: "Pokhareli", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/gandaki-pattern.jpg" },
  { name: "Chipledhunga Slate", slug: "chipledhunga-slate", catalog: C, category: "Stone Look", series: "Pokhareli", collection: "Pokhareli", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/chipledhunga-slate.jpg" },
  { name: "Waling Mosaic", slug: "waling-mosaic", catalog: C, category: "Stone Look", series: "Pokhareli", collection: "Pokhareli", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/waling-mosaic.jpg" },
];

// ── MUSTANG COLLECTION ──

const mustang: CatalogProduct[] = [
  { name: "Mustang Khairo", slug: "mustang-khairo", catalog: C, category: "Stone Look", series: "Mustang", collection: "Mustang", size: "300×600 mm", finish: "Matt", application: "Wall & Floor", image: "/images/catalog/spirit/mustang-khairo.jpg" },
];

// ── MITHILA ART COLLECTION ──

const mithilaArt: CatalogProduct[] = [
  { name: "Mithila Art - Ram Sita Swayamber", slug: "mithila-ram-sita", catalog: C, category: "Art", series: "Mithila Art", collection: "Mithila Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/mithila-ram-sita.jpg" },
  { name: "Mithila Art - Janki Bibaha", slug: "mithila-janki-bibaha", catalog: C, category: "Art", series: "Mithila Art", collection: "Mithila Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/mithila-janki-bibaha.jpg" },
  { name: "Mithila Art - Buddha", slug: "mithila-buddha", catalog: C, category: "Art", series: "Mithila Art", collection: "Mithila Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/mithila-buddha.jpg" },
  { name: "Mithila Art - Mayur Prem Lila", slug: "mithila-mayur-prem-lila", catalog: C, category: "Art", series: "Mithila Art", collection: "Mithila Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/mithila-mayur-prem-lila.jpg" },
  { name: "Mithila Art - Rassleela", slug: "mithila-rassleela", catalog: C, category: "Art", series: "Mithila Art", collection: "Mithila Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/mithila-rassleela.jpg" },
  { name: "Mithila Art - Chatth Puja", slug: "mithila-chatth-puja", catalog: C, category: "Art", series: "Mithila Art", collection: "Mithila Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/mithila-chatth-puja.jpg" },
];

// ── THANGKA ART COLLECTION ──

const thangkaArt: CatalogProduct[] = [
  { name: "Manjushri Thangka", slug: "manjushri-thangka", catalog: C, category: "Art", series: "Thangka Art", collection: "Thangka Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/manjushri-thangka.jpg" },
  { name: "Green Tara Thangka", slug: "green-tara-thangka", catalog: C, category: "Art", series: "Thangka Art", collection: "Thangka Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/green-tara-thangka.jpg" },
  { name: "Akshobhya Mandala", slug: "akshobhya-mandala", catalog: C, category: "Art", series: "Thangka Art", collection: "Thangka Art", size: "300×600 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/akshobhya-mandala.jpg" },
  { name: "Bajrapani Thangka", slug: "bajrapani-thangka", catalog: C, category: "Art", series: "Thangka Art", collection: "Thangka Art", size: "300×450 mm", finish: "Glossy", application: "Art Panel", image: "/images/catalog/spirit/bajrapani-thangka.jpg" },
];

// ── GODAWARI MARBLE COLLECTION ──

const godawariMarble: CatalogProduct[] = [
  { name: "Godawari Marble Beige", slug: "godawari-marble-beige", catalog: C, category: "Marble Look", series: "Godawari Marble", collection: "Godawari Marble", size: "600×600 mm", finish: "Glossy", application: "Floor", image: "/images/catalog/spirit/godawari-marble-beige.jpg" },
  { name: "Godawari Marble Biege Viens", slug: "godawari-marble-biege-viens", catalog: C, category: "Marble Look", series: "Godawari Marble", collection: "Godawari Marble", size: "600×600 mm", finish: "Carving", application: "Floor", image: "/images/catalog/spirit/godawari-marble-biege-viens.jpg" },
  { name: "Godawari Marble Dotted Crema", slug: "godawari-marble-dotted-crema", catalog: C, category: "Marble Look", series: "Godawari Marble", collection: "Godawari Marble", size: "600×600 mm", finish: "Glossy", application: "Floor", image: "/images/catalog/spirit/godawari-marble-dotted-crema.jpg" },
  { name: "Godawari Marble Dotted Crema Viens", slug: "godawari-marble-dotted-crema-viens", catalog: C, category: "Marble Look", series: "Godawari Marble", collection: "Godawari Marble", size: "600×600 mm", finish: "Carving", application: "Floor", image: "/images/catalog/spirit/godawari-marble-dotted-crema-viens.jpg" },
];

// ── PALPALI DHAKA COLLECTION ──

const palpaliDhaka: CatalogProduct[] = [
  { name: "Gurans Hazy Dhaka Light", slug: "gurans-hazy-dhaka-light", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/gurans-hazy-dhaka-light.jpg" },
  { name: "Gurans Hazy Dhaka HL", slug: "gurans-hazy-dhaka-hl", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/gurans-hazy-dhaka-hl.jpg" },
  { name: "Gurans Hazy Dhaka Dark", slug: "gurans-hazy-dhaka-dark", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/gurans-hazy-dhaka-dark.jpg" },
  { name: "Gurans Red Dhaka Light", slug: "gurans-red-dhaka-light", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/gurans-red-dhaka-light.jpg" },
  { name: "Gurans Red Dhaka HL", slug: "gurans-red-dhaka-hl", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/gurans-red-dhaka-hl.jpg" },
  { name: "Gurans Red Dhaka Dark", slug: "gurans-red-dhaka-dark", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/gurans-red-dhaka-dark.jpg" },
  { name: "Tweed Dhaka Light", slug: "tweed-dhaka-light", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/tweed-dhaka-light.jpg" },
  { name: "Tweed Dhaka HL", slug: "tweed-dhaka-hl", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/tweed-dhaka-hl.jpg" },
  { name: "Tweed Dhaka Dark", slug: "tweed-dhaka-dark", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/tweed-dhaka-dark.jpg" },
  { name: "Aqua Dhaka Light", slug: "aqua-dhaka-light", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/aqua-dhaka-light.jpg" },
  { name: "Aqua Dhaka HL", slug: "aqua-dhaka-hl", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/aqua-dhaka-hl.jpg" },
  { name: "Aqua Dhaka Dark", slug: "aqua-dhaka-dark", catalog: C, category: "Cultural Heritage", series: "Palpali Dhaka", collection: "Palpali Dhaka", size: "300×600 mm", finish: "Glossy", application: "Wall", image: "/images/catalog/spirit/aqua-dhaka-dark.jpg" },
];

export const spiritOfNepal: CatalogProduct[] = [
  ...kasthamandap,
  ...pokhareli,
  ...mustang,
  ...mithilaArt,
  ...thangkaArt,
  ...godawariMarble,
  ...palpaliDhaka,
];
