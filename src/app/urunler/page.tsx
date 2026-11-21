import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SafetyNote } from "@/components/ui/SafetyNote";
import { ContactCta } from "@/components/home/ContactCta";
import { getCrops, getProductCategories } from "@/lib/content";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { cn, pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bitki Koruma Ürünleri",
  description: `${site.name} bitki koruma ürün grupları: fungisitler, insektisitler, akarisitler ve daha fazlası. Sera ürünleri için ürün bilgisi alın.`,
  alternates: { canonical: "/urunler" },
  openGraph: { title: `Bitki Koruma Ürünleri — ${site.name}`, url: "/urunler" },
};

export default async function ProductsPage() {
  const [groups, crops] = await Promise.all([getProductCategories(), getCrops()]);
  const cropName = (slug: string) => crops.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <PageHero
        eyebrow="Bitki koruma ürünleri"
        title={["Doğru ürün,", "doğru zamanda."]}
        intro="Sera ürünlerinde karşılaşılan hastalık, zararlı ve yabancı otlara yönelik bitki koruma ürün gruplarımız. Güncel ürün listesi ve uygulama önerisi için bize ulaşın."
        image={images.greenhouseInterior}
        crumbs={[{ href: "/urunler", label: "Ürünler" }]}
      />

      <div className="bg-bone py-20 md:py-32">
        <div className="gutter mb-16 md:mb-24">
          <SafetyNote />
        </div>

        {groups.map((g, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={g.slug}
              aria-labelledby={`${g.slug}-baslik`}
              className="gutter grid gap-10 border-t border-ink/10 py-16 md:grid-cols-12 md:gap-8 md:py-24"
            >
              <div className={cn("md:col-span-4", flip && "md:order-2 md:col-start-9")}>
                <Link href={`/urunler/${g.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                  <ParallaxImage image={g.image} reveal strength={10} sizes="(min-width: 768px) 33vw, 92vw" className="aspect-[4/5]" />
                </Link>
              </div>

              <Reveal className={cn("md:col-span-7", flip ? "md:order-1 md:col-start-1" : "md:col-start-6")}>
                <p className="eyebrow text-olive">{pad(i + 1)} — Ürün grubu</p>
                <h2 id={`${g.slug}-baslik`} className="display-lg mt-6 text-forest">
                  <Link href={`/urunler/${g.slug}`} className="hover:text-olive">
                    {g.title}
                  </Link>
                </h2>
                <p className="lead mt-6 max-w-xl text-ink/75">{g.description}</p>

                <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow text-ink/50">Hedef sorunlar</p>
                    <ul className="mt-4 space-y-2 text-ink/85">
                      {g.targets.map((t) => (
                        <li key={t} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-clay" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {g.crops.length > 0 && (
                    <div>
                      <p className="eyebrow text-ink/50">İlgili sera ürünleri</p>
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {g.crops.map((c) => (
                          <li key={c}>
                            <Link href={`/sera-urunleri/${c}`} className="link-underline text-forest">
                              {cropName(c)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <ArrowLink href={`/urunler/${g.slug}`} className="mt-10">
                  {g.title} hakkında
                </ArrowLink>
              </Reveal>
            </section>
          );
        })}
      </div>

      <ContactCta
        title={["Ürün", "bilgisi alın."]}
        text="Bu bir satış sitesi değildir. Güncel ürün listesi, uygulama önerisi ve teknik destek için ekibimizle doğrudan iletişime geçin."
      />
    </>
  );
}
