import { images } from "./images";
import type { NewsItem } from "./types";

/**
 * HABERLER VE DUYURULAR
 * Yeni bir haber eklemek için listeye bir nesne eklemeniz yeterlidir.
 * Liste tarihe göre otomatik sıralanır. Örnek kayıtlar (sample: true)
 * yalnızca tasarımı göstermek içindir; yayından önce silin veya değiştirin.
 */
export const news: NewsItem[] = [
  {
    slug: "yeni-web-sitemiz-yayinda",
    title: "Yeni web sitemiz yayında",
    date: "2026-11-21",
    category: "Duyuru",
    excerpt:
      "Baner Tarım'ın kurumsal web sitesi yenilendi. Faaliyet alanlarımızı, ürünlerimizi ve güncel haberlerimizi artık tek bir yerden takip edebilirsiniz.",
    cover: images.greenhouseRowsAerial,
    body: [
      { type: "p", text: "Baner Tarım'ın yeni kurumsal web sitesi yayında. Sitemizde faaliyet alanlarımızı, bitki koruma ürün gruplarımızı ve domates başta olmak üzere sera ürünleri rehberimizi bulabilirsiniz." },
      { type: "h2", text: "Neler bulacaksınız?" },
      { type: "p", text: "Faaliyet alanlarımız ve ürün kategorilerimiz ayrı sayfalarda ayrıntılı olarak yer alıyor. Haberler ve duyurular bölümünde ise şirketimizden gelişmeleri paylaşacağız." },
      { type: "quote", text: "İletişim sayfamızdaki form üzerinden bize her zaman ulaşabilirsiniz." },
      { type: "p", text: "Ürünlerimiz hakkında bilgi almak ya da iş birliği önerileriniz için iletişim sayfamızı kullanabilirsiniz." },
    ],
  },
  {
    slug: "ornek-fuar-katilimi",
    title: "Örnek duyuru: Fuar katılımı",
    date: "2026-10-08",
    category: "Fuar",
    excerpt:
      "Bu bir örnek kayıttır. Fuar ve etkinlik katılımlarınızı tarih, yer ve stant bilgisiyle bu şablonu kullanarak paylaşabilirsiniz.",
    cover: images.greenhouseReflective,
    sample: true,
    body: [
      { type: "p", text: "Bu içerik, haber detay sayfasının tasarımını göstermek için eklenmiş bir örnektir. Gerçek bir fuar katılımı bilgisini temsil etmez." },
      { type: "h2", text: "Şablon önerisi" },
      { type: "p", text: "Fuarın adı, tarihi, yeri ve stant numarası; ziyaretçilere sunulacak ürün veya hizmetler; randevu için iletişim bilgisi." },
      { type: "image", image: images.greenhouseTunnels, caption: "Görsel alt yazısı örneği." },
      { type: "p", text: "Görseller, alıntılar ve ara başlıklar içerik bloklarıyla serbestçe eklenebilir." },
    ],
  },
  {
    slug: "ornek-haber-hasat-donemi",
    title: "Örnek haber: Sezon notları",
    date: "2026-09-02",
    category: "Haber",
    excerpt:
      "Bu bir örnek kayıttır. Sezon değerlendirmeleri, saha çalışmaları veya şirket gelişmeleri bu formatta yayınlanabilir.",
    cover: images.tomatoVine,
    sample: true,
    body: [
      { type: "p", text: "Bu içerik, haber şablonunu göstermek için eklenmiş bir örnektir. Gerçek bir olay veya sonuç bildirmez." },
      { type: "p", text: "Sezon değerlendirmeleri, saha ziyaretleri, iş birlikleri ve kurum içi gelişmeler bu bölümde paylaşılabilir." },
    ],
  },
];
