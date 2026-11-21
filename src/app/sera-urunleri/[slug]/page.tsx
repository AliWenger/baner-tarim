import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { LogoMark } from "@/components/ui/Logo";
import { SafetyNote } from "@/components/ui/SafetyNote";
import { ContactCta } from "@/components/home/ContactCta";
import { getCrop, getCrops, getProductCategories } from "@/lib/content";
import { site } from "@/content/site";
import { cn, pad } from "@/lib/utils";

/** Statik dışa aktarım: yalnızca derleme anında bilinen sayfalar üretilir. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const crops = await getCrops();
  return crops.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/sera-urunleri/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = await getCrop(slug);
  if (!c) return {};
  const description = `${c.name} tipleri (${c.varieties.map((v) => v.name).join(", ")}) ve sık görülen hastalık ve zararlıları.`;
  return {
    title: `${c.name} — Sera Ürünleri`,
    description,
    alternates: { canonical: `/sera-urunleri/${c.slug}` },
    openGraph: {
      title: `${c.name} — ${site.name}`,
      description,
      url: `/sera-urunleri/${c.slug}`,
      images: [{ url: `${c.image.src}?w=1200&h=630&fit=crop&q=75&auto=format`, width: 1200, height: 630, alt: c.image.alt }],
    },
  };
}

export default async function CropPage(props: PageProps<"/sera-urunleri/[slug]">) {
  const { slug } = await props.params;
  const [crop, all, groups] = await Promise.all([getCrop(slug), getCrops(), getProductCategories()]);
  if (!crop) notFound();

  const idx = all.findIndex((c) => c.slug === crop.slug);
  const next = all[(idx + 1) % all.length];
  const diseases = crop.issues.filter((i) => i.kind === "Hastalık");
  const pests = crop.issues.filter((i) => i.kind === "Zararlı");
  const protection = groups.filter((g) => crop.protection.includes(g.slug));

  return (
    <>
      <PageHero
        eyebrow={crop.kicker}
        title={crop.name}
        intro={crop.summary}
        image={crop.image}
        crumbs={[
          { href: "/sera-urunleri", label: "Sera Ürünleri" },
          { href: `/sera-urunleri/${crop.slug}`, label: crop.name },
        ]}
      />

      {/* Giriş */}
      <section aria-label={`${crop.name} hakkında`} className="bg-bone py-24 md:py-36">
        <div className="gutter grid gap-10 lg:grid-cols-12">
          <p className="eyebrow text-olive lg:col-span-3">Genel bilgi</p>
          <Reveal className="lg:col-span-8 lg:col-start-5">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-snug font-light text-forest">{crop.intro[0]}</p>
            {crop.intro.slice(1).map((p) => (
              <p key={p} className="lead mt-8 max-w-2xl text-ink/75">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Tipler */}
      <section id="tipler" aria-labelledby="tipler-baslik" className="scroll-mt-24 bg-bone pb-24 md:pb-36">
        <div className="gutter">
          <SplitText
            id="tipler-baslik"
            text={[`${crop.name}`, "tipleri."]}
            className="display-lg text-forest"
            lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-clay"
          />
        </div>
        <ol className="gutter mt-14 md:mt-20">
          {crop.varieties.map((v, i) => (
            <li key={v.name} className="border-t border-ink/15 last:border-b">
              <Reveal y={24} className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-6 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                <span className="eyebrow pt-3 text-olive md:col-span-1">{pad(i + 1)}</span>
                <div className="md:col-span-6">
                  <h3 className="display-sm text-forest">{v.name}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink/75">{v.text}</p>
                </div>
                <div
                  className={cn(
                    "relative col-span-2 aspect-[16/10] overflow-hidden bg-forest md:col-span-4 md:col-start-9 md:aspect-[4/3]",
                  )}
                >
                  {v.image ? (
                    <Image src={v.image.src} alt={v.image.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-bone/60">
                      <LogoMark className="h-10 w-10 text-wheat/60" />
                      <span className="text-[0.8rem]">Görsel eklenecek</span>
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Hastalık ve zararlılar */}
      <section aria-labelledby="sorunlar-baslik" className="bg-forest py-24 text-bone md:py-36">
        <div className="gutter">
          <p className="eyebrow text-sage">Bitki sağlığı</p>
          <SplitText
            id="sorunlar-baslik"
            text={["Sık görülen", "hastalık ve zararlılar."]}
            className="display-md mt-6 max-w-[20ch]"
            lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-wheat"
          />
          <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-12">
            {[
              { title: "Zararlılar", list: pests },
              { title: "Hastalıklar", list: diseases },
            ].map((group) =>
              group.list.length > 0 ? (
                <div key={group.title}>
                  <h3 className="eyebrow text-wheat">{group.title}</h3>
                  <ul className="mt-6 border-t border-bone/15">
                    {group.list.map((issue) => (
                      <li key={issue.name} className="border-b border-bone/15 py-6">
                        <p className="font-display text-2xl">{issue.name}</p>
                        <p className="mt-2 leading-relaxed text-bone/70">{issue.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </section>

      {/* İyi uygulama notları + ürün grupları */}
      <section aria-labelledby="notlar-baslik" className="bg-sand py-24 md:py-36">
        <div className="gutter grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="notlar-baslik" className="display-sm text-forest">
              Dikkat edilecekler
            </h2>
            <ul className="mt-8 space-y-5">
              {crop.notes.map((n) => (
                <li key={n} className="flex gap-4 leading-relaxed text-ink/80">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-5 shrink-0 bg-clay" />
                  {n}
                </li>
              ))}
            </ul>
            <SafetyNote className="mt-10" />
          </div>

          {protection.length > 0 && (
            <div className="lg:col-span-5 lg:col-start-8">
              <h2 className="eyebrow text-olive">İlgili bitki koruma ürün grupları</h2>
              <ul className="mt-6 border-t border-ink/15">
                {protection.map((g) => (
                  <li key={g.slug} className="border-b border-ink/15">
                    <Link href={`/urunler/${g.slug}`} className="group flex items-center justify-between gap-6 py-5">
                      <span>
                        <span className="block font-display text-2xl text-forest group-hover:text-olive">{g.title}</span>
                        <span className="block text-[0.9rem] text-ink/60">{g.summary}</span>
                      </span>
                      <Arrow className="shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
              <ArrowLink
                href={`/iletisim?konu=${encodeURIComponent(`Teknik destek: ${crop.name}`)}`}
                variant="solid"
                className="mt-10"
              >
                {crop.name} için destek alın
              </ArrowLink>
            </div>
          )}
        </div>
      </section>

      {next && next.slug !== crop.slug && (
        <Link
          href={`/sera-urunleri/${next.slug}`}
          className="group gutter flex flex-col gap-6 border-t border-ink/10 bg-bone py-16 md:flex-row md:items-end md:justify-between md:py-24"
        >
          <div>
            <p className="eyebrow text-olive">Sonraki ürün</p>
            <p className="display-lg mt-4 text-forest transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4">
              {next.name}
            </p>
          </div>
          <span className="flex h-16 w-16 items-center justify-center border border-ink/25 transition-colors duration-500 group-hover:bg-forest group-hover:text-bone">
            <Arrow className="h-6 w-6" />
          </span>
        </Link>
      )}

      <ContactCta
        title={["Seranız için", "buradayız."]}
        text={`${crop.name} üretiminizle ilgili teşhis, ürün ve uygulama önerisi için bize ulaşın.`}
      />
    </>
  );
}
