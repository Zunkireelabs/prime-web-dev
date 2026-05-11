import { defineField, defineType } from "sanity";

export const roomMockup = defineType({
  name: "roomMockup",
  title: "Room Mockup",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g., "Botticino & Graphite Silver — Bathroom"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "roomType",
      title: "Room Type",
      type: "string",
      options: {
        list: [
          { title: "Bathroom", value: "Bathroom" },
          { title: "Living Room", value: "Living Room" },
          { title: "Kitchen", value: "Kitchen" },
          { title: "Bedroom", value: "Bedroom" },
          { title: "Outdoor", value: "Outdoor" },
          { title: "Commercial", value: "Commercial" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Mockup Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Describe the room and tiles shown",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tileProduct" }] }],
      description: "Which tile products appear in this room render",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional short description of the room or tile combination",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 100,
    }),
    defineField({
      name: "hidden",
      title: "Hidden from website",
      type: "boolean",
      initialValue: false,
      description: "If checked, preserved in Sanity but not shown on the site.",
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Room Type",
      name: "roomType",
      by: [{ field: "roomType", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "roomType",
      media: "image",
      hidden: "hidden",
    },
    prepare({ title, subtitle, media, hidden }) {
      return {
        title: hidden ? `🔒 ${title}` : title,
        subtitle: subtitle ? `${subtitle}${hidden ? " · HIDDEN" : ""}` : hidden ? "HIDDEN" : "",
        media,
      };
    },
  },
});
