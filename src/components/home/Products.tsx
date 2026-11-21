"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import type { ImageAsset } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { ArrowLink, Arrow } from "@/components/ui/ArrowLink";
import { pad } from "@/lib/utils";

export type IndexItem = { key: string; href: string; title: string; summary: string; image: ImageAsset };

/**
 * Büyük tipografik dizin (sera ürünleri, ürün grupları vb.). Masaüstünde
 * satırın üzerine gelindiğinde imleci takip eden bir görsel belirir.
 */
export function Products({
  items: categories,
  index = "03",
  label = "Sera ürünleri",
  heading = ["Seradan sofraya,", "ürün ürün."],
  text = "Domates, biber ve diğer sera ürünlerinin tiplerini ve sık karşılaşılan sorunlarını rehberimizde bulabilirsiniz.",
  cta = { href: "/sera-urunleri", label: "Sera ürünleri rehberi" },
}: {
  items: IndexItem[];
  index?: string;
  label?: string;
  heading?: string[];
  text?: string;
  cta?: { href: string; label: string };
}) {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 });

  const names = categories.map((c) => c.title);

  return (
    <section aria-labelledby="urunler-baslik" className="relative overflow-hidden bg-forest py-28 text-bone md:py-40">
      {/* Kayan kategori şeridi */}
      <div aria-hidden="true" className="mb-20 overflow-hidden border-y border-bone/10 py-5 md:mb-28">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light text-bone/30 italic">
          {[...names, ...names, ...names, ...names].map((n, i) => (
            <span key={i} className="flex items-center gap-10">
              {n}
              <span className="h-2 w-2 rounded-full bg-wheat/60" />
            </span>
          ))}
        </div>
      </div>

      <div className="gutter grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionLabel index={index} tone="light">
            {label}
          </SectionLabel>
          <SplitText
            id="urunler-baslik"
            text={heading}
            className="display-lg mt-8"
            lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-wheat"
          />
        </div>
        <div className="md:col-span-5 md:col-start-8 md:self-end">
          <p className="lead text-bone/75">{text}</p>
          <ArrowLink href={cta.href} tone="light" className="mt-8">
            {cta.label}
          </ArrowLink>
        </div>
      </div>

      <ul
        className="gutter relative mt-20 md:mt-28"
        onMouseMove={(e) => {
          mx.set(e.clientX);
          my.set(e.clientY);
        }}
        onMouseLeave={() => setActive(null)}
      >
        {categories.map((c, i) => (
          <li key={c.key} className="border-t border-bone/15 last:border-b">
            <Link
              href={c.href}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 md:grid-cols-12 md:gap-8 md:py-10"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(null)}
            >
              <span className="eyebrow text-sage md:col-span-1">{pad(i + 1)}</span>
              <span className="flex items-center gap-5 md:col-span-6">
                <span className="relative h-16 w-14 shrink-0 overflow-hidden md:hidden">
                  <Image src={c.image.src} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="font-display text-[clamp(1.9rem,5vw,4.6rem)] leading-none font-light tracking-[-0.03em] transition-[transform,color] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:text-wheat">
                  {c.title}
                </span>
              </span>
              <span className="hidden text-[0.95rem] text-bone/60 md:col-span-4 md:block">{c.summary}</span>
              <span className="flex justify-end md:col-span-1">
                <span className="flex h-11 w-11 items-center justify-center border border-bone/20 transition-all duration-500 group-hover:border-wheat group-hover:bg-wheat group-hover:text-forest-950">
                  <Arrow />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* İmleci takip eden önizleme görseli (yalnızca hassas işaretçili cihazlar) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden [@media(pointer:fine)]:md:block"
        style={{ x, y }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              className="relative -mt-40 -ml-32 h-80 w-64 overflow-hidden"
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={categories[active].image.src}
                alt=""
                fill
                sizes="256px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
