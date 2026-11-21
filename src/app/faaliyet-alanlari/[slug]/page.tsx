import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink, Arrow } from "@/components/ui/ArrowLink";
import { ContactCta } from "@/components/home/ContactCta";
import { getActivities, getActivity } from "@/lib/content";
import { site } from "@/content/site";

/** Statik dışa aktarım: yalnızca derleme anında bilinen sayfalar üretilir. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getActivities();
  return items.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/faaliyet-alanlari/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const a = await getActivity(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/faaliyet-alanlari/${a.slug}` },
    openGraph: {
      title: `${a.title} — ${site.name}`,
      description: a.summary,
      url: `/faaliyet-alanlari/${a.slug}`,
      images: [{ url: `${a.image.src}?w=1200&h=630&fit=crop&q=75&auto=format`, width: 1200, height: 630, alt: a.image.alt }],
    },
  };
}

export default async function ActivityPage(props: PageProps<"/faaliyet-alanlari/[slug]">) {
  const { slug } = await props.params;
  const [area, all] = await Promise.all([getActivity(slug), getActivities()]);
  if (!area) notFound();

  const idx = all.findIndex((a) => a.slug === area.slug);
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <PageHero
        eyebrow={area.kicker}
        title={area.title}
        intro={area.summary}
        image={area.image}
        crumbs={[
          { href: "/faaliyet-alanlari", label: "Faaliyet Alanları" },
          { href: `/faaliyet-alanlari/${area.slug}`, label: area.title },
        ]}
      />

      <section className="bg-bone py-24 md:py-40">
        <div className="gutter grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-olive">Kapsam</p>
              <ul className="mt-6 border-t border-ink/15">
                {area.scope.map((s) => (
                  <li key={s} className="border-b border-ink/15 py-4 font-display text-xl text-forest">
                    {s}
                  </li>
                ))}
              </ul>
              <ArrowLink
                href={`/iletisim?konu=${encodeURIComponent(area.title)}`}
                variant="solid"
                className="mt-10"
              >
                Bu alan hakkında bilgi alın
              </ArrowLink>
            </div>
          </aside>

          <Reveal className="prose-baner text-ink/85 lg:col-span-6 lg:col-start-7">
            {area.body.map((p, i) => (
              <p key={i} className={i === 0 ? "!text-[clamp(1.3rem,1.9vw,1.65rem)] !leading-snug font-display text-forest" : ""}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Asimetrik galeri */}
        <div className="gutter mt-24 grid grid-cols-12 gap-4 md:mt-40 md:gap-8">
          {area.gallery[0] && (
            <div className="col-span-12 md:col-span-7">
              <ParallaxImage image={area.gallery[0]} reveal sizes="(min-width: 768px) 58vw, 92vw" className="aspect-[16/10]" />
            </div>
          )}
          {area.gallery[1] && (
            <div className="col-span-7 md:col-span-4 md:col-start-9 md:mt-32">
              <ParallaxImage image={area.gallery[1]} reveal strength={16} sizes="(min-width: 768px) 33vw, 58vw" className="aspect-[3/4]" />
            </div>
          )}
          {area.gallery[2] && (
            <div className="col-span-9 col-start-4 -mt-10 md:col-span-5 md:col-start-3 md:-mt-20">
              <ParallaxImage image={area.gallery[2]} reveal strength={12} sizes="(min-width: 768px) 42vw, 75vw" className="aspect-[4/3]" />
            </div>
          )}
        </div>
      </section>

      {/* Sonraki alan */}
      {next && next.slug !== area.slug && (
        <Link
          href={`/faaliyet-alanlari/${next.slug}`}
          className="group gutter flex flex-col gap-6 border-t border-ink/10 bg-sand py-16 md:flex-row md:items-end md:justify-between md:py-24"
        >
          <div>
            <p className="eyebrow text-olive">Sonraki alan</p>
            <p className="display-lg mt-4 text-forest transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4">
              {next.title}
            </p>
          </div>
          <span className="flex h-16 w-16 items-center justify-center border border-ink/25 transition-colors duration-500 group-hover:bg-forest group-hover:text-bone">
            <Arrow className="h-6 w-6" />
          </span>
        </Link>
      )}

      <ContactCta />
    </>
  );
}
