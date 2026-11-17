"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StudioImage } from "@/components/StudioImage";
import { l, type GalleryItem } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const categories = ["all", "wedding", "corporate", "private", "food"] as const;
type FilterCat = (typeof categories)[number];

export function GalleryClient({ items }: { items: GalleryItem[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("gallery");
  const tc = useTranslations("common");

  const [cat, setCat] = useState<FilterCat>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (cat === "all" ? items : items.filter((g) => g.category === cat)),
    [items, cat],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
      else if (e.key === "ArrowRight")
        setActiveIndex((i) => (i === null ? null : (i + 1) % filtered.length));
      else if (e.key === "ArrowLeft")
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + filtered.length) % filtered.length,
        );
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, filtered.length]);

  const activeItem = activeIndex !== null ? filtered[activeIndex] : null;

  return (
    <>
      <div
        role="group"
        aria-label={t("filterLabel")}
        className="mt-8 flex flex-wrap gap-2"
      >
        {categories.map((c) => {
          const active = cat === c;
          const label =
            c === "all"
              ? t("all")
              : c === "food"
                ? t("food")
                : tc(`eventTypes.${c}`);
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCat(c);
                setActiveIndex(null);
              }}
              aria-pressed={active}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer",
                active
                  ? "bg-charcoal text-linen"
                  : "border border-border-strong bg-cream text-charcoal hover:bg-sand",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, idx) => {
          const caption = l(item.caption, locale);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={t("open", { caption })}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-sand text-left cursor-pointer",
                item.span === "wide" ? "sm:col-span-2 aspect-[16/9]" : "aspect-[3/2]",
              )}
            >
              <StudioImage
                mediaKey={item.media}
                label={caption}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent p-4">
                <p className="text-sm font-medium text-linen">{caption}</p>
              </div>
            </button>
          );
        })}
      </div>

      {activeItem && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("dialog")}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-xs"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-linen/15 bg-charcoal text-linen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-charcoal-soft">
              <StudioImage
                mediaKey={activeItem.media}
                label={l(activeItem.caption, locale)}
                sizes="100vw"
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-medium text-linen">
                  {l(activeItem.caption, locale)}
                </p>
                <p className="text-xs text-linen/65">
                  {t("counter", { current: activeIndex + 1, total: filtered.length })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex - 1 + filtered.length) % filtered.length)
                  }
                  aria-label={t("previous")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-linen/25 hover:bg-linen/10 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % filtered.length)}
                  aria-label={t("next")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-linen/25 hover:bg-linen/10 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label={t("close")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-linen/25 hover:bg-linen/10 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
