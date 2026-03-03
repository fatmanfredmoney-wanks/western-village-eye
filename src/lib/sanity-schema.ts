import { defineType, defineField } from "sanity";

export const volume = defineType({
  name: "volume",
  title: "Volume",
  type: "document",
  fields: [
    defineField({
      name: "volumeNumber",
      title: "Volume Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "volumeNumber",
      subtitle: "year",
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: `Volume ${title}`,
        subtitle: subtitle,
      };
    },
  },
});

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "featuredImage",
    },
  },
});

export const edition = defineType({
  name: "edition",
  title: "Edition",
  type: "document",
  fields: [
    defineField({
      name: "editionNumber",
      title: "Edition Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "volume",
      title: "Volume",
      type: "reference",
      to: [{ type: "volume" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
  ],
  preview: {
    select: {
      title: "editionNumber",
      media: "coverImage",
      volume: "volume.volumeNumber",
    },
    prepare(selection: any) {
      const { title, volume } = selection;
      return {
        title: `Edition ${title}`,
        subtitle: `Volume ${volume}`,
        media: selection.media,
      };
    },
  },
});

export const contribution = defineType({
  name: "contribution",
  title: "Contribution",
  type: "document",
  fields: [
    defineField({
      name: "tier",
      title: "Tier",
      type: "string",
      options: {
        list: [
          { title: "Small Box ($2)", value: "small" },
          { title: "Medium Box ($6)", value: "medium" },
          { title: "Big Box ($12)", value: "big" },
          { title: "Picture Box ($18)", value: "picture" },
        ],
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Credit Card (Stripe)", value: "stripe" },
          { title: "Cryptocurrency", value: "crypto" },
        ],
      },
    }),
    defineField({
      name: "amount",
      title: "Amount (USD)",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "tier",
      subtitle: "status",
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: `${title} - $${selection.amount || 0}`,
        subtitle: subtitle,
      };
    },
  },
});

export const schemaTypes = [volume, article, edition, contribution];
