import { defineField, defineType } from "sanity";

export const tileCatalog = defineType({
  name: "tileCatalog",
  title: "Tile Catalog",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
      validation: (rule) => rule.required(),
      description: 'e.g., "Wall Tiles 300×450MM"',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "catalogId",
      title: "Catalog ID",
      type: "string",
      validation: (rule) => rule.required(),
      description:
        "System identifier: wall-300x450, wall-300x600, vitrified-600x600, vitrified-400x400, eleganz-600x1200, spirit-of-nepal",
      options: {
        list: [
          { title: "Wall 300×450", value: "wall-300x450" },
          { title: "Wall 300×600", value: "wall-300x600" },
          { title: "Floor 300×300", value: "floor-300x300" },
          { title: "Vitrified 400×400", value: "vitrified-400x400" },
          { title: "Vitrified 600×600", value: "vitrified-600x600" },
          { title: "Eleganz 600×1200", value: "eleganz-600x1200" },
          { title: "Spirit of Nepal", value: "spirit-of-nepal" },
        ],
      },
    }),
    defineField({
      name: "size",
      title: "Size Label",
      type: "string",
      description: 'Display size, e.g. "600×1200MM" or "600×600MM & 400×400MM"',
    }),
    defineField({
      name: "filterValue",
      title: "Filter Value",
      type: "string",
      description: 'Must match the product size field exactly, e.g. "600×1200 mm". Used to filter the product grid.',
    }),
    defineField({
      name: "count",
      title: "Design Count",
      type: "string",
      description: 'e.g. "59 designs"',
    }),
    defineField({
      name: "types",
      title: "Finish Types",
      type: "string",
      description: 'e.g. "Glossy · High Gloss · Matt · Carving"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "catalogPdf",
      title: "Catalog PDF",
      type: "file",
      options: { accept: ".pdf,application/pdf" },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured catalog appears larger in the catalog grid.",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first. Use multiples of 10.",
      initialValue: 50,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "catalogId", media: "coverImage" },
  },
});
