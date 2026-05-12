import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "3jv6o4t6",
  dataset: "production",
  apiVersion: "2026-04-01",
  token: "skbRdeqUEx2RfTOXaQJfpqcGJ3HyDXNPVezbP1wFRr9zO4RUNDu1EkMfJ0DDZoDiueIHSLhT3Itk3L1JFMwvxNSSyTQpBLwsBZXb6gsXD1pWzA5jm6oYeVbqtz20YEC18tl3EUhP0DojC8E4uaw1YvVhNQcbfs7YgcjzjmXigsHFRRxddQ5Z",
  useCdn: false,
});

const updates = [
  {
    id: "roomMockup-amazointe-blue-and-cardinal-brown",
    roomType: "Kitchen",
    description: "Amazonite Blue feature wall paired with Cardinal Brown floor tiles in a luxury kitchen and dining space.",
  },
  {
    id: "roomMockup-azure-aqua",
    roomType: "Living Room",
    description: "Azure Aqua marble-effect tiles covering both floor and feature wall in a dramatic contemporary living room.",
  },
  {
    id: "roomMockup-bedrock-light-and-decor",
    roomType: "Commercial",
    description: "Bedrock Light floor tiles with geometric decor wall tiles in a stylish café and restaurant setting.",
  },
  {
    id: "roomMockup-botticino-and-graphite-silver",
    roomType: "Commercial",
    description: "Botticino wall tiles paired with Graphite Silver floor tiles in a premium office reception and lobby.",
  },
  {
    id: "roomMockup-botticino",
    roomType: "Living Room",
    description: "Botticino tiles on both floor and accent wall creating a warm, elegant living room.",
  },
  {
    id: "roomMockup-cantebury-beige-and-sicilia-taupe",
    roomType: "Bathroom",
    description: "Canterbury Beige floor tiles and Sicilia Taupe wall tiles in a luxurious bathroom with freestanding tub.",
  },
  {
    id: "roomMockup-casle-beige-and-decor",
    roomType: "Bathroom",
    description: "Castle Beige floor tiles with decorative wall tiles in a contemporary bathroom and shower room.",
  },
  {
    id: "roomMockup-castle-gey-and-castle-grey-decor",
    roomType: "Living Room",
    description: "Castle Grey floor tiles with Castle Grey Decor feature wall in a modern living space.",
  },
  {
    id: "roomMockup-castle-light-grey-and-castle-grey-decor",
    roomType: "Bathroom",
    description: "Castle Light Grey wall and floor tiles with Castle Grey Decor accent band in a classic bathroom.",
  },
  {
    id: "roomMockup-emperador-brown",
    roomType: "Bedroom",
    description: "Emperador Brown polished floor tiles adding rich marble elegance to a classic bedroom.",
  },
];

async function main() {
  console.log("Updating room types and descriptions...\n");

  for (const update of updates) {
    await client
      .patch(update.id)
      .set({ roomType: update.roomType, description: update.description })
      .commit();

    console.log(`✓ ${update.id.replace("roomMockup-", "")} → ${update.roomType}`);
  }

  console.log("\n✅ All room types updated.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
