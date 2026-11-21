import { intro } from "@/content/company";
import { images } from "@/content/images";
import { ScrollText } from "@/components/ui/ScrollText";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Intro() {
  return (
    <section id="biz-kimiz" aria-labelledby="biz-kimiz-baslik" className="relative bg-bone py-28 md:py-44">
      <div className="gutter">
        <SectionLabel index="01">Biz kimiz</SectionLabel>
        <h2 id="biz-kimiz-baslik" className="sr-only">
          Baner Tarım hakkında
        </h2>

        <ScrollText
          text={intro.statement}
          className="mt-10 max-w-[22ch] font-display text-[clamp(2rem,5.2vw,5rem)] leading-[1.06] font-light tracking-[-0.028em] text-forest md:mt-14"
        />
      </div>

      {/* Asimetrik görsel kompozisyon */}
      <div className="gutter mt-20 grid grid-cols-12 gap-x-4 md:mt-32 md:gap-x-8">
        <div className="col-span-10 md:col-span-6 lg:col-span-5">
          <ParallaxImage
            image={images.seaMountains}
            reveal
            strength={12}
            sizes="(min-width: 768px) 45vw, 85vw"
            className="aspect-[4/5]"
          />
          <p className="eyebrow mt-4 text-[0.62rem] text-ink/50">Akdeniz — seraların iklimi</p>
        </div>

        <div className="col-span-12 flex flex-col md:col-span-5 md:col-start-8 md:pt-40">
          <div className="relative z-10 -mt-24 ml-auto w-3/5 md:mt-0 md:ml-0 md:w-3/5">
            <ParallaxImage
              image={images.tomatoVine}
              reveal
              strength={18}
              sizes="(min-width: 768px) 25vw, 55vw"
              className="aspect-[3/4]"
            />
          </div>

          <Reveal className="mt-16 md:mt-20 md:ml-[20%]">
            <p className="lead text-ink/80">{intro.body}</p>
            <ArrowLink href="/hakkimizda" className="mt-10">
              Hakkımızda daha fazlası
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
