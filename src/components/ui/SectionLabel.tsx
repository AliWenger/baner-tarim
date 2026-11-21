import { cn } from "@/lib/utils";

/** Bölüm etiketi: "01 — Biz kimiz" + ince çizgi. Tüm bölümlerde ortak ritim. */
export function SectionLabel({
  index,
  children,
  className,
  tone = "dark",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-4", tone === "dark" ? "text-olive" : "text-sage", className)}>
      {index && <span>{index}</span>}
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}
