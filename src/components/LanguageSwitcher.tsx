"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  function switchTo(next: Locale) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border-strong bg-cream p-0.5 text-xs",
        className,
      )}
    >
      <Globe className="ml-1.5 mr-0.5 h-3.5 w-3.5 text-muted" aria-hidden="true" />
      {locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            lang={loc}
            className={cn(
              "rounded-full px-2.5 py-1 font-medium transition cursor-pointer",
              active
                ? "bg-charcoal text-linen"
                : "text-charcoal/80 hover:text-charcoal hover:bg-sand",
            )}
          >
            {localeLabels[loc].short}
          </button>
        );
      })}
    </div>
  );
}
