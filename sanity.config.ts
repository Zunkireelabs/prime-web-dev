import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { deskStructure } from "./src/sanity/desk-structure";

export default defineConfig({
  name: "prime-ceramics",
  title: "Prime Ceramics",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "PLACEHOLDER",
  dataset: "production",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
