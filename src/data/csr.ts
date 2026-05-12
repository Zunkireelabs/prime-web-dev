// ── Corporate Social Responsibility Data (from TILESCAPE 2024) ──

export interface CSRInitiative {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  stats?: string;
}

export const csrIntro = {
  heading: "Corporate Social Responsibility",
  subheading: "Growing Together with Our Community",
  description:
    "At Prime Ceramics, our commitment extends far beyond the tiles we manufacture. As a company rooted in the heart of Nepal, we believe in growing together with the community we serve. Our CSR initiatives reflect our dedication to creating long-term, positive impact in areas of health, education, hygiene, infrastructure, and inclusion.",
};

export const csrInitiatives: CSRInitiative[] = [
  {
    id: 1,
    title: "Supporting Women's Health",
    category: "Health & Well-Being",
    description:
      "In May 2024, Prime Ceramics partnered with the Nepal Cancer Care Foundation to organize a free cervical cancer screening camp for women residing in and around our factory location. With the support of Brindavan Municipality, the camp provided comprehensive check-ups for over 150 women, aiming to raise awareness and enable early detection of cervical cancer — a disease that is highly treatable when identified in time. This initiative highlights our belief that accessible healthcare is a right, and we are proud to play a role in empowering local women to prioritize their well-being.",
    image: "/images/csr/health-screening.jpg",
    stats: "150+ women screened",
  },
  {
    id: 2,
    title: "Empowering Future Generations",
    category: "Education & Knowledge",
    description:
      "Education is a powerful tool for transformation. Prime Ceramics supported the establishment of a library at Rupa Nepali Secondary School in Brindavan Municipality, Rautahat — the largest school in the area. The initiative included infrastructure support, classroom enhancement, and the provision of enriching educational books. This effort ensures that students in the region have improved access to quality learning resources in a safe and inspiring environment.",
    image: "/images/csr/education-library.jpg",
  },
  {
    id: 3,
    title: "Investing in Clean Futures",
    category: "Hygiene & Sanitation",
    description:
      "In tandem with the library project, Prime Ceramics also funded the construction of a modern toilet facility at Rupa Secondary School. By addressing hygiene and sanitation needs, we aim to foster a healthier school environment that encourages attendance, especially among young girls. Additionally, tiles and sanitary materials were donated to a local Autism School to support the construction of clean and accessible toilet facilities, reinforcing our belief in inclusive development for all members of the community.",
    image: "/images/csr/hygiene-sanitation.jpg",
  },
  {
    id: 4,
    title: "Building Stronger Communities",
    category: "Infrastructure & Community Development",
    description:
      "Prime Ceramics continues to contribute to the development of local infrastructure by supporting the construction and renovation of religious sites, police stations, and community centers. These efforts are focused on building strong social spaces that preserve cultural heritage, maintain public safety, and nurture community cohesion.",
    image: "/images/csr/community-development.jpg",
  },
  {
    id: 5,
    title: "Local Employment & Integration",
    category: "Livelihoods & Inclusion",
    description:
      "With a workforce of over 350 employees, many of whom are from surrounding villages, Prime Ceramics is deeply integrated into the local socioeconomic fabric. We actively promote local employment, training, and skill development, ensuring that our growth directly benefits those around us.",
    image: "/images/csr/health-screening-2.jpg",
    stats: "350+ local employees",
  },
];
