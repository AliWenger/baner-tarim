import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { ContactCta } from "@/components/home/ContactCta";
import { getProduct, getProductCategories } from "@/lib/content";
import { site } from "@/content/site";

/** Statik dışa aktarım: yalnızca derleme anında bilinen sayfalar üretilir. */
export const dynamicParams = false;

/**
 * Henüz hiç ürün eklenmemişse statik dışa aktarım en az bir sayfa ister;
 * bu durumda arama motorlarına kapalı tek bir boş sayfa üretilir.
 * src/content/products.ts içine ürün eklendiğinde gerçek sayfalar oluşur.
 */
const EMPTY_PLACEHOLDER = "_";

export async function generateStaticParams() {
  const categories = await getProductCategories();
  const params = categories.flatMap((c) => c.products.map((p) => ({ kategori: c.slug, urun: p.slug })));
  return params.length > 0 ? params : [{ kategori: categories[0]?.slug ?? "urun", urun: EMPTY_PLACEHOLDER }];
}

export async function generateMetadata(props: PageProps<"/urunler/[kategori]/[urun]">): Promise<Metadata> {
  const { kategori, urun } = await props.params;
  const data = await getProduct(kategori, urun);
  if (!data) return { robots: { index: false, follow: false } };
  const { category, product } = data;
  const path = `/urunler/${category.slug}/${product.slug}`;
  return {
    title: `${product.name} — ${category.title}`,
    description: product.summary,
    alternates: { canonical: path },
    openGraph: {
      title: `${product.name} — ${site.name}`,
      description: product.summary,
      url: path,
      images: [{ url: `${product.image.src}?w=1200&h=630&fit=crop&q=75&auto=format`, width: 1200, height: 630, alt: product.image.alt }],
    },
  };
}

export default async function ProductPage(props: PageProps<"/urunler/[kategori]/[urun]">) {
  const { kategori, urun } = await props.params;
  const data = await getProduct(kategori, urun);
  if (!data) notFound();
  const { category, product } = data;
  const related = category.products.filter((p) => p.slug !== product.slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: category.title,
    brand: { "@type": "Brand", name: site.name },
    image: `${product.image.src}?w=1200&q=75&auto=format`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <section className="bg-forest text-bone lg:grid lg:min-h-screen lg:grid-cols-2">
        {/* Görsel — masaüstünde sabit */}
        <div className="relative h-[72svh] bg-forest-900 lg:sticky lg:top-0 lg:h-screen">
          <Image src={product.image.src} alt={product.image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-transparent to-transparent" />
        </div>

        <div className="gutter flex flex-col justify-center py-20 lg:py-40 lg:pr-[6vw] lg:pl-[5vw]">
          <nav aria-label="Sayfa konumu">
            <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-bone/60">
              <li>
                <Link href="/urunler" className="link-underline hover:text-bone">
                  Ürünler
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/urunler/${category.slug}`} className="link-underline hover:text-bone">
                  {category.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-bone">
                {product.name}
              </li>
            </ol>
          </nav>

          <SplitText as="h1" trigger="mount" text={product.name} className="display-lg mt-10 text-bone" />
          <Reveal delay={0.2}>
            <p className="lead mt-6 text-bone/75">{product.summary}</p>
            <div className="prose-baner mt-6 text-bone/80">
              {product.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="eyebrow text-sage">Kullanım alanları</h2>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {product.usage.map((u) => (
                <li key={u} className="flex gap-3 border-b border-bone/10 py-3 text-bone/85">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-sage" />
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="eyebrow text-sage">Ürün bilgileri</h2>
            <dl className="mt-5 border-t border-bone/15">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-6 border-b border-bone/15 py-4">
                  <dt className="text-bone/60">{s.label}</dt>
                  <dd className="text-bone">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-14 border border-bone/15 bg-forest-900 p-8">
            <p className="font-display text-2xl text-bone">Bu ürün hakkında bilgi almak ister misiniz?</p>
            <p className="mt-3 text-[0.95rem] text-bone/70">
              Ürün özellikleri, ambalaj seçenekleri ve tedarik koşulları için ekibimiz size dönüş yapsın.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <ArrowLink href={`/iletisim?konu=${encodeURIComponent(`Ürün bilgisi: ${product.name}`)}`} variant="solid" tone="light">
                Bilgi talep edin
              </ArrowLink>
              <ArrowLink href={`https://wa.me/${site.contact.whatsapp}`} variant="outline" tone="light" external>
                WhatsApp
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="benzer" className="border-t border-ink/10 bg-sand py-20 md:py-28">
          <div className="gutter">
            <h2 id="benzer" className="eyebrow text-olive">
              {category.title} kategorisindeki diğer ürünler
            </h2>
            <ul className="mt-8 border-t border-ink/15">
              {related.map((p) => (
                <li key={p.slug} className="border-b border-ink/15">
                  <Link href={`/urunler/${category.slug}/${p.slug}`} className="group flex items-center justify-between gap-6 py-7">
                    <span className="flex items-center gap-6">
                      <span className="relative h-20 w-16 shrink-0 overflow-hidden">
                        <Image src={p.image.src} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                      <span className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light text-forest transition-transform duration-700 group-hover:translate-x-2">
                        {p.name}
                      </span>
                    </span>
                    <Arrow className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactCta title={["Ürün", "bilgisi alın."]} />
    </>
  );
}
