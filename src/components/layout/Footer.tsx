import Link from "next/link";
import { legalLinks, navigation, site } from "@/content/site";
import { LogoMark } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-bone">
      <div className="gutter grid gap-14 pt-24 pb-12 md:grid-cols-12 md:gap-8 md:pt-32">
        <div className="md:col-span-5">
          <LogoMark className="h-11 w-11 text-wheat" />
          <p className="mt-8 max-w-sm text-[0.98rem] leading-relaxed text-bone/70">{site.description}</p>
          <ul className="mt-8 flex gap-2" aria-label="Sosyal medya">
            {site.social.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center border border-bone/15 text-bone/80 transition-colors duration-500 hover:border-wheat hover:text-wheat"
                >
                  <SocialIcon platform={s.platform} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Alt menü" className="md:col-span-3">
          <p className="eyebrow text-sage">Site</p>
          <ul className="mt-6 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-bone/85 hover:text-bone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow text-sage">İletişim</p>
          <address className="mt-6 space-y-3 not-italic text-bone/85">
            <a href={site.contact.phoneHref} className="link-underline block w-fit">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="link-underline block w-fit">
              {site.contact.email}
            </a>
            <p className="pt-2 leading-relaxed text-bone/65">
              {site.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </address>
        </div>
      </div>

      {/* Dev, kırpılmış marka yazısı */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="gutter translate-y-[18%] font-display text-[25vw] leading-[0.8] font-light tracking-[-0.05em] text-bone/[0.06]">
          Baner
        </p>
      </div>

      <div className="gutter flex flex-col gap-4 border-t border-bone/10 py-7 text-[0.8rem] text-bone/55 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.name}. Tüm hakları saklıdır.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-underline hover:text-bone">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
