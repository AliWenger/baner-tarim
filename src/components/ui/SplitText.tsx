"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type SplitTextProps = {
  /** Tek bir metin ya da satır satır dizi. Diziyle verilen her eleman ayrı satırdır. */
  text: string | readonly string[];
  as?: Tag;
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** "view": görünür olunca, "mount": sayfa yüklenince oynar. */
  trigger?: "view" | "mount";
  /** trigger="mount" iken animasyonu dışarıdan bekletmek için (ör. açılış perdesi). */
  play?: boolean;
};

/**
 * Kelime kelime, maske arkasından yukarı kayan başlık animasyonu.
 * Ekran okuyucular için metnin tamamı ayrı ve düz olarak verilir.
 */
export function SplitText({
  text,
  id,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.06,
  trigger = "view",
  play = true,
}: SplitTextProps) {
  const Component = motion[as];
  const lines = typeof text === "string" ? [text] : text;
  const fullText = lines.join(" ");
  let wordIndex = 0;

  const animation =
    trigger === "mount"
      ? { animate: play ? "show" : "hidden" }
      : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Component id={id} className={className} initial="hidden" {...animation}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className={cn("block", lineClassName)}>
            {line.split(" ").map((word, wi) => {
              const i = wordIndex++;
              return (
                <span key={wi} className="-mr-[0.1em] -mb-[0.12em] inline-block overflow-hidden pr-[0.1em] pb-[0.12em] align-top">
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={{
                      hidden: { y: "110%", rotate: 3 },
                      show: {
                        y: "0%",
                        rotate: 0,
                        transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < line.split(" ").length - 1 && " "}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </Component>
  );
}
