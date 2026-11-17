"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  validateContact,
  type ContactField,
  type ContactPayload,
  type FieldErrors,
  type ValidationErrorKey,
} from "@/lib/validation";

const topicKeys = ["general", "tasting", "partnership", "careers"] as const;

export function ContactClient() {
  const t = useTranslations("contact");
  const tv = useTranslations("validation");

  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    phone: "",
    topic: "general",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FieldErrors<ContactField>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "demo" | "sent" | "error">("idle");

  function errText(key?: ValidationErrorKey) {
    return key ? tv(key) : null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        mode?: "demo" | "live";
        errors?: FieldErrors<ContactField>;
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

  if (result === "demo" || result === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-cream p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-olive" aria-hidden="true" />
          <div>
            <h2 className="font-display text-xl font-semibold text-charcoal">
              {result === "demo" ? t("demoTitle") : t("sentTitle")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {result === "demo" ? t("demoText") : t("sentText")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-border bg-cream p-6 sm:p-8"
    >
      {result === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-wine/40 bg-wine/10 p-4 text-sm text-wine"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">{t("failTitle")}</p>
            <p>{t("failText")}</p>
          </div>
        </div>
      ) : null}

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

      <div className="grid gap-4 sm:grid-cols-2">
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

        <label className="block">
          <span className="text-sm font-medium text-charcoal">{t("phone")}</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            aria-invalid={Boolean(errors.phone)}
            className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
          />
          {errors.phone ? (
            <span className="mt-1 block text-xs text-wine">{errText(errors.phone)}</span>
          ) : null}
        </label>
      </div>
      <p className="text-xs text-muted">{t("contactHint")}</p>

      <label className="block">
        <span className="text-sm font-medium text-charcoal">{t("topic")}</span>
        <select
          value={form.topic}
          onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
        >
          {topicKeys.map((k) => (
            <option key={k} value={k}>
              {t(`topics.${k}`)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-charcoal">{t("message")}</span>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-linen px-3 py-2.5 text-sm text-charcoal"
        />
        {errors.message ? (
          <span className="mt-1 block text-xs text-wine">{errText(errors.message)}</span>
        ) : null}
      </label>

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

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-olive px-7 py-3 text-sm font-semibold text-linen hover:bg-olive-dark disabled:opacity-60 cursor-pointer"
      >
        {submitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
