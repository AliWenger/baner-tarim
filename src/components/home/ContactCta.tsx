import { images } from "@/content/images";
import { site } from "@/content/site";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SplitText } from "@/components/ui/SplitText";
import { ArrowLink } from "@/components/ui/ArrowLink";

/** Sayfa sonu iletişim çağrısı — tam genişlikte sinematik görsel üzerinde. */
export function ContactCta({
  title = ["Seranız için", "buradayız."],
  text = "Seranızdaki bir sorun, ürünlerimiz veya teknik destek hakkında konuşmak için bize ulaşın.",
}: {
  title?: string[];
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-baslik" className="relative overflow-hidden bg-forest-950 text-bone">
      <div className="absolute inset-0">
        <ParallaxImage image={images.plasticLight} strength={14} className="h-full" imgClassName="opacity-70" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/30" />

      <div className="gutter relative flex min-h-[90svh] flex-col justify-end py-24 md:py-32">
        <SplitText
          id="cta-baslik"
          text={title}
          className="display-xl"
          lineClassName="[&:nth-child(2)]:pl-[0.6em] [&:nth-child(2)]:italic [&:nth-child(2)]:text-wheat"
        />
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="lead max-w-md text-bone/80">{text}</p>
          <div className="flex flex-wrap gap-4">
            <ArrowLink href="/iletisim" variant="solid" tone="light">
              İletişime geçin
            </ArrowLink>
            <ArrowLink href={`https://wa.me/${site.contact.whatsapp}`} variant="outline" tone="light" external>
              WhatsApp
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
