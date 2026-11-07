"use server";

import { getPayload } from "payload";
import { z } from "zod";
import config from "@payload-config";

export type FormState = { status: "idle" | "success" | "error"; message: string };
const emailSchema = z.string().trim().email().max(200).transform(value => value.toLowerCase());
const text = (minimum: number, maximum: number) => z.string().trim().min(minimum).max(maximum);

export async function subscribeToNewsletter(_state: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("website") ?? "")) return { status: "success", message: "Thank you for signing up." };
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { status: "error", message: "Please enter a valid email address." };

  try {
    const payload = await getPayload({ config });
    const existing = await payload.find({
      collection: "newsletter-subscriptions",
      limit: 1,
      overrideAccess: true,
      where: { email: { equals: parsed.data } },
    });
    if (existing.docs[0]) {
      await payload.update({
        collection: "newsletter-subscriptions",
        id: existing.docs[0].id,
        data: { status: "subscribed", source: "footer" },
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: "newsletter-subscriptions",
        data: { email: parsed.data, status: "subscribed", source: "footer" },
        overrideAccess: true,
      });
    }
    return { status: "success", message: "You’re on the list. Welcome to The Floating Duck." };
  } catch {
    return { status: "error", message: "Signing up did not work. Please try again shortly." };
  }
}

const contactSchema = z.object({
  name: text(2, 100),
  email: emailSchema,
  subject: z.enum(["Order question", "Product question", "Returns", "Press & partnerships", "Other"]),
  message: text(10, 3000),
});

export async function sendContactMessage(_state: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("website") ?? "")) return { status: "success", message: "Thanks — we’ll get back to you soon." };
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });
  if (!parsed.success) return { status: "error", message: "Please check all fields and try again." };

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "contact-messages",
      data: { ...parsed.data, status: "new" },
      overrideAccess: true,
    });
    return { status: "success", message: "Thanks — your message has been received. We’ll get back to you soon." };
  } catch {
    return { status: "error", message: "Your message could not be sent. Please try again shortly." };
  }
}

const trackingSchema = z.object({
  reference: z.string().trim().min(5).max(50).transform(value => value.toUpperCase()),
  email: emailSchema,
});

const statusLabels: Record<string, string> = {
  pending: "Awaiting payment",
  paid: "Payment received",
  processing: "Preparing your order",
  shipped: "On its way",
  completed: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export async function trackOrder(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = trackingSchema.safeParse({ reference: formData.get("reference"), email: formData.get("email") });
  if (!parsed.success) return { status: "error", message: "Enter your order number and the email used for your order." };

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "orders",
      limit: 1,
      overrideAccess: true,
      where: {
        and: [
          { reference: { equals: parsed.data.reference } },
          { email: { equals: parsed.data.email } },
        ],
      },
    });
    const order = result.docs[0];
    if (!order) return { status: "error", message: "We couldn’t find an order with those details." };
    return { status: "success", message: statusLabels[order.status] ?? "Your order is being processed." };
  } catch {
    return { status: "error", message: "Tracking is temporarily unavailable. Please try again shortly." };
  }
}
