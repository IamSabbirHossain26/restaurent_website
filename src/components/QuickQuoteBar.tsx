"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export function QuickQuoteBar() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const router = useRouter();

  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("150");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (eventType) params.set("event", eventType);
    if (date) params.set("date", date);
    if (guests) params.set("guests", guests);
    const qs = params.toString();
    router.push(qs ? `/quote?${qs}` : "/quote");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-linen/20 bg-charcoal/85 p-4 text-linen shadow-lg backdrop-blur-md sm:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">
        {t("quick.title")}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-4 sm:items-end">
        <label className="block text-xs">
          <span className="mb-1 block text-linen/80">{t("quick.eventType")}</span>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full rounded-lg border border-linen/25 bg-charcoal-soft px-3 py-2.5 text-sm text-linen"
          >
            <option value="">{t("quick.choose")}</option>
            <option value="wedding">{tc("eventTypes.wedding")}</option>
            <option value="corporate">{tc("eventTypes.corporate")}</option>
            <option value="private">{tc("eventTypes.private")}</option>
          </select>
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-linen/80">{t("quick.date")}</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-linen/25 bg-charcoal-soft px-3 py-2.5 text-sm text-linen"
          />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-linen/80">{t("quick.guests")}</span>
          <input
            type="number"
            min={1}
            max={2000}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-lg border border-linen/25 bg-charcoal-soft px-3 py-2.5 text-sm text-linen"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-brass-soft cursor-pointer"
        >
          <span>{t("quick.submit")}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
