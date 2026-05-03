// ─── Prime Ceramics — Careers ───
//
// Static content for /careers landing page. Add openings to the
// `openings` array as roles open up. When empty, the page shows a
// graceful "no current openings — keep in touch" state.

export interface CareerValue {
  id: string;
  title: string;
  description: string;
}

export interface CareerBenefit {
  id: string;
  title: string;
  description: string;
}

export interface CareerOpening {
  id: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  summary: string;
  applyUrl?: string; // optional override; defaults to applyEmail with prefilled subject
}

export const careersIntro = {
  eyebrow: "Careers at Prime",
  heading: "Build Nepal's first tile legacy.",
  body:
    "Prime is more than a manufacturer — it's a craftsmanship studio rooted in Italian engineering and Nepali soil. We're building the country's first NS-certified wall and floor tile facility, and we're looking for people who want to build alongside us. Designers, engineers, technicians, dealers, storytellers — every role here moves the industry forward.",
};

export const careerValues: CareerValue[] = [
  {
    id: "craft",
    title: "Craft over volume",
    description:
      "Every tile that leaves Rautahat carries the weight of decades of European tile-making tradition reinterpreted for Nepal. We choose precision over speed, finish over output.",
  },
  {
    id: "ownership",
    title: "Ownership, end to end",
    description:
      "From the kilns to the showroom, we expect everyone to own their domain. Small teams, real autonomy, and visible impact on the product and the brand.",
  },
  {
    id: "rooted",
    title: "Rooted in Nepal, built for the world",
    description:
      "We're proudly Nepali — sourcing locally, employing locally, building local — while measuring ourselves against international benchmarks every step of the way.",
  },
  {
    id: "growth",
    title: "Growth that compounds",
    description:
      "An expanding factory, new collections every quarter, and a pipeline of international partnerships. We want people who'll grow with us and shape what Prime becomes next.",
  },
];

export const careerBenefits: CareerBenefit[] = [
  {
    id: "competitive",
    title: "Competitive compensation",
    description:
      "Industry-benchmarked salaries, performance reviews twice a year, and incentive structures aligned with company growth.",
  },
  {
    id: "health",
    title: "Health & wellbeing",
    description:
      "Comprehensive medical coverage for you and your family, on-site safety standards exceeding ISO requirements.",
  },
  {
    id: "learning",
    title: "Learning & travel",
    description:
      "Sponsored visits to SACMI Italy, Cersaie Bologna, and partner facilities in India and beyond — exposure to global best practices.",
  },
  {
    id: "facility",
    title: "World-class facility",
    description:
      "Work inside Nepal's most advanced ceramic plant — 70,000 sq m of Italian engineering, with showrooms across the country.",
  },
  {
    id: "team",
    title: "A team that lifts each other",
    description:
      "Flat reporting, open offices, weekly cross-functional reviews. Engineers sit with designers; dealers brief the kiln team directly.",
  },
  {
    id: "impact",
    title: "Visible impact",
    description:
      "300+ jobs created in Rautahat. Import substitution at national scale. Your work changes the country's ceramic supply chain.",
  },
];

// Add openings here as roles open. When empty, the openings section
// renders a graceful "no current openings" message.
export const careerOpenings: CareerOpening[] = [
  {
    id: "production-engineer-rautahat",
    title: "Production Engineer",
    team: "Manufacturing",
    location: "Rautahat",
    type: "Full-time",
    summary:
      "Own daily operations of a SACMI kiln line — yield, quality, throughput. Mechanical or ceramic engineering background; comfortable on the shop floor.",
  },
  {
    id: "qc-lead-rautahat",
    title: "Quality Control Lead",
    team: "Manufacturing",
    location: "Rautahat",
    type: "Full-time",
    summary:
      "Set and enforce QC standards across wall and floor lines. Build the system that keeps Nepal's only NS-617-certified plant certified.",
  },
  {
    id: "showroom-lead-ktm",
    title: "Showroom Lead — Kathmandu",
    team: "Retail",
    location: "Kathmandu",
    type: "Full-time",
    summary:
      "Run our flagship Kathmandu experience — staffing, merchandising, dealer hosting, and turning walk-ins into long-term clients.",
  },
  {
    id: "dealer-account-manager",
    title: "Dealer Account Manager",
    team: "Sales",
    location: "Kathmandu (with regional travel)",
    type: "Full-time",
    summary:
      "Own a region of the dealer network — onboarding, training, sample logistics, and quarterly business reviews. Heavy travel across Nepal.",
  },
  {
    id: "collection-designer",
    title: "Collection Designer",
    team: "Design",
    location: "Kathmandu / Hybrid",
    type: "Full-time",
    summary:
      "Translate global tile trends into Prime collections. Mood, surface, finish, sizing — work directly with the kiln team to ship 3–4 collections a year.",
  },
  {
    id: "brand-content-writer",
    title: "Brand & Content Writer",
    team: "Marketing",
    location: "Kathmandu",
    type: "Full-time",
    summary:
      "Tell the Prime story across web, dealer materials, and press. A serious editorial voice — you've shipped real long-form work, not just social posts.",
  },
];

export const applyEmail = "info@primeceramics.com.np";

export function applyMailto(role?: string): string {
  const subject = role
    ? `Application — ${role}`
    : "Open application — Careers at Prime";
  return `mailto:${applyEmail}?subject=${encodeURIComponent(subject)}`;
}
