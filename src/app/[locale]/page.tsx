import { ArrowRight, Calculator, Leaf, MapPin, UtensilsCrossed } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DemoNotice } from "@/components/DemoNotice";
import { PackageCard } from "@/components/PackageCard";
import { QuickQuoteBar } from "@/components/QuickQuoteBar";
import { StudioImage } from "@/components/StudioImage";
import { site } from "@/config/site";
import { eventTypes } from "@/content/events";
import { testimonials } from "@/content/misc";
import { packages } from "@/content/packages";
import { l } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildBusinessJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "home" });
  const tm = await getTranslations({ locale: loc, namespace: "meta" });

  return buildPageMetadata({
    locale: loc,
    path: "",
    title: t("metaTitle"),
    description: tm("defaultDescription"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "home" });
  const tc = await getTranslations({ locale: loc, namespace: "common" });

  const featured = packages.filter((p) => p.featured);
  const processSteps = t.raw("process") as { title: string; text: string }[];
  const jsonLd = buildBusinessJsonLd(loc);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-linen">
        <div className="absolute inset-0">
          <StudioImage
            mediaKey="banquet"
            priority
            sizes="100vw"
            className="opacity-55"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-charcoal/40"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-soft">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-linen sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-linen/85 sm:text-lg">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={site.cta.primary}
                className="inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-linen transition hover:bg-olive-dark"
              >
                <span>{t("ctaPrimary")}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-linen/35 bg-charcoal/50 px-6 py-3 text-sm font-medium text-linen backdrop-blur-xs transition hover:border-linen hover:bg-charcoal"
              >
                <span>{t("ctaSecondary")}</span>
              </Link>
            </div>
          </div>

          <div className="mt-10 max-w-4xl">
            <QuickQuoteBar />
          </div>
        </div>
      </section>

      {/* Facts Strip */}
      <section className="border-b border-border bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {(
            [
              ["formatsValue", "formats"],
              ["packagesValue", "packages"],
              ["rangeValue", "range"],
              ["contactValue", "contact"],
            ] as const
          ).map(([valKey, labelKey]) => (
            <div key={labelKey} className="px-6 py-6 text-center">
              <p className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                {t(`facts.${valKey}`)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                {t(`facts.${labelKey}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 01 — Occasions */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
            {t("eventsKicker")}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            {t("eventsTitle")}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {eventTypes.map((ev) => (
            <Link
              key={ev.id}
              href={`/events/${ev.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-cream transition hover:border-border-strong hover:shadow-md"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-sand">
                <StudioImage
                  mediaKey={ev.media}
                  label={l(ev.name, loc)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-olive">
                  {l(ev.kicker, loc)}
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-semibold text-charcoal">
                  {l(ev.name, loc)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {l(ev.intro, loc)}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-charcoal">
                  <span>{l(ev.guestRange, loc)}</span>
                  <ArrowRight className="h-4 w-4 text-olive transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 02 — Featured Packages */}
      <section className="border-y border-border bg-sand/45">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
                {t("packagesKicker")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
                {t("packagesTitle")}
              </h2>
            </div>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-sm font-semibold text-olive-dark hover:underline"
            >
              <span>{t("packagesCta")}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>

          <p className="mt-6 text-xs text-muted">{tc("priceNote")}</p>
        </div>
      </section>

      {/* 03 — Process */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("processKicker")}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          {t("processTitle")}
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-cream p-6"
            >
              <span className="font-display text-3xl font-semibold text-brass">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 — Menu Library & Estimator Split */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-cream p-8 sm:p-10">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand text-olive">
                <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-olive">
                {t("menusKicker")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal">
                {t("menusTitle")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t("menusText")}
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/menus"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal px-5 py-2.5 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-linen"
              >
                <span>{t("menusCta")}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-olive-dark p-8 text-linen sm:p-10">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-linen/15 text-brass-soft">
                <Calculator className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold text-linen">
                {t("estimatorTitle")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-linen/80">
                {t("estimatorText")}
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/estimator"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-brass-soft"
              >
                <span>{t("estimatorCta")}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dietary & Areas strip */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-olive">
              <Leaf className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-charcoal">
                {t("dietaryTitle")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("dietaryText")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-olive">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-charcoal">
                {t("areasTitle")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("areasText")}
              </p>
              <Link
                href="/service-areas"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-olive-dark hover:underline"
              >
                <span>{t("areasCta")}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Testimonials (Demo) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("testimonialsKicker")}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          {t("testimonialsTitle")}
        </h2>
        <DemoNotice text={t("testimonialsNotice")} className="mt-4 max-w-2xl" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-border bg-cream p-6"
            >
              <blockquote className="font-display text-lg leading-relaxed text-charcoal">
                {l(item.quote, loc)}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-xs">
                <p className="font-semibold text-charcoal">{l(item.author, loc)}</p>
                <p className="text-muted">{l(item.event, loc)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-charcoal text-linen">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold text-linen sm:text-4xl">
              {t("finalTitle")}
            </h2>
            <p className="mt-2 text-base text-linen/80">{t("finalText")}</p>
          </div>
          <Link
            href={site.cta.primary}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-brass-soft"
          >
            <span>{t("finalCta")}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
