import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { serviceZones } from "@/content/misc";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { AreasClient } from "./AreasClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "areas" });

  return buildPageMetadata({
    locale: loc,
    path: "/service-areas",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ServiceAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "areas" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: tn("serviceAreas") }]} />

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("intro")}</p>
      </div>

      <AreasClient zones={serviceZones} />

      <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-sand/55 p-6 sm:flex-row sm:items-center sm:p-8">
        <p className="text-sm text-charcoal">{t("outside")}</p>
        <Link
          href="/quote"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-linen hover:bg-olive-dark"
        >
          <span>{tn("quote")}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
