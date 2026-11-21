import { images } from "./images";
import type { Crop } from "./types";

/**
 * SERA ÜRÜNLERİ REHBERİ
 * Antalya / Demre seralarında yaygın yetiştirilen ürünler hakkında genel
 * bilgiler. Çeşit (tip) açıklamaları ve hastalık/zararlı listeleri genel
 * tarımsal bilgidir; ticari çeşit veya marka adı içermez.
 * Baner Tarım'ın deneyimine göre metinleri dilediğiniz gibi düzenleyin.
 */
export const crops: Crop[] = [
  {
    slug: "domates",
    name: "Domates",
    kicker: "Seranın yıldızı",
    summary: "Akdeniz seralarının en önemli ürünü. Çeriden pembeye, farklı tipleriyle domates.",
    intro: [
      "Domates, Antalya ve Demre seralarında en yaygın yetiştirilen ürünlerin başında gelir. Ilık Akdeniz iklimi, sonbaharda dikilen fidelerin kış ve ilkbahar boyunca hasat edilmesine olanak tanır.",
      "Domates tipleri; meyve iriliği, şekli, rengi, kabuk yapısı ve kullanım amacıyla birbirinden ayrılır. Hangi tipin seçileceği pazar talebine, sezona ve sera koşullarına göre belirlenir.",
    ],
    image: images.greenhouseTomatoRows,
    varieties: [
      {
        name: "Sofralık (iri meyveli) domates",
        text: "Taze tüketim için yetiştirilen, iri ve yuvarlak ya da hafif basık meyveli tiptir. Sera domatesçiliğinde en yaygın gruptur; meyve sertliği ve raf ömrü önemli seçim kriterleridir.",
        image: images.beefTomato,
      },
      {
        name: "Salkım domates",
        text: "Meyveler salkım hâlinde, sapıyla birlikte hasat edilir. Salkımdaki meyvelerin birlikte olgunlaşması, renk birliği ve sapın tazeliği kaliteyi belirler.",
        image: images.trussTomato,
      },
      {
        name: "Çeri (kiraz) domates",
        text: "Küçük, tek lokmalık meyveleri ve tatlı aromasıyla öne çıkar. Tek tek veya salkım hâlinde hasat edilebilir; kırmızının yanında sarı ve turuncu renkleri de vardır.",
        image: images.cherryVine,
      },
      {
        name: "Kokteyl domates",
        text: "Boyutu çeri ile sofralık domates arasında kalır. Salata ve sunumlarda tercih edilir, genellikle salkım hâlinde pazarlanır.",
        image: images.ripeningVine,
      },
      {
        name: "Pembe domates",
        text: "İnce kabuklu, pembe tonlu ve aromalı bir tiptir; yerel pazarlarda aranır. Kabuğu ince olduğu için hasat, ambalaj ve taşımada özen ister.",
        image: images.pinkTomato,
      },
      {
        name: "Oval (Roma) tipi domates",
        text: "Uzunca, etli ve daha az sulu yapısıyla hem taze tüketimde hem de işlemede (sos, kurutma) kullanılır.",
        image: images.tomatoesPile,
      },
      {
        name: "Renkli domatesler",
        text: "Sarı, turuncu, siyah ve çok renkli tipler; farklı görünüm ve aromalarıyla özel pazarlara yöneliktir.",
        image: images.colorfulTomatoes,
      },
    ],
    issues: [
      { name: "Domates güvesi (Tuta absoluta)", kind: "Zararlı", text: "Larvaları yaprak, gövde ve meyvede galeri açar. Sera domatesinin en önemli zararlılarından biridir; feromon tuzaklarla izleme erken uyarı sağlar." },
      { name: "Beyaz sinek", kind: "Zararlı", text: "Bitki öz suyunu emer, ballı madde salgılar ve bazı virüs hastalıklarını taşıyabilir." },
      { name: "Thrips", kind: "Zararlı", text: "Yaprak ve çiçeklerde beslenir; domates lekeli solgunluk virüsü (TSWV) gibi virüsleri taşıyabilir." },
      { name: "Kırmızı örümcek ve pas akarı", kind: "Zararlı", text: "Sıcak ve kuru koşullarda hızla çoğalır; yapraklarda sararma, bronzlaşma ve kurumaya yol açar." },
      { name: "Kök-ur nematodları", kind: "Zararlı", text: "Köklerde urlar oluşturur, su ve besin alımını zayıflatır; bitkide gelişme geriliği görülür." },
      { name: "Mildiyö", kind: "Hastalık", text: "Serin ve nemli koşullarda yaprak, sap ve meyvede hızla yayılan bir mantari hastalıktır." },
      { name: "Kurşuni küf (Botrytis)", kind: "Hastalık", text: "Yüksek nemde gövde, yaprak ve meyvede gri küf tabakası oluşturur; budama yaraları giriş noktası olabilir." },
      { name: "Külleme", kind: "Hastalık", text: "Yaprakların üst yüzünde sarımsı lekeler, alt yüzünde beyazımsı bir tabaka şeklinde görülür." },
      { name: "Erken yaprak yanıklığı", kind: "Hastalık", text: "Yapraklarda iç içe halkalı kahverengi lekelerle kendini gösterir; genellikle yaşlı yapraklardan başlar." },
    ],
    notes: [
      "Sera içi nemin kontrolü ve düzenli havalandırma, mantari hastalık riskini azaltmaya yardımcı olur.",
      "Zararlılar için düzenli gözlem ve yapışkan / feromon tuzaklarla izleme, erken müdahaleyi kolaylaştırır.",
      "Sağlıklı ve sertifikalı fide kullanımı, sezonun başındaki riskleri azaltır.",
      "Bitki koruma ürünlerinin etiketindeki doz ve hasat öncesi bekleme sürelerine mutlaka uyulmalıdır.",
    ],
    protection: ["fungisitler", "insektisitler", "akarisitler", "nematisitler", "biyoteknik-urunler"],
  },
  {
    slug: "biber",
    name: "Biber",
    kicker: "Çarlistondan kapyaya",
    summary: "Sera biberinin farklı tipleri: çarliston, sivri, dolmalık ve kapya.",
    intro: [
      "Biber, Akdeniz seralarında domatesten sonra en çok yetiştirilen ürünlerdendir. Taze tüketimden közlemeye kadar geniş bir kullanım alanına sahiptir.",
      "Biber tipleri meyve şekli, kabuk kalınlığı, rengi ve acılık durumuna göre ayrılır.",
    ],
    image: images.redPepperPlant,
    varieties: [
      { name: "Çarliston biber", text: "Açık yeşil, ince kabuklu ve hafif kıvrık meyvelidir. Tatlı veya hafif acı olabilir; taze tüketimde ve kızartmada sevilir.", image: images.pepperPlant },
      { name: "Sivri biber", text: "Uzun ve ince meyvelidir; tatlı ve acı çeşitleri vardır. Taze tüketim ve turşuluk olarak değerlendirilir.", image: images.chiliPeppers },
      { name: "Dolmalık biber", text: "Blok yapılı, kalın etli meyvelidir. Yeşilin yanında kırmızı, sarı ve turuncu renkli tipleri de üretilir.", image: images.greenPepper },
      { name: "Kapya biber", text: "Uzun, kırmızı ve etli meyvelidir; közleme, konserve ve salçalık olarak kullanılır.", image: images.redPepperPlant },
    ],
    issues: [
      { name: "Thrips", kind: "Zararlı", text: "Çiçek ve meyvede beslenerek şekil bozukluğu ve lekelere yol açar; virüs taşıyabilir." },
      { name: "Yaprak biti", kind: "Zararlı", text: "Genç sürgünlerde koloni oluşturur, yaprak kıvrılmasına ve virüs taşınmasına neden olabilir." },
      { name: "Beyaz sinek", kind: "Zararlı", text: "Öz su emerek bitkiyi zayıflatır, ballı madde ve fumajine yol açar." },
      { name: "Kırmızı örümcek", kind: "Zararlı", text: "Sıcak ve kuru dönemlerde yaprak altında çoğalır." },
      { name: "Külleme", kind: "Hastalık", text: "Yaprak alt yüzünde beyazımsı tabaka ve yaprak dökümü ile kendini gösterir." },
      { name: "Kök ve kökboğazı çürüklüğü", kind: "Hastalık", text: "Aşırı nemli toprakta kökboğazında çürüme ve ani solgunluğa neden olabilir." },
    ],
    notes: [
      "Biberde thrips ve yaprak biti popülasyonları düzenli kontrol edilmeli; mavi ve sarı yapışkan tuzaklar izlemeye yardımcı olur.",
      "Aşırı sulamadan kaçınmak kök hastalıkları riskini azaltır.",
      "Bitki koruma ürünlerinin etiketindeki doz ve hasat öncesi bekleme sürelerine uyulmalıdır.",
    ],
    protection: ["insektisitler", "akarisitler", "fungisitler", "biyoteknik-urunler"],
  },
  {
    slug: "patlican",
    name: "Patlıcan",
    kicker: "Sıcağı seven",
    summary: "Kemer, topak ve bostan tipleriyle sera patlıcanı.",
    intro: [
      "Patlıcan, sıcağı seven bir sera ürünüdür ve Akdeniz seralarında yaygın olarak yetiştirilir.",
      "Tipler meyve boyu, kalınlığı ve rengine göre ayrılır.",
    ],
    image: images.eggplantHanging,
    varieties: [
      { name: "Kemer patlıcan", text: "Uzun ve ince meyveli, koyu mor renkli tiptir; kızartma ve közlemede sevilir.", image: images.eggplantHanging },
      { name: "Topak patlıcan", text: "Kısa, kalın ve oval meyvelidir; dolma ve güveç yemeklerinde kullanılır.", image: images.eggplantPlant },
      { name: "Bostan patlıcan", text: "İri ve yuvarlağa yakın meyvelidir; yerel pazarlarda tercih edilir." },
    ],
    issues: [
      { name: "Kırmızı örümcek", kind: "Zararlı", text: "Patlıcanın en önemli zararlılarındandır; yapraklarda sararma ve ağ oluşumu görülür." },
      { name: "Beyaz sinek", kind: "Zararlı", text: "Öz su emerek bitkiyi zayıflatır." },
      { name: "Yaprak biti ve thrips", kind: "Zararlı", text: "Sürgün ve yapraklarda beslenerek gelişmeyi yavaşlatır." },
      { name: "Solgunluk (Verticillium)", kind: "Hastalık", text: "Topraktan bulaşır; yapraklarda tek taraflı sararma ve solgunluk görülür." },
      { name: "Kurşuni küf", kind: "Hastalık", text: "Yüksek nemde çiçek ve meyvelerde gri küf oluşturur." },
    ],
    notes: [
      "Kırmızı örümcek için yaprak altları düzenli kontrol edilmelidir.",
      "Toprak kaynaklı hastalıklara karşı ekim nöbeti ve toprak hijyeni önemlidir.",
      "Bitki koruma ürünlerinin etiketindeki doz ve hasat öncesi bekleme sürelerine uyulmalıdır.",
    ],
    protection: ["akarisitler", "insektisitler", "fungisitler"],
  },
  {
    slug: "hiyar",
    name: "Hıyar",
    kicker: "Hızlı büyüyen",
    summary: "Orta Doğu tipi, uzun ve kornişon hıyar.",
    intro: [
      "Hıyar, hızlı gelişen ve sık hasat edilen bir sera ürünüdür. Kısa sürede ürün vermesi nedeniyle sera rotasyonlarında sık yer alır.",
      "Tipler meyve uzunluğu, kabuk yapısı ve kullanım amacına göre ayrılır.",
    ],
    image: images.cucumberHarvest,
    varieties: [
      { name: "Orta Doğu (Beith Alpha) tipi", text: "Orta boylu, ince kabuklu ve düz yüzeyli meyvelidir; ülkemiz sera hıyarcılığında yaygındır.", image: images.cucumberHarvest },
      { name: "Uzun (Avrupa tipi) hıyar", text: "Uzun, ince ve genellikle ambalajlı satılan tiptir." },
      { name: "Kornişon (turşuluk) hıyar", text: "Küçük meyveli ve tırtıklı yüzeylidir; turşuluk olarak değerlendirilir." },
    ],
    issues: [
      { name: "Mildiyö", kind: "Hastalık", text: "Yapraklarda damarlarla sınırlı köşeli sarı lekeler oluşturur; nemli koşullarda hızla yayılır." },
      { name: "Külleme", kind: "Hastalık", text: "Yaprak yüzeyinde beyaz, unlu bir tabaka görülür." },
      { name: "Yaprak biti", kind: "Zararlı", text: "Koloniler hâlinde beslenir, virüs taşıyabilir." },
      { name: "Thrips ve beyaz sinek", kind: "Zararlı", text: "Yaprak ve meyvelerde beslenerek kaliteyi düşürür." },
      { name: "Kök-ur nematodları", kind: "Zararlı", text: "Köklerde ur oluşturarak gelişmeyi geriletir." },
    ],
    notes: [
      "Mildiyö riskine karşı yaprak ıslaklığının uzun sürmemesi ve havalandırma önemlidir.",
      "Sık hasat edildiği için bitki koruma ürünlerinde hasat öncesi bekleme sürelerine özellikle dikkat edilmelidir.",
    ],
    protection: ["fungisitler", "insektisitler", "nematisitler"],
  },
  {
    slug: "kabak",
    name: "Kabak",
    kicker: "Sakız kabağı",
    summary: "Seralarda yaygın sakız kabağı ve koyu yeşil kabak tipleri.",
    intro: [
      "Kabak, sera rotasyonlarında yer alan ve hızlı ürün veren bir sebzedir.",
      "Ülkemizde açık yeşil renkli sakız kabağı tipi yaygın olarak tercih edilir.",
    ],
    image: images.zucchini,
    varieties: [
      { name: "Sakız kabağı", text: "Açık yeşil, ince kabuklu ve yumuşak etli meyvelidir; iç pazarda yaygın tüketilir.", image: images.zucchini },
      { name: "Koyu yeşil (zucchini tipi) kabak", text: "Koyu yeşil renkli, düz ve silindirik meyvelidir." },
    ],
    issues: [
      { name: "Külleme", kind: "Hastalık", text: "Kabakgillerde en sık görülen hastalıklardandır; yapraklarda beyaz tabaka oluşturur." },
      { name: "Virüs hastalıkları", kind: "Hastalık", text: "Yaprak biti ve beyaz sinek gibi vektörlerle taşınabilir; yaprak ve meyvede mozaik ve şekil bozukluğu görülür." },
      { name: "Yaprak biti", kind: "Zararlı", text: "Virüs taşıyıcısı olması nedeniyle erken kontrol önemlidir." },
      { name: "Beyaz sinek", kind: "Zararlı", text: "Öz su emerek bitkiyi zayıflatır." },
    ],
    notes: [
      "Virüs hastalıklarına karşı vektör böceklerin erken kontrolü ve yabancı ot temizliği önemlidir.",
      "Bitki koruma ürünlerinin etiketindeki doz ve hasat öncesi bekleme sürelerine uyulmalıdır.",
    ],
    protection: ["fungisitler", "insektisitler"],
  },
  {
    slug: "fasulye",
    name: "Fasulye",
    kicker: "Taze fasulye",
    summary: "Sera koşullarında yetiştirilen taze fasulye tipleri.",
    intro: [
      "Taze fasulye, seralarda özellikle erkenci üretimde değerlendirilen bir üründür.",
      "Tipler bakla şekli ve bitkinin gelişme biçimine (sırık veya bodur) göre ayrılır.",
    ],
    image: images.greenBeans,
    varieties: [
      { name: "Yassı fasulye", text: "Geniş ve yassı baklalı tiptir; ülkemizde yaygın olarak tüketilir.", image: images.greenBeans },
      { name: "Yuvarlak (çalı) fasulye", text: "İnce ve yuvarlak kesitli baklalı tiptir.", image: images.stringBeans },
      { name: "Barbunya", text: "Alacalı baklalarıyla bilinir; taze ve kuru olarak tüketilir." },
    ],
    issues: [
      { name: "Kırmızı örümcek", kind: "Zararlı", text: "Fasulyede sık görülen ve hızla çoğalan bir zararlıdır." },
      { name: "Beyaz sinek ve thrips", kind: "Zararlı", text: "Yaprak ve baklalarda beslenerek kaliteyi düşürür." },
      { name: "Pas", kind: "Hastalık", text: "Yapraklarda pas renginde küçük kabarcıklar oluşturur." },
      { name: "Kurşuni küf", kind: "Hastalık", text: "Nemli koşullarda bakla ve çiçeklerde görülür." },
    ],
    notes: [
      "Kırmızı örümcek için sıcak ve kuru dönemlerde gözlem sıklığı artırılmalıdır.",
      "Bitki koruma ürünlerinin etiketindeki doz ve hasat öncesi bekleme sürelerine uyulmalıdır.",
    ],
    protection: ["akarisitler", "insektisitler", "fungisitler"],
  },
];
