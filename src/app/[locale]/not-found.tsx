import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">
        {t("kicker")}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-base text-muted">{t("text")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-olive px-6 py-3 text-sm font-medium text-linen hover:bg-olive-dark"
        >
          {t("home")}
        </Link>
        <Link
          href="/packages"
          className="rounded-full border border-border-strong bg-cream px-6 py-3 text-sm font-medium text-charcoal hover:bg-sand"
        >
          {t("packages")}
        </Link>
      </div>
    </section>
  );
}
