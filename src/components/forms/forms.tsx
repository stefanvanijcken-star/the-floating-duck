"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { sendContactMessage, subscribeToNewsletter, trackOrder, type FormState } from "@/app/actions";
import styles from "./forms.module.css";

const initialFormState: FormState = { status: "idle", message: "" };

function FormMessage({ state }: { state: typeof initialFormState }) {
  if (!state.message) return null;
  return <p className={state.status === "success" ? styles.success : styles.error} role="status">
    {state.status === "success" && <CheckCircle2 size={18} />}{state.message}
  </p>;
}

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeToNewsletter, initialFormState);
  return <form action={action} className={styles.newsletter}>
    <label className="srOnly" htmlFor="newsletter-email">Your e-mail</label>
    <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="Your e-mail" required />
    <input type="text" name="website" hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button type="submit" disabled={pending}>{pending ? "Joining…" : "Subscribe"}</button>
    <FormMessage state={state} />
  </form>;
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initialFormState);
  return <form action={action} className={styles.contactForm}>
    <div className={styles.twoColumns}>
      <label><span>Name</span><input name="name" autoComplete="name" required /></label>
      <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
    </div>
    <label><span>What can we help with?</span><select name="subject" defaultValue="Product question">
      <option>Order question</option><option>Product question</option><option>Returns</option><option>Press & partnerships</option><option>Other</option>
    </select></label>
    <label><span>Message</span><textarea name="message" rows={7} minLength={10} required /></label>
    <input type="text" name="website" hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button type="submit" disabled={pending}>{pending ? "SENDING…" : <>SEND MESSAGE <ArrowRight size={17} /></>}</button>
    <FormMessage state={state} />
  </form>;
}

export function TrackingForm() {
  const [state, action, pending] = useActionState(trackOrder, initialFormState);
  return <form action={action} className={styles.trackingForm}>
    <label><span>Order number</span><input name="reference" autoComplete="off" placeholder="TFD-00001" required /></label>
    <label><span>Email address</span><input name="email" type="email" autoComplete="email" required /></label>
    <button type="submit" disabled={pending}>{pending ? "SEARCHING…" : <>TRACK ORDER <ArrowRight size={17} /></>}</button>
    <FormMessage state={state} />
  </form>;
}
