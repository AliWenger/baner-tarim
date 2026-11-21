import { cn } from "@/lib/utils";

/**
 * Geçici logo: güneş + ufka uzanan tarla sıraları.
 * Baner Tarım'ın resmî logosu geldiğinde bu bileşenin içini SVG ile
 * değiştirmeniz yeterli; tüm sitede otomatik güncellenir.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn("shrink-0", className)}>
      <circle cx="20" cy="13.5" r="6" fill="currentColor" />
      <path d="M2 25.5h36" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M20 25.5 6 38M20 25.5 14 38M20 25.5 26 38M20 25.5 34 38"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-8 w-8" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-normal tracking-[-0.02em]">Baner</span>
        {!compact && <span className="eyebrow mt-1 text-[0.56rem] tracking-[0.42em] opacity-80">Tarım</span>}
      </span>
    </span>
  );
}
