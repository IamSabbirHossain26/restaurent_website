import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DemoNotice } from "@/components/DemoNotice";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "legal.terms" });

  return buildPageMetadata({
    locale: loc,
    path: "/terms",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "legal" });
  const tt = await getTranslations({ locale: loc, namespace: "legal.terms" });
  const sections = tt.raw("sections") as { title: string; body: string }[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: tt("title") }]} />

      <h1 className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
        {tt("title")}
      </h1>
      <p className="mt-2 text-xs text-muted">
        {t("lastUpdated", { date: formatDate("2026-11-17", loc) })}
      </p>

      <DemoNotice text={t("templateNotice")} className="mt-6" />

      <div className="mt-10 space-y-8">
        {sections.map((s, i) => (
          <section key={i} className="border-b border-border pb-6 last:border-b-0">
            <h2 className="font-display text-xl font-semibold text-charcoal">
              {s.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
