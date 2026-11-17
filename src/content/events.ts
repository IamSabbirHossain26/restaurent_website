import type { EventType, EventTypeId } from "./types";

export const eventTypes: EventType[] = [
  {
    id: "wedding",
    slug: "weddings",
    name: { en: "Weddings", bn: "বিয়ে" },
    kicker: { en: "Holud · Biye · Walima · Reception", bn: "হলুদ · বিয়ে · ওয়ালিমা · রিসেপশন" },
    intro: {
      en: "Multi-day wedding catering that keeps the flavours familiar and the service graceful.",
      bn: "একাধিক দিনের বিয়ের ক্যাটারিং — চেনা স্বাদ, মার্জিত পরিবেশন।",
    },
    body: {
      en: "Bangladeshi weddings are rarely one meal. We plan the holud, the ceremony and the walima or reception as one journey, so dishes don't repeat, quantities are right for each guest list, and your family isn't managing the kitchen on the day.",
      bn: "বাংলাদেশি বিয়ে খুব কমই এক বেলার আয়োজন। আমরা হলুদ, বিয়ে আর ওয়ালিমা বা রিসেপশনকে একটি যাত্রা হিসেবে পরিকল্পনা করি — যাতে পদ পুনরাবৃত্তি না হয়, প্রতিটি অতিথি তালিকায় পরিমাণ ঠিক থাকে, আর অনুষ্ঠানের দিন পরিবারকে রান্নাঘর সামলাতে না হয়।",
    },
    occasions: [
      { en: "Gaye holud", bn: "গায়ে হলুদ" },
      { en: "Akdh & ceremony lunch", bn: "আকদ ও অনুষ্ঠানের দুপুরের খাবার" },
      { en: "Walima & reception", bn: "ওয়ালিমা ও রিসেপশন" },
      { en: "Mehendi night", bn: "মেহেদি সন্ধ্যা" },
    ],
    guestRange: { en: "150 – 1,500 guests", bn: "১৫০ – ১,৫০০ অতিথি" },
    timeline: [
      { title: { en: "3–6 months out", bn: "৩–৬ মাস আগে" }, text: { en: "Enquire, hold the date and shortlist packages.", bn: "যোগাযোগ করুন, তারিখ ধরে রাখুন, প্যাকেজ বাছাই করুন।" } },
      { title: { en: "6–8 weeks out", bn: "৬–৮ সপ্তাহ আগে" }, text: { en: "Menu tasting and venue walkthrough with our captain.", bn: "মেনু টেস্টিং ও ক্যাপ্টেনের সঙ্গে ভেন্যু পরিদর্শন।" } },
      { title: { en: "10 days out", bn: "১০ দিন আগে" }, text: { en: "Final guest count and dietary list locked.", bn: "চূড়ান্ত অতিথি সংখ্যা ও ডায়েটারি তালিকা নিশ্চিত।" } },
      { title: { en: "The day", bn: "অনুষ্ঠানের দিন" }, text: { en: "We arrive early, serve, and leave the venue clear.", bn: "আগেভাগে পৌঁছাই, পরিবেশন করি, ভেন্যু পরিষ্কার রেখে ফিরি।" } },
    ],
    media: "banquet",
  },
  {
    id: "corporate",
    slug: "corporate",
    name: { en: "Corporate", bn: "কর্পোরেট" },
    kicker: { en: "Lunches · Conferences · Launches", bn: "লাঞ্চ · কনফারেন্স · লঞ্চ" },
    intro: {
      en: "Punctual, well-labelled catering that fits around your agenda — not the other way round.",
      bn: "সময়নিষ্ঠ, স্পষ্ট লেবেলযুক্ত ক্যাটারিং — যা আপনার এজেন্ডার সঙ্গে মানিয়ে চলে।",
    },
    body: {
      en: "From a 25-person board lunch to a 600-delegate conference, we agree service windows in advance, label every dish for dietary needs and keep a single point of contact for your admin or events team. Recurring office catering can be invoiced monthly on approval.",
      bn: "২৫ জনের বোর্ড লাঞ্চ থেকে ৬০০ প্রতিনিধির কনফারেন্স — আগেই সার্ভিসের সময় নির্ধারণ, প্রতিটি পদে ডায়েটারি লেবেল, আর আপনার অ্যাডমিন বা ইভেন্ট টিমের জন্য একজন যোগাযোগ ব্যক্তি। নিয়মিত অফিস ক্যাটারিংয়ে অনুমোদনসাপেক্ষে মাসিক ইনভয়েস।",
    },
    occasions: [
      { en: "Board & working lunches", bn: "বোর্ড ও ওয়ার্কিং লাঞ্চ" },
      { en: "Conferences & trainings", bn: "কনফারেন্স ও ট্রেনিং" },
      { en: "Product launches", bn: "প্রোডাক্ট লঞ্চ" },
      { en: "Iftar & year-end dinners", bn: "ইফতার ও বছর-শেষের ডিনার" },
    ],
    guestRange: { en: "25 – 800 guests", bn: "২৫ – ৮০০ অতিথি" },
    timeline: [
      { title: { en: "2–4 weeks out", bn: "২–৪ সপ্তাহ আগে" }, text: { en: "Share agenda, headcount and venue access details.", bn: "এজেন্ডা, অতিথি সংখ্যা ও ভেন্যুতে প্রবেশের তথ্য দিন।" } },
      { title: { en: "1 week out", bn: "১ সপ্তাহ আগে" }, text: { en: "Confirm menu, service windows and PO/invoice details.", bn: "মেনু, সার্ভিসের সময় ও পিও/ইনভয়েস তথ্য নিশ্চিত করুন।" } },
      { title: { en: "72 hours out", bn: "৭২ ঘণ্টা আগে" }, text: { en: "Final numbers and dietary list.", bn: "চূড়ান্ত সংখ্যা ও ডায়েটারি তালিকা।" } },
      { title: { en: "The day", bn: "অনুষ্ঠানের দিন" }, text: { en: "Quiet setup before break, clear-down after.", bn: "বিরতির আগে নিঃশব্দ সেটআপ, পরে পরিষ্কার।" } },
    ],
    media: "corporate",
  },
  {
    id: "private",
    slug: "private-celebrations",
    name: { en: "Private celebrations", bn: "ব্যক্তিগত আয়োজন" },
    kicker: { en: "Birthdays · Aqiqah · Anniversaries · Dinners", bn: "জন্মদিন · আকিকা · বিবাহবার্ষিকী · ডিনার" },
    intro: {
      en: "Home-style warmth with restaurant-level care, from rooftop birthdays to chef's-table dinners.",
      bn: "ঘরোয়া উষ্ণতা আর রেস্তোরাঁর যত্ন — ছাদের জন্মদিন থেকে শেফস-টেবিল ডিনার পর্যন্ত।",
    },
    body: {
      en: "Smaller gatherings deserve the same attention. We cook in our kitchen or yours, adapt menus for grandparents and toddlers alike, and send a team sized to your space so the host gets to enjoy the party.",
      bn: "ছোট আয়োজনও সমান যত্নের দাবিদার। আমাদের রান্নাঘরে বা আপনার রান্নাঘরে রান্না, দাদা-দাদি থেকে শিশুদের উপযোগী মেনু, আর আপনার জায়গার মাপে দল — যাতে আয়োজক নিজেও উৎসব উপভোগ করতে পারেন।",
    },
    occasions: [
      { en: "Birthdays & milestone parties", bn: "জন্মদিন ও বিশেষ দিনের পার্টি" },
      { en: "Aqiqah & milad", bn: "আকিকা ও মিলাদ" },
      { en: "Anniversary dinners", bn: "বিবাহবার্ষিকী ডিনার" },
      { en: "Eid & family gatherings", bn: "ঈদ ও পারিবারিক মিলনমেলা" },
    ],
    guestRange: { en: "8 – 300 guests", bn: "৮ – ৩০০ অতিথি" },
    timeline: [
      { title: { en: "2–3 weeks out", bn: "২–৩ সপ্তাহ আগে" }, text: { en: "Tell us about the occasion, space and guests.", bn: "অনুষ্ঠান, জায়গা ও অতিথিদের কথা জানান।" } },
      { title: { en: "1 week out", bn: "১ সপ্তাহ আগে" }, text: { en: "Agree menu and any rentals.", bn: "মেনু ও ভাড়া সামগ্রী চূড়ান্ত করুন।" } },
      { title: { en: "3 days out", bn: "৩ দিন আগে" }, text: { en: "Final numbers.", bn: "চূড়ান্ত সংখ্যা।" } },
      { title: { en: "The day", bn: "অনুষ্ঠানের দিন" }, text: { en: "We cook, serve and tidy up.", bn: "আমরা রান্না, পরিবেশন ও গোছগাছ করি।" } },
    ],
    media: "mezze",
  },
];

export function getEventType(slug: string) {
  return eventTypes.find((e) => e.slug === slug);
}

export function getEventTypeById(id: EventTypeId) {
  return eventTypes.find((e) => e.id === id)!;
}
