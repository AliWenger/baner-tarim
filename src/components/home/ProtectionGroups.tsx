import Link from "next/link";
import type { ProductCategory } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SafetyNote } from "@/components/ui/SafetyNote";
import { pad } from "@/lib/utils";

/** Bitki koruma ürün grupları — çizgilerle ayrılmış sütunlar; kart yok. */
export function ProtectionGroups({ groups, index = "05" }: { groups: ProductCategory[]; index?: string }) {
  return (
    <section aria-labelledby="koruma-baslik" className="bg-sand py-28 md:py-40">
      <div className="gutter grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <SectionLabel index={index}>Bitki koruma ürünleri</SectionLabel>
          <SplitText
            id="koruma-baslik"
            text={["Doğru ürün,", "doğru zamanda."]}
            className="display-lg mt-8 text-forest"
            lineClassName="[&:nth-child(2)]:italic [&:nth-child(2)]:text-olive"
          />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="lead text-ink/70">
            Sera ürünlerinde karşılaşılan hastalık ve zararlılara yönelik bitki koruma ürün gruplarımız.
          </p>
          <ArrowLink href="/urunler" className="mt-8">
            Tüm ürün grupları
          </ArrowLink>
        </div>
      </div>

      <ul className="gutter mt-16 grid gap-x-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
        {groups.map((g, i) => (
          <li key={g.slug} className="border-t border-ink/20">
            <Reveal delay={(i % 3) * 0.08} y={24}>
              <Link href={`/urunler/${g.slug}`} className="group flex h-full flex-col py-8 md:py-10">
                <span className="eyebrow text-olive">{pad(i + 1)}</span>
                <h3 className="display-sm mt-4 text-forest transition-colors group-hover:text-olive">{g.title}</h3>
                <p className="mt-3 text-ink/70">{g.summary}</p>
                <p className="mt-5 text-[0.85rem] leading-relaxed text-ink/55">{g.targets.slice(0, 4).join(" · ")}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.9rem] font-medium text-forest">
                  İncele <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="gutter mt-12">
        <SafetyNote />
      </div>
    </section>
  );
}
