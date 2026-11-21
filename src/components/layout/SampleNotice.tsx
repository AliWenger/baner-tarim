import { site } from "@/content/site";

/** Yayın öncesi uyarı şeridi. `site.showSampleNotice = false` ile kapatılır. */
export function SampleNotice() {
  if (!site.showSampleNotice) return null;
  return (
    <div className="bg-wheat px-5 py-2.5 text-center text-[0.78rem] leading-snug text-forest-950">
      Önizleme: Bu sitedeki iletişim bilgileri, bazı şirket metinleri ve örnek haberler yer tutucudur; Baner Tarım&apos;ın
      gerçek bilgileriyle güncellenecektir.
    </div>
  );
}
