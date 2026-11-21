"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ActivityArea } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink, Arrow } from "@/components/ui/ArrowLink";
import { SplitText } from "@/components/ui/SplitText";
import { cn, pad } from "@/lib/utils";

/**
 * Faaliyet alanları — masaüstünde dikey kaydırmayla yatay ilerleyen
 * sabitlenmiş (pinned) bir galeri; mobilde dikey, editoryal bir liste.
 */
export function Activities({ items }: { items: ActivityArea[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      setDesktop(mq.matches);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section
      ref={section}
      aria-labelledby="faaliyet-baslik"
      className="relative bg-sand"
      style={desktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={cn(desktop && "sticky top-0 flex h-screen flex-col justify-center overflow-hidden")}>
        <motion.div
          ref={track}
          className={cn(
            "flex gap-8",
            desktop ? "w-max items-center pr-[8vw] pl-[4.5vw]" : "gutter flex-col gap-20 py-28",
          )}
          style={desktop ? { x } : undefined}
        >
          {/* Giriş paneli */}
          <div className={cn("shrink-0", desktop ? "w-[34vw] pr-[4vw]" : "")}>
            <SectionLabel index="02">Faaliyet alanları</SectionLabel>
            <SplitText
              id="faaliyet-baslik"
              text={["Seranın", "her mevsimi."]}
              className="display-lg mt-8 text-forest"
              lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-olive"
            />
            <p className="lead mt-8 max-w-md text-ink/75">
              Bitki koruma ürünlerinden sahadaki teknik desteğe; sera üreticisinin yanında olduğumuz alanlar.
            </p>
            <ArrowLink href="/faaliyet-alanlari" className="mt-10">
              Tüm faaliyet alanları
            </ArrowLink>
          </div>

          {items.map((item, i) => (
            <Link
              key={item.slug}
              href={`/faaliyet-alanlari/${item.slug}`}
              className={cn(
                "group relative block shrink-0",
                desktop ? cn("w-[30vw] min-w-[340px]", i % 2 === 0 ? "-translate-y-[6vh]" : "translate-y-[8vh]") : "",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden bg-forest-900",
                  desktop ? (i % 2 === 0 ? "h-[56vh]" : "h-[46vh]") : "aspect-[4/5]",
                )}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                <span className="eyebrow absolute top-5 left-5 text-bone/90">{item.kicker}</span>
                <span className="absolute right-5 bottom-4 font-display text-[5.5rem] leading-none font-light text-bone/90">
                  {pad(i + 1)}
                </span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="display-sm text-forest">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink/70">{item.summary}</p>
                </div>
                <span className="mt-2 flex h-11 w-11 shrink-0 items-center justify-center border border-ink/20 text-forest transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-bone">
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        {desktop && (
          <div className="gutter absolute inset-x-0 bottom-10">
            <div className="h-px w-full bg-ink/15">
              <motion.div className="h-px origin-left bg-forest" style={{ scaleX: bar }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
