import type { Locale } from "@/i18n/routing";

/** A value translated into every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

/** Pick the value for a locale from a localized record. */
export function l<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export type EventTypeId = "wedding" | "corporate" | "private";

export type DietaryTag =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "nut-free"
  | "spicy";

export type ServiceStyle = "buffet" | "plated" | "family" | "stations" | "canapes";

/** Image key that maps to `src/content/media.ts`. */
export type MediaKey =
  | "banquet"
  | "corporate"
  | "mezze"
  | "wedding-art"
  | "biryani-art"
  | "canapes-art"
  | "dessert-art"
  | "chef-art"
  | "garden-art"
  | "station-art"
  | "plant-art"
  | "private-art";

export type Media = {
  /** Path inside /public. Leave undefined to render the art-directed placeholder. */
  src?: string;
  alt: Localized;
  /** Palette used for the placeholder treatment when no photo is supplied. */
  tone: "olive" | "charcoal" | "brass" | "linen" | "wine";
  /** Lucide icon name rendered on the placeholder. */
  icon: "utensils" | "wine" | "cake" | "chef" | "leaf" | "flame" | "soup" | "sparkles";
};

export type Dish = {
  name: Localized;
  note?: Localized;
  tags?: DietaryTag[];
};

export type MenuCourse = {
  title: Localized;
  dishes: Dish[];
};

export type ComparisonKey =
  | "courses"
  | "liveStation"
  | "staff"
  | "crockery"
  | "tasting"
  | "setup"
  | "dessertTable";

export type CateringPackage = {
  slug: string;
  name: Localized;
  tagline: Localized;
  summary: Localized;
  description: Localized;
  eventTypes: EventTypeId[];
  /** Demo price per guest in the site currency (whole units). */
  pricePerGuest: number;
  minGuests: number;
  maxGuests?: number;
  serviceStyles: ServiceStyle[];
  includes: Localized[];
  menu: MenuCourse[];
  comparison: Record<ComparisonKey, boolean | Localized>;
  media: MediaKey;
  featured?: boolean;
};

export type EventType = {
  id: EventTypeId;
  slug: string;
  name: Localized;
  kicker: Localized;
  intro: Localized;
  body: Localized;
  occasions: Localized[];
  guestRange: Localized;
  timeline: { title: Localized; text: Localized }[];
  media: MediaKey;
};

export type LibraryDish = Dish & {
  id: string;
  course: "starter" | "main" | "side" | "dessert" | "drink";
  cuisine: "bengali" | "mughlai" | "continental" | "asian" | "mediterranean";
};

export type GalleryItem = {
  id: string;
  media: MediaKey;
  category: EventTypeId | "food";
  caption: Localized;
  span?: "wide" | "tall";
};

export type ServiceZone = {
  id: string;
  name: Localized;
  note: Localized;
  /** Demo travel/logistics fee in site currency, 0 = included. */
  fee: number | null;
  areas: Localized[];
};

export type Testimonial = {
  id: string;
  quote: Localized;
  author: Localized;
  event: Localized;
};

export type FaqItem = {
  id: string;
  category: "booking" | "menu" | "pricing" | "day";
  q: Localized;
  a: Localized;
};
