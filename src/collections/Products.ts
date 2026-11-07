import type { CollectionConfig } from "payload";

const slugify = (value: string) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    group: "Shop",
    defaultColumns: ["name", "category", "color", "price", "status", "updatedAt"],
  },
  access: {
    read: ({ req }) => req.user ? true : { status: { equals: "published" } },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Product",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              admin: {
                position: "sidebar",
                description: "The URL name, for example cabana-stripes-bikini-top-light-blue.",
              },
              hooks: {
                beforeValidate: [({ value, siblingData }) => value || (siblingData?.name ? slugify(String(siblingData.name)) : value)],
              },
            },
            {
              name: "status",
              type: "select",
              required: true,
              defaultValue: "draft",
              index: true,
              admin: { position: "sidebar" },
              options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
                { label: "Archived", value: "archived" },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "price",
                  label: "Price in cents",
                  type: "number",
                  required: true,
                  min: 0,
                  admin: { width: "50%", description: "€35.00 is entered as 3500." },
                },
                {
                  name: "currency",
                  type: "select",
                  required: true,
                  defaultValue: "EUR",
                  admin: { width: "50%" },
                  options: ["EUR"],
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "category",
                  type: "select",
                  required: true,
                  index: true,
                  admin: { width: "50%" },
                  options: ["Swim Shorts", "Bikini Tops", "Bikini Bottoms", "Swimsuits", "Bathing Towels", "Caps", "Socks"],
                },
                {
                  name: "audience",
                  type: "select",
                  required: true,
                  defaultValue: "unisex",
                  index: true,
                  admin: { width: "50%" },
                  options: [
                    { label: "Men", value: "men" },
                    { label: "Women", value: "women" },
                    { label: "Unisex", value: "unisex" },
                  ],
                },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "collection", type: "text", required: true, index: true, admin: { width: "33%" } },
                { name: "color", type: "text", required: true, index: true, admin: { width: "33%" } },
                {
                  name: "pattern",
                  type: "select",
                  required: true,
                  index: true,
                  admin: { width: "33%" },
                  options: ["Solid", "Print", "Striped", "Dotted"],
                },
              ],
            },
            {
              name: "description",
              type: "richText",
            },
            {
              name: "pairedProduct",
              label: "Matching bikini piece",
              type: "relationship",
              relationTo: "products",
              filterOptions: ({ data }) => ({
                id: { not_equals: data?.id },
                category: { in: data?.category === "Bikini Tops" ? ["Bikini Bottoms"] : ["Bikini Tops"] },
              }),
              admin: {
                description: "Link a bikini top to its matching bottom, or the bottom to its matching top.",
                condition: (data) => ["Bikini Tops", "Bikini Bottoms"].includes(data?.category),
              },
            },
          ],
        },
        {
          label: "Images",
          fields: [
            {
              name: "mainImage",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "hoverImage",
              type: "upload",
              relationTo: "media",
              admin: { description: "Prefer a model/lifestyle image for the collection-card hover." },
            },
            {
              name: "gallery",
              type: "array",
              minRows: 1,
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
                {
                  name: "view",
                  type: "select",
                  required: true,
                  defaultValue: "front",
                  options: ["front", "back", "lifestyle", "detail"],
                },
              ],
            },
          ],
        },
        {
          label: "Sizes & stock",
          fields: [
            {
              name: "variants",
              type: "array",
              required: true,
              minRows: 1,
              labels: { singular: "Size", plural: "Sizes" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "size", type: "text", required: true, admin: { width: "25%" } },
                    { name: "sku", type: "text", required: true, admin: { width: "45%" } },
                    { name: "stock", type: "number", required: true, defaultValue: 0, min: 0, admin: { width: "30%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Merchandising",
          fields: [
            { name: "featured", type: "checkbox", defaultValue: false },
            { name: "bestSeller", type: "checkbox", defaultValue: false },
            { name: "sortOrder", type: "number", defaultValue: 100, min: 0 },
          ],
        },
      ],
    },
  ],
  timestamps: true,
};
