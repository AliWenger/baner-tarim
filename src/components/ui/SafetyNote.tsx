import { cn } from "@/lib/utils";

/** Bitki koruma ürünleri için güvenli kullanım hatırlatması. */
export function SafetyNote({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <p
      className={cn(
        "max-w-3xl border-l-2 border-clay pl-5 text-[0.9rem] leading-relaxed",
        tone === "dark" ? "text-ink/70" : "text-bone/70",
        className,
      )}
    >
      Bitki koruma ürünleri; etiketinde belirtilen bitki, hastalık / zararlı, doz ve hasat öncesi bekleme süresine uygun
      olarak, ziraat mühendisi önerisiyle kullanılmalıdır. Bu sitedeki bilgiler genel niteliktedir; uygulama öncesinde
      bize danışın.
    </p>
  );
}
