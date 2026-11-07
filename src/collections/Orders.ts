import type { CollectionConfig } from "payload";

const isAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "reference",
    group: "Shop",
    defaultColumns: ["reference", "email", "status", "total", "createdAt"],
  },
  access: {
    read: isAdmin,
    create: () => false,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "reference", type: "text", required: true, unique: true, index: true },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      index: true,
      options: [
        { label: "Pending payment", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Processing", value: "processing" },
        { label: "Shipped", value: "shipped" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Refunded", value: "refunded" },
      ],
    },
    { name: "email", type: "email", required: true, index: true },
    {
      name: "customer",
      type: "group",
      fields: [
        { name: "firstName", type: "text", required: true },
        { name: "lastName", type: "text", required: true },
        { name: "phone", type: "text" },
      ],
    },
    {
      name: "shippingAddress",
      type: "group",
      fields: [
        { name: "street", type: "text", required: true },
        { name: "houseNumber", type: "text", required: true },
        { name: "addition", type: "text" },
        { name: "postalCode", type: "text", required: true },
        { name: "city", type: "text", required: true },
        { name: "countryCode", type: "text", required: true, defaultValue: "NL" },
      ],
    },
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        { name: "product", type: "relationship", relationTo: "products", required: true },
        { name: "productName", type: "text", required: true },
        { name: "slug", type: "text", required: true },
        { name: "sku", type: "text", required: true },
        { name: "size", type: "text", required: true },
        { name: "color", type: "text", required: true },
        { name: "quantity", type: "number", required: true, min: 1 },
        { name: "unitPrice", label: "Unit price in cents", type: "number", required: true, min: 0 },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "subtotal", label: "Subtotal in cents", type: "number", required: true, min: 0, admin: { width: "33%" } },
        { name: "shipping", label: "Shipping in cents", type: "number", required: true, min: 0, admin: { width: "33%" } },
        { name: "total", label: "Total in cents", type: "number", required: true, min: 0, admin: { width: "33%" } },
      ],
    },
    { name: "currency", type: "select", required: true, defaultValue: "EUR", options: ["EUR"] },
    {
      name: "payment",
      type: "group",
      fields: [
        { name: "provider", type: "select", options: ["stripe", "mollie"] },
        { name: "providerPaymentId", type: "text", index: true },
      ],
    },
    { name: "customerNote", type: "textarea" },
  ],
  timestamps: true,
};
