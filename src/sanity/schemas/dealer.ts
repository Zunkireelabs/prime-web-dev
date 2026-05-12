import { defineField, defineType } from "sanity";

export const dealer = defineType({
  name: "dealer",
  title: "Dealer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Dealer Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "province",
      title: "Province",
      type: "string",
      options: {
        list: [
          "Bagmati",
          "Gandaki",
          "Karnali",
          "Koshi",
          "Lumbini",
          "Madhesh",
          "Sudurpaschim",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "contactPerson",
      title: "Contact Person",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Province",
      name: "provinceAsc",
      by: [{ field: "province", direction: "asc" }, { field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", city: "city", province: "province" },
    prepare({ title, city, province }) {
      return {
        title,
        subtitle: `${city || ""}, ${province || ""}`,
      };
    },
  },
});
