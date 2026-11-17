import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("breadcrumb")} className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <li>
          <Link href="/" className="hover:text-charcoal hover:underline">
            {t("home")}
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted/70" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-charcoal hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="font-medium text-charcoal">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
