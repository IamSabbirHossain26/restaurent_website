"use client";

import { useMemo, useState } from "react";
import { Check, Minus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { PackageCard } from "@/components/PackageCard";
import {
  l,
  type CateringPackage,
  type ComparisonKey,
  type EventTypeId,
} from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { formatCurrency, formatNumber } from "@/lib/format";

type SortKey = "recommended" | "priceAsc" | "priceDesc" | "guestsAsc";
const eventFilters: ("all" | EventTypeId)[] = ["all", "wedding", "corporate", "private"];
const comparisonRows: ComparisonKey[] = [
  "courses",
  "liveStation",
  "staff",
  "crockery",
  "tasting",
  "setup",
  "dessertTable",
];

export function PackagesClient({ items }: { items: CateringPackage[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("packages");
  const tc = useTranslations("common");

  const [eventFilter, setEventFilter] = useState<"all" | EventTypeId>("all");
  const [sortBy, setSortBy] = useState<SortKey>("recommended");

  const filtered = useMemo(() => {
    const base =
      eventFilter === "all"
        ? items
        : items.filter((p) => p.eventTypes.includes(eventFilter));

    const copy = [...base];
    if (sortBy === "priceAsc") copy.sort((a, b) => a.pricePerGuest - b.pricePerGuest);
    else if (sortBy === "priceDesc") copy.sort((a, b) => b.pricePerGuest - a.pricePerGuest);
    else if (sortBy === "guestsAsc") copy.sort((a, b) => a.minGuests - b.minGuests);
    return copy;
  }, [items, eventFilter, sortBy]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
          {eventFilters.map((f) => {
            const active = eventFilter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setEventFilter(f)}
                aria-pressed={active}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer",
                  active
                    ? "bg-charcoal text-linen"
                    : "border border-border-strong bg-cream text-charcoal hover:bg-sand",
                )}
              >
                {f === "all" ? t("all") : tc(`eventTypes.${f}`)}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">
            {t("results", { count: filtered.length })}
          </span>
          <label className="flex items-center gap-2 text-xs text-muted">
            <span>{t("sortLabel")}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="rounded-lg border border-border-strong bg-cream px-3 py-1.5 text-xs font-medium text-charcoal"
            >
              <option value="recommended">{t("sort.recommended")}</option>
              <option value="priceAsc">{t("sort.priceAsc")}</option>
              <option value="priceDesc">{t("sort.priceDesc")}</option>
              <option value="guestsAsc">{t("sort.guestsAsc")}</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-xl border border-border bg-cream p-8 text-center text-sm text-muted">
          {t("empty")}
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      )}

      <p className="mt-5 text-xs text-muted">{tc("priceNote")}</p>

      {/* Comparison Table */}
      <section className="mt-16 border-t border-border pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("compareKicker")}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal">
          {t("compareTitle")}
        </h2>

        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-cream">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <caption className="sr-only">{t("compareCaption")}</caption>
            <thead>
              <tr className="border-b border-border bg-sand/60">
                <th scope="col" className="px-4 py-3.5 font-semibold text-charcoal">
                  {t("package")}
                </th>
                {items.map((pkg) => (
                  <th
                    key={pkg.slug}
                    scope="col"
                    className="px-4 py-3.5 font-display text-sm font-semibold text-charcoal"
                  >
                    {l(pkg.name, locale)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-muted">
                  {t("compareRows.price")}
                </th>
                {items.map((pkg) => (
                  <td key={pkg.slug} className="px-4 py-3 font-semibold text-charcoal">
                    {formatCurrency(pkg.pricePerGuest, locale)}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-muted">
                  {t("compareRows.minGuests")}
                </th>
                {items.map((pkg) => (
                  <td key={pkg.slug} className="px-4 py-3 text-charcoal">
                    {formatNumber(pkg.minGuests, locale)}
                  </td>
                ))}
              </tr>
              {comparisonRows.map((rowKey) => (
                <tr key={rowKey}>
                  <th scope="row" className="px-4 py-3 font-medium text-muted">
                    {t(`compareRows.${rowKey}`)}
                  </th>
                  {items.map((pkg) => {
                    const val = pkg.comparison[rowKey];
                    return (
                      <td key={pkg.slug} className="px-4 py-3 text-charcoal">
                        {val === true ? (
                          <span className="inline-flex items-center gap-1 text-olive-dark">
                            <Check className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">{tc("included")}</span>
                          </span>
                        ) : val === false ? (
                          <span className="inline-flex items-center gap-1 text-muted/60">
                            <Minus className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">{tc("notIncluded")}</span>
                          </span>
                        ) : (
                          <span>{l(val, locale)}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
