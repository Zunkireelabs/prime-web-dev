import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "3jv6o4t6",
  dataset: "production",
  apiVersion: "2026-04-01",
  token: "skbRdeqUEx2RfTOXaQJfpqcGJ3HyDXNPVezbP1wFRr9zO4RUNDu1EkMfJ0DDZoDiueIHSLhT3Itk3L1JFMwvxNSSyTQpBLwsBZXb6gsXD1pWzA5jm6oYeVbqtz20YEC18tl3EUhP0DojC8E4uaw1YvVhNQcbfs7YgcjzjmXigsHFRRxddQ5Z",
  useCdn: false,
});

const docs = await client.fetch(
  `*[_type == "roomMockup"] | order(sortOrder asc) {
    _id, title, roomType, description,
    "hasImage": defined(image.asset),
    "imageId": image.asset._ref
  }`
);

console.log(`Total roomMockup documents: ${docs.length}\n`);

docs.forEach((d) => {
  const img = d.hasImage ? "✓ image" : "✗ NO IMAGE";
  const room = d.roomType || "✗ NO ROOM TYPE";
  const desc = d.description ? "✓ desc" : "✗ no desc";
  console.log(`${d.hasImage ? "✓" : "✗"} ${d.title}`);
  console.log(`   Room: ${room} | ${img} | ${desc}`);
});
