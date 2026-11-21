"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { SplitText } from "@/components/ui/SplitText";
import { useIntroReady } from "@/lib/intro";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  return (
    <section
      ref={ref}
      aria-label="Giriş"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-forest-950 text-bone"
    >
      {/* Arka plan: sinematik görsel (veya video) */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <div className="animate-slow-zoom absolute inset-0">
          {site.heroVideo ? (
            <video
              className="h-full w-full object-cover"
              src={site.heroVideo}
              poster={images.aerialGreenhouses.src + "?w=1920&q=75&auto=format"}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          ) : (
            <Image
              src={images.aerialGreenhouses.src}
              alt={images.aerialGreenhouses.alt}
              fill
              priority
              sizes="100vw"
              quality={85}
              className="object-cover object-[50%_40%]"
            />
          )}
        </div>
      </motion.div>

      {/* Kontrast katmanları */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-950/10 to-forest-950/85" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-forest-950/50 to-transparent" />
      <motion.div aria-hidden="true" className="absolute inset-0 bg-forest-950" style={{ opacity: veil }} />

      <motion.div
        className="gutter relative flex h-full flex-col justify-end pb-10 md:pb-14"
        style={{ y: contentY, opacity: fade }}
      >
        <motion.p
          className="eyebrow mb-6 flex items-center gap-4 text-wheat md:mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease, delay: 0.1 }}
        >
          <span aria-hidden="true" className="h-px w-10 bg-current" />
          Demre · Antalya · Akdeniz
        </motion.p>

        <SplitText
          as="h1"
          trigger="mount"
          play={ready}
          text={site.slogan.lines}
          className="font-display text-[clamp(3.1rem,9.4vw,10rem)] leading-[0.9] font-light tracking-[-0.035em]"
          lineClassName="[&:nth-child(2)]:pl-[0.6em] [&:nth-child(2)]:italic [&:nth-child(2)]:text-wheat"
          delay={0.15}
          stagger={0.09}
        />

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="lead max-w-md text-bone/85"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, ease, delay: 0.6 }}
          >
            {site.slogan.sub}
          </motion.p>

          <motion.a
            href="#biz-kimiz"
            className="group flex items-center gap-4 self-start md:self-auto"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <span className="eyebrow text-[0.66rem] text-bone/80 transition-colors group-hover:text-bone">
              Keşfetmek için kaydırın
            </span>
            <span aria-hidden="true" className="relative block h-14 w-px overflow-hidden bg-bone/25">
              <span className="animate-scroll-cue absolute inset-0 bg-wheat" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
