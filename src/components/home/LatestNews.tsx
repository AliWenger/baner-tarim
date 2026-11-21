import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

export function LatestNews({ items }: { items: NewsItem[] }) {
  const [featured, ...rest] = items;
  if (!featured) return null;

  return (
    <section aria-labelledby="haberler-baslik" className="bg-bone py-28 md:py-44">
      <div className="gutter flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="08">Haberler ve duyurular</SectionLabel>
          <SplitText id="haberler-baslik" text="Sahadan haberler." className="display-lg mt-8 text-forest" />
        </div>
        <ArrowLink href="/haberler">Tüm haberler</ArrowLink>
      </div>

      <div className="gutter mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <Link href={`/haberler/${featured.slug}`} className="group block">
            <div className="relative aspect-[16/11] overflow-hidden bg-forest-900">
              <Image
                src={featured.cover.src}
                alt={featured.cover.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 92vw"
                className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
            </div>
            <div className="mt-6 flex items-center gap-4 text-[0.8rem] text-ink/60">
              <span className="eyebrow text-clay">{featured.category}</span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
            </div>
            <h3 className="display-md mt-4 max-w-[20ch] text-forest">
              <span className="link-underline">{featured.title}</span>
            </h3>
          </Link>
        </Reveal>

        <ul className="lg:col-span-4 lg:col-start-9">
          {rest.map((n, i) => (
            <li key={n.slug} className="border-t border-ink/15 last:border-b">
              <Reveal delay={i * 0.1} y={20}>
                <Link href={`/haberler/${n.slug}`} className="group grid grid-cols-[1fr_6rem] gap-5 py-8">
                  <div>
                    <div className="flex items-center gap-3 text-[0.78rem] text-ink/55">
                      <span className="eyebrow text-[0.62rem] text-clay">{n.category}</span>
                      <time dateTime={n.date}>{formatDate(n.date)}</time>
                    </div>
                    <h3 className="mt-3 font-display text-[1.45rem] leading-snug text-forest transition-colors group-hover:text-olive">
                      {n.title}
                    </h3>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={n.cover.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
