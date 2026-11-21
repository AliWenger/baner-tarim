import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/pages/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${site.name} ile iletişime geçin: telefon, e-posta, WhatsApp, adres ve iletişim formu.`,
  alternates: { canonical: "/iletisim" },
  openGraph: { title: `İletişim — ${site.name}`, url: "/iletisim" },
};

export default function ContactPage() {
  const c = site.contact;
  const rows = [
    { label: "Telefon", value: c.phone, href: c.phoneHref },
    { label: "E-posta", value: c.email, href: `mailto:${c.email}` },
    { label: "WhatsApp", value: "Mesaj gönderin", href: `https://wa.me/${c.whatsapp}`, external: true },
  ];

  return (
    <>
      <PageHero
        size="compact"
        eyebrow="İletişim"
        title={["Konuşalım."]}
        intro="Ürünlerimiz, faaliyet alanlarımız veya iş birliği fırsatları hakkında sorularınız için bize yazın; ekibimiz en kısa sürede dönüş yapsın."
        crumbs={[{ href: "/iletisim", label: "İletişim" }]}
      />

      <section aria-label="İletişim bilgileri ve form" className="bg-bone py-20 md:py-32">
        <div className="gutter grid gap-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <dl className="border-t border-ink/15">
              {rows.map((r) => (
                <div key={r.label} className="border-b border-ink/15 py-6">
                  <dt className="eyebrow text-olive">{r.label}</dt>
                  <dd className="mt-2">
                    <a
                      href={r.href}
                      {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="link-underline font-display text-[clamp(1.4rem,2vw,1.8rem)] text-forest"
                    >
                      {r.value}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="border-b border-ink/15 py-6">
                <dt className="eyebrow text-olive">Adres</dt>
                <dd className="mt-2 leading-relaxed text-ink/80">
                  <address className="not-italic">
                    {c.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
              <div className="border-b border-ink/15 py-6">
                <dt className="eyebrow text-olive">Çalışma saatleri</dt>
                <dd className="mt-2 text-ink/80">{c.workingHours}</dd>
              </div>
            </dl>

            <ul className="mt-10 flex gap-2" aria-label="Sosyal medya">
              {site.social.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center border border-ink/20 text-forest transition-colors duration-500 hover:bg-forest hover:text-bone"
                  >
                    <SocialIcon platform={s.platform} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <h2 className="display-md text-forest">Bize yazın</h2>
            <p className="mt-4 mb-12 text-ink/65">* ile işaretli alanların doldurulması zorunludur.</p>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>

      <section aria-label="Harita" className="bg-bone pb-20 md:pb-32">
        <div className="gutter">
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
