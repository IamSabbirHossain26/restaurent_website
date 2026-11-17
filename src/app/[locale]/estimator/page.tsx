import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { EstimatorClient } from "./EstimatorClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "estimator" });

  return buildPageMetadata({
    locale: loc,
    path: "/estimator",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function EstimatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "estimator" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: tn("estimator") }]} />

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("intro")}</p>
      </div>

      <Suspense fallback={<div className="mt-10 h-64 rounded-2xl bg-sand/50" />}>
        <EstimatorClient />
      </Suspense>
    </div>
  );
}
