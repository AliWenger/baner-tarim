import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { ScrollText } from "@/components/ui/ScrollText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SplitText } from "@/components/ui/SplitText";
import { Values } from "@/components/home/Values";
import { ContactCta } from "@/components/home/ContactCta";
import { intro, mission, story, values, vision } from "@/content/company";
import { images } from "@/content/images";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: `${site.name} kimdir, tarıma nasıl yaklaşır? Vizyonumuz, misyonumuz ve değerlerimiz.`,
  alternates: { canonical: "/hakkimizda" },
  openGraph: { title: `Hakkımızda — ${site.name}`, url: "/hakkimizda" },
};

export default function AboutPage() {
  const facts = site.facts.filter((f) => f.value.trim() !== "");

  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title={["Demre'den", "seralara."]}
        intro={intro.body}
        image={images.greenhouseRowsAerial}
        crumbs={[{ href: "/hakkimizda", label: "Hakkımızda" }]}
      />

      {/* Hikâye */}
      <section aria-labelledby="hikaye" className="bg-bone py-28 md:py-44">
        <div className="gutter">
          <SectionLabel index="01">Hikâyemiz</SectionLabel>
          <h2 id="hikaye" className="sr-only">
            Hikâyemiz
          </h2>
          <ScrollText
            text={intro.statement}
            className="mt-10 max-w-[24ch] font-display text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.08] font-light tracking-[-0.025em] text-forest"
          />
        </div>

        <div className="gutter mt-20 grid gap-12 md:mt-32 md:grid-cols-12">
          <div className="md:col-span-5">
            <ParallaxImage image={images.greenhouseInspection} reveal sizes="(min-width: 768px) 40vw, 92vw" className="aspect-[4/5]" />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-center">
            {story.map((p) => (
              <p key={p} className="mb-6 text-[1.075rem] leading-[1.8] text-ink/80">
                {p}
              </p>
            ))}

            {facts.length > 0 && (
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/15 pt-10">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="eyebrow text-olive">{f.label}</dt>
                    <dd className="mt-2 font-display text-2xl text-forest">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        </div>
      </section>

      {/* Vizyon & misyon */}
      <section aria-label="Vizyon ve misyon" className="bg-forest text-bone">
        <div className="gutter grid md:grid-cols-2">
          {[vision, mission].map((block, i) => (
            <div
              key={block.title}
              className={`py-24 md:py-36 ${i === 0 ? "md:pr-16" : "border-t border-bone/15 md:border-t-0 md:border-l md:pl-16"}`}
            >
              <p className="eyebrow text-sage">0{i + 2}</p>
              <SplitText text={block.title} className="display-md mt-6 text-wheat italic" />
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-md font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-snug font-light text-bone/90">
                  {block.text}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <Values values={values} index="04" />

      {/* Görsel ara */}
      <section aria-hidden="true" className="relative h-[70svh] overflow-hidden md:h-[90svh]">
        <ParallaxImage image={images.greenhouseReflective} strength={18} className="h-full" />
      </section>

      <ContactCta title={["Tanışmak", "isteriz."]} />
    </>
  );
}
