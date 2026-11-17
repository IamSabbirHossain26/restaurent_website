import { ArrowRight, Calculator, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DietaryBadge } from "@/components/DietaryBadge";
import { PackageCard } from "@/components/PackageCard";
import { StudioImage } from "@/components/StudioImage";
import { getPackage, packages } from "@/content/packages";
import { l, type DietaryTag } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { formatCurrency, formatNumber } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";

const allDietaryTags: DietaryTag[] = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "nut-free",
  "spicy",
];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    packages.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const pkg = getPackage(slug);
  if (!pkg) return {};

  return buildPageMetadata({
    locale: loc,
    path: `/packages/${slug}`,
    title: l(pkg.name, loc),
    description: l(pkg.summary, loc),
  });
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  setRequestLocale(loc);
  const t = await getTranslations({ locale: loc, namespace: "packageDetail" });
  const tc = await getTranslations({ locale: loc, namespace: "common" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  const guestText = pkg.maxGuests
    ? tc("guestRange", {
        min: formatNumber(pkg.minGuests, loc),
        max: formatNumber(pkg.maxGuests, loc),
      })
    : tc("guestMin", { min: formatNumber(pkg.minGuests, loc) });

  const others = packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs
        items={[
          { label: tn("packages"), href: "/packages" },
          { label: l(pkg.name, loc) },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-sand">
            <StudioImage
              mediaKey={pkg.media}
              label={l(pkg.name, loc)}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-olive">
            {l(pkg.tagline, loc)}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            {l(pkg.name, loc)}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal/90">
            {l(pkg.description, loc)}
          </p>

          {/* Sample menu */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
              {t("sampleMenu")}
            </h2>
            <p className="mt-2 text-sm text-muted">{t("swapNote")}</p>

            <div className="mt-6 space-y-6">
              {pkg.menu.map((course, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-cream p-6"
                >
                  <h3 className="font-display text-xl font-semibold text-charcoal">
                    {l(course.title, loc)}
                  </h3>
                  <ul className="mt-4 divide-y divide-border">
                    {course.dishes.map((dish, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex flex-wrap items-baseline justify-between gap-2 py-2.5 first:pt-0 last:pb-0"
                      >
                        <div>
                          <span className="font-medium text-charcoal">
                            {l(dish.name, loc)}
                          </span>
                          {dish.note ? (
                            <span className="ml-2 text-xs text-muted">
                              — {l(dish.note, loc)}
                            </span>
                          ) : null}
                        </div>
                        {dish.tags?.length ? (
                          <div className="flex flex-wrap gap-1">
                            {dish.tags.map((tag) => (
                              <DietaryBadge key={tag} tag={tag} compact />
                            ))}
                          </div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="font-medium text-charcoal">{t("legend")}:</span>
              {allDietaryTags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1">
                  <DietaryBadge tag={tag} compact />
                  <span>{tc(`dietary.${tag}`)}</span>
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-2xl border border-border bg-cream p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              {t("price")}
            </p>
            <p className="mt-1 font-display text-3xl font-semibold text-charcoal">
              {formatCurrency(pkg.pricePerGuest, loc)}{" "}
              <span className="font-sans text-sm font-normal text-muted">
                {tc("perGuest")}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted">{tc("priceNote")}</p>

            <dl className="mt-6 space-y-3 border-y border-border py-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("guests")}</dt>
                <dd className="font-medium text-charcoal">{guestText}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("idealFor")}</dt>
                <dd className="font-medium text-charcoal">
                  {pkg.eventTypes.map((e) => tc(`eventTypes.${e}`)).join(" · ")}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("styles")}</dt>
                <dd className="font-medium text-charcoal">
                  {pkg.serviceStyles.map((s) => tc(`styles.${s}`)).join(" · ")}
                </dd>
              </div>
            </dl>

            <h2 className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-olive">
              {t("includes")}
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-charcoal/90">
              {pkg.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                  <span>{l(inc, loc)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={`/quote?package=${pkg.slug}&guests=${pkg.minGuests}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-olive px-6 py-3.5 text-sm font-semibold text-linen hover:bg-olive-dark"
              >
                <span>{t("requestQuote")}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/estimator?package=${pkg.slug}&guests=${pkg.minGuests}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong bg-linen px-6 py-3 text-sm font-medium text-charcoal hover:bg-sand"
              >
                <Calculator className="h-4 w-4 text-olive" aria-hidden="true" />
                <span>{t("estimate")}</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Other packages */}
      <section className="mt-20 border-t border-border pt-14">
        <h2 className="font-display text-3xl font-semibold text-charcoal">
          {t("others")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {others.map((other) => (
            <PackageCard key={other.slug} pkg={other} />
          ))}
        </div>
      </section>
    </div>
  );
}
