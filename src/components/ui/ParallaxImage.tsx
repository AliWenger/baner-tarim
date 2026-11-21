"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  image: ImageAsset;
  className?: string;
  /** Kayma miktarı (yüzde). 0 = parallax yok. */
  strength?: number;
  sizes?: string;
  priority?: boolean;
  /** Görünür alana girerken alttan yukarı açılan maske efekti. */
  reveal?: boolean;
  imgClassName?: string;
};

export function ParallaxImage({
  image,
  className,
  strength = 10,
  sizes = "100vw",
  priority,
  reveal = false,
  imgClassName,
}: ParallaxImageProps) {
  // Gözlem, kırpılmayan dış kapsayıcıda yapılır (clip-path uygulanan öğe
  // kendi görünürlüğünü güvenilir biçimde bildiremez).
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 bg-forest-900"
        initial={reveal ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
        animate={reveal ? { clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute inset-x-0 will-change-transform"
          style={{ y, top: `-${strength}%`, bottom: `-${strength}%` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", imgClassName)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
