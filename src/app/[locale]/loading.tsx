import { useTranslations } from "next-intl";

export default function LocaleLoading() {
  const t = useTranslations();

  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-28 text-center"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-strong border-t-olive" />
      <p className="mt-4 text-sm text-muted">{t("loading")}</p>
    </div>
  );
}
