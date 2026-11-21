import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ContactCta } from "@/components/home/ContactCta";
import { getActivities } from "@/lib/content";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { cn, pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Faaliyet Alanları",
  description: `${site.name} faaliyet alanları: üretimden tedarike uzanan çalışmalarımız.`,
  alternates: { canonical: "/faaliyet-alanlari" },
  openGraph: { title: `Faaliyet Alanları — ${site.name}`, url: "/faaliyet-alanlari" },
};

export default async function ActivitiesPage() {
  const items = await getActivities();

  return (
    <>
      <PageHero
        eyebrow="Faaliyet alanları"
        title={["Seranın", "her mevsimi."]}
        intro="Bitki koruma ürünlerinden sahadaki teknik desteğe, sera üreticisinin yanında olduğumuz alanlar."
        image={images.sprayingGreenhouse}
        crumbs={[{ href: "/faaliyet-alanlari", label: "Faaliyet Alanları" }]}
      />

      {/* Alan dizini */}
      <nav aria-label="Faaliyet alanları dizini" className="border-b border-ink/10 bg-bone">
        <ul className="gutter flex gap-8 overflow-x-auto py-6 text-[0.9rem] whitespace-nowrap" data-lenis-prevent>
          {items.map((a, i) => (
            <li key={a.slug}>
              <a href={`#${a.slug}`} className="link-underline text-ink/70 hover:text-ink">
                <span className="mr-2 text-olive">{pad(i + 1)}</span>
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-bone">
        {items.map((a, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={a.slug}
              id={a.slug}
              aria-labelledby={`${a.slug}-baslik`}
              className="gutter grid scroll-mt-24 items-center gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-32"
            >
              <div className={cn("md:col-span-7", flip && "md:order-2 md:col-start-6")}>
                <Link href={`/faaliyet-alanlari/${a.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                  <ParallaxImage
                    image={a.image}
                    reveal
                    strength={10}
                    sizes="(min-width: 768px) 58vw, 92vw"
                    className={cn(i % 3 === 0 ? "aspect-[16/11]" : "aspect-[5/4]")}
                  />
                </Link>
              </div>
              <Reveal className={cn("md:col-span-4", flip ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
                <p className="flex items-baseline gap-4">
                  <span className="font-display text-6xl font-light text-olive/70">{pad(i + 1)}</span>
                  <span className="eyebrow text-clay">{a.kicker}</span>
                </p>
                <h2 id={`${a.slug}-baslik`} className="display-md mt-6 text-forest">
                  {a.title}
                </h2>
                <p className="mt-6 leading-relaxed text-ink/75">{a.summary}</p>
                <ul className="mt-8 space-y-2 border-t border-ink/15 pt-6 text-[0.95rem] text-ink/80">
                  {a.scope.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-olive" />
                      {s}
                    </li>
                  ))}
                </ul>
                <ArrowLink href={`/faaliyet-alanlari/${a.slug}`} className="mt-10">
                  {a.title} hakkında
                </ArrowLink>
              </Reveal>
            </section>
          );
        })}
      </div>

      <ContactCta />
    </>
  );
}
