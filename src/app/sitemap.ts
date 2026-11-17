import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { eventTypes } from "@/content/events";
import { packages } from "@/content/packages";
import { locales } from "@/i18n/routing";

const staticPaths = [
  "",
  "/about",
  "/packages",
  "/events",
  "/menus",
  "/estimator",
  "/quote",
  "/gallery",
  "/service-areas",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allPaths = [
    ...staticPaths,
    ...packages.map((p) => `/packages/${p.slug}`),
    ...eventTypes.map((e) => `/events/${e.slug}`),
  ];

  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const path of allPaths) {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
      languages[loc] = `${site.url}/${loc}${path}`;
    }

    for (const loc of locales) {
      entries.push({
        url: `${site.url}/${loc}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/packages") ? 0.9 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
