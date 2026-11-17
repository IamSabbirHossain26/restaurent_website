"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { site, whatsappLink } from "@/config/site";
import { serviceZones } from "@/content/misc";
import { packages } from "@/content/packages";
import { l, type EventTypeId, type ServiceStyle } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import {
  dietaryKeys,
  isoDatePlusDays,
  QUOTE_STEPS,
  validateQuote,
  type DietaryKey,
  type FieldErrors,
  type QuoteField,
  type QuotePayload,
  type ValidationErrorKey,
} from "@/lib/validation";

const eventOptions: EventTypeId[] = ["wedding", "corporate", "private"];
const styleOptions: ServiceStyle[] = ["buffet", "plated", "family", "stations", "canapes"];

export function QuoteClient() {
  const locale = useLocale() as Locale;
  const t = useTranslations("quote");
  const tc = useTranslations("common");
  const tv = useTranslations("validation");
  const searchParams = useSearchParams();

  const preEvent = searchParams.get("event") as EventTypeId | null;
  const preDate = searchParams.get("date") ?? "";
  const preGuests = Number(searchParams.get("guests")) || 150;
  const prePkg = searchParams.get("package") ?? "";
  const preStyle = searchParams.get("style") ?? "";

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "demo" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors<QuoteField>>({});

  const [form, setForm] = useState<QuotePayload>({
    eventType: preEvent && eventOptions.includes(preEvent) ? preEvent : "",
    date: preDate,
    venue: "",
    area: "",
    guests: Math.min(site.booking.maxGuests, Math.max(1, preGuests)),
    packageSlug: packages.some((p) => p.slug === prePkg) ? prePkg : "",
    serviceStyle: preStyle,
    dietary: {
      vegetarian: 0,
      vegan: 0,
      glutenFree: 0,
      halal: 0,
      nutAllergy: 0,
      kids: 0,
    },
    dietaryNotes: "",
    budget: "",
    name: "",
    phone: "",
    email: "",
    contactMethod: "whatsapp",
    consent: false,
  });

  const minDate = isoDatePlusDays(new Date(), site.booking.minLeadDays);

  function errText(key?: ValidationErrorKey) {
    if (!key) return null;
    if (key === "dateTooSoon") return tv("dateTooSoon", { days: site.booking.minLeadDays });
    if (key === "guestsRange") return tv("guestsRange", { max: site.booking.maxGuests });
    return tv(key);
  }

  function stepErrors(stepIndex: number): FieldErrors<QuoteField> {
    const all = validateQuote(form, {
      minLeadDays: site.booking.minLeadDays,
      maxGuests: site.booking.maxGuests,
    });
    const allowed = new Set(QUOTE_STEPS[stepIndex]);
    const subset: FieldErrors<QuoteField> = {};
    for (const [k, v] of Object.entries(all)) {
      if (allowed.has(k as QuoteField) && v) {
        subset[k as QuoteField] = v;
      }
    }
    return subset;
  }

  function handleNext() {
    const errs = stepErrors(step);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep((s) => Math.min(2, s + 1));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const all = validateQuote(form, {
      minLeadDays: site.booking.minLeadDays,
      maxGuests: site.booking.maxGuests,
    });
    setErrors(all);
    if (Object.keys(all).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        mode?: "demo" | "live";
        errors?: FieldErrors<QuoteField>;
      };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        else setResult("error");
        return;
      }
      setResult(data.mode === "demo" ? "demo" : "sent");
    } catch {
      setResult("error");
    } finally {
      setSubmitting(false);
    }
  }

  function setDietary(key: DietaryKey, val: number) {
    setForm((prev) => ({
      ...prev,
      dietary: { ...prev.dietary, [key]: Math.max(0, val) },
    }));
  }

  const steps = t.raw("steps") as string[];
  const sideItems = t.raw("side") as string[];
  const areaChoices = serviceZones.flatMap((z) => z.areas.map((a) => l(a, locale)));

  const whatsappSummary = [
    t("whatsappIntro"),
    `${t("eventType")}: ${form.eventType ? tc(`eventTypes.${form.eventType}`) : "-"}`,
    `${t("date")}: ${form.date}`,
    `${t("venue")}: ${form.venue}${form.area ? `, ${form.area}` : ""}`,
    `${t("guests")}: ${form.guests}`,
    form.packageSlug ? `${t("package")}: ${form.packageSlug}` : null,
    form.dietaryNotes ? `${t("dietaryNotes")}: ${form.dietaryNotes}` : null,
    `${t("name")}: ${form.name} (${form.phone})`,
  ]
    .filter(Boolean)
    .join("\n");

  if (result === "demo" || result === "sent") {
    return (
      <div className="mt-10 rounded-2xl border border-border bg-cream p-8 sm:p-10">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-olive" aria-hidden="true" />
          <div>
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              {result === "demo" ? t("demoTitle") : t("sentTitle")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {result === "demo" ? t("demoText") : t("sentText")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappLink(whatsappSummary)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-linen hover:bg-olive-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{t("sendWhatsapp")}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setResult("idle");
              setStep(0);
            }}
            className="rounded-full border border-border-strong bg-linen px-6 py-3 text-sm font-medium text-charcoal hover:bg-sand cursor-pointer"
          >
            {t("startOver")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        {/* Stepper */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <ol className="flex flex-wrap items-center gap-2 sm:gap-4">
            {steps.map((label, idx) => {
              const current = idx === step;
              const done = idx < step;
              return (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                      current
                        ? "bg-olive text-linen"
                        : done
                          ? "bg-charcoal text-linen"
                          : "border border-border-strong bg-cream text-muted",
                    )}
                  >
                    {idx + 1}
                  </span>
                  <span className={current ? "font-semibold text-charcoal" : "text-muted"}>
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
          <span className="text-xs text-muted">
            {t("stepOf", { current: step + 1, total: steps.length })}
          </span>
        </div>

        {result === "error" ? (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-wine/40 bg-wine/10 p-4 text-sm text-wine"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">{t("failTitle")}</p>
              <p className="mt-1">{t("failText")}</p>
            </div>
          </div>
        ) : null}

        {Object.keys(errors).length > 0 ? (
          <div
            role="alert"
            className="mb-6 flex items-center gap-2 rounded-xl border border-wine/40 bg-wine/10 px-4 py-3 text-sm text-wine"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t("errorSummary", { count: Object.keys(errors).length })}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-cream p-6 sm:p-8">
          {/* Step 1 */}
          {step === 0 ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-charcoal">{t("eventType")}</p>
                <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
                  {eventOptions.map((ev) => {
                    const active = form.eventType === ev;
                    return (
                      <button
                        key={ev}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, eventType: ev }))}
                        aria-pressed={active}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-sm font-medium transition cursor-pointer",
                          active
                            ? "border-olive bg-olive text-linen"
                            : "border-border-strong bg-linen text-charcoal hover:bg-sand",
                        )}
                      >
                        {tc(`eventTypes.${ev}`)}
                      </button>
                    );
                  })}
                </div>
                {errors.eventType ? (
                  <p className="mt-1.5 text-xs text-wine">{errText(errors.eventType)}</p>
                ) : null}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-charcoal">{t("date")}</span>
                  <input
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    aria-invalid={Boolean(errors.date)}
                    className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                  />
                  <span className="mt-1 block text-xs text-muted">
                    {t("dateHint", { days: site.booking.minLeadDays })}
                  </span>
                  {errors.date ? (
                    <span className="mt-1 block text-xs text-wine">{errText(errors.date)}</span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-charcoal">{t("guests")}</span>
                  <input
                    type="number"
                    min={1}
                    max={site.booking.maxGuests}
                    value={form.guests}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, guests: Number(e.target.value) || 0 }))
                    }
                    aria-invalid={Boolean(errors.guests)}
                    className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                  />
                  {errors.guests ? (
                    <span className="mt-1 block text-xs text-wine">{errText(errors.guests)}</span>
                  ) : null}
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-charcoal">{t("venue")}</span>
                  <input
                    type="text"
                    value={form.venue}
                    onChange={(e) => setForm((p) => ({ ...p, venue: e.target.value }))}
                    placeholder={t("venuePlaceholder")}
                    aria-invalid={Boolean(errors.venue)}
                    className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                  />
                  {errors.venue ? (
                    <span className="mt-1 block text-xs text-wine">{errText(errors.venue)}</span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-charcoal">{t("area")}</span>
                  <select
                    value={form.area}
                    onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))}
                    className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                  >
                    <option value="">{t("areaPlaceholder")}</option>
                    {areaChoices.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                    <option value="other">{t("areaOther")}</option>
                  </select>
                </label>
              </div>
            </div>
          ) : null}

          {/* Step 2 */}
          {step === 1 ? (
            <div className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-charcoal">{t("package")}</span>
                  <select
                    value={form.packageSlug}
                    onChange={(e) => setForm((p) => ({ ...p, packageSlug: e.target.value }))}
                    className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                  >
                    <option value="">{t("packageNone")}</option>
                    {packages.map((pkg) => (
                      <option key={pkg.slug} value={pkg.slug}>
                        {l(pkg.name, locale)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-charcoal">{t("serviceStyle")}</span>
                  <select
                    value={form.serviceStyle}
                    onChange={(e) => setForm((p) => ({ ...p, serviceStyle: e.target.value }))}
                    className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                  >
                    <option value="">{t("styleNone")}</option>
                    {styleOptions.map((s) => (
                      <option key={s} value={s}>
                        {tc(`styles.${s}`)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-charcoal">{t("dietaryLegend")}</legend>
                <p className="mt-1 text-xs text-muted">{t("dietaryHint")}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {dietaryKeys.map((dk) => (
                    <label
                      key={dk}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border bg-linen px-3 py-2 text-xs"
                    >
                      <span className="font-medium text-charcoal">
                        {t(`dietaryItems.${dk}`)}
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={form.guests}
                        value={form.dietary[dk]}
                        onChange={(e) => setDietary(dk, Number(e.target.value) || 0)}
                        className="w-16 rounded border border-border-strong bg-cream px-2 py-1 text-center text-sm text-charcoal"
                      />
                    </label>
                  ))}
                </div>
                {errors.dietary ? (
                  <p className="mt-2 text-xs text-wine">{errText(errors.dietary)}</p>
                ) : null}
              </fieldset>

              <label className="block">
                <span className="text-sm font-medium text-charcoal">{t("dietaryNotes")}</span>
                <textarea
                  rows={3}
                  value={form.dietaryNotes}
                  onChange={(e) => setForm((p) => ({ ...p, dietaryNotes: e.target.value }))}
                  placeholder={t("dietaryNotesPlaceholder")}
                  className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                />
                {errors.dietaryNotes ? (
                  <span className="mt-1 block text-xs text-wine">{errText(errors.dietaryNotes)}</span>
                ) : null}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-charcoal">{t("budget")}</span>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                  placeholder={t("budgetPlaceholder")}
                  className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                />
              </label>
            </div>
          ) : null}

          {/* Step 3 */}
          {step === 2 ? (
            <div className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-charcoal">{t("name")}</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    aria-invalid={Boolean(errors.name)}
                    className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                  />
                  {errors.name ? (
                    <span className="mt-1 block text-xs text-wine">{errText(errors.name)}</span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-charcoal">{t("phone")}</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder={t("phonePlaceholder")}
                    aria-invalid={Boolean(errors.phone)}
                    className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                  />
                  {errors.phone ? (
                    <span className="mt-1 block text-xs text-wine">{errText(errors.phone)}</span>
                  ) : null}
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-charcoal">{t("email")}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  aria-invalid={Boolean(errors.email)}
                  className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
                />
                {errors.email ? (
                  <span className="mt-1 block text-xs text-wine">{errText(errors.email)}</span>
                ) : null}
              </label>

              <div>
                <p className="text-sm font-medium text-charcoal">{t("contactMethod")}</p>
                <div className="mt-2 flex flex-wrap gap-2.5">
                  {(["whatsapp", "phone", "email"] as const).map((m) => {
                    const active = form.contactMethod === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, contactMethod: m }))}
                        aria-pressed={active}
                        className={cn(
                          "rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer",
                          active
                            ? "bg-charcoal text-linen"
                            : "border border-border-strong bg-linen text-charcoal hover:bg-sand",
                        )}
                      >
                        {t(`methods.${m}`)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-charcoal">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
                  className="mt-1 h-4 w-4 accent-olive"
                />
                <span>{t("consent")}</span>
              </label>
              {errors.consent ? (
                <p className="text-xs text-wine">{errText(errors.consent)}</p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setStep((s) => Math.max(0, s - 1));
                }}
                className="rounded-full border border-border-strong bg-linen px-5 py-2.5 text-sm font-medium text-charcoal hover:bg-sand cursor-pointer"
              >
                {t("back")}
              </button>
            ) : (
              <span />
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full bg-olive px-6 py-2.5 text-sm font-semibold text-linen hover:bg-olive-dark cursor-pointer"
              >
                {t("next")}
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-olive px-7 py-3 text-sm font-semibold text-linen hover:bg-olive-dark disabled:opacity-60 cursor-pointer"
              >
                {submitting ? t("submitting") : t("submit")}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Side panel */}
      <aside className="lg:col-span-4">
        <div className="rounded-2xl border border-border bg-sand/55 p-6 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            {t("sideTitle")}
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-charcoal/90">
            {sideItems.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-display font-semibold text-olive">0{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {t("sideContact")}
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:underline"
              >
                <Phone className="h-4 w-4 text-olive" aria-hidden="true" />
                <span>{site.contact.phoneDisplay}</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-olive-dark hover:underline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{tc("whatsapp")}</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
