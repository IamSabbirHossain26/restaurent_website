import type { Media, MediaKey } from "./types";

/**
 * Image library. Real photos live in /public/images.
 * Entries without `src` render an art-directed CSS placeholder —
 * drop a photo into /public/images and set `src` to replace it.
 */
export const media: Record<MediaKey, Media> = {
  banquet: {
    src: "/images/hero-banquet.jpg",
    alt: {
      en: "Long candlelit banquet table set with linen, olive branches and plated starters at dusk",
      bn: "সন্ধ্যায় মোমবাতির আলোয় সাজানো লম্বা ব্যাঙ্কুয়েট টেবিল, লিনেন, জলপাই ডাল ও স্টার্টার",
    },
    tone: "charcoal",
    icon: "wine",
  },
  corporate: {
    src: "/images/corporate.jpg",
    alt: {
      en: "Bright corporate lunch buffet with charcoal and brass chafing dishes and salad bowls",
      bn: "চারকোল ও পিতলের চেফিং ডিশ এবং সালাদ বাটিসহ উজ্জ্বল কর্পোরেট লাঞ্চ বুফে",
    },
    tone: "linen",
    icon: "utensils",
  },
  mezze: {
    src: "/images/mezze.jpg",
    alt: {
      en: "Overhead view of a grazing table with mezze, flatbreads, cheeses, figs and olives",
      bn: "ওপর থেকে দেখা গ্রেজিং টেবিল — মেজে, ফ্ল্যাটব্রেড, চিজ, ডুমুর ও জলপাই",
    },
    tone: "olive",
    icon: "leaf",
  },
  "wedding-art": {
    alt: { en: "Wedding reception plated service (placeholder artwork)", bn: "বিয়ের রিসেপশনে প্লেটেড পরিবেশন (প্লেসহোল্ডার)" },
    tone: "wine",
    icon: "sparkles",
  },
  "biryani-art": {
    alt: { en: "Copper handi of kacchi biryani (placeholder artwork)", bn: "তামার হাঁড়িতে কাচ্চি বিরিয়ানি (প্লেসহোল্ডার)" },
    tone: "brass",
    icon: "soup",
  },
  "canapes-art": {
    alt: { en: "Tray of canapés (placeholder artwork)", bn: "ক্যানাপের ট্রে (প্লেসহোল্ডার)" },
    tone: "charcoal",
    icon: "sparkles",
  },
  "dessert-art": {
    alt: { en: "Dessert and mishti table (placeholder artwork)", bn: "ডেজার্ট ও মিষ্টির টেবিল (প্লেসহোল্ডার)" },
    tone: "linen",
    icon: "cake",
  },
  "chef-art": {
    alt: { en: "Chef plating a dish (placeholder artwork)", bn: "শেফ খাবার সাজাচ্ছেন (প্লেসহোল্ডার)" },
    tone: "charcoal",
    icon: "chef",
  },
  "garden-art": {
    alt: { en: "Outdoor garden event at night (placeholder artwork)", bn: "রাতের বাগানে আয়োজন (প্লেসহোল্ডার)" },
    tone: "olive",
    icon: "sparkles",
  },
  "station-art": {
    alt: { en: "Live cooking station (placeholder artwork)", bn: "লাইভ কুকিং স্টেশন (প্লেসহোল্ডার)" },
    tone: "wine",
    icon: "flame",
  },
  "plant-art": {
    alt: { en: "Plant-based plated dishes (placeholder artwork)", bn: "উদ্ভিজ্জ খাবারের প্লেট (প্লেসহোল্ডার)" },
    tone: "olive",
    icon: "leaf",
  },
  "private-art": {
    alt: { en: "Intimate private dinner (placeholder artwork)", bn: "ঘরোয়া প্রাইভেট ডিনার (প্লেসহোল্ডার)" },
    tone: "brass",
    icon: "wine",
  },
};
