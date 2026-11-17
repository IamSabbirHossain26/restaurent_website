import type { Metadata } from "next";
import { locales, ogLocale, type Locale } from "@/i18n/routing";
import { site } from "@/config/site";

/**
 * Build locale-aware Metadata with canonical URL, hreflang alternates,
 * Open Graph and Twitter tags.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = "/images/hero-banquet.jpg",
}: {
  locale: Locale;
  /** Path without locale prefix, e.g. "" for home or "/packages". */
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const cleanPath = path === "/" ? "" : path;
  const canonical = `${site.url}/${locale}${cleanPath}`;
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${site.url}/${loc}${cleanPath}`;
  }
  languages["x-default"] = `${site.url}/en${cleanPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: canonical,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: `${site.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}${image}`],
    },
  };
}

/**
 * JSON-LD CateringService / FoodEstablishment structured data.
 * Only includes truthful demo/placeholder values from `src/config/site.ts`.
 */
export function buildBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: site.name,
    description: site.tagline[locale],
    url: `${site.url}/${locale}`,
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    servesCuisine: ["Bengali", "Mughlai", "Continental", "Pan-Asian", "Mediterranean"],
    priceRange: "BDT 950 - 4500",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street[locale],
      addressLocality: site.address.city[locale],
      addressRegion: site.address.region[locale],
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    areaServed: site.address.city[locale],
  };
}
