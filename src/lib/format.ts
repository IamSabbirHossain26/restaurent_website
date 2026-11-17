import { intlLocale, type Locale } from "@/i18n/routing";
import { site } from "@/config/site";

/** Format an amount in the site currency, localized (e.g. ৳১,৮৫০ in bn). */
export function formatCurrency(amount: number, locale: Locale, currency: string = site.currency) {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale[locale]).format(value);
}

/** Format a YYYY-MM-DD string as a long localized date (no timezone shift). */
export function formatDate(isoDate: string, locale: Locale) {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat(intlLocale[locale], {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Format "HH:MM" as a localized time. */
export function formatTime(hhmm: string, locale: Locale) {
  const [h, m] = hhmm.split(":").map(Number);
  return new Intl.DateTimeFormat(intlLocale[locale], {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2024, 0, 1, h, m)));
}

/** Localized weekday name for 0 (Sunday) – 6 (Saturday). */
export function weekdayName(day: number, locale: Locale) {
  // 2024-01-07 was a Sunday.
  return new Intl.DateTimeFormat(intlLocale[locale], { weekday: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(2024, 0, 7 + day)),
  );
}
