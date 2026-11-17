"use client";

import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { l, type ServiceZone } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { formatCurrency } from "@/lib/format";

function findZoneMatch(zones: ServiceZone[], rawQuery: string) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return null;
  for (const z of zones) {
    for (const area of z.areas) {
      if (
        area.en.toLowerCase().includes(q) ||
        area.bn.toLowerCase().includes(q)
      ) {
        return { zone: z, area };
      }
    }
  }
  return undefined;
}

export function AreasClient({ zones }: { zones: ServiceZone[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("areas");
  const [query, setQuery] = useState("");

  const match = findZoneMatch(zones, query);

  return (
    <div className="mt-8">
      <div className="max-w-md rounded-2xl border border-border bg-cream p-5">
        <label className="block">
          <span className="text-xs font-medium text-muted">{t("searchLabel")}</span>
          <div className="relative mt-1.5">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-lg border border-border-strong bg-linen py-2.5 pr-3 pl-9 text-sm text-charcoal"
            />
          </div>
        </label>

        {query.trim() ? (
          <p className="mt-3 text-sm font-medium text-charcoal">
            {match
              ? t("found", {
                  area: l(match.area, locale),
                  zone: l(match.zone.name, locale),
                })
              : t("notFound", { query: query.trim() })}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {zones.map((z) => {
          const feeLabel =
            z.fee === 0
              ? t("feeIncluded")
              : z.fee === null
                ? t("feeTbc")
                : t("feeFlat", { fee: formatCurrency(z.fee, locale) });

          return (
            <section
              key={z.id}
              className="flex flex-col rounded-2xl border border-border bg-cream p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-2xl font-semibold text-charcoal">
                  {l(z.name, locale)}
                </h2>
                <MapPin className="h-5 w-5 shrink-0 text-olive" aria-hidden="true" />
              </div>
              <p className="mt-1 text-sm font-medium text-olive-dark">{feeLabel}</p>
              <p className="mt-1 text-xs text-muted">{l(z.note, locale)}</p>

              <ul className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                {z.areas.map((area, i) => (
                  <li
                    key={i}
                    className="rounded-full border border-border bg-linen px-3 py-1 text-xs text-charcoal"
                  >
                    {l(area, locale)}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
