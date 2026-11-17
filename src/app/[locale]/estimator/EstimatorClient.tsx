"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ArrowRight, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { site } from "@/config/site";
import { serviceZones } from "@/content/misc";
import { packages } from "@/content/packages";
import { l, type ServiceStyle } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import {
  addOnIds,
  addOnPricing,
  estimate,
  type AddOnId,
} from "@/lib/estimator";
import { formatCurrency, formatNumber } from "@/lib/format";

const allStyles: ServiceStyle[] = [
  "buffet",
  "plated",
  "family",
  "stations",
  "canapes",
];

export function EstimatorClient() {
  const locale = useLocale() as Locale;
  const t = useTranslations("estimator");
  const tc = useTranslations("common");
  const searchParams = useSearchParams();

  const initialPkg =
    packages.find((p) => p.slug === searchParams.get("package")) ?? packages[0];
  const initialGuests = Math.min(
    site.booking.maxGuests,
    Math.max(1, Number(searchParams.get("guests")) || initialPkg.minGuests),
  );

  const [guests, setGuests] = useState(initialGuests);
  const [pkgSlug, setPkgSlug] = useState(initialPkg.slug);
  const [style, setStyle] = useState<ServiceStyle>(initialPkg.serviceStyles[0]);
  const [addOns, setAddOns] = useState<AddOnId[]>([]);
  const [zoneId, setZoneId] = useState(serviceZones[0].id);

  const pkg = packages.find((p) => p.slug === pkgSlug) ?? packages[0];
  const zone = serviceZones.find((z) => z.id === zoneId) ?? serviceZones[0];

  function toggleAddOn(id: AddOnId) {
    setAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const result = useMemo(
    () =>
      estimate({
        guests,
        pkg,
        style,
        addOns,
        zone,
        serviceChargePercent: site.booking.serviceChargePercent,
      }),
    [guests, pkg, style, addOns, zone],
  );

  const quoteHref = `/quote?package=${pkg.slug}&guests=${guests}&style=${style}`;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-7">
        {/* Guests */}
        <section className="rounded-2xl border border-border bg-cream p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="est-guests" className="font-display text-xl font-semibold text-charcoal">
              {t("guests")}
            </label>
            <span className="text-xs text-muted">
              {t("guestsHint", { max: formatNumber(site.booking.maxGuests, locale) })}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <input
              id="est-guests"
              type="range"
              min={8}
              max={1000}
              step={5}
              value={Math.min(1000, guests)}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="h-2 flex-1 accent-olive cursor-pointer"
            />
            <input
              type="number"
              aria-label={t("guests")}
              min={1}
              max={site.booking.maxGuests}
              value={guests}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v)) {
                  setGuests(Math.min(site.booking.maxGuests, Math.max(1, v)));
                }
              }}
              className="w-24 rounded-lg border border-border-strong bg-linen px-3 py-2 text-center font-semibold text-charcoal"
            />
          </div>
        </section>

        {/* Package */}
        <section className="rounded-2xl border border-border bg-cream p-6">
          <h2 className="font-display text-xl font-semibold text-charcoal">
            {t("package")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {packages.map((p) => {
              const active = p.slug === pkgSlug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setPkgSlug(p.slug);
                    if (!p.serviceStyles.includes(style)) {
                      setStyle(p.serviceStyles[0]);
                    }
                  }}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border p-4 text-left transition cursor-pointer",
                    active
                      ? "border-olive bg-olive/10 ring-1 ring-olive"
                      : "border-border bg-linen hover:border-border-strong",
                  )}
                >
                  <p className="font-display text-base font-semibold text-charcoal">
                    {l(p.name, locale)}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {formatCurrency(p.pricePerGuest, locale)} {tc("perGuest")} ·{" "}
                    {tc("minGuests", { count: formatNumber(p.minGuests, locale) })}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Service style */}
        <section className="rounded-2xl border border-border bg-cream p-6">
          <h2 className="font-display text-xl font-semibold text-charcoal">
            {t("style")}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {allStyles.map((s) => {
              const active = style === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer",
                    active
                      ? "bg-charcoal text-linen"
                      : "border border-border-strong bg-linen text-charcoal hover:bg-sand",
                  )}
                >
                  {tc(`styles.${s}`)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Add-ons & Service area */}
        <section className="rounded-2xl border border-border bg-cream p-6">
          <h2 className="font-display text-xl font-semibold text-charcoal">
            {t("addOns")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {addOnIds.map((id) => {
              const checked = addOns.includes(id);
              const price = addOnPricing[id];
              const labelPrice = price.flat
                ? t("flat", { amount: formatCurrency(price.flat, locale) })
                : t("perGuestPrice", {
                    amount: formatCurrency(price.perGuest ?? 0, locale),
                  });

              return (
                <label
                  key={id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition",
                    checked
                      ? "border-olive bg-olive/10"
                      : "border-border bg-linen hover:border-border-strong",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAddOn(id)}
                    className="mt-1 h-4 w-4 accent-olive"
                  />
                  <div>
                    <span className="block text-sm font-medium text-charcoal">
                      {t(`addOnItems.${id}`)}
                    </span>
                    <span className="text-xs text-muted">{labelPrice}</span>
                  </div>
                </label>
              );
            })}
          </div>

          <label className="mt-6 block">
            <span className="block font-display text-lg font-semibold text-charcoal">
              {t("zone")}
            </span>
            <select
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
            >
              {serviceZones.map((z) => (
                <option key={z.id} value={z.id}>
                  {l(z.name, locale)} — {l(z.note, locale)}
                </option>
              ))}
            </select>
          </label>
        </section>
      </div>

      {/* Results Sidebar */}
      <aside className="lg:col-span-5">
        <div className="sticky top-28 rounded-2xl bg-charcoal p-6 text-linen sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">
            {t("result")}
          </p>
          <p className="mt-2 text-xs text-linen/70">{t("range")}</p>
          <p className="mt-1 font-display text-3xl font-semibold text-linen sm:text-4xl">
            {formatCurrency(result.low, locale)} – {formatCurrency(result.high, locale)}
          </p>
          <p className="mt-1 text-sm text-brass-soft">
            {t("perGuest", { amount: formatCurrency(result.perGuest, locale) })}
          </p>

          <dl className="mt-6 space-y-2.5 border-y border-linen/15 py-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-linen/75">{t("food")}</dt>
              <dd className="font-medium">{formatCurrency(result.food, locale)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-linen/75">{t("addOnsTotal")}</dt>
              <dd className="font-medium">{formatCurrency(result.addOns, locale)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-linen/75">{t("logistics")}</dt>
              <dd className="font-medium">
                {zone.fee === null ? "—" : formatCurrency(result.logistics, locale)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-linen/75">
                {t("serviceCharge", { percent: site.booking.serviceChargePercent })}
              </dt>
              <dd className="font-medium">{formatCurrency(result.serviceCharge, locale)}</dd>
            </div>
            <div className="flex justify-between border-t border-linen/15 pt-2.5 text-base font-semibold">
              <dt>{t("total")}</dt>
              <dd>{formatCurrency(result.total, locale)}</dd>
            </div>
          </dl>

          {/* Staffing guidance */}
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-charcoal-soft px-4 py-3 text-sm">
            <Users className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
            <div>
              <p className="text-xs text-linen/70">{t("staffing")}</p>
              <p className="font-medium text-linen">
                {t("servers", { count: result.servers })} ·{" "}
                {t("chefs", { count: result.chefs })}
              </p>
            </div>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 ? (
            <ul className="mt-5 space-y-2 text-xs text-brass-soft">
              {result.warnings.map((w) => (
                <li key={w} className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    {w === "belowMin"
                      ? t("warnings.belowMin", { min: formatNumber(pkg.minGuests, locale) })
                      : w === "aboveMax"
                        ? t("warnings.aboveMax", { max: formatNumber(pkg.maxGuests ?? 0, locale) })
                        : t(`warnings.${w}`)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-5 text-xs leading-relaxed text-linen/65">
            {t("disclaimer")}
          </p>

          <Link
            href={quoteHref}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brass px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-brass-soft"
          >
            <span>{t("cta")}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
