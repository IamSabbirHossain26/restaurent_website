import type { FaqItem, GalleryItem, ServiceZone, Testimonial } from "./types";

/** DEMO gallery — captions describe sample imagery, not real past events. */
export const gallery: GalleryItem[] = [
  { id: "g1", media: "banquet", category: "wedding", span: "wide", caption: { en: "Reception banquet, candlelit long tables", bn: "রিসেপশন ব্যাঙ্কুয়েট, মোমবাতির আলোয় লম্বা টেবিল" } },
  { id: "g2", media: "biryani-art", category: "food", caption: { en: "Dum kacchi, sealed and slow-cooked", bn: "দম কাচ্চি, মুখ বন্ধ করে ধীরে রান্না" } },
  { id: "g3", media: "corporate", category: "corporate", caption: { en: "Conference lunch buffet", bn: "কনফারেন্স লাঞ্চ বুফে" } },
  { id: "g4", media: "mezze", category: "private", span: "tall", caption: { en: "Grazing table for a garden birthday", bn: "বাগানে জন্মদিনের গ্রেজিং টেবিল" } },
  { id: "g5", media: "wedding-art", category: "wedding", caption: { en: "Plated mains for the head table", bn: "মূল টেবিলে প্লেটেড মেইন" } },
  { id: "g6", media: "station-art", category: "corporate", caption: { en: "Live kebab station at a launch", bn: "লঞ্চ অনুষ্ঠানে লাইভ কাবাব স্টেশন" } },
  { id: "g7", media: "dessert-art", category: "wedding", caption: { en: "Mishti and petit-four table", bn: "মিষ্টি ও পেটিট-ফোর টেবিল" } },
  { id: "g8", media: "private-art", category: "private", caption: { en: "Chef's table anniversary dinner", bn: "শেফস টেবিল বিবাহবার্ষিকী ডিনার" } },
  { id: "g9", media: "canapes-art", category: "corporate", caption: { en: "Passed canapés", bn: "পরিবেশিত ক্যানাপে" } },
  { id: "g10", media: "plant-art", category: "food", caption: { en: "Plant-forward plates", bn: "উদ্ভিজ্জ প্লেট" } },
  { id: "g11", media: "garden-art", category: "private", span: "wide", caption: { en: "Rooftop evening under festoon lights", bn: "ফেস্টুন আলোর নিচে ছাদের সন্ধ্যা" } },
  { id: "g12", media: "chef-art", category: "food", caption: { en: "Finishing plates at the pass", bn: "পাসে প্লেটের শেষ ছোঁয়া" } },
];

/** DEMO service zones and logistics fees. */
export const serviceZones: ServiceZone[] = [
  {
    id: "core",
    name: { en: "Core Dhaka", bn: "কেন্দ্রীয় ঢাকা" },
    note: { en: "No logistics fee", bn: "কোনো লজিস্টিক ফি নেই" },
    fee: 0,
    areas: [
      { en: "Gulshan", bn: "গুলশান" },
      { en: "Banani", bn: "বনানী" },
      { en: "Baridhara", bn: "বারিধারা" },
      { en: "Dhanmondi", bn: "ধানমন্ডি" },
      { en: "Mohakhali", bn: "মহাখালী" },
      { en: "Tejgaon", bn: "তেজগাঁও" },
      { en: "Motijheel", bn: "মতিঝিল" },
      { en: "Lalmatia", bn: "লালমাটিয়া" },
    ],
  },
  {
    id: "greater",
    name: { en: "Greater Dhaka", bn: "বৃহত্তর ঢাকা" },
    note: { en: "Flat logistics fee per event", bn: "প্রতি অনুষ্ঠানে নির্দিষ্ট লজিস্টিক ফি" },
    fee: 3000,
    areas: [
      { en: "Uttara", bn: "উত্তরা" },
      { en: "Bashundhara", bn: "বসুন্ধরা" },
      { en: "Mirpur", bn: "মিরপুর" },
      { en: "Mohammadpur", bn: "মোহাম্মদপুর" },
      { en: "Badda", bn: "বাড্ডা" },
      { en: "Old Dhaka", bn: "পুরান ঢাকা" },
      { en: "Purbachal", bn: "পূর্বাচল" },
    ],
  },
  {
    id: "extended",
    name: { en: "Extended region", bn: "সম্প্রসারিত এলাকা" },
    note: { en: "Quoted per event (min. 150 guests)", bn: "প্রতি অনুষ্ঠানে আলাদা কোটেশন (ন্যূনতম ১৫০ অতিথি)" },
    fee: null,
    areas: [
      { en: "Narayanganj", bn: "নারায়ণগঞ্জ" },
      { en: "Gazipur", bn: "গাজীপুর" },
      { en: "Savar", bn: "সাভার" },
      { en: "Munshiganj", bn: "মুন্সীগঞ্জ" },
    ],
  },
];

/**
 * DEMO testimonials — placeholders only. Replace with real, permissioned
 * client reviews before publishing. Do not present these as genuine.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: {
      en: "Sample review: “The walima ran exactly to time and the kacchi was the talk of both families.”",
      bn: "নমুনা রিভিউ: “ওয়ালিমা একদম সময়মতো হয়েছে, আর কাচ্চি নিয়ে দুই পরিবারেই আলোচনা।”",
    },
    author: { en: "Demo client A.", bn: "ডেমো ক্লায়েন্ট ক." },
    event: { en: "Wedding · 450 guests", bn: "বিয়ে · ৪৫০ অতিথি" },
  },
  {
    id: "t2",
    quote: {
      en: "Sample review: “Every dietary label was right, and the team was gone before our afternoon session.”",
      bn: "নমুনা রিভিউ: “প্রতিটি ডায়েটারি লেবেল সঠিক ছিল, আর বিকেলের সেশনের আগেই দল কাজ গুছিয়ে নিয়েছে।”",
    },
    author: { en: "Demo client B.", bn: "ডেমো ক্লায়েন্ট খ." },
    event: { en: "Corporate conference · 220 guests", bn: "কর্পোরেট কনফারেন্স · ২২০ অতিথি" },
  },
  {
    id: "t3",
    quote: {
      en: "Sample review: “Our anniversary dinner at home felt like a restaurant — without leaving the living room.”",
      bn: "নমুনা রিভিউ: “বাড়িতেই বিবাহবার্ষিকীর ডিনার যেন রেস্তোরাঁর অভিজ্ঞতা — বসার ঘর ছেড়ে না গিয়েই।”",
    },
    author: { en: "Demo client C.", bn: "ডেমো ক্লায়েন্ট গ." },
    event: { en: "Private chef's table · 14 guests", bn: "প্রাইভেট শেফস টেবিল · ১৪ অতিথি" },
  },
];

export const faqs: FaqItem[] = [
  {
    id: "lead-time",
    category: "booking",
    q: { en: "How far in advance should we book?", bn: "কত দিন আগে বুকিং দেওয়া উচিত?" },
    a: {
      en: "For weddings, 3–6 months is ideal, especially in the winter season. Corporate and private events can often be arranged 1–3 weeks ahead. The absolute minimum we accept is shown on the quote form (demo setting: 3 days).",
      bn: "বিয়ের জন্য ৩–৬ মাস আদর্শ, বিশেষত শীত মৌসুমে। কর্পোরেট ও ব্যক্তিগত অনুষ্ঠান সাধারণত ১–৩ সপ্তাহ আগে আয়োজন করা যায়। ন্যূনতম সময় কোটেশন ফর্মে দেখানো আছে (ডেমো সেটিং: ৩ দিন)।",
    },
  },
  {
    id: "deposit",
    category: "booking",
    q: { en: "How do we confirm a booking?", bn: "বুকিং কীভাবে নিশ্চিত করব?" },
    a: {
      en: "After your quote is agreed, the date is held with a signed proposal and an advance payment. The exact deposit and payment schedule are set by the business and shown on your written proposal (placeholder policy).",
      bn: "কোটেশন চূড়ান্ত হলে স্বাক্ষরিত প্রস্তাব ও অগ্রিম পেমেন্টের মাধ্যমে তারিখ নিশ্চিত হয়। অগ্রিমের পরিমাণ ও পেমেন্ট সূচি লিখিত প্রস্তাবে উল্লেখ থাকবে (প্লেসহোল্ডার নীতি)।",
    },
  },
  {
    id: "tasting",
    category: "booking",
    q: { en: "Do you offer menu tastings?", bn: "মেনু টেস্টিংয়ের সুযোগ আছে কি?" },
    a: {
      en: "Yes. Tastings are included with some packages (see the comparison table) and can be booked separately for others.",
      bn: "হ্যাঁ। কিছু প্যাকেজে টেস্টিং অন্তর্ভুক্ত (তুলনা টেবিল দেখুন), অন্যগুলোতে আলাদাভাবে বুক করা যায়।",
    },
  },
  {
    id: "dietary",
    category: "menu",
    q: { en: "Can you cater for vegetarian, vegan and allergy needs?", bn: "নিরামিষ, ভেগান ও অ্যালার্জির চাহিদা মেটাতে পারবেন?" },
    a: {
      en: "Yes — tell us the numbers on the quote form. Every dish is labelled on the day. Our kitchen handles nuts, dairy, gluten and seafood, so we can minimise but not guarantee the absence of cross-contact for severe allergies.",
      bn: "হ্যাঁ — কোটেশন ফর্মে সংখ্যা জানান। অনুষ্ঠানের দিন প্রতিটি পদে লেবেল থাকে। আমাদের রান্নাঘরে বাদাম, দুধ, গ্লুটেন ও সামুদ্রিক খাবার ব্যবহৃত হয়, তাই গুরুতর অ্যালার্জির ক্ষেত্রে ক্রস-কন্টাক্ট কমানো গেলেও সম্পূর্ণ নিশ্চয়তা দেওয়া সম্ভব নয়।",
    },
  },
  {
    id: "custom",
    category: "menu",
    q: { en: "Can we customise a package menu?", bn: "প্যাকেজের মেনু কি নিজের মতো বদলানো যায়?" },
    a: {
      en: "Most packages allow dish swaps from the sample menu library. Swaps to premium items (e.g. seafood, lamb) may change the per-guest price.",
      bn: "বেশিরভাগ প্যাকেজে নমুনা মেনু লাইব্রেরি থেকে পদ বদল করা যায়। প্রিমিয়াম পদে (যেমন সামুদ্রিক খাবার, ল্যাম্ব) বদলালে প্রতি অতিথির মূল্য পরিবর্তন হতে পারে।",
    },
  },
  {
    id: "estimate",
    category: "pricing",
    q: { en: "Is the estimator price final?", bn: "এস্টিমেটরের দাম কি চূড়ান্ত?" },
    a: {
      en: "No. The estimator gives an indicative range using demo prices. Your final quote depends on menu, venue access, date, staffing and rentals.",
      bn: "না। এস্টিমেটর ডেমো মূল্যে একটি আনুমানিক পরিসর দেখায়। চূড়ান্ত কোটেশন মেনু, ভেন্যু, তারিখ, স্টাফ ও ভাড়া সামগ্রীর ওপর নির্ভর করে।",
    },
  },
  {
    id: "extras",
    category: "pricing",
    q: { en: "What is not included in per-guest prices?", bn: "প্রতি অতিথির মূল্যে কী অন্তর্ভুক্ত নয়?" },
    a: {
      en: "Service charge, VAT, logistics outside Core Dhaka, specialist rentals (stages, décor, tents) and venue fees are quoted separately.",
      bn: "সার্ভিস চার্জ, ভ্যাট, কেন্দ্রীয় ঢাকার বাইরের লজিস্টিক, বিশেষ ভাড়া সামগ্রী (মঞ্চ, ডেকোর, তাঁবু) ও ভেন্যু ফি আলাদাভাবে উল্লেখ করা হয়।",
    },
  },
  {
    id: "numbers",
    category: "pricing",
    q: { en: "What if our guest count changes?", bn: "অতিথির সংখ্যা বদলে গেলে কী হবে?" },
    a: {
      en: "You can adjust numbers until the final-count deadline in your proposal. After that, we prepare for the confirmed number.",
      bn: "প্রস্তাবে উল্লেখিত চূড়ান্ত সংখ্যার সময়সীমা পর্যন্ত সংখ্যা পরিবর্তন করা যায়। এরপর নিশ্চিত সংখ্যা অনুযায়ী প্রস্তুতি নেওয়া হয়।",
    },
  },
  {
    id: "venue",
    category: "day",
    q: { en: "Do you need a kitchen at the venue?", bn: "ভেন্যুতে রান্নাঘর লাগবে কি?" },
    a: {
      en: "No. Most food is cooked in our central kitchen and transported hot. For live stations we bring portable equipment; we'll check power and space during the venue walkthrough.",
      bn: "না। বেশিরভাগ খাবার আমাদের কেন্দ্রীয় রান্নাঘরে রান্না করে গরম অবস্থায় আনা হয়। লাইভ স্টেশনের জন্য পোর্টেবল সরঞ্জাম আনি; ভেন্যু পরিদর্শনে বিদ্যুৎ ও জায়গা যাচাই করি।",
    },
  },
  {
    id: "leftovers",
    category: "day",
    q: { en: "What happens to leftover food?", bn: "বেঁচে যাওয়া খাবারের কী হয়?" },
    a: {
      en: "Where food-safety allows, we can pack leftovers for the host. Policy details are confirmed in your proposal.",
      bn: "খাদ্য-নিরাপত্তা অনুমতি দিলে বেঁচে যাওয়া খাবার আয়োজকের জন্য প্যাক করে দেওয়া যায়। বিস্তারিত প্রস্তাবে নিশ্চিত করা হয়।",
    },
  },
  {
    id: "arrive",
    category: "day",
    q: { en: "When does the team arrive?", bn: "দল কখন পৌঁছায়?" },
    a: {
      en: "Typically 2–3 hours before service for buffets and 3–4 hours for plated receptions, depending on venue access.",
      bn: "সাধারণত বুফের জন্য সার্ভিসের ২–৩ ঘণ্টা আগে এবং প্লেটেড রিসেপশনের জন্য ৩–৪ ঘণ্টা আগে, ভেন্যুতে প্রবেশের সুবিধা অনুযায়ী।",
    },
  },
];
