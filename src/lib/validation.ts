/**
 * Shared, framework-free validation used by the client forms AND the
 * API route handlers. Errors are message keys under `validation.*` in
 * messages/<locale>.json so they can be translated.
 */
import type { EventTypeId } from "@/content/types";

export type ValidationErrorKey =
  | "required"
  | "invalidDate"
  | "dateTooSoon"
  | "minLength"
  | "maxLength"
  | "guestsRange"
  | "invalidPhone"
  | "invalidEmail"
  | "dietaryExceeds"
  | "consent"
  | "contactMethod";

export type FieldErrors<T extends string> = Partial<Record<T, ValidationErrorKey>>;

export const dietaryKeys = ["vegetarian", "vegan", "glutenFree", "halal", "nutAllergy", "kids"] as const;
export type DietaryKey = (typeof dietaryKeys)[number];

export type QuotePayload = {
  eventType: EventTypeId | "";
  date: string;
  venue: string;
  area: string;
  guests: number;
  packageSlug: string;
  serviceStyle: string;
  dietary: Record<DietaryKey, number>;
  dietaryNotes: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  contactMethod: "phone" | "whatsapp" | "email";
  consent: boolean;
};

export type QuoteField =
  | "eventType"
  | "date"
  | "venue"
  | "guests"
  | "dietary"
  | "dietaryNotes"
  | "name"
  | "phone"
  | "email"
  | "contactMethod"
  | "consent";

export const PHONE_RE = /^\+?[0-9][0-9\s-]{7,15}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** YYYY-MM-DD for `now + days` (using the provided clock, local calendar). */
export function isoDatePlusDays(now: Date, days: number) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function isValidIsoDate(value: string) {
  if (!ISO_DATE_RE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

export type QuoteRules = { minLeadDays: number; maxGuests: number; now?: Date };

export const QUOTE_STEPS: QuoteField[][] = [
  ["eventType", "date", "venue", "guests"],
  ["dietary", "dietaryNotes"],
  ["name", "phone", "email", "contactMethod", "consent"],
];

export function validateQuote(p: QuotePayload, rules: QuoteRules): FieldErrors<QuoteField> {
  const e: FieldErrors<QuoteField> = {};
  const now = rules.now ?? new Date();

  if (!p.eventType) e.eventType = "required";

  if (!p.date) e.date = "required";
  else if (!isValidIsoDate(p.date)) e.date = "invalidDate";
  else if (p.date < isoDatePlusDays(now, rules.minLeadDays)) e.date = "dateTooSoon";

  if (!p.venue.trim()) e.venue = "required";
  else if (p.venue.trim().length < 3) e.venue = "minLength";

  if (!Number.isFinite(p.guests) || !Number.isInteger(p.guests) || p.guests < 1 || p.guests > rules.maxGuests)
    e.guests = "guestsRange";

  // Each dietary count is a subset of the guest list (a guest may need several).
  if (!e.guests && dietaryKeys.some((k) => (p.dietary[k] || 0) < 0 || (p.dietary[k] || 0) > p.guests))
    e.dietary = "dietaryExceeds";

  if (p.dietaryNotes.length > 600) e.dietaryNotes = "maxLength";

  if (!p.name.trim()) e.name = "required";
  else if (p.name.trim().length < 2) e.name = "minLength";

  if (!p.phone.trim()) e.phone = "required";
  else if (!PHONE_RE.test(p.phone.trim())) e.phone = "invalidPhone";

  if (p.email.trim() && !EMAIL_RE.test(p.email.trim())) e.email = "invalidEmail";
  if (p.contactMethod === "email" && !p.email.trim()) e.email = "required";

  if (!["phone", "whatsapp", "email"].includes(p.contactMethod)) e.contactMethod = "contactMethod";

  if (!p.consent) e.consent = "consent";

  return e;
}

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
};
export type ContactField = "name" | "email" | "phone" | "message" | "consent";

export function validateContact(p: ContactPayload): FieldErrors<ContactField> {
  const e: FieldErrors<ContactField> = {};
  if (!p.name.trim()) e.name = "required";
  else if (p.name.trim().length < 2) e.name = "minLength";

  if (!p.email.trim() && !p.phone.trim()) {
    e.email = "contactMethod";
  } else {
    if (p.email.trim() && !EMAIL_RE.test(p.email.trim())) e.email = "invalidEmail";
    if (p.phone.trim() && !PHONE_RE.test(p.phone.trim())) e.phone = "invalidPhone";
  }

  if (!p.message.trim()) e.message = "required";
  else if (p.message.trim().length < 10) e.message = "minLength";
  else if (p.message.length > 2000) e.message = "maxLength";

  if (!p.consent) e.consent = "consent";
  return e;
}
