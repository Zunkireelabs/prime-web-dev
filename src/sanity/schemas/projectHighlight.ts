import { defineField, defineType } from "sanity";

export const projectHighlight = defineType({
  name: "projectHighlight",
  title: "Project Highlight",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          "Commercial",
          "Residential",
          "Hospitality",
          "Healthcare",
          "Institutional",
          "Infrastructure",
          "Government",
        ],
      },
    }),
    defineField({
      name: "tile",
      title: "Tile Used",
      type: "string",
      description: "Name of the tile product used",
    }),
    defineField({
      name: "size",
      title: "Tile Size",
      type: "string",
    }),
    defineField({
      name: "area",
      title: "Area Covered",
      type: "string",
      description: 'e.g. "56,000 sq.ft"',
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 100,
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", type: "type", location: "location", media: "image" },
    prepare({ title, type, location, media }) {
      return {
        title,
        subtitle: `${type || ""} — ${location || ""}`,
        media,
      };
    },
  },
});
