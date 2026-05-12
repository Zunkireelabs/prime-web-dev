import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
    }),
    defineField({
      name: "project",
      title: "Project",
      type: "string",
      description: "Project associated with this testimonial",
    }),
    defineField({
      name: "image",
      title: "Author Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "role", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle || "", media };
    },
  },
});
