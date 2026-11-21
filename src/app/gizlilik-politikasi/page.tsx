import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${site.name} web sitesi gizlilik politikası.`,
  alternates: { canonical: "/gizlilik-politikasi" },
};

const sections: LegalSection[] = [
  {
    title: "Genel",
    body: [
      `Bu gizlilik politikası, ${site.name} web sitesini ziyaret ettiğinizde hangi bilgilerin toplandığını ve nasıl kullanıldığını açıklar. Kişisel verilerin işlenmesine ilişkin ayrıntılı bilgi için KVKK Aydınlatma Metni'ni inceleyebilirsiniz.`,
    ],
  },
  {
    title: "Toplanan bilgiler",
    body: [
      "Web sitemiz üyelik, online satış veya ödeme işlemi içermez. Yalnızca iletişim formunu kullandığınızda paylaştığınız bilgiler (ad soyad, e-posta, telefon, firma ve mesaj) işlenir.",
    ],
  },
  {
    title: "Çerezler",
    body: [
      "Site, çalışması için zorunlu olmayan izleme veya reklam çerezi kullanmaz. Açılış animasyonunun tekrar gösterilmemesi için tarayıcınızın oturum deposunda (sessionStorage) kişisel veri içermeyen küçük bir kayıt tutulur.",
      "[Analitik veya üçüncü taraf hizmetler (ör. Google Analytics) eklenirse bu bölüm güncellenmeli ve gerekiyorsa çerez onayı alınmalıdır.]",
    ],
  },
  {
    title: "Üçüncü taraf hizmetler",
    body: [
      "İletişim sayfasındaki harita Google Haritalar tarafından sağlanır ve Google'ın gizlilik politikasına tabidir. Görseller içerik dağıtım ağları üzerinden sunulabilir.",
      "İletişim formuna yazdığınız bilgiler, mesajın şirketimize iletilmesi amacıyla bir form hizmeti sağlayıcısı (ör. Formspree) üzerinden gönderilir. [Kullandığınız hizmeti belirtin.] Site, GitHub Pages üzerinde barındırılır.",
    ],
  },
  {
    title: "Güvenlik",
    body: ["Bilgilerinizin güvenliği için makul teknik ve idari tedbirler alınır. [Barındırma ve güvenlik önlemlerinizi belirtin.]"],
  },
  {
    title: "İletişim",
    body: [`Bu politika hakkındaki sorularınız için: ${site.contact.email}`],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Yasal" title="Gizlilik Politikası" updated="[Tarih eklenecek]" sections={sections} path="/gizlilik-politikasi" />
  );
}
