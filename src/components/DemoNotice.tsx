import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

export function DemoNotice({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-lg border border-brass/50 bg-brass-soft/35 px-4 py-3 text-sm text-charcoal",
        className,
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-olive-dark" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}
