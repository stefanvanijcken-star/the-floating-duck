import type { CollectionConfig } from "payload";

const isAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const NewsletterSubscriptions: CollectionConfig = {
  slug: "newsletter-subscriptions",
  admin: {
    useAsTitle: "email",
    group: "Customer care",
    defaultColumns: ["email", "status", "createdAt"],
  },
  access: {
    create: () => false,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "subscribed",
      options: ["subscribed", "unsubscribed"],
    },
    { name: "source", type: "select", required: true, defaultValue: "footer", options: ["footer", "contact", "checkout"] },
  ],
  timestamps: true,
};
