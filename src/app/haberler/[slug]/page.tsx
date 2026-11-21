import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { getNews, getNewsItem } from "@/lib/content";
import { site } from "@/content/site";
import type { NewsBlock } from "@/content/types";
import { formatDate } from "@/lib/utils";

/** Statik dışa aktarım: yalnızca derleme anında bilinen sayfalar üretilir. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getNews();
  return items.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(props: PageProps<"/haberler/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const n = await getNewsItem(slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.excerpt,
    alternates: { canonical: `/haberler/${n.slug}` },
    openGraph: {
      type: "article",
      title: n.title,
      description: n.excerpt,
      url: `/haberler/${n.slug}`,
      publishedTime: n.date,
      images: [{ url: `${n.cover.src}?w=1200&h=630&fit=crop&q=75&auto=format`, width: 1200, height: 630, alt: n.cover.alt }],
    },
  };
}

function Block({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-12 border-l-2 border-clay pl-6 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug font-light text-forest italic">
          {block.text}
          {block.cite && <cite className="mt-3 block text-sm not-italic text-ink/60">— {block.cite}</cite>}
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-12">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={block.image.src} alt={block.image.alt} fill sizes="(min-width: 768px) 720px, 92vw" className="object-cover" />
          </div>
          {block.caption && <figcaption className="mt-3 text-sm text-ink/55">{block.caption}</figcaption>}
        </figure>
      );
  }
}

export default async function NewsDetailPage(props: PageProps<"/haberler/[slug]">) {
  const { slug } = await props.params;
  const [item, all] = await Promise.all([getNewsItem(slug), getNews()]);
  if (!item) notFound();
  const others = all.filter((n) => n.slug !== item.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.date,
    image: [`${item.cover.src}?w=1200&q=75&auto=format`],
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <header className="bg-forest pt-40 pb-16 text-bone md:pt-52 md:pb-24">
        <div className="gutter">
          <nav aria-label="Sayfa konumu" className="text-[0.8rem] text-bone/65">
            <Link href="/haberler" className="link-underline hover:text-bone">
              ← Haberler
            </Link>
          </nav>
          <p className="mt-10 flex items-center gap-4 text-[0.85rem] text-bone/70">
            <span className="eyebrow text-wheat">{item.category}</span>
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </p>
          <SplitText as="h1" trigger="mount" text={item.title} className="display-lg mt-6 max-w-[18ch]" stagger={0.05} />
        </div>
      </header>

      <div className="bg-forest">
        <div className="gutter">
          <ParallaxImage image={item.cover} priority strength={8} sizes="100vw" className="aspect-[16/9] translate-y-16 md:aspect-[21/9]" />
        </div>
      </div>

      <div className="bg-bone pt-32 pb-24 md:pt-40 md:pb-36">
        <Reveal className="gutter">
          <div className="prose-baner mx-auto max-w-[44rem] text-ink/85">
            <p className="!text-[clamp(1.25rem,1.8vw,1.5rem)] !leading-normal font-display text-forest">{item.excerpt}</p>
            {item.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </Reveal>
      </div>

      {others.length > 0 && (
        <aside aria-labelledby="diger-haberler" className="border-t border-ink/10 bg-sand py-20 md:py-28">
          <div className="gutter">
            <div className="flex items-end justify-between gap-6">
              <h2 id="diger-haberler" className="display-sm text-forest">
                Diğer haberler
              </h2>
              <ArrowLink href="/haberler">Tümü</ArrowLink>
            </div>
            <ul className="mt-10 grid gap-10 md:grid-cols-2">
              {others.map((n) => (
                <li key={n.slug}>
                  <Link href={`/haberler/${n.slug}`} className="group grid grid-cols-[7rem_1fr] gap-6">
                    <div className="relative aspect-square overflow-hidden">
                      <Image src={n.cover.src} alt="" fill sizes="112px" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>
                    <div>
                      <time dateTime={n.date} className="text-[0.8rem] text-ink/55">
                        {formatDate(n.date)}
                      </time>
                      <h3 className="mt-2 font-display text-2xl leading-snug text-forest group-hover:text-olive">{n.title}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </article>
  );
}
