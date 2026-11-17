"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: {
          new (
            options: {
              pageLanguage: string;
              autoDisplay?: boolean;
            },
            elementId: string,
          ): void;
        };
      };
    };
  }
}

export function AutoTranslate({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;

    const init = () => {
      const container = document.getElementById("google_translate_element");
      if (!container || container.childElementCount > 0) return;
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (TranslateElement) {
        new TranslateElement(
          {
            pageLanguage: locale,
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
    };

    if (window.google?.translate?.TranslateElement) {
      init();
      return;
    }

    window.googleTranslateElementInit = init;

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);
    }
  }, [open, locale]);

  return (
    <div className={cn("relative", className)} translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("autoTranslate")}
        title={t("autoTranslate")}
        className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-cream px-2.5 py-1.5 text-xs font-medium text-charcoal transition hover:bg-sand cursor-pointer"
      >
        <Languages className="h-3.5 w-3.5 text-olive" aria-hidden="true" />
        <span className="hidden sm:inline">{t("autoTranslate")}</span>
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-border-strong bg-cream p-3.5 shadow-lg">
          <p className="text-xs leading-relaxed text-muted">
            {t("autoTranslateHint")}
          </p>
          <div id="google_translate_element" className="mt-2.5 min-h-[38px]" />
          {failed ? (
            <p className="mt-2 text-xs text-wine">
              {t("autoTranslateUnavailable")}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
