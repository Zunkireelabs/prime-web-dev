import { defineField, defineType } from "sanity";

export const heroBanner = defineType({
  name: "heroBanner",
  title: "Hero Banner",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Subtitle text displayed below the title",
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
      description: "Which collection this banner promotes",
    }),
    defineField({
      name: "cta",
      title: "CTA Text",
      type: "string",
      initialValue: "Discover More",
      description: "Call-to-action button label",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 100,
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Only active banners appear on the website",
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
    select: { title: "title", subtitle: "collection", media: "image", active: "active" },
    prepare({ title, subtitle, media, active }) {
      return {
        title: active === false ? `(inactive) ${title}` : title,
        subtitle: subtitle || "",
        media,
      };
    },
  },
});
