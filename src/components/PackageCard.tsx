import { ArrowRight, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { l, type CateringPackage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { formatCurrency, formatNumber } from "@/lib/format";
import { StudioImage } from "./StudioImage";

export function PackageCard({ pkg }: { pkg: CateringPackage }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");

  const guestText = pkg.maxGuests
    ? t("guestRange", {
        min: formatNumber(pkg.minGuests, locale),
        max: formatNumber(pkg.maxGuests, locale),
      })
    : t("guestMin", { min: formatNumber(pkg.minGuests, locale) });

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-cream transition hover:border-border-strong hover:shadow-md">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-sand">
        <StudioImage
          mediaKey={pkg.media}
          label={l(pkg.name, locale)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {pkg.eventTypes.map((et) => (
            <span
              key={et}
              className="rounded-full bg-charcoal/85 px-2.5 py-0.5 text-[11px] font-medium text-linen backdrop-blur-xs"
            >
              {t(`eventTypes.${et}`)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-olive">
          {l(pkg.tagline, locale)}
        </p>
        <h3 className="mt-1.5 font-display text-2xl font-semibold text-charcoal">
          {l(pkg.name, locale)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {l(pkg.summary, locale)}
        </p>

        <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
          <div>
            <span className="block text-xs text-muted">{t("from")}</span>
            <span className="font-display text-xl font-semibold text-charcoal">
              {formatCurrency(pkg.pricePerGuest, locale)}
            </span>{" "}
            <span className="text-xs text-muted">{t("perGuest")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Users className="h-3.5 w-3.5 text-olive" aria-hidden="true" />
            <span>{guestText}</span>
          </div>
        </div>

        <Link
          href={`/packages/${pkg.slug}`}
          className="mt-4 inline-flex items-center justify-between rounded-lg border border-border-strong bg-linen px-4 py-2.5 text-sm font-medium text-charcoal transition hover:border-charcoal hover:bg-charcoal hover:text-linen"
        >
          <span>{t("viewPackage")}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
