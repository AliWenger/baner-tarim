"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Chapter } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

function ChapterBlock({ chapter, index, onActive }: { chapter: Chapter; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[70vh] flex-col justify-center py-16 lg:min-h-screen lg:py-0">
      {/* Mobilde görsel metnin üstünde */}
      <div className="relative mb-10 aspect-[4/3] overflow-hidden lg:hidden">
        <Image src={chapter.image.src} alt={chapter.image.alt} fill sizes="92vw" className="object-cover" />
      </div>
      <p className="eyebrow text-clay">{chapter.kicker}</p>
      <SplitText as="h3" text={chapter.title} className="display-md mt-6 max-w-[16ch] text-forest" stagger={0.04} />
      <motion.p
        className="lead mt-8 max-w-md text-ink/75"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {chapter.text}
      </motion.p>
    </div>
  );
}

/**
 * Tarım, doğa ve yaklaşımımız — "scrollytelling": masaüstünde sol tarafta
 * sabit duran görsel, sağdaki metin bölümleri ilerledikçe değişir.
 */
export function Nature({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="doga-baslik" className="relative bg-bone">
      <div className="gutter pt-28 md:pt-44">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel index="06">Bitki sağlığı</SectionLabel>
            <SplitText
              id="doga-baslik"
              text={["Sağlıklı bitki,", "güvenli hasat."]}
              className="display-lg mt-8 text-forest"
              lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-olive"
            />
          </div>
          <p className="lead text-ink/70 md:col-span-4 md:col-start-9 md:self-end">
            Fideden hasada, seradaki bitki sağlığına nasıl yaklaştığımızı dört başlıkta anlatıyoruz.
          </p>
        </div>
      </div>

      <div className="gutter lg:grid lg:grid-cols-12 lg:gap-16">
        {/* Sabit görsel (masaüstü) */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative h-[78vh] w-full overflow-hidden bg-forest-900">
              {/* Katmanlar üst üste: ilerledikçe sıradaki görsel alttan açılır */}
              {chapters.map((c, i) => (
                <motion.div
                  key={c.kicker}
                  aria-hidden={i !== active}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{ scale: i === active ? 1 : 1.15 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image src={c.image.src} alt={i === active ? c.image.alt : ""} fill sizes="50vw" className="object-cover" />
                  </motion.div>
                </motion.div>
              ))}
              <div className="absolute bottom-6 left-6 flex gap-2" aria-hidden="true">
                {chapters.map((_, i) => (
                  <span
                    key={i}
                    className={`h-px transition-all duration-700 ${i === active ? "w-12 bg-bone" : "w-6 bg-bone/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {chapters.map((c, i) => (
            <ChapterBlock key={c.kicker} chapter={c} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
