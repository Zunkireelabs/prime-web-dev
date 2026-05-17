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
      name: "spaces",
      title: "Suitable Spaces",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Living Room",
          "Bedroom",
          "Kitchen",
          "Bathroom",
          "Dining Room",
          "Office",
          "Balcony",
          "Outdoor",
          "Commercial",
          "Restaurant",
          "Hotel",
          "Hospital",
          "Apartment",
          "Showroom",
          "Staircase",
          "Elevation",
          "Parking",
        ],
      },
      description: "Where this tile can be used (select multiple)",
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
      name: "imageRotation",
      title: "Image Rotation",
      type: "number",
      options: {
        list: [
          { title: "0\u00b0 (No rotation)", value: 0 },
          { title: "90\u00b0 Clockwise", value: 90 },
          { title: "180\u00b0", value: 180 },
          { title: "270\u00b0 Clockwise", value: 270 },
        ],
      },
      initialValue: 0,
      description: "Rotate the product image if it was uploaded in the wrong orientation.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Order within the catalog. Lower numbers appear first.",
      initialValue: 100,
    }),
    defineField({
      name: "hidden",
      title: "Hidden from website",
      type: "boolean",
      initialValue: false,
      description:
        "If checked, this product is preserved in Sanity but does not appear on the website. Uncheck once you have added an image.",
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
      hidden: "hidden",
    },
    prepare({ title, subtitle, media, catalog, hidden }) {
      return {
        title: hidden ? `🔒 ${title}` : title,
        subtitle: `${catalog || ""} — ${subtitle || ""}${
          hidden ? " · HIDDEN" : ""
        }`,
        media,
      };
    },
  },
});
