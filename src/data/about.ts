// ── Prime Ceramics — About Page Data ──

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Promoter {
  name: string;
  role: string;
  description: string;
}

export interface Certification {
  name: string;
  label: string;
  icon: string;
}

// ── Vision & Mission ──

export const visionStatement =
  "To manufacture world-class tiles and be the industry leader with continuous innovation, creativity, and passion to deliver the best.";

export const missionStatements = [
  "Become a leading tile manufacturer producing stylish tiles that deliver value at affordable prices.",
  "Gradually scale up capacity to meet the aspirations of Nepalese customers and expand horizons to the region and the world.",
  "Practice best industry norms in manufacturing, employment, environment, and sustainability to lead by example.",
];

export const visionQuote =
  "We envisioned a Nepal that doesn\u2019t just import excellence \u2014 but creates it. Every tile we craft carries that ambition.";

export const promoters: Promoter[] = [
  {
    name: "CMS Group",
    role: "Co-Promoter",
    description:
      "One of Nepal\u2019s most respected business houses with over two decades of proven excellence in the construction materials sector.",
  },
  {
    name: "Fortune Ventures",
    role: "Co-Promoter",
    description:
      "Strategic partners bringing extensive business acumen and a proven track record of building market-leading enterprises in construction materials.",
  },
];

// ── Milestones ──

export const milestones: Milestone[] = [
  {
    year: "2021",
    title: "Founded",
    description:
      "Prime Ceramics Pvt. Ltd. established with NPR 3 billion investment in Brindavan Municipality, Rautahat — Nepal\u2019s largest tile manufacturing venture.",
  },
  {
    year: "2022",
    title: "Production Begins",
    description:
      "State-of-the-art plant goes live with Italian SACMI technology — the only facility in Nepal equipped to manufacture both wall and floor tiles.",
  },
  {
    year: "2023",
    title: "#1 in Sales",
    description:
      "Achieved the highest sales volume among all tile manufacturers in Nepal for FY 2023\u201324.",
  },
  {
    year: "2024",
    title: "Nationwide Reach",
    description:
      "Expanded to 120+ dealers across Nepal with 4 million sq m annual production capacity and deep market penetration nationwide.",
  },
];

// ── Certifications ──

export const certifications: Certification[] = [
  {
    name: "ISO 9001:2015",
    label: "Quality Management",
    icon: "ShieldCheck",
  },
  {
    name: "ISO 14001:2015",
    label: "Environmental Management",
    icon: "Leaf",
  },
  {
    name: "Nepal Bureau of Standards",
    label: "NS Certified",
    icon: "BadgeCheck",
  },
  {
    name: "SACMI Partner",
    label: "Italian Technology",
    icon: "Cog",
  },
];

// ── About Stats ──

export interface AboutStat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sub: string;
}

export const aboutStats: AboutStat[] = [
  { value: 4, suffix: "M", label: "Sq m Capacity", sub: "Annual production" },
  { value: 120, suffix: "+", label: "Dealers", sub: "Nationwide network" },
  { value: 3, suffix: "B", prefix: "NPR ", label: "Investment", sub: "Total capital deployed" },
  { value: 66, suffix: "+", label: "Designs", sub: "& counting" },
];
