import Link from "next/link";
import { cn } from "@/lib/utils";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** "line": altı çizgili metin bağlantısı, "solid": dolu buton, "outline": çerçeveli buton */
  variant?: "line" | "solid" | "outline";
  tone?: "dark" | "light";
  external?: boolean;
};

/**
 * Sitenin tek buton dili: keskin köşeler, ince çizgi ve kayan ok.
 * Bilerek yuvarlak "pill" butonlar kullanılmadı.
 */
export function ArrowLink({ href, children, className, variant = "line", tone = "dark", external }: ArrowLinkProps) {
  const base = "group inline-flex items-center gap-3 text-[0.95rem] font-medium transition-colors duration-500";
  const styles = {
    line: cn("pb-1 border-b", tone === "dark" ? "border-ink/30 hover:border-ink" : "border-bone/40 hover:border-bone"),
    solid: cn(
      "px-7 py-4",
      tone === "dark" ? "bg-forest text-bone hover:bg-moss" : "bg-bone text-forest hover:bg-sand",
    ),
    outline: cn(
      "px-7 py-4 border",
      tone === "dark" ? "border-ink/25 hover:bg-ink hover:text-bone" : "border-bone/40 hover:bg-bone hover:text-forest",
    ),
  }[variant];

  const content = (
    <>
      <span>{children}</span>
      <span className="relative inline-flex h-4 w-4 overflow-hidden">
        <Arrow className="absolute transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[140%]" />
        <Arrow className="absolute -translate-x-[140%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, styles, className)}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, styles, className)}>
      {content}
    </Link>
  );
}
