import { defineField, defineType } from "sanity";

export const newsArticle = defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source / Publication",
      type: "string",
      validation: (rule) => rule.required(),
      description: "e.g. Aarthik News, Nepal Times",
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Article URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageFit",
      title: "Image Fit",
      type: "string",
      options: { list: ["cover", "contain"] },
      initialValue: "cover",
      description: '"cover" crops to fill; "contain" shows the whole image',
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      description: 'CSS object-position (e.g. "left center", "top"). Defaults to "center".',
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Featured article appears large on the news page. Only one should be featured.",
    }),
  ],
  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "source", date: "date", media: "image", featured: "featured" },
    prepare({ title, subtitle, date, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${subtitle || ""} — ${date || ""}`,
        media,
      };
    },
  },
});
