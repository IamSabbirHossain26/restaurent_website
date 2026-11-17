import { ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PackageCard } from "@/components/PackageCard";
import { StudioImage } from "@/components/StudioImage";
import { eventTypes, getEventType } from "@/content/events";
import { packages } from "@/content/packages";
import { l } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    eventTypes.map((e) => ({ locale, slug: e.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const ev = getEventType(slug);
  if (!ev) return {};

  return buildPageMetadata({
    locale: loc,
    path: `/events/${slug}`,
    title: l(ev.name, loc),
    description: l(ev.intro, loc),
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const ev = getEventType(slug);
  if (!ev) notFound();

  setRequestLocale(loc);
  const t = await getTranslations({ locale: loc, namespace: "events" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  const recommended = packages.filter((p) => p.eventTypes.includes(ev.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs
        items={[
          { label: tn("events"), href: "/events" },
          { label: l(ev.name, loc) },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
            {l(ev.kicker, loc)}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            {l(ev.name, loc)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/90">
            {l(ev.intro, loc)}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {l(ev.body, loc)}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={`/quote?event=${ev.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-linen hover:bg-olive-dark"
            >
              <span>{t("cta", { event: l(ev.name, loc) })}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="text-sm text-muted">
              {t("guestRange")}:{" "}
              <strong className="text-charcoal">{l(ev.guestRange, loc)}</strong>
            </span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-sand">
            <StudioImage
              mediaKey={ev.media}
              label={l(ev.name, loc)}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Occasions & Timeline */}
      <div className="mt-16 grid gap-10 border-t border-border pt-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            {t("occasions")}
          </h2>
          <ul className="mt-5 space-y-3">
            {ev.occasions.map((occ, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-charcoal">
                <Check className="h-4 w-4 text-olive" aria-hidden="true" />
                <span>{l(occ, loc)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            {t("timeline")}
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {ev.timeline.map((step, i) => (
              <li
                key={i}
                className="rounded-xl border border-border bg-cream p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive">
                  {l(step.title, loc)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/90">
                  {l(step.text, loc)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Recommended Packages */}
      <section className="mt-16 border-t border-border pt-14">
        <h2 className="font-display text-3xl font-semibold text-charcoal">
          {t("recommended")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommended.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </section>
    </div>
  );
}
