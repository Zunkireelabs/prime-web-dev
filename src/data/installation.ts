// ─── Prime Ceramics — Installation Guide Data ───

export interface InstallationStep {
  title: string;
  description: string;
  tips: string[];
}

export interface InstallationGuide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  steps: InstallationStep[];
}

export const installationGuides: InstallationGuide[] = [
  {
    id: "surface-preparation",
    title: "Surface Preparation",
    subtitle: "The Foundation of a Perfect Installation",
    description:
      "Proper surface preparation ensures long-lasting adhesion and prevents future cracking or lifting.",
    steps: [
      {
        title: "Inspect the Surface",
        description:
          "Ensure the substrate is structurally sound, clean, dry, and free of dust, oil, grease, or loose material. Concrete surfaces should be cured for at least 28 days.",
        tips: [
          "Use a spirit level to check flatness — maximum deviation of 3mm over 2 meters",
          "Remove any existing paint, sealant, or adhesive residue",
          "Fill cracks wider than 2mm with a suitable patching compound",
        ],
      },
      {
        title: "Waterproofing (Wet Areas)",
        description:
          "For bathrooms, kitchens, and outdoor areas, apply a waterproof membrane before tiling. This prevents moisture from damaging the substrate.",
        tips: [
          "Use a liquid-applied membrane or sheet membrane for wet areas",
          "Overlap seams by at least 50mm and seal corners with tape",
          "Allow the membrane to cure fully before tiling (typically 24 hours)",
        ],
      },
      {
        title: "Priming",
        description:
          "Apply a suitable primer to highly absorbent or dusty surfaces to improve adhesive bonding.",
        tips: [
          "Dilute primer as per manufacturer instructions",
          "Allow primer to dry completely before applying adhesive",
          "Porous surfaces like plywood or concrete blocks always need priming",
        ],
      },
    ],
  },
  {
    id: "adhesive-selection",
    title: "Adhesive Selection",
    subtitle: "Match the Right Adhesive to Your Tile",
    description:
      "Different tile types require different adhesives. Using the wrong adhesive is the most common cause of tile failure.",
    steps: [
      {
        title: "Ceramic Wall Tiles (300×450, 300×600 mm)",
        description:
          "Use a standard polymer-modified thin-set adhesive (C1 grade). These tiles have higher water absorption, so a standard adhesive provides sufficient bond.",
        tips: [
          "Apply adhesive with a 6mm notched trowel",
          "Work in small sections — adhesive skins over in 15–20 minutes",
          "Do not soak ceramic tiles before installation",
        ],
      },
      {
        title: "Vitrified & Porcelain Floor Tiles (400×400, 600×600 mm)",
        description:
          "Use a premium polymer-modified adhesive (C2 grade) with improved flexibility. Vitrified tiles have very low water absorption, so the adhesive must bond mechanically.",
        tips: [
          "Back-butter the tile AND apply adhesive to the substrate for full coverage",
          "Use a 10mm notched trowel for 600×600mm tiles",
          "Ensure minimum 95% adhesive coverage on floor tiles",
        ],
      },
      {
        title: "Large Format Tiles (600×1200 mm)",
        description:
          "Use a high-performance deformable adhesive (C2S1 or C2S2 grade). Large format tiles require excellent sag resistance and flexibility to handle thermal expansion.",
        tips: [
          "Always back-butter large format tiles",
          "Use a 12mm notched trowel",
          "Use a leveling system (clips and wedges) to ensure a flat finish",
          "Never use point-fixing — ensure full adhesive bed coverage",
        ],
      },
    ],
  },
  {
    id: "layout-cutting",
    title: "Layout & Cutting",
    subtitle: "Plan Before You Place",
    description:
      "A well-planned layout minimizes cuts, avoids narrow slivers at edges, and creates a balanced visual result.",
    steps: [
      {
        title: "Dry Layout",
        description:
          "Lay tiles dry (without adhesive) across the full area to determine the best starting point and identify where cuts will fall. Adjust the layout so cut tiles at opposite walls are equal in size.",
        tips: [
          "Start from the center of the room and work outward",
          "Avoid cut tiles smaller than half a tile at any edge",
          "Account for grout joint width when spacing tiles",
        ],
      },
      {
        title: "Cutting Tiles",
        description:
          "Use a manual tile cutter for straight cuts on ceramic tiles. Use a wet tile saw with a diamond blade for vitrified, porcelain, or angled cuts.",
        tips: [
          "Always wear safety glasses when cutting tiles",
          "For holes (pipes, outlets), use a diamond hole saw",
          "Smooth cut edges with a rubbing stone to prevent chipping",
        ],
      },
    ],
  },
  {
    id: "grouting",
    title: "Grouting",
    subtitle: "The Finishing Touch",
    description:
      "Grouting fills the joints between tiles, preventing moisture ingress and giving the installation a clean, finished appearance.",
    steps: [
      {
        title: "Grout Selection",
        description:
          "Choose between cementitious grout (standard areas) and epoxy grout (wet areas, kitchens, high-traffic zones). Select a grout color that complements your tile.",
        tips: [
          "Recommended joint widths: 2–3mm for rectified tiles, 3–5mm for standard tiles",
          "Epoxy grout is stain-resistant and ideal for kitchen counters and bathrooms",
          "Match grout color to tile for a seamless look, or contrast for a design statement",
        ],
      },
      {
        title: "Applying Grout",
        description:
          "Wait at least 24 hours after tiling before grouting. Apply grout diagonally across joints with a rubber float, pressing firmly to fill all gaps. Remove excess with a damp sponge.",
        tips: [
          "Work in small sections (2–3 sq.m at a time)",
          "Wipe excess grout within 15–20 minutes before it hardens",
          "Do not wash tiles for at least 24 hours after grouting",
          "Apply grout sealer after 48 hours for cementitious grout",
        ],
      },
    ],
  },
  {
    id: "curing-care",
    title: "Curing & Aftercare",
    subtitle: "Protect Your Investment",
    description:
      "Proper curing and maintenance ensure your tiles last for decades. Follow these guidelines for the first 72 hours and beyond.",
    steps: [
      {
        title: "Initial Curing",
        description:
          "Avoid foot traffic on newly tiled floors for at least 24–48 hours. Keep the area well-ventilated and at room temperature during curing.",
        tips: [
          "Do not place heavy furniture for at least 72 hours",
          "Avoid direct sunlight on freshly tiled outdoor areas during curing",
          "In cold weather (below 10°C), curing takes longer — allow 48–72 hours",
        ],
      },
      {
        title: "First Clean",
        description:
          "After grout has fully cured (48–72 hours), clean the tile surface with a mild detergent and warm water. Remove any grout haze with a grout haze remover.",
        tips: [
          "Never use acid-based cleaners on natural stone or unglazed tiles",
          "Use a soft cloth or mop — avoid abrasive pads on glossy tiles",
          "Seal natural stone tiles after the first clean",
        ],
      },
      {
        title: "Ongoing Maintenance",
        description:
          "Regular cleaning with a pH-neutral tile cleaner keeps tiles looking new. Re-seal grout joints every 1–2 years in wet areas.",
        tips: [
          "Sweep or vacuum floors regularly to prevent grit scratching the surface",
          "Wipe spills immediately, especially on matte or unglazed surfaces",
          "Use door mats at entrances to reduce dirt and moisture",
        ],
      },
    ],
  },
  {
    id: "nepal-climate",
    title: "Nepal Climate Considerations",
    subtitle: "Special Notes for Local Conditions",
    description:
      "Nepal's diverse climate — from Terai heat to highland cold, plus monsoon seasons — requires specific precautions during tile installation.",
    steps: [
      {
        title: "Monsoon Season Installation",
        description:
          "During monsoon (June–September), high humidity affects adhesive curing times. Ensure adequate ventilation and extended curing periods for indoor installations. Avoid outdoor tiling during heavy rain.",
        tips: [
          "Use rapid-set adhesive if tiling must continue during monsoon",
          "Ensure waterproofing is complete before monsoon begins",
          "Allow 50% extra curing time during monsoon season",
        ],
      },
      {
        title: "High Altitude / Cold Climate",
        description:
          "In hilly and mountain regions, temperatures below 5°C can prevent adhesive from curing properly. Use frost-resistant adhesive and avoid tiling when temperatures are near freezing.",
        tips: [
          "Store adhesive and grout at room temperature before use",
          "Do not tile if substrate temperature is below 5°C",
          "Use expansion joints every 4–6 meters for outdoor floor tiles in cold regions",
        ],
      },
      {
        title: "Earthquake Resilience",
        description:
          "Nepal is seismically active. Use flexible adhesive (S1 or S2 class) and include movement joints to absorb structural movement without cracking tiles.",
        tips: [
          "Install movement joints every 4–6 meters and at all wall-floor junctions",
          "Use flexible sealant (not grout) in movement joints",
          "For wall tiles above 2.4m height, use mechanical fixings in addition to adhesive",
        ],
      },
    ],
  },
];
