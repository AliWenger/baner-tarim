import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center bg-forest text-bone">
      <div className="gutter">
        <p className="eyebrow text-wheat">404</p>
        <h1 className="display-xl mt-6">
          Yol <span className="text-wheat italic">burada</span> bitiyor.
        </h1>
        <p className="lead mt-8 max-w-md text-bone/75">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <ArrowLink href="/" variant="solid" tone="light">
            Ana sayfaya dön
          </ArrowLink>
          <Link href="/iletisim" className="link-underline text-bone/80 hover:text-bone">
            Bize ulaşın
          </Link>
        </div>
      </div>
    </section>
  );
}
