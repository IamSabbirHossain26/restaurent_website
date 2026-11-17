"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { l, type FaqItem } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const cats = ["all", "booking", "menu", "pricing", "day"] as const;
type Cat = (typeof cats)[number];

export function FaqClient({ items }: { items: FaqItem[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("faq");

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Cat>("all");
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (cat !== "all" && item.category !== cat) return false;
      if (!q) return true;
      return (
        l(item.q, locale).toLowerCase().includes(q) ||
        l(item.a, locale).toLowerCase().includes(q)
      );
    });
  }, [items, cat, query, locale]);

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={active}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer",
                  active
                    ? "bg-charcoal text-linen"
                    : "border border-border-strong bg-cream text-charcoal hover:bg-sand",
                )}
              >
                {t(`categories.${c}`)}
              </button>
            );
          })}
        </div>

        <label className="relative block w-full sm:w-72">
          <span className="sr-only">{t("search")}</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full border border-border-strong bg-cream py-2 pr-4 pl-9 text-sm text-charcoal"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-xl border border-border bg-cream p-8 text-center text-sm text-muted">
          {t("empty")}
        </p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-cream">
          {filtered.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div key={item.id} className="px-6 py-5">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 text-left font-display text-lg font-semibold text-charcoal cursor-pointer"
                  >
                    <span>{l(item.q, locale)}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-olive transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen ? (
                  <div id={panelId} className="mt-3 pr-8 text-sm leading-relaxed text-muted">
                    {l(item.a, locale)}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
