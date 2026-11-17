import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StudioImage } from "@/components/StudioImage";
import { eventTypes } from "@/content/events";
import { l } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "events" });

  return buildPageMetadata({
    locale: loc,
    path: "/events",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "events" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: tn("events") }]} />

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("intro")}</p>
      </div>

      <div className="mt-12 space-y-10">
        {eventTypes.map((ev) => (
          <article
            key={ev.id}
            className="grid gap-8 overflow-hidden rounded-2xl border border-border bg-cream lg:grid-cols-12"
          >
            <div className="relative aspect-[3/2] bg-sand lg:col-span-5 lg:aspect-auto">
              <StudioImage
                mediaKey={ev.media}
                label={l(ev.name, loc)}
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-olive">
                  {l(ev.kicker, loc)}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal">
                  {l(ev.name, loc)}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {l(ev.intro, loc)}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {ev.occasions.map((occ, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-border-strong bg-linen px-3 py-1 text-xs font-medium text-charcoal"
                    >
                      {l(occ, loc)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                <span className="text-sm text-muted">
                  <strong className="font-semibold text-charcoal">
                    {t("guestRange")}:
                  </strong>{" "}
                  {l(ev.guestRange, loc)}
                </span>
                <Link
                  href={`/events/${ev.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-linen hover:bg-olive-dark"
                >
                  <span>{t("explore", { event: l(ev.name, loc) })}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
