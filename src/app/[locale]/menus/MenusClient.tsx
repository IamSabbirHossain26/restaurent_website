"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DietaryBadge } from "@/components/DietaryBadge";
import { l, type DietaryTag, type LibraryDish } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const courses: ("all" | LibraryDish["course"])[] = [
  "all",
  "starter",
  "main",
  "side",
  "dessert",
  "drink",
];

const cuisines: ("all" | LibraryDish["cuisine"])[] = [
  "all",
  "bengali",
  "mughlai",
  "continental",
  "asian",
  "mediterranean",
];

const dietaryOptions: DietaryTag[] = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "nut-free",
  "spicy",
];

export function MenusClient({ items }: { items: LibraryDish[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("menus");
  const tc = useTranslations("common");

  const [query, setQuery] = useState("");
  const [course, setCourse] = useState<"all" | LibraryDish["course"]>("all");
  const [cuisine, setCuisine] = useState<"all" | LibraryDish["cuisine"]>("all");
  const [dietary, setDietary] = useState<DietaryTag[]>([]);

  function toggleDietary(tag: DietaryTag) {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag],
    );
  }

  function clearAll() {
    setQuery("");
    setCourse("all");
    setCuisine("all");
    setDietary([]);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((dish) => {
      if (course !== "all" && dish.course !== course) return false;
      if (cuisine !== "all" && dish.cuisine !== cuisine) return false;
      if (dietary.length > 0 && !dietary.every((d) => dish.tags?.includes(d))) {
        return false;
      }
      if (q) {
        const match =
          dish.name.en.toLowerCase().includes(q) ||
          dish.name.bn.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [items, query, course, cuisine, dietary]);

  return (
    <div className="mt-8">
      <div className="rounded-2xl border border-border bg-cream p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-12">
          <label className="block md:col-span-5">
            <span className="text-xs font-medium text-muted">{t("search")}</span>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-lg border border-border-strong bg-linen py-2.5 pr-3 pl-9 text-sm text-charcoal"
              />
            </div>
          </label>

          <label className="block md:col-span-3">
            <span className="text-xs font-medium text-muted">{t("cuisineLabel")}</span>
            <select
              value={cuisine}
              onChange={(e) =>
                setCuisine(e.target.value as "all" | LibraryDish["cuisine"])
              }
              className="mt-1 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {t(`cuisines.${c}`)}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-4">
            <span className="text-xs font-medium text-muted">{t("courseLabel")}</span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {courses.map((c) => {
                const active = course === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCourse(c)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition cursor-pointer",
                      active
                        ? "bg-charcoal text-linen"
                        : "border border-border-strong bg-linen text-charcoal hover:bg-sand",
                    )}
                  >
                    {t(`courses.${c}`)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs font-medium text-muted">{t("dietaryLabel")}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {dietaryOptions.map((tag) => {
              const active = dietary.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleDietary(tag)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition cursor-pointer",
                    active
                      ? "bg-olive text-linen"
                      : "border border-border-strong bg-linen text-charcoal hover:bg-sand",
                  )}
                >
                  {tc(`dietary.${tag}`)}
                </button>
              );
            })}

            {(query || course !== "all" || cuisine !== "all" || dietary.length > 0) && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-wine hover:underline cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t("clear")}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {t("results", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border bg-cream p-10 text-center">
          <p className="text-sm text-muted">{t("empty")}</p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 rounded-full bg-olive px-5 py-2 text-xs font-medium text-linen cursor-pointer"
          >
            {t("clear")}
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dish) => (
            <li
              key={dish.id}
              className="flex flex-col justify-between rounded-xl border border-border bg-cream p-5"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-olive">
                  {t(`cuisines.${dish.cuisine}`)} · {t(`courses.${dish.course}`)}
                </p>
                <h2 className="mt-1.5 font-display text-xl font-semibold text-charcoal">
                  {l(dish.name, locale)}
                </h2>
                {dish.note ? (
                  <p className="mt-1 text-xs text-muted">{l(dish.note, locale)}</p>
                ) : null}
              </div>

              {dish.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {dish.tags.map((tag) => (
                    <DietaryBadge key={tag} tag={tag} />
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
