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
      description: 'e.g., "Wall Tiles 300×600"',
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
          { title: "Vitrified 400×400", value: "vitrified-400x400" },
          { title: "Vitrified 600×600", value: "vitrified-600x600" },
          { title: "Eleganz 600×1200", value: "eleganz-600x1200" },
          { title: "Spirit of Nepal", value: "spirit-of-nepal" },
        ],
      },
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
  ],
  preview: {
    select: { title: "name", subtitle: "catalogId" },
  },
});
