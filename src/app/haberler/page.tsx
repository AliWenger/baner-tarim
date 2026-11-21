import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/ArrowLink";
import { getNews } from "@/lib/content";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Haberler ve Duyurular",
  description: `${site.name} haberleri, duyuruları, etkinlik ve fuar katılımları.`,
  alternates: { canonical: "/haberler" },
  openGraph: { title: `Haberler ve Duyurular — ${site.name}`, url: "/haberler" },
};

export default async function NewsPage() {
  const items = await getNews();
  const [featured, ...rest] = items;

  return (
    <>
      <PageHero
        size="compact"
        eyebrow="Haberler ve duyurular"
        title={["Sahadan", "haberler."]}
        intro="Şirketimizden gelişmeler, duyurular, etkinlik ve fuar katılımları."
        crumbs={[{ href: "/haberler", label: "Haberler" }]}
      />

      <section aria-label="Haber listesi" className="bg-bone py-20 md:py-32">
        {featured && (
          <Reveal className="gutter">
            <Link href={`/haberler/${featured.slug}`} className="group grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
              <div className="relative aspect-[16/10] overflow-hidden bg-forest-900 md:col-span-8">
                <Image
                  src={featured.cover.src}
                  alt={featured.cover.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 66vw, 92vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
              <div className="md:col-span-4">
                <p className="flex items-center gap-4 text-[0.82rem] text-ink/60">
                  <span className="eyebrow text-clay">{featured.category}</span>
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </p>
                <h2 className="display-md mt-5 text-forest">
                  <span className="link-underline">{featured.title}</span>
                </h2>
                <p className="mt-5 leading-relaxed text-ink/70">{featured.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-3 font-medium text-forest">
                  Haberi oku <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        <ul className="gutter mt-20 md:mt-32">
          {rest.map((n, i) => (
            <li key={n.slug} className="border-t border-ink/15 last:border-b">
              <Reveal y={20} delay={i * 0.05}>
                <Link
                  href={`/haberler/${n.slug}`}
                  className="group grid grid-cols-[1fr_5.5rem] items-center gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-10"
                >
                  <time dateTime={n.date} className="text-[0.85rem] text-ink/55 md:col-span-2">
                    {formatDate(n.date)}
                  </time>
                  <div className="col-start-1 md:col-span-7 md:col-start-3">
                    <span className="eyebrow text-[0.62rem] text-clay">{n.category}</span>
                    <h2 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.3rem)] leading-tight text-forest transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                      {n.title}
                    </h2>
                    <p className="mt-3 hidden max-w-xl text-ink/65 md:block">{n.excerpt}</p>
                  </div>
                  <div className="relative col-start-2 row-span-2 row-start-1 aspect-[4/5] overflow-hidden md:col-span-2 md:col-start-11 md:row-span-1">
                    <Image src={n.cover.src} alt="" fill sizes="(min-width: 768px) 15vw, 88px" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
