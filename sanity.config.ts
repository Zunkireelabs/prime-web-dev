import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { deskStructure } from "./src/sanity/desk-structure";
import { bulkUploadPlugin } from "./src/sanity/plugins/bulk-upload";

// Preview URL for different document types
const PREVIEW_URL = "https://primeceramics.com.np";

const documentUrls: Record<string, (doc: any) => string> = {
  tileProduct: (doc) => `${PREVIEW_URL}/products?size=${encodeURIComponent(doc?.size || "600×1200 mm")}`,
  heroBanner: () => `${PREVIEW_URL}/`,
  newsArticle: () => `${PREVIEW_URL}/news`,
  projectHighlight: () => `${PREVIEW_URL}/projects`,
  testimonial: () => `${PREVIEW_URL}/testimonials`,
  projectTestimonial: () => `${PREVIEW_URL}/testimonials`,
  dealer: () => `${PREVIEW_URL}/dealers`,
  jobOpening: () => `${PREVIEW_URL}/careers`,
  tileCatalog: () => `${PREVIEW_URL}/catalog`,
};

export default defineConfig({
  name: "prime-ceramics",
  title: "Prime Ceramics",
  projectId: "3jv6o4t6",
  dataset: "production",
  auth: {
    // Use localStorage-based token auth so cross-origin API calls (uploads, WebSocket)
    // work from self-hosted Studio at studio.primeceramics.com.np
    loginMethod: "token",
  },
  plugins: [
    structureTool({ structure: deskStructure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: PREVIEW_URL,
        },
      },
    }),
    visionTool(),
    bulkUploadPlugin(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Open preview URL when clicking "Open preview" on a document
    productionUrl: async (prev, context) => {
      const { document } = context;
      const resolver = documentUrls[document._type];
      if (resolver) return resolver(document);
      return prev;
    },
  },
});
