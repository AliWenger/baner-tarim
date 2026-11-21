import { images } from "./images";
import type { ActivityArea } from "./types";

/**
 * FAALİYET ALANLARI
 * Baner Tarım: Antalya / Demre — sera üreticilerine bitki koruma ürünleri
 * (zirai ilaçlar) ve zirai teknik destek. Metinleri firmanın kendi
 * anlatımıyla güncelleyebilirsiniz; yeni alan eklemek için listeye bir
 * nesne eklemeniz yeterlidir.
 */
export const activities: ActivityArea[] = [
  {
    slug: "bitki-koruma-urunleri",
    title: "Bitki Koruma Ürünleri",
    kicker: "Koruma",
    summary:
      "Sera ürünlerinde hastalık ve zararlılara karşı doğru ürünün, doğru dozda ve doğru zamanda kullanılması için ürün ve bilgi desteği.",
    body: [
      "Seralarda sağlıklı bir sezon, hastalık ve zararlılarla doğru zamanda ve doğru ürünle mücadele etmeye bağlıdır. Baner Tarım, sera üreticilerine fungisit, insektisit, akarisit ve diğer bitki koruma ürün gruplarında ürün tedariği sağlar.",
      "Ürün seçiminde sorunun doğru teşhisi, bitkinin gelişim dönemi, hasat zamanı ve direnç riski birlikte değerlendirilir. Her uygulamada etiket talimatlarına ve hasat öncesi bekleme sürelerine uyulmasını önemsiyoruz.",
    ],
    scope: ["Fungisit, insektisit, akarisit ve nematisit ürün grupları", "Soruna uygun ürün ve uygulama önerisi", "Etiket, doz ve bekleme süresi bilgilendirmesi"],
    image: images.sprayingGreenhouse,
    gallery: [images.greenhouseInterior, images.tomatoVine, images.ladybug],
  },
  {
    slug: "zirai-teknik-destek",
    title: "Zirai Teknik Destek",
    kicker: "Danışmanlık",
    summary:
      "Seraya gelen, sorunu yerinde gören ve üreticiyle birlikte çözüm üreten saha desteği.",
    body: [
      "Zirai teknik destek sahada başlar. Seradaki bitkiyi, toprağı ve iklim koşullarını yerinde görmek; doğru teşhisin ve doğru önerinin ilk adımıdır.",
      "Fide dikiminden hasada kadar sezon boyunca üreticinin sorularına yanıt veriyor, gelişim dönemine uygun önerilerle yanında oluyoruz.",
    ],
    scope: ["Sera ziyareti ve yerinde inceleme", "Gelişim dönemine göre öneriler", "Sezon boyu takip ve bilgilendirme"],
    image: images.greenhouseInspection,
    gallery: [images.greenhouseTeam, images.tomatoSeedling, images.cucumberHarvest],
  },
  {
    slug: "hastalik-ve-zararli-takibi",
    title: "Hastalık ve Zararlı Takibi",
    kicker: "Teşhis",
    summary:
      "Erken teşhis, en etkili korumadır. Domates güvesinden külleme'ye, sera sorunlarının izlenmesi.",
    body: [
      "Domates güvesi, beyaz sinek, thrips, kırmızı örümcek, mildiyö ve külleme gibi sorunlar seralarda hızla yayılabilir. Düzenli gözlem ve doğru teşhis, gereksiz uygulamaların önüne geçer.",
      "Kültürel önlemleri, tuzaklarla izlemeyi ve gerektiğinde kimyasal mücadeleyi birlikte değerlendiren bir yaklaşımı benimsiyoruz.",
    ],
    scope: ["Hastalık ve zararlı teşhisi", "Tuzaklarla izleme önerileri", "Entegre mücadele yaklaşımı"],
    image: images.ladybug,
    gallery: [images.greenTomatoes, images.pepperPlant, images.eggplantPlant],
  },
  {
    slug: "sera-uretim-destegi",
    title: "Sera Üretim Desteği",
    kicker: "Sezon",
    summary:
      "Domates, biber ve diğer sera ürünlerinde fideden hasada, sezonun her aşamasında bilgi desteği.",
    body: [
      "Demre ve çevresindeki seralarda domates, biber, patlıcan, hıyar, kabak ve fasulye gibi ürünler yetiştirilir. Her ürünün ve her tipin kendine özgü ihtiyaçları vardır.",
      "Sera ürünleri rehberimizde bu ürünlerin tiplerini ve sık karşılaşılan sorunlarını bulabilir, ürününüze özel sorularınız için bize ulaşabilirsiniz.",
    ],
    scope: ["Ürün ve tip bazında bilgilendirme", "Fide ve dikim dönemi önerileri", "Hasat öncesi dönem planlaması"],
    image: images.greenhouseTomatoRows,
    gallery: [images.cherryVine, images.seedlingsTray, images.redPepperPlant],
  },
];
