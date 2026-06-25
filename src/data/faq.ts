export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "products",
    title: "Products & Selection",
    items: [
      {
        question: "What is the difference between ceramic and vitrified tiles?",
        answer:
          "Ceramic tiles are made from clay fired at lower temperatures and are best suited for walls and light-traffic floors. Vitrified tiles are fired at much higher temperatures, making them denser, less porous, and highly resistant to stains and moisture — ideal for high-traffic floors, outdoor areas, and commercial spaces.",
      },
      {
        question: "How do I choose the right tile size for my space?",
        answer:
          "Larger tiles (600×1200 mm or 600×600 mm) work well in open, spacious rooms as they create a seamless look with fewer grout lines. Smaller tiles (300×300 mm or 300×600 mm) suit compact bathrooms and walls. As a general rule, avoid tiles that are more than half the width of the smallest dimension of the room.",
      },
      {
        question: "Can wall tiles be used on floors?",
        answer:
          "Not recommended. Wall tiles are generally thinner and less dense than floor tiles, and may not withstand foot traffic or load-bearing weight. Always check the tile's PEI (Porcelain Enamel Institute) rating — floor tiles should be PEI 3 or above for residential use.",
      },
      {
        question: "What finish should I choose — Glossy, Matt, or Polished?",
        answer:
          "Glossy finishes reflect light and make spaces feel brighter and larger, but can show scratches and footprints. Matt finishes are more slip-resistant and hide everyday marks, making them practical for floors and high-traffic areas. Polished tiles offer a mirror-like shine and are popular for large-format floor tiles in premium interiors.",
      },
      {
        question: "Are Prime Ceramics tiles suitable for outdoor use?",
        answer:
          "Yes — our Patio and Outdoor series are specifically engineered for exterior conditions. They are frost-resistant, slip-resistant (R10/R11 rating), and highly durable. Look for tiles with a water absorption rate below 0.5% for outdoor applications.",
      },
    ],
  },
  {
    id: "ordering",
    title: "Ordering & Catalogue",
    items: [
      {
        question: "How do I calculate how many tiles I need?",
        answer:
          "Measure the total area (length × width in square metres). Add 10–15% for cuts and wastage in standard rooms; add 15–20% for diagonal patterns or complex layouts. You can use our Tile Calculator at primeceramics.com.np/calculator for a precise estimate.",
      },
      {
        question: "Can I order a sample before purchasing?",
        answer:
          "Absolutely. We encourage customers to request samples before committing to a full order. You can request samples via our website or by visiting any authorised Prime Ceramics dealer. Samples help you judge the texture, colour tone, and finish in your own lighting conditions.",
      },
      {
        question: "How do I download the product catalogue?",
        answer:
          "All catalogues are available on the Catalogue page at primeceramics.com.np/catalog. You can browse by size or series and download the PDF directly after providing your contact details.",
      },
      {
        question: "Do all tiles from the same batch match in colour?",
        answer:
          "Natural variation exists between production batches (called 'shade variation' or 'batch variation'). We recommend purchasing all tiles for a single project from the same batch number. When calculating quantities, always include extra tiles from the same batch to allow for future repairs.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation & Maintenance",
    items: [
      {
        question: "What adhesive should I use for large-format tiles?",
        answer:
          "Large-format tiles (600×1200 mm and above) require a polymer-modified, high-performance tile adhesive. Apply the adhesive using a notched trowel with a back-buttering technique on both the tile and the substrate to achieve full coverage and prevent hollow spots.",
      },
      {
        question: "How wide should grout joints be?",
        answer:
          "For rectified (precisely cut) tiles, joints as narrow as 1.5–2 mm are achievable. For non-rectified tiles, joints of 3–5 mm are standard to compensate for slight size variation. Wider joints (5–10 mm) are common for rustic or handmade-look tiles. Always use a flexible grout in areas subject to movement or temperature change.",
      },
      {
        question: "How do I clean and maintain Prime Ceramics tiles?",
        answer:
          "For routine cleaning, use a pH-neutral floor cleaner with a mop or soft cloth. Avoid acidic or abrasive cleaners on polished or glazed surfaces as they can dull the finish. For stubborn stains, use a tile-specific cleaner. Grout lines should be sealed after installation and re-sealed periodically to prevent staining.",
      },
      {
        question: "Can tiles be installed over existing tiles?",
        answer:
          "Yes, in many cases — provided the existing tiles are firmly bonded, flat, and structurally sound. Check that the additional height will not cause issues with doors, skirting, or thresholds. Use a suitable bonding adhesive and ensure the total floor build-up does not exceed structural limits.",
      },
    ],
  },
  {
    id: "warranty",
    title: "Warranty & Support",
    items: [
      {
        question: "What warranty do Prime Ceramics tiles carry?",
        answer:
          "Prime Ceramics products are backed by a manufacturer's quality guarantee covering defects in material and finish under normal use conditions. Warranty terms vary by product line — please refer to the product documentation or contact our support team for specific warranty details.",
      },
      {
        question: "What should I do if I receive damaged tiles?",
        answer:
          "Inspect all tiles upon delivery and before installation. Do not install damaged tiles — once installed, they are not eligible for replacement claims. Report any damaged or defective tiles to your dealer or to us directly within 7 days of delivery with photographic evidence.",
      },
      {
        question: "Where can I find an authorised Prime Ceramics dealer?",
        answer:
          "Use the Dealer Locator on our website at primeceramics.com.np/dealers to find the nearest authorised showroom or distributor. Our dealers can provide samples, technical advice, and project consultation.",
      },
    ],
  },
];
