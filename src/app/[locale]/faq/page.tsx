import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { faqs } from "@/content/misc";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { FaqClient } from "./FaqClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "faq" });

  return buildPageMetadata({
    locale: loc,
    path: "/faq",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "faq" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: tn("faq") }]} />

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("intro")}</p>
      </div>

      <FaqClient items={faqs} />

      <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-sand/55 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            {t("still")}
          </h2>
          <p className="mt-1 text-sm text-muted">{t("stillText")}</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-linen hover:bg-olive-dark"
        >
          <span>{t("contact")}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
