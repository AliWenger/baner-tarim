import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { SafetyNote } from "@/components/ui/SafetyNote";
import { ContactCta } from "@/components/home/ContactCta";
import { getCrops, getProductCategories, getProductCategory } from "@/lib/content";
import { site } from "@/content/site";
import { cn, pad } from "@/lib/utils";

/** Statik dışa aktarım: yalnızca derleme anında bilinen sayfalar üretilir. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getProductCategories();
  return categories.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata(props: PageProps<"/urunler/[kategori]">): Promise<Metadata> {
  const { kategori } = await props.params;
  const c = await getProductCategory(kategori);
  if (!c) return {};
  return {
    title: `${c.title} — Bitki Koruma Ürünleri`,
    description: c.description,
    alternates: { canonical: `/urunler/${c.slug}` },
    openGraph: {
      title: `${c.title} — ${site.name}`,
      description: c.summary,
      url: `/urunler/${c.slug}`,
      images: [{ url: `${c.image.src}?w=1200&h=630&fit=crop&q=75&auto=format`, width: 1200, height: 630, alt: c.image.alt }],
    },
  };
}

export default async function CategoryPage(props: PageProps<"/urunler/[kategori]">) {
  const { kategori } = await props.params;
  const [category, all, crops] = await Promise.all([getProductCategory(kategori), getProductCategories(), getCrops()]);
  if (!category) notFound();
  const relatedCrops = crops.filter((c) => category.crops.includes(c.slug));

  return (
    <>
      <PageHero
        eyebrow="Bitki koruma ürün grubu"
        title={category.title}
        intro={category.description}
        image={category.image}
        crumbs={[
          { href: "/urunler", label: "Ürünler" },
          { href: `/urunler/${category.slug}`, label: category.title },
        ]}
      />

      <section aria-label={`${category.title} — hedef sorunlar`} className="bg-bone py-24 md:py-36">
        <div className="gutter grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-olive">Hedef sorunlar</p>
            <ul className="mt-6 border-t border-ink/15">
              {category.targets.map((t, i) => (
                <li key={t} className="flex items-baseline gap-5 border-b border-ink/15 py-5">
                  <span className="eyebrow text-clay">{pad(i + 1)}</span>
                  <span className="font-display text-[clamp(1.3rem,2vw,1.7rem)] text-forest">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-olive">Ürünler</p>
            {category.products.length > 0 ? (
              <ul className="mt-6 border-t border-ink/15">
                {category.products.map((p) => (
                  <li key={p.slug} className="border-b border-ink/15">
                    <Link href={`/urunler/${category.slug}/${p.slug}`} className="group flex items-center justify-between gap-6 py-5">
                      <span className="flex items-center gap-5">
                        <span className="relative h-16 w-14 shrink-0 overflow-hidden">
                          <Image src={p.image.src} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                        <span>
                          <span className="block font-display text-2xl text-forest group-hover:text-olive">{p.name}</span>
                          <span className="block text-[0.9rem] text-ink/60">{p.summary}</span>
                        </span>
                      </span>
                      <Arrow className="shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 border border-ink/15 bg-sand/50 p-8 md:p-10">
                <p className="display-sm text-forest">Güncel ürün listesi için bize ulaşın.</p>
                <p className="mt-4 text-ink/70">
                  Bu gruptaki ürünlerimizi, seranızdaki soruna ve bitkinin gelişim dönemine uygun öneriyle birlikte
                  paylaşalım.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <ArrowLink href={`/iletisim?konu=${encodeURIComponent(`Ürün bilgisi: ${category.title}`)}`} variant="solid">
                    Bilgi talep edin
                  </ArrowLink>
                  <ArrowLink href={`https://wa.me/${site.contact.whatsapp}`} variant="outline" external>
                    WhatsApp
                  </ArrowLink>
                </div>
              </div>
            )}
            <SafetyNote className="mt-10" />
          </Reveal>
        </div>
      </section>

      {relatedCrops.length > 0 && (
        <section aria-labelledby="ilgili-urunler" className="bg-forest py-20 text-bone md:py-28">
          <div className="gutter">
            <h2 id="ilgili-urunler" className="eyebrow text-sage">
              İlgili sera ürünleri
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
              {relatedCrops.map((c, i) => (
                <li key={c.slug} className={cn(i % 2 === 1 && "lg:mt-12")}>
                  <Link href={`/sera-urunleri/${c.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-forest-900">
                      <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 15vw, 45vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                    <p className="mt-4 font-display text-2xl group-hover:text-wheat">{c.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav aria-label="Diğer ürün grupları" className="bg-sand py-20 md:py-28">
        <div className="gutter">
          <p className="eyebrow text-olive">Diğer ürün grupları</p>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {all
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <li key={c.slug}>
                  <Link href={`/urunler/${c.slug}`} className="link-underline font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-light text-forest">
                    {c.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <ContactCta title={["Ürün", "bilgisi alın."]} />
    </>
  );
}
