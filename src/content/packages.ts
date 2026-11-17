import type { CateringPackage } from "./types";

/**
 * DEMO PACKAGES — all names, prices and inclusions are sample content.
 * Prices are per guest in BDT and exclude service charge / VAT.
 */
export const packages: CateringPackage[] = [
  {
    slug: "heritage-bengali-feast",
    name: { en: "Heritage Bengali Feast", bn: "হেরিটেজ বাঙালি ভোজ" },
    tagline: { en: "Kacchi, rezala & borhani — done the old way", bn: "কাচ্চি, রেজালা আর বোরহানি — পুরোনো ঘরানায়" },
    summary: {
      en: "A generous dum-cooked feast for walimas, holuds and family milestones.",
      bn: "ওয়ালিমা, গায়ে হলুদ আর পারিবারিক উৎসবের জন্য দমে রান্না জমকালো ভোজ।",
    },
    description: {
      en: "Our most-requested celebration menu: slow dum-cooked kacchi biryani, rich rezala and roast chicken, finished with firni and chilled borhani. Served buffet-style or at the table by a uniformed team, with copper-and-brass service ware.",
      bn: "সবচেয়ে বেশি চাওয়া উৎসবের মেনু: ধীরে দমে রান্না কাচ্চি বিরিয়ানি, ঘন রেজালা ও রোস্ট, শেষে ফিরনি আর ঠান্ডা বোরহানি। বুফে বা টেবিল সার্ভিস — ইউনিফর্ম পরা দল ও তামা-পিতলের সার্ভিং সামগ্রীসহ।",
    },
    eventTypes: ["wedding", "private"],
    pricePerGuest: 1850,
    minGuests: 100,
    serviceStyles: ["buffet", "family"],
    includes: [
      { en: "Uniformed service team (1 server per 25 guests)", bn: "ইউনিফর্ম পরা সার্ভিস দল (প্রতি ২৫ অতিথিতে ১ জন)" },
      { en: "Copper & brass buffet service ware", bn: "তামা ও পিতলের বুফে সার্ভিং সামগ্রী" },
      { en: "Menu tasting for 4 (bookings above 300 guests)", bn: "৪ জনের মেনু টেস্টিং (৩০০+ অতিথির বুকিংয়ে)" },
      { en: "Setup, replenishment and clear-down", bn: "সাজসজ্জা, রিফিল ও শেষে পরিষ্কার" },
    ],
    menu: [
      {
        title: { en: "Welcome", bn: "স্বাগত" },
        dishes: [
          { name: { en: "Chilled borhani", bn: "ঠান্ডা বোরহানি" }, tags: ["vegetarian", "gluten-free", "nut-free"] },
          { name: { en: "Shami kebab", bn: "শামি কাবাব" }, tags: ["nut-free"] },
        ],
      },
      {
        title: { en: "The Feast", bn: "মূল ভোজ" },
        dishes: [
          { name: { en: "Mutton kacchi biryani", bn: "খাসির কাচ্চি বিরিয়ানি" }, note: { en: "Dum-cooked, aged basmati", bn: "দমে রান্না, পুরোনো বাসমতি" }, tags: ["gluten-free"] },
          { name: { en: "Beef rezala", bn: "গরুর রেজালা" }, tags: ["gluten-free"] },
          { name: { en: "Shahi chicken roast", bn: "শাহী মুরগির রোস্ট" }, tags: ["gluten-free"] },
          { name: { en: "Paneer & pea korma", bn: "পনির-মটর কোরমা" }, tags: ["vegetarian", "gluten-free"] },
          { name: { en: "Jali kebab & salad", bn: "জালি কাবাব ও সালাদ" } },
        ],
      },
      {
        title: { en: "Sweet finish", bn: "মিষ্টিমুখ" },
        dishes: [
          { name: { en: "Saffron firni in clay bowls", bn: "মাটির বাটিতে জাফরান ফিরনি" }, tags: ["vegetarian", "gluten-free"] },
          { name: { en: "Seasonal fruit", bn: "মৌসুমি ফল" }, tags: ["vegan", "gluten-free", "nut-free"] },
        ],
      },
    ],
    comparison: {
      courses: { en: "3", bn: "৩" },
      liveStation: false,
      staff: true,
      crockery: true,
      tasting: { en: "300+ guests", bn: "৩০০+ অতিথি" },
      setup: true,
      dessertTable: false,
    },
    media: "biryani-art",
    featured: true,
  },
  {
    slug: "grand-wedding-banquet",
    name: { en: "Grand Wedding Banquet", bn: "গ্র্যান্ড ওয়েডিং ব্যাঙ্কুয়েট" },
    tagline: { en: "Plated courses, live stations, dessert table", bn: "প্লেটেড কোর্স, লাইভ স্টেশন, ডেজার্ট টেবিল" },
    summary: {
      en: "A full reception experience blending Mughlai classics with modern plated courses.",
      bn: "মোগলাই ঐতিহ্য আর আধুনিক প্লেটেড কোর্সের মেলবন্ধনে পূর্ণাঙ্গ রিসেপশন।",
    },
    description: {
      en: "Designed for receptions where the meal is part of the show. Passed canapés on arrival, a live kebab or pasta station, a choice of plated mains or grand buffet, and a styled dessert and mishti table. Includes a dedicated event captain who works with your planner and venue.",
      bn: "যেসব রিসেপশনে খাবারই অনুষ্ঠানের অংশ, তাদের জন্য। আগমনে ক্যানাপে, লাইভ কাবাব বা পাস্তা স্টেশন, প্লেটেড মেইন বা গ্র্যান্ড বুফে, আর সাজানো ডেজার্ট ও মিষ্টির টেবিল। আপনার প্ল্যানার ও ভেন্যুর সঙ্গে সমন্বয়ের জন্য একজন ইভেন্ট ক্যাপ্টেন থাকবেন।",
    },
    eventTypes: ["wedding"],
    pricePerGuest: 3200,
    minGuests: 150,
    serviceStyles: ["plated", "stations", "buffet"],
    includes: [
      { en: "Dedicated event captain", bn: "নির্দিষ্ট ইভেন্ট ক্যাপ্টেন" },
      { en: "Live kebab or pasta station", bn: "লাইভ কাবাব বা পাস্তা স্টেশন" },
      { en: "Styled dessert & mishti table", bn: "সাজানো ডেজার্ট ও মিষ্টির টেবিল" },
      { en: "Fine crockery, glassware & linen", bn: "উন্নত ক্রোকারিজ, গ্লাস ও লিনেন" },
      { en: "Private menu tasting for 6", bn: "৬ জনের প্রাইভেট মেনু টেস্টিং" },
    ],
    menu: [
      {
        title: { en: "On arrival", bn: "আগমনে" },
        dishes: [
          { name: { en: "Tandoori prawn skewers", bn: "তন্দুরি চিংড়ি স্কিউয়ার" }, tags: ["gluten-free", "spicy"] },
          { name: { en: "Beetroot & goat-cheese tartlet", bn: "বিটরুট ও গোট-চিজ টার্টলেট" }, tags: ["vegetarian"] },
          { name: { en: "Mint lemonade & rose sherbet", bn: "মিন্ট লেমনেড ও গোলাপ শরবত" }, tags: ["vegan", "gluten-free"] },
        ],
      },
      {
        title: { en: "Live station", bn: "লাইভ স্টেশন" },
        dishes: [
          { name: { en: "Charcoal reshmi & boti kebab", bn: "কয়লায় রেশমি ও বটি কাবাব" }, tags: ["gluten-free"] },
          { name: { en: "Fresh naan & paratha", bn: "গরম নান ও পরোটা" }, tags: ["vegetarian"] },
        ],
      },
      {
        title: { en: "Mains", bn: "মূল পদ" },
        dishes: [
          { name: { en: "Lamb shank nihari", bn: "ল্যাম্ব শ্যাঙ্ক নিহারি" }, tags: ["dairy-free"] },
          { name: { en: "Chicken badami korma", bn: "চিকেন বাদামি কোরমা" }, tags: ["gluten-free"] },
          { name: { en: "Smoked hilsa (seasonal)", bn: "স্মোকড ইলিশ (মৌসুমি)" }, tags: ["gluten-free", "dairy-free"] },
          { name: { en: "Saffron pulao", bn: "জাফরান পোলাও" }, tags: ["vegetarian", "gluten-free"] },
          { name: { en: "Roasted vegetable jalfrezi", bn: "রোস্টেড সবজি জালফ্রেজি" }, tags: ["vegan", "gluten-free"] },
        ],
      },
      {
        title: { en: "Dessert table", bn: "ডেজার্ট টেবিল" },
        dishes: [
          { name: { en: "Mishti selection & rasmalai", bn: "মিষ্টির সমাহার ও রসমালাই" }, tags: ["vegetarian"] },
          { name: { en: "Pistachio kulfi", bn: "পেস্তা কুলফি" }, tags: ["vegetarian", "gluten-free"] },
          { name: { en: "Petit fours", bn: "পেটিট ফোর" }, tags: ["vegetarian"] },
        ],
      },
    ],
    comparison: {
      courses: { en: "4 + stations", bn: "৪ + স্টেশন" },
      liveStation: true,
      staff: true,
      crockery: true,
      tasting: { en: "Included", bn: "অন্তর্ভুক্ত" },
      setup: true,
      dessertTable: true,
    },
    media: "banquet",
    featured: true,
  },
  {
    slug: "executive-corporate-lunch",
    name: { en: "Executive Corporate Lunch", bn: "এক্সিকিউটিভ কর্পোরেট লাঞ্চ" },
    tagline: { en: "On time, labelled, meeting-friendly", bn: "সময়মতো, লেবেলযুক্ত, মিটিং-বান্ধব" },
    summary: {
      en: "Balanced buffets or boxed lunches for offices, trainings and conferences.",
      bn: "অফিস, ট্রেনিং ও কনফারেন্সের জন্য সুষম বুফে বা বক্সড লাঞ্চ।",
    },
    description: {
      en: "Built around the working day: fixed delivery windows, clearly labelled dietary options and compact service that doesn't disrupt your agenda. Choose a hot buffet with a lean team, or individually packed lunches for workshops and site visits.",
      bn: "কর্মদিবসের কথা মাথায় রেখে তৈরি: নির্দিষ্ট ডেলিভারি সময়, স্পষ্ট ডায়েটারি লেবেল আর এমন সার্ভিস যা আপনার এজেন্ডা ব্যাহত করে না। ছোট দলসহ গরম বুফে, অথবা ওয়ার্কশপ ও সাইট ভিজিটের জন্য আলাদা প্যাকেট লাঞ্চ।",
    },
    eventTypes: ["corporate"],
    pricePerGuest: 950,
    minGuests: 25,
    serviceStyles: ["buffet"],
    includes: [
      { en: "Agreed 30-minute delivery window", bn: "নির্ধারিত ৩০ মিনিটের ডেলিভারি সময়" },
      { en: "Dietary labels on every dish", bn: "প্রতিটি পদে ডায়েটারি লেবেল" },
      { en: "Disposable or reusable service ware", bn: "ডিসপোজেবল বা পুনঃব্যবহারযোগ্য সার্ভিংওয়্যার" },
      { en: "Monthly invoicing for repeat clients (on approval)", bn: "নিয়মিত ক্লায়েন্টের জন্য মাসিক ইনভয়েস (অনুমোদনসাপেক্ষে)" },
    ],
    menu: [
      {
        title: { en: "Fresh", bn: "তাজা" },
        dishes: [
          { name: { en: "Grilled chicken Caesar", bn: "গ্রিলড চিকেন সিজার" } },
          { name: { en: "Quinoa, chickpea & herb salad", bn: "কিনোয়া, ছোলা ও হার্ব সালাদ" }, tags: ["vegan", "gluten-free"] },
        ],
      },
      {
        title: { en: "Hot", bn: "গরম" },
        dishes: [
          { name: { en: "Lemongrass chicken & jasmine rice", bn: "লেমনগ্রাস চিকেন ও জেসমিন রাইস" }, tags: ["gluten-free", "dairy-free"] },
          { name: { en: "Bhuna khichuri with egg", bn: "ডিমসহ ভুনা খিচুড়ি" }, tags: ["vegetarian", "gluten-free"] },
          { name: { en: "Penne arrabbiata", bn: "পেনে আরাবিয়াতা" }, tags: ["vegan", "spicy"] },
        ],
      },
      {
        title: { en: "Break", bn: "বিরতি" },
        dishes: [
          { name: { en: "Brownie bites", bn: "ব্রাউনি বাইটস" }, tags: ["vegetarian"] },
          { name: { en: "Tea, coffee & infused water", bn: "চা, কফি ও ইনফিউজড পানি" }, tags: ["vegan", "gluten-free"] },
        ],
      },
    ],
    comparison: {
      courses: { en: "3", bn: "৩" },
      liveStation: false,
      staff: { en: "Lean team", bn: "ছোট দল" },
      crockery: { en: "Optional", bn: "ঐচ্ছিক" },
      tasting: false,
      setup: true,
      dessertTable: false,
    },
    media: "corporate",
    featured: true,
  },
  {
    slug: "canape-cocktail-reception",
    name: { en: "Canapé & Mocktail Reception", bn: "ক্যানাপে ও মকটেল রিসেপশন" },
    tagline: { en: "Standing receptions, launches and openings", bn: "দাঁড়িয়ে রিসেপশন, লঞ্চ ও উদ্বোধন" },
    summary: {
      en: "Twelve passed bites per guest, a grazing table and a mocktail bar.",
      bn: "অতিথিপ্রতি বারোটি ক্যানাপে, গ্রেজিং টেবিল আর মকটেল বার।",
    },
    description: {
      en: "For product launches, gallery openings and evening networking. Servers circulate seasonal canapés while a styled grazing table anchors the room. Non-alcoholic mocktail bar included; venue licensing rules apply for any other beverages.",
      bn: "প্রোডাক্ট লঞ্চ, গ্যালারি উদ্বোধন ও সান্ধ্য নেটওয়ার্কিংয়ের জন্য। সার্ভাররা মৌসুমি ক্যানাপে পরিবেশন করেন, আর সাজানো গ্রেজিং টেবিল থাকে কক্ষের কেন্দ্রে। নন-অ্যালকোহলিক মকটেল বার অন্তর্ভুক্ত।",
    },
    eventTypes: ["corporate", "private"],
    pricePerGuest: 1600,
    minGuests: 40,
    maxGuests: 400,
    serviceStyles: ["canapes", "stations"],
    includes: [
      { en: "12 canapés per guest across 6 varieties", bn: "৬ রকমের মোট ১২টি ক্যানাপে (অতিথিপ্রতি)" },
      { en: "Grazing table styling", bn: "গ্রেজিং টেবিল সাজসজ্জা" },
      { en: "Mocktail bar with attendant", bn: "অ্যাটেনডেন্টসহ মকটেল বার" },
      { en: "Cocktail napkins & glassware", bn: "ককটেল ন্যাপকিন ও গ্লাস" },
    ],
    menu: [
      {
        title: { en: "Passed", bn: "পরিবেশিত" },
        dishes: [
          { name: { en: "Smoked chicken & mango on crisp", bn: "ক্রিস্পের ওপর স্মোকড চিকেন ও আম" }, tags: ["dairy-free"] },
          { name: { en: "Mini fuchka with tamarind foam", bn: "তেঁতুল ফোমসহ মিনি ফুচকা" }, tags: ["vegan", "spicy"] },
          { name: { en: "Prawn tempura, sriracha mayo", bn: "চিংড়ি টেম্পুরা, শ্রীরাচা মেয়ো" } },
          { name: { en: "Mushroom & truffle arancini", bn: "মাশরুম ও ট্রাফল আরানচিনি" }, tags: ["vegetarian"] },
        ],
      },
      {
        title: { en: "Grazing table", bn: "গ্রেজিং টেবিল" },
        dishes: [
          { name: { en: "Hummus, labneh & baba ganoush", bn: "হামাস, লাবনেহ ও বাবা গানুশ" }, tags: ["vegetarian", "gluten-free"] },
          { name: { en: "Flatbreads, cheeses & fruit", bn: "ফ্ল্যাটব্রেড, চিজ ও ফল" }, tags: ["vegetarian"] },
        ],
      },
      {
        title: { en: "Bar", bn: "বার" },
        dishes: [
          { name: { en: "Kafir-lime & cucumber cooler", bn: "কাফির-লেবু ও শসার কুলার" }, tags: ["vegan", "gluten-free"] },
          { name: { en: "Hibiscus & ginger fizz", bn: "জবা ও আদার ফিজ" }, tags: ["vegan", "gluten-free"] },
        ],
      },
    ],
    comparison: {
      courses: { en: "Canapés", bn: "ক্যানাপে" },
      liveStation: false,
      staff: true,
      crockery: true,
      tasting: false,
      setup: true,
      dessertTable: false,
    },
    media: "mezze",
  },
  {
    slug: "signature-buffet",
    name: { en: "Signature Buffet", bn: "সিগনেচার বুফে" },
    tagline: { en: "Our flexible all-rounder", bn: "আমাদের নমনীয় অলরাউন্ডার" },
    summary: {
      en: "Pick-and-mix cuisines for birthdays, aqiqahs, AGMs and family days.",
      bn: "জন্মদিন, আকিকা, এজিএম ও ফ্যামিলি ডে-এর জন্য পছন্দমতো রান্নার মিশ্রণ।",
    },
    description: {
      en: "Choose two mains, two sides, a salad and a dessert from our sample menu library — Bengali, Continental or Pan-Asian. A dependable format for mixed-age guest lists with plenty of vegetarian choice.",
      bn: "আমাদের নমুনা মেনু লাইব্রেরি থেকে দুটি মেইন, দুটি সাইড, একটি সালাদ ও একটি ডেজার্ট বেছে নিন — বাঙালি, কন্টিনেন্টাল বা প্যান-এশিয়ান। সব বয়সী অতিথির জন্য নির্ভরযোগ্য, প্রচুর নিরামিষ বিকল্পসহ।",
    },
    eventTypes: ["private", "corporate"],
    pricePerGuest: 1450,
    minGuests: 50,
    serviceStyles: ["buffet", "family"],
    includes: [
      { en: "Choose 6 dishes from the menu library", bn: "মেনু লাইব্রেরি থেকে ৬টি পদ বেছে নিন" },
      { en: "Service team & buffet setup", bn: "সার্ভিস দল ও বুফে সেটআপ" },
      { en: "Standard crockery & cutlery", bn: "সাধারণ ক্রোকারিজ ও কাটলারি" },
    ],
    menu: [
      {
        title: { en: "Example selection", bn: "নমুনা বাছাই" },
        dishes: [
          { name: { en: "Chicken bhuna", bn: "চিকেন ভুনা" }, tags: ["gluten-free", "dairy-free"] },
          { name: { en: "Thai green vegetable curry", bn: "থাই গ্রিন সবজি কারি" }, tags: ["vegan", "gluten-free"] },
          { name: { en: "Polao & garlic naan", bn: "পোলাও ও গার্লিক নান" }, tags: ["vegetarian"] },
          { name: { en: "Mixed dal with crispy onion", bn: "মচমচে পেঁয়াজসহ মিক্সড ডাল" }, tags: ["vegan", "gluten-free"] },
          { name: { en: "Garden salad", bn: "গার্ডেন সালাদ" }, tags: ["vegan", "gluten-free", "nut-free"] },
          { name: { en: "Mishti doi", bn: "মিষ্টি দই" }, tags: ["vegetarian", "gluten-free"] },
        ],
      },
    ],
    comparison: {
      courses: { en: "6 dishes", bn: "৬টি পদ" },
      liveStation: { en: "Add-on", bn: "অ্যাড-অন" },
      staff: true,
      crockery: true,
      tasting: false,
      setup: true,
      dessertTable: { en: "Add-on", bn: "অ্যাড-অন" },
    },
    media: "station-art",
  },
  {
    slug: "intimate-chefs-table",
    name: { en: "Intimate Chef's Table", bn: "ইনটিমেট শেফস টেবিল" },
    tagline: { en: "A private chef in your home", bn: "আপনার ঘরে প্রাইভেট শেফ" },
    summary: {
      en: "A five-course tasting dinner cooked and served in your home for 8–30 guests.",
      bn: "৮–৩০ জন অতিথির জন্য আপনার বাড়িতেই রান্না ও পরিবেশিত পাঁচ কোর্সের টেস্টিং ডিনার।",
    },
    description: {
      en: "Our chef and two hosts take over your kitchen for the evening: a seasonal five-course menu built after a call about your guests, plated at the table with the story behind each dish. Ideal for anniversaries, proposals and visiting family.",
      bn: "এক সন্ধ্যার জন্য আমাদের শেফ ও দুজন হোস্ট আপনার রান্নাঘরের দায়িত্ব নেন: অতিথিদের নিয়ে আলাপের পর তৈরি মৌসুমি পাঁচ কোর্সের মেনু, টেবিলে প্লেট করে প্রতিটি পদের গল্পসহ পরিবেশন। বিবাহবার্ষিকী, প্রস্তাব বা অতিথি আপ্যায়নের জন্য আদর্শ।",
    },
    eventTypes: ["private"],
    pricePerGuest: 4500,
    minGuests: 8,
    maxGuests: 30,
    serviceStyles: ["plated", "family"],
    includes: [
      { en: "Chef + 2 hosts for the evening", bn: "সন্ধ্যাজুড়ে শেফ + ২ জন হোস্ট" },
      { en: "Pre-event menu consultation call", bn: "অনুষ্ঠানের আগে মেনু পরামর্শ কল" },
      { en: "Plating ware & table styling", bn: "প্লেটিং সামগ্রী ও টেবিল সাজসজ্জা" },
      { en: "Kitchen left clean", bn: "রান্নাঘর পরিষ্কার করে ফেরত" },
    ],
    menu: [
      {
        title: { en: "Five courses (sample)", bn: "পাঁচ কোর্স (নমুনা)" },
        dishes: [
          { name: { en: "Green mango & prawn ceviche", bn: "কাঁচা আম ও চিংড়ির সেভিচে" }, tags: ["gluten-free", "dairy-free"] },
          { name: { en: "Roasted pumpkin soup, panch phoron oil", bn: "রোস্টেড কুমড়া স্যুপ, পাঁচফোড়ন তেল" }, tags: ["vegan", "gluten-free"] },
          { name: { en: "Seared bhetki, mustard beurre blanc", bn: "সিয়ারড ভেটকি, সরিষা বার্ব্লাঁ" }, tags: ["gluten-free"] },
          { name: { en: "Slow-braised lamb, date jus", bn: "ধীরে রান্না ল্যাম্ব, খেজুর জুস" }, tags: ["gluten-free", "dairy-free"] },
          { name: { en: "Nolen gur crème brûlée", bn: "নলেন গুড়ের ক্রেম ব্রুলে" }, tags: ["vegetarian", "gluten-free"] },
        ],
      },
    ],
    comparison: {
      courses: { en: "5", bn: "৫" },
      liveStation: { en: "Chef in room", bn: "সামনে শেফ" },
      staff: true,
      crockery: true,
      tasting: false,
      setup: true,
      dessertTable: false,
    },
    media: "private-art",
  },
];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}
