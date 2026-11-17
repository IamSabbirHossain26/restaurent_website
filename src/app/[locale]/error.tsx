"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-base text-muted">{t("text")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-olive px-6 py-2.5 text-sm font-medium text-linen hover:bg-olive-dark cursor-pointer"
      >
        {t("retry")}
      </button>
    </section>
  );
}
