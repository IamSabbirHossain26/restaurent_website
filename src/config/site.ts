/**
 * BUSINESS SETTINGS — edit this file to rebrand the site.
 * Every value below is an EDITABLE PLACEHOLDER (demo content).
 * Do not publish placeholder phone numbers, addresses or emails.
 */
import type { Localized } from "@/content/types";

export const site = {
  /** Shown in header, footer, metadata and structured data. */
  name: "Olive & Ember",
  legalName: "Olive & Ember Catering Studio (demo business name)",
  tagline: {
    en: "Catering studio for weddings, offices & private tables",
    bn: "বিয়ে, অফিস ও ঘরোয়া আয়োজনের ক্যাটারিং স্টুডিও",
  } satisfies Localized,
  /** Set NEXT_PUBLIC_SITE_URL in production for canonical URLs & sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Marks the whole site as a portfolio demo (shows the demo ribbon). */
  isDemo: true,

  contact: {
    phoneDisplay: "+880 1XXX-XXXXXX",
    phoneHref: "tel:+8801000000000",
    /** International format, digits only, for wa.me links. */
    whatsapp: "8801000000000",
    email: "hello@example.com",
  },

  address: {
    street: {
      en: "House 00, Road 00 (placeholder)",
      bn: "বাড়ি ০০, রোড ০০ (প্লেসহোল্ডার)",
    } satisfies Localized,
    city: { en: "Dhaka", bn: "ঢাকা" } satisfies Localized,
    region: { en: "Dhaka Division", bn: "ঢাকা বিভাগ" } satisfies Localized,
    postalCode: "1200",
    country: { en: "Bangladesh", bn: "বাংলাদেশ" } satisfies Localized,
    countryCode: "BD",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dhaka",
  },

  currency: "BDT",
  timezone: "Asia/Dhaka",

  /** Kitchen office / tasting studio hours (24h). 0 = Sunday. */
  hours: [
    { days: [6, 0, 1, 2, 3], open: "10:00", close: "19:00" },
    { days: [4], open: "10:00", close: "16:00" },
  ] as { days: number[]; open: string; close: string }[],
  closedDays: [5],

  social: {
    facebook: "https://facebook.com/your-page",
    instagram: "https://instagram.com/your-handle",
    youtube: "https://youtube.com/@your-channel",
    linkedin: "https://linkedin.com/company/your-company",
  },

  /** Where primary CTAs point. Paths are locale-relative. */
  cta: {
    primary: "/quote",
    estimator: "/estimator",
  },

  /** Lead time and booking rules used in copy & validation. */
  booking: {
    minLeadDays: 3,
    maxGuests: 2000,
    serviceChargePercent: 10,
    vatNote: true,
  },
} as const;

export type SiteConfig = typeof site;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
