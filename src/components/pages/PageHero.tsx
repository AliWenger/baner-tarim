import Link from "next/link";
import type { ImageAsset } from "@/content/types";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Crumb = { href: string; label: string };

type PageHeroProps = {
  eyebrow: string;
  title: string | string[];
  intro?: string;
  image?: ImageAsset;
  crumbs?: Crumb[];
  /** "tall": görselli büyük başlık, "compact": yasal sayfalar gibi sade başlık */
  size?: "tall" | "compact";
};

/** Alt sayfaların açılış alanı. Her zaman koyu zeminli; menü üzerinde okunur kalır. */
export function PageHero({ eyebrow, title, intro, image, crumbs, size = "tall" }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-forest text-bone",
        size === "tall" ? "min-h-[88svh] md:min-h-[92svh]" : "pt-40 pb-20 md:pt-52 md:pb-28",
      )}
    >
      {image && (
        <>
          <div className="absolute inset-0">
            <ParallaxImage image={image} strength={16} priority className="h-full" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-950/25 to-forest-950/90" />
        </>
      )}

      <div
        className={cn(
          "gutter relative flex flex-col",
          size === "tall" ? "min-h-[88svh] justify-end pt-36 pb-14 md:min-h-[92svh] md:pb-20" : "",
        )}
      >
        {crumbs && (
          <nav aria-label="Sayfa konumu" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-bone/65">
              <li>
                <Link href="/" className="link-underline hover:text-bone">
                  Ana Sayfa
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-bone/90">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="link-underline hover:text-bone">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p className="eyebrow flex items-center gap-4 text-wheat">
          <span aria-hidden="true" className="h-px w-10 bg-current" />
          {eyebrow}
        </p>
        <SplitText
          as="h1"
          trigger="mount"
          text={title}
          delay={0.1}
          className={cn("mt-6 max-w-[16ch]", size === "tall" ? "display-xl" : "display-lg")}
          lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-wheat"
        />
        {intro && (
          <Reveal delay={0.35} className="mt-10 max-w-xl">
            <p className="lead text-bone/80">{intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
