// ── Prime Ceramics — About Page Data ──

export interface Milestone {
  year: string;
  title: string;
  description: string;
  highlight?: string;
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
  context?: string;
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
      "Prime Ceramics Pvt. Ltd. established with NPR 3 billion investment in Brindavan Municipality, Rautahat \u2014 Nepal\u2019s largest tile manufacturing venture.",
    highlight: "Largest single investment in Nepal\u2019s tile industry",
  },
  {
    year: "2022",
    title: "Production Begins",
    description:
      "State-of-the-art plant goes live with Italian SACMI technology \u2014 the only facility in Nepal equipped to manufacture both wall and floor tiles.",
    highlight: "First dual-line (wall + floor) plant in the country",
  },
  {
    year: "2023",
    title: "#1 in Sales",
    description:
      "Achieved the highest sales volume among all tile manufacturers in Nepal for FY 2023\u201324 \u2014 in just our second year of full operation.",
    highlight: "Market leader in record time",
  },
  {
    year: "2024",
    title: "Nationwide Reach",
    description:
      "Expanded to 200+ authorized dealers across all 7 provinces with 4 million sq m annual production capacity.",
    highlight: "Recognized by Gaur Customs for highest revenue contribution",
  },
];

// ── Certifications ──

export const certifications: Certification[] = [
  {
    name: "ISO 9001:2015",
    label: "Quality Management",
    icon: "ShieldCheck",
    context: "Independently verified quality processes across our entire manufacturing chain",
  },
  {
    name: "ISO 14001:2015",
    label: "Environmental Management",
    icon: "Leaf",
    context: "Committed to sustainable manufacturing and responsible resource use",
  },
  {
    name: "Nepal Bureau of Standards",
    label: "NS Certified",
    icon: "BadgeCheck",
    context: "Every tile meets Nepal\u2019s national quality benchmarks under NS 696:2079",
  },
  {
    name: "SACMI Partner",
    label: "Italian Technology",
    icon: "Cog",
    context: "Powered by the global gold standard in ceramic tile manufacturing equipment",
  },
];

// ── Awards ──

export interface AwardEntry {
  title: string;
  authority: string;
  date: string;
  description: string;
  icon: string;
  image: string;
  highlight?: boolean;
}

export const awardsData: AwardEntry[] = [
  {
    title: "Highest Revenue Contributor",
    authority: "Gaur Customs Office, Department of Customs, Government of Nepal",
    date: "January 26, 2026",
    description:
      "Awarded on the 74th International Customs Day for the highest revenue contribution in Fiscal Year 2081/82 — a testament to Prime Ceramics' market leadership and contribution to the national economy.",
    icon: "Trophy",
    image: "/images/certifications/customs-award.png",
    highlight: true,
  },
];

// ── Certifications (Detailed) ──

export interface CertificationEntry {
  name: string;
  label: string;
  icon: string;
  image: string;
  issuingBody: string;
  certificateNumber: string;
  standard?: string;
  scope: string;
  validFrom?: string;
  validTo?: string;
  accreditation?: string;
  category: "quality" | "export" | "national" | "brand" | "industry";
}

export const certificationsData: CertificationEntry[] = [
  {
    name: "ISO 9001:2015",
    label: "Quality Management System",
    icon: "ShieldCheck",
    image: "/images/certifications/iso-9001.png",
    issuingBody: "URS Certification",
    certificateNumber: "128429/A/0001/UK/En",
    scope: "Manufacturing of Ceramic Tiles",
    validFrom: "September 2023",
    validTo: "September 2026",
    accreditation: "UKAS & IAF Accredited",
    category: "quality",
  },
  {
    name: "NS Mark License",
    label: "Nepal Standard Certification",
    icon: "BadgeCheck",
    image: "/images/certifications/ns-mark.png",
    issuingBody: "Nepal Bureau of Standards & Metrology",
    certificateNumber: "280",
    standard: "NS 696:2079",
    scope: "Ceramic Tiles (Pressing Method), Brand 'PRIME'",
    category: "national",
  },
  {
    name: "SASO Quality Mark",
    label: "Saudi Export Certification",
    icon: "Globe",
    image: "/images/certifications/saso-quality-mark.png",
    issuingBody: "Saudi Standards, Metrology & Quality Organization",
    certificateNumber: "20240659221",
    standard: "SASO ISO GSO 13006:2022",
    scope: "Export-certified for Kingdom of Saudi Arabia",
    validFrom: "November 2024",
    validTo: "November 2027",
    category: "export",
  },
  {
    name: "Trademark Registration",
    label: "Brand Identity Protection",
    icon: "Fingerprint",
    image: "/images/certifications/trademark.png",
    issuingBody: "Department of Industry, Government of Nepal",
    certificateNumber: "061759",
    standard: "Class 19 — Ceramic Tiles",
    scope: "Registered trademark for ceramic tile products",
    validFrom: "January 2024",
    validTo: "January 2031",
    category: "brand",
  },
  {
    name: "CNI Membership",
    label: "Confederation of Nepalese Industries",
    icon: "Building2",
    image: "/images/certifications/cni-membership.png",
    issuingBody: "Confederation of Nepalese Industries",
    certificateNumber: "C-178",
    scope: "Institutional membership in Nepal's premier industry body",
    category: "industry",
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
  { value: 200, suffix: "+", label: "Dealers", sub: "Nationwide network" },
  { value: 3, suffix: "B", prefix: "NPR ", label: "Investment", sub: "Total capital deployed" },
  { value: 500, suffix: "+", label: "Designs", sub: "& counting" },
];
