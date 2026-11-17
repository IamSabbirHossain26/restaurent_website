import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  CakeSlice,
  ChefHat,
  Flame,
  Leaf,
  Soup,
  Sparkles,
  Utensils,
  Wine,
} from "lucide-react";
import { media } from "@/content/media";
import { l, type Media, type MediaKey } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const toneStyles: Record<Media["tone"], string> = {
  charcoal: "bg-gradient-to-br from-[#232520] via-[#1c1d1a] to-[#323027] text-brass-soft",
  olive: "bg-gradient-to-br from-[#4a563e] via-[#37412e] to-[#262d20] text-linen",
  brass: "bg-gradient-to-br from-[#8c6d3b] via-[#6e542a] to-[#3d2f18] text-linen",
  linen: "bg-gradient-to-br from-[#ede7db] via-[#e2dac9] to-[#cfc4ae] text-charcoal",
  wine: "bg-gradient-to-br from-[#6e352c] via-[#53261f] to-[#2f1511] text-linen",
};

const iconMap = {
  utensils: Utensils,
  wine: Wine,
  cake: CakeSlice,
  chef: ChefHat,
  leaf: Leaf,
  flame: Flame,
  soup: Soup,
  sparkles: Sparkles,
};

export function StudioImage({
  mediaKey,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fill = true,
  label,
}: {
  mediaKey: MediaKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  label?: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const item = media[mediaKey];
  const alt = l(item.alt, locale);
  const Icon = iconMap[item.icon];

  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : 1200}
        height={fill ? undefined : 800}
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-6 text-center select-none",
        toneStyles[item.tone],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle at 80% 80%, rgba(184,147,82,0.28), transparent 50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-current/15"
      />
      <div className="relative z-10 flex flex-col items-center gap-2.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current/25 bg-black/10">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {label ? (
          <span className="font-display text-sm font-medium tracking-wide">
            {label}
          </span>
        ) : null}
        <span className="text-[11px] uppercase tracking-[0.16em] opacity-75">
          {t("photoPlaceholder")}
        </span>
      </div>
    </div>
  );
}
