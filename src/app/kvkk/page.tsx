import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: `${site.name} kişisel verilerin korunması ve işlenmesine ilişkin aydınlatma metni.`,
  alternates: { canonical: "/kvkk" },
};

const sections: LegalSection[] = [
  {
    title: "1. Veri sorumlusu",
    body: [
      `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla ${site.legalName} ("Şirket") tarafından aşağıda açıklanan kapsamda işlenebilecektir.`,
      `İletişim: ${site.contact.email} · Adres: ${site.contact.address.join(", ")}`,
    ],
  },
  {
    title: "2. İşlenen kişisel veriler",
    body: [
      "Web sitemizdeki iletişim formu aracılığıyla paylaştığınız aşağıdaki veriler işlenebilir:",
      ["Kimlik bilgisi: ad, soyad", "İletişim bilgisi: e-posta adresi, telefon numarası (opsiyonel)", "Firma bilgisi (opsiyonel)", "Talep/mesaj içeriği", "İşlem güvenliği bilgileri: IP adresi, tarih-saat kayıtları [kullanılıyorsa belirtin]"],
    ],
  },
  {
    title: "3. İşleme amaçları",
    body: [
      ["İletişim taleplerinizin alınması ve yanıtlanması", "Ürün ve hizmetlerimiz hakkında bilgi verilmesi", "İş birliği taleplerinin değerlendirilmesi", "Hukuki yükümlülüklerin yerine getirilmesi", "[Şirketinize özgü diğer amaçlar]"],
    ],
  },
  {
    title: "4. Hukuki sebep ve toplama yöntemi",
    body: [
      "Kişisel verileriniz, web sitesi üzerindeki iletişim formu aracılığıyla elektronik ortamda; KVKK'nın 5. maddesinde yer alan “bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması”, “veri sorumlusunun meşru menfaati” ve gerektiğinde “açık rıza” hukuki sebeplerine dayanılarak toplanmaktadır. [Hukuk danışmanınızla doğrulayın.]",
    ],
  },
  {
    title: "5. Aktarım",
    body: [
      "Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak; hizmet alınan barındırma, e-posta ve form altyapısı sağlayıcılarına ve yasal olarak yetkili kamu kurum ve kuruluşlarına aktarılabilir. [Kullandığınız hizmet sağlayıcılarını ve varsa yurt dışı aktarımını belirtin.]",
    ],
  },
  {
    title: "6. Saklama süresi",
    body: ["Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen süreler boyunca saklanır; sürenin sona ermesiyle silinir, yok edilir veya anonim hâle getirilir. [Süreyi belirtin.]"],
  },
  {
    title: "7. İlgili kişinin hakları",
    body: [
      "KVKK'nın 11. maddesi uyarınca Şirket'e başvurarak;",
      [
        "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
        "İşlenmişse buna ilişkin bilgi talep etme,",
        "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
        "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
        "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
        "KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,",
        "Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
        "Münhasıran otomatik sistemlerle analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
        "Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
      ],
      "haklarına sahipsiniz.",
    ],
  },
  {
    title: "8. Başvuru",
    body: [`Haklarınıza ilişkin taleplerinizi ${site.contact.email} adresine veya yukarıdaki adrese yazılı olarak iletebilirsiniz. [Başvuru yöntemlerini mevzuata uygun şekilde tamamlayın.]`],
  },
];

export default function KvkkPage() {
  return <LegalPage eyebrow="Yasal" title="KVKK Aydınlatma Metni" updated="[Tarih eklenecek]" sections={sections} path="/kvkk" />;
}
