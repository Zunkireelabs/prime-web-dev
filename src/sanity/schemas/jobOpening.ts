import { defineField, defineType } from "sanity";

export const jobOpening = defineType({
  name: "jobOpening",
  title: "Job Opening",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "team",
      title: "Team / Department",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      options: {
        list: ["Full-time", "Part-time", "Contract", "Internship"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Job Summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "applyUrl",
      title: "Application URL",
      type: "url",
      description: "Optional override for the application link",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Only active openings appear on the website",
    }),
  ],
  orderings: [
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "team", active: "active" },
    prepare({ title, subtitle, active }) {
      return {
        title: active === false ? `(closed) ${title}` : title,
        subtitle: subtitle || "",
      };
    },
  },
});
