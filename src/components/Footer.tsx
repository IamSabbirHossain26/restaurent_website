import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { l } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatTime, weekdayName } from "@/lib/format";

export function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-charcoal text-linen pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-semibold text-linen">{site.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-linen/75">{t("blurb")}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-brass-soft">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:underline">
                Instagram
              </a>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" className="hover:underline">
                Facebook
              </a>
              <a href={site.social.youtube} target="_blank" rel="noreferrer" className="hover:underline">
                YouTube
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">
              {t("explore")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-linen/80">
              <li><Link href="/packages" className="hover:text-linen hover:underline">{tn("packages")}</Link></li>
              <li><Link href="/events" className="hover:text-linen hover:underline">{tn("events")}</Link></li>
              <li><Link href="/menus" className="hover:text-linen hover:underline">{tn("menus")}</Link></li>
              <li><Link href="/gallery" className="hover:text-linen hover:underline">{tn("gallery")}</Link></li>
              <li><Link href="/about" className="hover:text-linen hover:underline">{tn("about")}</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">
              {t("plan")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-linen/80">
              <li><Link href="/quote" className="hover:text-linen hover:underline">{tn("quote")}</Link></li>
              <li><Link href="/estimator" className="hover:text-linen hover:underline">{tn("estimator")}</Link></li>
              <li><Link href="/service-areas" className="hover:text-linen hover:underline">{tn("serviceAreas")}</Link></li>
              <li><Link href="/faq" className="hover:text-linen hover:underline">{tn("faq")}</Link></li>
              <li><Link href="/contact" className="hover:text-linen hover:underline">{tn("contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">
              {t("visit")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-linen/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                <span>
                  {l(site.address.street, locale)}, {l(site.address.city, locale)}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                <a href={site.contact.phoneHref} className="hover:underline">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className="hover:underline">
                  {site.contact.email}
                </a>
              </li>
            </ul>

            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-brass-soft">
              {t("hours")}
            </p>
            <ul className="mt-1.5 space-y-1 text-xs text-linen/70">
              {site.hours.map((slot, i) => (
                <li key={i}>
                  {weekdayName(slot.days[0], locale)} – {weekdayName(slot.days[slot.days.length - 1], locale)}:{" "}
                  {formatTime(slot.open, locale)} – {formatTime(slot.close, locale)}
                </li>
              ))}
              {site.closedDays.map((day) => (
                <li key={day}>
                  {weekdayName(day, locale)}: {t("closed")}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-linen/15 pt-6 text-xs text-linen/65 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year, name: site.name })}</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-linen hover:underline">{t("privacy")}</Link>
            <Link href="/terms" className="hover:text-linen hover:underline">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
