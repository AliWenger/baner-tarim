import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ContactCta } from "@/components/home/ContactCta";
import { getCrops } from "@/lib/content";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { cn, pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sera Ürünleri",
  description: `Domates tipleri, biber, patlıcan, hıyar, kabak ve fasulye: Akdeniz seralarında yetiştirilen ürünler, tipleri ve sık görülen hastalık ve zararlıları. ${site.name} sera ürünleri rehberi.`,
  alternates: { canonical: "/sera-urunleri" },
  openGraph: { title: `Sera Ürünleri — ${site.name}`, url: "/sera-urunleri" },
};

export default async function CropsPage() {
  const crops = await getCrops();

  return (
    <>
      <PageHero
        eyebrow="Sera ürünleri rehberi"
        title={["Seradan", "sofraya."]}
        intro="Demre ve Akdeniz seralarında yetiştirilen ürünlerin tipleri, sık karşılaşılan hastalık ve zararlıları ve iyi uygulama notları."
        image={images.greenhouseTomatoRows}
        crumbs={[{ href: "/sera-urunleri", label: "Sera Ürünleri" }]}
      />

      <nav aria-label="Sera ürünleri dizini" className="border-b border-ink/10 bg-bone">
        <ul className="gutter flex gap-8 overflow-x-auto py-6 text-[0.9rem] whitespace-nowrap">
          {crops.map((c, i) => (
            <li key={c.slug}>
              <a href={`#${c.slug}`} className="link-underline text-ink/70 hover:text-ink">
                <span className="mr-2 text-olive">{pad(i + 1)}</span>
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-bone">
        {crops.map((c, i) => {
          const flip = i % 2 === 1;
          const featured = i === 0;
          return (
            <section
              key={c.slug}
              id={c.slug}
              aria-labelledby={`${c.slug}-baslik`}
              className="gutter grid scroll-mt-24 items-center gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-28"
            >
              <div className={cn(featured ? "md:col-span-7" : "md:col-span-6", flip && "md:order-2 md:col-start-7")}>
                <Link href={`/sera-urunleri/${c.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                  <ParallaxImage
                    image={c.image}
                    reveal
                    strength={10}
                    sizes="(min-width: 768px) 55vw, 92vw"
                    className={featured ? "aspect-[16/11]" : "aspect-[5/4]"}
                  />
                </Link>
              </div>
              <Reveal
                className={cn(
                  featured ? "md:col-span-4 md:col-start-9" : "md:col-span-5",
                  !featured && (flip ? "md:order-1 md:col-start-1" : "md:col-start-8"),
                )}
              >
                <p className="flex items-baseline gap-4">
                  <span className="font-display text-6xl font-light text-olive/70">{pad(i + 1)}</span>
                  <span className="eyebrow text-clay">{c.kicker}</span>
                </p>
                <h2 id={`${c.slug}-baslik`} className={cn("mt-6 text-forest", featured ? "display-lg" : "display-md")}>
                  {c.name}
                </h2>
                <p className="mt-6 leading-relaxed text-ink/75">{c.summary}</p>
                <p className="eyebrow mt-8 text-ink/50">Tipler</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">{c.varieties.map((v) => v.name).join(" · ")}</p>
                <ArrowLink href={`/sera-urunleri/${c.slug}`} className="mt-10">
                  {c.name} rehberi
                </ArrowLink>
              </Reveal>
            </section>
          );
        })}
      </div>

      <ContactCta
        title={["Seranız için", "buradayız."]}
        text="Ürününüze özel sorularınız, hastalık / zararlı teşhisi ve uygulama önerisi için bize ulaşın."
      />
    </>
  );
}
