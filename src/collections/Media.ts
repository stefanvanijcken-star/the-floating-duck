import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    group: "Shop",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "card", width: 960, height: 1200, fit: "cover", position: "centre" },
      { name: "thumbnail", width: 320, height: 400, fit: "cover", position: "centre" },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for accessibility, for example: Cabana Stripes swim shorts in navy, front view.",
      },
    },
  ],
};
