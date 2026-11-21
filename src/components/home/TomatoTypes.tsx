"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Crop } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { LogoMark } from "@/components/ui/Logo";
import { pad } from "@/lib/utils";

/** Domates tipleri — yatay kaydırılabilen, yapışmalı (snap) bir şerit. */
export function TomatoTypes({ crop, index = "04" }: { crop: Crop; index?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="domates-baslik" className="overflow-hidden bg-bone py-28 md:py-40">
      <div className="gutter grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <SectionLabel index={index}>Domates tipleri</SectionLabel>
          <SplitText
            id="domates-baslik"
            text={["Domatesin", `${crop.varieties.length} hâli.`]}
            className="display-lg mt-8 text-forest"
            lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-clay"
          />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="lead text-ink/70">
            Sofralıktan çeriye, salkımdan pembeye; Akdeniz seralarında yetiştirilen domates tiplerini tanıyın.
          </p>
          <div className="mt-8 flex items-center justify-between gap-6">
            <ArrowLink href={`/sera-urunleri/${crop.slug}`}>Domates rehberi</ArrowLink>
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Önceki domates tipleri"
                className="flex h-12 w-12 items-center justify-center border border-ink/20 text-forest transition-colors hover:bg-forest hover:text-bone"
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Sonraki domates tipleri"
                className="flex h-12 w-12 items-center justify-center border border-ink/20 text-forest transition-colors hover:bg-forest hover:text-bone"
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[clamp(1.25rem,4.5vw,4.5rem)] pb-6 [scrollbar-width:none] md:mt-20 md:gap-8 [&::-webkit-scrollbar]:hidden"
      >
        {crop.varieties.map((v, i) => (
          <li key={v.name} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[27vw]">
            <Link href={`/sera-urunleri/${crop.slug}#tipler`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-forest">
                {v.image ? (
                  <Image
                    src={v.image.src}
                    alt={v.image.alt}
                    fill
                    sizes="(min-width: 1024px) 27vw, (min-width: 640px) 44vw, 78vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <LogoMark className="h-12 w-12 text-wheat/60" />
                  </div>
                )}
                <span className="absolute top-4 left-5 font-display text-4xl font-light text-bone drop-shadow">{pad(i + 1)}</span>
              </div>
              <h3 className="mt-5 font-display text-[1.6rem] leading-tight text-forest">{v.name}</h3>
              <p className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink/65">{v.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
