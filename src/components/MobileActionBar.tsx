"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { site, whatsappLink } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";

export function MobileActionBar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();

  if (pathname === "/quote") return null;

  return (
    <div
      role="region"
      aria-label={t("mobileActions")}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-cream/95 px-3 py-2.5 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href={site.contact.phoneHref}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border-strong bg-linen px-3 py-2.5 text-xs font-medium text-charcoal"
        >
          <Phone className="h-3.5 w-3.5 text-olive" aria-hidden="true" />
          <span>{tc("call")}</span>
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border-strong bg-linen px-3 py-2.5 text-xs font-medium text-charcoal"
        >
          <MessageCircle className="h-3.5 w-3.5 text-olive" aria-hidden="true" />
          <span>{tc("whatsapp")}</span>
        </a>
        <Link
          href={site.cta.primary}
          className="inline-flex flex-[1.5] items-center justify-center rounded-full bg-olive px-4 py-2.5 text-xs font-semibold text-linen"
        >
          {t("quote")}
        </Link>
      </div>
    </div>
  );
}
