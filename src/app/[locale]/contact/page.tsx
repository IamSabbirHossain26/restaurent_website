import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site, whatsappLink } from "@/config/site";
import { l } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatTime, weekdayName } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";
import { ContactClient } from "./ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "contact" });

  return buildPageMetadata({
    locale: loc,
    path: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(loc);

  const t = await getTranslations({ locale: loc, namespace: "contact" });
  const tc = await getTranslations({ locale: loc, namespace: "common" });
  const tf = await getTranslations({ locale: loc, namespace: "footer" });
  const tn = await getTranslations({ locale: loc, namespace: "nav" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: tn("contact") }]} />

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
          {t("kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("intro")}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactClient />
        </div>

        <aside className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-border bg-cream p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              {t("details")}
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                <a href={site.contact.phoneHref} className="font-medium text-charcoal hover:underline">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-olive-dark hover:underline"
                >
                  {tc("whatsapp")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className="font-medium text-charcoal hover:underline">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                <div>
                  <p className="font-medium text-charcoal">
                    {l(site.address.street, loc)}, {l(site.address.city, loc)}
                  </p>
                  <a
                    href={site.address.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-xs font-medium text-olive-dark hover:underline"
                  >
                    {t("openMap")}
                  </a>
                </div>
              </li>
            </ul>

            <h3 className="mt-6 border-t border-border pt-5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {t("hours")}
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-charcoal/90">
              {site.hours.map((slot, i) => (
                <li key={i}>
                  {weekdayName(slot.days[0], loc)} – {weekdayName(slot.days[slot.days.length - 1], loc)}:{" "}
                  {formatTime(slot.open, loc)} – {formatTime(slot.close, loc)}
                </li>
              ))}
              {site.closedDays.map((day) => (
                <li key={day} className="text-muted">
                  {weekdayName(day, loc)}: {tf("closed")}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-sand/70 p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold text-charcoal">
              {t("quoteNudge")}
            </h2>
            <p className="mt-2 text-sm text-muted">{t("quoteNudgeText")}</p>
            <Link
              href="/quote"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-linen hover:bg-olive-dark"
            >
              <span>{tn("quote")}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
