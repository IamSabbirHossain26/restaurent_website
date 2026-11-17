import { AlertTriangle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { dishes } from "@/content/dishes";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { MenusClient } from "./MenusClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "menus" });

  return buildPageMetadata({
    locale: loc,
    path: "/menus",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function MenusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "menus" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: tn("menus") }]} />

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("intro")}</p>
      </div>

      <MenusClient items={dishes} />

      <section className="mt-14 rounded-2xl border border-border bg-sand/50 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-wine" aria-hidden="true" />
          <div>
            <h2 className="font-display text-xl font-semibold text-charcoal">
              {t("allergyTitle")}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              {t("allergyText")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
