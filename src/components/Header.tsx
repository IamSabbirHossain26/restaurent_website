"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navLinks = [
  { href: "/packages", key: "packages" },
  { href: "/events", key: "events" },
  { href: "/menus", key: "menus" },
  { href: "/estimator", key: "estimator" },
  { href: "/gallery", key: "gallery" },
  { href: "/about", key: "about" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenForPath(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-linen/95 backdrop-blur-md">
      {site.isDemo ? (
        <div className="border-b border-border bg-charcoal px-4 py-1.5 text-center text-xs text-brass-soft">
          {tc("demoRibbon")}
        </div>
      ) : null}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-display text-xl font-semibold tracking-tight text-charcoal"
        >
          <span>{site.name}</span>
          <span className="hidden text-xs font-normal uppercase tracking-[0.18em] text-olive sm:inline">
            Studio
          </span>
        </Link>

        <nav aria-label={t("primary")} className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition",
                  active
                    ? "text-olive-dark underline decoration-brass decoration-2 underline-offset-8"
                    : "text-charcoal/80 hover:text-charcoal",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={site.contact.phoneHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/80 hover:text-charcoal"
          >
            <Phone className="h-3.5 w-3.5 text-olive" aria-hidden="true" />
            <span>{site.contact.phoneDisplay}</span>
          </a>
          <Link
            href={site.cta.primary}
            className="rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-linen transition hover:bg-olive-dark"
          >
            {t("quote")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpenForPath(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-cream text-charcoal cursor-pointer"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav-drawer"
          className="border-t border-border bg-cream px-4 pb-6 pt-4 lg:hidden"
        >
          <nav aria-label={t("primary")} className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base font-medium",
                    active ? "bg-sand text-charcoal" : "text-charcoal/85 hover:bg-sand/60",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <Link
              href="/service-areas"
              className="rounded-lg px-3 py-2.5 text-base font-medium text-charcoal/85 hover:bg-sand/60"
            >
              {t("serviceAreas")}
            </Link>
            <Link
              href="/faq"
              className="rounded-lg px-3 py-2.5 text-base font-medium text-charcoal/85 hover:bg-sand/60"
            >
              {t("faq")}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-3 py-2.5 text-base font-medium text-charcoal/85 hover:bg-sand/60"
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
            <Link
              href={site.cta.primary}
              className="inline-flex w-full items-center justify-center rounded-full bg-olive px-5 py-3 text-sm font-medium text-linen"
            >
              {t("quote")}
            </Link>
            <a
              href={site.contact.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-linen px-5 py-2.5 text-sm font-medium text-charcoal"
            >
              <Phone className="h-4 w-4 text-olive" aria-hidden="true" />
              <span>{site.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
