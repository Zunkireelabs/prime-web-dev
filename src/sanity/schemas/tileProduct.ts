import { defineField, defineType } from "sanity";

export const tileProduct = defineType({
  name: "tileProduct",
  title: "Tile Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "catalog",
      title: "Catalog",
      type: "reference",
      to: [{ type: "tileCatalog" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Ceramic",
          "Vitrified",
          "Glazed Vitrified",
          "Porcelain",
          "Wood Look",
          "Stone Look",
          "Marble Look",
          "Monochrome",
          "Patio",
          "Driveway",
          "Special Edition",
          "Art",
          "Cultural Heritage",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
      description:
        "Optional collection grouping (e.g., Kasthamandap, Palpali Dhaka)",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          "300×300 mm",
          "300×450 mm",
          "300×600 mm",
          "400×400 mm",
          "600×600 mm",
          "600×1200 mm",
          "800×800 mm",
          "800×1600 mm",
          "1200×1200 mm",
          "1200×2400 mm",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "finish",
      title: "Finish",
      type: "string",
      options: {
        list: [
          "Glossy",
          "Matt",
          "High Gloss",
          "Carving",
          "Satin",
          "Rustic",
          "Polished",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "application",
      title: "Application",
      type: "string",
      options: {
        list: [
          "Wall",
          "Floor",
          "Wall & Floor",
          "Elevation",
          "Outdoor",
          "Patio",
          "Driveway",
          "Art Panel",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hasMatchingFloor",
      title: "Has Matching Floor",
      type: "string",
      description:
        'Matching floor size, e.g. "300×300 mm". Leave empty if none.',
    }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Variant names if this product has multiple color/pattern variants",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Order within the catalog. Lower numbers appear first.",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Sort Order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Size",
      name: "sizeAsc",
      by: [{ field: "size", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "size",
      media: "image",
      catalog: "catalog.name",
    },
    prepare({ title, subtitle, media, catalog }) {
      return {
        title,
        subtitle: `${catalog || ""} — ${subtitle || ""}`,
        media,
      };
    },
  },
});
