import { PageHero } from "@/components/pages/PageHero";

export type LegalSection = { title: string; body: (string | string[])[] };

/** Gizlilik ve KVKK gibi yasal metinler için ortak sade şablon. */
export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
  path,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
  path: string;
}) {
  return (
    <>
      <PageHero size="compact" eyebrow={eyebrow} title={title} crumbs={[{ href: path, label: title }]} />
      <section className="bg-bone py-20 md:py-28">
        <div className="gutter grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-olive">Son güncelleme</p>
              <p className="mt-2 text-ink/75">{updated}</p>
              <p className="mt-8 border-l-2 border-clay pl-4 text-[0.88rem] leading-relaxed text-ink/65">
                Bu metin bir şablondur. Yayına almadan önce şirketinizin veri işleme süreçlerine göre doldurulmalı ve bir
                hukuk danışmanı tarafından gözden geçirilmelidir.
              </p>
            </div>
          </aside>
          <div className="prose-baner max-w-3xl text-ink/85 lg:col-span-8 lg:col-start-5">
            {sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.body.map((b, i) =>
                  Array.isArray(b) ? (
                    <ul key={i} className="my-5 list-disc space-y-2 pl-5 marker:text-olive">
                      {b.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{b}</p>
                  ),
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
