import { defineRouting } from "next-intl/routing";

/**
 * Supported locales. To add a language:
 * 1. Add its code here and a label in `localeLabels`.
 * 2. Create `messages/<code>.json` (copy `en.json` and translate).
 * 3. Add the new key to every `Localized` value in `src/content/*` —
 *    TypeScript will flag every missing translation.
 */
export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, { native: string; short: string }> = {
  en: { native: "English", short: "EN" },
  bn: { native: "বাংলা", short: "বাং" },
};

/** BCP-47 tags used for Intl number/date/currency formatting. */
export const intlLocale: Record<Locale, string> = {
  en: "en-BD",
  bn: "bn-BD",
};

/** Open Graph locale tags. */
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  bn: "bn_BD",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});
