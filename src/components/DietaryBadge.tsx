import { useTranslations } from "next-intl";
import type { DietaryTag } from "@/content/types";
import { cn } from "@/lib/cn";

export function DietaryBadge({
  tag,
  compact = false,
}: {
  tag: DietaryTag;
  compact?: boolean;
}) {
  const t = useTranslations("common");

  return (
    <span
      title={t(`dietary.${tag}`)}
      className={cn(
        "inline-flex items-center rounded-full border border-border-strong bg-sand/70 text-charcoal",
        compact ? "px-2 py-0.5 text-[11px] font-medium" : "px-2.5 py-0.5 text-xs font-medium",
      )}
    >
      {compact ? t(`dietaryShort.${tag}`) : t(`dietary.${tag}`)}
    </span>
  );
}
