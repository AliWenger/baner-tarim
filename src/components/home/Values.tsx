import type { Value } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { images } from "@/content/images";
import { pad } from "@/lib/utils";

/** Neden Baner Tarım? — sabit başlık + akan değer listesi. Kart yok, çizgi ve tipografi var. */
export function Values({ values, index = "05" }: { values: Value[]; index?: string }) {
  return (
    <section aria-labelledby="degerler-baslik" className="relative bg-sand py-28 md:py-44">
      <div className="gutter grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index={index}>Değerlerimiz</SectionLabel>
            <SplitText
              id="degerler-baslik"
              text={["Neden", "Baner Tarım?"]}
              className="display-lg mt-8 text-forest"
              lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-clay"
            />
            <ParallaxImage
              image={images.greenhouseTeam}
              reveal
              strength={10}
              sizes="(min-width: 1024px) 34vw, 90vw"
              className="mt-12 hidden aspect-[5/4] w-4/5 lg:block"
            />
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {values.map((v, i) => (
            <li key={v.title} className="group border-t border-ink/15 last:border-b">
              <Reveal y={24} className="grid grid-cols-[3rem_1fr] gap-4 py-9 md:grid-cols-[4.5rem_1fr] md:py-12">
                <span className="eyebrow pt-2 text-olive">{pad(i + 1)}</span>
                <div>
                  <h3 className="display-sm text-forest transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {v.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-ink/70">{v.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
