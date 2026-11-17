import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DemoNotice } from "@/components/DemoNotice";
import { StudioImage } from "@/components/StudioImage";
import { site } from "@/config/site";
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
  const t = await getTranslations({ locale: loc, namespace: "about" });

  return buildPageMetadata({
    locale: loc,
    path: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "about" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  const story = t.raw("story") as string[];
  const values = t.raw("values") as { title: string; text: string }[];
  const team = t.raw("team") as { name: string; role: string }[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: tn("about") }]} />

      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
            {t("kicker")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{t("intro")}</p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal/90">
            {story.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-sand">
            <StudioImage
              mediaKey="chef-art"
              label={site.name}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-border pt-14">
        <h2 className="font-display text-3xl font-semibold text-charcoal">
          {t("valuesTitle")}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={i} className="rounded-xl border border-border bg-cream p-6">
              <span className="font-display text-2xl font-semibold text-brass">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-charcoal">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-14">
        <h2 className="font-display text-3xl font-semibold text-charcoal">
          {t("teamTitle")}
        </h2>
        <DemoNotice text={t("teamNotice")} className="mt-4 max-w-2xl" />

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {team.map((member, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-cream">
              <div className="relative aspect-[3/2] bg-sand">
                <StudioImage mediaKey="chef-art" label={member.name} />
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold text-charcoal">
                  {member.name}
                </p>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href={site.cta.primary}
            className="inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-linen hover:bg-olive-dark"
          >
            <span>{t("cta")}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
