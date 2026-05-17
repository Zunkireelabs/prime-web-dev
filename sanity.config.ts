import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { deskStructure } from "./src/sanity/desk-structure";
import { bulkUploadPlugin } from "./src/sanity/plugins/bulk-upload";

export default defineConfig({
  name: "prime-ceramics",
  title: "Prime Ceramics",
  projectId: "3jv6o4t6",
  dataset: "production",
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
    bulkUploadPlugin(),
  ],
  schema: {
    types: schemaTypes,
  },
});
