export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ContentPage = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: ContentSection[];
  updated?: string;
};

export const contentPages: Record<string, ContentPage> = {
  "our-story": {
    title: "Our Story",
    eyebrow: "The Floating Duck",
    intro: "Swimwear made for long lunches, spontaneous swims and summers that should never end.",
    sections: [
      { heading: "Born by the water", paragraphs: ["The Floating Duck began with a simple idea: beachwear should feel playful without losing its sense of quality. Our collections combine nostalgic Mediterranean colour, considered silhouettes and an easy confidence that works from pool to promenade."] },
      { heading: "Designed as a collection", paragraphs: ["Every print and colour is developed as part of a wider story. Men’s shorts, bikini separates, swimsuits and beach accessories are designed to sit together, so couples and friends can coordinate without looking overly matched."] },
      { heading: "Made to be worn", paragraphs: ["We prioritise comfort, reliable coverage and fabrics selected for repeated days in sun, salt and chlorine. The result is swimwear that looks special but never feels precious."] },
    ],
  },
  sustainability: {
    title: "Sustainability",
    eyebrow: "Created with care",
    intro: "We are building a young brand with a practical approach: better materials, considered quantities and honest progress.",
    sections: [
      { heading: "Materials", bullets: ["Preference for recycled fibres in swimwear fabrics.", "OEKO-TEX certified materials where available.", "Responsibly sourced cotton for towels and soft accessories."] },
      { heading: "Considered production", paragraphs: ["Small, focused collections help us learn what customers truly love and reduce unnecessary stock. We aim to improve forecasting and production planning with every launch."] },
      { heading: "Designed for longer", paragraphs: ["Good care is part of sustainability. Rinse swimwear after salt or chlorine, wash cool and dry in the shade. Clear care information is included on every product page."] },
      { heading: "Our next steps", paragraphs: ["Before launch we will publish confirmed supplier, packaging and transport details. We will only make claims that can be supported by information from our production partners."] },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    eyebrow: "Customer care",
    intro: "Quick answers about products, delivery, returns and caring for your swimwear.",
    sections: [
      { heading: "How do I choose my size?", paragraphs: ["Use the size guide and compare it with a similar item you already own. Bikini tops and bottoms are sold separately, so you can select the best size for each piece."] },
      { heading: "Can I combine bikini sizes?", paragraphs: ["Yes. Bikini tops and bottoms are separate products. Matching pieces are shown under Complete The Set on each product page."] },
      { heading: "When will my order arrive?", paragraphs: ["Orders in the Netherlands are expected within 1–2 working days after dispatch. Belgium and Germany usually take 2–4 working days; other EU destinations generally take 3–6 working days."] },
      { heading: "Can I return swimwear?", paragraphs: ["Yes, within 30 days, provided it is unworn, unwashed and returned with all tags and the hygiene seal intact. Items without the hygiene seal cannot be accepted."] },
      { heading: "How should I wash swimwear?", paragraphs: ["Rinse in cold water after swimming. Wash at 30°C on a gentle cycle and dry in the shade. Avoid bleach, tumble drying, ironing and dry cleaning."] },
      { heading: "Do you ship internationally?", paragraphs: ["The shop is prepared for European and selected international delivery. Final destinations and shipping prices will be confirmed before checkout is activated."] },
    ],
  },
  "shipping-delivery": {
    title: "Shipping & Delivery",
    eyebrow: "Customer care",
    intro: "Clear delivery expectations, from our door to your next day by the water.",
    sections: [
      { heading: "Estimated delivery", bullets: ["Netherlands: 1–2 working days after dispatch.", "Belgium and Germany: 2–4 working days.", "Other EU destinations: 3–6 working days.", "International destinations: timing shown at checkout when available."] },
      { heading: "Shipping costs", paragraphs: ["Standard shipping is free from €75. Below that threshold, the exact rate is shown before payment. Duties or import taxes for destinations outside the EU are the customer’s responsibility unless checkout states otherwise."] },
      { heading: "Tracking", paragraphs: ["Once your order leaves us, you receive a dispatch email with tracking information. You can also use the Track Your Order page with your order number and email address."] },
      { heading: "Delays or damage", paragraphs: ["If a parcel is delayed, damaged or marked as delivered but cannot be found, contact us with your order number so we can investigate with the carrier."] },
    ],
  },
  returns: {
    title: "Returns",
    eyebrow: "Customer care",
    intro: "You have 30 days to decide whether your order is right for you.",
    sections: [
      { heading: "Return conditions", bullets: ["Items must be unworn, unwashed and undamaged.", "All original tags must remain attached.", "Swimwear must retain its original hygiene seal.", "Return the product in suitable protective packaging."] },
      { heading: "Starting a return", paragraphs: ["Contact us with your order number and the items you wish to return. We will provide the current return address and instructions. Do not send items before receiving those instructions."] },
      { heading: "Return costs", paragraphs: ["Unless an item is faulty or incorrect, return shipping is paid by the customer. Keep your proof of postage until the refund is complete."] },
      { heading: "Exchanges", paragraphs: ["For the fastest result, return the unwanted size and place a new order once checkout is available. This prevents another customer from purchasing the replacement while your return is in transit."] },
    ],
  },
  "size-guide": {
    title: "Size Guide",
    eyebrow: "Find your fit",
    intro: "Use body measurements as a starting point. If you are between sizes, choose based on your preferred fit.",
    sections: [
      { heading: "Women’s swimwear", bullets: ["XS: bust 78–82 cm, waist 60–64 cm, hips 86–90 cm.", "S: bust 83–87 cm, waist 65–69 cm, hips 91–95 cm.", "M: bust 88–92 cm, waist 70–74 cm, hips 96–100 cm.", "L: bust 93–98 cm, waist 75–80 cm, hips 101–106 cm.", "XL: bust 99–105 cm, waist 81–87 cm, hips 107–113 cm."] },
      { heading: "Men’s swim shorts", bullets: ["S: waist 76–81 cm.", "M: waist 82–87 cm.", "L: waist 88–93 cm.", "XL: waist 94–100 cm."] },
      { heading: "How to measure", bullets: ["Bust: measure around the fullest part while keeping the tape level.", "Waist: measure around your natural waist without pulling tight.", "Hips: measure around the fullest part of your hips and seat."] },
      { heading: "Need help?", paragraphs: ["Send your measurements through the contact form and tell us which product you are considering. We will help you choose before ordering."] },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    eyebrow: "Legal",
    intro: "This policy explains what information The Floating Duck collects and how it is used.",
    updated: "Last updated: 20 July 2026",
    sections: [
      { heading: "Information we collect", bullets: ["Contact details you submit through forms.", "Order and delivery details when checkout is activated.", "Newsletter preferences.", "Necessary technical information used to keep the website secure and functional."] },
      { heading: "How we use information", paragraphs: ["We use personal information to answer questions, process and deliver orders, handle returns, prevent misuse and send marketing only when you have requested it."] },
      { heading: "Sharing and retention", paragraphs: ["Information is shared only with service providers needed to operate the shop, such as hosting, delivery and payment partners. We retain information only for as long as needed for its purpose or required by law."] },
      { heading: "Your rights", paragraphs: ["Depending on applicable law, you may request access, correction, deletion, restriction or portability of your information and withdraw marketing consent at any time. Use the contact form to make a request."] },
    ],
  },
  "terms-conditions": {
    title: "Terms & Conditions",
    eyebrow: "Legal",
    intro: "These terms apply to purchases made through The Floating Duck online shop once checkout is activated.",
    updated: "Last updated: 20 July 2026",
    sections: [
      { heading: "Products and prices", paragraphs: ["Product descriptions, availability and prices are shown on the relevant product page. Prices include applicable VAT unless stated otherwise. Obvious pricing or description errors may be corrected before an order is accepted."] },
      { heading: "Orders", paragraphs: ["An order becomes binding when payment is accepted and an order confirmation is sent. We may decline an order in cases such as unavailable stock, suspected fraud or an obvious error."] },
      { heading: "Delivery and cancellation", paragraphs: ["Delivery estimates are not guarantees. Consumers may use their statutory withdrawal rights, subject to the hygiene exception for swimwear when a hygiene seal has been removed."] },
      { heading: "Liability and applicable law", paragraphs: ["Nothing in these terms limits rights that cannot legally be excluded. Dutch law applies, while mandatory consumer protections in your country remain unaffected."] },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    eyebrow: "Legal",
    intro: "We keep cookies limited and use them to make the shop function reliably.",
    updated: "Last updated: 20 July 2026",
    sections: [
      { heading: "Necessary storage", paragraphs: ["The site stores functional preferences such as your shopping bag, recently viewed products and selected currency. These features are necessary for the experience you request."] },
      { heading: "Analytics and marketing", paragraphs: ["No optional analytics or advertising cookies should be activated without an appropriate consent choice. If these tools are added later, this page and the cookie controls will be updated first."] },
      { heading: "Managing cookies", paragraphs: ["You can remove stored website data through your browser settings. Doing so may clear your shopping bag and preferences."] },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    eyebrow: "Legal",
    intro: "Approved refunds are returned to the original payment method.",
    updated: "Last updated: 20 July 2026",
    sections: [
      { heading: "When a refund is issued", paragraphs: ["After an eligible return is received and inspected, we will confirm approval or explain why the return cannot be accepted. Faulty or incorrect products should be reported through the contact form."] },
      { heading: "Timing", paragraphs: ["Approved refunds are submitted promptly. Banks and payment providers may need several additional working days before the amount appears in your account."] },
      { heading: "Shipping charges", paragraphs: ["Original standard delivery costs are refunded where required by consumer law. Additional costs for premium delivery are not refundable. Return postage is refunded only for faulty or incorrectly supplied items."] },
    ],
  },
};
